/**
 * FILE: 51_Greedy_AssignCookies.js
 * Pattern: Greedy Approach (Best Fit)
 * Efficiency: O(N log N) - Sorting ki wajah se
 */

function findContentChildren(greed, cookies) {
    // 1. Sort dono lists (Sorting is key for Greedy!)
    greed.sort((a, b) => a - b);
    cookies.sort((a, b) => a - b);

    let i = 0; // Server Pointer
    let j = 0; // Resource/Cookie Pointer
    let satisfied = 0;

    // 2. Greedy Loop: Sirf wahi resources use karo jo sab se chotay hain 
    // lekin server ki demand poori karte hain.
    while (i < greed.length && j < cookies.length) {
        if (cookies[j] >= greed[i]) {
            // Server satisfied!
            satisfied++;
            i++; // Agla server
            j++; // Agla resource
        } else {
            // Resource chota hai, agla bara resource dhoondo
            j++;
        }
    }

    console.log("Total Servers Satisfied:", satisfied);
    return satisfied;
}

// --- EXECUTION ---
const greedFactors = [1, 2, 3]; // Servers ki demand
const cookies = [1, 1];         // Available resources
findContentChildren(greedFactors, cookies); 
// Output: 1 (Sirf aik server khush ho sakta hai)