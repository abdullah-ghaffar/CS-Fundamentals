class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Indexing Helpers
  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  // 1. Insert (Heapify Up)
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let pIndex = this.getParentIndex(index);
      if (this.heap[index] < this.heap[pIndex]) {
        [this.heap[index], this.heap[pIndex]] = [this.heap[pIndex], this.heap[index]];
        index = pIndex;
      } else { break; }
    }
  }

  // 2. Extract Min (Heapify Down) - 71_MinHeap_ExtractHeapifyDown.js
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0]; // Choti value save ki
    this.heap[0] = this.heap.pop(); // Last element ko top par rakha
    
    this.heapifyDown(); // Niche shift karne ka logic
    return min;
  }

  heapifyDown() {
    let index = 0;
    // Jab tak left child maujood hai
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let left = this.getLeftChildIndex(index);
      let right = this.getRightChildIndex(index);
      let smallerChild = left;

      // Agar right child chota hai, to usay select karo
      if (right < this.heap.length && this.heap[right] < this.heap[left]) {
        smallerChild = right;
      }

      // Agar parent bada hai, to swap karke niche jao
      if (this.heap[index] > this.heap[smallerChild]) {
        [this.heap[index], this.heap[smallerChild]] = [this.heap[smallerChild], this.heap[index]];
        index = smallerChild;
      } else {
        break;
      }
    }
  }
}

// --- TESTING THE CODE ---
const myHeap = new MinHeap();

console.log("--- Step 1: Inserting Values ---");
[40, 10, 5, 30].forEach(val => {
    myHeap.insert(val);
    console.log(`Inserted ${val}:`, [...myHeap.heap]);
});

console.log("\n--- Step 2: Extracting Min ---");
const minVal = myHeap.extractMin();
console.log(`Extracted: ${minVal} (Expected: 5)`);
console.log("Heap after extraction:", myHeap.heap);

// Final Check
if (myHeap.heap[0] === 10) {
    console.log("✅ Logic Clean: Next minimum (10) moved to root!");
}