/**
 * High-Performance Merger for pre-sorted datasets.
 * Time Complexity: O(n + m) - Extremely fast!
 */
function mergeStreams(streamA: number[], streamB: number[]): number[] {
    const result: number[] = [];
    let p1: number = 0;
    let p2: number = 0;

    while (p1 < streamA.length && p2 < streamB.length) {
        if (streamA[p1] <= streamB[p2]) {
            result.push(streamA[p1]);
            p1++;
        } else {
            result.push(streamB[p2]);
            p2++;
        }
    }

    // Remaining elements spread operator (Modern TS way)
    return [...result, ...streamA.slice(p1), ...streamB.slice(p2)];
}

const branchA = [100, 300, 500];
const branchB = [200, 400, 600, 700, 800];

console.log("Merged FinTech Data:", mergeStreams(branchA, branchB));