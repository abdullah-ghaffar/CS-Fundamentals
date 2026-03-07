import * as fs from 'fs';

class ScalableSieve {
    public static async generate(limit: number, filePath: string) {
        console.time("TotalExecutionTime");
        const startTime = Date.now();
        
        const segmentSize = 1_000_000; 
        const sqrtLimit = Math.floor(Math.sqrt(limit));
        const smallPrimes = this.getSmallPrimes(sqrtLimit);
        
        const stream = fs.createWriteStream(filePath);
        console.log(`🚀 Starting Scalable Sieve for: ${limit.toLocaleString()}`);

        // 🔥 ZERO-ALLOCATION: Array sirf ek baar banega
        const segment = new Uint8Array(segmentSize);

        for (let low = 0; low <= limit; low += segmentSize) {
            let high = Math.min(low + segmentSize - 1, limit);
            
            // Loop ke andar naya array nahi banana, purane ko hi reset karna hai
            segment.fill(1);

            for (const p of smallPrimes) {
                let start = Math.max(p * p, Math.ceil(low / p) * p);
                for (let j = start; j <= high; j += p) {
                    segment[j - low] = 0;
                }
            }

            // 🔥 HANDLING BACKPRESSURE (The Magic)
            for (let i = low; i <= high; i++) {
                if (i > 1 && segment[i - low] === 1) {
                    const canWrite = stream.write(i.toString() + "\n");
                    
                    if (!canWrite) {
                        // Agar stream ka buffer full ho gaya hai, toh CPU ko yahin rok do (await)
                        // Jab stream file mein likh kar khali ho jaye (drain), tab aage barho!
                        await new Promise(resolve => stream.once('drain', resolve));
                    }
                }
            }
        }
        
        stream.end();
        
        // Wait for file to completely finish writing
        await new Promise(resolve => stream.once('finish', resolve));

        console.timeEnd("TotalExecutionTime");
        const endTime = Date.now();
        const durationSeconds = (endTime - startTime) / 1000;
        console.log(`⏱️ Total Time Taken: ${durationSeconds.toFixed(2)} seconds`);
    }

    private static getSmallPrimes(n: number): number[] {
        const sieve = new Uint8Array(n + 1).fill(1);
        for (let p = 2; p * p <= n; p++) {
            if (sieve[p] === 1) for (let i = p * p; i <= n; i += p) sieve[i] = 0;
        }
        const primes: number[] =[];
        for (let p = 2; p <= n; p++) if (sieve[p] === 1) primes.push(p);
        return primes;
    }
}

// 🚀 EXECUTION: 
// Async function ban gaya hai, isliye IIFE use kar rahe hain
(async () => {
    // WARNING: 1 Trillion (10 Kharab) likhne mein 400 GB se zyada hard drive space use ho sakti hai! 
    // Pehle 1 Billion par check karo taake disk full na ho jaye.
    const LIMIT = 1_000_000; 
    await ScalableSieve.generate(LIMIT, 'massive_primes.txt');
})();
