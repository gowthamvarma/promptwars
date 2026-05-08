import dotenv from "dotenv";
dotenv.config();

const requiredEnv = ["GEMINI_API_KEY"];

/**
 * Validates that all required environment variables are set.
 * Throws an error if any are missing.
 */
export const validateEnv = () => {
  const missing = requiredEnv.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
    if (process.env.NODE_ENV !== "test") {
      console.error("Please check your .env file.");
      process.exit(1);
    } else {
      console.warn("⚠️ Continuing without required env vars for testing...");
    }
  }
};
