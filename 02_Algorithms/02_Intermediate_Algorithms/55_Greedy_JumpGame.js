/**
 * FILE: 55_Greedy_JumpGame.js
 * Pattern: Greedy Reachability (The "Horizon" Check)
 * Efficiency: O(N) Time, O(1) Space
 */

function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        // Agar current position hamari 'maxReach' se barh gayi
        // toh iska matlab hai hum aage nahi barh sakte.
        if (i > maxReach) return false;

        // Update karo: Is dabbe se hum kitni door tak ja sakte hain?
        maxReach = Math.max(maxReach, i + nums[i]);

        // Kya hum aakhri dabba pohnch gaye?
        if (maxReach >= nums.length - 1) return true;
    }

    return false;
}

// --- EXECUTION ---
console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false (0 par aakar phans gaye)