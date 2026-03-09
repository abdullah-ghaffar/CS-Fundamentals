import { memoryUsage } from 'process';

/**
 * AI Tensor Matrix: Flattening 2D geometry into high-speed 1D silicon memory.
 */
class AITensorMatrix<T extends NonNullable<unknown>> {
    // A single, contiguous block of memory. No nested arrays.
    private readonly buffer: Array<T>;
    
    // Readonly properties: Dimension immutability is mathematically required
    public readonly rows: number;
    public readonly cols: number;

    // Telemetry registers
    public totalReadTimeNs: bigint = 0n;

    constructor(rows: number, cols: number, initialValue: T) {
        if (rows <= 0 || cols <= 0) {
            throw new Error("Matrix dimensions must be positive integers.");
        }
        this.rows = rows;
        this.cols = cols;
        
        // Allocate exact contiguous memory upfront. No dynamic resizing allowed here.
        const totalSize = rows * cols;
        this.buffer = new Array<T>(totalSize).fill(initialValue);
    }

    /**
     * The God-Equation of Memory Mapping: O(1) 
     * Translates 2D coordinates to a 1D RAM address.
     */
    private getIndex(row: number, col: number): number {
        // Strict Bounds Checking: Prevents memory corruption
        if (row < 0 || row >= this.rows) throw new RangeError(`Row ${row} out of bounds.`);
        if (col < 0 || col >= this.cols) throw new RangeError(`Col ${col} out of bounds.`);
        
        // ROW-MAJOR ORDER MAPPING
        return (row * this.cols) + col;
    }

    /**
     * O(1) Matrix Write
     */
    public set(row: number, col: number, value: T): void {
        this.buffer[this.getIndex(row, col)] = value;
    }

    /**
     * O(1) Matrix Read
     */
    public get(row: number, col: number): T {
        return this.buffer[this.getIndex(row, col)];
    }

    /**
     * Telemetry Method: Traverses the entire matrix mathematically.
     */
    public traverseRowMajor(): void {
        const startNs = process.hrtime.bigint();
        
        // Iterating Row by Row (Matches our mathematical layout perfectly)
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                // Read the value to force CPU fetch
                const _val = this.buffer[(r * this.cols) + c]; 
            }
        }
        
        this.totalReadTimeNs += (process.hrtime.bigint() - startNs);
    }
    
    public get totalElements(): number { return this.rows * this.cols; }
}

// ==========================================
// TELEMETRY RUNNER (Execution Physics)
// ==========================================
function runTelemetry() {
    console.log("🚀 [AI ARCHITECT MODE] Booting 1D Tensor Mapping Telemetry...\n");
    
    const MATRIX_SIZE = 5_000; // 5000 x 5000 = 25 Million Elements
    
    const initialMemory = memoryUsage().heapUsed;
    const allocStart = process.hrtime.bigint();
    
    // Instantiating the flat matrix
    console.log(`Allocating a ${MATRIX_SIZE}x${MATRIX_SIZE} Matrix (25M elements)...`);
    const tensor = new AITensorMatrix<number>(MATRIX_SIZE, MATRIX_SIZE, 0);
    
    const allocEnd = process.hrtime.bigint();
    const finalMemory = memoryUsage().heapUsed;

    console.log("Executing high-speed Row-Major traversal...");
    tensor.traverseRowMajor();

    // Calculations
    const allocTimeMs = Number(allocEnd - allocStart) / 1e6;
    const traverseTimeMs = Number(tensor.totalReadTimeNs) / 1e6;
    const memoryUsedMb = (finalMemory - initialMemory) / 1024 / 1024;

    console.log("==================================================");
    console.log(`📊 TELEMETRY REPORT:`);
    console.log(`Matrix Dimensions   : ${tensor.rows} x ${tensor.cols}`);
    console.log(`Total Elements      : ${tensor.totalElements.toLocaleString()}`);
    console.log(`Memory Footprint    : ~${memoryUsedMb.toFixed(2)} MB`);
    console.log(`Allocation Time     : ${allocTimeMs.toFixed(2)} ms`);
    console.log(`Row-Major Read Time : ${traverseTimeMs.toFixed(2)} ms`);
    console.log("==================================================\n");
    console.log("Notice the memory footprint. A nested array [][] of this size would consume 3x more RAM just for pointers.");
}

runTelemetry();