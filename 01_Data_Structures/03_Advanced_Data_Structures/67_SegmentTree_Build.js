/**
 * FILE: 67_SegmentTree_Build.js
 * Pattern: Range Query Data Structure (Segment Tree)
 * Construction Efficiency: O(N)
 * Range Query Efficiency: O(log N)
 */

class SegmentTree {
    constructor(arr) {
        this.arr = arr;
        this.n = arr.length;
        // [Architectural]: 4*N size is a standard safety bound for segment trees
        this.tree = new Array(4 * this.n).fill(0);
        this.build(0, 0, this.n - 1);
    }

    /**
     * Recursive function to build the Segment Tree
     * @param {number} node - Current index in the tree array
     * @param {number} start - Start index in the original input array
     * @param {number} end - End index in the original input array
     */
    build(node, start, end) {
        // Base Case: Leaf Node (Range of size 1)
        if (start === end) {
            this.tree[node] = this.arr[start];
            return;
        }

        let mid = Math.floor((start + end) / 2);

        // Build Left Child (Index formula: 2*i + 1)
        this.build(2 * node + 1, start, mid);
        
        // Build Right Child (Index formula: 2*i + 2)
        this.build(2 * node + 2, mid + 1, end);

        // [Architectural]: Internal node stores the SUM of its children
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    display() {
        console.log("Segment Tree Array Representation:");
        console.log(this.tree.filter(x => x !== 0)); // Sirf filled values dikhao
    }
}

// --- EXECUTION ---
const transactions = [1, 3, 5, 7, 9, 11]; // Input Array
const st = new SegmentTree(transactions);

st.display();
// Output ka logic: Tree ka Root (Index 0) poori array [1,3,5,7,9,11] ka sum hoga: 36.