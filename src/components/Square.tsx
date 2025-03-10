import React from "react";

interface SquareProps {
    value: string | null;
    onClick: () => void;
    isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
    return (
        <button
            className={`square ${isWinningSquare ? 'winning-square' : ''}`}
            onClick={onClick}
            disabled={!!value}
        >
            {value}
        </button>
    );
};

export default Square;
