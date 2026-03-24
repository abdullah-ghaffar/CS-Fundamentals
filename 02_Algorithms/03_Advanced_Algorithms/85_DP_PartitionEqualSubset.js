/**
 * Problem: Partition array into two subsets with equal sum.
 * Time Complexity: O(N * Target)
 * Space Complexity: O(Target)
 */

function canPartition(nums) {
    let totalSum = nums.reduce((acc, curr) => acc + curr, 0);

    // Agar sum odd hai, to equal partition namumkin hai
    if (totalSum % 2 !== 0) return false;

    let target = totalSum / 2;
    let n = nums.length;

    // DP array: dp[i] matlab 'i' sum banana possible hai ya nahi
    let dp = new Array(target + 1).fill(false);
    dp[0] = true; // 0 sum hamesha possible hai

    for (let num of nums) {
        // Reverse loop taake same element bar bar use na ho (0/1 logic)
        for (let j = target; j >= num; j--) {
            if (dp[j - num] === true) {
                dp[j] = true;
            }
        }
    }

    return dp[target];
}

// --- TESTING THE BALANCE ---
const weights1 = [1, 5, 11, 5]; 
console.log("Can partition [1, 5, 11, 5]?", canPartition(weights1)); 
// Expected: true (Subset 1: [1, 5, 5] = 11, Subset 2: [11])

const weights2 = [1, 2, 3, 5];
console.log("Can partition [1, 2, 3, 5]?", canPartition(weights2)); 
// Expected: false (Total sum is 11, which is odd)