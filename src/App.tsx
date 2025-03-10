import React, { useState, useEffect } from "react";
import Board from "./components/Board"; // Ensure the Board component accepts (string | null)[]
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
import { checkWinner, getBestMove, BoardType } from "./utils/game-logic"; // Assuming BoardType is defined here
import "./App.css";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null)); // (string | null)[]
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [isXNext, setIsXNext] = useState(true); // X starts the game
  const [movesCount, setMovesCount] = useState(0); // Track number of moves made

  useEffect(() => {
    if (!isXNext) { // If it's not X's turn (i.e., it's the AI's turn)
      const aiMove = getBestMove(board, difficulty); // Get AI's best move based on the board and selected difficulty
      if (aiMove !== null) {
        setTimeout(() => handleClick(aiMove, true), 500); // Delay the AI move to simulate thinking
      }
    }
  }, [isXNext, board, difficulty]);

  const handleClick = (index: number, isAiMove = false): void => {
    if (board[index] || checkWinner(board) || (!isXNext && !isAiMove)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    setMovesCount(prev => prev + 1); // Increment moves count

    const winner = checkWinner(newBoard);
    if (winner) {
      setScore((prevScore) => ({ ...prevScore, [winner]: prevScore[winner] + 1 }));
    }
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null)); // Reset board
    setIsXNext(true); // X starts again
    setMovesCount(0); // Reset move count
  };

  return (
      <div className="game-container">
        <h1 className="title">Tic-Tac-Toe</h1>
        <ScoreBoard score={score} isXNext={isXNext} />
        <Board board={board} onClick={handleClick} movesCount={movesCount} />
        <ResetButton onReset={resetGame} />
        <div className="difficulty-selector">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
  );
};

export default TicTacToe;
