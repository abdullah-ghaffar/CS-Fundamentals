/**
 * FILE: 56_Tree_BinaryTreeNode.js
 * Pattern: Binary Node Definition
 */

class TreeNode {
    constructor(data) {
        this.data = data;   // Dabba jismein data rakha hai
        this.left = null;   // Left rasta
        this.right = null;  // Right rasta
    }
}

// --- EXECUTION: Aik chota sa Tree banate hain ---
const root = new TreeNode("Root: Spam Filter"); // Sab se oopar wala dabba
const leftChild = new TreeNode("Left: Check Subject");
const rightChild = new TreeNode("Right: Check Sender");

// Inhein aapas mein jorna
root.left = leftChild;
root.right = rightChild;

console.log("Tree Structure:", root);