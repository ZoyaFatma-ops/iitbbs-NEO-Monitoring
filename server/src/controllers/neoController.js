const { fetchFeed, fetchLookup } = require('../services/nasa');
const { ValidationError, NotFoundError } = require('../errors/appError');
const { computeRiskScore, getMinMissDistanceKm, getDiameterMeters } = require('../utils/risk');

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const validateDate = (value, name) => {
  if (!value || !DATE_RE.test(value)) {
    throw new ValidationError(`${name} must be in YYYY-MM-DD format`);
  }
};

const diffDays = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const diff = (e - s) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
};

const normalizeNeo = (neo) => {
  const missKm = getMinMissDistanceKm(neo);
  const diameterM = getDiameterMeters(neo);
  const risk = computeRiskScore(neo);
  const approach = Array.isArray(neo?.close_approach_data) ? neo.close_approach_data[0] : null;

  return {
    id: neo.id,
    name: neo.name,
    absolute_magnitude_h: neo.absolute_magnitude_h,
    is_potentially_hazardous: !!neo.is_potentially_hazardous_asteroid,
    diameter_m: diameterM,
    close_approach_date: approach?.close_approach_date || null,
    miss_distance_km: missKm,
    relative_velocity_km_s: approach?.relative_velocity?.kilometers_per_second
      ? Number(approach.relative_velocity.kilometers_per_second)
      : null,
    orbiting_body: approach?.orbiting_body || null,
    risk,
  };
};

const getFeed = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    validateDate(start_date, 'start_date');
    validateDate(end_date, 'end_date');

    const range = diffDays(start_date, end_date);
    if (range < 0) {
      throw new ValidationError('end_date must be after start_date');
    }
    if (range > 7) {
      throw new ValidationError('Date range must be 7 days or less');
    }

    const data = await fetchFeed({ start_date, end_date });
    const entries = data?.near_earth_objects || {};
    const items = Object.values(entries).flat().map(normalizeNeo);

    res.json({
      range: { start_date, end_date },
      total: items.length,
      neos: items,
    });
  } catch (err) {
    next(err);
  }
};

const getLookup = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ValidationError('id is required');
    }

    const neo = await fetchLookup(id);
    if (!neo) {
      throw new NotFoundError('NEO not found');
    }

    res.json({
      neo: normalizeNeo(neo),
      raw: neo,
    });
  } catch (err) {
    next(err);
  }
};

const getSummary = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    validateDate(start_date, 'start_date');
    validateDate(end_date, 'end_date');

    const range = diffDays(start_date, end_date);
    if (range < 0) {
      throw new ValidationError('end_date must be after start_date');
    }
    if (range > 7) {
      throw new ValidationError('Date range must be 7 days or less');
    }

    const data = await fetchFeed({ start_date, end_date });
    const entries = data?.near_earth_objects || {};
    const items = Object.values(entries).flat();

    let hazardous = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    for (const neo of items) {
      if (neo.is_potentially_hazardous_asteroid) hazardous += 1;
      const { label } = computeRiskScore(neo);
      if (label === 'High') high += 1;
      else if (label === 'Medium') medium += 1;
      else low += 1;
    }

    res.json({
      range: { start_date, end_date },
      total: items.length,
      hazardous,
      risk_breakdown: { high, medium, low },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFeed,
  getLookup,
  getSummary,
};
