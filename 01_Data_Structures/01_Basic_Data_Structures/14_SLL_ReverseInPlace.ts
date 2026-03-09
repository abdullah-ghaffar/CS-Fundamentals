// 14_SLL_ReverseInPlace.ts

/**
 * The basic building block for a Singly Linked List.
 * Represents a single piece of data and a pointer to the next block.
 */
class SLLNode<T> {
    public value: T;
    public next: SLLNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * A Singly Linked List data structure.
 * Manages the head, tail, and length, providing methods to manipulate the list.
 */
class SinglyLinkedList<T> {
    public head: SLLNode<T> | null = null;
    public tail: SLLNode<T> | null = null;
    public length: number = 0;

    /**
     * Appends a new node to the end of the list. O(1)
     */
    public append(value: T): this {
        const newNode = new SLLNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Non-null assertion `!` because if head exists, tail must also exist.
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    /**
     * Reverses the entire linked list in-place without using extra arrays or objects.
     * This is a pure O(N) time and O(1) space complexity operation.
     */
    public reverseInPlace(): this {
        // If list is empty or has only one node, no reversal is needed.
        if (!this.head || !this.head.next) {
            return this;
        }

        // --- The Three-Pointer Reversal Algorithm ---
        let previous: SLLNode<T> | null = null;
        let current: SLLNode<T> | null = this.head;
        let nextTemp: SLLNode<T> | null = null;

        // The old head will become the new tail after reversal.
        this.tail = this.head;

        while (current !== null) {
            // 1. Store the next node before we break the pointer.
            nextTemp = current.next;
            
            // 2. The core reversal: Point the current node's `next` to the previous node.
            current.next = previous;
            
            // 3. Move the pointers forward for the next iteration.
            previous = current;
            current = nextTemp;
        }

        // After the loop, `previous` will be pointing to the new head of the reversed list.
        this.head = previous;

        return this;
    }

    /**
     * Helper method to print the list values to the console for verification.
     */
    public print(): void {
        if (!this.head) {
            console.log("List is empty.");
            return;
        }
        
        // --- FIX IS HERE ---
        // Explicitly type `current` to avoid compiler ambiguity inside the loop.
        let current: SLLNode<T> | null = this.head;
        
        const values: T[] = [];
        while (current) {
            values.push(current.value);
            // This assignment is now valid because the `current` variable is typed as `SLLNode<T> | null`
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// ==========================================
// CODE RUNNER
// ==========================================
function runDemonstration() {
    console.log("🚀 Initializing Singly Linked List...");
    
    const list = new SinglyLinkedList<number>();
    list.append(10).append(20).append(30).append(40).append(50);
    
    console.log("\nOriginal List State:");
    list.print();
    console.log(`Head: ${list.head?.value}, Tail: ${list.tail?.value}`);

    console.log("\n🔄 Executing In-Place Reversal...");
    
    const startTime = process.hrtime.bigint();
    list.reverseInPlace();
    const endTime = process.hrtime.bigint();
    
    const executionTimeNs = Number(endTime - startTime);

    console.log("\nReversed List State:");
    list.print();
    console.log(`Head: ${list.head?.value}, Tail: ${list.tail?.value}`);
    console.log(`\nExecution Time: ${executionTimeNs} nanoseconds`);
    console.log("\nNotice how the head and tail pointers have been swapped, and all 'next' pointers now point backwards.");
}

runDemonstration();