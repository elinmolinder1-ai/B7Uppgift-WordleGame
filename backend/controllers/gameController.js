import { WORDS } from "../utils/swedishWords.js";
import { getFeedback } from "../algorithms/getFeedback.js";
import { chooseWord } from "../algorithms/chooseWord.js";


// Lagring i minnet
let games = {};

// Skapa unikt gameId
function generateGameId() {
  return Math.random().toString(36).substring(2, 10);
}

// -------------------------
// STARTA NYTT SPEL
// -------------------------
export function startGame(req, res) {
  const { wordLength, uniqueLetters } = req.body;

  // 1. Välj ord baserat på inställningar
  const word = chooseWord(WORDS, wordLength, uniqueLetters);

  if (!word) {
    return res.status(400).json({ error: "No word found with these settings" });
  }

  // 2. Skapa gameId
 const gameId = generateGameId();

  // 3. Spara spelet i memory
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

  // 4. Skicka tillbaka gameId + inställningar
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
// GISSNING
// -------------------------
export function guessWord(req, res) {
  const { gameId, guess } = req.body;
  const game = games[gameId];

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // feedback-algoritm
  const result = getFeedback(guess, game.word);

game.guesses.push({ guess, result });

  game.attemptsLeft--;

  if (guess.toUpperCase() === game.word.toUpperCase()) {
    game.win = true;
    game.gameOver = true;
  }

  if (game.attemptsLeft === 0) {
    game.gameOver = true;
  }

  const timeTaken = Date.now() - game.startTime;

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
