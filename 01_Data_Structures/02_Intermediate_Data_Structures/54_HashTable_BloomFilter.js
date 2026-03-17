/**
 * FILE: 54_HashTable_BloomFilter.js
 * Pattern: Probabilistic Membership Test
 * Efficiency: O(K) where K is number of hash functions
 */

class BloomFilter {
    constructor(size = 100) {
        this.size = size;
        this.bits = new Array(size).fill(0); // 0 = Empty, 1 = Data found
    }

    // Hash Function 1
    _hash1(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % this.size;
        return hash;
    }

    // Hash Function 2 (Thora sa different)
    _hash2(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) hash = (hash * 37 + key.charCodeAt(i)) % this.size;
        return hash;
    }

    // [Architectural]: Add item (Multiple indexes set to 1)
    add(key) {
        this.bits[this._hash1(key)] = 1;
        this.bits[this._hash2(key)] = 1;
        console.log(`[Bloom] Added '${key}' at bits set.`);
    }

    // [Architectural]: Membership Test
    contains(key) {
        // Agar teeno mein se koi bhi 0 mila, toh "Not in list" (100% Sure)
        if (this.bits[this._hash1(key)] === 0 || this.bits[this._hash2(key)] === 0) {
            return false; // 100% Safe
        }
        return true; // "Maybe" in list (False Positive possible)
    }
}

// --- EXECUTION ---
const filter = new BloomFilter(20);
filter.add("malware-site.com");

console.log("Is safe-site.com blocked?", filter.contains("safe-site.com")); // false
console.log("Is malware-site.com blocked?", filter.contains("malware-site.com")); // true