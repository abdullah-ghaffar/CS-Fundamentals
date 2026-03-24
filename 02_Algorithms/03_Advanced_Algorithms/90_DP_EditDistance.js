/**
 * Problem: Find minimum operations to convert word1 to word2.
 * Time Complexity: O(N * M)
 * Space Complexity: O(M)
 */

function minDistance(word1, word2) {
    let n = word1.length;
    let m = word2.length;

    // Base Case: Agar aik string empty hai
    let prev = new Array(m + 1).fill(0).map((_, i) => i);

    for (let i = 1; i <= n; i++) {
        let curr = new Array(m + 1).fill(0);
        curr[0] = i; // Column 0 initialization

        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Characters match: No operation needed
                curr[j] = prev[j - 1];
            } else {
                // Min of (Insert, Delete, Replace) + 1
                curr[j] = 1 + Math.min(
                    curr[j - 1], // Insert
                    prev[j],     // Delete
                    prev[j - 1]  // Replace
                );
            }
        }
        prev = [...curr];
    }

    return prev[m];
}

// --- TESTING THE SPELL CHECKER ---
const w1 = "horse";
const w2 = "ros";
console.log(`Edit Distance between "${w1}" and "${w2}":`, minDistance(w1, w2)); 
// Expected: 3 
// (h->r replace, r removed, e removed)

const w3 = "intention";
const w4 = "execution";
console.log(`Edit Distance:`, minDistance(w3, w4)); 
// Expected: 5