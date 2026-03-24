/**
 * Problem: Find the length of the longest common subsequence.
 * Time Complexity: O(N * M)
 * Space Complexity: O(M)
 */

function lcs(text1, text2) {
    let n = text1.length;
    let m = text2.length;

    // Sirf pichli row ko yaad rakhna kafi hai
    let prev = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        let current = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            // Agar character match ho jaye
            if (text1[i - 1] === text2[j - 1]) {
                current[j] = 1 + prev[j - 1];
            } else {
                // Agar match na ho to max of top or left
                current[j] = Math.max(prev[j], current[j - 1]);
            }
        }
        prev = current;
    }

    return prev[m];
}

// --- TESTING THE MATCHER ---
const s1 = "abcde";
const s2 = "ace"; 

console.log(`LCS Length of "${s1}" and "${s2}":`, lcs(s1, s2)); 
// Expected: 3 ("a", "c", "e" are common and in order)

const s3 = "blaze";
const s4 = "abaz";
console.log(`LCS Length:`, lcs(s3, s4)); 
// Expected: 3 ("b", "a", "z")