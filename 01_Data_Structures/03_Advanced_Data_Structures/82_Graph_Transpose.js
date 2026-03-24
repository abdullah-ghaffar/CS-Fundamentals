class DirectedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
  }

  addEdge(source, destination) {
    if (!this.adjacencyList[source]) this.addVertex(source);
    if (!this.adjacencyList[destination]) this.addVertex(destination);
    this.adjacencyList[source].push(destination);
  }

  // --- TRANSPOSE LOGIC ---
  transpose() {
    const transposedGraph = new DirectedGraph();

    // 1. Pehle saare original nodes naye graph mein add karein
    for (let vertex in this.adjacencyList) {
      transposedGraph.addVertex(vertex);
    }

    // 2. Edges ko ulta karke add karein
    for (let vertex in this.adjacencyList) {
      this.adjacencyList[vertex].forEach(neighbor => {
        // Original: vertex -> neighbor
        // Transpose: neighbor -> vertex
        transposedGraph.addEdge(neighbor, vertex);
      });
    }

    return transposedGraph;
  }

  display(label = "Graph") {
    console.log(`--- ${label} ---`);
    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
    }
  }
}

// --- TESTING THE TRANSPOSE ---
const original = new DirectedGraph();
original.addEdge("A", "B");
original.addEdge("B", "C");
original.addEdge("C", "A");
original.addEdge("A", "D");

original.display("Original Directed Graph");

const reversed = original.transpose();
reversed.display("Transposed (Reversed) Graph");

/* Expected Output Check:
   Original: A -> B, D | B -> C | C -> A
   Transpose: B -> A | D -> A | C -> B | A -> C
*/