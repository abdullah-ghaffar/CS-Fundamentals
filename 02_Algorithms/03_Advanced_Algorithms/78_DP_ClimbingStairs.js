/**
 * Problem: $n$ stairs hain. Har bar 1 ya 2 steps le sakte hain.
 * Total unique ways nikalna.
 */

function climbStairs(n) {
    // Base Cases
    if (n <= 2) return n;

    let first = 1;  // Ways to reach 1st stair
    let second = 2; // Ways to reach 2nd stair
    let current = 0;

    for (let i = 3; i <= n; i++) {
        // Current stair tak pahunchne ke raste = pichli do stairs ka sum
        current = first + second;
        
        // Agli iteration ke liye shift karein
        first = second;
        second = current;
    }

    return current;
}

// --- TESTING THE ENGINE ---
console.log("Ways to climb 3 stairs:", climbStairs(3)); // 3 (1+1+1, 1+2, 2+1)
console.log("Ways to climb 5 stairs:", climbStairs(5)); // 8
console.log("Ways to climb 10 stairs:", climbStairs(10)); // 89

console.time("Performance-Test");
climbStairs(45);
console.timeEnd("Performance-Test");