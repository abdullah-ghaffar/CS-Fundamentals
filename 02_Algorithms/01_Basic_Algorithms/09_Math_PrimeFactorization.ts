// ==========================================
// 🏗️ ENTERPRISE-GRADE PRIME FACTORIZATION
// ==========================================

// 1. Strict Brand Types & Custom Errors
class FactorizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FactorizationError";
    }
}

// 2. Stateless Pure Utility Class (Singleton Pattern Alternative)
export class QuantumFactorizationEngine {
    
    // V8 Optimization: Event Loop ko saans lene ka time dena
    // Trade-off: Processing thodi slow hogi, lekin Server zinda rahega
    private static async yieldToEventLoop(): Promise<void> {
        return new Promise((resolve) => setImmediate(resolve));
    }

    /**
     * Prime Factorization with Event Loop Protection
     * @param n Number to factorize (BigInt for infinite precision)
     * @returns Map<PrimeFactor, Exponent/Power>
     */
    public static async decompose(n: bigint): Promise<Map<bigint, number>> {
        // Defensive Architecture: Base Cases
        if (n <= 1n) {
            throw new FactorizationError(`❌ Invalid Input: ${n.toString()} has no prime factors.`);
        }

        // Data Structure Choice: Map
        // Array [2, 2, 2, 3] ke bajaye Map { 2 => 3, 3 => 1 } use kar rahe hain
        // Taa ke memory compress ho aur O(1) lookups milein.
        const factors = new Map<bigint, number>();
        let current = n;
        let operationsCount = 0;

        // Step A: Handle Even Numbers (2)
        let count2 = 0;
        while (current % 2n === 0n) {
            count2++;
            current /= 2n;
        }
        if (count2 > 0) factors.set(2n, count2);

        // Step B: Handle Odd Numbers (3, 5, 7...) up to √current
        for (let i = 3n; i * i <= current; i += 2n) {
            
            // 🛑 Anti-Blocking Mechanism (Architect Level)
            // Har 1 Million operations ke baad Node.js ki thread ko release karo
            operationsCount++;
            if (operationsCount % 1_000_000 === 0) {
                await this.yieldToEventLoop();
            }

            let count = 0;
            while (current % i === 0n) {
                count++;
                current /= i;
            }
            if (count > 0) factors.set(i, count);
        }

        // Step C: Agar bachne wala number khud prime hai
        if (current > 2n) {
            factors.set(current, 1);
        }

        return factors;
    }
}

// ==========================================
// 🚀 HYPERSCALE EXECUTION
// ==========================================
(async () => {
    try {
        console.log("⚡ Booting Quantum Factorization Engine...");
        console.time("FactorizationTime");

        // Use BigInt (n) to prevent IEEE-754 precision loss
        const targetNumber =  999999999999989n; // Try larger numbers like 9007199254740991n later
        
        const result = await QuantumFactorizationEngine.decompose(targetNumber);
        
        console.timeEnd("FactorizationTime");

        // Format and Print output mathematically: 315 = 3^2 * 5^1 * 7^1
        const equations: string[] =[];
        result.forEach((power, prime) => {
            equations.push(`${prime}^${power}`);
        });

        console.log(`🔢 Result: ${targetNumber} = ${equations.join(' * ')}`);

    } catch (error) {
        if (error instanceof FactorizationError) {
            console.error(error.message);
        } else {
            console.error("🚨 CRITICAL SYSTEM FAILURE:", error);
        }
    }
})();