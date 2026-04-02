//Väljer ett slumpmässigt ord baserat på (längd och unika bokstäver)

export function chooseWord(words, length, unique) {
  let filtered = words.filter(w => w.length === length);

  if (unique) {
    filtered = filtered.filter(w => new Set(w).size === w.length);
  }

  if (filtered.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
