/**
 * FILE: 53_Hashing_ConsistentHashing.js
 * Pattern: Consistent Hashing (The Ring Concept)
 * Efficiency: O(K + log N) per lookup
 */

class ConsistentHash {
    constructor(replicas = 3) {
        this.replicas = replicas; // Aik server ko kitni dafa ring par rakhna hai
        this.ring = []; // Ring par servers ki positions (Sorted)
        this.serverMap = {}; // Ring position -> Server Name
    }

    // [Architectural]: Simple Hash Function for Ring (0 to 360)
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i)) % 360;
        return hash;
    }

    // Server ko Ring par add karna
    addServer(serverName) {
        for (let i = 0; i < this.replicas; i++) {
            const hash = this._hash(`${serverName}-${i}`);
            this.ring.push(hash);
            this.serverMap[hash] = serverName;
        }
        this.ring.sort((a, b) => a - b); // Ring ko sorted rakhna zaroori hai
        console.log(`[System] Server '${serverName}' added to ring.`);
    }

    // Key (Data) kis server par jayega?
    getServer(key) {
        if (this.ring.length === 0) return null;
        
        const hash = this._hash(key);
        
        // Ring mein wo pehla server dhoondo jiska angle 'hash' se bara ho
        for (let pos of this.ring) {
            if (hash <= pos) return this.serverMap[pos];
        }
        
        // Agar ring khatam ho gayi, toh wapis Head (first server) par chalo
        return this.serverMap[this.ring[0]];
    }
}

// --- EXECUTION ---
const cluster = new ConsistentHash();

cluster.addServer("Server-A");
cluster.addServer("Server-B");

console.log("Data 'User-1' store hoga:", cluster.getServer("User-1"));
console.log("Data 'User-2' store hoga:", cluster.getServer("User-2"));