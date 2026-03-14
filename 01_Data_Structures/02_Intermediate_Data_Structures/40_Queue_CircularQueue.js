/**
 * FILE: 40_Queue_CircularQueue.js
 * Pattern: Ring Buffer / Circular Queue
 * Efficiency: Enqueue O(1), Dequeue O(1)
 */

class CircularQueue {
    constructor(maxSize) {
        this.queue = new Array(maxSize); // Fix size ki array
        this.maxSize = maxSize;
        this.currentSize = 0;
        
        this.front = 0;  // Shuruat ka pointer
        this.rear = -1;  // Aakhir ka pointer (shuru mein line se bahar hai)
    }

    // Line mein naya task daalna
    enqueue(item) {
        // Agar line bhari hui hai
        if (this.currentSize === this.maxSize) {
            console.log("❌ Server Busy: Queue is Full!");
            return false;
        }

        // REAR pointer ko ghoomana (Clock Math)
        this.rear = (this.rear + 1) % this.maxSize;
        this.queue[this.rear] = item; // Naye dabbe mein data rakha
        this.currentSize++;
        
        console.log(`[Enqueued] ${item} at index ${this.rear}`);
        return true;
    }

    // Line se task nikal kar process karna
    dequeue() {
        // Agar line khali hai
        if (this.currentSize === 0) {
            console.log("⚠️ Queue is Empty!");
            return null;
        }

        // FRONT wale dabbe ka data uthaya
        const item = this.queue[this.front];
        
        // FRONT pointer ko ghoomana (Clock Math)
        this.front = (this.front + 1) % this.maxSize;
        this.currentSize--;
        
        console.log(`[Dequeued] Processed ${item}`);
        return item;
    }
}

// --- EXECUTION (Checking the Magic) ---
const taskBuffer = new CircularQueue(3); // Sirf 3 tasks ki jagah hai

taskBuffer.enqueue("Task 1"); // rear: 0
taskBuffer.enqueue("Task 2"); // rear: 1
taskBuffer.enqueue("Task 3"); // rear: 2
taskBuffer.enqueue("Task 4"); // ❌ Queue Full!

// Pehla task mukammal hua, jagah khali hui (front aage barh gaya)
taskBuffer.dequeue(); // Processed Task 1

// JADU YAHAN HAI: Task 4 ab aakhir mein nahi, ghoom kar shuru mein (index 0) par aayega!
taskBuffer.enqueue("Task 4"); // rear: 0 (Gool Chakkar mukammal)