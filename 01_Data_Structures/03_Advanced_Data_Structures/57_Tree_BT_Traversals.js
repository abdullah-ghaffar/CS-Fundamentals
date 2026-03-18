/**
 * FILE: 57_Tree_BT_Traversals.js
 * Pattern: Depth-First Search (Recursive)
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor(rootData) {
        this.root = new TreeNode(rootData);
    }

    // 1. PRE-ORDER: Root -> Left -> Right
    preOrder(node = this.root) {
        if (!node) return;
        console.log(node.data); // Root
        this.preOrder(node.left); // Left
        this.preOrder(node.right); // Right
    }

    // 2. IN-ORDER: Left -> Root -> Right
    inOrder(node = this.root) {
        if (!node) return;
        this.inOrder(node.left);
        console.log(node.data); // Root
        this.inOrder(node.right);
    }

    // 3. POST-ORDER: Left -> Right -> Root
    postOrder(node = this.root) {
        if (!node) return;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.data); // Root
    }
}

// --- EXECUTION ---
const tree = new BinaryTree(10);
tree.root.left = new TreeNode(5);
tree.root.right = new TreeNode(15);

console.log("Pre-order:"); tree.preOrder(); 
console.log("In-order:"); tree.inOrder();
console.log("Post-order:"); tree.postOrder();