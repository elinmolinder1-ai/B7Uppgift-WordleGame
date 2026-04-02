import express from "express";
import { getHighscores, saveHighscore } from "../controllers/scoreController.js";

const router = express.Router();

router.get("/", getHighscores);
router.post("/", saveHighscore);

export default router;
