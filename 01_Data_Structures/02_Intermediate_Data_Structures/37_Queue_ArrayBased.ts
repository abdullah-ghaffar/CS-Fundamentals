/**
 * NaiveQueue: Uses Array.shift() - Education purpose only.
 * Warning: High performance penalty for large datasets.
 */
class NaiveQueue<T> {
    private items: T[] = [];

    // O(1) complexity
    public enqueue(item: T): void {
        this.items.push(item);
    }

    // O(n) complexity: This is the 'Shift Issue'
    public dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;
        // Array.shift() poori array ko re-index karta hai
        return this.items.shift();
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// --- Execution Block ---
const queue = new NaiveQueue<number>();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log("Dequeued:", queue.dequeue()); // 10
console.log("Dequeued:", queue.dequeue()); // 20