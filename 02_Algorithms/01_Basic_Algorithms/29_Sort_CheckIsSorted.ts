/**
 * Data Guard: Checks if a numeric sequence is ascending.
 * Performance: O(n) - Very fast.
 */
function validateSequence(data: number[]): boolean {
    for (let i: number = 0; i < data.length - 1; i++) {
        // Shart: Pehla number agle se bara nahi hona chahiye
        if (data[i] > data[i + 1]) {
            return false;
        }
    }
    return true;
}

const transactionHistory: number[] = [10, 20, 30, 40, 50];
const isOk: boolean = validateSequence(transactionHistory);

if (isOk) {
    console.log("✅ Data is Validated and Sorted.");
} else {
    console.log("❌ Alert: Data is out of order! Sorting required.");
}