/**
 * FILE: 43_Queue_MonotonicDeque.js
 * Pattern: Sliding Window Maximum using Monotonic Decreasing Deque
 * Efficiency: O(N) Time, O(K) Space
 */

function getSlidingWindowMax(prices, k) {
    const deque = []; // Isme hum Indices (positions) save karenge
    const result =[]; // Har window ka maximum yahan aayega

    for (let i = 0; i < prices.length; i++) {
        
        // STEP 1: Purane dabbe ko aage se nikal do (Window Shift)
        // Agar aage wale bande ka index window ki range (i - k) se bahar ho gaya hai
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.shift(); 
        }

        // STEP 2: Naya banda Boss hai! Chotay numbers ko peechay se nikal do
        // Jab tak aakhir wala number naye number se chota hai, usay 'pop' karte raho
        while (deque.length > 0 && prices[deque[deque.length - 1]] < prices[i]) {
            deque.pop();
        }

        // STEP 3: Naye bande (index) ko line ke aakhir mein lagao
        deque.push(i);

        // STEP 4: Jab hamari pehli window (size k) poori ho jaye, toh King ko result mein daalo
        if (i >= k - 1) {
            // Line mein sab se aage (deque[0]) hamesha King (Maximum) hota hai
            result.push(prices[deque[0]]);
        }
    }

    return result;
}

// --- EXECUTION (Check karte hain) ---
// Qeemtein: [10, 5, 2, 15, 6, 8]
// Window Size: 3

const stockPrices =[10, 5, 2, 15, 6, 8];
const windowSize = 3;

const maxPrices = getSlidingWindowMax(stockPrices, windowSize);
console.log("Har 3-second window ka Maximum Price:", maxPrices);
// Output aayega: [10, 15, 15, 15]