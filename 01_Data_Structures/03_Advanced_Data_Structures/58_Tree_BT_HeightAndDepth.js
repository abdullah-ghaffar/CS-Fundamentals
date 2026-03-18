/**
 * FILE: 58_Tree_BT_HeightAndDepth.js
 * Pattern: Depth-First Recursive Calculation
 * Efficiency: O(N) - We must visit every node to know the max height.
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function getHeight(node) {
    // Base Case: Agar node nahi hai, toh height 0
    if (!node) return 0;

    // Recursion: Left aur Right dono ki height pucho
    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    // [Architectural Choice]: Math.max() use karke bara rasta chuno + 1 (khud ko ginne ke liye)
    return Math.max(leftHeight, rightHeight) + 1;
}

// --- EXECUTION (Check the depth) ---
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2); // 10 -> 5 -> 2

console.log("Tree ki Height (Levels):", getHeight(root)); 
// Output: 3 (Levels: 10, 5, 2)