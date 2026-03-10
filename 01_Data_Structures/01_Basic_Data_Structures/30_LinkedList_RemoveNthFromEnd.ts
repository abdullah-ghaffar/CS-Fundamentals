export {}; // Conflicts khatam karne ke liye

/**
 * FILE: 30_LinkedList_RemoveNthFromEnd.ts
 * Pattern: Two-Pointer Offset (Sliding Window on List)
 * Efficiency: O(n) Time, O(1) Space
 */

class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(val: number) { this.data = val; }
}

class ContextManager {
    /**
     * Removes the Nth node from the end of the list in one pass.
     */
    public static purgeTask(head: ListNode | null, n: number): ListNode | null {
        // Dummy node handling (Special case: if head needs to be removed)
        const dummy = new ListNode(-1);
        dummy.next = head;

        let slow: ListNode = dummy;
        let fast: ListNode = dummy;

        // Step 1: Create the 'N' step gap
        for (let i = 0; i < n; i++) {
            if (fast.next) {
                fast = fast.next;
            }
        }

        // Step 2: Move both until fast reaches the last node
        while (fast.next !== null) {
            slow = slow.next!;
            fast = fast.next;
        }

        // Step 3: Bypass the target node (Surgery)
        if (slow.next) {
            slow.next = slow.next.next;
        }

        return dummy.next;
    }

    // Helper to print list
    public static print(head: ListNode | null): void {
        let res = "";
        while (head) {
            res += `${head.data} -> `;
            head = head.next;
        }
        console.log(res + "NULL");
    }
}

// --- EXECUTION ---
const taskList = new ListNode(10);
taskList.next = new ListNode(20);
taskList.next.next = new ListNode(30);
taskList.next.next.next = new ListNode(40);
taskList.next.next.next.next = new ListNode(50);

// List: 10 -> 20 -> 30 -> 40 -> 50 -> NULL
console.log("Original List:");
ContextManager.print(taskList);

console.log("Removing 2nd from end (which is 40)...");
const updatedHead = ContextManager.purgeTask(taskList, 2);

console.log("Updated List:");
ContextManager.print(updatedHead);