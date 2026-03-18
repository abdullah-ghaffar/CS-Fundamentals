/**
 * FILE: 57_Greedy_RailPlatforms.js
 * Pattern: Two-Pointer Event Processing (Sweep Line Algorithm)
 * Efficiency: O(N log N) - Sorting ki wajah se
 */

function findMinPlatforms(arr, dep) {
    // 1. Arrival aur Departure ko separate sort karo
    arr.sort((a, b) => a - b);
    dep.sort((a, b) => a - b);

    let platformsNeeded = 0;
    let maxPlatforms = 0;
    let i = 0, j = 0;

    // 2. Event-based Loop
    while (i < arr.length && j < dep.length) {
        // Agar train aa rahi hai, toh platform chahye
        if (arr[i] <= dep[j]) {
            platformsNeeded++;
            i++;
        } else {
            // Agar train ja rahi hai, toh platform khali ho gaya
            platformsNeeded--;
            j++;
        }
        
        // Update karo ke sab se zyada kitne platform ek sath bhare hue thay
        if (platformsNeeded > maxPlatforms) {
            maxPlatforms = platformsNeeded;
        }
    }

    console.log("Minimum Platforms Required:", maxPlatforms);
    return maxPlatforms;
}

// --- EXECUTION ---
// Arrival times: 9:00, 9:40, 9:50, 11:00, 15:00, 18:00
// Departure times: 9:10, 12:00, 11:20, 11:30, 19:00, 20:00
const arr = [900, 940, 950, 1100, 1500, 1800];
const dep = [910, 1200, 1120, 1130, 1900, 2000];

findMinPlatforms(arr, dep); 
// Output: 3