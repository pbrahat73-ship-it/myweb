import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const GeminiService = {
  generateBlogPost: async (title: string, category: string, keywords: string) => {
    if (!apiKey) {
      throw new Error("API Key is missing. Please set REACT_APP_GEMINI_API_KEY.");
    }

    const model = "gemini-2.5-flash";
    const prompt = `
      You are a professional tech blogger. Write a high-quality, engaging blog post about "${title}".
      Category: ${category}
      Keywords/Focus: ${keywords}

      The output must be a JSON object with the following structure:
      {
        "content": "Full blog post content in Markdown format. Use headings, lists, and code blocks where appropriate.",
        "excerpt": "A compelling 1-2 sentence summary of the post.",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
      }
      
      Ensure the content is informative, technical but accessible, and structured well.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from AI");
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
};