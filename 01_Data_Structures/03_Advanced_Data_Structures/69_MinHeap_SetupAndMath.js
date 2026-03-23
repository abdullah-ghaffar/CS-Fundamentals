/**
 * FILE: 69_MinHeap_SetupAndMath.js
 * Purpose: Array-based Binary Tree representation (Heap Foundation)
 * Architecture: Contiguous Memory Mapping
 */

class MinHeap {
    constructor() {
        // [Architectural Choice]: Pointers ke bajaye Array use kar rahe hain
        // Taake CPU Cache hits behtar hon aur memory fragment na ho.
        this.heap = [];
    }

    // 1. Parent Index nikalne ki hidayat
    getParentIndex(i) {
        // (i-1) / 2 ka bacha hua hissa khatam kardo
        return Math.floor((i - 1) / 2);
    }

    // 2. Left Child Index nikalne ki hidayat
    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    // 3. Right Child Index nikalne ki hidayat
    getRightChildIndex(i) {
        return 2 * i + 2;
    }

    // [Linguistic]: Swap ka matlab hai do memory locations ki values badal dena
    swap(i1, i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }

    display() {
        console.log("Current Heap Array:", this.heap);
    }
}

// --- EXECUTION: Math logic check karte hain ---
const myHeap = new MinHeap();

// Farz karein hamari array aisi hai: [10, 20, 30, 40, 50]
// Index:                          0   1   2   3   4
myHeap.heap = [10, 20, 30, 40, 50];

console.log("Root (10) ka Left Child index:", myHeap.getLeftChildIndex(0)); // 1 (Value: 20)
console.log("Root (10) ka Right Child index:", myHeap.getRightChildIndex(0)); // 2 (Value: 30)
console.log("Node (50) [index 4] ka Parent index:", myHeap.getParentIndex(4)); // 1 (Value: 20)