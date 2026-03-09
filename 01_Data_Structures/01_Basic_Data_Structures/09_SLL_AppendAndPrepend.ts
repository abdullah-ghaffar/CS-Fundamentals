import { memoryUsage } from 'process';

class StreamNode<T extends NonNullable<unknown>> {
    public readonly value: T;
    public next: StreamNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * AI LIFO/FIFO Stream Buffer: Engineered for O(1) boundary mutations.
 */
class AIStreamBuffer<T extends NonNullable<unknown>> {
    private head: StreamNode<T> | null = null;
    private tail: StreamNode<T> | null = null;
    private _length: number = 0;

    public totalPrependTimeNs: bigint = 0n;
    public totalAppendTimeNs: bigint = 0n;

    /**
     * O(1) PREPEND: The Ultimate Array Killer.
     * Inserts data at the absolute beginning without shifting memory.
     */
    public prepend(data: T): void {
        const startNs = process.hrtime.bigint();
        
        const newNode = new StreamNode(data);

        if (!this.head) {
            // State: Empty Buffer
            this.head = newNode;
            this.tail = newNode;
        } else {
            // State: Existing Buffer
            // 1. Point the new node to the current head
            newNode.next = this.head;
            // 2. Reassign the Head pointer to the new node
            this.head = newNode;
        }

        this._length++;
        this.totalPrependTimeNs += (process.hrtime.bigint() - startNs);
    }

    /**
     * O(1) APPEND: Pushing to the end using the Tail pointer.
     */
    public append(data: T): void {
        const startNs = process.hrtime.bigint();
        
        const newNode = new StreamNode(data);

        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this._length++;
        this.totalAppendTimeNs += (process.hrtime.bigint() - startNs);
    }

    public get length(): number { return this._length; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting O(1) Prepend Physics...\n");
    
    // We use 50,000. If you try 1,000,000 with Array.unshift, your PC will freeze.
    const INGESTION_COUNT = 50_000; 
    
    // --- SCENARIO A: The Junior Approach (Array unshift) ---
    console.log(`[JUNIOR] Prepending ${INGESTION_COUNT.toLocaleString()} events using Array.unshift()...`);
    const juniorStartNs = process.hrtime.bigint();
    const juniorArray: number[] =[];
    
    for (let i = 0; i < INGESTION_COUNT; i++) {
        juniorArray.unshift(i); // CAUSES CASCADING O(N) MEMORY SHIFTS
    }
    const juniorEndNs = process.hrtime.bigint();


    // --- SCENARIO B: The Architect Approach (SLL Prepend) ---
    console.log(`[ARCHITECT] Prepending ${INGESTION_COUNT.toLocaleString()} events using SLL O(1) Logic...`);
    const bufferStartNs = process.hrtime.bigint();
    const streamBuffer = new AIStreamBuffer<number>();
    
    for (let i = 0; i < INGESTION_COUNT; i++) {
        streamBuffer.prepend(i); // TWO POINTER CHANGES. ZERO MEMORY SHIFTING.
    }
    const bufferEndNs = process.hrtime.bigint();

    // --- METRICS ---
    const juniorTotalMs = Number(juniorEndNs - juniorStartNs) / 1e6;
    const sllTotalMs = Number(bufferEndNs - bufferStartNs) / 1e6;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Total Events Ingested : ${INGESTION_COUNT.toLocaleString()}`);
    console.log(`\n❌ JUNIOR ARRAY (unshift)`);
    console.log(`CPU Time Taken        : ${juniorTotalMs.toFixed(2)} ms (O(N^2) Latency Trap)`);
    console.log(`\n✅ ARCHITECT SLL (prepend)`);
    console.log(`CPU Time Taken        : ${sllTotalMs.toFixed(2)} ms (O(N) Total)`);
    console.log(`\n⚡ PERFORMANCE MULTIPLIER`);
    if (sllTotalMs > 0) {
        console.log(`The Linked List was ${(juniorTotalMs / sllTotalMs).toFixed(0)}x FASTER than the Array.`);
    }
    console.log("==================================================\n");
    console.log("Notice: The Array is doing (50,000 * 50,000) / 2 = 1.25 BILLION memory operations.");
    console.log("The SLL is doing exactly 50,000 pointer operations.");
}

runTelemetry();