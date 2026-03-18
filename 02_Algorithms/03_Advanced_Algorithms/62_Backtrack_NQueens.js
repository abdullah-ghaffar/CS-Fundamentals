/**
 * FILE: 62_Backtrack_NQueens.js
 * Pattern: Backtracking (N-Queens Constraint Satisfaction)
 * Efficiency: O(N!) - Exponential Time (Ye bohot heavy algorithm hai)
 */

function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    const results = [];

    function isSafe(row, col) {
        // Vertical check (Kya upar koi Queen hai?)
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Diagonal check (Left upar)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Diagonal check (Right upar)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }

    function backtrack(row) {
        if (row === n) {
            results.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q'; // Queen Place ki
                backtrack(row + 1);    // Agli row par jao
                board[row][col] = '.'; // Backtrack: Queen hatayi
            }
        }
    }

    backtrack(0);
    return results;
}

// --- EXECUTION ---
console.log("Solution for 4x4 Chessboard:", solveNQueens(4));