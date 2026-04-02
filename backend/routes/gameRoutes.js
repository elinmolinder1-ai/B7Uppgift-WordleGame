// This file defines all routes for the Wordle game.
// It connects the URL endpoints to the controller functions.
// The routes allow the frontend to start a new game, send guesses,
// and load an existing game by its ID.


import { Router } from "express";
import { startGame, guessWord, getGame } from "../controllers/gameController.js";

const router = Router();

// Get an existing game by its ID
router.get("/:gameId", getGame);

// Start a new game
router.post("/start", startGame);

// Send a guess to the backend
router.post("/guess", guessWord);


export default router;
