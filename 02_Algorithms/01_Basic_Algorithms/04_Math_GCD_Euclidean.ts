/**
 * File: 04_Math_GCD_Euclidean.ts
 * Description: Find the Greatest Common Divisor (GCD) of two numbers using Euclid's Algorithm.
 * Logic: GCD(a, b) = GCD(b, a % b) until b becomes 0.
 */

function findGCD(a: number, b: number): number {
    // Math hamesha positive numbers ka GCD nikalta hai logic ke liye
    let x = Math.abs(a);
    let y = Math.abs(b);

    // Jab tak 'y' (chota number/remainder) 0 nahi ho jata, loop chalate raho
    while (y > 0) {
        const remainder = x % y; // 1. Remainder nikalo
        x = y;                   // 2. Pichle divisor ko ab naya dividend banao (Shift Left)
        y = remainder;           // 3. Remainder ko naya divisor banao
    }

    // Jab loop khatam hoga, 'y' 0 hoga aur 'x' mein aakhiri divisor (GCD) hoga.
    return x;
}

// ==========================================
// Test Cases
// ==========================================

console.log(`GCD of 48 and 18: ${findGCD(48, 18)}`);   // Output: 6
console.log(`GCD of 10 and 15: ${findGCD(10, 15)}`);   // Output: 5
console.log(`GCD of 17 and 5:  ${findGCD(17, 5)}`);    // Output: 1 (Prime numbers)
console.log(`GCD of 60 and 0:  ${findGCD(60, 0)}`);    // Output: 60 (Anything divides 0)
console.log(`GCD of -48 and 18: ${findGCD(-48, 18)}`); // Output: 6 (Handled negative)