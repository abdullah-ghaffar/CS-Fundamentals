/**
 * Problem: Check if any subset of array equals the target sum.
 * Time Complexity: O(n * target)
 * Space Complexity: O(target)
 */

function isSubsetSum(arr, target) {
    let n = arr.length;
    
    // DP array: index represent karta hai "Target Sum" ko
    // dp[i] = true ka matlab hai sum 'i' banana possible hai
    let dp = new Array(target + 1).fill(false);

    // Base Case: Target 0 hamesha possible hai (khali subset se)
    dp[0] = true;

    for (let i = 0; i < n; i++) {
        // Reverse loop taake hum pichli iteration ka data overwrite na karein
        for (let j = target; j >= arr[i]; j--) {
            // Agar target 'j' pehle se possible tha OR 
            // current number ko nikalne ke baad bacha hua target possible tha
            if (dp[j - arr[i]] === true) {
                dp[j] = true;
            }
        }
    }

    return dp[target];
}

// --- TESTING THE ALLOCATOR ---
const projects = [3, 34, 4, 12, 5, 2];
const fund = 9;

console.log(`Is it possible to make sum ${fund}?`, isSubsetSum(projects, fund)); 
// Expected: true (4 + 5 = 9 or 3 + 4 + 2 = 9)

console.log(`Is it possible to make sum 30?`, isSubsetSum(projects, 30)); 
// Expected: false