class MaxStack {
    private stack: number[];     // Asli data ke liye
    private maxStack: number[];  // Maximums ko track karne ke liye

    constructor() {
        this.stack = [];
        this.maxStack = [];
    }

    // Naya data add karna
    public push(val: number): void {
        this.stack.push(val);
        
        // Agar maxStack khali hai, ya naya value current max se bada hai
        if (this.maxStack.length === 0 || val >= this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.push(val);
        } else {
            // Warna purana max hi dubara push kar do taake alignment bani rahe
            this.maxStack.push(this.maxStack[this.maxStack.length - 1]);
        }
    }

    // Data nikalna
    public pop(): number | undefined {
        this.maxStack.pop(); // MaxStack se bhi hatao
        return this.stack.pop(); // Asli stack se hatao
    }

    // Constant time mein max return karna
    public getMax(): number {
        if (this.maxStack.length === 0) throw new Error("Stack is empty");
        return this.maxStack[this.maxStack.length - 1];
    }
}

// --- Execution Block (Test karne ke liye) ---

const stack = new MaxStack();

console.log("Pushing: 5, 2, 10, 8");
stack.push(5);
stack.push(2);
stack.push(10);
stack.push(8);

console.log("Current Max (expecting 10):", stack.getMax()); 

console.log("Popping one element (8)...");
stack.pop();
console.log("Current Max after pop (expecting 10):", stack.getMax());

console.log("Popping another element (10)...");
stack.pop();
console.log("Current Max after pop (expecting 5):", stack.getMax());