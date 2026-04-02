import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GamePage() {
  const { gameId } = useParams();
  console.log("gameId:", gameId);

  const navigate = useNavigate();

  const [wordLength, setWordLength] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Highscore-data
  const [playerName, setPlayerName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [uniqueLetters, setUniqueLetters] = useState(false); // om du sparar detta i spelet

  // Hämta spelet
  useEffect(() => {
    async function loadGame() {
      const res = await fetch(`/api/game/${gameId}`);
      const data = await res.json();

      setWordLength(data.wordLength);
      setAttemptsLeft(data.attemptsLeft);
      setGuesses(data.guesses);
      setGameOver(data.gameOver);
      setWin(data.win);
      setUniqueLetters(data.uniqueLetters);

      // Starta tidtagning
      setStartTime(Date.now());
    }

    loadGame();
  }, [gameId]);

  // Skicka gissning
  async function sendGuess() {
    if (guess.length !== wordLength) return;

    const res = await fetch("/api/game/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, guess })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      return;
    }

    const data = await res.json();

    setGuesses([...guesses, data.result]);
    setAttemptsLeft(data.attemptsLeft);
    setGameOver(data.gameOver);
    setWin(data.win);
    setGuess("");
  }

  // Skicka highscore
  async function submitHighscore() {
    const timeTaken = Date.now() - startTime;

    await fetch("/api/highscore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: playerName,
        timeTaken,
        guesses,
        wordLength,
        uniqueLetters
      })
    });

    navigate("/highscore");
  }

  if (!wordLength) return <p>Loading game...</p>;

  // Färg för rutorna
  function getColor(result) {
    if (result === "correct") return "#6aaa64";   // grön
    if (result === "misplaced") return "#c9b458"; // gul
    return "#787c7e";                              // grå
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Wordle Game</h1>

      <p>Attempts left: {attemptsLeft}</p>

      <input
        type="text"
        maxLength={wordLength}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        disabled={gameOver}
        style={{ fontSize: "1.5rem", textTransform: "uppercase" }}
      />

      <button
        onClick={sendGuess}
        disabled={gameOver}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        Guess
      </button>

      {/* Wordle-rutorna */}
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {guesses.map((g, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "0.5rem" }}>
            {g.map((letterObj, j) => (
              <div
                key={j}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: getColor(letterObj.result),
                  textTransform: "uppercase",
                  borderRadius: "4px"
                }}
              >
                {letterObj.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <h2 style={{ marginTop: "1rem" }}>
          {win ? "You won!" : "Game over!"}
        </h2>
      )}

      {/* Highscore-formulär */}
      {gameOver && win && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Du vann! Skriv ditt namn:</h3>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ fontSize: "1.2rem", padding: "0.3rem" }}
          />

          <button
            onClick={submitHighscore}
            style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
          >
            Skicka resultat
          </button>
        </div>
      )}
    </div>
  );
}
