/**
 * FILE: 68_SegmentTree_QueryUpdate.js
 * Pattern: Logarithmic Range Query & Point Update
 */

class SegmentTree {
    constructor(arr) {
        this.arr = arr;
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(0);
        this.build(0, 0, this.n - 1);
    }

    build(node, start, end) {
        if (start === end) {
            this.tree[node] = this.arr[start];
            return;
        }
        let mid = Math.floor((start + end) / 2);
        this.build(2 * node + 1, start, mid);
        this.build(2 * node + 2, mid + 1, end);
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    // --- NEW: THE QUERY ENGINE (O(log N)) ---
    query(node, start, end, L, R) {
        // 1. No Overlap: Range se bahar hain
        if (R < start || end < L) return 0;

        // 2. Total Overlap: Mangi gayi range hamare andar hai
        if (L <= start && end <= R) return this.tree[node];

        // 3. Partial Overlap: Aadhe idhar, aadhe udhar
        let mid = Math.floor((start + end) / 2);
        let leftSum = this.query(2 * node + 1, start, mid, L, R);
        let rightSum = this.query(2 * node + 2, mid + 1, end, L, R);
        
        return leftSum + rightSum;
    }

    // --- NEW: THE UPDATE ENGINE (O(log N)) ---
    update(node, start, end, idx, newVal) {
        // Leaf Node tak pohnch gaye (Asli dabba)
        if (start === end) {
            this.arr[idx] = newVal;
            this.tree[node] = newVal;
            return;
        }

        let mid = Math.floor((start + end) / 2);
        if (idx <= mid) {
            this.update(2 * node + 1, start, mid, idx, newVal);
        } else {
            this.update(2 * node + 2, mid + 1, end, idx, newVal);
        }

        // Backtracking: Parent ka sum update karo
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
}

// --- EXECUTION ---
const data = [1, 2, 3, 4, 5, 6];
const st = new SegmentTree(data);

// Task 1: Index 1 se 4 tak ka sum (2+3+4+5 = 14)
console.log("Range Sum (1 to 4):", st.query(0, 0, data.length - 1, 1, 4));

// Task 2: Index 2 ki value badal kar 10 kar do (Array ab: [1, 2, 10, 4, 5, 6])
st.update(0, 0, data.length - 1, 2, 10);
console.log("Update Done! Index 2 is now 10.");

// Task 3: Naya sum (1 to 4): (2+10+4+5 = 21)
console.log("New Range Sum (1 to 4):", st.query(0, 0, data.length - 1, 1, 4));