import { memoryUsage } from 'process';

class AIVectorBuffer<T extends NonNullable<unknown>> {
    private buffer: Array<T>;
    private _length: number = 0;
    private _capacity: number;
    
    public totalResizeTimeNs: bigint = 0n;
    public resizeEventCount: number = 0;

    constructor(initialCapacity: number = 2) {
        this._capacity = initialCapacity;
        this.buffer = new Array<T>(this._capacity);
    }

    /**
     * AI DB OPTIMIZATION: Ingest a massive batch of embeddings at once.
     * We calculate capacity requirements O(1) time before looping.
     */
    public pushBatch(items: T[]): void {
        const requiredCapacity = this._length + items.length;
        
        // Only trigger the expensive resize if absolutely necessary
        if (requiredCapacity > this._capacity) {
            this.resize(requiredCapacity);
        }

        // Fast sequential write into contiguous memory slots
        for (let i = 0; i < items.length; i++) {
            this.buffer[this._length + i] = items[i];
        }
        
        this._length += items.length;
    }

    /**
     * V8 Memory Physics: Using the 1.5x Growth Law
     */
    private resize(minimumRequiredCapacity: number): void {
        const startNs = process.hrtime.bigint();

        // 1.5x Growth Factor (Bitwise integer math: x + (x >> 1) is ~1.5x but faster)
        // Math.floor() prevents decimal capacities which would crash V8 Array allocation
        let newCapacity = Math.floor(this._capacity * 1.5);
        
        // If 1.5x still isn't enough for the incoming batch, force it to exactly what we need
        if (newCapacity < minimumRequiredCapacity) {
            newCapacity = minimumRequiredCapacity;
        }

        const newBuffer = new Array<T>(newCapacity);

        for (let i = 0; i < this._length; i++) {
            newBuffer[i] = this.buffer[i];
        }

        this.buffer = newBuffer;
        this._capacity = newCapacity;
        this.resizeEventCount++;

        this.totalResizeTimeNs += (process.hrtime.bigint() - startNs);
    }

    public get length(): number { return this._length; }
    public get capacity(): number { return this._capacity; }
}

// ==========================================
// TELEMETRY RUNNER
// ==========================================
function runTelemetry() {
    console.log("🚀[BATCH ARCHITECT MODE] Booting 1.5x Dynamic Array...\n");
    
    const initialMemory = memoryUsage().heapUsed;
    const TOTAL_INSERTIONS = 5_000_000;
    const BATCH_SIZE = 10_000; // Ingesting 10k vectors per batch
    
    const buffer = new AIVectorBuffer<number>(10);
    
    // Create a mock batch of Vector IDs
    const mockBatch = new Array<number>(BATCH_SIZE).fill(1);

    const globalStartNs = process.hrtime.bigint();

    // Loop through batches instead of single items
    for (let i = 0; i < TOTAL_INSERTIONS / BATCH_SIZE; i++) {
        buffer.pushBatch(mockBatch);
    }

    const globalEndNs = process.hrtime.bigint();
    const finalMemory = memoryUsage().heapUsed;

    const totalTimeMs = Number(globalEndNs - globalStartNs) / 1e6;
    const resizeTimeMs = Number(buffer.totalResizeTimeNs) / 1e6;
    const memoryUsedMb = (finalMemory - initialMemory) / 1024 / 1024;

    console.log("==================================================");
    console.log(`📊 BATCHING TELEMETRY REPORT:`);
    console.log(`Total Execution Time  : ${totalTimeMs.toFixed(2)} ms`);
    console.log(`Final Capacity Reached: ${buffer.capacity.toLocaleString()}`);
    console.log(`Number of O(N) Resizes: ${buffer.resizeEventCount}`);
    console.log(`Time FROZEN in Resizes: ${resizeTimeMs.toFixed(2)} ms`);
    console.log(`Memory Footprint Delta: ~${memoryUsedMb.toFixed(2)} MB`);
    console.log("==================================================\n");
}

runTelemetry();