/**
 * FILE: 47_HashTable_LinearProbing.js
 * Pattern: Open Addressing (Linear Probing)
 * Efficiency: O(1) Average, O(N) Worst Case
 */

class LinearHashTable {
    constructor(size = 7) {
        this.buckets = new Array(size).fill(null);
        this.size = size;
    }

    _hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) total += key.charCodeAt(i);
        return total % this.size;
    }

    // SAMAN RAKHNA (Linear Probing)
    set(key, value) {
        let index = this._hash(key);
        let startIndex = index;

        // Jab tak jagah khali na mil jaye
        while (this.buckets[index] !== null) {
            // Agar key wahi hai, toh update kardo
            if (this.buckets[index].key === key) {
                this.buckets[index].value = value;
                return;
            }
            // Agla dabba check karo
            index = (index + 1) % this.size;
            
            // Agar wapis shuru par aa gaye toh table full hai
            if (index === startIndex) return console.log("❌ Table is full!");
        }

        // Jagah mil gayi!
        this.buckets[index] = { key, value };
        console.log(`[Insert] '${key}' placed at index ${index}`);
    }

    // SAMAN NIKALNA
    get(key) {
        let index = this._hash(key);
        let startIndex = index;

        while (this.buckets[index] !== null) {
            if (this.buckets[index].key === key) return this.buckets[index].value;
            index = (index + 1) % this.size;
            if (index === startIndex) break;
        }
        return undefined;
    }
}

// --- EXECUTION ---
const parking = new LinearHashTable(5);
parking.set("Ali", "ali@car.com");
parking.set("Zaid", "zaid@car.com"); // Agar index takra gaya toh Zaid aglay dabba mein jaye ga!