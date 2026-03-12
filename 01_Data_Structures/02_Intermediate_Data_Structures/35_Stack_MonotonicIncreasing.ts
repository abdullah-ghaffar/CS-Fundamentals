/**
 * MonotonicIncreasingStack: Ensures that elements remain in 
 * non-decreasing order from bottom to top.
 */
class MonotonicIncreasingStack {
    private stack: number[];

    constructor() {
        this.stack = [];
    }

    // Naye element ko insert karna aur monotonic property maintain karna
    public push(val: number): void {
        // Agar naya element chota hai, toh top elements ko hata do (Maintain increasing order)
        while (this.stack.length > 0 && this.stack[this.stack.length - 1] > val) {
            this.stack.pop();
        }
        this.stack.push(val);
    }

    public pop(): number | undefined {
        return this.stack.pop();
    }

    public peek(): number | undefined {
        return this.stack[this.stack.length - 1];
    }

    public getStack(): number[] {
        return [...this.stack]; // Defensive copy taake bahar se array na badle
    }
}

// --- Execution Block ---
const monoStack = new MonotonicIncreasingStack();
console.log("Pushing: 3, 1, 4, 2");
monoStack.push(3);
monoStack.push(1); // 1, 3 se chota hai, toh 3 pop ho jayega
monoStack.push(4);
monoStack.push(2); // 2, 4 se chota hai, toh 4 pop ho jayega

console.log("Final Stack:", monoStack.getStack()); // Output: [1, 2]