// 1. DISJOINT SET (Union-Find) - Cycle check karne ke liye
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    // Path Compression for speed
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true; // Successfully connected
    }
    return false; // Already connected (Cycle alert!)
  }
}

// 2. KRUSKAL'S ENGINE
class KruskalMST {
  constructor(numVertices) {
    this.V = numVertices;
    this.edges = [];
  }

  addEdge(u, v, weight) {
    this.edges.push({ u, v, weight });
  }

  findMST() {
    const mst = [];
    const ds = new DisjointSet(this.V);

    // STEP 1: Sort edges by weight (Cheapest first)
    this.edges.sort((a, b) => a.weight - b.weight);

    // STEP 2: Iterate through sorted edges
    for (let edge of this.edges) {
      // STEP 3: Check if adding this edge creates a cycle
      if (ds.union(edge.u, edge.v)) {
        mst.push(edge);
      }

      // Optimization: MST mein hamesha (V-1) edges hoti hain
      if (mst.length === this.V - 1) break;
    }

    return mst;
  }
}

// --- TESTING THE BRIDGE PROJECT ---
// Let's say: 0:Island A, 1:Island B, 2:Island C, 3:Island D
const project = new KruskalMST(4);

project.addEdge(0, 1, 10);
project.addEdge(0, 2, 6);
project.addEdge(0, 3, 5);
project.addEdge(1, 3, 15);
project.addEdge(2, 3, 4);

const result = project.findMST();

console.log("Minimum Bridges to Build:");
console.table(result);

const totalCost = result.reduce((sum, e) => sum + e.weight, 0);
console.log(`Total Cost: ${totalCost}`);