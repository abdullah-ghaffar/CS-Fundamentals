/**
 * FILE: 52_HashTable_Iterators.js
 * Pattern: Data Iteration using Nested Loops (Flattening)
 */

class MyMap {
    constructor(size = 10) {
        this.buckets = new Array(size);
        this.size = size;
    }

    // (Hash function wahi hai jo pichle lesson mein tha)
    _hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) total = (total * 31 + key.charCodeAt(i)) % this.size;
        return total;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this.buckets[index]) this.buckets[index] = [];
        const chain = this.buckets[index];
        for (let pair of chain) {
            if (pair[0] === key) { pair[1] = value; return; }
        }
        chain.push([key, value]);
    }

    // --- NEW: THE ITERATORS ---

    // 1. Saari Keys nikalne ka tareeqa
    keys() {
        let allKeys = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    allKeys.push(pair[0]); // Sirf Key uthao
                }
            }
        }
        return allKeys;
    }

    // 2. Saari Values nikalne ka tareeqa
    values() {
        let allValues = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    allValues.push(pair[1]); // Sirf Value uthao
                }
            }
        }
        return allValues;
    }
}

// --- EXECUTION ---
const db = new MyMap();
db.set("user_1", "Zaid");
db.set("user_2", "Ali");
db.set("user_3", "Sara");

console.log("Saare Keys:", db.keys());   // ['user_1', 'user_2', 'user_3']
console.log("Saare Values:", db.values()); // ['Zaid', 'Ali', 'Sara']