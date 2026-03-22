/**
 * FILE: 64_Backtrack_MColoring.js
 * Pattern: Graph Backtracking (Constraint Satisfaction)
 * Efficiency: O(M^V) - Where M is colors and V is vertices
 */

function solveGraphColoring(graph, m) {
    const v = graph.length;
    const colors = new Array(v).fill(0); // 0 ka matlab hai abhi koi color nahi diya

    function isSafe(vIndex, color) {
        // Har padosi (neighbor) ko check karo
        for (let i = 0; i < v; i++) {
            // Agar link hai (1) AUR padosi ka color wahi hai jo hum dena chahte hain
            if (graph[vIndex][i] === 1 && color === colors[i]) {
                return false;
            }
        }
        return true;
    }

    function backtrack(vIndex) {
        // Base Case: Agar saare nodes color ho gaye
        if (vIndex === v) return true;

        // 1 se M tak colors try karo
        for (let c = 1; c <= m; c++) {
            if (isSafe(vIndex, c)) {
                colors[vIndex] = c; // Color assign kiya

                // Aglay node par jao
                if (backtrack(vIndex + 1)) return true;

                // Backtrack: Agar solution nahi mila toh reset karo
                colors[vIndex] = 0;
            }
        }
        return false;
    }

    if (backtrack(0)) {
        console.log("Solution found! Node Colors:", colors);
        return true;
    } else {
        console.log("No solution exists with", m, "colors.");
        return false;
    }
}

// --- EXECUTION ---
// Graph: 4 nodes ka dabba (Square) jiske darmiyan bhi link hai
const networkGraph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
const m = 3; // Humare paas 3 colors (frequencies) hain

solveGraphColoring(networkGraph, m);