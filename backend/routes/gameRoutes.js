import { Router } from "express";
import { startGame, guessWord, getGame } from "../controllers/gameController.js";

const router = Router();
router.get("/:gameId", getGame);

router.post("/start", startGame);
router.post("/guess", guessWord);

//fetch(`/api/game/${gameId}`)


export default router;
