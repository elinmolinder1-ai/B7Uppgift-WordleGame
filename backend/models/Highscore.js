import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: String,
  timeTaken: Number,
  wordLength: Number,
  uniqueLetters: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
