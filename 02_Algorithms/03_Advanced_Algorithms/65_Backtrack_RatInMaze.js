/**
 * FILE: 65_Backtrack_RatInMaze.js
 * Pattern: Backtracking (Grid Exploration)
 * Efficiency: O(4^(N^2)) - Har dabbe par 4 choices hain.
 */

function findPaths(maze) {
    const n = maze.length;
    const results = [];
    
    // Visited array to keep track of path
    const visited = Array.from({ length: n }, () => Array(n).fill(0));

    function solve(row, col, path) {
        // Base Case: Agar manjil (target) par pohnch gaye
        if (row === n - 1 && col === n - 1) {
            results.push(path);
            return;
        }

        // Movements: Down, Left, Right, Up
        const dr = [1, 0, 0, -1];
        const dc = [0, -1, 1, 0];
        const dir = ["D", "L", "R", "U"];

        for (let i = 0; i < 4; i++) {
            let nextRow = row + dr[i];
            let nextCol = col + dc[i];

            // Safety Check: Bound check, maze path check, and visited check
            if (nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < n && 
                maze[nextRow][nextCol] === 1 && !visited[nextRow][nextCol]) {
                
                visited[row][col] = 1; // [Architectural]: Mark visited
                solve(nextRow, nextCol, path + dir[i]); // Recursive call
                visited[row][col] = 0; // [Backtrack]: Reset for other paths
            }
        }
    }

    // Shuruat tabhi hogi agar entry point khula ho
    if (maze[0][0] === 1) {
        solve(0, 0, "");
    }
    
    return results;
}

// --- EXECUTION ---
const myMaze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
];

const allPaths = findPaths(myMaze);
console.log("All Possible Paths:", allPaths);
// Example Output: ["DDRDRR", "DRDDRR"] (Rasta strings ki shakal mein)