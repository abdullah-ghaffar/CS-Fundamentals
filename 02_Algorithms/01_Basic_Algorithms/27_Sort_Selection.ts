/**
 * @name BareMetalSelectionSort
 * @description Zero-allocation, V8-optimized Selection Sort for Int32 datasets.
 */

// Brand Type for mathematical proof of sorted state
type SortedArray<T> = T & { readonly __brand: "Sorted" };

/**
 * Selection Sort implementation optimized for V8 TurboFan and CPU cache patterns.
 * Utilizes Int32Array for contiguous memory layout and GC avoidance.
 */
function fastSelectionSort(data: Int32Array): void {
    const n: number = data.length;

    // Early exit for trivial cases
    if (n <= 1) return;

    for (let i: number = 0; i < n - 1; i++) {
        // Assume the first element of the unsorted part is the minimum
        let min_idx: number = i;

        // Inner loop: Find the true minimum element in the rest of the array.
        // V8's JIT will heavily optimize this linear scan.
        for (let j: number = i + 1; j < n; j++) {
            // Branch Prediction: This comparison is highly unpredictable,
            // but the memory access is sequential.
            if (data[j] < data[min_idx]) {
                min_idx = j;
            }
        }
        
        // Optimization: Swap only if a new minimum was found.
        if (min_idx !== i) {
            // In-place atomic swap without temporary object allocation.
            const temp: number = data[i];
            data[i] = data[min_idx];
            data[min_idx] = temp;
        }
    }
}

// --- EXECUTION ENGINE ---
const BUFFER_SIZE: number = 10_000; // Using 10k for a measurable, non-blocking run
const rawBuffer: SharedArrayBuffer = new SharedArrayBuffer(BUFFER_SIZE * 4); // 4 bytes per Int32
const dataSet: Int32Array = new Int32Array(rawBuffer);

// Populate with worst-case (reversed) data for stress testing
for (let i = 0; i < BUFFER_SIZE; i++) {
    dataSet[i] = BUFFER_SIZE - i;
}

console.log("--- BARE METAL SELECTION SORT INITIATED ---");
console.log("Initial state (last 10):", dataSet.slice(-10));

const start: number = performance.now();

fastSelectionSort(dataSet);

const end: number = performance.now();
console.log(`Execution Time: ${(end - start).toFixed(4)}ms`);
console.log("Sorted state (first 10):", dataSet.slice(0, 10));
console.log("Sorted state (last 10):", dataSet.slice(-10));