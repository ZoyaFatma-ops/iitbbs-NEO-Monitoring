const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const getMinMissDistanceKm = (neo) => {
  if (!Array.isArray(neo?.close_approach_data)) return null;
  let min = null;
  for (const approach of neo.close_approach_data) {
    const km = toNumber(approach?.miss_distance?.kilometers);
    if (km === null) continue;
    if (min === null || km < min) min = km;
  }
  return min;
};

const getDiameterMeters = (neo) => {
  const meters = neo?.estimated_diameter?.meters;
  if (!meters) return null;
  const min = toNumber(meters.estimated_diameter_min);
  const max = toNumber(meters.estimated_diameter_max);
  if (min === null && max === null) return null;
  if (min === null) return max;
  if (max === null) return min;
  return (min + max) / 2;
};

const computeRiskScore = (neo) => {
  const hazard = !!neo?.is_potentially_hazardous_asteroid;
  const diameter = getDiameterMeters(neo);
  const missKm = getMinMissDistanceKm(neo);

  const base = hazard ? 60 : 20;
  const diameterFactor = diameter ? Math.min((diameter / 1000) * 20, 20) : 0;

  let missFactor = 0;
  if (missKm !== null) {
    if (missKm < 750000) missFactor = 20;
    else if (missKm < 2000000) missFactor = 10;
  }

  const raw = base + diameterFactor + missFactor;
  const score = Math.max(0, Math.min(100, Math.round(raw)));
  const label = score >= 75 ? 'High' : score >= 45 ? 'Medium' : 'Low';

  return {
    score,
    label,
    factors: {
      hazardous: hazard,
      diameter_m: diameter,
      miss_distance_km: missKm,
    },
  };
};

export {
  computeRiskScore,
  getMinMissDistanceKm,
  getDiameterMeters,
};
