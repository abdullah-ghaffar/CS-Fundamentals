/**
 * File: 05_Math_ArmstrongNumber.ts
 * Description: Check if a number is an Armstrong number.
 * Logic: Sum of its digits each raised to the power of the number of digits equals the number itself.
 */

function isArmstrong(num: number): boolean {
    // Edge Case: Negative numbers Armstrong nahi hote
    if (num < 0) return false;

    // Edge Case: 0 ek Armstrong number hai (0^1 = 0)
    if (num === 0) return true;

    // Step 1: Total digits count karein (Hamara pehla Math.log10 wala jadoo)
    const power = Math.floor(Math.log10(num)) + 1;

    let originalNum = num; // Asli number save kar liya comparison ke liye
    let sum = 0;           // Yahan hum powers ko jama (plus) karenge

    // Step 2: Ek ek digit nikal kar power lein aur sum mein dalen
    while (originalNum > 0) {
        let lastDigit = originalNum % 10;           // Aakhiri digit pakra (Extract)
        
        sum = sum + Math.pow(lastDigit, power);     // Uski power li aur sum mein Plus kar diya
        
        originalNum = Math.floor(originalNum / 10); // Aakhiri digit ko mita diya (Remove)
    }

    // Step 3: Insaaf (Check) - Kya Sum asli number ke barabar hai?
    return sum === num;
}

// ==========================================
// Test Cases
// ==========================================

console.log(`Is 153 Armstrong?  ${isArmstrong(153)}`);    // Output: true (1^3 + 5^3 + 3^3 = 153)
console.log(`Is 9474 Armstrong? ${isArmstrong(9474)}`);   // Output: true (4 digits power)
console.log(`Is 123 Armstrong?  ${isArmstrong(123)}`);    // Output: false (1+8+27 = 36 != 123)
console.log(`Is 9 Armstrong?    ${isArmstrong(9)}`);      // Output: true (9^1 = 9)
console.log(`Is -153 Armstrong? ${isArmstrong(-153)}`);   // Output: false