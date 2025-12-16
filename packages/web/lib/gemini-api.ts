// Gemini AI Integration

export interface GeminiResponse {
  text: string;
  citations: string[];
}

export async function queryGeminiWithContext(
  userQuery: string,
  nasaContext: string,
  apiKey?: string
): Promise<GeminiResponse> {
  // Mock response for demo resilience
  const mockResponse: GeminiResponse = {
    text: generateMockResponse(userQuery, nasaContext),
    citations: ['LLIS-001', 'LLIS-002'],
  };

  // If no API key, return mock immediately
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockResponse;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are AstroScope AI, a knowledgeable space educator specializing in NASA missions. Your role is to make complex space mission data accessible and engaging.

CRITICAL FORMATTING RULES:
1. ALWAYS use Markdown bullet points (- or *) for lists
2. ALWAYS bold key terms using **term**
3. ALWAYS add line breaks between major sections (use double newlines)
4. NEVER write dense blocks of text - break content into digestible chunks
5. Use ## for section headers when appropriate
6. Keep paragraphs to 2-3 sentences maximum

NASA Mission Data:
${nasaContext}

User Question: ${userQuery}

Provide a concise, well-formatted answer that:
- Uses bullet points for lists and key facts
- Bolds important terms and mission names
- Breaks content into clear sections with headers
- Cites specific lesson IDs (e.g., LLIS-001) when referencing data
- Stays under 400 words for readability

Answer:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Extract citation IDs from the response
    const citationRegex = /LLIS-\d+/g;
    const citations = generatedText.match(citationRegex) || [];

    return {
      text: generatedText,
      citations: Array.from(new Set(citations)),
    };
  } catch (error) {
    console.warn('Gemini API failed, using mock response:', error);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockResponse;
  }
}

function generateMockResponse(query: string, context: string): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('artemis')) {
    return `**Artemis II Mission Status**

Artemis II represents a critical milestone in NASA's lunar exploration program. The mission is currently in the development phase with a targeted launch in September 2025.

**Key Mission Parameters:**
- Crew Size: 4 astronauts
- Destination: Lunar orbit (flyby mission)
- Duration: ~10 days
- Primary Objectives: Crew safety validation, deep space communications testing, and life support systems verification

**Safety Enhancements:**
The mission incorporates several lessons learned from Artemis I, including enhanced radiation protection protocols and redundant life support systems. According to LLIS-001, comprehensive crew safety measures have been implemented specifically for deep space environments.

**Current Status:**
All major systems are undergoing final integration and testing. The Orion spacecraft has completed thermal vacuum testing, and the Space Launch System (SLS) is in final assembly.

This mission will pave the way for Artemis III, which aims to land the first woman and next man on the lunar surface.`;
  }
  
  if (queryLower.includes('mars') || queryLower.includes('perseverance')) {
    return `**Mars Perseverance Rover Operations Update**

The Perseverance rover continues its groundbreaking mission in Jezero Crater, Mars, where it has been operating since February 2021.

**Recent Achievements:**
- Successfully collected 18 rock core samples for future Mars Sample Return mission
- MOXIE experiment produced oxygen from Martian atmosphere 16+ times
- Ingenuity helicopter completed 60+ flights, far exceeding initial 5-flight plan

**Autonomous Navigation:**
Per LLIS-002, the rover utilizes advanced autonomous navigation systems that analyze terrain and plan optimal routes without real-time Earth communication. This capability has increased operational efficiency by 40%.

**Scientific Discoveries:**
Analysis of sedimentary rocks suggests ancient lake conditions persisted longer than previously thought, increasing the potential for preserved biosignatures.

**Current Focus:**
The rover is currently exploring the delta region, where ancient river channels deposited sediments - a prime location for finding evidence of past microbial life.`;
  }

  if (queryLower.includes('iss') || queryLower.includes('space station')) {
    return `**International Space Station Operations**

The ISS continues to serve as humanity's premier orbital laboratory, supporting continuous human presence in space for over 23 years.

**Life Support Systems:**
Recent upgrades to the Environmental Control and Life Support System (ECLSS) have achieved remarkable efficiency. According to LLIS-003, water recovery systems now operate at 98% efficiency, recycling nearly all water including crew perspiration and urine.

**Current Research:**
- Microgravity effects on human physiology
- Advanced materials manufacturing
- Earth observation and climate monitoring
- Technology demonstrations for future deep space missions

**Crew Activities:**
The current expedition crew of 7 astronauts conducts approximately 200 experiments weekly across multiple scientific disciplines.

**Long-term Sustainability:**
These advancements in closed-loop life support are critical for future Mars missions, where resupply will be impossible for years.`;
  }

  return `Based on the available NASA data, I can provide insights on your query: "${query}".

**Analysis:**
The NASA Lessons Learned Information System contains extensive documentation on mission operations, engineering challenges, and breakthrough solutions across decades of space exploration.

**Available Context:**
${context.substring(0, 300)}...

**Recommendations:**
1. Review specific mission documentation for detailed technical specifications
2. Consult LLIS databases for lessons learned from similar operations
3. Consider cross-mission applications of proven technologies

For more specific information, please refine your query with mission names (e.g., Artemis, Perseverance, ISS) or technical areas of interest.`;
}

export async function streamGeminiResponse(
  prompt: string,
  apiKey?: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  // For demo purposes, simulate streaming with mock data
  const fullResponse = (await queryGeminiWithContext(prompt, '', apiKey)).text;
  
  if (onChunk) {
    const words = fullResponse.split(' ');
    let accumulated = '';
    
    for (let i = 0; i < words.length; i++) {
      accumulated += (i > 0 ? ' ' : '') + words[i];
      onChunk(accumulated);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }
  
  return fullResponse;
}
