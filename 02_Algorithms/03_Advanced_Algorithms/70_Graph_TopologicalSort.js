class TopologicalSort {
  constructor() {
    this.adjacencyList = {};
    this.inDegree = {};
  }

  addVertex(v) {
    this.adjacencyList[v] = [];
    this.inDegree[v] = 0;
  }

  addEdge(u, v) {
    // Directed Edge: u -> v (u pehle hona chahiye v se)
    this.adjacencyList[u].push(v);
    this.inDegree[v]++;
  }

  sort() {
    let queue = [];
    let result = [];

    // Step 1: Wo nodes dhundo jin par koi dependency nahi (In-degree 0)
    for (let v in this.inDegree) {
      if (this.inDegree[v] === 0) queue.push(v);
    }

    // Step 2: Process nodes
    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current);

      // Neighbors ki dependency kam karo
      this.adjacencyList[current].forEach(neighbor => {
        this.inDegree[neighbor]--;
        if (this.inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }

    // Step 3: Cycle Check (Agar result ki length nodes se kam hai)
    if (result.length !== Object.keys(this.adjacencyList).length) {
      return "Cycle Detected! Topological Sort not possible.";
    }

    return result;
  }
}

// --- TESTING THE PLANNER ---
const planner = new TopologicalSort();

// Courses setup
["PF", "DS", "Algo", "Web", "DB"].forEach(c => planner.addVertex(c));

planner.addEdge("PF", "DS");   // PF -> DS
planner.addEdge("DS", "Algo"); // DS -> Algo
planner.addEdge("PF", "Web");  // PF -> Web
planner.addEdge("DB", "Web");  // DB -> Web

console.log("Recommended Course Order:", planner.sort());
// Expected Output: ["PF", "DB", "DS", "Web", "Algo"] (Order badal sakta hai lekin rules nahi tootenge)