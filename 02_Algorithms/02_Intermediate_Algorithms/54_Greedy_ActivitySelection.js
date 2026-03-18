/**
 * FILE: 54_Greedy_ActivitySelection.js
 * Pattern: Activity Selection (Interval Scheduling)
 * Efficiency: O(N log N) - Sorting ki wajah se
 */

function selectMaxMeetings(meetings) {
    // 1. Sort by Finish Time (The Greedy Choice)
    meetings.sort((a, b) => a.end - b.end);

    let count = 0;
    let lastEndTime = -1;

    for (let meeting of meetings) {
        // Agar meeting ka start time, last meeting ke end time ke baad hai
        if (meeting.start >= lastEndTime) {
            count++;
            lastEndTime = meeting.end;
            console.log(`[Scheduled] Meeting (${meeting.start} to ${meeting.end})`);
        }
    }

    return count;
}

// --- EXECUTION ---
const myCalendar = [
    { start: 1, end: 2 },
    { start: 3, end: 4 },
    { start: 0, end: 6 }, // Yeh bohot lambi meeting hai, Greedy isay reject kar dega
    { start: 5, end: 7 },
    { start: 8, end: 9 }
];

console.log("Total meetings scheduled:", selectMaxMeetings(myCalendar));
// Output: 4 meetings (1-2, 3-4, 5-7, 8-9)