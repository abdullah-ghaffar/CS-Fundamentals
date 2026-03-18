/**
 * FILE: 58_BinarySearch_LowerBound.js
 * Pattern: Binary Search Variant (First Occurrence)
 * Efficiency: O(log N) Time
 */

function findFirstOccurrence(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let result = -1; // Agar na mila

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (arr[mid] === target) {
            result = mid;     // Mil gaya, lekin rukna nahi hai...
            high = mid - 1;   // ... mazeed left par dhoondo (First Index)
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

// --- EXECUTION ---
const logHistory = [10, 20, 50, 50, 50, 60, 70];
const target = 50;

console.log("Pehli baar error 50 kab aaya (Index):", findFirstOccurrence(logHistory, target));
// Output: 2