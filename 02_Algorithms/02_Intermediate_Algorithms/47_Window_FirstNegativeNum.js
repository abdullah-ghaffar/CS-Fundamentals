/**
 * FILE: 47_Window_FirstNegativeNum.js
 * Pattern: Sliding Window + Queue
 * Efficiency: O(N) Time
 */

function printFirstNegative(arr, k) {
    let negativeQueue = []; // Yahan hum indices (positions) save karenge
    let result = [];

    // Step 1: Pehli window ko process karo
    for (let i = 0; i < k; i++) {
        if (arr[i] < 0) negativeQueue.push(i);
    }

    // Step 2: Pehli window ka result
    if (negativeQueue.length > 0) result.push(arr[negativeQueue[0]]);
    else result.push(0);

    // Step 3: Baqi windows ko slide karo
    for (let i = k; i < arr.length; i++) {
        // Purana index window se bahar ho gaya? Remove it!
        if (negativeQueue.length > 0 && negativeQueue[0] <= i - k) {
            negativeQueue.shift();
        }

        // Naya number check karo
        if (arr[i] < 0) negativeQueue.push(i);

        // Result add karo
        if (negativeQueue.length > 0) result.push(arr[negativeQueue[0]]);
        else result.push(0);
    }

    console.log("Pehelay Negative Numbers:", result);
    return result;
}

// --- EXECUTION ---
const temps = [12, -1, -7, 8, -15, 30, 16, 28];
const k = 3;
printFirstNegative(temps, k); 
// Output: [-1, -1, -7, -15, -15, 0]