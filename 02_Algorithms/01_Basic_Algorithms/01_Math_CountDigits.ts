/**
 * File: 01_Math_CountDigits.ts
 * Description: Count the number of digits in an integer using Math.log10 logic.
 */

function countDigits(num: number): number {
    // Edge case: Agar number 0 hai, toh usme 1 hi digit hoga
    if (num === 0) {
        return 1;
    }

    // Negative numbers ko positive mein convert karna taaki log10 calculate ho sake
    // Agar number decimal hai, toh Math.trunc() se sirf integer part lenge
    const absNum = Math.abs(Math.trunc(num));

    // Log10 logic apply karke digits count karna
    return Math.floor(Math.log10(absNum)) + 1;
}

// ==========================================
// Test Cases
// ==========================================

console.log(`Digits in 12345: ${countDigits(12345)}`);       // Output: 5
console.log(`Digits in 0: ${countDigits(0)}`);               // Output: 1
console.log(`Digits in -987: ${countDigits(-987)}`);         // Output: 3
console.log(`Digits in 7: ${countDigits(7)}`);               // Output: 1
console.log(`Digits in 1000000: ${countDigits(1000000)}`);   // Output: 7
console.log(`Digits in -12.34: ${countDigits(-12.34)}`);     // Output: 2 (ignores decimal)