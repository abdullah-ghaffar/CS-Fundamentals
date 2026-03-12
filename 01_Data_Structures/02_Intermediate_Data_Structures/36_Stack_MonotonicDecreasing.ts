/**
 * MonotonicDecreasingStack: Essential for solving 'Next Greater Element' 
 * problems in linear O(n) time.
 */
class MonotonicDecreasingStack {
    // Array of objects to store the value and its original index
    private stack: { val: number; index: number }[] = [];

    /**
     * Pushes a value and returns the index of the element 
     * that was 'popped' (the Next Greater Element).
     */
    public push(val: number, currentIndex: number): { index: number, nextGreater: number } | null {
        let result: { index: number, nextGreater: number } | null = null;

        // Agar naya element bada hai, toh iska matlab purane elements ka 
        // "Next Greater" mil gaya hai!
        while (this.stack.length > 0 && this.stack[this.stack.length - 1].val < val) {
            const popped = this.stack.pop()!;
            // Hum record kar rahe hain ke 'popped' index ka next greater 'val' hai
            console.log(`Found: ${popped.val} ka next greater element ${val} hai.`);
        }

        this.stack.push({ val, index: currentIndex });
        return result;
    }
}

// --- Execution Block ---
const nums = [2, 1, 5, 3];
const monoStack = new MonotonicDecreasingStack();

console.log("Processing array:", nums);
nums.forEach((num, idx) => {
    monoStack.push(num, idx);
});