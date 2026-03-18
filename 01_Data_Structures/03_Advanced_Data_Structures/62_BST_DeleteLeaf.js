/**
 * FILE: 62_BST_DeleteLeaf.js
 * Pattern: BST Pruning (Leaf Removal)
 * Complexity: O(H) where H is height of the tree
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function deleteNode(root, value) {
    if (!root) return null;

    // 1. Dhoondo node kahan hai (Recursion)
    if (value < root.data) {
        root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
        root.right = deleteNode(root.right, value);
    } else {
        // 2. Found! (Case 1: Leaf Node)
        if (!root.left && !root.right) {
            console.log(`[System] Leaf node ${value} deleted.`);
            return null; // Parent ko null bhej do (delete ho gaya)
        }
    }
    return root;
}

// --- EXECUTION ---
let root = new TreeNode(10);
root.left = new TreeNode(5); // Yeh leaf node hai (no children)
root.right = new TreeNode(15);

console.log("Before Delete:", root.left.data); // 5
root = deleteNode(root, 5); // 5 ko delete karo
console.log("After Delete (root.left):", root.left); // null