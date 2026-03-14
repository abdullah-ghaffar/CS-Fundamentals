/**
 * FILE: 44_TwoPointers_ContainerWater.js
 * Pattern: Two-Pointer Greedy Approach
 * Efficiency: O(N) Time, O(1) Space
 */

function maxArea(heights) {
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;

    while (left < right) {
        // 1. Width (Fasla) calculate karo
        const width = right - left;

        // 2. Choti deewar dhoondo
        const minHeight = Math.min(heights[left], heights[right]);

        // 3. Area calculate karo
        const currentArea = width * minHeight;

        // 4. Max Area ko update karo
        maxArea = Math.max(maxArea, currentArea);

        // 5. GREEDY FAISLA: Choti deewar wale pointer ko andar lao
        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
    }

    console.log("Sab se zyada Paani store hoga:", maxArea);
    return maxArea;
}

// --- EXECUTION (Check karte hain) ---
const serverHeights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
maxArea(serverHeights);
// Output aayega: 49 
// (Ye tab banega jab left pointer 8 par (index 1) aur right pointer 7 par (index 8) hoga. 
// Width = 7, minHeight = 7. Area = 7 * 7 = 49)