/**
 * QueueUsingTwoStacks: Implements FIFO queue using two LIFO stacks.
 */
class QueueUsingTwoStacks<T> {
    private inputStack: T[] = [];
    private outputStack: T[] = [];

    // O(1)
    public enqueue(value: T): void {
        this.inputStack.push(value);
    }

    // Amortized O(1)
    public dequeue(): T | undefined {
        // Agar output stack khali hai, toh input stack se data transfer karo
        if (this.outputStack.length === 0) {
            while (this.inputStack.length > 0) {
                this.outputStack.push(this.inputStack.pop()!);
            }
        }
        return this.outputStack.pop();
    }
}

// --- Execution Block ---
const q = new QueueUsingTwoStacks<number>();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log("Dequeued:", q.dequeue()); // 1
console.log("Dequeued:", q.dequeue()); // 2
q.enqueue(4);
console.log("Dequeued:", q.dequeue()); // 3
console.log("Dequeued:", q.dequeue()); // 4