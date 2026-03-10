export {}; // Purane 'ListNode' conflicts se bachne ke liye

/**
 * FILE: 29_LinkedList_DetectCycle.ts
 * Pattern: Floyd's Cycle-Finding Algorithm (Tortoise and Hare)
 * Efficiency: O(n) Time, O(1) Space
 */

class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(val: number) { this.data = val; }
}

class AIIntegrityGuard {
    /**
     * Checks if the task list contains an infinite loop (cycle).
     */
    public static hasInfiniteLoop(head: ListNode | null): boolean {
        if (!head) return false;

        let slow: ListNode | null = head;
        let fast: ListNode | null = head;

        while (fast !== null && fast.next !== null) {
            slow = slow!.next;          // Move 1 step
            fast = fast.next.next;      // Move 2 steps

            // The 'Meeting' Point: If they meet, there is a loop
            if (slow === fast) {
                return true; 
            }
        }

        return false; // Reached the end, no loop
    }
}

// --- EXECUTION (Creating a Loop for Testing) ---

const node1 = new ListNode(10);
const node2 = new ListNode(20);
const node3 = new ListNode(30);
const node4 = new ListNode(40);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 🚩 CIRCLE! node4 points back to node2

console.log("Checking system for infinite loops...");
const isLeaking = AIIntegrityGuard.hasInfiniteLoop(node1);

if (isLeaking) {
    console.log("❌ CRITICAL ALERT: Infinite Loop Detected in System!");
} else {
    console.log("✅ System OK: No loops found.");
}