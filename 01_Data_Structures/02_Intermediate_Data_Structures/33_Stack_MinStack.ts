export {};

/**
 * FILE: 33_Stack_MinStack.ts
 * Pattern: Dual-Stack Synchronization
 * Efficiency: getMin() in O(1) Time
 */

class MinStack {
    private stack: number[];
    private minStorage: number[];

    constructor() {
        this.stack = [];
        this.minStorage = [];
    }

    public push(val: number): void {
        this.stack.push(val);

        // Agar minStorage khali hai ya naya val ab tak ka sab se chota hai
        if (this.minStorage.length === 0 || val <= this.getMin()!) {
            this.minStorage.push(val);
        }
        console.log(`[Push] ${val} | Current Min: ${this.getMin()}`);
    }

    public pop(): void {
        if (this.stack.length === 0) return;

        const removed = this.stack.pop();

        // Agar nikalne wala element hi minimum tha, toh minStorage se bhi nikalo
        if (removed === this.getMin()) {
            this.minStorage.pop();
        }
        console.log(`[Pop] ${removed} | New Min: ${this.getMin()}`);
    }

    public top(): number | null {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }

    public getMin(): number | null {
        if (this.minStorage.length === 0) return null;
        return this.minStorage[this.minStorage.length - 1];
    }
}

// --- EXECUTION ---
const monitor = new MinStack();

monitor.push(30);
monitor.push(10);
monitor.push(50);
monitor.push(5);

console.log("\nFinal Minimum:", monitor.getMin()); // Output: 5

monitor.pop(); // 5 nikal gaya
console.log("Minimum after one pop:", monitor.getMin()); // Output: 10