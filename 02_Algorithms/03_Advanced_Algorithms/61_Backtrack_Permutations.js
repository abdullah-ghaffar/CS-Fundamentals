/**
 * FILE: 61_Backtrack_Permutations.js
 * Pattern: Backtracking (Decision Tree Traversal)
 * Efficiency: O(N!) - Bohat expensive, lekin logical!
 */

function getPermutations(str) {
    let result = [];
    let chars = str.split('');

    function backtrack(index) {
        // Base Case: Agar hum aakhri dabba par pohnch gaye, toh result save karo
        if (index === chars.length) {
            result.push(chars.join(''));
            return;
        }

        for (let i = index; i < chars.length; i++) {
            // Swap: Aik character ko fix karo aur baqi ko permute karo
            [chars[index], chars[i]] = [chars[i], chars[index]];

            // Recursive Call: Agle dabba (index+1) par jao
            backtrack(index + 1);

            // Backtrack: Wapis purani halat mein lao (Un-swap)
            // Yehi wo "Jaadoo" hai jise Backtracking kehte hain!
            [chars[index], chars[i]] = [chars[i], chars[index]];
        }
    }

    backtrack(0);
    return result;
}

// --- EXECUTION ---
console.log("Combinations of 'ABC':", getPermutations("ABC"));
// Output: [ 'ABC', 'ACB', 'BAC', 'BCA', 'CBA', 'CAB' ]