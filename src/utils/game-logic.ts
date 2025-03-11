export type BoardType = (null | "X" | "O")[];

export function checkWinner(board: BoardType): { winner: "X" | "O" | null; line: number[] | null } {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const line of winningCombinations) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: line };
        }
    }
    return { winner: null, line: null };
}

function minimax(board: BoardType, depth: number, isMaximizing: boolean): number {
    const { winner } = checkWinner(board);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (!board.includes(null)) return 0;

    const scores: number[] = [];
    const availableMoves = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null) as number[];

    for (const move of availableMoves) {
        board[move] = isMaximizing ? "O" : "X";
        const score = minimax(board, depth + 1, !isMaximizing);
        scores.push(score);
        board[move] = null; // Undo move
    }

    return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

export function getBestMove(board: BoardType, difficulty: "Easy" | "Medium" | "Hard"): number | null {
    const availableMoves = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null) as number[];

    if (difficulty === "Easy") {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    let bestMove: number | null = null;
    let bestScore = -Infinity;

    for (const move of availableMoves) {
        board[move] = "O"; // AI's turn
        const score = minimax(board, 0, false);
        board[move] = null; // Undo move

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    if (difficulty === "Medium" && Math.random() < 0.5) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    return bestMove;
}