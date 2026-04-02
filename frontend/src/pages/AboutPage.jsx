// This page shows information about the game.
// It also includes a button to start a new game.

import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>About this game</h1>

      {/* Simple description */}
      <p>
        This is a Wordle-style game built with React and Express.
        You can choose word length, unique letters, and try to guess the word
        within a limited number of attempts.
      </p>

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
