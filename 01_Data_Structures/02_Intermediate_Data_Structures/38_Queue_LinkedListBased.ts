/**
 * ListNode: Linked list ka single block
 */
class ListNode<T> {
    // Explicitly properties define ki hain taake Node.js ka loader crash na ho
    public value: T;
    public next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

/**
 * Queue: Linked List based, O(1) time complexity.
 */
class LinkedListQueue<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private size: number = 0;

    public enqueue(value: T): void {
        const newNode = new ListNode(value);
        if (!this.tail) {
            // Agar queue khali hai, toh head aur tail dono naye node par point karenge
            this.head = this.tail = newNode;
        } else {
            // Purane tail ka 'next' naye node par point karega
            this.tail.next = newNode;
            // Ab tail naye node par move ho jayega
            this.tail = newNode;
        }
        this.size++;
    }

    public dequeue(): T | null {
        if (!this.head) return null; // Queue khali hai
        
        const value = this.head.value;
        this.head = this.head.next;
        
        // Agar head null ho gaya, toh tail ko bhi null karna zaroori hai
        if (!this.head) {
            this.tail = null;
        }
        
        this.size--;
        return value;
    }

    public getSize(): number {
        return this.size;
    }
}

// --- Execution Block ---
const q = new LinkedListQueue<number>();

console.log("Adding: 100, 200");
q.enqueue(100);
q.enqueue(200);

console.log("Dequeued:", q.dequeue()); // Output: 100
console.log("Dequeued:", q.dequeue()); // Output: 200
console.log("Queue size after ops:", q.getSize()); // Output: 0