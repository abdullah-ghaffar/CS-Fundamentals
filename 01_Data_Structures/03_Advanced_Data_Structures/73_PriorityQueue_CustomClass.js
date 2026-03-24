class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // 1. INSERT (Enqueue)
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.heap.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      // MinHeap Logic: Agar naye element ki priority parent se kam hai (High Priority)
      if (element.priority >= parent.priority) break;

      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  // 2. EXTRACT (Dequeue)
  dequeue() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }
}

// --- TESTING THE PRIORITY QUEUE ---
const ER = new PriorityQueue();

console.log("--- Enqueueing Tasks ---");
ER.enqueue("Common Cold", 5);
ER.enqueue("Gunshot Wound", 1); // High Priority (Smallest number)
ER.enqueue("High Fever", 3);
ER.enqueue("Broken Arm", 2);

console.log("Heap Structure (by Priority):", ER.heap.map(n => n.priority));

console.log("\n--- Processing Tasks (Dequeue) ---");
console.log("Processing:", ER.dequeue().val); // Expected: Gunshot Wound (1)
console.log("Processing:", ER.dequeue().val); // Expected: Broken Arm (2)
console.log("Processing:", ER.dequeue().val); // Expected: High Fever (3)