class DAryHeap {
  constructor(d) {
    this.d = d; // Bachon ki tadad (e.g., 3 or 4)
    this.heap = [];
  }

  // Helper: Parent index nikalna
  getParentIndex(i) {
    return Math.floor((i - 1) / this.d);
  }

  // 1. INSERT (Heapify Up)
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      let pIndex = this.getParentIndex(index);
      if (this.heap[index] < this.heap[pIndex]) { // Min-Heap logic
        [this.heap[index], this.heap[pIndex]] = [this.heap[pIndex], this.heap[index]];
        index = pIndex;
      } else { break; }
    }
  }

  // 2. EXTRACT (Heapify Down - Simplified for Logic)
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return min;
  }

  heapifyDown(index) {
    let smallest = index;
    // Har node ke 'D' bachon ko check karna
    for (let i = 1; i <= this.d; i++) {
      let childIndex = this.d * index + i;
      if (childIndex < this.heap.length && this.heap[childIndex] < this.heap[smallest]) {
        smallest = childIndex;
      }
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.heapifyDown(smallest);
    }
  }
}

// --- TESTING THE 3-ARY HEAP ---
const my3AryHeap = new DAryHeap(3); // Har node ke 3 bache

console.log("--- Inserting 10, 5, 15, 2, 8, 20 ---");
[10, 5, 15, 2, 8, 20].forEach(v => my3AryHeap.insert(v));

console.log("3-Ary Heap Array:", my3AryHeap.heap);
// Logical Check: Parent of index 5 (value 20) should be (5-1)/3 = index 1 (value 5).

console.log("Extracted Min:", my3AryHeap.extractMin()); // Should be 2