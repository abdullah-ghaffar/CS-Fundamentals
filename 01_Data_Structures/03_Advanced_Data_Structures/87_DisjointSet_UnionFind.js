class DisjointSet {
  constructor(size) {
    // Shuru mein har banda apna hi leader hai
    this.parent = Array.from({ length: size }, (_, i) => i);
    // Rank use hota hai tree ki height control karne ke liye
    this.rank = Array(size).fill(0);
  }

  // 1. FIND (Leader dhoondna)
  find(i) {
    if (this.parent[i] === i) return i;

    // Path Compression: Agli bar ke liye rasta chota kar dena
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  // 2. UNION (Do groups ko ek karna)
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      // Jo bara group (higher rank) hai, chota group us mein shamil hoga
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootI] = rootJ;
        this.rank[rootJ]++;
      }
      return true; // Connection ban gaya
    }
    return false; // Pehle se connected thay
  }

  // 3. IS CONNECTED (Kya dono aik hi cluster mein hain?)
  isConnected(i, j) {
    return this.find(i) === this.find(j);
  }
}

// --- TESTING THE NETWORK ---
const network = new DisjointSet(6); // 6 Users (0 to 5)

network.union(0, 1); // 0 aur 1 dost ban gaye
network.union(1, 2); // 1 aur 2 dost ban gaye (Ab 0 aur 2 bhi indirect dosti mein hain)
network.union(3, 4); // 3 aur 4 ka alag group hai

console.log("--- Connectivity Check ---");
console.log("Are 0 and 2 connected?", network.isConnected(0, 2)); // true
console.log("Are 0 and 4 connected?", network.isConnected(0, 4)); // false

network.union(2, 4); // Ab 2 aur 4 ko milane se poore dono groups merge ho gaye
console.log("After union(2,4), are 0 and 4 connected?", network.isConnected(0, 4)); // true