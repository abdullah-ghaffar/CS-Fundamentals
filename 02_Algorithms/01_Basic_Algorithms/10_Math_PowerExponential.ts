// ==========================================
// 🔐 CRYPTO-GRADE MODULAR EXPONENTIATION
// ==========================================

export class CryptoMathEngine {
    
    /**
     * Computes (base^exp) % modulus efficiently.
     * Complexity: O(log exp) - The fastest possible algorithm.
     * 
     * @param base The base number (BigInt)
     * @param exp The exponent (BigInt) - Can be trillions!
     * @param mod The modulus (BigInt) - Required for hyperscale numbers
     */
    public static modPow(base: bigint, exp: bigint, mod: bigint): bigint {
        // Defensive Architecture: Validate Inputs
        if (mod === 1n) return 0n; // Modulo 1 is always 0
        if (exp < 0n) throw new Error("❌ Error: Negative exponents require Modular Inverse logic (Extended Euclidean).");
        
        let result = 1n;
        let b = base % mod; // Initial reduction
        let e = exp;

        // V8 Internals: Hum Bitwise operators use kar rahe hain 
        // kyunki CPU ke liye Division (/) karna Bitwise Shift (>>) se mehnga hai.
        while (e > 0n) {
            // Check if 'e' is odd (e & 1n is faster than e % 2n)
            if ((e & 1n) === 1n) {
                result = (result * b) % mod;
            }

            // Square the base
            b = (b * b) % mod;

            // Divide exponent by 2 (Right Shift by 1 bit)
            e = e >> 1n; 
        }

        return result;
    }
}

// ==========================================
// 🚀 HYPERSCALE CAPACITY TEST
// ==========================================
(async () => {
    console.log("⚡ Initiating Binary Exponentiation...");

    // SCENARIO: Cryptographic Key Generation
    // Calculate: 5 ^ (10^18) % (10^9 + 7)
    // Naive approach would loop 1,000,000,000,000,000,000 times (Impossible).
    
    const base = 5n;
    const exponent = 1_000_000_000_000_000_000n; // 1 Quintillion (10^18)
    const modulus = 1_000_000_007n; // Standard Prime Modulus used in Competitive Programming

    console.time("BinaryExpoTime");
    
    const result = CryptoMathEngine.modPow(base, exponent, modulus);
    
    console.timeEnd("BinaryExpoTime");

    console.log(`\n🔢 Calculation: ${base}^${exponent} % ${modulus}`);
    console.log(`✅ Result: ${result}`);
    
    // Theoretical Proof check:
    console.log(`\n📊 Operations Count Analysis:`);
    console.log(`   - Naive Loop Steps: ${exponent.toLocaleString()} (Will take ~317 years @ 10^8 ops/sec)`);
    console.log(`   - Binary Expo Steps: ~${exponent.toString(2).length} (Microseconds)`);
})();