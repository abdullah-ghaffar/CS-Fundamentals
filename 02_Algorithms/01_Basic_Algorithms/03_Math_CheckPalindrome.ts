/**
 * File: 03_Math_CheckPalindrome.ts
 * Description: Check if an integer is a palindrome (reads same forwards and backwards).
 * Note: We are using pure Math logic (no String conversion) for best performance.
 */

function isPalindrome(num: number): boolean {
    // ---------------------------------------------------
    // EDGE CASES (Jahan logic lagane ki zaroorat hi nahi)
    // ---------------------------------------------------

    // Case 1: Negative numbers palindrome nahi hote
    // (Example: -121 ulta hoke 121- banta hai, jo valid number nahi)
    if (num < 0) {
        return false;
    }

    // Case 2: Single digits (0-9) hamesha palindrome hote hain
    if (num >= 0 && num < 10) {
        return true;
    }

    // Case 3 (Pro Optimization): 
    // Agar number ke aakhir mein 0 hai (jaise 10, 20, 100), toh wo palindrome nahi ho sakta.
    // (Kyunki ulta karne par shuru mein 0 aayega, jo integers mein allow nahi hota. Exception: 0 khud).
    if (num % 10 === 0 && num !== 0) {
        return false;
    }

    // ---------------------------------------------------
    // CORE LOGIC (Reverse karke compare karna)
    // ---------------------------------------------------

    let originalNum = num;  // Asli number ki copy bana li (Comparison ke liye)
    let reversed = 0;

    while (originalNum > 0) {
        // 1. Aakhiri digit nikala
        const lastDigit = originalNum % 10;
        
        // 2. Reversed number mein jagah bana kar jora
        reversed = (reversed * 10) + lastDigit;
        
        // 3. Asli number se aakhiri digit hata diya
        originalNum = Math.floor(originalNum / 10);
    }

    // ---------------------------------------------------
    // FINAL CHECK
    // ---------------------------------------------------
    
    // Agar Asli Number === Ulta Number, toh TRUE, warna FALSE
    return num === reversed;
}

// ==========================================
// Test Cases
// ==========================================

console.log(`121 is Palindrome?  : ${isPalindrome(121)}`);     // Output: true
console.log(`-121 is Palindrome? : ${isPalindrome(-121)}`);    // Output: false (Negative)
console.log(`10 is Palindrome?   : ${isPalindrome(10)}`);      // Output: false (Ends with 0)
console.log(`7 is Palindrome?    : ${isPalindrome(7)}`);       // Output: true (Single digit)
console.log(`12321 is Palindrome?: ${isPalindrome(12321)}`);   // Output: true
console.log(`123 is Palindrome?  : ${isPalindrome(123)}`);     // Output: false