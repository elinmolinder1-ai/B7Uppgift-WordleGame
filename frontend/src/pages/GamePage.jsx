import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GamePage() {
  const { gameId } = useParams();

  const [wordLength, setWordLength] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [uniqueLetters, setUniqueLetters] = useState(false);
  const [correctWord, setCorrectWord] = useState("");

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

      setStartTime(Date.now());
    }

    loadGame();
  }, [gameId]);

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
    setUniqueLetters(data.uniqueLetters);
    setGuess("");

    if (data.gameOver && data.win) {
      setCorrectWord(data.correctWord);
    }
  }

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
        uniqueLetters,
        word: correctWord
      })
    });

    window.location.href = "http://localhost:5080/highscore-ssr";
  }

  if (!wordLength) return <p>Loading game...</p>;

  function getColor(result) {
    if (result === "correct") return "#6aaa64";
    if (result === "misplaced") return "#ffd621";
    if (result === "wrong") return "#d32f2f";       
    return "#787c7e";
  }

  const buttonStyle = {
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    margin: "10px",
    borderRadius: "8px",
    background: "#6aaa64",
    color: "white",
    border: "none"
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Wordle Game</h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
        Attempts left: <strong>{attemptsLeft}</strong>
      </p>

      <input
        type="text"
        maxLength={wordLength}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        disabled={gameOver}
        style={{
          fontSize: "1.5rem",
          textTransform: "uppercase",
          padding: "0.5rem",
          width: "80%",
          borderRadius: "6px",
          border: "2px solid #ccc",
          outline: "none",
          textAlign: "center"
        }}
      />

      <button onClick={sendGuess} disabled={gameOver} style={buttonStyle}>
        Guess
      </button>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {guesses.map((g, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "0.5rem" }}>
            {g.map((letterObj, j) => (
              <div
                key={j}
                style={{
                  width: "55px",
                  height: "55px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: getColor(letterObj.result),
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
              >
                {letterObj.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <h2 style={{ marginTop: "1rem", color: win ? "#6aaa64" : "#b00020" }}>
          {win ? "You won!" : "Game over!"}
        </h2>
      )}

      {gameOver && win && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ color: "#6aaa64" }}>🎉 Du vann! Skriv ditt namn:</h3>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{
              fontSize: "1.2rem",
              padding: "0.3rem",
              borderRadius: "6px",
              border: "2px solid #ccc",
              outline: "none"
            }}
          />

          <button onClick={submitHighscore} style={buttonStyle}>
            Skicka resultat
          </button>
        </div>
      )}
    </div>
  );
}
