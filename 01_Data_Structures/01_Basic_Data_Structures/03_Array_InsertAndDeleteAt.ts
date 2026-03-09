import { memoryUsage } from 'process';

/**
 * AI Context Window Buffer: Engineered to expose the raw cost of Memory Shifting.
 */
class AIContextWindow<T extends NonNullable<unknown>> {
    private buffer: Array<T>;
    private _length: number = 0;

    // Telemetry registers
    public totalShiftTimeNs: bigint = 0n;

    constructor(initialCapacity: number) {
        this.buffer = new Array<T>(initialCapacity);
    }

    /**
     * O(1) setup method to rapidly fill the context window.
     */
    public push(item: T): void {
        this.buffer[this._length++] = item;
    }

    /**
     * O(N) INSERTION: The Mathematics of the Right-Shift
     */
    public insertAt(index: number, item: T): void {
        // 1. Strict Type Guarding & Bounds Checking
        if (index < 0 || index > this._length) {
            throw new RangeError(`CRITICAL OVERFLOW: Index ${index} is out of bounds.`);
        }

        const startNs = process.hrtime.bigint();

        // 2. The Right-Shift Math: We MUST loop BACKWARDS.
        // If we loop forwards, we overwrite data before we can move it!
        for (let i = this._length; i > index; i--) {
            this.buffer[i] = this.buffer[i - 1];
        }

        // 3. The vacuum is created. Inject the new element.
        this.buffer[index] = item;
        this._length++;

        this.totalShiftTimeNs += (process.hrtime.bigint() - startNs);
    }

    /**
     * O(N) DELETION: The Mathematics of the Left-Shift
     */
    public deleteAt(index: number): T {
        // 1. Strict Type Guarding & Bounds Checking
        if (index < 0 || index >= this._length) {
            throw new RangeError(`CRITICAL UNDERFLOW: Index ${index} is out of bounds.`);
        }

        const startNs = process.hrtime.bigint();
        
        // Save the reference to return to the caller
        const itemToReturn = this.buffer[index];

        // 2. The Left-Shift Math: We MUST loop FORWARDS.
        // We collapse the vacuum by pulling the right-side elements left.
        for (let i = index; i < this._length - 1; i++) {
            this.buffer[i] = this.buffer[i + 1];
        }

        // 3. Memory Architecture: Destroying the duplicated tail reference
        // By truncating the native array length, we drop the reference safely 
        // without violating the <T extends NonNullable> strictness (no assigning 'null').
        this.buffer.length = this._length - 1;
        this._length--;

        this.totalShiftTimeNs += (process.hrtime.bigint() - startNs);
        return itemToReturn;
    }

    public get length(): number { return this._length; }
    public peekAt(index: number): T { return this.buffer[index]; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Shift Mathematics Telemetry...\n");
    
    const TOKENS_IN_CONTEXT = 1_000_000; // 1 Million tokens in LLM memory
    const window = new AIContextWindow<string>(TOKENS_IN_CONTEXT + 10);

    console.log(`Loading Context Window with ${TOKENS_IN_CONTEXT.toLocaleString()} tokens...`);
    for (let i = 0; i < TOKENS_IN_CONTEXT; i++) {
        window.push(`token_${i}`);
    }

    console.log("Executing O(N) Shifting Operations...");

    // SCENARIO 1: Injecting a highly-relevant RAG context at Index 5
    // This forces 999,995 elements to shift RIGHT.
    window.insertAt(5, "URGENT_RAG_CONTEXT_INJECTION");

    // SCENARIO 2: Evicting an old context chunk at Index 10
    // This forces 999,991 elements to shift LEFT.
    const deletedToken = window.deleteAt(10);

    const shiftTimeMs = Number(window.totalShiftTimeNs) / 1e6;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Target Buffer Size    : ${window.length.toLocaleString()} items`);
    console.log(`Deleted Token Was     : ${deletedToken}`);
    console.log(`Token at Index 5      : ${window.peekAt(5)}`);
    console.log(`Token at Index 6      : ${window.peekAt(6)}`);
    console.log(`Total CPU Shift Time  : ${shiftTimeMs.toFixed(3)} ms`);
    console.log("==================================================\n");
    console.log("Notice: For just TWO operations, moving pointers took measurable milliseconds.");
    console.log("If an LLM loops this for every generated token, the system collapses.");
}

runTelemetry();