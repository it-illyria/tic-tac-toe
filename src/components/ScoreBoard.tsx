import React from "react";

interface ScoreBoardProps {
    xWins: number;
    oWins: number;
    draws: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({xWins, oWins, draws}) => {
    const mostWins = xWins > oWins ? "x-winner" : oWins > xWins ? "o-winner" : "";

    return (
        <div className="scoreboard bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
            <h2 className="text-3xl font-semibold text-center mb-4">Scoreboard</h2>
            <div className="scores flex justify-between gap-6">
                <p className={`score x-score text-xl font-bold py-2 px-4 rounded-lg transition-all ${mostWins === "x-winner" ? "bg-blue-600 text-white" : "bg-gray-700"} hover:bg-blue-500`}>
                    X: {xWins}
                </p>
                <p className={`score o-score text-xl font-bold py-2 px-4 rounded-lg transition-all ${mostWins === "o-winner" ? "bg-orange-600 text-white" : "bg-gray-700"} hover:bg-orange-500`}>
                    O: {oWins}
                </p>
                <p className="score draw-score text-xl font-bold py-2 px-4 rounded-lg bg-gray-600 text-white">
                    D: {draws}
                </p>
            </div>
        </div>
    );
};

export default ScoreBoard;
