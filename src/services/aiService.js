import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a travel itinerary based on user preferences.
 * @param {Object} preferences - User preferences (destination, duration, interests, etc.).
 * @returns {Promise<Object>} The generated itinerary in JSON format.
 */
export async function generateItinerary(preferences) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are a travel planning assistant. Generate a detailed, personalized travel itinerary based on the following preferences:
    - Destination: ${preferences.destination}
    - Duration: ${preferences.duration} days
    - Interests: ${preferences.interests}
    - Budget: ${preferences.budget}

    Please provide the itinerary in a structured JSON format with the following fields:
    - title: A catchy title for the trip.
    - description: A brief overview of the trip.
    - days: An array of objects, each representing a day.
      - day: The day number.
      - activities: An array of activity objects.
        - time: Suggested time of day (e.g., "Morning", "Afternoon", "Evening").
        - description: Details of the activity.
        - location: The name of the place or landmark.
    
    Ensure the output is valid JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Attempt to parse JSON from the response text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Failed to extract JSON from Gemini response.");
    }
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
}
