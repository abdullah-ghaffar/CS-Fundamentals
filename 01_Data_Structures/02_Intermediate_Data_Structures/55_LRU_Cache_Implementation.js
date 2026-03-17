/**
 * FILE: 55_LRU_Cache_Implementation.js
 * Pattern: Hash Map + Doubly Linked List (The Classic Interview Problem)
 * Efficiency: get(key) O(1), set(key, value) O(1)
 */

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); // Fast access ke liye
        this.head = new Node(0, 0); // Dummy Head
        this.tail = new Node(0, 0); // Dummy Tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // [Architectural]: List mein dabba (Node) nikalna
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // [Architectural]: Dabba (Node) ko Head ke bilkul peeche (MRU position) rakhna
    _add(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            this._remove(node);
            this._add(node); // Fetch kiya toh naya (MRU) ban gaya
            return node.value;
        }
        return -1;
    }

    set(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }
        const newNode = new Node(key, value);
        this._add(newNode);
        this.map.set(key, newNode);

        // Agar capacity exceed hui toh Tail (Least Recently Used) ko delete karo
        if (this.map.size > this.capacity) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}

// --- EXECUTION (Check the Cache Magic) ---
const cache = new LRUCache(2); // Humne sirf 2 items ki jagah rakhi hai

console.log("--- Step 1: Inserting 1 and 2 ---");
cache.set(1, 100); 
cache.set(2, 200);

console.log("\n--- Step 2: Accessing Key 1 (Making it Most Recently Used) ---");
console.log("Value of Key 1:", cache.get(1)); 

console.log("\n--- Step 3: Inserting Key 3 (Capacity Full - 2 ko nikalna chahiye) ---");
cache.set(3, 300); // 2 ko nikaal dega kyunke 2 purana tha

console.log("\n--- Final Status ---");
console.log("Value of Key 2 (Should be -1):", cache.get(2)); 
console.log("Value of Key 3 (Should be 300):", cache.get(3));