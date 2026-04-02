let highscores = [];

export function saveHighscore(req, res) {
  const { name, timeTaken, guesses, wordLength, uniqueLetters } = req.body;

  const entry = {
    name,
    timeTaken,
    guesses,
    wordLength,
    uniqueLetters,
    date: Date.now()
  };

  highscores.push(entry);

  // sortera snabbast först
  highscores.sort((a, b) => a.timeTaken - b.timeTaken);

  res.json({ success: true });
}

export function getHighscores(req, res) {
  res.json(highscores.slice(0, 20));
}
