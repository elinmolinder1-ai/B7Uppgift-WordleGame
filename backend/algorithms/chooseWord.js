/**
 * Selects a random word from the list based on the chosen settings.
 *
 * Steps:
 * 1. Filter all words to only keep those with the requested length.
 * 2. If "unique" is true, filter again to only keep words where all letters are different.
 * 3. If no words match the filters, return null.
 * 4. Otherwise pick one random word from the filtered list.
 */


export function chooseWord(words, length, unique) {
  let filtered = words.filter(w => w.length === length);

  if (unique) {
    filtered = filtered.filter(w => new Set(w).size === w.length);
  }

  if (filtered.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}