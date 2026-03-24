// --- DYNAMIC PROGRAMMING: TOP-DOWN (MEMOIZATION) ---

class FibonacciSolver {
  constructor() {
    // Hamari diary (Cache) jahan purane results store honge
    this.memo = {}; 
  }

  getFib(n) {
    // 1. Base Case: Agar n chota hai, to directly return karein
    if (n <= 1) return n;

    // 2. Memoization Check: Kya ye result pehle se hai?
    if (this.memo[n] !== undefined) {
      return this.memo[n];
    }

    // 3. Recursive Call + Storage
    // Hum nikaal rahe hain F(n) = F(n-1) + F(n-2)
    this.memo[n] = this.getFib(n - 1) + this.getFib(n - 2);

    return this.memo[n];
  }
}

// --- TESTING THE SPEED ---
const solver = new FibonacciSolver();

console.time("Fibonacci-40");
const result = solver.getFib(40);
console.timeEnd("Fibonacci-40"); 

console.log(`Result for F(40): ${result}`);

/* Note: Baghair Memoization ke F(40) nikaalne mein seconds lag sakte hain. 
   Lekin Memoization ke saath ye milli-seconds mein ho jata hai!
*/