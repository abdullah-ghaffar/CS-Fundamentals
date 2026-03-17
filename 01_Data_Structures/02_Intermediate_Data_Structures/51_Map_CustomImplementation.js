/**
 * FILE: 51_Map_CustomImplementation.js
 * Pattern: Map Implementation (Key-Value Storage)
 */

class MyMap {
    constructor(size = 10) {
        this.buckets = new Array(size);
        this.size = size;
    }

    _hash(key) {
        // [Architectural]: Agar Key object hai toh hum uska 'hash' (reference) lete hain
        const keyString = typeof key === 'object' ? JSON.stringify(key) : String(key);
        let total = 0;
        for (let i = 0; i < keyString.length; i++) total = (total * 31 + keyString.charCodeAt(i)) % this.size;
        return total;
    }

    // Set: Key aur Value ko jorna
    set(key, value) {
        const index = this._hash(key);
        if (!this.buckets[index]) this.buckets[index] = [];
        
        const chain = this.buckets[index];
        for (let pair of chain) {
            if (pair[0] === key) { pair[1] = value; return; } // Update
        }
        chain.push([key, value]); // Insert
    }

    // Get: Value nikalna
    get(key) {
        const index = this._hash(key);
        const chain = this.buckets[index];
        if (chain) {
            for (let pair of chain) {
                if (pair[0] === key) return pair[1];
            }
        }
        return undefined;
    }
}

// --- EXECUTION (Context Memory) ---
const contextMap = new MyMap();
const userSession = { id: 505 }; // Aik Object as Key

contextMap.set(userSession, "History: Hi AI, how are you?");
contextMap.set("session_2", "History: Code me JS.");

console.log("User 505 ka data:", contextMap.get(userSession));