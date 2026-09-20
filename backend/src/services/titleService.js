import { GoogleGenAI } from "@google/genai";

import { GEMINI_TITLE_API_KEY } from "../config/env.js";

import generateTitle from "../utils/generateTitle.js";


// Gemini client for title generation
const ai = new GoogleGenAI({
  apiKey: GEMINI_TITLE_API_KEY,
});


// Generate a meaningful conversation title
export const generateConversationTitle = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: message,

      config: {
        systemInstruction: `
You generate titles for conversations in Savora,
an AI meal-planning application.

Generate a short and meaningful title based on
the user's first message.

Rules:
- Maximum 5 words.
- Capture the main intent of the message.
- Make the title specific and meaningful.
- Do not simply copy the user's sentence.
- Do not use quotes.
- Do not add explanations.
- Do not write "Title:".
- Return ONLY the title.

Examples:

User:
"I have chicken, rice and eggs. Give me a high protein dinner."

Output:
High Protein Chicken Dinner

User:
"I have ₹200 and need dinner for two."

Output:
Budget Dinner for Two

User:
"I am craving something spicy with paneer."

Output:
Spicy Paneer Ideas

User:
"What can I make with potatoes and onions?"

Output:
Potato and Onion Recipes
        `,

        // We only need a very short title
        maxOutputTokens: 20,

        // Low temperature keeps titles consistent
        temperature: 0.3,
      },
    });

    const title = response.text?.trim();

    // If AI returned nothing, use fallback
    if (!title) {
      throw new Error("Title AI returned an empty response");
    }

    return title;

  } catch (error) {
    console.error("Title AI Error:", error.message);

    // Fallback without using AI
    return generateTitle(message);
  }
};