// This page shows the list of saved highscores.
// It loads the highscores from the backend and displays them.
// The page also includes a button to start a new game.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HighscorePage() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadScores() {
      const res = await fetch("/api/highscore");
      const data = await res.json();
      setScores(data);
    }
    loadScores();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Highscores</h1>

      {scores.length === 0 && <p>No highscores yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {scores.map((s) => (
          <li
            key={s._id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#f9f9f9"
            }}
          >
            <strong>{s.name}</strong>  
            <br />
            Time: {(s.timeTaken / 1000).toFixed(2)} sec  
            <br />
            Word: <strong>{s.word}</strong>  
            <br />
            Guesses: {s.guesses?.length ?? 0}
            <br />
            Word length: {s.wordLength}
            <br />
            Unique letters: {s.uniqueLetters ? "Yes" : "No"}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginTop: "1rem",
          borderRadius: "8px"
        }}
      >
        Start new game
      </button>
    </div>
  );
}
