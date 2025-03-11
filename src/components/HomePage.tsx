import React from 'react';
import {Link} from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Welcome to Tic-Tac-Toe! 🎮</h1>
            <p>Choose your game mode and start playing.</p>
            <Link to="/game" className="text-blue-500 hover:underline text-lg">
                Go to Game
            </Link>
        </div>
);
};

export default HomePage;
