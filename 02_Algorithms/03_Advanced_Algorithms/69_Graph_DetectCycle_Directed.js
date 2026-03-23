/**
 * FILE: 69_Graph_DetectCycle_Directed.js
 * Pattern: DFS with Recursion Stack (Backtracking)
 * Efficiency: O(V + E)
 */

class DirectedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(v) {
        if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
    }

    // Directed Link: A -> B (B -> A nahi hoga)
    addEdge(source, destination) {
        this.adjacencyList[source].push(destination);
    }

    // --- THE DIRECTED CYCLE DETECTOR ---
    hasCycle() {
        const visited = {};
        const recStack = {}; // Current path tracker

        for (let vertex in this.adjacencyList) {
            if (!visited[vertex]) {
                if (this._detectDFS(vertex, visited, recStack)) return true;
            }
        }
        return false;
    }

    _detectDFS(curr, visited, recStack) {
        visited[curr] = true;
        recStack[curr] = true; // Path mein shamil kiya

        for (let neighbor of this.adjacencyList[curr]) {
            // Case 1: Agar neighbor current path mein hai -> CYCLE!
            if (recStack[neighbor]) return true;

            // Case 2: Agar visited nahi hai, toh gehrai mein check karo
            if (!visited[neighbor]) {
                if (this._detectDFS(neighbor, visited, recStack)) return true;
            }
        }

        // BACKTRACK: Is node ka kaam khatam, path se nikal do
        recStack[curr] = false;
        return false;
    }
}

// --- EXECUTION ---
const compiler = new DirectedGraph();
compiler.addVertex("A"); compiler.addVertex("B"); compiler.addVertex("C");

// Scenario: A -> B -> C
compiler.addEdge("A", "B");
compiler.addEdge("B", "C");
console.log("Kya circular dependency hai?", compiler.hasCycle()); // false

// Adding Cycle: C -> A (Dependency Loop)
compiler.addEdge("C", "A");
console.log("Cycle add karne ke baad?", compiler.hasCycle()); // true