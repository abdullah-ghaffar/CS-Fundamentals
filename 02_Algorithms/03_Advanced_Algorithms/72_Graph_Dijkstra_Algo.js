// 1. Priority Queue: Sab se chota distance pehle nikalne ke liye
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
    // Priority ke mutabiq sort (Chota number = High Priority)
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

// 2. Weighted Graph: Jahan har raste ki apni "Cost" (Weight) hai
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight) {
    // Safety Check: Agar vertex nahi hai to bana do (Error Fix)
    if (!this.adjacencyList[v1]) this.addVertex(v1);
    if (!this.adjacencyList[v2]) this.addVertex(v2);

    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  // --- DIJKSTRA ENGINE ---
  findShortestPath(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; 
    let smallest;

    // Initialization
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // Main Loop
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        // Goal mil gaya! Ab rasta wapis trace (build) karein
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor of this.adjacencyList[smallest]) {
          // Naya distance calculate karein (Current Distance + Edge Weight)
          let candidate = distances[smallest] + neighbor.weight;
          let nextNeighbor = neighbor.node;

          if (candidate < distances[nextNeighbor]) {
            // Relaxation: Behtar rasta mil gaya!
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    // Result ko reverse karke start se end tak dikhayein
    return path.concat(start).reverse();
  }
}

// --- TESTING THE ENGINE ---
const map = new WeightedGraph();

map.addEdge("A", "B", 4);
map.addEdge("A", "C", 2);
map.addEdge("B", "E", 3);
map.addEdge("C", "D", 2);
map.addEdge("C", "F", 4);
map.addEdge("D", "E", 3);
map.addEdge("D", "F", 1);
map.addEdge("E", "F", 1);

const result = map.findShortestPath("A", "E");
console.log("Shortest Path from A to E:", result); 
// Expected Result: ["A", "C", "D", "F", "E"]