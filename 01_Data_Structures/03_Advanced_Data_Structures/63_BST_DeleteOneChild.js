/**
 * FILE: 63_BST_DeleteOneChild.js
 * Pattern: BST Node Bypass (One-Child Deletion)
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

    // Search logic (Recursion)
    if (value < root.data) {
        root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
        root.right = deleteNode(root.right, value);
    } else {
        // --- CASE 1 & 2: Leaf or One-Child ---
        
        // Agar koi Left child nahi hai, Right ko bhej do (Bypass)
        if (!root.left) return root.right;
        
        // Agar koi Right child nahi hai, Left ko bhej do (Bypass)
        if (!root.right) return root.left;

        // Note: Case 3 (Two-Children) baad mein aayega
    }
    return root;
}

// --- EXECUTION ---
let root = new TreeNode(10);
root.left = new TreeNode(5); 
root.left.left = new TreeNode(2); // 5 ke niche 2 hai

console.log("Before: Root(10) -> Left(5) -> Left(2)");

// 5 ko delete karo. Iska aik child (2) hai.
root = deleteNode(root, 5); 

console.log("After: Root(10) -> Left(2)"); 
// Output: root.left ab 2 ho gaya, 5 gayab ho gaya!