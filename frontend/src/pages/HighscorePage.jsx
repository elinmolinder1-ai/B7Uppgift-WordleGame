// This page shows the list of saved highscores.
// It loads the highscores from the backend and displays them.
// The page also includes a button to start a new game.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HighscorePage() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  // Load highscores when the page opens
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

      {/* Show message if no scores exist */}
      {scores.length === 0 && <p>No highscores yet.</p>}

      {/* List all highscores */}
      <ul>
        {scores.map((s, i) => (
          <li key={i} style={{ marginBottom: "1rem" }}>
            <strong>{s.name}</strong> – {s.timeTaken} ms – {s.wordLength} letters
          </li>
        ))}
      </ul>

      {/* Button to go back and start a new game */}
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
