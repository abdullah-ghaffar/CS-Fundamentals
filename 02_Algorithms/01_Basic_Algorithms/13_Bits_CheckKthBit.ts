// ==========================================
// 🛡️ ENTERPRISE BITMAP ACCESS CONTROL
// ==========================================

// Custom Error for Defensive Architecture
class BitBoundaryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BitBoundaryError";
    }
}

export class BitmapEngine {
    
    /**
     * Hyperscale K-th Bit Checker (O(1) Time)
     * Checks if the K-th bit (0-indexed from right) is SET (1).
     * 
     * @param permissions The 32-bit integer holding compressed flags
     * @param k The bit position to check (0 to 31)
     */
    public static isKthBitSet(permissions: number, k: number): boolean {
        // Defensive Architecture: The JavaScript 32-bit Trap
        if (!Number.isInteger(permissions) || !Number.isInteger(k)) {
            throw new TypeError("❌ Bitwise flags must be integers.");
        }
        
        // JS silent wrapping bug: If k = 32, JS engine silently does (32 % 32) = 0!
        // It will check the 0th bit instead of throwing an error. We MUST prevent this.
        if (k < 0 || k > 31) {
            throw new BitBoundaryError(`❌ Bit position 'k' (${k}) must be between 0 and 31. JS Bitwise ops are strictly 32-bit.`);
        }

        // The Legendary Architect Trap:
        // Junior Devs write: (permissions & (1 << k)) > 0
        // BUT if k = 31 (The Sign Bit), (1 << 31) is NEGATIVE (-2147483648) in JS!
        // The check '> 0' will FAIL silently and cause catastrophic bugs.
        
        // THE FIX (Architect Level):
        // Shift the target bit down to the 0th position, then AND it with 1.
        // This completely bypasses the Negative Sign Bit issue!
        
        return ((permissions >> k) & 1) === 1;
    }

    /**
     * BigInt implementation for Infinite Flags (E.g., 256-bit Bloom Filters)
     */
    public static isKthBitSetHyperscale(permissions: bigint, k: bigint): boolean {
        if (k < 0n) throw new BitBoundaryError("❌ Bit position cannot be negative.");
        
        // With BigInt, we don't have the 32-bit negative sign issue.
        return ((permissions >> k) & 1n) === 1n;
    }
}

// ==========================================
// 🚀 HYPERSCALE CAPACITY & SECURITY TEST
// ==========================================
(async () => {
    console.log("⚡ Initiating Bitmap Engine...\n");

    // SCENARIO: User Permissions Compressed into 1 Number
    // Let's say user has binary permissions: 1001010 (Decimal: 74)
    // Bit 0: Login
    // Bit 1: Write Post
    // Bit 3: Delete Post
    // Bit 6: Admin Access
    
    const userACL = 74; // 1001010 in Binary

    console.log(`🛡️ User ACL Flag: ${userACL} (Binary: ${userACL.toString(2)})`);
    
    // Test 1: Check standard bit (Bit 1)
    console.log(`   - Can Write Post (Bit 1)? : ${BitmapEngine.isKthBitSet(userACL, 1) ? '✅ YES' : '❌ NO'}`);
    
    // Test 2: Check missing bit (Bit 2)
    console.log(`   - Can Ban User (Bit 2)?   : ${BitmapEngine.isKthBitSet(userACL, 2) ? '✅ YES' : '❌ NO'}`);

    console.log(`\n🚨 Defensive Architecture Test:`);
    try {
        // A hacker or buggy system tries to check bit 35
        BitmapEngine.isKthBitSet(userACL, 35);
    } catch (e: any) {
        console.log(`   ✅ Caught Silent V8 Bug: ${e.message}`);
    }

    // 🏆 The 31st Bit Negative Trap Demonstration
    console.log(`\n🧠 The Principal Architect's Trap:`);
    const superAdmin = 2147483648; // 10000000000000000000000000000000 (Bit 31 is SET)
    
    const juniorCheck = (superAdmin & (1 << 31)) > 0;
    const architectCheck = ((superAdmin >> 31) & 1) === 1; // Our implementation

    console.log(`   - Junior Dev Check Result: ${juniorCheck ? '✅ HAS ACCESS' : '❌ DENIED (BUG!)'}`);
    console.log(`   - Architect Check Result : ${architectCheck ? '✅ HAS ACCESS' : '❌ DENIED'}`);
})();