/**
 * FILE: 53_Greedy_CoinChange.js
 * Pattern: Greedy Coin Change
 * Note: Greedy sirf tabhi optimal result deta hai jab coins standard hon.
 */

function minCoins(coins, target) {
    // 1. Sort karo (Bara se chota)
    coins.sort((a, b) => b - a);

    let count = 0;
    let remaining = target;

    for (let coin of coins) {
        if (remaining === 0) break;

        // Kitne sikkay use ho sakte hain is denomination ke?
        let num = Math.floor(remaining / coin);
        
        if (num > 0) {
            count += num;
            remaining -= (num * coin);
            console.log(`[System] Used ${num} coins of value ${coin}`);
        }
    }

    return remaining === 0 ? count : -1; // Agar baki zero nahi, toh change possible nahi
}

// --- EXECUTION ---
const coins = [1, 2, 5, 10, 20, 50]; // Standard currency
const target = 63;

console.log("Total Coins Required:", minCoins(coins, target));
// Output: 3 coins of 20, 1 of 2, 1 of 1 (Total: 5 coins)