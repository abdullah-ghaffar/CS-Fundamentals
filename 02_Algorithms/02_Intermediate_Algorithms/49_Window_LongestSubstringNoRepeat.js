/**
 * FILE: 49_Window_LongestSubstringNoRepeat.js
 * Pattern: Variable Sliding Window (Dynamic Expansion & Contraction)
 * Efficiency: O(N) Time, O(Min(N, M)) Space
 */

function lengthOfLongestSubstring(s) {
    let charMap = new Map(); // Last position yaad rakhne ke liye
    let left = 0; // Window ka shuru
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        let currentChar = s[right];

        // Agar char repeat hua aur window ke andar hai
        if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
            left = charMap.get(currentChar) + 1; // Window ko shrink karo
        }

        charMap.set(currentChar, right); // Character ka naya index update karo
        
        // Window ki lambai calculate karo
        maxLength = Math.max(maxLength, right - left + 1);
    }

    console.log("Longest Length:", maxLength);
    return maxLength;
}

// --- EXECUTION ---
const input = "abcabcbb";
lengthOfLongestSubstring(input); // Output: 3 ("abc" sab se lamba unique hai)