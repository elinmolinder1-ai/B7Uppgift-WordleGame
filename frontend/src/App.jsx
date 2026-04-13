import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import HighscorePage from "./pages/HighscorePage";
import AboutPage from "./pages/AboutPage";

// This file sets up the routes so the app shows the right page for each URL.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
