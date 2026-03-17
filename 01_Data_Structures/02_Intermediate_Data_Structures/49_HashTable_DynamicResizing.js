/**
 * FILE: 49_HashTable_DynamicResizing.js
 * Pattern: Dynamic Resizing (Load Factor 0.75)
 * Efficiency: Amortized O(1) Operations
 */

class DynamicHashTable {
    constructor(size = 5) {
        this.buckets = new Array(size);
        this.size = size;
        this.count = 0; // Kitna data parha hai
    }

    _hash(key, newSize) {
        let total = 0;
        for (let i = 0; i < key.length; i++) total = (total * 31 + key.charCodeAt(i)) % newSize;
        return total;
    }

    // [Architectural Choice]: Dynamic Resizing
    _resize() {
        console.log(`\n--- [System] Load Factor exceeded 0.75. Resizing to ${this.size * 2} ---`);
        const oldBuckets = this.buckets;
        this.size *= 2;
        this.buckets = new Array(this.size);
        this.count = 0; // Count reset, re-insert hoga

        // Purana data naye buckets mein "Rehash" karo
        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }

    set(key, value) {
        // Load Factor Check: 75% limit
        if (this.count / this.size > 0.75) {
            this._resize();
        }

        const index = this._hash(key, this.size);
        if (!this.buckets[index]) this.buckets[index] = [];
        
        const chain = this.buckets[index];
        for (let pair of chain) {
            if (pair[0] === key) { pair[1] = value; return; }
        }

        chain.push([key, value]);
        this.count++;
        console.log(`[Insert] '${key}' at bucket ${index}. Load: ${this.count}/${this.size}`);
    }
}

// --- EXECUTION ---
const db = new DynamicHashTable(2); // Bohat chota size rakha taake resize jaldi ho

db.set("User1", "Data1"); // size 2, count 1 (0.5 < 0.75 - OK)
db.set("User2", "Data2"); // size 2, count 2 (1.0 > 0.75 - RESIZE!)
db.set("User3", "Data3");