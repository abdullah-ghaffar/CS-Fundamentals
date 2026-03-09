
class TraceNode<T extends NonNullable<unknown>> {
    public readonly value: T;
    public next: TraceNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * AI Audit Trail: Exposing the brutal physics of Pointer Chasing during Read Operations.
 */
class AIAuditTrail<T extends NonNullable<unknown>> {
    private head: TraceNode<T> | null = null;
    private tail: TraceNode<T> | null = null;
    private _length: number = 0;

    public totalReadTimeNs: bigint = 0n;

    public append(data: T): void {
        const newNode = new TraceNode(data);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this._length++;
    }

    /**
     * O(N) Positional Read: The CPU Cache Destroyer.
     */
    public getAt(index: number): T {
        // 1. Strict Compiler-Level Bounds Checking
        if (index < 0 || index >= this._length) {
            throw new RangeError(`CRITICAL OVERFLOW: Cannot read index ${index}. Length is ${this._length}.`);
        }

        const startNs = process.hrtime.bigint();

        // 2. The O(N) Pointer Chase
        let current = this.head!;
        for (let i = 0; i < index; i++) {
            current = current.next!;
        }

        this.totalReadTimeNs += (process.hrtime.bigint() - startNs);
        return current.value;
    }

    /**
     * O(N) Value Search: Finding data in the fragmented heap.
     * Returns the index, or -1 if not found.
     */
    public indexOf(target: T): number {
        const startNs = process.hrtime.bigint();

        let current = this.head;
        let currentIndex = 0;

        while (current !== null) {
            if (current.value === target) {
                this.totalReadTimeNs += (process.hrtime.bigint() - startNs);
                return currentIndex;
            }
            current = current.next;
            currentIndex++;
        }

        this.totalReadTimeNs += (process.hrtime.bigint() - startNs);
        return -1;
    }

    public get length(): number { return this._length; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Read Latency Physics...\n");
    
    const LOG_COUNT = 1_000_000;
    const TARGET_INDEX = 999_999; // The absolute worst-case scenario (Tail read)

    console.log(`Allocating AI Audit Trail of ${LOG_COUNT.toLocaleString()} nodes...`);
    const auditTrail = new AIAuditTrail<string>();
    const juniorArray = new Array<string>(LOG_COUNT);
    
    for (let i = 0; i < LOG_COUNT; i++) {
        const logData = `API_CALL_${i}`;
        auditTrail.append(logData);
        juniorArray[i] = logData;
    }

    console.log(`\nFetching Index ${TARGET_INDEX.toLocaleString()} in Array vs Linked List...`);

    // --- SCENARIO A: Array Random Access (Math-Based) ---
    const arrayStartNs = process.hrtime.bigint();
    const arrayResult = juniorArray[TARGET_INDEX];
    const arrayEndNs = process.hrtime.bigint();

    // --- SCENARIO B: SLL Random Access (Pointer-Based) ---
    const sllResult = auditTrail.getAt(TARGET_INDEX);

    // --- SCENARIO C: Value Search ---
    const searchTarget = `API_CALL_${TARGET_INDEX}`;
    auditTrail.totalReadTimeNs = 0n; // Reset telemetry
    const searchIndex = auditTrail.indexOf(searchTarget);
    const searchTimeMs = Number(auditTrail.totalReadTimeNs) / 1e6;

    // --- METRICS ---
    const arrayMs = Number(arrayEndNs - arrayStartNs) / 1e6;
    const sllMs = Number(auditTrail.totalReadTimeNs) / 1e6;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`\n🟢 CONTIGUOUS ARRAY (O(1) Random Access)`);
    console.log(`Fetch Time              : ${arrayMs.toFixed(5)} ms`);
    
    console.log(`\n🔴 LINKED LIST (O(N) Pointer Chasing)`);
    console.log(`Fetch Time (getAt)      : ${sllMs.toFixed(3)} ms`);
    console.log(`Search Time (indexOf)   : ${searchTimeMs.toFixed(3)} ms`);
    
    console.log(`\n⚠️ THE LATENCY PENALTY`);
    if (arrayMs > 0) {
        console.log(`The Array was mathematically ~${(sllMs / arrayMs).toFixed(0)}x FASTER at reading data.`);
    }
    console.log("==================================================\n");
    console.log("Notice: An Array reads index 999,999 instantly using math. The Linked List must physically traverse 999,999 memory addresses to find the same data.");
}

runTelemetry();