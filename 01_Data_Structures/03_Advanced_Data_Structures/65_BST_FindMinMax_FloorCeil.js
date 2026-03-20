/**
 * FILE: 65_BST_FindMinMax_FloorCeil.js
 * Pattern: BST Boundary Traversal
 * Efficiency: O(H) - Height of the tree
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class SearchEngine {
    // 1. Min: Sab se left wala dabba
    findMin(root) {
        if (!root) return null;
        let current = root;
        while (current.left) current = current.left;
        return current.data;
    }

    // 2. Max: Sab se right wala dabba
    findMax(root) {
        if (!root) return null;
        let current = root;
        while (current.right) current = current.right;
        return current.data;
    }

    // 3. Floor: Largest value <= target
    findFloor(root, target) {
        let floor = -1;
        while (root) {
            if (root.data === target) return root.data;
            if (root.data > target) {
                root = root.left;
            } else {
                floor = root.data; // Candidate mil gaya, save karo
                root = root.right; // Mazeed bari value dhoondo
            }
        }
        return floor;
    }

    // 4. Ceil: Smallest value >= target
    findCeil(root, target) {
        let ceil = -1;
        while (root) {
            if (root.data === target) return root.data;
            if (root.data < target) {
                root = root.right;
            } else {
                ceil = root.data; // Candidate mil gaya, save karo
                root = root.left;  // Mazeed choti value dhoondo
            }
        }
        return ceil;
    }
}

// --- EXECUTION ---
const engine = new SearchEngine();
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.right = new TreeNode(8);
root.right.left = new TreeNode(12);

// Tree:      10
//           /  \
//          5    15
//           \   /
//            8 12

console.log("Min Value:", engine.findMin(root)); // 5
console.log("Max Value:", engine.findMax(root)); // 15
console.log("Floor of 9 (Highest below 9):", engine.findFloor(root, 9)); // 8
console.log("Ceil of 11 (Lowest above 11):", engine.findCeil(root, 11)); // 12