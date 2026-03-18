/**
 * FILE: 52_Greedy_FractionalKnapsack.js
 * Pattern: Fractional Knapsack (Greedy Strategy)
 * Efficiency: O(N log N) - Sorting ki wajah se
 */

function getMaxValue(items, capacity) {
    // 1. Ratio nikaalo (Value / Weight)
    // 2. Sort karo (Bari ratio wale pehle)
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (let item of items) {
        if (remainingCapacity <= 0) break;

        if (item.weight <= remainingCapacity) {
            // Pura item utha lo
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            // Fraction utha lo (jitni jagah bachi hai)
            totalValue += item.value * (remainingCapacity / item.weight);
            remainingCapacity = 0;
        }
    }
    return totalValue;
}

// --- EXECUTION ---
const items = [
    { value: 60, weight: 10 },
    { value: 100, weight: 20 },
    { value: 120, weight: 30 }
];
const capacity = 50;

console.log("Max Value in Bag:", getMaxValue(items, capacity));
// Output: 240