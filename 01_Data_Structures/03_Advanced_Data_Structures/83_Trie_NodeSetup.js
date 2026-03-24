class TrieNode {
  constructor() {
    // Har node ke paas apne bachon (next characters) ka record hota hai
    this.children = {}; 
    // Kya yahan koi word khatam ho raha hai?
    this.isEndOfWord = false; 
  }
}

class Trie {
  constructor() {
    // Root hamesha khali (empty) hoti hai
    this.root = new TrieNode();
  }

  // 1. INSERT: Naya lafz (Word) add karna
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      // Agar character pehle se nahi hai, to naya node banayein
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      // Agle character par move karein
      curr = curr.children[char];
    }
    // Lafz khatam hone par flag true kar dein
    curr.isEndOfWord = true;
    console.log(`✅ Word '${word}' inserted into Trie.`);
  }

  // 2. SEARCH: Kya ye mukammal lafz maujood hai?
  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return curr.isEndOfWord;
  }

  // 3. STARTS WITH: Kya koi lafz is prefix se shuru hota hai? (Autocomplete Logic)
  startsWith(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return true; // Agar yahan tak pahunch gaye, to prefix exist karta hai
  }
}

// --- TESTING THE TRIE ---
const mySearchEngine = new Trie();

mySearchEngine.insert("apple");
mySearchEngine.insert("app");

console.log("Searching 'apple':", mySearchEngine.search("apple")); // true
console.log("Searching 'appl':", mySearchEngine.search("appl"));   // false (Sirf prefix hai)
console.log("Starts with 'app'?", mySearchEngine.startsWith("app")); // true

/* Logic Check: 
   'apple' add karne se a -> p -> p -> l -> e (isEndOfWord: true)
   'app' add karne se sirf teesre 'p' par isEndOfWord: true ho jayega.
*/