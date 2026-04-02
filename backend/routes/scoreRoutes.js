import { Router } from "express";
import { saveScore, getAllScores } from "../controllers/scoreController.js";

const router = Router();

// Save a new highscore
router.post("/", async (req, res) => {
  try {
    await saveScore(req.body);
    res.status(201).json({ message: "Score saved" });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Get all highscores (API version, still allowed)
router.get("/", async (req, res) => {
  try {
    const scores = await getAllScores();
    res.json(scores);
  } catch (err) {
    console.error("Error loading scores:", err);
    res.status(500).json({ error: "Failed to load scores" });
  }
});

export default router;
