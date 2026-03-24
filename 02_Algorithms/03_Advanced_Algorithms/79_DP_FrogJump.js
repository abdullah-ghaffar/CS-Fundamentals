/**
 * Problem: Frog wants to reach (n-1)th stone.
 * He can jump from i to i+1 or i+2.
 * Cost = |height[i] - height[j]|
 * Find Minimum Total Energy.
 */

function minEnergyFrogJump(heights) {
    let n = heights.length;
    if (n <= 1) return 0;

    // Pichle do stones ki minimum energy store karne ke liye
    let prev2 = 0; // Energy to reach stone 0
    let prev1 = Math.abs(heights[1] - heights[0]); // Energy to reach stone 1

    for (let i = 2; i < n; i++) {
        // Option 1: 1-step jump
        let jumpOne = prev1 + Math.abs(heights[i] - heights[i-1]);
        
        // Option 2: 2-step jump
        let jumpTwo = prev2 + Math.abs(heights[i] - heights[i-2]);

        // Is stone tak pahunchne ka sasta tareeqa
        let current = Math.min(jumpOne, jumpTwo);

        // Values shift karein agli iteration ke liye
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

// --- TESTING THE ENERGY SAVER ---
const heights = [10, 30, 40, 20]; 
// Path 1: 10->30 (20), 30->40 (10), 40->20 (20) = 50
// Path 2: 10->30 (20), 30->20 (10) = 30
// Path 3: 10->40 (30), 40->20 (20) = 50

console.log("Minimum Energy Required:", minEnergyFrogJump(heights)); // Expected: 30