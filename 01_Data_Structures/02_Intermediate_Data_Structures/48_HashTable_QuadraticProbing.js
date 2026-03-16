/**
 * FILE: 48_HashTable_QuadraticProbing.js
 * Pattern: Quadratic Probing (Square Jump Logic)
 * Efficiency: Reduces Clustering compared to Linear Probing
 */

class QuadraticHashTable {
    constructor(size = 7) {
        this.buckets = new Array(size).fill(null);
        this.size = size;
    }

    _hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) total += key.charCodeAt(i);
        return total % this.size;
    }

    set(key, value) {
        let hashIndex = this._hash(key);
        let i = 0; // Jump counter (i*i)
        let index = hashIndex;

        // Jab tak jagah khali na milay (or key match na ho jaye)
        while (this.buckets[index] !== null && this.buckets[index].key !== key) {
            i++;
            // JUMP LOGIC: (Hash + i*i) % size
            index = (hashIndex + i * i) % this.size;
            
            // Agar bahut zyada koshish kar li (Table almost full)
            if (i >= this.size) {
                console.log("❌ Table is too full to place key!");
                return;
            }
        }

        this.buckets[index] = { key, value };
        console.log(`[Insert] '${key}' placed at index ${index} (Jump: ${i})`);
    }

    get(key) {
        let hashIndex = this._hash(key);
        let i = 0;
        let index = hashIndex;

        while (this.buckets[index] !== null) {
            if (this.buckets[index].key === key) return this.buckets[index].value;
            i++;
            index = (hashIndex + i * i) % this.size;
            if (i >= this.size) break;
        }
        return undefined;
    }
}

// --- EXECUTION ---
const hub = new QuadraticHashTable(7); 
hub.set("A", "Data A");
hub.set("H", "Data H"); // Agar 'H' collision karta hai, toh ye 1^2 ki jump laye ga
hub.set("O", "Data O"); // Ye 2^2 ki jump laye ga