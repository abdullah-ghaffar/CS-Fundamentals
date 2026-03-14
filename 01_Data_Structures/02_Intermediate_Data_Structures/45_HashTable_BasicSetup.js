/**
 * FILE: 45_HashTable_BasicSetup.js
 * Pattern: Hash Table Initialization & Private Hashing Method
 * Note: Pre-allocating memory for strictly O(1) Operations
 */

class HashTable {
    // 1. Memory Block (Buckets) allocate karna
    constructor(size = 50) {
        // new Array(size) RAM mein ek sath 'size' jitne dabbe reserve kar leta hai
        this.buckets = new Array(size); 
        this.size = size;
        console.log(`[System] Allocated ${size} empty buckets in memory.`);
    }

    // 2. Private Hash Function (String to Memory Index)
    // Underscore (_) convention ka matlab hai: "Bahar se isay mat chherna"
    _hash(key) {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            // JADU: 31 ek Prime Number hai. Is se multiply karne se har word
            // ka number bilkul alag banta hai, jis se Collisions nahi hotay.
            hashValue = (hashValue * 31 + key.charCodeAt(i)) % this.size;
        }
        return hashValue;
    }

    // Test karne ke liye ek public method
    testHash(key) {
        const index = this._hash(key);
        console.log(`Key '${key}' will be stored in Bucket No: [${index}]`);
    }
}

// --- EXECUTION (Check the Memory Setup) ---

// Humne 50 dabbon (0 se 49) ki ek Almari banayi
const myDatabase = new HashTable(50); 

// Dekhte hain kon kahan jayega
myDatabase.testHash("Zaid"); 
myDatabase.testHash("Ali");
myDatabase.testHash("Sara");

// Agar main dubara "Zaid" likhun, toh number hamesha SAME aayega! (Determinism)
myDatabase.testHash("Zaid");