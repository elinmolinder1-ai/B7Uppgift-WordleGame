import { Highscore } from "../models/Highscore.js";

// Get all scores from MongoDB
export async function getAllScores() {
  return await Highscore.find().sort({ timeTaken: 1 });
}

// Save a new score to MongoDB
export async function saveScore(scoreData) {
  const score = new Highscore(scoreData);
  await score.save();
}
