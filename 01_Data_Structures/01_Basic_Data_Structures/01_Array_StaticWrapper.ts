/**
 * File: 01_Array_StaticWrapper.ts
 * Description: A class that simulates a Fixed-Size (Static) Array.
 * Concept: Demonstrates Capacity vs Current Size and Out-of-Bounds errors.
 */

class StaticArray {
    private data: (number | null)[]; // Asli data yahan save hoga
    private capacity: number;        // Array ki total gunjaish (Max Size)
    private currentSize: number;     // Abhi kitne items majood hain

    constructor(capacity: number) {
        this.capacity = capacity;
        this.currentSize = 0;
        // Array ko fixed size de kar saare dabbon mein 'null' (khali) rakh diya
        this.data = new Array(capacity).fill(null);
    }

    // 1. Array ke aakhir mein item daalna
    push(value: number): void {
        if (this.currentSize >= this.capacity) {
            throw new Error("❌ Error: Array is Full! (Overflow)");
        }
        this.data[this.currentSize] = value;
        this.currentSize++;
    }

    // 2. Kisi khaas Index se item nikalna
    get(index: number): number | null {
        if (index < 0 || index >= this.capacity) {
            throw new Error(`❌ Error: Index ${index} is Out of Bounds!`);
        }
        return this.data[index];
    }

    // 3. Kisi khaas Index par item ko badalna (Replace)
    replace(index: number, value: number): void {
        if (index < 0 || index >= this.capacity) {
            throw new Error(`❌ Error: Index ${index} is Out of Bounds!`);
        }
        this.data[index] = value;
        
        // Agar us jagah pehle null tha, toh matlab ek naya item add hua hai
        if (this.data[index] === null) {
            this.currentSize++;
        }
    }

    // 4. Array ko print karna
    print(): void {
        console.log(`📊 Array State[Size: ${this.currentSize} / Capacity: ${this.capacity}]`, this.data);
    }
}

// ==========================================
// Test Cases (Execution)
// ==========================================

console.log("--- Creating a Fixed Array of size 3 ---");
const myArray = new StaticArray(3);
myArray.print(); // Output:[null, null, null]

console.log("\n--- Adding Items ---");
myArray.push(10);
myArray.push(20);
myArray.print(); // Output:[10, 20, null]

console.log("\n--- Replacing Item at Index 2 ---");
myArray.replace(2, 30);
myArray.print(); // Output:[10, 20, 30]

console.log("\n--- Testing Edge Cases (Errors) ---");
try {
    myArray.push(40); // Array full ho chuka hai (Capacity 3 thi)
} catch (error: any) {
    console.log(error.message); // Output: Array is Full!
}

try {
    myArray.get(5); // Index 5 toh hai hi nahi
} catch (error: any) {
    console.log(error.message); // Output: Index Out of Bounds!
}