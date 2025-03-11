import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
import ThemeToggle from "./components/themeTogle";
import { checkWinner, getBestMove, BoardType } from "./utils/game-logic";
import "./App.css";
import "./index.css";

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
    const [score, setScore] = useState<{ X: number; O: number; draws: number }>(
        () => JSON.parse(localStorage.getItem("leaderboard")!) || { X: 0, O: 0, draws: 0 }
    );
    const [moveHistory, setMoveHistory] = useState<string[]>(
        () => JSON.parse(localStorage.getItem("moveHistory")!) || []
    );
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
    const [isXNext, setIsXNext] = useState(true);
    const [movesCount, setMovesCount] = useState(0);
    const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const isAiMoving = useRef(false);

    // Timer states
    const [timer, setTimer] = useState(2);
    const [timerActive, setTimerActive] = useState(false);
    const [timerInterval, setTimerInterval] = useState<number | null>(null);

    const [gameTimer, setGameTimer] = useState(0);
    const [gameInProgress, setGameInProgress] = useState(false);
    const gameIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
        if (gameInProgress) {
            gameIntervalRef.current = setInterval(() => {
                setGameTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (gameIntervalRef.current) {
                clearInterval(gameIntervalRef.current);
            }
        };
    }, [gameInProgress]);

    useEffect(() => {
        if (document.documentElement) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    useEffect(() => {
        if (timerActive) {
            if (timerInterval) clearInterval(timerInterval);
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        handleTurnSwitch();
                        return 2;
                    }
                    return prev - 1;
                });
            }, 1000);
            setTimerInterval(interval);
            return () => clearInterval(interval);
        } else {
            if (timerInterval) clearInterval(timerInterval);
        }
    }, [timerActive]);

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

        if (!gameInProgress) setGameInProgress(true);

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";

        // Save move to history
        const moveRecord = `Move ${movesCount + 1}: Player ${isXNext ? "X" : "O"} -> Position ${index + 1}`;
        setMoveHistory((prev) => [...prev, moveRecord]);

        const { winner, line } = checkWinner(newBoard);
        if (winner) {
            setScore((prevScore) => {
                const updatedScore = { ...prevScore, [winner]: prevScore[winner] + 1 };
                localStorage.setItem("leaderboard", JSON.stringify(updatedScore));
                return updatedScore;
            });

            setBoard(newBoard);
            setWinningLine(line);
            setTimerActive(false);
            setGameInProgress(false);
            return;
        }

        if (newBoard.every((cell) => cell !== null)) {
            setScore((prevScore) => {
                const updatedScore = { ...prevScore, draws: prevScore.draws + 1 };
                localStorage.setItem("leaderboard", JSON.stringify(updatedScore));
                return updatedScore;
            });

            setBoard(newBoard);
            setWinningLine(null);
            setTimerActive(false);
            setGameInProgress(false);
            return;
        }

        setBoard(newBoard);
        setIsXNext(!isXNext);
        setMovesCount((prev) => prev + 1);
        setWinningLine(null);
        setTimerActive(true);
    };

    useEffect(() => {
        localStorage.setItem("moveHistory", JSON.stringify(moveHistory));
    }, [moveHistory]);

    const handleTurnSwitch = () => {
        setIsXNext((prev) => !prev);
        setMovesCount((prev) => prev + 1);
        setTimer(2);
        setTimerActive(true);
    };

    const resetGame = (): void => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setMovesCount(0);
        setWinningLine(null);
        setTimer(2);
        setTimerActive(false);
        setGameTimer(0);
        setGameInProgress(false);
        setMoveHistory([]);

        localStorage.removeItem("moveHistory");
    };

    return (
        <div className="game-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="title text-4xl font-bold mb-6 text-center">Tic-Tac-Toe</h1>

            <div className="theme-timer-container">
                <ThemeToggle theme={theme} setTheme={setTheme} />
                <h2>Move: {timer}s</h2>
                <h2>Game: {gameTimer}s</h2>
            </div>
            <div className="navigation-links flex gap-4 mt-4">
                <Link to="/leaderboard" className="text-blue-500 hover:underline">
                    Leaderboard
                </Link>
                <Link to="/history" className="text-blue-500 hover:underline">
                    History
                </Link>
                <Link to="/">⬅ Home</Link>
            </div>

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
