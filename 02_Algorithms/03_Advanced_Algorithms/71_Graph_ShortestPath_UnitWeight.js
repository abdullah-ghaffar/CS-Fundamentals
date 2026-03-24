class ShortestPathBFS {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    this.adjacencyList[v] = [];
  }

  addEdge(u, v) {
    this.adjacencyList[u].push(v);
    this.adjacencyList[v].push(u); // Undirected
  }

  findPath(start, end) {
    const queue = [start];
    const distances = {};
    const previous = {};
    const path = [];

    // Sab distances ko Infinity kar dein
    for (let node in this.adjacencyList) {
      distances[node] = Infinity;
      previous[node] = null;
    }

    distances[start] = 0;

    while (queue.length > 0) {
      let current = queue.shift();

      if (current === end) {
        // Target mil gaya, ab rasta wapis trace karein
        let temp = end;
        while (temp !== null) {
          path.push(temp);
          temp = previous[temp];
        }
        return { 
            path: path.reverse(), 
            distance: distances[end] 
        };
      }

      for (let neighbor of this.adjacencyList[current]) {
        if (distances[neighbor] === Infinity) { // Agar pehle visit nahi hua
          distances[neighbor] = distances[current] + 1;
          previous[neighbor] = current;
          queue.push(neighbor);
        }
      }
    }
    return "No path found";
  }
}

// --- TESTING THE CONNECTION ---
const network = new ShortestPathBFS();
["Me", "Friend A", "Friend B", "Mutual", "Target"].forEach(n => network.addVertex(n));

network.addEdge("Me", "Friend A");
network.addEdge("Friend A", "Mutual");
network.addEdge("Me", "Friend B");
network.addEdge("Friend B", "Mutual");
network.addEdge("Mutual", "Target");

const result = network.findPath("Me", "Target");
console.log(`Shortest Path: ${result.path.join(" -> ")}`);
console.log(`Degrees of Separation: ${result.distance}`); 
// Expected: Me -> Friend A -> Mutual -> Target (3 steps)