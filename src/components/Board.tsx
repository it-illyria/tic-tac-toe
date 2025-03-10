import React, { useEffect, useState } from "react";

interface BoardProps {
    board: (null | 'X' | 'O')[];
    onClick: (index: number) => void;
    movesCount: number;
    winningLine: number[] | null; // Added winningLine prop
}

const Board: React.FC<BoardProps> = ({ board, onClick, movesCount, winningLine }) => {
    const [shifting, setShifting] = useState(false);
    const [shiftedBoard, setShiftedBoard] = useState<(null | 'X' | 'O')[]>(board);

    useEffect(() => {
        setShiftedBoard(board);
    }, [board]);

    useEffect(() => {
        if (movesCount % 3 === 0 && movesCount !== 0 && !shifting) {
            shiftBoard();
        }
    }, [movesCount]);

    const shiftBoard = () => {
        setShifting(true);
        setTimeout(() => {
            const shuffledBoard = [...shiftedBoard];
            const randomShift = Math.random() > 0.5 ? "row" : "column";

            if (randomShift === "row") {
                const row1 = shuffledBoard.slice(0, 3);
                const row2 = shuffledBoard.slice(3, 6);
                const row3 = shuffledBoard.slice(6, 9);
                const newBoard = [...row3, ...row1, ...row2];
                setShiftedBoard(newBoard);
            } else {
                const col1 = [shuffledBoard[0], shuffledBoard[3], shuffledBoard[6]];
                const col2 = [shuffledBoard[1], shuffledBoard[4], shuffledBoard[7]];
                const col3 = [shuffledBoard[2], shuffledBoard[5], shuffledBoard[8]];
                const newBoard = [
                    col3[0], col2[0], col1[0],
                    col3[1], col2[1], col1[1],
                    col3[2], col2[2], col1[2],
                ];
                setShiftedBoard(newBoard);
            }
            setShifting(false);
        }, 500);
    };

    const renderSquare = (index: number) => {
        const isWinningSquare = winningLine && winningLine.includes(index);
        return (
            <div
                key={index}
                className={`square ${shiftedBoard[index] ? "filled" : ""} ${isWinningSquare ? "winning-square" : ""}`}
                onClick={() => !shifting && onClick(index)}
            >
                {shiftedBoard[index]}
            </div>
        );
    };

    return (
        <div className={`board ${shifting ? "shifting" : ""}`}>
            {shiftedBoard.map((_, index) => renderSquare(index))}
        </div>
    );
};

export default Board;