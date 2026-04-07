import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GamePage() {

  // Get gameId from the URL
  const { gameId } = useParams();


  const navigate = useNavigate();

  // Game state from backend
  const [wordLength, setWordLength] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Highscore-data
  const [playerName, setPlayerName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [uniqueLetters, setUniqueLetters] = useState(false);
  const [correctWord, setCorrectWord] = useState("");


  // Load game data when page opens
  useEffect(() => {
    async function loadGame() {
      const res = await fetch(`/api/game/${gameId}`);
      const data = await res.json();


      // Set game info from backend
      setWordLength(data.wordLength);
      setAttemptsLeft(data.attemptsLeft);
      setGuesses(data.guesses);
      setGameOver(data.gameOver);
      setWin(data.win);
      setUniqueLetters(data.uniqueLetters);

      // Start timer
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




  // Send highscore to backend
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
      word: correctWord   // send the right word 
    })
  });

  navigate("/highscore");
}


  // Show loading text until game data is ready
  if (!wordLength) return <p>Loading game...</p>;

  // Choose tile color based on result
  function getColor(result) {
    if (result === "correct") return "#6aaa64";  
    if (result === "misplaced") return "#c9b458";
    return "#787c7e";                             
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

      {/* Highscore-form */}
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
