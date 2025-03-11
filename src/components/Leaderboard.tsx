import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard: React.FC = () => {
    const [scores, setScores] = useState<{ X: number; O: number; draws: number }>({
        X: 0,
        O: 0,
        draws: 0,
    });

    useEffect(() => {
        const storedScores = localStorage.getItem("leaderboard");
        if (storedScores) {
            setScores(JSON.parse(storedScores));
        }
    }, []);

    return (
        <div className="leaderboard-container">
            <h1>🏆 Leaderboard</h1>
            <div className="leaderboard-box">
                <p>🎮 X Wins: {scores.X}</p>
                <p>⚡ O Wins: {scores.O}</p>
                <p>🤝 Draws: {scores.draws}</p>
            </div>
            <Link to="/game" className="back-link">⬅ Back to Game</Link>
        </div>


    );
};

export default Leaderboard;
