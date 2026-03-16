class EliteHashTable {
    constructor(size = 10) {
        // [Architectural]: Fixed-size buffer for O(1) addressing
        this.buckets = new Array(size);
        this.size = size;
    }

    // [Linguistic]: _hash = String ko memory index mein badalna
    _hash(key) {
        let total = 0;
        const PRIME = 31; // Prime number collisions kam karta hai
        for (let i = 0; i < Math.min(key.length, 10); i++) {
            total = (total * PRIME + key.charCodeAt(i)) % this.size;
        }
        return total;
    }

    // [Logic]: SET - Data ko save ya update karna
    set(key, value) {
        const index = this._hash(key);
        
        // Agar bucket khali hai toh aik nayi chain (array) bano
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const chain = this.buckets[index];

        // [Architectural]: Linear Search within the chain to ensure uniqueness
        for (let i = 0; i < chain.length; i++) {
            if (chain[i][0] === key) {
                console.log(`[System]: Updating existing key '${key}'`);
                chain[i][1] = value; // VALUE UPDATE (Purana mita kar naya)
                return; 
            }
        }

        // Agar loop poora ho jaye aur key na mile, toh naya dabba push kardo
        chain.push([key, value]);
        console.log(`[System]: Inserted new key '${key}' in bucket ${index}`);
    }

    // [Logic]: GET - Data ko dhoond kar nikalna
    get(key) {
        const index = this._hash(key);
        const chain = this.buckets[index];

        if (chain) {
            for (let pair of chain) {
                if (pair[0] === key) return pair[1]; // Jawab mil gaya
            }
        }
        return undefined; // Kuch nahi mila
    }

    // [Logic]: REMOVE - Data ko dunya se mita dena
    remove(key) {
        const index = this._hash(key);
        const chain = this.buckets[index];

        if (chain) {
            for (let i = 0; i < chain.length; i++) {
                if (chain[i][0] === key) {
                    console.log(`[System]: Deleting key '${key}'`);
                    chain.splice(i, 1); // Array se element nikal do
                    return true;
                }
            }
        }
        return false;
    }
}

// ==========================================
// EXECUTION: SCENARIO (Email as a Unique Key)
// ==========================================

const userDB = new EliteHashTable(5);

// Scenario: Aik hi email par do logon ka data bhejte hain
userDB.set("ali@gmail.com", "Ali Khan"); // Pehli entry
userDB.set("ali@gmail.com", "Ali Raza"); // Dusri entry (Overwrites Ali Khan)

userDB.set("sara@gmail.com", "Sara Ahmed");

console.log("\n--- Final Database Status ---");
console.log("ali@gmail.com ka malik:", userDB.get("ali@gmail.com")); 
// Output: "Ali Raza" (Kyunke wo update ho gaya)

// Delete Test
userDB.remove("sara@gmail.com");
console.log("Kya Sara abhi bhi hai?", userDB.get("sara@gmail.com")); // undefined