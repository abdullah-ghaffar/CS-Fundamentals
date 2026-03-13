/**
 * QuickSorter: In-place O(n log n) sorting algorithm.
 */
class QuickSorter {
    
    public sort(arr: number[], left: number = 0, right: number = arr.length - 1): number[] {
        if (left < right) {
            // Partitioning index
            const pivotIndex = this.partition(arr, left, right);
            
            // Recursively sort elements before and after partition
            this.sort(arr, left, pivotIndex - 1);
            this.sort(arr, pivotIndex + 1, right);
        }
        return arr;
    }

    private partition(arr: number[], left: number, right: number): number {
        const pivot = arr[right]; // Pivot as last element
        let i = left; // Pointer for smaller elements

        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        // Pivot ko sahi jagah swap karo
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }
}

// --- Execution Block ---
const sorter = new QuickSorter();
const data = [10, 7, 8, 9, 1, 5];
console.log("Sorted:", sorter.sort(data)); // [1, 5, 7, 8, 9, 10]