/**
 * FILE: 59_BinarySearch_UpperBound.js
 * Pattern: Binary Search Variant (Next Greater Element)
 * Efficiency: O(log N) Time
 */

function findUpperBound(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let ans = null;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (arr[mid] > target) {
            ans = arr[mid];   // Ye target se bara hai, save karlo
            high = mid - 1;   // Mazeed left dhoondo (shayad is se chota bara number mil jaye)
        } else {
            low = mid + 1;    // Target ya chota hai, right par jao
        }
    }
    return ans;
}

// --- EXECUTION ---
const difficultyLevels = [1, 2, 4, 4, 6, 8];
const userCurrentLevel = 4;

console.log("Next Difficulty:", findUpperBound(difficultyLevels, userCurrentLevel));
// Output: 6