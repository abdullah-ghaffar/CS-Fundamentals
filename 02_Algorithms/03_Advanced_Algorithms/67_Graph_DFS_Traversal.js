/**
 * FILE: 67_Graph_DFS_Traversal.js
 * Pattern: Depth-First Search (Recursive)
 * Efficiency: O(V + E) - Har node aur rasta aik baar scan hota hai
 */

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(v) {
        if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    // --- THE DFS ENGINE ---
    dfsRecursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList; // Closure ke liye copy kiya

        // Helper function jo gehrai mein jayega
        function traverse(vertex) {
            if (!vertex) return null; // Base case

            visited[vertex] = true; // Mark as seen
            result.push(vertex);

            // Neighbors par loop
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    // JADU: Agar rasta mila, toh mazeed gehrai mein jao!
                    return traverse(neighbor);
                }
            });
        }

        traverse(start);
        return result;
    }
}

// --- EXECUTION ---
const g = new Graph();
g.addVertex("A"); g.addVertex("B"); g.addVertex("C");
g.addVertex("D"); g.addVertex("E"); g.addVertex("F");

g.addEdge("A", "B"); // A - B
g.addEdge("A", "C"); // A - C
g.addEdge("B", "D"); // B - D
g.addEdge("C", "E"); // C - E
g.addEdge("D", "E"); // D - E
g.addEdge("D", "F"); // D - F

console.log("DFS Visit Order (Depth First):");
console.log(g.dfsRecursive("A")); 
// Output: [ 'A', 'B', 'D', 'E', 'C', 'F' ] 
// (A ke baad B, phir B ke andar D, phir D ke andar E... BFS ki tarah level nahi skip karta)