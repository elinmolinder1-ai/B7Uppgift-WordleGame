
//Skapa server
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend fungerar!");
});

app.listen(5080, () => {
  console.log("Server running on http://localhost:5080");
});
