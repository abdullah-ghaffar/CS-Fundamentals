/**
 * Algorithm: Insertion Sort (Stable & In-place)
 */
function sortTransactions(amounts: number[]): number[] {
    const n = amounts.length;

    for (let i = 1; i < n; i++) {
        let current: number = amounts[i];
        let j: number = i - 1;

        // Compare and Shift logic
        while (j >= 0 && amounts[j] > current) {
            amounts[j + 1] = amounts[j];
            j--;
        }
        amounts[j + 1] = current;
    }
    return amounts;
}

const dailyPayments: number[] = [500, 100, 400, 200];
console.log("TS Optimized Sort:", sortTransactions(dailyPayments));