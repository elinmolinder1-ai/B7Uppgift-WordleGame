import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import HighscorePage from "./pages/HighscorePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/highscore" element={<HighscorePage />} />
      </Routes>
    </BrowserRouter>
  );
}
