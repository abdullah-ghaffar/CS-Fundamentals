/**
 * FILE: 50_Set_CustomImplementation.js
 * Pattern: Set Implementation using Hash Table
 * Efficiency: O(1) for Add, Remove, and Search
 */

class MySet {
    constructor(size = 50) {
        this.buckets = new Array(size);
        this.size = size;
    }

    _hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) total = (total * 31 + key.charCodeAt(i)) % this.size;
        return total;
    }

    // [Architectural Choice]: Sirf Key rakho, Value humesha 'true' hogi
    add(val) {
        const index = this._hash(val);
        if (!this.buckets[index]) this.buckets[index] = [];
        
        // Duplicate check: Agar pehle se hai toh dobara mat daalo
        if (!this.has(val)) {
            this.buckets[index].push(val);
            console.log(`[Set] Added: ${val}`);
        }
    }

    has(val) {
        const index = this._hash(val);
        const chain = this.buckets[index];
        return chain ? chain.includes(val) : false;
    }

    delete(val) {
        const index = this._hash(val);
        const chain = this.buckets[index];
        if (chain) {
            const itemIndex = chain.indexOf(val);
            if (itemIndex > -1) {
                chain.splice(itemIndex, 1);
                console.log(`[Set] Removed: ${val}`);
                return true;
            }
        }
        return false;
    }
}

// --- EXECUTION ---
const blackList = new MySet(10);
blackList.add("192.168.1.1");
blackList.add("192.168.1.5");

console.log("Is 192.168.1.1 blocked?", blackList.has("192.168.1.1")); // true
blackList.delete("192.168.1.1");
console.log("Is 192.168.1.1 blocked?", blackList.has("192.168.1.1")); // false