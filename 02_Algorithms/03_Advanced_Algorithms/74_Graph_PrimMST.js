class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
  }

  addEdge(u, v, weight) {
    if (!this.adjacencyList[u]) this.addVertex(u);
    if (!this.adjacencyList[v]) this.addVertex(v);
    this.adjacencyList[u].push({ node: v, weight });
    this.adjacencyList[v].push({ node: u, weight });
  }

  // --- PRIM'S ALGORITHM ---
  primMST(startNode) {
    const pq = new PriorityQueue();
    const mst = [];
    const visited = new Set();

    // Shuruati node ko visit karein
    visited.add(startNode);

    // Iske neighbors ko queue mein dalain
    this.adjacencyList[startNode].forEach(edge => {
      pq.enqueue({ from: startNode, to: edge.node, weight: edge.weight }, edge.weight);
    });

    while (!pq.isEmpty()) {
      const { val, priority } = pq.dequeue();
      const { from, to, weight } = val;

      // Agar destination node pehle se visited hai, to skip karein (Cycle Avoidance)
      if (visited.has(to)) continue;

      // MST mein shamil karein
      visited.add(to);
      mst.push({ from, to, weight });

      // Naye node ke neighbors ko queue mein dalain
      this.adjacencyList[to].forEach(edge => {
        if (!visited.has(edge.node)) {
          pq.enqueue({ from: to, to: edge.node, weight: edge.weight }, edge.weight);
        }
      });
    }

    return mst;
  }
}

// --- TESTING THE FIBER LAYOUT ---
const society = new Graph();
society.addEdge("A", "B", 2);
society.addEdge("A", "C", 3);
society.addEdge("B", "C", 1);
society.addEdge("B", "D", 1);
society.addEdge("C", "D", 4);

const result = society.primMST("A");
console.log("Minimum Spanning Tree (Wires):");
console.table(result);

// Total Cost Calculate karein
const totalCost = result.reduce((sum, edge) => sum + edge.weight, 0);
console.log(`Total Minimum Cost: ${totalCost}`);