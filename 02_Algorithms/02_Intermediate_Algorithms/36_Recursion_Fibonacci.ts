/**
 * FibonacciCalculator: Uses Memoization to optimize recursive calls 
 * from O(2^n) to O(n).
 */
class FibonacciCalculator {
    // Cache: Purane results ko store karne ke liye
    private cache: Map<number, number> = new Map();

    public fib(n: number): number {
        // Base Cases
        if (n <= 1) return n;

        // Cache Check: Kya yeh value pehle calculate ho chuki hai?
        if (this.cache.has(n)) {
            return this.cache.get(n)!;
        }

        // Recursive Step: Multiple calls with memoization
        const result = this.fib(n - 1) + this.fib(n - 2);
        
        // Cache mein save karo
        this.cache.set(n, result);
        
        return result;
    }
}

// --- Execution Block ---
const fibCalc = new FibonacciCalculator();
console.log("Fibonacci of 10:", fibCalc.fib(1000)); // 55
console.log("Fibonacci of 50:", fibCalc.fib(50)); // 12586269025