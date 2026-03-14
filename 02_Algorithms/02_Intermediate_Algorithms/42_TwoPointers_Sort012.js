/**
 * FILE: 42_TwoPointers_Sort012.js
 * Pattern: Dutch National Flag Algorithm (3-way partition)
 * Efficiency: O(N) Time, O(1) Space
 */

function sort012(arr) {
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;

    console.log("Original:", arr);

    while (mid <= high) {
        switch (arr[mid]) {
            case 0:
                // Swap arr[low] and arr[mid]
                [arr[low], arr[mid]] = [arr[mid], arr[low]];
                low++;
                mid++;
                break;

            case 1:
                mid++; // Kuch mat karo, aage barho
                break;

            case 2:
                // Swap arr[mid] and arr[high]
                [arr[high], arr[mid]] = [arr[mid], arr[high]];
                high--; // Sirf high ko peechay hatao
                break;
        }
    }

    console.log("Sorted:  ", arr);
    return arr;
}

// --- EXECUTION (Check karte hain) ---
const labels = [0, 1, 2, 0, 1, 2, 1, 0];
sort012(labels);
// Output aayega: Sorted: [ 0, 0, 0, 1, 1, 1, 2, 2 ]