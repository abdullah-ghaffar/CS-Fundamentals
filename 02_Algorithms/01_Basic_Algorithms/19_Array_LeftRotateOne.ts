/**
 * IRON RULE 2: Strict Type Mastery
 * Branded Type to ensure we are working with high-perf binary buffers.
 */
export type RotationCompatibleBuffer = Int32Array;

/**
 * IRON RULE 4: Defensive Architecture
 * Custom error for zero-length or invalid buffer operations.
 */
export class BufferUnderflowError extends Error {
    constructor() {
        super('[Memory Op Failed]: Buffer is empty. Cannot perform rotation.');
        this.name = 'BufferUnderflowError';
    }
}

/**
 * THE CORE ENGINE: Direct Memory Manipulation
 * Pattern: Static Utility (Stateless) - V8 Optimizable
 */
export class MemoryRotationEngine {
    
    /**
     * Shifts the entire memory block to the left by 1 index strictly in-place.
     * Uses `copyWithin` to trigger C++ `memmove` (Hardware accelerated).
     * 
     * @param buffer Int32Array (Contiguous Memory)
     */
    public static leftRotateOne(buffer: RotationCompatibleBuffer): void {
        const len = buffer.length;

        // Defensive Check: Empty or Single Element arrays need no rotation.
        if (len === 0) throw new BufferUnderflowError();
        if (len === 1) return;

        // Step 1: Cache the first element (Head)
        // This is stored in a CPU Register or L1 Cache stack.
        const head = buffer[0];

        // Step 2: The "Tectonic Shift"
        // buffer.copyWithin(target, start, end)
        // Target: 0 (Hum index 0 par write shuru karenge)
        // Start: 1 (Hum index 1 se read karna shuru karenge)
        // Effect: Index 1 data -> Index 0, Index 2 -> Index 1...
        // IRON RULE 3: Internals
        // Ye loop nahi hai. Ye V8 ke through libc ki `memmove` instruction hai.
        // Modern CPUs (AVX/SSE) isay SIMD (Single Instruction Multiple Data) 
        // use karke bulk mein copy karte hain.
        buffer.copyWithin(0, 1);

        // Step 3: Place the cached Head at the Tail
        buffer[len - 1] = head;
    }
}

// ==========================================
// USAGE EXAMPLE & BENCHMARKING
// ==========================================
(() => {
    const size = 10_000_000; // 10 Million Integers (~40MB RAM)
    console.log(`[Allocation] Creating contiguous buffer of ${size} items...`);
    const buffer = new Int32Array(size);
    
    // Fill buffer: [0, 1, 2, ... 9999999]
    for(let i=0; i<size; i++) buffer[i] = i;

    console.log(`[Before Rotation] First: ${buffer[0]}, Last: ${buffer[size-1]}`);

    console.time('Hyperscale Rotation');
    // The operation
    MemoryRotationEngine.leftRotateOne(buffer);
    console.timeEnd('Hyperscale Rotation');

    console.log(`[After Rotation]  First: ${buffer[0]}, Last: ${buffer[size-1]}`);
    
    // Verification
    if (buffer[0] === 1 && buffer[size-1] === 0) {
        console.log('[Verification] Integrity Check Passed.');
    } else {
        console.error('[Verification] FAILED: Memory corruption detected.');
    }
})();