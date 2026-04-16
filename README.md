**About this project**

This project is a Wordle‑inspired game built as a fullstack application.
The player chooses the word length and whether the word may contain repeated letters. The game then selects a random word on the server, and the player tries to guess it.

Each guess gives feedback using colors:
* **Green** for correct letter in the correct position

* **Yellow** for correct letter in the wrong position

* **Red** for incorrect letter

When the player finds the correct word, the game ends and the player can submit their name to the highscore list. The highscore page is server‑side rendered and stores results in a database.

The project includes three pages:

* The game page (React)

* A server‑rendered highscore list

* This static information page
