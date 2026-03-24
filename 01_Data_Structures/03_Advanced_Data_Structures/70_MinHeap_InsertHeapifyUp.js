class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Helper: Parent ka index nikalne ke liye
  getParentIndex(i) { return Math.floor((i - 1) / 2); }

  // Helper: Left child ka index nikalne ke liye
  getLeftChildIndex(i) { return 2 * i + 1; }

  // Helper: Right child ka index nikalne ke liye
  getRightChildIndex(i) { return 2 * i + 2; }

  // 1. INSERTION LOGIC (Heapify Up)
  insert(value) {
    this.heap.push(value); // End mein add karo
    this.heapifyUp();      // Sahi jagah upar le jao
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let pIndex = this.getParentIndex(index);
      if (this.heap[index] < this.heap[pIndex]) {
        // Swap karo agar child chota hai
        [this.heap[index], this.heap[pIndex]] = [this.heap[pIndex], this.heap[index]];
        index = pIndex;
      } else {
        break;
      }
    }
  }

  // 2. EXTRACTION LOGIC (Heapify Down)
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];      // Sab se choti value (Root)
    this.heap[0] = this.heap.pop(); // Last value ko Root par le aao
    this.heapifyDown();            // Root ko sahi jagah niche le jao
    return min;
  }

  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);

      // Check karo dono bacho mein se chota kaunsa hai
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] > this.heap[smallerChildIndex]) {
        // Swap karo agar parent bada hai
        [this.heap[index], this.heap[smallerChildIndex]] = [this.heap[smallerChildIndex], this.heap[index]];
        index = smallerChildIndex;
      } else {
        break;
      }
    }
  }
}

// --- TESTING THE PIPELINE ---
const myHeap = new MinHeap();

console.log("Adding 10, 5, 15, 2...");
myHeap.insert(10);
myHeap.insert(5);
myHeap.insert(15);
myHeap.insert(2);

console.log("Heap Structure:", myHeap.heap); // Expect: [2, 5, 15, 10]

console.log("Extracting Min (Should be 2):", myHeap.extractMin());
console.log("Heap after extraction:", myHeap.heap); // Next min (5) will be at root