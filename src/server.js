import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { generateItinerary } from "./services/aiService.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure trailing slash for relative paths on Cloud Functions
app.use((req, res, next) => {
  if (req.path === "/" && !req.originalUrl.endsWith("/")) {
    return res.redirect(301, req.originalUrl + "/");
  }
  next();
});


// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/generate", async (req, res) => {
  const { destination, duration, interests, budget } = req.body;
  
  try {
    const itinerary = await generateItinerary({ destination, duration, interests, budget });
    res.render("itinerary", { itinerary });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Failed to generate itinerary. Please try again." });
  }
});

// Export for Cloud Functions
export { app };

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

