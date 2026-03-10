class DLLNode {
    data: number;
    next: DLLNode | null = null;
    prev: DLLNode | null = null;
    constructor(val: number) { this.data = val; }
}

class TransactionLedger {
    private head: DLLNode | null = null;
    private tail: DLLNode | null = null;

    // Append: Adding to the end (O(1) complexity)
    append(amount: number): void {
        const newNode = new DLLNode(amount);
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        console.log(`Appended: ${amount}`);
    }

    // Prepend: Adding to the start (O(1) complexity)
    prepend(amount: number): void {
        const newNode = new DLLNode(amount);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        console.log(`Prepended: ${amount}`);
    }
}

const myBank = new TransactionLedger();
myBank.append(500);   // List: 500
myBank.append(1000);  // List: 500 <-> 1000
myBank.prepend(100);  // List: 100 <-> 500 <-> 1000