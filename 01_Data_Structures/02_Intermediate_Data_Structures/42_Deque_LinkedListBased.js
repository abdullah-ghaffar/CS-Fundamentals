/**
 * FILE: 42_Deque_LinkedListBased.js
 * Pattern: Double-Ended Queue using Doubly Linked List
 * Efficiency: strictly O(1) Time for ALL operations
 */

// 1. Dabba (Node)
class DLLNode {
    constructor(val) {
        this.data = val;
        this.next = null;
        this.prev = null;
    }
}

// 2. Machine (Deque)
class Deque {
    constructor() {
        this.head = null; // Front
        this.tail = null; // Rear
        this.size = 0;
    }

    // AAGE SE DAALNA (Add Front)
    addFront(val) {
        const newNode = new DLLNode(val);
        if (this.size === 0) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        console.log(`[Add Front] ${val}`);
    }

    // PEECHAY SE DAALNA (Add Rear)
    addRear(val) {
        const newNode = new DLLNode(val);
        if (this.size === 0) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
        console.log(`[Add Rear] ${val}`);
    }

    // AAGE SE NIKALNA (Remove Front)
    removeFront() {
        if (this.size === 0) return null;
        const removedData = this.head.data;

        if (this.size === 1) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null; // Purana rasta tor diya
        }
        this.size--;
        console.log(`[Remove Front] ${removedData}`);
        return removedData;
    }

    // PEECHAY SE NIKALNA (Remove Rear)
    removeRear() {
        if (this.size === 0) return null;
        const removedData = this.tail.data;

        if (this.size === 1) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null; // Purana rasta tor diya
        }
        this.size--;
        console.log(`[Remove Rear] ${removedData}`);
        return removedData;
    }
}

// --- EXECUTION (Check karte hain) ---
const taskQueue = new Deque();

// Normal tasks aakhir mein lag rahe hain
taskQueue.addRear("Task 1 (Normal)");
taskQueue.addRear("Task 2 (Normal)");

// VIP task aaya, usay shuru mein lagaya gaya
taskQueue.addFront("Task 0 (VIP)");

// Output dikhega: [VIP] <-> [Normal 1] <-> [Normal 2]

// System ne aage se task uthaya aur process kiya
taskQueue.removeFront(); // Task 0 (VIP) nikal jayega