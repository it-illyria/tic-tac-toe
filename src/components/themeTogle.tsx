import React from "react";

interface ThemeToggleProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeToggle;