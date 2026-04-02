import { Router } from "express";
import { getAllScores } from "../controllers/scoreController.js";

const router = Router();

// About page (React or SSR depending on your setup)
router.get("/about", (req, res) => {
  res.send("About page");
});

// SSR Highscore page
router.get("/highscore-ssr", async (req, res) => {
  const scores = await getAllScores(); // hämtar från SQLite
  res.render("highscore", { scores });
});

export default router;
