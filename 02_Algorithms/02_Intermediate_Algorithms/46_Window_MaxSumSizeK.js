/**
 * FILE: 46_Window_MaxSumSizeK.js
 * Pattern: Sliding Window (Fixed Size K)
 * Efficiency: O(N) Time, O(1) Space
 */

function findMaxSum(arr, k) {
    if (arr.length < k) return null;

    let maxSum = 0;
    let windowSum = 0;

    // Step 1: Pehli window ka sum nikalo
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    // Step 2: Window ko slide karo
    for (let i = k; i < arr.length; i++) {
        // Window Slide: [Peeche wala hatao] + [Aage wala joro]
        windowSum = windowSum - arr[i - k] + arr[i];
        
        // Max update karo
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

// --- EXECUTION ---
const tokensPerSecond = [10, 20, 30, 40, 50, 10];
const k = 3; 

console.log("Max Tokens in 3 seconds window:", findMaxSum(tokensPerSecond, k));
// Output: 120 (30+40+50)