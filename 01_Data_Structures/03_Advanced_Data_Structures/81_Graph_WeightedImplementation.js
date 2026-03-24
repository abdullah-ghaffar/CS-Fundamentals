class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1. ADD VERTEX
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // 2. ADD WEIGHTED EDGE (Node + Weight)
  addEdge(v1, v2, weight) {
    // Safety: Check if vertices exist
    if (!this.adjacencyList[v1]) this.addVertex(v1);
    if (!this.adjacencyList[v2]) this.addVertex(v2);

    // Array mein object push karein
    this.adjacencyList[v1].push({ node: v2, weight: weight });
    this.adjacencyList[v2].push({ node: v1, weight: weight });
    
    console.log(`✅ Edge: ${v1} <-> ${v2} (Weight: ${weight})`);
  }

  // 3. DISPLAY
  display() {
    for (let vertex in this.adjacencyList) {
      let connections = this.adjacencyList[vertex]
        .map(edge => `${edge.node}(w:${edge.weight})`)
        .join(", ");
      console.log(`${vertex} -> [ ${connections} ]`);
    }
  }
}

// --- TESTING THE PIPELINE ---
const cityMap = new WeightedGraph();

console.log("--- Building Weighted Routes ---");
cityMap.addEdge("Karachi", "Hyderabad", 160);
cityMap.addEdge("Hyderabad", "Sukkur", 300);
cityMap.addEdge("Sukkur", "Multan", 450);
cityMap.addEdge("Karachi", "Sukkur", 480); // Alternate route

cityMap.display();

/* Expected Output:
  Karachi -> [ Hyderabad(w:160), Sukkur(w:480) ]
  Hyderabad -> [ Karachi(w:160), Sukkur(w:300) ]
  ...
*/

// --- Logic Check ---
console.log("\n--- Checking Connection ---");
const khiNeighbors = cityMap.adjacencyList["Karachi"];
console.log(`Karachi has ${khiNeighbors.length} connections.`);