// ==========================================
// 1. PRIME CHECKER: Optimized Algorithm (O(√n))
// ==========================================
const isPrime = (num: number): boolean => {
    // 1 aur negative numbers prime nahi hote
    if (num <= 1) return false;
    
    // 2 aur 3 prime hain
    if (num <= 3) return true;

    // 2 ya 3 se divide hone wale numbers ko hatao (Optimization)
    if (num % 2 === 0 || num % 3 === 0) return false;

    // Sirf square root tak loop chalana (The Secret Sauce)
    // 6k ± 1 rule ka istemal
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
};

// ==========================================
// 2. PRIME GENERATOR: List of Primes
// ==========================================
const getPrimesInRange = (start: number, end: number): number[] => {
    const primes: number[] = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
};

// ==========================================
// 🚀 TESTING THE PERFORMANCE
// ==========================================
console.log("--- Prime Checker Initialized ---");

const testNumber = 97;
console.log(`Is ${testNumber} prime?`, isPrime(testNumber) ? "✅ Yes" : "❌ No");

const rangeStart = 1, rangeEnd = 50;
console.log(`Primes between ${rangeStart} and ${rangeEnd}:`, getPrimesInRange(rangeStart, rangeEnd));

// Ek aur bada number check karte hain (Performance test)
const largePrime = 7919;
console.log(`Is ${largePrime} prime?`, isPrime(largePrime));