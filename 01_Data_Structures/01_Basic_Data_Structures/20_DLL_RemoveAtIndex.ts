// 1. Node Class (Building Block)
class DLLNode {
    public data: string;
    public next: DLLNode | null = null;
    public prev: DLLNode | null = null;

    constructor(val: string) {
        this.data = val;
    }
}

// 2. Manager Class
class AILogManager {
    private head: DLLNode | null = null;
    private tail: DLLNode | null = null;
    public length: number = 0;

    // ERROR FIX 1: getNode function lazmi hai taake removeAt usay use kar sakay
    private getNode(index: number): DLLNode | null {
        if (index < 0 || index >= this.length) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            if (current) current = current.next;
        }
        return current;
    }

    // ERROR FIX 2: popFirst function (Remove Head)
    public popFirst(): DLLNode | null {
        if (this.length === 0) return null;
        let removedNode = this.head;
        if (this.length === 1) {
            this.head = this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
            removedNode!.next = null;
        }
        this.length--;
        return removedNode;
    }

    // ERROR FIX 3: popLast function (Remove Tail)
    public popLast(): DLLNode | null {
        if (this.length === 0) return null;
        let removedNode = this.tail;
        if (this.length === 1) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail!.prev;
            this.tail!.next = null;
            removedNode!.prev = null;
        }
        this.length--;
        return removedNode;
    }

    // Aapka removeAt function (Ab koi red line nahi hogi)
    public removeAt(index: number): DLLNode | null {
        // 1. Validation
        if (index < 0 || index >= this.length) return null;

        // 2. Edge Cases (Using Fixed Functions)
        if (index === 0) return this.popFirst();
        if (index === this.length - 1) return this.popLast();

        // 3. Finding the target
        const targetNode = this.getNode(index);
        if (!targetNode || !targetNode.prev || !targetNode.next) return null;

        // 4. THE BYPASS Surgery
        const beforeNode = targetNode.prev;
        const afterNode = targetNode.next;

        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;

        // 5. Memory Cleanup
        targetNode.next = null;
        targetNode.prev = null;

        this.length--;
        console.log(`[System] Removed Node at Index: ${index}`);
        return targetNode;
    }

    // Testing ke liye helpers
    public add(val: string): void {
        const newNode = new DLLNode(val);
        if (!this.tail) { this.head = this.tail = newNode; }
        else { this.tail.next = newNode; newNode.prev = this.tail; this.tail = newNode; }
        this.length++;
    }

    public display(): void {
        let curr = this.head;
        let res = "";
        while(curr) { res += `[${curr.data}] <-> `; curr = curr.next; }
        console.log(res + "NULL");
    }
}

// --- EXECUTION (Check karne ke liye) ---
const logs = new AILogManager();
logs.add("Task A");
logs.add("Task B");
logs.add("Task C");

console.log("Original List:");
logs.display(); // [Task A] <-> [Task B] <-> [Task C] <-> NULL

logs.removeAt(1); // Task B nikal jayega

console.log("After Removing Index 1 (Task B):");
logs.display(); // [Task A] <-> [Task C] <-> NULL