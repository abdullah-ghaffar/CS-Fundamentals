import { memoryUsage } from 'process';

// Global `gc` function ko TypeScript mein type-safe banane ke liye
declare const gc: () => void;

class MemoryNode<T> {
    public value: T;
    public next: MemoryNode<T> | null = null;
    constructor(value: T) { this.value = value; }
}

/**
 * AI Session Memory: Garbage Collection ke physics ko simulate karne ke liye banaya gaya hai.
 */
class AISessionMemory<T> {
    private head: MemoryNode<T> | null = null;
    private tail: MemoryNode<T> | null = null;
    private _length: number = 0;

    /**
     * O(1) Public Getter: Private data ko bahar se read-only banata hai.
     */
    public get length(): number {
        return this._length;
    }

    public append(value: T): void {
        const newNode = new MemoryNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this._length++;
    }

    /**
     * O(1) GARBAGE COLLECTION TRIGGER
     * Hum data delete nahi karte, hum sirf root pointer ko tabah karte hain.
     */
    public clear(): void {
        console.log("\n🔥 Severing Head Pointer. All nodes are now orphaned...");
        this.head = null;
        this.tail = null;
        this._length = 0;
    }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Garbage Collection Simulation...\n");
    
    const NODE_COUNT = 2_000_000; // 2 Million memory objects
    const session = new AISessionMemory<number>();

    console.log(`Allocating ${NODE_COUNT.toLocaleString()} nodes in V8 Heap...`);
    for (let i = 0; i < NODE_COUNT; i++) {
        session.append(i);
    }

    const memoryBeforeClear = memoryUsage().heapUsed;
    console.log(`✅ Memory Allocated. Current Length: ${session.length.toLocaleString()}`);
    console.log(`   V8 Heap Usage: ${(memoryBeforeClear / 1024 / 1024).toFixed(2)} MB`);

    // Session khatm. Memory clear karein.
    session.clear();
    
    const memoryAfterClear = memoryUsage().heapUsed;
    console.log(`   V8 Heap Usage (Right after clear): ${(memoryAfterClear / 1024 / 1024).toFixed(2)} MB`);
    console.log("   (Notice: Memory kam nahi hui! Nodes abhi bhi RAM mein hain, lekin laawaris hain)");

    // V8 ke Garbage Collector ko zabardasti chalayein
    try {
        if (global.gc) {
            console.log("\n🧹 Forcing V8 Major Garbage Collection Cycle (Mark-and-Sweep)...");
            gc(); // Yeh command sirf --expose-gc flag ke saath chalti hai
        } else {
            console.log("\nRun with `ts-node --expose-gc <filename>` to see memory reclamation.");
        }
    } catch (e) {
        console.error("Could not force GC:", e);
    }
    
    const memoryAfterGC = memoryUsage().heapUsed;
    
    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Memory Before Clear : ${(memoryBeforeClear / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Memory After GC     : ${(memoryAfterGC / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Memory Reclaimed    : ${((memoryBeforeClear - memoryAfterGC) / 1024 / 1024).toFixed(2)} MB`);
    console.log("==================================================");
}

runTelemetry();