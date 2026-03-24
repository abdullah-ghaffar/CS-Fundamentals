class UndirectedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1. ADD VERTEX (Node banana)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // 2. ADD EDGE (Two-way Connection)
  addEdge(v1, v2) {
    // Pehle nodes create karein agar nahi hain
    if (!this.adjacencyList[v1]) this.addVertex(v1);
    if (!this.adjacencyList[v2]) this.addVertex(v2);

    // Dono taraf push karein (Main Logic)
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  // 3. REMOVE EDGE (Connection khatam karna)
  removeEdge(v1, v2) {
    if (this.adjacencyList[v1]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    }
    if (this.adjacencyList[v2]) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
  }

  // 4. DISPLAY
  display() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " <-> " + this.adjacencyList[vertex].join(", "));
    }
  }
}

// --- TESTING THE UNDIRECTED GRAPH ---
const socialNetwork = new UndirectedGraph();

console.log("--- Connecting Friends ---");
socialNetwork.addEdge("Ali", "Hamza");
socialNetwork.addEdge("Hamza", "Zain");
socialNetwork.addEdge("Zain", "Ali"); // Triangle connection
socialNetwork.addEdge("Ali", "Sara");

socialNetwork.display();
/* Expected Output:
  Ali <-> Hamza, Zain, Sara
  Hamza <-> Ali, Zain
  Zain <-> Hamza, Ali
  Sara <-> Ali
*/

console.log("\n--- Testing Removal ---");
socialNetwork.removeEdge("Ali", "Zain");
console.log("After removing Ali-Zain edge:");
socialNetwork.display();