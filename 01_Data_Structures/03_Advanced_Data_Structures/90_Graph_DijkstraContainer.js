// Simple Priority Queue for Dijkstra
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
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  // --- THE DIJKSTRA ENGINE ---
  findShortestPath(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // Final rasta store karne ke liye
    let smallest;

    // Phase 1: Initial State setup
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

    // Phase 2: Main Loop
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        // Rasta mil gaya! Ab wapis trace back karein
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor of this.adjacencyList[smallest]) {
          // Naya distance calculate karein
          let candidate = distances[smallest] + neighbor.weight;
          let nextNeighbor = neighbor.node;

          if (candidate < distances[nextNeighbor]) {
            // "Relaxation": Naya behtar rasta mil gaya
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(start).reverse();
  }
}

// --- TESTING THE ENGINE ---
const g = new WeightedGraph();
g.addVertex("A"); g.addVertex("B"); g.addVertex("C");
g.addVertex("D"); g.addVertex("E"); g.addVertex("F");

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

console.log("Shortest Path from A to E:", g.findShortestPath("A", "E")); 
// Expected Output: ["A", "C", "D", "F", "E"]