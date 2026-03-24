class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class AutoCompleteTrie {
  constructor() {
    this.root = new TrieNode();
  }

  // Word insert karna
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // --- STARTS WITH LOGIC ---
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      // Agar rasta beech mein hi toot jaye, to false
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    // Agar loop khatam ho jaye aur rasta mil jaye, to true
    return true;
  }
}

// --- TESTING THE AUTO-COMPLETE BASE ---
const searchBar = new AutoCompleteTrie();

const dictionary = ["internet", "internal", "interview", "instagram", "india"];
dictionary.forEach(word => searchBar.insert(word));

console.log("--- Prefix Search Results ---");
console.log("User typed 'inte':", searchBar.startsWith("inte")); // Expected: true
console.log("User typed 'inst':", searchBar.startsWith("inst")); // Expected: true
console.log("User typed 'ind':", searchBar.startsWith("ind"));   // Expected: true
console.log("User typed 'xyz':", searchBar.startsWith("xyz"));   // Expected: false

// --- Engineering Check ---
if (searchBar.startsWith("inter") && !searchBar.startsWith("into")) {
    console.log("✅ Auto-complete base logic is solid!");
}