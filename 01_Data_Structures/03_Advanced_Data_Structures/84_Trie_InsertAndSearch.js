class TrieNode {
  constructor() {
    this.children = {}; 
    this.isEndOfWord = false; 
  }
}

class DictionaryTrie {
  constructor() {
    this.root = new TrieNode();
  }

  // 1. INSERT (Lafz ko store karna)
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

  // 2. SEARCH (Check karna ke lafz hai ya nahi)
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false; // Rasta nahi mila
      node = node.children[char];
    }
    // Sirf rasta milna kafi nahi, lafz wahan khatam bhi hona chahiye
    return node.isEndOfWord;
  }
}

// --- TESTING THE DICTIONARY ---
const myDict = new DictionaryTrie();

// Word List
const words = ["code", "coder", "coding", "apple", "app"];
words.forEach(w => myDict.insert(w));

console.log("--- Word Matching Results ---");
console.log("Is 'coder' in dict?:", myDict.search("coder"));   // Expected: true
console.log("Is 'cod' in dict?:", myDict.search("cod"));       // Expected: false (Prefix hai, word nahi)
console.log("Is 'coding' in dict?:", myDict.search("coding")); // Expected: true
console.log("Is 'banana' in dict?:", myDict.search("banana")); // Expected: false

// --- Logic Check ---
if (myDict.search("app") && !myDict.search("appl")) {
    console.log("✅ Dictionary logic working perfectly!");
}