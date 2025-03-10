import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
import { checkWinner, getBestMove, BoardType } from "./utils/game-logic";
import "./App.css";
import ThemeToggle from "./components/themeTogle";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [score, setScore] = useState<{ X: number; O: number; draws: number }>({ X: 0, O: 0, draws: 0 });
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [isXNext, setIsXNext] = useState(true);
  const [movesCount, setMovesCount] = useState(0);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const isAiMoving = useRef(false);

  useEffect(() => {
    if (document.documentElement) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (!isXNext && !checkWinner(board).winner && board.includes(null) && !isAiMoving.current) {
      const aiMove = getBestMove(board, difficulty);
      if (aiMove !== null) {
        isAiMoving.current = true;
        const timeoutId = setTimeout(() => {
          handleClick(aiMove, true);
          isAiMoving.current = false;
        }, 500);
        return () => {
          clearTimeout(timeoutId);
          isAiMoving.current = false;
        };
      }
    }
  }, [isXNext, board, difficulty]);

  const handleClick = (index: number, isAiMove = false): void => {
    if (board[index] || checkWinner(board).winner || (!isXNext && !isAiMove)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    const { winner, line } = checkWinner(newBoard);
    if (winner) {
      setScore((prevScore) => ({ ...prevScore, [winner]: prevScore[winner] + 1 }));
      setBoard(newBoard);
      setWinningLine(line);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setScore((prevScore) => ({ ...prevScore, draws: prevScore.draws + 1 }));
      setBoard(newBoard);
      setWinningLine(null);
      return;
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);
    setMovesCount((prev) => prev + 1);
    setWinningLine(null);
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setMovesCount(0);
    setWinningLine(null);
  };

  return (
      <div className="game-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="title text-4xl font-bold mb-6 text-center">Tic-Tac-Toe</h1>

        <div className="mb-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <br />

        <ScoreBoard xWins={score.X} oWins={score.O} draws={score.draws} />

        <Board board={board} onClick={handleClick} movesCount={movesCount} winningLine={winningLine} />

        <div className="difficulty-selector flex flex-col items-center gap-4 mt-6">
          <ResetButton onReset={resetGame} />

          <div className="flex items-center gap-2">
            <label htmlFor="difficulty" className="text-lg font-semibold text-gray-800 dark:text-white">Difficulty:</label>
            <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                className="p-2 text-lg border-2 border-blue-600 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
  );
};

export default TicTacToe;