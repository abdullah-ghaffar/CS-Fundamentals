/**
 * File: 06_Math_PrintDivisors.ts
 * Description: Print all divisors of a number efficiently using O(sqrt(n)) approach.
 * Logic: Iterate only up to the square root of N. If 'i' divides N, then both 'i' and 'N/i' are divisors.
 */

function printDivisors(num: number): number[] {
    const divisors: number[] = []; // Yahan hum saare divisors jama karenge
    
    // Math.sqrt nikalna heavy operation ho sakta hai loop mein, 
    // isliye hum condition 'i * i <= num' use karenge (Same as i <= sqrt(num))
    for (let i = 1; i * i <= num; i++) {
        
        // Step 1: Check karein kya 'i' divide karta hai?
        if (num % i === 0) {
            
            // Agar haan, toh 'i' ek divisor hai
            divisors.push(i);

            // Step 2: Ab iska 'Partner' (Jori) nikalein
            // Partner = num / i
            // Lekin check karein ke kahin partner same toh nahi? (Jaise 6 * 6 = 36)
            if (i !== num / i) {
                divisors.push(num / i);
            }
        }
    }

    // Output ko khubsurat dikhane ke liye sort kar rahe hain (Chote se Bada)
    // Note: a - b wala logic numbers ko sahi tarah sort karta hai
    return divisors.sort((a, b) => a - b);
}

// ==========================================
// Test Cases
// ==========================================

console.log(`Divisors of 36: ${printDivisors(36)}`); 
// Output: 1, 2, 3, 4, 6, 9, 12, 18, 36

console.log(`Divisors of 12: ${printDivisors(12)}`); 
// Output: 1, 2, 3, 4, 6, 12

console.log(`Divisors of 97 (Prime): ${printDivisors(97)}`); 
// Output: 1, 97 (Sirf 1 aur wo khud)