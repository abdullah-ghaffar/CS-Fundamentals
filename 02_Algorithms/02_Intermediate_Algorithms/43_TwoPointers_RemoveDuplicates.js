/**
 * FILE: 43_TwoPointers_RemoveDuplicates.js
 * Pattern: In-place array modification using Fast/Slow pointers
 * Efficiency: O(N) Time, O(1) Space
 */

function removeDuplicates(sortedArr) {
    if (sortedArr.length === 0) return 0;

    // Guard (Slow Pointer) - Yahan tak sab unique hai
    let uniqueIndex = 1;

    // Explorer (Fast Pointer)
    for (let i = 1; i < sortedArr.length; i++) {
        
        // Agar Explorer ne koi NAYI cheez dhoondi
        if (sortedArr[i] !== sortedArr[i - 1]) {
            // Toh usay Guard wali jagah par rakh do
            sortedArr[uniqueIndex] = sortedArr[i];
            
            // Aur Guard ko agay barha do
            uniqueIndex++;
        }
    }

    console.log("Modified Array:", sortedArr.slice(0, uniqueIndex));
    return uniqueIndex; // Nayi length
}

// --- EXECUTION (Check karte hain) ---
const transactions = [10, 10, 20, 30, 30, 30, 40];
console.log("Original Length:", transactions.length);

const newLength = removeDuplicates(transactions);

console.log("New Length (without duplicates):", newLength);
// Output: 4
// Modified Array: [10, 20, 30, 40]