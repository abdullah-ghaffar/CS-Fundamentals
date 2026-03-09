/**
 * @name BareMetalBubbleSort
 * @description Zero-allocation, V8-optimized Bubble Sort for Int32 datasets.
 */

// Brand Type for Mathematical Safety
type SortedArray<T> = T & { readonly __brand: "Sorted" };

/**
 * Bubble Sort implementation optimized for V8 TurboFan.
 * Bypasses GC by using Int32Array (Contiguous Memory).
 */
function fastBubbleSort(data: Int32Array): void {
    const n: number = data.length;

    // Early exit strategy for hyper-scale datasets
    if (n <= 1) return;

    for (let i: number = 0; i < n - 1; i++) {
        let swapped: boolean = false;

        // Inner loop: JIT optimizes this via Loop Unrolling
        // Limit (n - i - 1) reduces redundant comparisons
        for (let j: number = 0; j < n - i - 1; j++) {
            
            const left: number = data[j];
            const right: number = data[j + 1];

            // Branching Logic: High-performance comparison
            if (left > right) {
                // In-place swap: No temporary objects created
                data[j] = right;
                data[j + 1] = left;
                swapped = true;
            }
        }

        // Optimization: Agar koi swap nahi hua, array sorted hai.
        if (!swapped) break;
    }
}

// EXECUTION ENGINE
const BUFFER_SIZE: number = 10_000; // Testing with 10k for safety
const rawBuffer: SharedArrayBuffer = new SharedArrayBuffer(BUFFER_SIZE * 4);
const dataSet: Int32Array = new Int32Array(rawBuffer);

// Populate with random data (Hyperscale Simulation)
for (let i = 0; i < dataSet.length; i++) {
    dataSet[i] = Math.floor(Math.random() * 1_000_000);
}

console.log("--- BARE METAL BUBBLE SORT INITIATED ---");
const start: number = performance.now();

fastBubbleSort(dataSet);

const end: number = performance.now();
console.log(`Execution Time: ${(end - start).toFixed(4)}ms`);
console.log("First 10 Elements:", dataSet.slice(0, 10));
console.log("Last 10 Elements:", dataSet.slice(-10));