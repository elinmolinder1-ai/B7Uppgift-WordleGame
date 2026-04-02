
//Skapa server
import express from "express";

const app = express();
app.use(express.json());

app.use("/api/game", gameRoutes);
app.use("/api/highscore", scoreRoutes);
app.use("/", pageRoutes);

app.listen(5080, () => {
  console.log("Server running on http://localhost:5080");
});
