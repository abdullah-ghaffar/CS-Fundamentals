import { memoryUsage } from 'process';

/**
 * AI Prompt Builder: A high-speed string concatenation container 
 * engineered to bypass the V8 ConsString (Rope) flattening disaster.
 */
class AIPromptBuilder {
    // We pre-allocate an array to avoid dynamic array resizing overhead
    private readonly chunks: Array<string>;
    private cursor: number = 0;
    
    // Tracking exact byte length mathematically to avoid runtime measurement
    private _totalCharLength: number = 0;

    // Telemetry registers
    public totalAppendTimeNs: bigint = 0n;
    public totalBuildTimeNs: bigint = 0n;

    constructor(initialCapacity: number = 1000) {
        if (initialCapacity <= 0) throw new RangeError("Capacity must be positive.");
        this.chunks = new Array<string>(initialCapacity);
    }

    /**
     * O(1) Amortized Append
     * We strictly accept 'string' to prevent implicit V8 boxing of numbers/objects.
     */
    public append(chunk: string): void {
        const startNs = process.hrtime.bigint();

        // If we hit capacity, we double it (The 2x Growth Law from Data Structure 02)
        if (this.cursor === this.chunks.length) {
            this.resize(this.chunks.length * 2);
        }

        // Fast contiguous array insertion
        this.chunks[this.cursor++] = chunk;
        this._totalCharLength += chunk.length;

        this.totalAppendTimeNs += (process.hrtime.bigint() - startNs);
    }

    private resize(newCapacity: number): void {
        const newChunks = new Array<string>(newCapacity);
        for (let i = 0; i < this.cursor; i++) {
            newChunks[i] = this.chunks[i];
        }
        // Memory Architecture: Drop old reference for GC
        (this as any).chunks = newChunks; // Bypass readonly purely for internal resizing
    }

    /**
     * O(N) Single-Pass Memory Allocation
     * Bypasses the ConsString tree completely.
     */
    public build(): string {
        const startNs = process.hrtime.bigint();
        
        // V8 Physics: .join('') triggers a highly optimized C++ loop.
        // V8 calculates the exact length needed, allocates ONE contiguous SeqString,
        // and mem-copies all chunks into it in a single pass.
        // We truncate the array to only join the valid cursor area.
        this.chunks.length = this.cursor;
        const finalString = this.chunks.join('');
        
        this.totalBuildTimeNs += (process.hrtime.bigint() - startNs);
        return finalString;
    }

    public get length(): number { return this._totalCharLength; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting String Architecture Telemetry...\n");
    
    const CHUNK_COUNT = 100_000; // 100k snippets of RAG text
    const SAMPLE_CHUNK = "SYSTEM: You are a helpful AI assistant. Context: [DATA_FRAG]\n";
    
    console.log(`Simulating ${CHUNK_COUNT.toLocaleString()} chunks of RAG Context ingestion...`);

    // --- SCENARIO A: The Junior "+=" Approach ---
    const juniorStartNs = process.hrtime.bigint();
    let juniorString = "";
    for (let i = 0; i < CHUNK_COUNT; i++) {
        juniorString += SAMPLE_CHUNK;
    }
    const juniorAppendEndNs = process.hrtime.bigint();
    
    // FORCE FLATTENING: Measuring the string's byte length or parsing it forces V8 to flatten the ConsString tree.
    Buffer.from(juniorString);
    const juniorFlattenEndNs = process.hrtime.bigint();

    // --- SCENARIO B: The Architect String Builder ---
    const builderStartNs = process.hrtime.bigint();
    const builder = new AIPromptBuilder(CHUNK_COUNT); // Perfect pre-allocation
    for (let i = 0; i < CHUNK_COUNT; i++) {
        builder.append(SAMPLE_CHUNK);
    }
    const architectString = builder.build();
    
    // FORCE FLATTENING: It's already flattened! But we run it to be fair.
    Buffer.from(architectString);
    const builderFlattenEndNs = process.hrtime.bigint();

    // --- TELEMETRY CALCULATIONS ---
    const juniorAppendMs = Number(juniorAppendEndNs - juniorStartNs) / 1e6;
    const juniorFlattenMs = Number(juniorFlattenEndNs - juniorAppendEndNs) / 1e6;
    const juniorTotalMs = juniorAppendMs + juniorFlattenMs;

    const builderAppendMs = Number(builder.totalAppendTimeNs) / 1e6;
    const builderFlattenMs = Number(builderFlattenEndNs - builderStartNs - builder.totalAppendTimeNs - builder.totalBuildTimeNs) / 1e6;
    const builderTotalMs = builderAppendMs + (Number(builder.totalBuildTimeNs) / 1e6) + builderFlattenMs;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Total Characters    : ${builder.length.toLocaleString()}`);
    console.log(`\n❌ JUNIOR APPROACH (+= ConsString)`);
    console.log(`Append Phase        : ${juniorAppendMs.toFixed(2)} ms (Looks fast, but it's a lie)`);
    console.log(`Flatten Phase (I/O) : ${juniorFlattenMs.toFixed(2)} ms <-- [EVENT LOOP BLOCKED]`);
    console.log(`Total Execution     : ${juniorTotalMs.toFixed(2)} ms`);
    
    console.log(`\n✅ ARCHITECT APPROACH (String Builder)`);
    console.log(`Append Phase        : ${builderAppendMs.toFixed(2)} ms`);
    console.log(`Build & Flatten Phase: ${(Number(builder.totalBuildTimeNs) / 1e6 + builderFlattenMs).toFixed(2)} ms`);
    console.log(`Total Execution     : ${builderTotalMs.toFixed(2)} ms`);
    console.log("==================================================\n");
    console.log("Notice: The Junior approach creates a catastrophic latency spike right at the moment of Network I/O.");
}

runTelemetry();