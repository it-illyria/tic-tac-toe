import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TicTacToe from './TicTacToe';
import Leaderboard from "./components/Leaderboard";
import MoveHistory from "./components/MoveHistory";



const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<TicTacToe />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/history" element={<MoveHistory />} />
        </Routes>
      </Router>
  );
};

export default App;
