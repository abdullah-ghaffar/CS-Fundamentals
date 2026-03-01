/**
 * File: 02_Math_ReverseNumber.ts
 * Description: Reverse an integer using mathematical operators (% and /).
 */

function reverseInteger(num: number): number {
    // Step 1: Sign ko save kar lein (taaki negative numbers handle ho sakein)
    const isNegative = num < 0;
    let n = Math.abs(num);
    let reversed = 0;

    // Step 2: Loop chalaein jab tak number khatam na ho jaye
    while (n > 0) {
        // A) Last digit nikalein (Modulo operator)
        const lastDigit = n % 10;

        // B) Reversed number mein jagah banayein aur digit add karein
        reversed = (reversed * 10) + lastDigit;

        // C) Original number se last digit hata dein (Division operator)
        n = Math.floor(n / 10);
    }

    // Step 3: Agar original number negative tha, toh wapas minus lagayein
    return isNegative ? -reversed : reversed;
}

// ==========================================
// Test Cases
// ==========================================
console.log(`Reverse of 123: ${reverseInteger(123)}`);     // Output: 321
console.log(`Reverse of -456: ${reverseInteger(-456)}`);   // Output: -654
console.log(`Reverse of 100: ${reverseInteger(100)}`);     // Output: 1 (trailing zeros disappear)
console.log(`Reverse of 0: ${reverseInteger(0)}`);         // Output: 0