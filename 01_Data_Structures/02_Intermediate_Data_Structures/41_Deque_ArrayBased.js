/**
 * FILE: 41_Deque_ArrayBased.js
 * Pattern: Double-Ended Queue (Deque)
 * Note: Array-based Deque mein shift/unshift O(n) hotay hain.
 */

class Deque {
    constructor() {
        // Hamari storage line
        this.items =[];
    }

    // 1. Aage (Front) se line mein lagna (VIP Entry)
    addFront(element) {
        this.items.unshift(element);
        console.log(`[Add Front] Added: ${element}`);
    }

    // 2. Peechay (Rear) se line mein lagna (Aam Entry)
    addRear(element) {
        this.items.push(element);
        console.log(`[Add Rear] Added: ${element}`);
    }

    // 3. Aage (Front) se line se nikalna
    removeFront() {
        if (this.isEmpty()) return "Deque is empty!";
        const removed = this.items.shift();
        console.log(`[Remove Front] Removed: ${removed}`);
        return removed;
    }

    // 4. Peechay (Rear) se line se nikalna
    removeRear() {
        if (this.isEmpty()) return "Deque is empty!";
        const removed = this.items.pop();
        console.log(`[Remove Rear] Removed: ${removed}`);
        return removed;
    }

    // Helper: Aage kon hai?
    peekFront() {
        return this.isEmpty() ? null : this.items[0];
    }

    // Helper: Peechay kon hai?
    peekRear() {
        return this.isEmpty() ? null : this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// --- EXECUTION (Browser History Demo) ---
const browserHistory = new Deque();

// Normal browsing (Aakhir mein add ho rahe hain)
browserHistory.addRear("google.com");
browserHistory.addRear("github.com/AI");

// User ne "Open in New Tab (Foreground)" kiya, toh wo sab se pehle aayega
browserHistory.addFront("chatgpt.com"); 

// History Limit poori ho gayi? Sab se purana page nikal do
browserHistory.removeRear(); // 'google.com' nikal jayega

console.log("Current Tab (Front):", browserHistory.peekFront()); // chatgpt.com