import { memoryUsage } from 'process';

class AgentStepNode<T extends NonNullable<unknown>> {
    public readonly value: T;
    public next: AgentStepNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * AI Dynamic Execution Pipeline: Engineered for surgical mid-chain injections.
 */
class AIDynamicPipeline<T extends NonNullable<unknown>> {
    private head: AgentStepNode<T> | null = null;
    private tail: AgentStepNode<T> | null = null;
    private _length: number = 0;

    // Telemetry registers to isolate the physics
    public totalTraversalTimeNs: bigint = 0n;
    public totalWiringTimeNs: bigint = 0n;

    public append(data: T): void {
        const newNode = new AgentStepNode(data);
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
     * SURGICAL INJECTION: Separating the O(N) Traversal from the O(1) Wiring.
     */
    public insertAt(index: number, data: T): void {
        // 1. Strict Mathematical Bounds Checking
        if (index < 0 || index > this._length) {
            throw new RangeError(`CRITICAL OVERFLOW: Cannot insert at index ${index}. Length is ${this._length}.`);
        }

        // 2. Edge Case Delegations (O(1) Operations)
        if (index === 0) {
            // Prepend logic (Module 09)
            const newNode = new AgentStepNode(data);
            newNode.next = this.head;
            this.head = newNode;
            if (this._length === 0) this.tail = newNode;
            this._length++;
            return;
        }
        
        if (index === this._length) {
            this.append(data);
            return;
        }

        // 3. The O(N) Pointer Chase (Finding the insertion point)
        const traversalStartNs = process.hrtime.bigint();
        
        // We must stop exactly one node BEFORE the insertion point.
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            // Type Guard: We mathematically guarantee current isn't null because of bounds checking,
            // but the Non-Null Assertion (!) tells the TS Compiler we know the physics.
            current = current!.next; 
        }
        
        const traversalEndNs = process.hrtime.bigint();

        // 4. The O(1) Memory Wiring (The Surgical Injection)
        const newNode = new AgentStepNode(data);
        
        // Step A: New Node points to the REST of the chain
        newNode.next = current!.next;
        // Step B: Previous Node points to the New Node
        current!.next = newNode;

        this._length++;
        
        this.totalTraversalTimeNs += (traversalEndNs - traversalStartNs);
        this.totalWiringTimeNs += (process.hrtime.bigint() - traversalEndNs);
    }

    public get length(): number { return this._length; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Mid-Chain Injection Physics...\n");
    
    const PIPELINE_LENGTH = 100_000;
    const INSERT_INDEX = 50_000; // Smack in the middle
    
    // --- SCENARIO A: Junior Array Splice ---
    console.log(`[JUNIOR] Allocating Array of ${PIPELINE_LENGTH} items...`);
    const juniorArray: string[] = new Array(PIPELINE_LENGTH).fill("step_data");
    
    console.log(`[JUNIOR] Injecting at index ${INSERT_INDEX} via splice()...`);
    const arrayStartNs = process.hrtime.bigint();
    juniorArray.splice(INSERT_INDEX, 0, "INJECTED_SAFEGUARD");
    const arrayEndNs = process.hrtime.bigint();


    // --- SCENARIO B: Architect Linked List ---
    console.log(`[ARCHITECT] Allocating SLL Pipeline of ${PIPELINE_LENGTH} nodes...`);
    const pipeline = new AIDynamicPipeline<string>();
    for (let i = 0; i < PIPELINE_LENGTH; i++) {
        pipeline.append("step_data");
    }

    console.log(`[ARCHITECT] Injecting at index ${INSERT_INDEX} via insertAt()...`);
    pipeline.insertAt(INSERT_INDEX, "INJECTED_SAFEGUARD");

    // --- METRICS ---
    const arrayTotalMs = Number(arrayEndNs - arrayStartNs) / 1e6;
    const sllTraversalMs = Number(pipeline.totalTraversalTimeNs) / 1e6;
    const sllWiringMs = Number(pipeline.totalWiringTimeNs) / 1e6;
    const sllTotalMs = sllTraversalMs + sllWiringMs;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`\n❌ JUNIOR ARRAY (splice)`);
    console.log(`Total CPU Time        : ${arrayTotalMs.toFixed(3)} ms (O(1) lookup + O(N) memory shift)`);
    
    console.log(`\n✅ ARCHITECT SLL (insertAt)`);
    console.log(`Pointer Chasing Time  : ${sllTraversalMs.toFixed(3)} ms (The O(N) Traversal)`);
    console.log(`Pointer Wiring Time   : ${sllWiringMs.toFixed(5)} ms (The O(1) Injection)`);
    console.log(`Total CPU Time        : ${sllTotalMs.toFixed(3)} ms`);
    console.log("==================================================\n");
    console.log("Notice the Pointer Wiring Time. It is practically zero. Once the CPU reaches the destination, injecting data costs zero memory movement.");
}

runTelemetry();