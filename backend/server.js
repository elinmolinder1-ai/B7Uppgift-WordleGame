/* This file sets up the Express server and connects all routes.
// It also loads the Swedish word list before the server starts.
// The server handles game logic, highscores, and simple page routes.
*/

import express from "express";
import gameRoutes from "./routes/gameRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import { loadSwedishWords } from "./utils/swedishWords.js";
import { connectDB } from "./database/mongoose.js";


// Load the Swedish word list when the server starts
loadSwedishWords();

//connect to MongoDB 
connectDB();


const app = express();

// Configure EJS before routes
app.set("view engine", "ejs");
app.set("views", "./views");


// Allow JSON in request bodies
app.use(express.json());

// Game-related API routes
app.use("/api/game", gameRoutes);

// Highscore API routes
app.use("/api/highscore", scoreRoutes);

// Basic page routes (frontend pages)
app.use("/", pageRoutes);

// Start the server
app.listen(5080, () => {
  console.log("Server running on http://localhost:5080");
});
