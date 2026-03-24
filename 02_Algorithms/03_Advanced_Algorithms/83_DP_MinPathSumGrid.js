/**
 * Problem: Find a path from top-left to bottom-right 
 * which minimizes the sum of all numbers along its path.
 */

function minPathSum(grid) {
    let m = grid.length;
    let n = grid[0].length;

    // Pichli row ke cumulative costs store karne ke liye
    let prev = new Array(n).fill(0);

    for (let i = 0; i < m; i++) {
        let current = new Array(n).fill(0);
        
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                current[j] = grid[i][j]; // Start point
            } else {
                // Upar se aane ki cost (agar i > 0)
                let up = i > 0 ? prev[j] : Infinity;
                
                // Left se aane ki cost (agar j > 0)
                let left = j > 0 ? current[j - 1] : Infinity;

                // Current Cell Cost + Sab se sasta rasta
                current[j] = grid[i][j] + Math.min(up, left);
            }
        }
        prev = current;
    }

    return prev[n - 1];
}

// --- TESTING THE COST ENGINE ---
const cityGrid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];

console.log("Minimum Fuel Cost:", minPathSum(cityGrid)); 
// Expected Path: 1 -> 3 -> 1 -> 1 -> 1 (Total: 7)