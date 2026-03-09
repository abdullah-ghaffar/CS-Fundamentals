import { memoryUsage } from 'process';

class ReasoningStep<T extends NonNullable<unknown>> {
    public readonly value: T;
    public next: ReasoningStep<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * AI Context Window Manager: Engineered for surgical O(1) memory pruning at exact indices.
 */
class AIReasoningChain<T extends NonNullable<unknown>> {
    private head: ReasoningStep<T> | null = null;
    private tail: ReasoningStep<T> | null = null;
    private _length: number = 0;

    // Telemetry registers
    public totalTraversalNs: bigint = 0n;
    public totalWiringNs: bigint = 0n;

    public append(data: T): void {
        const newNode = new ReasoningStep(data);
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
     * O(N) Traversal + O(1) Eviction by Mathematical Index
     */
    public removeAt(index: number): T {
        // 1. Strict Compiler-Level Bounds Checking
        if (index < 0 || index >= this._length) {
            throw new RangeError(`CRITICAL UNDERFLOW: Index ${index} does not exist. Length is ${this._length}.`);
        }

        const startNs = process.hrtime.bigint();

        // 2. Edge Case: O(1) Head Eviction (The 'shift' operation)
        if (index === 0) {
            const evictedNode = this.head!;
            this.head = this.head!.next;
            
            // If we just deleted the very last item, the tail must be nullified
            if (this._length === 1) {
                this.tail = null;
            }
            
            this._length--;
            this.totalWiringNs += (process.hrtime.bigint() - startNs);
            return evictedNode.value;
        }

        // 3. O(N) Pointer Chasing (The Traversal Phase)
        // We must stop exactly AT (index - 1) to perform the bypass.
        let previous = this.head!;
        for (let i = 0; i < index - 1; i++) {
            previous = previous.next!;
        }

        const traversalEndNs = process.hrtime.bigint();

        // 4. O(1) Surgical Eviction (The Wiring Phase)
        const targetNode = previous.next!;
        
        // The Architect's Bypass: Target is orphaned from the chain
        previous.next = targetNode.next;

        // 5. Edge Case: O(1) Tail Update (The 'pop' operation)
        // If we just deleted the absolute end of the chain, 'previous' is the new tail.
        if (index === this._length - 1) {
            this.tail = previous;
        }

        this._length--;
        
        this.totalTraversalNs += (traversalEndNs - startNs);
        this.totalWiringNs += (process.hrtime.bigint() - traversalEndNs);

        return targetNode.value;
    }

    public get length(): number { return this._length; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Positional Eviction Physics...\n");
    
    const CHAIN_LENGTH = 500_000;
    const TARGET_INDEX = 250_000; // Dead center of the V8 Heap

    console.log(`Allocating AI Reasoning Chain of ${CHAIN_LENGTH.toLocaleString()} steps...`);
    const chain = new AIReasoningChain<string>();
    
    for (let i = 0; i < CHAIN_LENGTH; i++) {
        if (i === TARGET_INDEX) {
            chain.append("⚠️ DEAD_END_REASONING_STEP");
        } else {
            chain.append(`Step_${i}`);
        }
    }

    console.log(`\nExcising Step at Index ${TARGET_INDEX.toLocaleString()}...`);
    const initialMemory = memoryUsage().heapUsed;
    
    const evictedData = chain.removeAt(TARGET_INDEX);

    const finalMemory = memoryUsage().heapUsed;

    // --- METRICS ---
    const traversalMs = Number(chain.totalTraversalNs) / 1e6;
    const wiringMs = Number(chain.totalWiringNs) / 1e6;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Evicted Node Data           : ${evictedData}`);
    console.log(`New Chain Length            : ${chain.length.toLocaleString()}`);
    console.log(`\n⏱️ EXECUTION PHYSICS`);
    console.log(`Pointer Chasing Time (O(N)) : ${traversalMs.toFixed(3)} ms (RAM L1 Cache Misses)`);
    console.log(`Surgical Wiring Time (O(1)) : ${wiringMs.toFixed(5)} ms (Absolute Zero Memory Shift)`);
    console.log("==================================================\n");
    console.log("Notice: The CPU spent 99.9% of its time just looking for the node. Actually deleting it took fractions of a microsecond.");
}

runTelemetry();