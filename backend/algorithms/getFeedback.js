/**
 * Worde getFeedback
 * Create a result array.
 * Mark all correct letters first.
 * Count remaining letters that exist in the word.
 * Go through the rest and mark them as misplaced or incorrect.
 */


export function getFeedback(guess, answer) {
  guess = guess.toUpperCase();
  answer = answer.toUpperCase();

  const result = [];
  const answerLetters = answer.split("");

  // "correct"
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = { letter: guess[i], result: "correct" };
      answerLetters[i] = null; //marked as used
    } else {
      result[i] = { letter: guess[i], result: null };
    }
  }

  // "misplaced" or "incorrect"
  for (let i = 0; i < guess.length; i++) {
    if (result[i].result === "correct") continue;

    const index = answerLetters.indexOf(guess[i]);

    if (index !== -1) {
      result[i].result = "misplaced";
      answerLetters[index] = null; //used letter
    } else {
      result[i].result = "incorrect";
    }
  }

  return result;
}
