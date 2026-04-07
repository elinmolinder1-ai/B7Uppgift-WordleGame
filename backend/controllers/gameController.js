import { WORDS } from "../utils/swedishWords.js";
import { getFeedback } from "../algorithms/getFeedback.js";
import { chooseWord } from "../algorithms/chooseWord.js";


let games = {};

// Create a unique game ID
function generateGameId() {
  return Math.random().toString(36).substring(2, 10);
}

// -------------------------
// START NEW GAME
// -------------------------
export function startGame(req, res) {
  const { wordLength, uniqueLetters } = req.body;

  // 1. Choose a word based on length and unique-letter setting
  const word = chooseWord(WORDS, wordLength, uniqueLetters);

  if (!word) {
    return res.status(400).json({ error: "No word found with these settings" });
  }

  // 2. Create a unique game ID
  const gameId = generateGameId();

  // 3. Save the game in memory
  games[gameId] = {
    word,
    wordLength,
    uniqueLetters,
    guesses: [],
    attemptsLeft: 6,
    gameOver: false,
    win: false,
    startTime: Date.now()
  };

  // 4. Send back game settings and ID
  res.json({
    gameId,
    wordLength,
    uniqueLetters
  });
}

//--------------------------
// GET GAME 
//--------------------------

export function getGame(req, res) {
  const { gameId } = req.params;
  const game = games[gameId];

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // Return the current game state
  res.json({
    wordLength: game.wordLength,
    attemptsLeft: game.attemptsLeft,
    guesses: game.guesses,
    gameOver: game.gameOver,
    win: game.win,
    timeTaken: game.gameOver ? game.timeTaken : null

  });
}


// -------------------------
// GUESS WORD
// -------------------------
export function guessWord(req, res) {
  const { gameId, guess } = req.body;
  const game = games[gameId];

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // Run feedback algorithm
  const result = getFeedback(guess, game.word);

  // Save guess
  game.guesses.push({ guess, result });

  // Reduce attempts
  game.attemptsLeft--;

  // Check win
  if (guess.toUpperCase() === game.word.toUpperCase()) {
    game.win = true;
    game.gameOver = true;
  }

  // Check loss
  if (game.attemptsLeft === 0) {
    game.gameOver = true;
  }

  const timeTaken = Date.now() - game.startTime;

  if (game.gameOver) {
    return res.json({
      result,
      attemptsLeft: game.attemptsLeft,
      gameOver: game.gameOver,
      win: game.win,
      wordLength: game.wordLength,
      uniqueLetters: game.uniqueLetters,
      timeTaken,
      correctWord: game.word 
    });
  }

  res.json({
    result,
    attemptsLeft: game.attemptsLeft,
    gameOver: game.gameOver,
    win: game.win,
    wordLength: game.wordLength,
    uniqueLetters: game.uniqueLetters,
    timeTaken
  });
}
