import express from "express";
import * as travelController from "../controllers/travelController.js";

const router = express.Router();

router.get("/", travelController.getIndex);
router.get("/chat", travelController.getChat);
router.post("/chat", travelController.postChat);
router.get("/itinerary", travelController.getItinerary);
router.get("/reset", travelController.getReset);

export default router;
