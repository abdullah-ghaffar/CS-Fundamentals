// Strict type aliases for execution clarity
type SubarrayLength = number;
type PrefixSum = number;
type ArrayIndex = number;

/**
 * Immortal O(N) Optimal Approach for Longest Subarray Sum K.
 * Utilizes Mathematical Prefix Sums and V8's Internal Hash Table (Map).
 * 
 * @param arr Contiguous memory buffer (Int32Array) containing integers
 * @param k The target sum to find
 * @returns The maximum length of the subarray
 */
export function longestSubarraySumKOptimal(arr: Int32Array, k: number): SubarrayLength {
    const n: number = arr.length;
    
    // Hash Map to store the first occurrence of a Prefix Sum
    // Key: Prefix Sum, Value: Lowest Index where it occurred
    const prefixMap = new Map<PrefixSum, ArrayIndex>();
    
    let maxLength: SubarrayLength = 0;
    let currentSum: PrefixSum = 0;

    // Single linear pass - The holy grail of O(N)
    for (let i: number = 0; i < n; i++) {
        currentSum += arr[i];

        // Case 1: The subarray starts exactly from index 0
        if (currentSum === k) {
            maxLength = i + 1;
        }

        // Case 2: The sum S - K exists in our map's history
        const remainder: PrefixSum = currentSum - k;
        if (prefixMap.has(remainder)) {
            // Non-null assertion (!) is mathematically proven safe here due to .has() check
            const previousIndex: ArrayIndex = prefixMap.get(remainder)!;
            const currentLength: number = i - previousIndex;
            
            if (currentLength > maxLength) {
                maxLength = currentLength;
            }
        }

        // Only record the FIRST time we see a sum to ensure MAXIMUM length
        if (!prefixMap.has(currentSum)) {
            prefixMap.set(currentSum, i);
        }
    }

    return maxLength;
}

// ==========================================
//[TESTING IN CONSOLE - EXECUTION PROVING]
// ==========================================
function runLightSpeedTests(): void {
    console.log("⚡ [SYSTEM OVERDRIVE] Running Optimal O(N) Tests...");

    const test1 = new Int32Array([10, 5, 2, 7, 1, 9]);
    const k1 = 15;
    // Expected: 4 (Array:[5, 2, 7, 1])
    console.log(`Test 1 [K=${k1}]: Max Length =>`, longestSubarraySumKOptimal(test1, k1)); 

    const test2 = new Int32Array([-5, 8, -14, 2, 4, 12]);
    const k2 = -5;
    // Expected: 5 (Array:[-5, 8, -14, 2, 4])
    console.log(`Test 2[K=${k2}]: Max Length =>`, longestSubarraySumKOptimal(test2, k2)); 

    const test3 = new Int32Array([1, 1, 1, 1, 1]);
    const k3 = 3;
    // Expected: 3 (Array:[1, 1, 1])
    console.log(`Test 3[K=${k3}]: Max Length =>`, longestSubarraySumKOptimal(test3, k3));
}

runLightSpeedTests();