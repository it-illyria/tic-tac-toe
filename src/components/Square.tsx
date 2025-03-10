import React from "react";

interface SquareProps {
    value: string | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick} disabled={!!value}>
            {value}
        </button>
    );
};

export default Square;
