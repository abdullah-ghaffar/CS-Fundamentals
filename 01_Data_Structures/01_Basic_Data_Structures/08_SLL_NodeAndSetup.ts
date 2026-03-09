import { memoryUsage } from 'process';

/**
 * The Silicon Molecule: A single autonomous block of memory in the V8 Heap.
 */
class AgentStepNode<T extends NonNullable<unknown>> {
    public readonly value: T;
    // The Pointer: A 64-bit memory address pointing to the next object, or the absolute void (null).
    public next: AgentStepNode<T> | null;

    constructor(value: T) {
        this.value = value;
        // CRITICAL: Always initialize to null in the constructor to lock the V8 Hidden Class
        this.next = null; 
    }
}

/**
 * AI Execution Chain: A Singly Linked List managing fragmented heap objects.
 */
class AIExecutionChain<T extends NonNullable<unknown>> {
    private head: AgentStepNode<T> | null = null;
    private tail: AgentStepNode<T> | null = null;
    private _length: number = 0;

    // Telemetry registers
    public totalAllocationTimeNs: bigint = 0n;

    /**
     * O(1) Append: Dynamic memory allocation without array resizing.
     */
    public append(stepData: T): void {
        const startNs = process.hrtime.bigint();

        // 1. Allocate a completely new object in the V8 Heap
        const newNode = new AgentStepNode(stepData);

        // 2. Pointer Wiring Physics
        if (!this.head) {
            // Empty Chain State
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Existing Chain State: The Non-Null Assertion (!) is mathematically proven safe here.
            this.tail!.next = newNode; 
            this.tail = newNode;
        }

        this._length++;
        this.totalAllocationTimeNs += (process.hrtime.bigint() - startNs);
    }

    public get length(): number { return this._length; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting SLL Memory Fragmentation Telemetry...\n");
    
    const CHAIN_LENGTH = 1_000_000; // 1 Million Agent Steps
    
    // --- SCENARIO A: Continuous Array (Baseline) ---
    console.log(`Allocating ${CHAIN_LENGTH.toLocaleString()} items in a pre-sized Array...`);
    const arrayStartMemory = memoryUsage().heapUsed;
    const contiguousArray = new Array<number>(CHAIN_LENGTH);
    for (let i = 0; i < CHAIN_LENGTH; i++) {
        contiguousArray[i] = i;
    }
    const arrayEndMemory = memoryUsage().heapUsed;


    // --- SCENARIO B: Singly Linked List (Fragmented Heap) ---
    console.log(`Allocating ${CHAIN_LENGTH.toLocaleString()} Nodes in the Linked List...`);
    const sllStartMemory = memoryUsage().heapUsed;
    const sllStartNs = process.hrtime.bigint();
    
    const executionChain = new AIExecutionChain<number>();
    for (let i = 0; i < CHAIN_LENGTH; i++) {
        executionChain.append(i);
    }
    
    const sllEndNs = process.hrtime.bigint();
    const sllEndMemory = memoryUsage().heapUsed;

    // --- METRICS ---
    const arrayMemoryMb = (arrayEndMemory - arrayStartMemory) / 1024 / 1024;
    const sllMemoryMb = (sllEndMemory - sllStartMemory) / 1024 / 1024;
    const sllAllocTimeMs = Number(executionChain.totalAllocationTimeNs) / 1e6;
    const sllTotalTimeMs = Number(sllEndNs - sllStartNs) / 1e6;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Total Elements Placed : ${executionChain.length.toLocaleString()}`);
    console.log(`\n🟩 CONTIGUOUS ARRAY (Control)`);
    console.log(`Memory Footprint      : ~${arrayMemoryMb.toFixed(2)} MB`);
    console.log(`\n🟥 SINGLY LINKED LIST (Heap Objects)`);
    console.log(`Total CPU Time        : ${sllTotalTimeMs.toFixed(2)} ms`);
    console.log(`Pure Allocation Time  : ${sllAllocTimeMs.toFixed(2)} ms`);
    console.log(`Memory Footprint      : ~${sllMemoryMb.toFixed(2)} MB`);
    console.log(`\n⚠️ THE OBJECT TAX`);
    console.log(`The SLL used ${(sllMemoryMb / arrayMemoryMb).toFixed(2)}x MORE RAM than the Array.`);
    console.log("==================================================\n");
    console.log("Notice: Creating objects 'Node { value, next }' incurs massive V8 structural overhead compared to writing numbers sequentially into RAM.");
}

runTelemetry();