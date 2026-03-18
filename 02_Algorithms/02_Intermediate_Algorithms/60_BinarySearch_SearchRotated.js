/**
 * FILE: 60_BinarySearch_SearchRotated.js
 * Pattern: Binary Search on Rotated Array
 * Efficiency: O(log N) Time
 */

function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) return mid;

        // Check: Kya Left side Sorted hai?
        if (nums[low] <= nums[mid]) {
            // Target Left side mein hai?
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } 
        // Nahi, toh Right side Sorted hogi
        else {
            // Target Right side mein hai?
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1; // Nahi mila
}

// --- EXECUTION ---
const rotated = [4, 5, 6, 7, 0, 1, 2];
console.log("Index of 0:", search(rotated, 0)); // Output: 4