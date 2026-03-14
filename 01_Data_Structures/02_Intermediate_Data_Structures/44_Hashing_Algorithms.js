/**
 * FILE: 44_Hashing_Algorithms.js
 * Pattern: Simple String Hashing (ASCII Summation with Modulo)
 * Efficiency: O(K) Time where K is string length.
 */

// Ek basic Hash Function
function hashStringToIndex(key, arraySize) {
    let hashValue = 0;

    // String ke har character par loop
    for (let i = 0; i < key.length; i++) {
        // String.charCodeAt(i) harf ko uske CPU (ASCII) number mein badalta hai
        let charCode = key.charCodeAt(i); 
        
        // Number jama karo aur Modulo (%) lagao taake array limit se bahar na jaye
        hashValue = (hashValue + charCode) % arraySize;
    }

    return hashValue;
}

// --- EXECUTION (Check the Magic) ---
const RAM_SIZE = 10; // Farz karein hamari Array mein sirf 10 dabbe hain (0 se 9)

const index1 = hashStringToIndex("Ali", RAM_SIZE);
const index2 = hashStringToIndex("Zaid", RAM_SIZE);
const index3 = hashStringToIndex("Sara", RAM_SIZE);

console.log(`'Ali' memory ke dabba number [${index1}] mein save hoga.`);
console.log(`'Zaid' memory ke dabba number [${index2}] mein save hoga.`);
console.log(`'Sara' memory ke dabba number [${index3}] mein save hoga.`);