import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import { sendMessage, generateFinalItinerary } from "./services/aiService.js";

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

app.use(session({
  secret: process.env.SESSION_SECRET || "travel-planner-secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/chat", (req, res) => {
  // Initialize chat history if not exists
  if (!req.session.history) {
    req.session.history = [];
  }
  res.render("chat", { history: req.session.history });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  
  if (!req.session.history) {
    req.session.history = [];
  }

  try {
    const aiResponse = await sendMessage(req.session.history, message);
    
    // Update history
    req.session.history.push({ role: "user", parts: [{ text: message }] });
    req.session.history.push({ role: "model", parts: [{ text: aiResponse }] });

    // Check if AI is ready to generate itinerary
    if (aiResponse.includes("{") && aiResponse.includes("}")) {
      return res.json({ redirect: "itinerary" });
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong! 🌴" });
  }
});

app.get("/itinerary", async (req, res) => {
  if (!req.session.history) {
    return res.redirect(".");
  }

  try {
    const itinerary = await generateFinalItinerary(req.session.history);
    res.render("itinerary", { itinerary });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Failed to generate your award-winning itinerary. Please try again!" });
  }
});

app.get("/reset", (req, res) => {
  req.session.destroy();
  res.redirect(".");
});

// Export for Cloud Functions
export { app };

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

