/**
 * FILE: 50_Window_LongestRepeatingCharReplace.js
 * Pattern: Dynamic Window with Frequency Map
 * Efficiency: O(N) Time
 */

function characterReplacement(s, k) {
    let left = 0;
    let maxLength = 0;
    let maxFrequency = 0; // Window mein sab se zyada anay wala character count
    let charMap = {}; // Characters ki ginti

    for (let right = 0; right < s.length; right++) {
        let char = s[right];
        charMap[char] = (charMap[char] || 0) + 1;

        // Is window mein ab tak ka sab se zyada frequency wala character
        maxFrequency = Math.max(maxFrequency, charMap[char]);

        // Agar humein 'K' se zyada characters replace karne par rahe hain
        // window invalid hai, left ko khiskao
        if ((right - left + 1) - maxFrequency > k) {
            charMap[s[left]]--;
            left++;
        }

        // Window ka size track karo
        maxLength = Math.max(maxLength, right - left + 1);
    }

    console.log("Longest Repeating Length:", maxLength);
    return maxLength;
}

// --- EXECUTION ---
characterReplacement("AABABBA", 1); // Output: 4 (AAAA banta hai)