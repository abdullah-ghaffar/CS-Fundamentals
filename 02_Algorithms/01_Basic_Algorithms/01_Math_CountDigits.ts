/**
 * File: 01_Math_CountDigits.ts
 * Description: Count the number of digits in an integer using Math.log10 logic.
 */

function countDigits(num: number): number {
    // 1. Pehle hi sign aur decimal khatam kar dein
    const integerPart = Math.abs(Math.trunc(num));

    // 2. Ab check karein ke kya integer hissa zero hai?
    // (Yeh 0, -0, 0.123, -0.999 sab ko handle kar lega)
    if (integerPart === 0) {
        return 1;
    }

    // 3. Ab log10 nikalna bilkul safe hai
    return Math.floor(Math.log10(integerPart)) + 1;
}

// ==========================================
// Test Cases
// ==========================================

console.log(`Digits in 12345: ${countDigits(12345)}`);       // Output: 5
console.log(`Digits in 0: ${countDigits(-0.1233)}`);               // Output: 1
console.log(`Digits in -987: ${countDigits(-987)}`);         // Output: 3
console.log(`Digits in 7: ${countDigits(7)}`);               // Output: 1
console.log(`Digits in 1000000: ${countDigits(1000000)}`);   // Output: 7
console.log(`Digits in -12.34: ${countDigits(-12.34)}`);     // Output: 2 (ignores decimal)