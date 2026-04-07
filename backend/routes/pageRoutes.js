import { Router } from "express";
import { getAllScores } from "../controllers/scoreController.js";

const router = Router();

// About page
router.get("/about", (req, res) => {
  res.send("About page");
});

// SSR Highscore page
router.get("/highscore-ssr", async (req, res) => {
  const scores = await getAllScores();
  res.render("highscore", { scores });
});

export default router;
