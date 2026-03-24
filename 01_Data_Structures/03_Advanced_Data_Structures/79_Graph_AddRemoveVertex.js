class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1. ADD VERTEX (Naya shehar add karein)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      console.log(`✅ Vertex '${vertex}' added.`);
    }
  }

  // Helper: Edge banane ke liye (testing ke liye zaroori hai)
  addEdge(v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    }
  }

  // 2. REMOVE VERTEX (Shehar aur uske raste khatam karein)
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return null;

    // Step A: Is node ke tamam doston (neighbors) se kaho ke wo ise bhool jayen
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }

    // Step B: Node ko hi delete kar do
    delete this.adjacencyList[vertex];
    console.log(`🗑️ Vertex '${vertex}' and its edges removed.`);
  }

  // Helper: Connection khatam karne ke liye
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  display() {
    console.log("Current Graph:", JSON.stringify(this.adjacencyList, null, 2));
  }
}

// --- TESTING THE PIPELINE ---
const pakistanMap = new Graph();

// Test 1: Adding Nodes
pakistanMap.addVertex("Karachi");
pakistanMap.addVertex("Lahore");
pakistanMap.addVertex("Islamabad");

// Test 2: Connecting them
pakistanMap.addEdge("Karachi", "Lahore");
pakistanMap.addEdge("Lahore", "Islamabad");
pakistanMap.display();

// Test 3: Removing a Node (Lahore)
// Logic Check: Lahore delete hone se Karachi-Lahore aur Lahore-Islamabad dono raste khatam hone chahiye.
pakistanMap.removeVertex("Lahore");
pakistanMap.display();