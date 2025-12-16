/**
 * NASA LLIS Data Types
 */

export interface NasaLesson {
  lesson_id: number;
  title: string;
  abstract: string;
  driving_event?: string;
  lesson?: string;
  recommendation?: string;
  subject_primary?: string;
  subject_secondary?: string[];
  center?: string;
  organization?: string;
  mission?: string;
  lesson_date?: string;
}

export interface NasaApiResponse {
  results?: NasaLesson[];
  total?: number;
  query?: string;
}

export interface SanitizedLesson {
  lesson_id: number;
  title: string;
  abstract: string;
  driving_event: string;
  root_cause: string;
  recommendation: string;
  metadata: {
    mission?: string;
    center?: string;
    date?: string;
    subjects?: string[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  lessonIds?: number[];
  isLoading?: boolean;
}
