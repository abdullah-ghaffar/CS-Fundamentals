/**
 * FILE: 56_Greedy_JobSequencing.js
 * Pattern: Greedy Job Scheduling
 * Efficiency: O(N^2) (Har job ke liye piche slot dhoondna)
 */

function scheduleJobs(jobs) {
    // 1. Sort by Profit (Descending - Bari value pehle)
    jobs.sort((a, b) => b.profit - a.profit);

    // 2. Max deadline dhoondo taake slots ban sakein
    let maxDeadline = Math.max(...jobs.map(job => job.deadline));
    let slots = new Array(maxDeadline).fill(null);
    let totalProfit = 0;

    // 3. Greedy Selection
    for (let job of jobs) {
        // Deadline slot se dhoondna shuru karo (Backwards)
        for (let i = job.deadline - 1; i >= 0; i--) {
            if (slots[i] === null) {
                slots[i] = job.id; // Slot book kar liya
                totalProfit += job.profit;
                break;
            }
        }
    }

    console.log("Booked Slots (Job IDs):", slots);
    console.log("Total Profit:", totalProfit);
}

// --- EXECUTION ---
const jobs = [
    { id: 'J1', deadline: 2, profit: 100 },
    { id: 'J2', deadline: 1, profit: 19 },
    { id: 'J3', deadline: 2, profit: 27 },
    { id: 'J4', deadline: 1, profit: 25 },
    { id: 'J5', deadline: 3, profit: 15 }
];

scheduleJobs(jobs);
// Output: J1 (Profit 100), J3 (Profit 27), J4 (Profit 25) = 152