export {}; // Purane 'ListNode' errors se bachne ke liye

/**
 * FILE: 28_LinkedList_FindMiddle.ts
 * Pattern: Fast & Slow Pointers (Two-Pointer Technique)
 * Efficiency: O(n) Time, O(1) Space
 */

class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(val: number) { this.data = val; }
}

class AIProcessor {
    /**
     * Finds the middle node to split the workload.
     */
    public static findMiddleNode(head: ListNode | null): ListNode | null {
        // Agar list khali hai ya sirf ek dabba hai
        if (!head) return null;

        let slow: ListNode | null = head;
        let fast: ListNode | null = head;

        // Khargosh (fast) koodta hua aakhir tak jaye ga
        while (fast !== null && fast.next !== null) {
            slow = slow!.next;          // Kachwa: 1 kadam
            fast = fast.next.next;      // Khargosh: 2 kadam
        }

        return slow; // Jab fast end par hoga, slow middle par hoga
    }
}

// --- EXECUTION (Check karne ke liye) ---
const task1 = new ListNode(1);
const task2 = new ListNode(2);
const task3 = new ListNode(3);
const task4 = new ListNode(4);
const task5 = new ListNode(5);

task1.next = task2;
task2.next = task3;
task3.next = task4;
task4.next = task5;

// List: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
console.log("Searching for middle node...");
const middle = AIProcessor.findMiddleNode(task1);

if (middle) {
    console.log(`Middle Task Found: [${middle.data}]`); 
    // Output: 3 (Kyunke 1,2 aur 4,5 ke darmiyan 3 hai)
}