class DLLNode {
    data: string;
    next: DLLNode | null = null;
    prev: DLLNode | null = null;
    constructor(val: string) { this.data = val; }
}

class AIMemory {
    private head: DLLNode | null = null;
    private tail: DLLNode | null = null;
    public length: number = 0;

    // Method to add data (for testing)
    add(val: string) {
        const newNode = new DLLNode(val);
        if (!this.tail) { this.head = this.tail = newNode; }
        else { this.tail.next = newNode; newNode.prev = this.tail; this.tail = newNode; }
        this.length++;
    }

    // REMOVE HEAD: Oldest memory delete karna
    popFirst(): DLLNode | null {
        if (this.length === 0) return null;

        let removedNode = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null; // Purana rasta tor diya
            removedNode!.next = null; // Dangling pointer khatam
        }

        this.length--;
        return removedNode;
    }

    // REMOVE TAIL: Newest memory delete karna
    popLast(): DLLNode | null {
        if (this.length === 0) return null;

        let removedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail!.prev;
            this.tail!.next = null; // Purana rasta tor diya
            removedNode!.prev = null; // Dangling pointer khatam
        }

        this.length--;
        return removedNode;
    }

    display() {
        let curr = this.head;
        let res = "";
        while(curr) { res += `[${curr.data}] <-> `; curr = curr.next; }
        console.log(res + "NULL");
    }
}

// --- EXECUTION ---
const memory = new AIMemory();
memory.add("Task 1");
memory.add("Task 2");
memory.add("Task 3");

console.log("Original Memory:");
memory.display();

memory.popFirst(); // Task 1 nikal gaya
console.log("After Removing Head (Oldest):");
memory.display();

memory.popLast(); // Task 3 nikal gaya
console.log("After Removing Tail (Newest):");
memory.display();