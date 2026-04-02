/**
 * Wordle-feedback-algoritm
 * Regler:
 * - correct: rätt bokstav på rätt plats
 * - misplaced: bokstaven finns i ordet men på fel plats
 * - incorrect: bokstaven finns inte i ordet (eller är redan förbrukad)
 */

export function getFeedback(guess, answer) {
  // Normalisera case
  guess = guess.toUpperCase();
  answer = answer.toUpperCase();

  const result = [];
  const answerLetters = answer.split("");

  // 1. Markera "correct"
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = { letter: guess[i], result: "correct" };
      answerLetters[i] = null; // markera som använd
    } else {
      result[i] = { letter: guess[i], result: null };
    }
  }

  // 2. Markera "misplaced" eller "incorrect"
  for (let i = 0; i < guess.length; i++) {
    if (result[i].result === "correct") continue;

    const index = answerLetters.indexOf(guess[i]);

    if (index !== -1) {
      result[i].result = "misplaced";
      answerLetters[index] = null; // förbrukad bokstav
    } else {
      result[i].result = "incorrect";
    }
  }

  return result;
}
