import { memoryUsage } from 'process';

class EpisodicMemoryNode<T extends string | number> {
    public readonly value: T;
    public next: EpisodicMemoryNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * AI Episodic Memory Chain: Engineered for O(N) Traversal and O(1) Surgical Eviction.
 */
class AIEpisodicMemory<T extends string | number> {
    private head: EpisodicMemoryNode<T> | null = null;
    private tail: EpisodicMemoryNode<T> | null = null;
    private _length: number = 0;

    // Telemetry registers
    public totalSearchTimeNs: bigint = 0n;
    public totalWiringTimeNs: bigint = 0n;

    public append(data: T): void {
        const newNode = new EpisodicMemoryNode(data);
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
     * TOXIC MEMORY EVICTION: The Trailing Pointer Technique
     * Returns true if memory was excised, false if not found.
     */
    public pruneMemory(toxicData: T): boolean {
        // Edge Case 1: The Void (Empty List)
        if (!this.head) return false;

        const startNs = process.hrtime.bigint();

        // Edge Case 2: The Target is at the Head
        if (this.head.value === toxicData) {
            this.head = this.head.next;
            // If the list had only one item, we must also clear the tail
            if (!this.head) this.tail = null; 
            
            this._length--;
            this.totalWiringTimeNs += (process.hrtime.bigint() - startNs);
            return true;
        }

        // ----------------------------------------------------
        // THE TWO-POINTER HUNT (Trailing Pointer Architecture)
        // ----------------------------------------------------
        let previous: EpisodicMemoryNode<T> = this.head;
        let current: EpisodicMemoryNode<T> | null = this.head.next;

        // O(N) Pointer Chasing
        while (current !== null) {
            if (current.value === toxicData) {
                const searchEndNs = process.hrtime.bigint();
                
                // --- O(1) SURGICAL EXCISION ---
                // The current node is bypassed. 
                // The previous node now points to whatever was AFTER the current node.
                previous.next = current.next;

                // Edge Case 3: The Target was at the Tail
                if (current === this.tail) {
                    this.tail = previous;
                }

                this._length--;
                
                this.totalSearchTimeNs += (searchEndNs - startNs);
                this.totalWiringTimeNs += (process.hrtime.bigint() - searchEndNs);
                return true;
            }

            // Move both pointers forward synchronously
            previous = current;
            current = current.next;
        }

        this.totalSearchTimeNs += (process.hrtime.bigint() - startNs);
        return false; // Toxic data not found
    }

    public get length(): number { return this._length; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Toxic Memory Eviction Physics...\n");
    
    const MEMORY_LENGTH = 1_000_000;
    const TOXIC_VALUE = "RESTRICTED_PII_DATA";
    const INJECTION_POINT = 750_000; // Injecting deep into the heap

    console.log(`Allocating AI Episodic Memory of ${MEMORY_LENGTH.toLocaleString()} thoughts...`);
    const initialMemory = memoryUsage().heapUsed;
    
    const memoryChain = new AIEpisodicMemory<string>();
    
    for (let i = 0; i < MEMORY_LENGTH; i++) {
        if (i === INJECTION_POINT) {
            memoryChain.append(TOXIC_VALUE);
        } else {
            memoryChain.append("safe_thought");
        }
    }
    
    const populatedMemory = memoryUsage().heapUsed;

    console.log(`\nHunting for '${TOXIC_VALUE}' in the fragmented heap...`);
    const wasPruned = memoryChain.pruneMemory(TOXIC_VALUE);

    // Give V8 a micro-tick to register the orphaned object (Though true GC runs asynchronously)
    const finalMemory = memoryUsage().heapUsed;

    // --- METRICS ---
    const searchMs = Number(memoryChain.totalSearchTimeNs) / 1e6;
    const wiringMs = Number(memoryChain.totalWiringTimeNs) / 1e6;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Target Successfully Excised : ${wasPruned}`);
    console.log(`New Memory Chain Length     : ${memoryChain.length.toLocaleString()}`);
    console.log(`\n⏱️ EXECUTION PHYSICS`);
    console.log(`O(N) Pointer Chasing Time   : ${searchMs.toFixed(3)} ms (Cache misses across RAM)`);
    console.log(`O(1) Surgical Wiring Time   : ${wiringMs.toFixed(5)} ms (Instant bypass)`);
    console.log(`\n🗑️ V8 GARBAGE COLLECTION TARGETS`);
    console.log(`Memory Footprint Delta      : ~${((populatedMemory - initialMemory) / 1024 / 1024).toFixed(2)} MB`);
    console.log("==================================================\n");
    console.log("Notice: The 'Toxic' object still physically exists in your computer's RAM right now. But because no pointer points to it, it is mathematically dead. V8 will sweep it away in the next GC cycle.");
}

runTelemetry();