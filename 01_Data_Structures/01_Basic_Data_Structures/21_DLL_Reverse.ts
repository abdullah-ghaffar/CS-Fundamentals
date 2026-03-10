/**
 * FILE: 21_DLL_Reverse.ts
 * Pattern: Pointer Swapping (O(n) Time, O(1) Space)
 */

class DLLNode {
    data: string;
    next: DLLNode | null = null;
    prev: DLLNode | null = null;
    constructor(val: string) { this.data = val; }
}

class AIActionLog {
    private head: DLLNode | null = null;
    private tail: DLLNode | null = null;
    public length: number = 0;

    // List ko ulta karne wala function
    public reverse(): void {
        if (!this.head) return;

        let current: DLLNode | null = this.head;
        let temp: DLLNode | null = null;

        // Loop through every node
        while (current !== null) {
            // SWAP next and prev pointers
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;

            // Move to next node (which is now stored in current.prev)
            current = current.prev;
        }

        // Final step: Swap head and tail pointers
        temp = this.head;
        this.head = this.tail;
        this.tail = temp;

        console.log("--- System: List Reversed Successfully ---");
    }

    // Helper functions
    add(val: string) {
        const newNode = new DLLNode(val);
        if (!this.tail) { this.head = this.tail = newNode; }
        else { this.tail.next = newNode; newNode.prev = this.tail; this.tail = newNode; }
        this.length++;
    }

    display() {
        let curr = this.head;
        let res = "";
        while(curr) { res += `[${curr.data}] <-> `; curr = curr.next; }
        console.log(res + "NULL");
    }
}

// --- EXECUTION ---
const logs = new AIActionLog();
logs.add("Login");
logs.add("View Profile");
logs.add("Logout");

console.log("Original Order:");
logs.display(); // [Login] <-> [View Profile] <-> [Logout]

logs.reverse();

console.log("Reversed Order:");
logs.display(); // [Logout] <-> [View Profile] <-> [Login]