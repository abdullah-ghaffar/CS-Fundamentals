/**
 * Problem: Maximize sum without picking two adjacent elements.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function rob(nums) {
    let n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];

    // Variables to store max profit of previous houses
    let prev2 = 0; // f(i-2)
    let prev1 = nums[0]; // f(i-1)

    for (let i = 1; i < n; i++) {
        // Option 1: Loot current house + profit from 2 houses back
        let pick = nums[i] + prev2;
        
        // Option 2: Skip current house and keep profit from previous house
        let skip = prev1;

        let currentMax = Math.max(pick, skip);

        // Update for next iteration
        prev2 = prev1;
        prev1 = currentMax;
    }

    return prev1;
}

// --- TESTING THE ROBBERY ---
const houses = [2, 7, 9, 3, 1]; 
// Choices: 
// [2, 9, 1] = 12 (Correct!)
// [7, 3] = 10
// [2, 7] = Illegal (Adjacent)

console.log("Maximum Loot Possible:", rob(houses)); // Expected: 12