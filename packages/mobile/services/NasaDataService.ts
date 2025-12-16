/**
 * NASA Data Service - Hybrid Data Strategy
 * Tier 1: Local seed database (instant, offline-capable)
 * Tier 2: Live NASA LLIS API (with fallback to Tier 1)
 */

import { NasaLesson, NasaApiResponse } from '../types/nasa';
import { LESSONS_SEED } from '../assets/data/lessons_seed';
import { NASA_LLIS_API_URL } from '@env';

const API_TIMEOUT = 3000; // 3 seconds as specified
const MAX_RESULTS = 10;

export class NasaDataService {
  private static instance: NasaDataService;
  private localLessons: NasaLesson[];

  private constructor() {
    this.localLessons = LESSONS_SEED.lessons as NasaLesson[];
  }

  static getInstance(): NasaDataService {
    if (!NasaDataService.instance) {
      NasaDataService.instance = new NasaDataService();
    }
    return NasaDataService.instance;
  }

  /**
   * Search lessons with hybrid strategy:
   * 1. Attempt live fetch (with timeout)
   * 2. Fall back to local seed if live fails/slow
   */
  async searchLessons(query: string): Promise<{
    lessons: NasaLesson[];
    source: 'live' | 'local';
    total: number;
  }> {
    console.log(`[NasaDataService] Searching for: "${query}"`);

    try {
      // Attempt live fetch with timeout
      const liveResult = await this.fetchLiveLessons(query);
      
      if (liveResult && liveResult.length > 0) {
        console.log(`[NasaDataService] ✓ Live data: ${liveResult.length} lessons`);
        return {
          lessons: liveResult,
          source: 'live',
          total: liveResult.length,
        };
      }

      console.log('[NasaDataService] Live fetch empty, using local seed');
      throw new Error('No live results');
      
    } catch (error) {
      console.log('[NasaDataService] Falling back to local seed');
      return this.searchLocalLessons(query);
    }
  }

  /**
   * Fetch from NASA LLIS API with timeout
   * Uses POST with Elasticsearch query structure
   */
  private async fetchLiveLessons(query: string): Promise<NasaLesson[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const url = NASA_LLIS_API_URL || 'https://llis.nasa.gov/llis/lesson/_search';
      console.log(`[NasaDataService] Fetching from: ${url}`);

      const response = await fetch(url, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: {
            query_string: {
              query: query
            }
          },
          size: MAX_RESULTS,
          from: 0,
          _source: {
            excludes: ['userStory', 'eventStory'] // Exclude huge text fields
          }
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }

      const data: any = await response.json();
      
      // Elasticsearch returns hits.hits array
      const hits = data.hits?.hits || [];
      const lessons = hits.map((hit: any) => ({
        lesson_id: hit._id || hit._source?.lesson_id,
        title: hit._source?.title || 'Untitled',
        abstract: hit._source?.abstract || hit._source?.lesson_abstract || '',
        driving_event: hit._source?.driving_event || hit._source?.drivingEvent || '',
        lesson: hit._source?.lesson || hit._source?.lessonsLearned || '',
        recommendation: hit._source?.recommendation || '',
        mission: hit._source?.mission || hit._source?.mission_directorate || '',
        center: hit._source?.center || hit._source?.submitted_by?.center || '',
        subject_primary: hit._source?.subject_primary || hit._source?.category?.[0] || '',
        subject_secondary: hit._source?.subject_secondary || hit._source?.category || [],
        organization: hit._source?.organization || 'NASA',
        lesson_date: hit._source?.lesson_date || hit._source?.date || '',
      }));
      
      console.log(`[NasaDataService] ✓ Parsed ${lessons.length} lessons from API`);
      return lessons;
      
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.log('[NasaDataService] Request timeout (>3s)');
      } else {
        console.log(`[NasaDataService] Fetch error: ${error.message}`);
      }
      
      throw error;
    }
  }

  /**
   * Search local seed database with improved keyword matching
   */
  private searchLocalLessons(query: string): {
    lessons: NasaLesson[];
    source: 'local';
    total: number;
  } {
    const queryLower = query.toLowerCase();
    
    // Extract keywords from query (remove common words)
    const stopWords = ['what', 'are', 'the', 'for', 'a', 'an', 'in', 'on', 'at', 'to', 'is', 'of', 'and', 'or'];
    const keywords = queryLower
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    const matches = this.localLessons.filter(lesson => {
      const searchText = `
        ${lesson.title} 
        ${lesson.abstract} 
        ${lesson.lesson || ''} 
        ${lesson.driving_event || ''} 
        ${lesson.mission || ''} 
        ${lesson.subject_primary || ''}
        ${lesson.recommendation || ''}
        ${lesson.center || ''}
      `.toLowerCase();
      
      // Match if any keyword is found, or if full query matches
      return searchText.includes(queryLower) || 
             keywords.some(keyword => searchText.includes(keyword));
    });

    console.log(`[NasaDataService] ✓ Local matches: ${matches.length} lessons (keywords: ${keywords.join(', ')})`);

    return {
      lessons: matches.slice(0, MAX_RESULTS),
      source: 'local',
      total: matches.length,
    };
  }

  /**
   * Get a specific lesson by ID
   */
  async getLessonById(lessonId: number): Promise<NasaLesson | null> {
    // First try local
    const local = this.localLessons.find(l => l.lesson_id === lessonId);
    if (local) return local;

    // Could implement live fetch by ID here if needed
    return null;
  }

  /**
   * Get lessons for trending topics
   */
  getTrendingLessons(category: string): NasaLesson[] {
    const categoryMap: Record<string, string[]> = {
      'Apollo': ['apollo', '1001'],
      'Mars Lander': ['mars', 'rover', 'curiosity'],
      'Thermal': ['thermal', 'temperature', 'cooling'],
      'Communications Failure': ['communications', 'comms', 'antenna'],
      'Propulsion': ['propulsion', 'engine', 'fuel', 'cryogenic'],
      'Cryogenic Valve Failures': ['cryogenic', 'valve', 'hydrogen', 'oxygen'],
    };

    const keywords = categoryMap[category] || [category.toLowerCase()];
    
    const matches = this.localLessons.filter(lesson => {
      const searchText = `
        ${lesson.title} 
        ${lesson.mission || ''} 
        ${lesson.subject_primary || ''}
      `.toLowerCase();
      
      return keywords.some(keyword => searchText.includes(keyword));
    });

    return matches.slice(0, 5);
  }
}

export default NasaDataService.getInstance();
