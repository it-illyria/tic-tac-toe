import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoveHistory: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem("moveHistory");
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    return (
        <div className="history-container">
            <h1>📜 Move History</h1>
            <div className="history-box">
                {history.length === 0 ? (
                    <p>⚠ No moves recorded yet.</p>
                ) : (
                    <ul>
                        {history.map((move, index) => (
                            <li key={index}>🎲 {move}</li>
                        ))}
                    </ul>
                )}
            </div>
            <Link to="/game" className="back-link">⬅ Back to Game</Link>
        </div>
    );
};

export default MoveHistory;
