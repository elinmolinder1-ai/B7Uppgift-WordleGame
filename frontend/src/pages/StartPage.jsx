// This page lets the player choose game settings and start a new Wordle game.
// It sends the selected options to the backend, receives a gameId,
// and then navigates the user to the GamePage. 
// The page also includes buttons to view the highscore list and the about page.


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [selectedLength, setSelectedLength] = useState(5);

    // If the word must have unique letters
  const [uniqueLetters, setUniqueLetters] = useState(true);

  // For navigation to other pages
  const navigate = useNavigate();

   // Start a new game by sending settings to backend
  async function startGame() {
    try {
      const res = await fetch("/api/game/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wordLength: selectedLength,
          uniqueLetters: uniqueLetters
        })

      });

      const data = await res.json();

      // Go to the GamePage with the returned gameId
      navigate(`/game/${data.gameId}`);
    } catch (error) {
      console.error("Could not start game:", error);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Wordle game</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Word length:
          <select
            value={selectedLength}
            onChange={(e) => setSelectedLength(Number(e.target.value))}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Unique letters:
          <input
            type="checkbox"
            checked={uniqueLetters}
            onChange={(e) => setUniqueLetters(e.target.checked)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>

      <button
        onClick={startGame}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1.2rem",
          cursor: "pointer",
          margin: "10px",
          borderRadius: "8px"
        }}
      >
        Start Game
      </button>

      <button
        onClick={() => navigate("/highscore")}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1.2rem",
          cursor: "pointer",
          margin: "10px",
          borderRadius: "8px"
        }}
      >
        Highscore
      </button>

      <button
        onClick={() => navigate("/about")}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1.2rem",
          cursor: "pointer",
          margin: "10px",
          borderRadius: "8px"
        }}
      >
        About page
      </button>

    </div>
  );
}
