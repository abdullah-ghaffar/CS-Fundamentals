export {}; 

/**
 * FILE: 32_Stack_LinkedListBased.ts (Fixed for Node.js 22)
 */

class StackNode<T> {
    // 1. Properties ko bahar declare karein
    public data: T;
    public next: StackNode<T> | null;

    // 2. Constructor mein sirf assignment karein
    constructor(data: T, next: StackNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

class AIHistoryStack<T> {
    private top: StackNode<T> | null = null;
    private _size: number = 0;

    public push(val: T): void {
        const newNode = new StackNode(val, this.top);
        this.top = newNode;
        this._size++;
        console.log(`[Push] Added: ${val}`);
    }

    public pop(): T | null {
        if (!this.top) return null;

        const removedData = this.top.data;
        this.top = this.top.next;
        this._size--;

        return removedData;
    }

    public peek(): T | null {
        return this.top ? this.top.data : null;
    }

    public get size(): number {
        return this._size;
    }
}

// --- EXECUTION ---
const chatHistory = new AIHistoryStack<string>();

chatHistory.push("User: Salam!");
chatHistory.push("AI: Walikum Assalam!");
chatHistory.push("User: Error fix ho gaya?");

console.log("\n--- Stack Status ---");
console.log("Top Message:", chatHistory.peek());
console.log("Size:", chatHistory.size);

console.log("\nRemoving top message:", chatHistory.pop());
console.log("New Top:", chatHistory.peek());