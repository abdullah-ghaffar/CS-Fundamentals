/**
 * Recursive Token Accumulator
 * Pattern: Functional Accumulation
 */
function calculateTotalTokens(days: number): number {
    // Guard Clause (Base Case)
    if (days <= 0) {
        return 0;
    }

    // Step-by-step reduction
    return days + calculateTotalTokens(days - 1);
}

const n: number = 4;
const result: number = calculateTotalTokens(n); 

console.log(`AI Token usage for ${n} days: ${result} tokens.`);