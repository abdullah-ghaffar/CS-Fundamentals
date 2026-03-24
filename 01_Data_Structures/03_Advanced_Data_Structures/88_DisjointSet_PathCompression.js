class FastDisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  // --- THE MAGIC: FIND WITH PATH COMPRESSION ---
  find(i) {
    // Agar i khud hi root hai, to wahi return kar do
    if (this.parent[i] === i) {
      return i;
    }

    // Recursion: Root dhoondo AUR raste mein parent update karo
    // Ye line "Tree" ko "Flat" kar deti hai
    this.parent[i] = this.find(this.parent[i]); 

    return this.parent[i];
  }

  // Do elements ko jorna
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

// --- TESTING THE SPEED ---
const ds = new FastDisjointSet(10);

// Ek lambi chain banate hain: 0 -> 1 -> 2 -> 3 -> 4
ds.parent[0] = 1;
ds.parent[1] = 2;
ds.parent[2] = 3;
ds.parent[3] = 4;

console.log("Before Compression (Node 0's parent):", ds.parent[0]); // 1

// Pehli bar find(0) chalane par compression hogi
console.log("Root of 0:", ds.find(0)); // 4

console.log("After Compression (Node 0's parent):", ds.parent[0]); // 4 (Direct connection!)
console.log("After Compression (Node 1's parent):", ds.parent[1]); // 4 (Direct connection!)