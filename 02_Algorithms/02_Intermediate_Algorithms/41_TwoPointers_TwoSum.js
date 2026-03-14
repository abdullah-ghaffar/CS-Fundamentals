/**
 * FILE: 41_TwoPointers_TwoSum.js
 * Pattern: Two-Pointer Squeeze (for Sorted Arrays)
 * Efficiency: O(N) Time, O(1) Space
 */

function findTwoSum(sortedArr, target) {
    let left = 0; // Shuru ka nishan
    let right = sortedArr.length - 1; // Aakhir ka nishan

    // Jab tak dono nishan aapas mein takra na jayein
    while (left < right) {
        let currentSum = sortedArr[left] + sortedArr[right];

        if (currentSum === target) {
            // Jawab mil gaya!
            console.log(`Pair mil gaya: [${sortedArr[left]}, ${sortedArr[right]}]`);
            return [sortedArr[left], sortedArr[right]];
        } 
        else if (currentSum < target) {
            // Total chota hai, barhana hai
            left++; // Left wale ko agay barhao
        } 
        else { // currentSum > target
            // Total bara hai, kam karna hai
            right--; // Right wale ko peechay hatao
        }
    }

    // Agar loop khatam ho gaya aur kuch nahi mila
    console.log("Aisa koi pair nahi mila.");
    return null;
}

// --- EXECUTION (Check karte hain) ---
const transactions = [10, 20, 35, 50, 75, 90]; // Sorted hona lazmi hai!
const fraudAmount = 70;

findTwoSum(transactions, fraudAmount);
// Output aayega: Pair mil gaya: [20, 50]