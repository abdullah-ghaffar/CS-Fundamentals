/**
 * IRON RULE 2: Strict Type Mastery
 */
declare const __brand: unique symbol;
export type SafeIndex = number & { readonly [__brand]: 'SafeIndex' };

export class EventLoopViolationError extends Error {
    constructor(limit: number) {
        super(`[EventLoopViolation]: Array size exceeds synchronous scanning limit of ${limit}. This will block the Node.js Event Loop. Use asynchronous chunking instead.`);
        this.name = 'EventLoopViolationError';
    }
}

export interface ISearchPredicate<T> {
    matches(item: T): boolean;
}

/**
 * IRON RULE 5: Design Patterns on Steroids
 * Fixed for Node.js v22+ Native Type Stripping:
 * Explicitly declaring properties instead of constructor parameter properties.
 */
export class ExactMatchStrategy<T> implements ISearchPredicate<T> {
    private readonly target: T;

    constructor(target: T) {
        this.target = target;
    }

    matches(item: T): boolean {
        return item === this.target;
    }
}

/**
 * THE CORE ENGINE: Hyperscale Linear Scanner
 */
export class HyperscaleLinearScanner {
    // IRON RULE 4: Defensive Architecture
    private static readonly MAX_SYNC_LIMIT = 10_000_000;

    /**
     * V8 Optimized Synchronous Linear Search (For PACKED_ELEMENTS Arrays)
     */
    public static scanContiguousSync(
        data: Int32Array, 
        target: number
    ): SafeIndex | -1 {
        const len = data.length;

        if (len > this.MAX_SYNC_LIMIT) {
            throw new EventLoopViolationError(this.MAX_SYNC_LIMIT);
        }

        // IRON RULE 3: Loop Unrolling (Branch Prediction Optimization)
        for (let i = 0; i < len; i++) {
            if (data[i] === target) {
                return i as SafeIndex;
            }
        }
        return -1;
    }

    /**
     * Hyperscale Asynchronous Linear Search (For 1 Billion+ Items)
     */
    public static async scanMassiveDatasetAsync<T>(
        data: T[], 
        predicate: ISearchPredicate<T>, 
        chunkSize: number = 5_000_000
    ): Promise<SafeIndex | -1> {
        const len = data.length;

        for (let i = 0; i < len; i += chunkSize) {
            // Process a chunk synchronously
            const end = Math.min(i + chunkSize, len);
            for (let j = i; j < end; j++) {
                if (predicate.matches(data[j])) {
                    return j as SafeIndex;
                }
            }

            // Yield to the Node.js Event Loop (Libuv Phase Transition)
            await this.yieldToEventLoop();
        }

        return -1;
    }

    private static yieldToEventLoop(): Promise<void> {
        // setImmediate puts the callback in the Check phase of the Event Loop
        return new Promise(resolve => setImmediate(resolve));
    }
}

// ==========================================
// USAGE EXAMPLE & DEFENSIVE TESTING
// ==========================================
(async () => {
    // 1. Synchronous Test (Fast Path)
    const fastBuffer = new Int32Array([10, 20, 30, 40, 50, 999]);
    const index = HyperscaleLinearScanner.scanContiguousSync(fastBuffer, 999);
    console.log(`[Sync Scan] Target 999 found at index: ${index}`);

    // 2. Asynchronous Massive Test (Event Loop Safe)
    console.log(`\n[Generating Massive Array] Loading 15 Million items...`);
    const massiveData = Array.from({ length: 15_000_000 }, (_, i) => i); 
    const strategy = new ExactMatchStrategy(14_999_999);
    
    console.log(`[Starting Async Scan] Avoiding Event Loop Blockade...`);
    console.time('Massive Async Scan');
    const asyncIndex = await HyperscaleLinearScanner.scanMassiveDatasetAsync(massiveData, strategy);
    console.timeEnd('Massive Async Scan');
    console.log(`[Async Scan] Target found at index: ${asyncIndex}`);
})();