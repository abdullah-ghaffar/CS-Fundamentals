/**
 * Problem: Maximize value in a bag of capacity W.
 * Constraints: Cannot break items (0/1).
 * Time Complexity: O(N * W)
 * Space Complexity: O(W)
 */

function knapsack01(weights, values, capacity) {
    let n = weights.length;
    
    // dp[i] store karta hai 'i' capacity mein maximum value
    let dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < n; i++) {
        // Reverse loop taake hum usi item ko bar bar na uthain
        for (let w = capacity; w >= weights[i]; w--) {
            // Decision: Kya pichla profit behtar hai ya 
            // is item ko lekar bacha hua rasta?
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }

    return dp[capacity];
}

// --- TESTING THE BURGLAR'S BRAIN ---
const weights = [1, 3, 4];
const values = [15, 20, 30];
const bagCapacity = 5;

const maxProfit = knapsack01(weights, values, bagCapacity);
console.log(`Maximum Value for 5kg bag: $${maxProfit}`); 
// Expected: 45 (Diamond + Silver Idol)