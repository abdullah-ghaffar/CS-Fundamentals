/**
 * FILE: 61_BST_Search.js
 * Pattern: Binary Search Tree (with Insert & Search)
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

    // Yeh function missing tha, isliye error aa raha tha
    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            if (data === current.data) return undefined;
            if (data < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Search function
    search(value) {
        if (!this.root) return false;
        
        let current = this.root;
        while (current) {
            if (value === current.data) return true;
            
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
}

// --- EXECUTION ---
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);

console.log("Kya 15 Tree mein hai?", bst.search(15)); // true
console.log("Kya 7 Tree mein hai?", bst.search(7));   // false