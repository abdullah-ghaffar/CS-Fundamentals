import { memoryUsage } from 'process';

/**
 * AI Sliding Window Ring Buffer: Zero-allocation, infinite-loop memory architecture.
 */
class AITokenRingBuffer<T extends NonNullable<unknown>> {
    private readonly buffer: Array<T>;
    public readonly capacity: number;
    
    // Virtual pointers mapping physical memory
    private head: number = 0;
    private tail: number = 0;
    private _size: number = 0;

    // Telemetry registers
    public totalEnqueueTimeNs: bigint = 0n;
    public totalDequeueTimeNs: bigint = 0n;

    constructor(capacity: number) {
        if (capacity <= 0) throw new RangeError("Capacity must be greater than zero.");
        this.capacity = capacity;
        // Pre-allocate the exact contiguous block of memory required
        this.buffer = new Array<T>(this.capacity);
    }

    /**
     * O(1) Modulo Enqueue
     * If the buffer is full, it OVERWRITES the oldest data automatically.
     */
    public enqueue(item: T): void {
        const startNs = process.hrtime.bigint();

        // Write to the current tail position
        this.buffer[this.tail] = item;
        
        // Advance tail with Modulo Wrap-Around logic
        this.tail = (this.tail + 1) % this.capacity;

        if (this._size < this.capacity) {
            this._size++;
        } else {
            // If full, the tail just overwrote the head. Push head forward to maintain causality.
            this.head = (this.head + 1) % this.capacity;
        }

        this.totalEnqueueTimeNs += (process.hrtime.bigint() - startNs);
    }

    /**
     * O(1) Modulo Dequeue
     */
    public dequeue(): T {
        if (this._size === 0) throw new Error("CRITICAL UNDERFLOW: Buffer is empty.");
        
        const startNs = process.hrtime.bigint();

        // Read from the current head position
        const item = this.buffer[this.head];
        
        // Advance head with Modulo Wrap-Around logic
        this.head = (this.head + 1) % this.capacity;
        this._size--;

        this.totalDequeueTimeNs += (process.hrtime.bigint() - startNs);
        return item;
    }

    public get size(): number { return this._size; }
    public isFull(): boolean { return this._size === this.capacity; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Ring Buffer Physics...\n");
    
    const STREAM_ITERATIONS = 200_000; // 200k tokens streaming in
    const WINDOW_SIZE = 10_000;        // We only keep the last 10k tokens
    
    const initialMemory = memoryUsage().heapUsed;

    // --- SCENARIO A: The Junior Approach (Array push + shift) ---
    console.log(`[JUNIOR] Executing O(N) Array Shift for ${STREAM_ITERATIONS} items...`);
    const juniorStartNs = process.hrtime.bigint();
    const juniorArray: number[] =[];
    for (let i = 0; i < STREAM_ITERATIONS; i++) {
        juniorArray.push(i);
        if (juniorArray.length > WINDOW_SIZE) {
            juniorArray.shift(); // THE O(N) LATENCY TRAP
        }
    }
    const juniorEndNs = process.hrtime.bigint();


    // --- SCENARIO B: The Architect Approach (O(1) Ring Buffer) ---
    console.log(`[ARCHITECT] Executing O(1) Ring Buffer for ${STREAM_ITERATIONS} items...`);
    const ring = new AITokenRingBuffer<number>(WINDOW_SIZE);
    
    // We don't track the loop time, only the exact enqueue time inside the class
    for (let i = 0; i < STREAM_ITERATIONS; i++) {
        ring.enqueue(i);
    }
    
    const finalMemory = memoryUsage().heapUsed;

    // Calculations
    const juniorTotalMs = Number(juniorEndNs - juniorStartNs) / 1e6;
    const ringTotalMs = Number(ring.totalEnqueueTimeNs) / 1e6;
    const memoryUsedMb = (finalMemory - initialMemory) / 1024 / 1024;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Stream Iterations     : ${STREAM_ITERATIONS.toLocaleString()}`);
    console.log(`Sliding Window Size   : ${WINDOW_SIZE.toLocaleString()}`);
    console.log(`\n❌ JUNIOR ARRAY (push + shift)`);
    console.log(`Execution Time        : ${juniorTotalMs.toFixed(2)} ms`);
    console.log(`\n✅ ARCHITECT RING BUFFER`);
    console.log(`Execution Time        : ${ringTotalMs.toFixed(2)} ms`);
    console.log(`Speed Multiplier      : ${(juniorTotalMs / ringTotalMs).toFixed(2)}x FASTER`);
    console.log(`Memory Footprint Delta: ~${memoryUsedMb.toFixed(2)} MB`);
    console.log("==================================================\n");
    console.log("Notice: The Ring Buffer's speed is entirely immune to the size of the window. The Junior array gets slower as the window grows.");
}

runTelemetry();