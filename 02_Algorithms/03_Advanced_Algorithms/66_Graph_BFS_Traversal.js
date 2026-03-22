/**
 * FILE: 66_Graph_BFS_Traversal.js
 * Pattern: Level-Order Traversal (BFS)
 * Efficiency: O(V + E) - Har node aur har link ko aik baar dekha jata hai
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

    // --- THE BFS ENGINE ---
    bfs(start) {
        const queue = [start];        // Line mein lag jao
        const result = [];           // Kis tarteeb mein log miley
        const visited = {};          // Kaun check ho chuka hai
        
        visited[start] = true;

        while (queue.length > 0) {
            // Line ke sab se aage wala banda nikalo
            let currentVertex = queue.shift();
            result.push(currentVertex);

            // Uske padosiyon (Neighbors) ko dekho
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true; // Mark as seen
                    queue.push(neighbor);    // Line ke aakhir mein lagao
                }
            });
        }

        return result;
    }
}

// --- EXECUTION ---
const socialNetwork = new Graph();
socialNetwork.addVertex("A");
socialNetwork.addVertex("B");
socialNetwork.addVertex("C");
socialNetwork.addVertex("D");
socialNetwork.addVertex("E");

socialNetwork.addEdge("A", "B"); // A - B
socialNetwork.addEdge("A", "C"); // A - C
socialNetwork.addEdge("B", "D"); // B - D
socialNetwork.addEdge("C", "E"); // C - E
socialNetwork.addEdge("D", "E"); // D - E

console.log("BFS Visit Order (Starting from A):");
console.log(socialNetwork.bfs("A")); 
// Output: [ 'A', 'B', 'C', 'D', 'E' ] 
// (A ke baad pehle B aur C (Level 1) aayenge, phir D aur E (Level 2))