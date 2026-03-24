class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Pehle nodes add karne ka function
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  // 1. ADD EDGE (Rasta banana)
  addEdge(v1, v2) {
    // Safety Check: Dono nodes maujood hone chahiye
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      // Undirected graph mein dono taraf entry hoti hai
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
      console.log(`✅ Edge added between ${v1} and ${v2}`);
    } else {
      console.log("❌ Error: One or both vertices do not exist.");
    }
  }

  // 2. REMOVE EDGE (Rasta torna)
  removeEdge(v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      // Filter use karke us specific node ko array se nikaal dein
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
      console.log(`🗑️ Edge removed between ${v1} and ${v2}`);
    }
  }

  display() {
    console.log("Graph State:", this.adjacencyList);
  }
}

// --- TESTING THE CODE ---
const myNetwork = new Graph();

// Nodes banayein
myNetwork.addVertex("A");
myNetwork.addVertex("B");
myNetwork.addVertex("C");

// Test 1: Add Edges
myNetwork.addEdge("A", "B");
myNetwork.addEdge("B", "C");
myNetwork.display(); 
// Expected: A: [B], B: [A, C], C: [B]

// Test 2: Remove Edge
myNetwork.removeEdge("A", "B");
myNetwork.display();
// Expected: A: [], B: [C], C: [B]