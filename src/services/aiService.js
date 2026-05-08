import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { ItinerarySchema } from "./schema.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are a vibrant, energetic, and highly professional travel agent. 
Your goal is to help the user plan an "award-winning" travel itinerary.
Ask exactly ONE follow-up question at a time to understand their preferences better (destination, duration, pace, budget, specific interests, food preferences, etc.).
Once you have enough information (usually after 3-5 questions), tell them you are ready to generate the itinerary.

When you are ready to generate the final itinerary, your response MUST be a valid JSON object starting with { and ending with } containing:
- title: A catchy, vibrant title.
- description: A brief, exciting overview.
- days: Array of { day, activities: Array of { time, description, location } }.

Keep your conversational responses enthusiastic and helpful. Use emojis!
`;

/**
 * Gets a chat response from Gemini based on the conversation history.
 * @param {Array} history - Array of { role: "user"|"model", parts: [{ text: string }] }
 * @returns {Promise<string>} The AI's response.
 */
export async function getChatResponse(history) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(""); // This is just to trigger the initial prompt if history is empty, but we'll handle it better in server.js
  const response = await result.response;
  return response.text();
}

/**
 * Sends a message to the chat and gets the response.
 */
export async function sendMessage(history, message) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}

/**
 * Generates the final itinerary when the AI is ready.
 * (This is a helper to ensure we get JSON).
 */
export async function generateFinalItinerary(history) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT + "\n\nNOW GENERATE THE FINAL ITINERARY IN JSON FORMAT."
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage("Please generate the final itinerary JSON now.");
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const rawJson = JSON.parse(jsonMatch[0]);
    return ItinerarySchema.parse(rawJson);
  } else {
    throw new Error("Failed to extract JSON from Gemini response.");
  }
}
