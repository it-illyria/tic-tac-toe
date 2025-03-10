import React from "react";

interface ScoreboardProps {
    score: { X: number; O: number };
    isXNext: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, isXNext }) => {
    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <div className="scores">
                <p className={isXNext ? "active" : ""}>X: {score.X}</p>
                <p className={!isXNext ? "active" : ""}>O: {score.O}</p>
            </div>
        </div>
    );
};

export default Scoreboard;
