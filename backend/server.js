
import express from "express";
import gameRoutes from "./routes/gameRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";


const app = express();
app.use(express.json());

app.use("/api/game", gameRoutes);
app.use("/api/highscore", scoreRoutes);
app.use("/", pageRoutes);

app.listen(5080, () => {
  console.log("Server running on http://localhost:5080");
});
