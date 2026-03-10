/**
 * FinTech Security Utility: Factorial Calculation
 * Warning: High recursion depth can cause Stack Overflow.
 */
function calculateFactorial(n: number): number {
    // Architect's Guard Clause: Negative numbers ka factorial nahi hota
    if (n < 0) return -1; 

    // Base Case
    if (n <= 1) return 1;

    // Recursive Step
    return n * calculateFactorial(n - 1);
}

console.log("Combinations for 4 digits:", calculateFactorial(4)); // 24