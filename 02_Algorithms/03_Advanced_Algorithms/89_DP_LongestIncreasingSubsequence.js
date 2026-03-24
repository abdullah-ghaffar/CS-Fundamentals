/**
 * Problem: Find the length of the longest subsequence that is strictly increasing.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    // dp[i] ka matlab hai: index 'i' par khatam hone wali LIS ki length
    // Shuru mein har number apni 1 length ki sequence hai
    let dp = new Array(nums.length).fill(1);
    let maxOverall = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            // Agar current number pichle number se bara hai
            if (nums[i] > nums[j]) {
                // Update karein agar purani sequence + 1 behtar hai
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }
        }
        // Poori array mein ab tak ki sab se lambi length
        maxOverall = Math.max(maxOverall, dp[i]);
    }

    return maxOverall;
}

// --- TESTING THE TREND FINDER ---
const prices = [10, 9, 2, 5, 3, 7, 101, 18];
// Possible LIS: [2, 3, 7, 18] or [2, 5, 7, 101] (Length: 4)

console.log("Length of LIS:", lengthOfLIS(prices)); 
// Expected Result: 4

const nums2 = [0, 1, 0, 3, 2, 3];
console.log("Length of LIS:", lengthOfLIS(nums2)); 
// Expected Result: 4 ([0, 1, 2, 3])