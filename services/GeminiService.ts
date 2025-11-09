/**
 * Gemini AI Service - Exclusively using gemini-2.5-flash
 * Pipeline 1 (Sanitizer): Clean raw NASA HTML data
 * Pipeline 2 (Synthesizer): Answer user questions with context
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';
import { NasaLesson, SanitizedLesson } from '../types/nasa';

const MODEL_NAME = 'gemini-2.5-flash'; // Using latest stable flash model
const AI_TIMEOUT = 5000; // 5 seconds as specified
const TEMPERATURE = 0.7;

export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: any;

  private constructor() {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.warn('[GeminiService] WARNING: No Gemini API key configured!');
    }
    
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY || 'dummy-key');
    this.model = this.genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: {
        temperature: TEMPERATURE,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });
  }

  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  /**
   * Pipeline Step 1: Sanitize raw NASA lesson data
   * Extracts clean, structured information from messy HTML content
   */
  async sanitizeLessons(lessons: NasaLesson[]): Promise<SanitizedLesson[]> {
    if (lessons.length === 0) return [];

    console.log(`[GeminiService] Sanitizing ${lessons.length} lessons...`);

    const prompt = `You are a NASA mission intelligence data processor. Extract key information from these NASA Lessons Learned reports.

INPUT DATA:
${lessons.map((l, i) => `
LESSON ${i + 1} (ID: ${l.lesson_id}):
Title: ${l.title}
Abstract: ${l.abstract}
Driving Event: ${l.driving_event || 'N/A'}
Lesson: ${l.lesson || 'N/A'}
Recommendation: ${l.recommendation || 'N/A'}
---
`).join('\n')}

TASK: For each lesson, extract and return CLEAN, MINIMAL JSON with this exact structure:
[
  {
    "lesson_id": <number>,
    "title": "<clean title>",
    "abstract": "<concise abstract, remove HTML>",
    "driving_event": "<what happened, 1-2 sentences>",
    "root_cause": "<why it happened, 1-2 sentences>",
    "recommendation": "<key recommendation, 1-2 sentences>",
    "metadata": {
      "mission": "<mission name if mentioned>",
      "center": "<NASA center if mentioned>",
      "subjects": [<relevant subject tags>]
    }
  }
]

Return ONLY the JSON array, no markdown, no explanation.`;

    try {
      const result = await this.generateWithTimeout(prompt);
      
      // Parse JSON response
      let jsonText = result.trim();
      
      // Remove markdown code blocks if present
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const sanitized: SanitizedLesson[] = JSON.parse(jsonText);
      console.log(`[GeminiService] ✓ Sanitized ${sanitized.length} lessons`);
      
      return sanitized;
      
    } catch (error: any) {
      console.error('[GeminiService] Sanitization error:', error.message);
      
      // Fallback: return basic sanitized format
      return lessons.map(l => ({
        lesson_id: l.lesson_id,
        title: l.title,
        abstract: l.abstract,
        driving_event: l.driving_event || 'Not specified',
        root_cause: l.lesson || 'Not specified',
        recommendation: l.recommendation || 'Not specified',
        metadata: {
          mission: l.mission,
          center: l.center,
          subjects: [l.subject_primary, ...(l.subject_secondary || [])].filter(Boolean) as string[],
        },
      }));
    }
  }

  /**
   * Pipeline Step 2: Answer user questions with sanitized lesson context
   */
  async answerQuestion(
    question: string, 
    context: SanitizedLesson[]
  ): Promise<{
    answer: string;
    citedLessonIds: number[];
  }> {
    console.log(`[GeminiService] Answering: "${question}"`);

    const contextText = context.map((l, i) => `
LESSON ${i + 1} [ID: ${l.lesson_id}]:
Mission: ${l.metadata.mission || 'Unknown'}
Title: ${l.title}
What Happened: ${l.driving_event}
Root Cause: ${l.root_cause}
Recommendation: ${l.recommendation}
---
`).join('\n');

    const prompt = `You are AstroScope, an elite NASA mission intelligence AI assistant. You provide expert analysis of NASA's Lessons Learned to help engineers and mission planners avoid past mistakes.

CONTEXT - Relevant NASA Lessons:
${contextText}

USER QUESTION: ${question}

INSTRUCTIONS:
- Provide a comprehensive, professional answer based ONLY on the lessons provided
- When referencing specific lessons, mention them as "Lesson ID: <lesson_id>"
- Be concise but thorough (2-4 paragraphs)
- Focus on actionable insights and specific recommendations
- Use professional aerospace engineering tone
- If the context doesn't fully answer the question, acknowledge limitations

Your response:`;

    try {
      const answer = await this.generateWithTimeout(prompt);
      
      // Extract cited lesson IDs from response
      const citedIds = this.extractLessonIds(answer, context.map(l => l.lesson_id));
      
      console.log(`[GeminiService] ✓ Generated answer (${answer.length} chars, ${citedIds.length} citations)`);
      
      return {
        answer: answer.trim(),
        citedLessonIds: citedIds,
      };
      
    } catch (error: any) {
      console.error('[GeminiService] Question answering error:', error.message);
      
      // Fallback response
      return {
        answer: `I found ${context.length} relevant NASA lessons for your query. ${
          context[0] ? `The most relevant is "${context[0].title}" from ${context[0].metadata.mission || 'a NASA mission'}.` : ''
        } However, I'm currently unable to provide a detailed analysis. Please try again or rephrase your question.`,
        citedLessonIds: context.slice(0, 3).map(l => l.lesson_id),
      };
    }
  }

  /**
   * Generate text with timeout protection
   */
  private async generateWithTimeout(prompt: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Gemini API timeout (>5s)'));
      }, AI_TIMEOUT);

      try {
        const result = await this.model.generateContent(prompt);
        clearTimeout(timeoutId);
        
        const response = await result.response;
        const text = response.text();
        
        resolve(text);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * Extract lesson IDs mentioned in text
   */
  private extractLessonIds(text: string, validIds: number[]): number[] {
    const idPattern = /(?:Lesson\s+)?ID:\s*(\d+)/gi;
    const matches = text.matchAll(idPattern);
    
    const cited = new Set<number>();
    for (const match of matches) {
      const id = parseInt(match[1]);
      if (validIds.includes(id)) {
        cited.add(id);
      }
    }
    
    return Array.from(cited);
  }

  /**
   * Generate a suggested follow-up question based on context
   */
  async generateFollowUpQuestions(
    conversation: { question: string; answer: string }[]
  ): Promise<string[]> {
    if (conversation.length === 0) return [];

    const prompt = `Based on this NASA mission intelligence conversation, suggest 3 insightful follow-up questions a user might ask:

${conversation.slice(-3).map((c, i) => `
Q${i + 1}: ${c.question}
A${i + 1}: ${c.answer.substring(0, 200)}...
`).join('\n')}

Return 3 questions as a JSON array: ["Question 1?", "Question 2?", "Question 3?"]`;

    try {
      const result = await this.generateWithTimeout(prompt);
      let jsonText = result.trim();
      
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const questions: string[] = JSON.parse(jsonText);
      return questions.slice(0, 3);
      
    } catch (error) {
      return [];
    }
  }
}

export default GeminiService.getInstance();
