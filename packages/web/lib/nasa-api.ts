// NASA API Integration with Mock Data Fallback

export interface NASALesson {
  id: string;
  title: string;
  mission: string;
  lessonLearned: string;
  abstract: string;
}

// Data Cleaning Utility: Extract mission name from title if mission field is empty
export function extractMissionFromTitle(title: string, existingMission?: string): string {
  // If mission exists and is not empty, return it
  if (existingMission && existingMission.trim() !== '') {
    return existingMission.trim();
  }

  // Mission name patterns to search for in title
  const missionPatterns = [
    { pattern: /artemis\s*(i{1,3}|[0-9]+)?/i, name: 'Artemis' },
    { pattern: /apollo\s*([0-9]+)?/i, name: 'Apollo' },
    { pattern: /iss|international\s*space\s*station/i, name: 'ISS' },
    { pattern: /mars\s*(2020|rover|perseverance|curiosity|opportunity|spirit)/i, name: 'Mars Mission' },
    { pattern: /shuttle|space\s*shuttle/i, name: 'Space Shuttle' },
    { pattern: /hubble/i, name: 'Hubble' },
    { pattern: /jwst|james\s*webb/i, name: 'James Webb' },
    { pattern: /voyager/i, name: 'Voyager' },
    { pattern: /cassini/i, name: 'Cassini' },
    { pattern: /juno/i, name: 'Juno' },
    { pattern: /new\s*horizons/i, name: 'New Horizons' },
    { pattern: /parker\s*solar/i, name: 'Parker Solar Probe' },
    { pattern: /orion/i, name: 'Orion' },
    { pattern: /sls|space\s*launch\s*system/i, name: 'SLS' },
  ];

  // Try to match patterns
  for (const { pattern, name } of missionPatterns) {
    if (pattern.test(title)) {
      return name;
    }
  }

  // Default fallback
  return 'General Mission';
}

// Clean and sanitize lesson data
export function cleanLessonData(lesson: any): NASALesson {
  const title = lesson.title || lesson._source?.title || 'Untitled Lesson';
  const rawMission = lesson.mission || lesson._source?.mission || '';
  
  return {
    id: lesson.id || lesson._id || `LLIS-${Date.now()}`,
    title: title.trim(),
    mission: extractMissionFromTitle(title, rawMission),
    lessonLearned: (lesson.lessonLearned || lesson.lesson_learned || lesson._source?.lesson_learned || '').trim(),
    abstract: (lesson.abstract || lesson._source?.abstract || '').trim().substring(0, 300),
  };
}

// Mock data for resilient demo
const MOCK_LESSONS: NASALesson[] = [
  {
    id: 'LLIS-001',
    title: 'Artemis II Mission Planning',
    mission: 'Artemis II',
    lessonLearned: 'Enhanced crew safety protocols',
    abstract: 'Comprehensive analysis of crew safety measures for deep space missions, including radiation protection and life support redundancy.',
  },
  {
    id: 'LLIS-002',
    title: 'Mars Perseverance Rover Operations',
    mission: 'Mars 2020',
    lessonLearned: 'Autonomous navigation systems',
    abstract: 'Development of advanced autonomous navigation for Martian terrain, enabling safer and more efficient rover operations.',
  },
  {
    id: 'LLIS-003',
    title: 'ISS Life Support Systems',
    mission: 'International Space Station',
    lessonLearned: 'Water recycling efficiency improvements',
    abstract: 'Optimization of water recovery systems achieving 98% efficiency in closed-loop life support operations.',
  },
];

export async function searchNASALessons(query: string, useMockData = false): Promise<NASALesson[]> {
  if (useMockData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_LESSONS.filter(lesson => 
      lesson.title.toLowerCase().includes(query.toLowerCase()) ||
      lesson.mission.toLowerCase().includes(query.toLowerCase()) ||
      lesson.abstract.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await fetch('https://llis.nasa.gov/llis/lesson/_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          match: {
            _all: query,
          },
        },
        size: 5,
      }),
    });

    if (!response.ok) {
      throw new Error('NASA API request failed');
    }

    const data = await response.json();
    
    // Clean and sanitize all lesson data
    return data.hits.hits.map((hit: any) => cleanLessonData(hit));
  } catch (error) {
    console.warn('NASA API failed, using mock data:', error);
    // Fallback to mock data on error
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_LESSONS.filter(lesson => 
      lesson.title.toLowerCase().includes(query.toLowerCase()) ||
      lesson.mission.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export async function getNASAMissionData(missionName: string): Promise<any> {
  // Mock mission data
  const mockMissions: Record<string, any> = {
    'artemis': {
      name: 'Artemis II',
      status: 'In Development',
      launchDate: '2025-09-01',
      crew: 4,
      destination: 'Lunar Orbit',
      objectives: ['Crew safety validation', 'Deep space communications test', 'Life support systems verification'],
    },
    'perseverance': {
      name: 'Mars 2020 Perseverance',
      status: 'Active',
      launchDate: '2020-07-30',
      location: 'Jezero Crater, Mars',
      objectives: ['Search for signs of ancient life', 'Collect rock samples', 'Test oxygen production'],
    },
  };

  await new Promise(resolve => setTimeout(resolve, 800));
  
  const key = missionName.toLowerCase();
  return mockMissions[key] || mockMissions['artemis'];
}
