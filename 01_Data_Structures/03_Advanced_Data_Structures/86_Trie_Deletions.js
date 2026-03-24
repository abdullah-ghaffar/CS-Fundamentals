class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // --- DELETE LOGIC (Recursive) ---
  delete(word) {
    this._delete(this.root, word, 0);
  }

  _delete(node, word, index) {
    // Base Case: Jab word ke aakhri character tak pahunch jayen
    if (index === word.length) {
      if (!node.isEndOfWord) return false; // Word mila hi nahi
      node.isEndOfWord = false; // Word khatam
      
      // Agar iske aage koi aur bache nahi hain, to ye node delete ho sakta hai
      return Object.keys(node.children).length === 0;
    }

    const char = word[index];
    const nextNode = node.children[char];

    if (!nextNode) return false; // Rasta toot gaya

    // Recursive call: Niche se upar aate hue check karein
    const shouldDeleteCurrentNode = this._delete(nextNode, word, index + 1);

    // Agar niche wala node delete hona chahiye, to usey parent ki list se nikaal dein
    if (shouldDeleteCurrentNode) {
      delete node.children[char];
      
      // Agar ab is node ka koi aur bacha nahi hai aur ye khud koi word nahi hai
      return Object.keys(node.children).length === 0 && !node.isEndOfWord;
    }

    return false;
  }
}

// --- TESTING THE CLEAN-UP ---
const myDict = new Trie();

myDict.insert("apple");
myDict.insert("app");

console.log("--- Initial Search ---");
console.log("apple:", myDict.search("apple")); // true
console.log("app:", myDict.search("app"));     // true

console.log("\n--- Deleting 'apple' ---");
myDict.delete("apple");

console.log("apple:", myDict.search("apple")); // false (Deleted)
console.log("app:", myDict.search("app"));     // true (Still exists!)

// Memory Check: 'a' -> 'p' -> 'p' ke aage 'l' delete ho chuka hoga
console.log("Is 'l' node still there?:", !!myDict.root.children['a'].children['p'].children['p'].children['l']); 
// Expected: false