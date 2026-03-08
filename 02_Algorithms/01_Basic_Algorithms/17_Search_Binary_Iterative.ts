/**
 * IRON RULE 2: Strict Type Mastery
 */
declare const __brand: unique symbol;
export type SafeIndex = number & { readonly [__brand]: 'SafeIndex' };

export class OutOfBoundsError extends Error {
    constructor() {
        super('[Defensive Check]: Target is outside the array boundaries. Fast-failing.');
        this.name = 'OutOfBoundsError';
    }
}

/**
 * THE CORE ENGINE: Zero-Allocation Hyperscale Binary Search
 * IRON RULE 5: Engine Pattern (Stateless, purely static for V8 inline caching)
 */
export class HyperscaleBinarySearch {
    /**
     * Iterative Binary Search for purely contiguous C++ memory (TypedArrays)
     * @param sortedData Strictly Int32Array to guarantee L1/L2 cache locality
     * @param target The number to find
     * @returns SafeIndex if found, -1 if not found
     */
    public static searchSync(sortedData: Int32Array, target: number): SafeIndex | -1 {
        const len = sortedData.length;

        // IRON RULE 4: Defensive Architecture (Fast-Fail Boundaries)
        // Agar array empty hai, ya target min/max boundaries se bahar hai, toh 
        // search shuru karne ka koi faida nahi. O(1) mein reject karo.
        if (len === 0) return -1;
        if (target < sortedData[0] || target > sortedData[len - 1]) {
            return -1; // Ya throw new OutOfBoundsError(); agar strict validation chahiye
        }

        let left = 0;
        let right = len - 1;

        // IRON RULE 3: Internals (Iterative vs Recursive)
        // Humne Recursive function use NAHI kiya kyunke har function call V8 ke Call Stack 
        // par frame banata hai. Iterative 'while' loop ki space complexity strictly O(1) hai.
        while (left <= right) {
            // THE LEGENDARY OVERFLOW FIX & V8 OPTIMIZATION
            // Normal: (left + right) / 2 -> Floating point math, slow and risks Integer Overflow.
            // Hyperscale: left + ((right - left) >>> 1) -> 
            // 1. (right - left) prevents overflow.
            // 2. `>>> 1` (Unsigned Right Shift by 1) is mathematically division by 2.
            // 3. V8 executes `>>>` in 1 single CPU clock cycle (ALU instruction).
            const mid = left + ((right - left) >>> 1);
            
            const midValue = sortedData[mid];

            if (midValue === target) {
                return mid as SafeIndex; // Target Found
            }

            if (midValue < target) {
                left = mid + 1; // Discard left half
            } else {
                right = mid - 1; // Discard right half
            }
        }

        return -1; // Target not found
    }
}

// ==========================================
// USAGE EXAMPLE & TESTING
// ==========================================
// 1. Loading 100 Million Sorted Items (Zero-GC C++ Array)
console.log(`[Memory Allocator] Initializing 100 Million items...`);
const massiveSortedBuffer = new Int32Array(100_000_000);
for (let i = 0; i < 100_000_000; i++) {
    massiveSortedBuffer[i] = i * 2; //[0, 2, 4, 6, 8, ... 199999998]
}

const targetValue = 199_999_998; // Worst case scenario (Last item)

console.log(`[Engine Started] Searching for ${targetValue}...`);
console.time('Binary Search Execution');
const resultIndex = HyperscaleBinarySearch.searchSync(massiveSortedBuffer, targetValue);
console.timeEnd('Binary Search Execution');

console.log(`[Result] Target found at SafeIndex: ${resultIndex}`);