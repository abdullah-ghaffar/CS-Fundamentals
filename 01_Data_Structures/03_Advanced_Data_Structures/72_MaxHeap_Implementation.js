class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Helpers
  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  // 1. INSERT (Bari value ko upar bhejna)
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    // Condition: Jab tak current element apne Parent se BADA hai
    while (index > 0 && this.heap[index] > this.heap[this.getParentIndex(index)]) {
      let pIndex = this.getParentIndex(index);
      [this.heap[index], this.heap[pIndex]] = [this.heap[pIndex], this.heap[index]];
      index = pIndex;
    }
  }

  // 2. EXTRACT MAX (Top value nikalna)
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop(); // Last element ko top par rakha
    this.heapifyDown();
    return max;
  }

  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let left = this.getLeftChildIndex(index);
      let right = this.getRightChildIndex(index);
      let largerChild = left;

      // Check karo dono bacho mein se BADA kaunsa hai
      if (right < this.heap.length && this.heap[right] > this.heap[left]) {
        largerChild = right;
      }

      // Agar parent apne bade child se CHOTA hai, to swap karo
      if (this.heap[index] < this.heap[largerChild]) {
        [this.heap[index], this.heap[largerChild]] = [this.heap[largerChild], this.heap[index]];
        index = largerChild;
      } else {
        break;
      }
    }
  }
}

// --- TESTING THE MAXHEAP ---
const myMaxHeap = new MaxHeap();

console.log("--- Test 1: Inserting 10, 50, 20, 100 ---");
[10, 50, 20, 100].forEach(val => myMaxHeap.insert(val));
console.log("Heap Array:", myMaxHeap.heap); 
// Expected: 100 root par hona chahiye -> [100, 50, 20, 10]

console.log("\n--- Test 2: Extracting Max ---");
console.log("Extracted:", myMaxHeap.extractMax()); // Expected: 100
console.log("Heap after extract:", myMaxHeap.heap); // Expected: 50 root par aa jayega

if (myMaxHeap.heap[0] === 50) {
    console.log("✅ Test Passed: 50 is now the new Max Root!");
}