import React, { useEffect, useState } from "react";

// Update the prop type to accept (string | null)[]
interface BoardProps {
    board: (string | null)[]; // Corrected to match (string | null)[]
    onClick: (index: number) => void;
    movesCount: number; // Tracks total moves
}

const Board: React.FC<BoardProps> = ({ board, onClick, movesCount }) => {
    const [shifting, setShifting] = useState(false);

    useEffect(() => {
        if (movesCount % 2 === 0 && movesCount !== 0 && !shifting) {
            shiftBoard();
        }
    }, [movesCount]);

    const shiftBoard = () => {
        setShifting(true);
        setTimeout(() => {
            const shuffledBoard = [...board];
            const randomShift = Math.random() > 0.5 ? "row" : "column";
            if (randomShift === "row") {
                shuffledBoard.reverse();
            } else {
                for (let i = 0; i < 2; i++) {
                    let temp = shuffledBoard[i];
                    shuffledBoard[i] = shuffledBoard[i + 2];
                    shuffledBoard[i + 2] = temp;
                }
            }
            setShifting(false);
        }, 500);
    };

    return (
        <div className="board">
            {board.map((square, index) => (
                <div
                    key={index}
                    className={`square ${square ? "filled" : ""}`}
                    onClick={() => !shifting && onClick(index)}
                >
                    {square}
                </div>
            ))}
        </div>
    );
};

export default Board;
