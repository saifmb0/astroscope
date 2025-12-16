/**
 * NASA LLIS Data Fetcher Script
 * Pre-fetches high-impact lessons for local seed database
 * Run: node scripts/fetchNasaData.js
 */

const fs = require('fs');
const path = require('path');

const QUERIES = [
  'Apollo',
  'Mars Lander',
  'Thermal',
  'Communications Failure',
  'Propulsion',
  'Cryogenic Valve Failures',
  'ISS',
  'Shuttle',
  'Hubble',
  'Rover',
];

const NASA_API_URL = 'https://llis.nasa.gov/llis/lesson/_search';

async function fetchLessonsForQuery(query) {
  try {
    console.log(`Fetching lessons for: ${query}...`);
    const url = `${NASA_API_URL}?query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${query}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // NASA API returns lessons in various formats, try to extract them
    const lessons = data.results || data.lessons || data || [];
    
    console.log(`✓ Found ${lessons.length} lessons for ${query}`);
    return Array.isArray(lessons) ? lessons.slice(0, 10) : []; // Top 10 per query
  } catch (error) {
    console.error(`Error fetching ${query}:`, error.message);
    return [];
  }
}

async function fetchAllLessons() {
  console.log('🚀 AstroScope - NASA Data Fetcher\n');
  
  const allLessons = [];
  const seenIds = new Set();

  for (const query of QUERIES) {
    const lessons = await fetchLessonsForQuery(query);
    
    // Deduplicate by lesson_id
    for (const lesson of lessons) {
      const id = lesson.lesson_id || lesson.id;
      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        allLessons.push(lesson);
      }
    }
    
    // Rate limiting - wait 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Total unique lessons fetched: ${allLessons.length}`);
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '..', 'assets', 'data', 'lessons_seed.json');
  const outputDir = path.dirname(outputPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const seedData = {
    generated_at: new Date().toISOString(),
    total_lessons: allLessons.length,
    lessons: allLessons,
  };

  fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2));
  console.log(`📦 Saved to: ${outputPath}`);
  
  // Also create a TypeScript-friendly version
  const tsPath = path.join(__dirname, '..', 'assets', 'data', 'lessons_seed.ts');
  const tsContent = `// Auto-generated NASA LLIS seed data
// Generated: ${new Date().toISOString()}

export const LESSONS_SEED = ${JSON.stringify(seedData, null, 2)};
`;
  
  fs.writeFileSync(tsPath, tsContent);
  console.log(`📦 Saved TypeScript version to: ${tsPath}`);
  
  console.log('\n✨ Data fetch complete!');
}

// Run the script
fetchAllLessons().catch(console.error);
