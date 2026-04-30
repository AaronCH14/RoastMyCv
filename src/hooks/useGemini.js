/**
 * useGemini - Custom hook for Gemini API CV analysis
 */
export function useGemini() {
  const analyzeCV = async (cvText) => {
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('API key not found. Check your .env file has VITE_GEMINI_API_KEY set.');
    }
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are a brutally honest but constructive career advisor and CV expert.
Analyze the following CV and respond ONLY with a valid JSON object. 
No markdown, no explanation, just raw JSON.

Return this exact structure:
{
  "score": <number 0-100>,
  "roast": "<a sharp, witty, honest 2-3 sentence roast of the CV overall>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "tips": [
    { "title": "<tip title>", "description": "<actionable tip description>" },
    { "title": "<tip title>", "description": "<actionable tip description>" }
  ]
}

CV to analyze:
${cvText}
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {  // settings model for CV generate
          temperature: 0.2,
          maxOutputTokens: 8192,      // Token CV generate
          thinkingConfig: {
            thinkingBudget: 1024,     // Thinking and reasoning model
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    const raw = data.candidates[0].content.parts[0].text;

    let cleaned = raw.replace(/```json\s*/gi, '').replace(/```/g, '').trim();

    const start = cleaned.indexOf('{');
    const end   = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) {
      throw new Error('AI returned an unexpected response format. Please try again.');
    }
    cleaned = cleaned.slice(start, end + 1);

    try {
      return JSON.parse(cleaned);
    } catch {
      throw new Error('Could not parse AI response. The model may have been cut off — try again.');
    }
  };

  return { analyzeCV };
}
