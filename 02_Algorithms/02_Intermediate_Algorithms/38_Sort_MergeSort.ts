/**
 * MergeSorter: Implements O(n log n) Divide and Conquer algorithm.
 */
class MergeSorter {
    
    public sort(arr: number[]): number[] {
        if (arr.length <= 1) return arr;

        // 1. Divide: Array ko beech se kaato
        const mid = Math.floor(arr.length / 2);
        const left = this.sort(arr.slice(0, mid));
        const right = this.sort(arr.slice(mid));

        // 2. Conquer: Sorted subarrays ko merge karo
        return this.merge(left, right);
    }

    private merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let i = 0, j = 0;

        // Dono arrays mein compare karo aur chota element result mein daalo
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }

        // Bacha hua data append karo
        return [...result, ...left.slice(i), ...right.slice(j)];
    }
}

// --- Execution Block ---
const sorter = new MergeSorter();
const data = [38, 27, 43, 3, 9, 82, 10];
console.log("Sorted:", sorter.sort(data)); // [3, 9, 10, 27, 38, 43, 82]