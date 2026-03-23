/**
 * FILE: 68_Graph_DetectCycle_Undirected.js
 * Pattern: DFS with Parent Tracking
 * Efficiency: O(V + E)
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

    // --- THE CYCLE DETECTOR ENGINE ---
    isCyclic() {
        const visited = {};

        // Poore graph ko scan karo (taake disconnected islands bhi cover hon)
        for (let vertex in this.adjacencyList) {
            if (!visited[vertex]) {
                // Agar kisi bhi hissay mein cycle mil jaye
                if (this._detectCycleDFS(vertex, null, visited)) return true;
            }
        }
        return false;
    }

    _detectCycleDFS(curr, parent, visited) {
        visited[curr] = true;

        for (let neighbor of this.adjacencyList[curr]) {
            // Case 1: Agar dost visited nahi hai, toh aage check karo
            if (!visited[neighbor]) {
                if (this._detectCycleDFS(neighbor, curr, visited)) return true;
            } 
            // Case 2: Agar dost visited hai AUR wo mera baap (parent) nahi hai
            // Iska matlab hai koi aur rasta bhi yahan pohnch raha hai! (CYCLE)
            else if (neighbor !== parent) {
                return true;
            }
        }
        return false;
    }
}

// --- EXECUTION ---
const monitor = new Graph();
monitor.addVertex("A"); monitor.addVertex("B"); monitor.addVertex("C");

// Scenario 1: No Cycle (A - B - C)
monitor.addEdge("A", "B");
monitor.addEdge("B", "C");
console.log("Kya is network mein cycle hai?", monitor.isCyclic()); // false

// Scenario 2: Adding a Cycle (C - A)
monitor.addEdge("C", "A"); // Ab rasta ban gaya A-B-C-A
console.log("Cycle add karne ke baad?", monitor.isCyclic()); // true