import fs from "fs";
import path from "path";

let WORDS = [];

/**
 * Loads the Swedish word list when the server starts.
 * Reads the text file, splits it into lines,
 * cleans each word, and stores everything in the WORDS array.
 */

export function loadSwedishWords() {
  const filePath = path.join(process.cwd(), "data", "swedish_words.txt");

  // Read the file content as text
  const content = fs.readFileSync(filePath, "utf8");

   // Split into lines, trim spaces, convert to uppercase, remove empty lines
  WORDS = content
    .split("\n")
    .map(w => w.trim().toUpperCase())
    .filter(w => w.length > 0);

  console.log("Loaded", WORDS.length, "Swedish words");
}

// Export the loaded word list
export { WORDS };
