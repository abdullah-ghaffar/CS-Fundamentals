// --- OPTION 1: STANDARD TABULATION (O(n) Space) ---
function fibTabulation(n) {
  if (n <= 1) return n;
  
  // Table (Array) banayein
  let table = new Array(n + 1);
  table[0] = 0;
  table[1] = 1;

  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}

// --- OPTION 2: SPACE OPTIMIZED (O(1) Space) 🔥 ---
// Hamein poori array ki zaroorat nahi, sirf pichle 2 numbers chahiye
function fibSpaceOptimized(n) {
  if (n <= 1) return n;

  let prev2 = 0; // F(n-2)
  let prev1 = 1; // F(n-1)
  let current;

  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    // Agli iteration ke liye values shift karein
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}

// --- TESTING ---
console.log("Tabulation (n=10):", fibTabulation(10)); // 55
console.log("Space Optimized (n=10):", fibSpaceOptimized(10)); // 55

console.time("Space-Optimized-100");
fibSpaceOptimized(100);
console.timeEnd("Space-Optimized-100");