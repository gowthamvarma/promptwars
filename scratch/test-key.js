import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    if (data.error) {
      console.error("API Error:", data.error);
      return;
    }

    console.log("Available Models:");
    data.models.forEach(m => console.log(`- ${m.name}`));
  } catch (err) {
    console.error("Connection Error:", err);
  }
}

listModels();
