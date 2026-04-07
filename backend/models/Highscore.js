import mongoose from "mongoose";

//vEach field describes what data a highscore must contain
const HighscoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeTaken: { type: Number, required: true },
  guesses: { type: Array, required: true },
  wordLength: { type: Number, required: true },
  uniqueLetters: { type: Boolean, required: true },
  word: { type: String, required: true }
});

export const Highscore = mongoose.model("Highscore", HighscoreSchema);
