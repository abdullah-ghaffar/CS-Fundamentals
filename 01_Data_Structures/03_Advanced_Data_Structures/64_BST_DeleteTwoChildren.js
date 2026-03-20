/**
 * FILE: 64_BST_DeleteTwoChildren.js
 * Pattern: BST Successor Replacement (Case 3 Deletion)
 * Efficiency: O(H) where H is height of the tree
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Helper Function: Subtree mein sab se choti value dhoondna
function findMin(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
}

function deleteNode(root, value) {
    if (!root) return null;

    // 1. Search Phase
    if (value < root.data) {
        root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
        root.right = deleteNode(root.right, value);
    } 
    // 2. Target Found Phase
    else {
        // CASE 1 & 2: No child or One child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // CASE 3: Two Children (The Complex Case)
        console.log(`[System] Node ${value} has two children. Finding successor...`);
        
        // Step A: Right subtree mein sab se chota node dhoondo
        let temp = findMin(root.right);

        // Step B: Successor ki value ko current node mein copy karo
        root.data = temp.data;

        // Step C: Right subtree se us successor ko delete kar do
        root.right = deleteNode(root.right, temp.data);
    }
    return root;
}

// --- EXECUTION ---
let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.right.left = new TreeNode(12);
root.right.right = new TreeNode(20);

// Tree:      10
//           /  \
//          5    15
//              /  \
//             12   20

console.log("Root before deleting 15:", root.right.data); // 15

// 15 ko delete karo (Iske do bachay hain: 12 aur 20)
root = deleteNode(root, 15);

console.log("New node at 15's position:", root.right.data); 
// Output: 20 (Successor) ya 12 (Successor)? 
// Logic ke mutabiq 15 ke right (20) ka min 20 hi hai. 
// Agar 12 hota toh 12 successor banta.