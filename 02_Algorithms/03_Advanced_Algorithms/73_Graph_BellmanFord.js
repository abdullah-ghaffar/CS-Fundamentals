class BellmanFord {
  constructor(vertices) {
    this.V = vertices;
    this.edges = [];
  }

  // Edge add karna (Source, Destination, Weight)
  addEdge(u, v, w) {
    this.edges.push({ u, v, w });
  }

  solve(startNode) {
    const distances = {};
    
    // 1. Initial State: Sab ko Infinity kar do
    // Hum nodes ke naam objects ki keys se nikaal rahe hain
    const nodes = new Set();
    this.edges.forEach(e => { nodes.add(e.u); nodes.add(e.v); });
    
    nodes.forEach(node => distances[node] = Infinity);
    distances[startNode] = 0;

    // 2. Relax all edges (V - 1) times
    for (let i = 0; i < this.V - 1; i++) {
      for (let { u, v, w } of this.edges) {
        if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
          distances[v] = distances[u] + w;
        }
      }
    }

    // 3. Negative Cycle Detection
    for (let { u, v, w } of this.edges) {
      if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
        console.log("⚠️ WARNING: Negative Cycle Detected! No stable shortest path.");
        return null;
      }
    }

    return distances;
  }
}

// --- TESTING THE DISCOUNT ENGINE ---
const graph = new BellmanFord(5);

graph.addEdge("A", "B", -1); // Negative Weight (Discount)
graph.addEdge("A", "C", 4);
graph.addEdge("B", "C", 3);
graph.addEdge("B", "D", 2);
graph.addEdge("B", "E", 2);
graph.addEdge("D", "B", 1);
graph.addEdge("E", "D", -3); // Huge Discount

const result = graph.solve("A");

if (result) {
  console.log("Shortest Distances from A:");
  console.table(result);
}