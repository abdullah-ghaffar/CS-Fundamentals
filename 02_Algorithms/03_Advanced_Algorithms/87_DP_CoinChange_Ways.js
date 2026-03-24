/**
 * Problem: Count total unique ways to make a sum using given coins.
 * Logic: Unbounded Knapsack (Infinite Supply).
 * Time Complexity: O(N * Target)
 * Space Complexity: O(Target)
 */

function countWays(coins, target) {
    // dp[i] store karta hai 'i' sum banane ke total ways
    let dp = new Array(target + 1).fill(0);

    // Base Case
    dp[0] = 1;

    for (let coin of coins) {
        // Forward Loop: Ye allow karta hai ke aik hi coin bar bar use ho
        for (let i = coin; i <= target; i++) {
            dp[i] = dp[i] + dp[i - coin];
        }
    }

    return dp[target];
}

// --- TESTING THE CHANGE ENGINE ---
const coins = [1, 2, 5];
const target = 5;

const totalWays = countWays(coins, target);
console.log(`Total ways to make ${target} using [${coins}]:`, totalWays); 
// Expected: 4 
// 1. [1,1,1,1,1]
// 2. [1,1,1,2]
// 3. [1,2,2]
// 4. [5]