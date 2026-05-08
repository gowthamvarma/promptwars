import { sendMessage, generateFinalItinerary } from "../services/aiService.js";

/**
 * Renders the home page.
 */
export const getIndex = (req, res) => {
  res.render("index");
};

/**
 * Renders the chat page and initializes history if needed.
 */
export const getChat = (req, res) => {
  if (!req.session.history) {
    req.session.history = [];
  }
  res.render("chat", { history: req.session.history });
};

/**
 * Handles incoming chat messages.
 */
export const postChat = async (req, res) => {
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
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Something went wrong! 🌴" });
  }
};

/**
 * Generates and renders the final itinerary.
 */
export const getItinerary = async (req, res) => {
  if (!req.session.history) {
    return res.redirect("/");
  }

  try {
    const itinerary = await generateFinalItinerary(req.session.history);
    res.render("itinerary", { itinerary });
  } catch (error) {
    console.error("Itinerary Error:", error);
    res.status(500).render("error", { 
      message: "Failed to generate your award-winning itinerary. Please try again!" 
    });
  }
};

/**
 * Resets the session and redirects to home.
 */
export const getReset = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session Destroy Error:", err);
    }
    res.redirect("/");
  });
};
