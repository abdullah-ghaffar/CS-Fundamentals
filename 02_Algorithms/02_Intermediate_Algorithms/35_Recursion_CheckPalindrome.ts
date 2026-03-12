/**
 * PalindromeChecker: Determines if a string is a palindrome using 
 * recursive narrowing.
 */
class PalindromeChecker {
    
    // Public API: User sirf string pass karega
    public isPalindrome(str: string): boolean {
        // Cleaning input: Ignore spaces or case if needed (Optional)
        const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
        return this.checkRecursive(cleanStr, 0, cleanStr.length - 1);
    }

    // Recursive helper method
    private checkRecursive(str: string, left: number, right: number): boolean {
        // Base Case 1: Agar pointers cross kar gaye, toh matlab sab matched hai
        if (left >= right) return true;

        // Base Case 2: Agar characters match nahi hue
        if (str[left] !== str[right]) return false;

        // Recursive Step: Agli inner characters ki taraf move karo
        return this.checkRecursive(str, left + 1, right - 1);
    }
}

// --- Execution Block ---
const checker = new PalindromeChecker();
const test1 = "Racecar";
const test2 = "Hello";

console.log(`Is "${test1}" palindrome?`, checker.isPalindrome(test1)); // true
console.log(`Is "${test2}" palindrome?`, checker.isPalindrome(test2)); // false