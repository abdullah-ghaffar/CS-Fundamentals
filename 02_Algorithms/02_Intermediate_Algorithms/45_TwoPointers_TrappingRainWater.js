/**
 * FILE: 45_TwoPointers_TrappingRainWater.js
 * Pattern: Two-Pointer with Boundary Tracking
 * Efficiency: O(N) Time, O(1) Space
 */

function trapRainWater(heights) {
    let left = 0;
    let right = heights.length - 1;

    let leftMax = 0;
    let rightMax = 0;

    let totalWater = 0;

    while (left < right) {
        // Hamesha choti deewar wali side se kaam shuru karo
        if (heights[left] < heights[right]) {
            // Kya left wali deewar boundary ban sakti hai?
            if (heights[left] >= leftMax) {
                leftMax = heights[left];
            } else {
                // Nahi, boundary oonchi hai, toh paani jama karo
                totalWater += leftMax - heights[left];
            }
            left++;
        } else { // Right deewar choti hai
            // Kya right wali deewar boundary ban sakti hai?
            if (heights[right] >= rightMax) {
                rightMax = heights[right];
            } else {
                // Nahi, boundary oonchi hai, toh paani jama karo
                totalWater += rightMax - heights[right];
            }
            right--;
        }
    }

    console.log("Kul Paani jama hua:", totalWater);
    return totalWater;
}

// --- EXECUTION (Check karte hain) ---
const barChart = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
trapRainWater(barChart);
// Output aayega: 6