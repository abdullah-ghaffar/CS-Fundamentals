export {}; // Is se purani files ke sath naam ka takraao (conflict) khatam ho jayega

/**
 * FILE: 27_LinkedList_MergeTwoSorted.ts
 * Fixed Version
 */

// 1. Class ka naam 'ListNode' rakha taake conflict na ho
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(val: number) { this.data = val; }
}

class LedgerMerger {
    /**
     * Merges two sorted linked lists into one.
     */
    public static merge(l1: ListNode | null, l2: ListNode | null): ListNode | null {
        // Dummy node acts as the foundation
        const dummy = new ListNode(-1);
        let tail = dummy;

        let p1 = l1;
        let p2 = l2;

        while (p1 !== null && p2 !== null) {
            if (p1.data <= p2.data) {
                tail.next = p1; // Connect current smallest
                p1 = p1.next;   // Advance p1
            } else {
                tail.next = p2;
                p2 = p2.next;   // Advance p2
            }
            // tail.next hamesha maujood hoga isliye '!' lagaya
            tail = tail.next!;  
        }

        // Attach remaining nodes
        if (p1 !== null) tail.next = p1;
        if (p2 !== null) tail.next = p2;

        return dummy.next;
    }

    // Helper: List ko print karne ke liye
    public static print(head: ListNode | null): void {
        let res = "";
        let current = head; // Alag variable use karna behtar hai
        while (current) {
            res += `${current.data} -> `;
            current = current.next;
        }
        console.log(res + "NULL");
    }
}

// --- EXECUTION (Check karne ke liye) ---
const listA = new ListNode(10);
listA.next = new ListNode(30);
listA.next.next = new ListNode(50);

const listB = new ListNode(20);
listB.next = new ListNode(40);
listB.next.next = new ListNode(60);

console.log("Merging Agent Logs...");
const masterLedger = LedgerMerger.merge(listA, listB);
LedgerMerger.print(masterLedger);