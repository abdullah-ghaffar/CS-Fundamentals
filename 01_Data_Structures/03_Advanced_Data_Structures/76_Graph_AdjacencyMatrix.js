class GraphMatrix {
  constructor(numNodes) {
    this.numNodes = numNodes;
    // Step 1: Initialize V x V matrix with all zeros
    this.matrix = Array.from({ length: numNodes }, () => Array(numNodes).fill(0));
  }

  // 1. ADD EDGE (Connection banana)
  addEdge(u, v) {
    // Undirected graph ke liye dono taraf 1 karna parta hai
    this.matrix[u][v] = 1;
    this.matrix[v][u] = 1;
  }

  // 2. REMOVE EDGE (Connection khatam karna)
  removeEdge(u, v) {
    this.matrix[u][v] = 0;
    this.matrix[v][u] = 0;
  }

  // 3. CHECK CONNECTION (Is Edge present?)
  hasEdge(u, v) {
    return this.matrix[u][v] === 1;
  }

  // 4. DISPLAY MATRIX
  display() {
    console.log("Adjacency Matrix:");
    this.matrix.forEach(row => console.log(row.join(" ")));
  }
}

// --- TESTING THE MATRIX ---
const myGraph = new GraphMatrix(4); // 4 Nodes (0, 1, 2, 3)

myGraph.addEdge(0, 1);
myGraph.addEdge(0, 2);
myGraph.addEdge(1, 3);

myGraph.display();
/* Expected Output:
   0 1 1 0
   1 0 0 1
   1 0 0 0
   0 1 0 0
*/

console.log("\n--- Testing Connections ---");
console.log("Is 0 connected to 1?", myGraph.hasEdge(0, 1)); // Expected: true
console.log("Is 2 connected to 3?", myGraph.hasEdge(2, 3)); // Expected: false