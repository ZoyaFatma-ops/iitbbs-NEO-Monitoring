// NASA NeoWs API Data Fetcher
// Run: node scripts/fetch-neo-data.js

const API_KEY = 'VeDFFceSrkgFeZaYPdwXXSjJOW5TYDbbGc2CBcap';

async function fetchNeoData() {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];

    // Get end date (7 days from now)
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 7);
    const endDateStr = endDate.toISOString().split('T')[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDateStr}&api_key=${API_KEY}`;

    console.log(`Fetching NEO data from ${startDate} to ${endDateStr}...`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Process and flatten the data
        const allNeos = [];

        for (const date in data.near_earth_objects) {
            const neos = data.near_earth_objects[date];
            neos.forEach(neo => {
                allNeos.push({
                    id: neo.id,
                    name: neo.name,
                    nasa_jpl_url: neo.nasa_jpl_url,
                    absolute_magnitude_h: neo.absolute_magnitude_h,
                    is_potentially_hazardous: neo.is_potentially_hazardous_asteroid,
                    is_sentry_object: neo.is_sentry_object,
                    estimated_diameter: {
                        min_km: neo.estimated_diameter.kilometers.estimated_diameter_min,
                        max_km: neo.estimated_diameter.kilometers.estimated_diameter_max,
                        min_m: neo.estimated_diameter.meters.estimated_diameter_min,
                        max_m: neo.estimated_diameter.meters.estimated_diameter_max,
                    },
                    close_approach_data: neo.close_approach_data.map(approach => ({
                        close_approach_date: approach.close_approach_date,
                        close_approach_date_full: approach.close_approach_date_full,
                        epoch_date_close_approach: approach.epoch_date_close_approach,
                        relative_velocity: {
                            km_per_sec: parseFloat(approach.relative_velocity.kilometers_per_second),
                            km_per_hour: parseFloat(approach.relative_velocity.kilometers_per_hour),
                        },
                        miss_distance: {
                            astronomical: parseFloat(approach.miss_distance.astronomical),
                            lunar: parseFloat(approach.miss_distance.lunar),
                            kilometers: parseFloat(approach.miss_distance.kilometers),
                        },
                        orbiting_body: approach.orbiting_body,
                    })),
                });
            });
        }

        // Sort by closest approach distance
        allNeos.sort((a, b) => {
            const distA = a.close_approach_data[0]?.miss_distance.lunar || Infinity;
            const distB = b.close_approach_data[0]?.miss_distance.lunar || Infinity;
            return distA - distB;
        });

        const result = {
            fetched_at: new Date().toISOString(),
            start_date: startDate,
            end_date: endDateStr,
            element_count: data.element_count,
            neo_objects: allNeos,
        };

        // Write to file
        const fs = await import('fs');
        const path = await import('path');
        const outputPath = path.join(process.cwd(), 'src', 'data', 'neo-data.json');

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

        console.log(`✅ Successfully fetched ${allNeos.length} NEOs`);
        console.log(`📁 Data saved to: ${outputPath}`);
        console.log(`🔴 Hazardous asteroids: ${allNeos.filter(n => n.is_potentially_hazardous).length}`);

    } catch (error) {
        console.error('Error fetching NEO data:', error);
        process.exit(1);
    }
}

fetchNeoData();
