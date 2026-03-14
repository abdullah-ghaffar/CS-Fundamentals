/**
 * FILE: 40_Sort_RecursiveBubble.js
 * Pattern: Recursive Problem Decomposition
 * Efficiency: O(N^2) Time, O(N) Space (due to recursion stack)
 */

function recursiveBubbleSort(arr, n) {
    // 1. BASE CASE: Agar list khatam ho gayi, kaam mukammal
    if (n <= 1) {
        return; // Ruknay ka ishara
    }

    // 2. ONE PASS: Ek baar loop chala kar sab se baray ko aakhir mein bhejo
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i+1]) {
            // Swap logic
            let temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
        }
    }

    // 3. RECURSIVE STEP: Ab aakhri bande ko chhor kar baqi list ke liye
    // dobara machine chala do (n-1)
    recursiveBubbleSort(arr, n - 1);
}

// --- EXECUTION (Check karte hain) ---
const unsortedData =[64, 34, 25, 12, 22, 11, 90];

console.log("Original List:", unsortedData);

// Hum poori list (size 7) bhej rahe hain
recursiveBubbleSort(unsortedData, unsortedData.length);

console.log("Sorted List:", unsortedData);
// Output: [ 11, 12, 22, 25, 34, 64, 90 ]