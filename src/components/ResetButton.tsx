import React from "react";

interface ResetButtonProps {
    onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
    return (
        <button className="reset-button" onClick={onReset}>
            Reset Game
        </button>
    );
};

export default ResetButton;
