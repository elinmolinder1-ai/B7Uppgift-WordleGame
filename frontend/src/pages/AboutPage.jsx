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

This game is inspired by Wordle. The goal is to guess a secret word.
You can choose the word length and if the word may contain repeated letters.
The game then picks a random word, and you try to find it!

Type your guess and press “Guess”.
After each guess, the letters will show colors:

Green – the letter is correct and in the right position

Yellow – the letter is in the word but in a different position

Red – the letter is not in the word

You have a limited number of attempts.
If you guess the word, you win the game.

After winning, you can enter your name and save your result to the highscore list.

Have fun playing!
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
