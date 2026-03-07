// ==========================================
// 🧮 HYPERSCALE POPULATION COUNT (POPCNT) ENGINE
// ==========================================

class NegativeBigIntTrapError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NegativeBigIntTrapError";
    }
}

export class HammingWeightEngine {
    
    /**
     * Brian Kernighan’s Algorithm for 32-bit Integers.
     * Time Complexity: O(K) where K is the number of set bits (1s).
     * 
     * @param num standard 32-bit integer
     */
    public static countSetBits32(num: number): number {
        // Defensive Architecture: Ensure it's a valid integer
        if (!Number.isInteger(num)) {
            throw new TypeError("❌ Popcount requires integers.");
        }

        // 🚨 THE PRINCIPAL ARCHITECT'S DEFENSE (Two's Complement Trap)
        // If num is negative (e.g., -1), its bitwise representation is 11111111111111111111111111111111 (32 ones).
        // Standard bitwise ops can get confused by JS signed numbers.
        // We MUST convert it to an Unsigned 32-bit Integer using Zero-Fill Right Shift (>>> 0).
        let unsignedNum = num >>> 0; 
        
        let count = 0;
        
        // Brian Kernighan's Magic: 
        // n & (n - 1) ALWAYS flips the lowest set bit (1) to 0.
        // The loop completely skips all the 0s!
        while (unsignedNum > 0) {
            unsignedNum = unsignedNum & (unsignedNum - 1);
            count++;
        }
        
        return count;
    }

    /**
     * Hyperscale Popcount for infinite precision Bloom Filters.
     * @param num BigInt representation of the data block
     */
    public static countSetBitsBigInt(num: bigint): bigint {
        // 🚨 INFINITE LOOP PREVENTION (The Mathematical Trap)
        // Negative BigInts in memory are represented as infinite Two's Complement.
        // Doing num & (num - 1n) on a negative BigInt will NEVER reach 0. It will loop until the server crashes (OOM/Timeout).
        if (num < 0n) {
            throw new NegativeBigIntTrapError("❌ Security Halt: Cannot perform Popcount on negative BigInts due to infinite Two's Complement representation.");
        }

        let count = 0n;
        let n = num;

        while (n > 0n) {
            n = n & (n - 1n);
            count++;
        }

        return count;
    }
}

// ==========================================
// 🚀 HYPERSCALE CAPACITY & SECURITY TEST
// ==========================================
(async () => {
    console.log("⚡ Initiating Population Count (POPCNT) Engine...\n");

    // SCENARIO 1: Standard Bitcount
    const activeUsersFlag = 29; // Binary: 11101 (Four 1s)
    console.log(`📊 Active Users Flag: ${activeUsersFlag} (Binary: ${activeUsersFlag.toString(2)})`);
    console.log(`   - Active Users Count: ${HammingWeightEngine.countSetBits32(activeUsersFlag)}\n`);

    // SCENARIO 2: The Two's Complement Defense
    // -1 in 32-bit binary is 32 ones: 11111111111111111111111111111111
    const negativeTest = -1;
    console.log(`🛡️ Testing Negative 32-bit Integer (-1):`);
    console.log(`   - Binary equivalent in Memory: ${(negativeTest >>> 0).toString(2)}`);
    console.log(`   - Set Bits Detected: ${HammingWeightEngine.countSetBits32(negativeTest)}\n`);

    // SCENARIO 3: The Infinite Loop Trap (BigInt)
    console.log(`🚨 Defensive Architecture Test (Negative BigInt):`);
    try {
        // A bug or hacker sends a negative BigInt to your analytics engine
        HammingWeightEngine.countSetBitsBigInt(-5n);
    } catch (e: any) {
        console.log(`   ✅ Successfully Caught Infinite Loop Trap: ${e.message}\n`);
    }

    // SCENARIO 4: Hyperscale Bloom Filter (BigInt)
    const hyperscaleData = 100000000000000000000000000000000000000n; // Massive number
    console.log(`🌐 Hyperscale BigInt Data:`);
    console.log(`   - Binary: ${hyperscaleData.toString(2)}`);
    console.log(`   - Set Bits Detected: ${HammingWeightEngine.countSetBitsBigInt(hyperscaleData)}`);
})();