import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
//import App1 from "http://localhost:3002";
import MainNav from "./components/navbar/navbar.jsx";
//import FlappyBird from "./components/flappyBird.jsx";
//import ProjectLoader from "./components/projectLoader.jsx";
import Home from "./components/home.jsx";
import Board from "./components/connect-four/Board.jsx";
import FlappyBird from "./components/flappy-bird/flappyBird.jsx";
import ConnectFour from "./components/connect-four/ConnectFour.jsx";
import Blackjack from "./components/blackjack/blackjack.jsx";
import TwoTrousandFourtyEight from "./components/2048/2048-game.js";
import GameRules from "./components/rules.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect-four" element={<ConnectFour />} />
        <Route path="/flappy-bird" element={<FlappyBird />} />
        <Route path="/2048" element={<TwoTrousandFourtyEight />} />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/rules" element={<GameRules />} />
      </Routes>
    </div>
  );
}

export default App;
