/**
 * ArrayReverser: Uses Two-Pointer Recursion to reverse an array in-place.
 */
class ArrayReverser {
    
    // Public method: User sirf array pass karega
    public reverse(arr: number[]): void {
        this.reverseRecursive(arr, 0, arr.length - 1);
    }

    // Private recursive helper
    private reverseRecursive(arr: number[], left: number, right: number): void {
        // Base Case: Agar pointers cross kar gaye, toh stop ho jao
        if (left >= right) return;

        // Swapping values (In-place operation)
        [arr[left], arr[right]] = [arr[right], arr[left]];

        // Recursive Step: Agli positions par move karo
        this.reverseRecursive(arr, left + 1, right - 1);
    }
}

// --- Execution Block ---
const data = [10, 20, 30, 40, 50];
const reverser = new ArrayReverser();

console.log("Original:", data);
reverser.reverse(data);
console.log("Reversed:", data);