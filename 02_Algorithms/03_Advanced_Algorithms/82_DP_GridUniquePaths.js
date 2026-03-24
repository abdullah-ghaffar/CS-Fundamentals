/**
 * Problem: Count unique paths in an M x N grid.
 * Rules: Move only Right or Down.
 */

function uniquePaths(m, n) {
    // Pichli row ke paths store karne ke liye
    let prev = new Array(n).fill(1); // Pehli row ke saare cells ka rasta 1 hi hai (sirf Right)

    for (let i = 1; i < m; i++) {
        let current = new Array(n).fill(1); // Har row ka pehla cell hamesha 1 hoga (sirf Down)
        
        for (let j = 1; j < n; j++) {
            // Aaj ka cell = Upar wala (prev[j]) + Left wala (current[j-1])
            current[j] = prev[j] + current[j-1];
        }
        prev = current;
    }

    return prev[n - 1];
}

// --- TESTING THE GRID ---
console.log("Paths for 3x2 grid:", uniquePaths(3, 2)); // Expected: 3
console.log("Paths for 3x7 grid:", uniquePaths(3, 7)); // Expected: 28

console.time("Performance-Test");
uniquePaths(50, 50);
console.timeEnd("Performance-Test");