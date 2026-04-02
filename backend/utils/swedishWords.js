import fs from "fs";
import path from "path";

let WORDS = [];

// Ladda ordlistan när servern startar
export function loadSwedishWords() {
  const filePath = path.join(process.cwd(), "data", "swedish_words.txt");

  const content = fs.readFileSync(filePath, "utf8");

  WORDS = content
    .split("\n")
    .map(w => w.trim().toUpperCase())
    .filter(w => w.length > 0);

  console.log("Loaded", WORDS.length, "Swedish words");
}

export { WORDS };
