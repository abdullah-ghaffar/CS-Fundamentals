class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.minFreq = 0;

    this.keyMap = new Map(); // key -> {value, freq}
    this.freqMap = new Map(); // freq -> Set of keys (Sets maintain order)
  }

  // Helper: Frequency update karna
  updateFreq(key) {
    let { value, freq } = this.keyMap.get(key);
    
    // Purani frequency list se nikalo
    this.freqMap.get(freq).delete(key);
    if (this.freqMap.get(freq).size === 0 && freq === this.minFreq) {
      this.minFreq++;
    }

    // Nayi frequency mein dalo
    freq++;
    this.keyMap.set(key, { value, freq });
    if (!this.freqMap.has(freq)) this.freqMap.set(freq, new Set());
    this.freqMap.get(freq).add(key);
  }

  get(key) {
    if (!this.keyMap.has(key)) return -1;
    this.updateFreq(key);
    return this.keyMap.get(key).value;
  }

  put(key, value) {
    if (this.capacity === 0) return;

    if (this.keyMap.has(key)) {
      this.keyMap.get(key).value = value;
      this.updateFreq(key);
      return;
    }

    if (this.size === this.capacity) {
      // Sab se kam frequency wala aur sab se purana (LRU inside LFU) nikalo
      const keysWithMinFreq = this.freqMap.get(this.minFreq);
      const keyToRemove = keysWithMinFreq.values().next().value; // Set ka pehla element
      keysWithMinFreq.delete(keyToRemove);
      this.keyMap.delete(keyToRemove);
      this.size--;
    }

    // Naya element insert karein
    this.size++;
    this.minFreq = 1;
    this.keyMap.set(key, { value, freq: 1 });
    if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
    this.freqMap.get(1).add(key);
  }
}

// --- TESTING THE VIRAL CACHE ---
const myCache = new LFUCache(2);

myCache.put(1, "Video A"); // Freq: 1
myCache.put(2, "Video B"); // Freq: 1
console.log(myCache.get(1)); // "Video A", Freq: 2

myCache.put(3, "Video C"); // Size full! 
// "Video B" nikal jayegi kyunke uski Freq 1 thi, aur A ki 2 thi.

console.log(myCache.get(2)); // -1 (Not found)
console.log(myCache.get(3)); // "Video C"