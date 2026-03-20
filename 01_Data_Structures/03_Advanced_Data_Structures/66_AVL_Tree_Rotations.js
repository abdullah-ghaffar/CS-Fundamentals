/**
 * FILE: 66_AVL_Tree_Rotations.js
 * Pattern: Self-Balancing Binary Search Tree (AVL)
 * Efficiency: Strictly O(log N) for Search, Insert, and Delete
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1; // Naya node hamesha level 1 par hota hai
    }
}

class AVLTree {
    // Helper: Node ki height nikalna (null safety ke sath)
    getHeight(node) {
        return node ? node.height : 0;
    }

    // Helper: Balance Factor nikalna
    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // --- ROTATION 1: RIGHT ROTATE ---
    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;

        // Rotation logic (Pointers ki adla-badli)
        x.right = y;
        y.left = T2;

        // Heights update karna
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x; // Naya root wapis bhej do
    }

    // --- ROTATION 2: LEFT ROTATE ---
    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    insert(node, data) {
        // 1. Normal BST Insert
        if (!node) return new Node(data);

        if (data < node.data) node.left = this.insert(node.left, data);
        else if (data > node.data) node.right = this.insert(node.right, data);
        else return node; // Duplicate allow nahi

        // 2. Height update karo
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        // 3. Balance Factor check karo
        let balance = this.getBalance(node);

        // --- 4 CASES OF IMBALANCE ---

        // Case 1: Left Left (LL)
        if (balance > 1 && data < node.left.data) return this.rightRotate(node);

        // Case 2: Right Right (RR)
        if (balance < -1 && data > node.right.data) return this.leftRotate(node);

        // Case 3: Left Right (LR)
        if (balance > 1 && data > node.left.data) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Case 4: Right Left (RL)
        if (balance < -1 && data < node.right.data) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }
}

// --- EXECUTION ---
const avl = new AVLTree();
let root = null;

// Agar hum 10, 20, 30 dalein (sorted), normal BST line ban jata.
// Lekin AVL isay "Left Rotate" karke balance kar dega.
root = avl.insert(root, 10);
root = avl.insert(root, 20);
root = avl.insert(root, 30); // Is point par rotation trigger hogi

console.log("Root of Balanced Tree:", root.data); 
// Output: 20 (Qunke 20 darmiyan mein aa gaya, 10 left aur 30 right ban gaya)