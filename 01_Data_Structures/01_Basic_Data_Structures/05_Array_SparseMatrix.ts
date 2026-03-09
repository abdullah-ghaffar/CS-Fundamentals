import { memoryUsage } from 'process';

/**
 * AI Sparse Tensor: A memory-infallible matrix for massive 99% empty datasets.
 */
class AISparseTensor<T extends NonNullable<unknown>> {
    public readonly rows: number;
    public readonly cols: number;
    
    // The Void: What we return when coordinates hit empty space
    private readonly defaultValue: T;

    // The Dictionary of Keys (DOK): Stores ONLY non-default values
    // Why Map<bigint, T>? We use 64-bit integers as keys to prevent V8 String GC pauses.
    private readonly data: Map<bigint, T>;

    // Telemetry registers
    public totalWriteTimeNs: bigint = 0n;
    public totalReadTimeNs: bigint = 0n;

    constructor(rows: number, cols: number, defaultValue: T) {
        if (rows <= 0 || cols <= 0) throw new RangeError("Dimensions must be positive.");
        // Max 32-bit integer check to ensure our bitwise shift doesn't overflow
        if (rows > 0xFFFFFFFF || cols > 0xFFFFFFFF) throw new RangeError("Dimensions exceed 32-bit bounds.");
        
        this.rows = rows;
        this.cols = cols;
        this.defaultValue = defaultValue;
        this.data = new Map<bigint, T>();
    }

    /**
     * O(1) Bitwise Hardware Mapping
     * Fuses a 32-bit row and 32-bit col into a single 64-bit integer.
     */
    private getMemoryKey(row: number, col: number): bigint {
        if (row < 0 || row >= this.rows) throw new RangeError(`Row ${row} out of bounds.`);
        if (col < 0 || col >= this.cols) throw new RangeError(`Col ${col} out of bounds.`);
        
        // Elite V8 Physics: Bitwise Left Shift. 
        // Example: Row 5, Col 10 becomes a unique binary signature.
        return (BigInt(row) << 32n) | BigInt(col);
    }

    public set(row: number, col: number, value: T): void {
        const startNs = process.hrtime.bigint();
        const key = this.getMemoryKey(row, col);

        // If the value is the default (e.g., 0), we DELETE the key to reclaim RAM
        if (value === this.defaultValue) {
            this.data.delete(key);
        } else {
            this.data.set(key, value);
        }
        this.totalWriteTimeNs += (process.hrtime.bigint() - startNs);
    }

    public get(row: number, col: number): T {
        const startNs = process.hrtime.bigint();
        const key = this.getMemoryKey(row, col);
        
        // Fetch from Hash Map. If undefined, return the mathematical Void (defaultValue)
        const value = this.data.get(key) ?? this.defaultValue;
        
        this.totalReadTimeNs += (process.hrtime.bigint() - startNs);
        return value;
    }

    public get nonZeroCount(): number {
        return this.data.size;
    }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting Sparse Tensor Physics...\n");
    
    // A massive 100,000 x 100,000 matrix (10 Billion Elements)
    // A dense array of this size would take ~80 Gigabytes of RAM and crash Node instantly.
    const MATRIX_SIZE = 100_000; 
    const NON_ZERO_INSERTS = 500_000; // Only 500k actual connections (0.005% density)
    
    console.log(`Initializing a ${MATRIX_SIZE}x${MATRIX_SIZE} Sparse Matrix (10 Billion Virtual Elements)...`);
    
    const initialMemory = memoryUsage().heapUsed;
    const tensor = new AISparseTensor<number>(MATRIX_SIZE, MATRIX_SIZE, 0);

    console.log(`Injecting ${NON_ZERO_INSERTS.toLocaleString()} non-zero data points...`);
    
    // Simulating random Graph Node connections
    for (let i = 0; i < NON_ZERO_INSERTS; i++) {
        // Randomly scatter data across the 10-billion grid
        const r = Math.floor(Math.random() * MATRIX_SIZE);
        const c = Math.floor(Math.random() * MATRIX_SIZE);
        tensor.set(r, c, Math.random() * 100);
    }

    const finalMemory = memoryUsage().heapUsed;

    const writeTimeMs = Number(tensor.totalWriteTimeNs) / 1e6;
    const memoryUsedMb = (finalMemory - initialMemory) / 1024 / 1024;
    const theoreticalDenseMb = (MATRIX_SIZE * MATRIX_SIZE * 8) / 1024 / 1024;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Matrix Dimensions       : ${MATRIX_SIZE.toLocaleString()} x ${MATRIX_SIZE.toLocaleString()}`);
    console.log(`Total Virtual Elements  : ${(MATRIX_SIZE * MATRIX_SIZE).toLocaleString()}`);
    console.log(`Actual Non-Zero Elements: ${tensor.nonZeroCount.toLocaleString()}`);
    console.log(`Total Write Time        : ${writeTimeMs.toFixed(2)} ms`);
    console.log(`--------------------------------------------------`);
    console.log(`Theoretical Dense RAM   : ~${theoreticalDenseMb.toLocaleString()} MB (80 GB - CRASH)`);
    console.log(`Actual Sparse RAM Used  : ~${memoryUsedMb.toFixed(2)} MB`);
    console.log("==================================================\n");
    console.log("Notice: You just stored a 10-Billion element grid in a few Megabytes of RAM. You have conquered the Void.");
}

runTelemetry();