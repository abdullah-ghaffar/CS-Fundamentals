/**
 * FILE: 63_Backtrack_SudokuSolver.js
 * Pattern: Backtracking (Recursive Constraint Satisfaction)
 */

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // Agar dabba khali hai (0)
            if (board[row][col] === 0) {
                // 1 se 9 tak try karo
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num; // Number rakho

                        // Aglay dabbe par jao (Recursion)
                        if (solveSudoku(board)) return true;

                        // Agar aage solution nahi mila, toh Backtrack karo (Reset to 0)
                        board[row][col] = 0;
                    }
                }
                return false; // Koi number set nahi hua
            }
        }
    }
    return true; // Board full ho gaya!
}

function isSafe(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        // Row aur Column check karo
        if (board[row][i] === num || board[i][col] === num) return false;
        
        // 3x3 Box check karo
        let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}

// --- EXECUTION ---
const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

if (solveSudoku(board)) {
    console.table(board); // Bohat hi khubsurat output
} else {
    console.log("No solution exists");
}