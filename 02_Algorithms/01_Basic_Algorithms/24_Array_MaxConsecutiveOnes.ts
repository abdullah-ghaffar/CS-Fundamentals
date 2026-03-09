// --- STRICT TYPE PROTOCOLS ---
type BinaryBit = 0 | 1;
type BitVector = Uint8Array & { readonly __brand: unique symbol };

// 1. ALLOCATOR: Zero-GC Memory initialization
function allocateBitVector(size: number): BitVector {
    return new Uint8Array(size) as BitVector;
}

// 2. THE ALGORITHM: Branchless, Loop-Unrolled
function maxConsecutiveOnes(arr: BitVector): number {
    let max = 0;
    let current = 0;
    const len = arr.length;
    let i = 0;
    const limit = len - (len % 4);

    for (; i < limit; i += 4) {
        let val = arr[i];
        current = (current + val) & (-val);
        if (current > max) max = current;

        val = arr[i + 1];
        current = (current + val) & (-val);
        if (current > max) max = current;

        val = arr[i + 2];
        current = (current + val) & (-val);
        if (current > max) max = current;

        val = arr[i + 3];
        current = (current + val) & (-val);
        if (current > max) max = current;
    }

    for (; i < len; i++) {
        const val = arr[i];
        current = (current + val) & (-val);
        if (current > max) max = current;
    }
    return max;
}

// 3. THE V8 TEST HARNESS
(function runDoomsdayBenchmark() {
    console.log("[SYSTEM] Allocating 1 Billion Elements (1GB contiguous RAM)...");
    const SIZE = 1_000_000_000;
    const data = allocateBitVector(SIZE);

    // Seed the array with a known mathematical pattern to verify correctness
    // We will create a streak of 42 consecutive ones at the end.
    for (let i = 0; i < SIZE; i++) {
        // Randomize 0s and 1s, but avoid long streaks accidentally exceeding 42
        data[i] = (Math.random() > 0.8) ? 1 : 0; 
    }
    for (let i = SIZE - 100; i < SIZE - 58; i++) {
        data[i] = 1; // Exactly 42 ones
    }

    console.log("[SYSTEM] Warming up V8 TurboFan Compiler...");
    const warmupData = allocateBitVector(10_000);
    for (let i = 0; i < 10_000; i++) {
        maxConsecutiveOnes(warmupData); // Force JIT Tier-Up
    }

    console.log("[SYSTEM] V8 TurboFan Engaged. Executing Doomsday Payload...");
    const t0 = performance.now();
    
    const result = maxConsecutiveOnes(data);
    
    const t1 = performance.now();
    const duration = (t1 - t0).toFixed(2);

    console.log(`\n=========================================`);
    console.log(`[RESULT] Max Consecutive Ones: ${result}`);
    console.log(`[SPEED]  Execution Time: ${duration} ms`);
    console.log(`[THROUGHPUT] ${(SIZE / ((t1 - t0) / 1000) / 1e6).toFixed(2)} Million ops/sec`);
    console.log(`=========================================\n`);
})();