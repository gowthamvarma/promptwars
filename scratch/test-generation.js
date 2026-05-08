import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGeneration() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent("Say hello!");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("Generation Error:", err);
  }
}

testGeneration();
