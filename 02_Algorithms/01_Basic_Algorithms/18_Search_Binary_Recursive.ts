/**
 * IRON RULE 2: Strict Type Mastery
 */
declare const __brand: unique symbol;
export type SafeIndex = number & { readonly [__brand]: 'SafeIndex' };

/**
 * IRON RULE 4: Defensive Architecture
 * Custom Error to detect runaway recursion or stack exhaustion early.
 */
export class StackDepthExceededError extends Error {
    constructor(depth: number) {
        super(`[StackGuard]: Recursion depth exceeded safety limit of ${depth}. Terminating to prevent process crash.`);
        this.name = 'StackDepthExceededError';
    }
}

/**
 * THE CORE ENGINE: Recursive Binary Search
 * IRON RULE 5: Design Patterns - Facade Pattern
 * Public method simplifies the API, Private method handles the complexity.
 */
export class RecursiveBinaryEngine {
    // V8 usually allows ~10k-15k stack frames. 
    // We set a strict logical limit well below that.
    private static readonly MAX_STACK_DEPTH = 1000;

    /**
     * Public Facade: Entry point for the search.
     */
    public static search(data: Int32Array, target: number): SafeIndex | -1 {
        // Zero-Cost Boundary Check (O(1))
        if (data.length === 0) return -1;
        
        // Kick off the recursive chain
        return this.searchInternal(data, target, 0, data.length - 1, 0);
    }

    /**
     * Internal Recursive Worker (The "Hot" Path)
     * Note: We pass the *reference* of Int32Array, never a copy.
     */
    private static searchInternal(
        data: Int32Array, 
        target: number, 
        left: number, 
        right: number,
        depth: number
    ): SafeIndex | -1 {
        // Defensive: Stack Guard
        if (depth > this.MAX_STACK_DEPTH) {
            throw new StackDepthExceededError(this.MAX_STACK_DEPTH);
        }

        // Base Case: Not Found
        if (left > right) {
            return -1;
        }

        // IRON RULE 1: Hyperscale Math (Overflow Protection)
        // mid = left + ((right - left) / 2) -> using bitwise shift for safety
        const mid = left + ((right - left) >>> 1);
        const midValue = data[mid];

        // Base Case: Found
        if (midValue === target) {
            return mid as SafeIndex;
        }

        // Recursive Step: Tail-Call Logic
        // V8 doesn't officially support TCO (Tail Call Optimization) yet, 
        // but writing in this style prepares for future engine upgrades.
        if (midValue < target) {
            // Target is in the right half
            return this.searchInternal(data, target, mid + 1, right, depth + 1);
        } else {
            // Target is in the left half
            return this.searchInternal(data, target, left, mid - 1, depth + 1);
        }
    }
}

// ==========================================
// USAGE EXAMPLE & STACK ANALYSIS
// ==========================================
// 1. Setup 50 Million Items
console.log(`[Memory Allocator] Initializing 50 Million items...`);
const recursiveBuffer = new Int32Array(50_000_000);
// Quick fill
for (let i = 0; i < 50_000_000; i++) {
    recursiveBuffer[i] = i * 3; 
}

const searchTarget = 149_999_997; // Near the end (Deep recursion path)

console.log(`[Engine Started] Recursively searching for ${searchTarget}...`);
console.time('Recursive Search Time');

try {
    const foundIndex = RecursiveBinaryEngine.search(recursiveBuffer, searchTarget);
    console.timeEnd('Recursive Search Time');
    
    if (foundIndex !== -1) {
        console.log(`[Success] Target found at index: ${foundIndex}`);
        
        // Calculate theoretical depth
        // log2(50,000,000) ~ 25.57
        console.log(`[Stack Analysis] Theoretical Stack Depth: ~${Math.ceil(Math.log2(50_000_000))} frames`);
    } else {
        console.log(`[Result] Target not found.`);
    }
} catch (e) {
    console.error(e);
}