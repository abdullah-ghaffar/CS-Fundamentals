class DirectedGraph {
  constructor() {
    // Map use karne se hum nodes ke naam String bhi rakh sakte hain
    this.adjacencyList = new Map();
  }

  // 1. ADD VERTEX (Node banana)
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // 2. ADD EDGE (Directed Connection: From -> To)
  addEdge(source, destination) {
    // Pehle check karein ke dono nodes exist karte hain
    if (!this.adjacencyList.has(source)) this.addVertex(source);
    if (!this.adjacencyList.has(destination)) this.addVertex(destination);

    // Sirf source ki list mein destination add karein (Aik tarfa rasta)
    this.adjacencyList.get(source).push(destination);
  }

  // 3. DISPLAY GRAPH
  display() {
    for (let [node, neighbors] of this.adjacencyList) {
      console.log(`${node} -> ${neighbors.join(", ")}`);
    }
  }
}

// --- TESTING THE DIRECTED GRAPH ---
const travelRoute = new DirectedGraph();

console.log("--- Creating Flight Routes ---");
travelRoute.addEdge("Karachi", "Lahore");
travelRoute.addEdge("Lahore", "Islamabad");
travelRoute.addEdge("Islamabad", "Karachi"); // Cyclic route
travelRoute.addEdge("Lahore", "Multan");

travelRoute.display();
/* Expected Output:
  Karachi -> Lahore
  Lahore -> Islamabad, Multan
  Islamabad -> Karachi
  Multan -> (Khali)
*/

console.log("\n--- Checking Neighbors ---");
console.log("Lahore se kahan ja sakte hain?", travelRoute.adjacencyList.get("Lahore"));