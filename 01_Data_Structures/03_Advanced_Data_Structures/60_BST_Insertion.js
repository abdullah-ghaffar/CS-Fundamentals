/**
 * FILE: 60_BST_Insertion.js
 * Pattern: Binary Search Tree Insertion
 * Efficiency: O(log N) Average case for search/insert
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            // Agar data barabar hai toh duplicate nahi daalna
            if (data === current.data) return undefined; 

            if (data < current.data) {
                // Left side check karo
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                // Right side check karo
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
}

// --- EXECUTION ---
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(2);

console.log("BST ka Root:", bst.root.data);
console.log("Left child:", bst.root.left.data);   // 5
console.log("Right child:", bst.root.right.data); // 15