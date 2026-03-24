function heapSort(arr) {
  const n = arr.length;

  // 1. Build Max-Heap (Rearrange array)
  // Hum last non-leaf node se shuru karte hain: (n/2 - 1)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 2. Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Current root (sab se bari value) ko end par bhejo
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Baqi bachay hue heap par heapify chalao (size 'i' tak)
    heapify(arr, i, 0);
  }
  return arr;
}

// Main Heapify Logic (Max-Heap)
function heapify(arr, size, i) {
  let largest = i; // Root ko largest mano
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // Agar left child root se bada hai
  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }

  // Agar right child ab tak ke largest se bada hai
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }

  // Agar largest root nahi hai to swap karo
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively niche wale sub-tree ko heapify karo
    heapify(arr, size, largest);
  }
}

// --- TESTING THE SORT ---
const unsortedArray = [12, 11, 13, 5, 6, 7];
console.log("Before Sorting:", unsortedArray);

heapSort(unsortedArray);

console.log("After Sorting (In-Place):", unsortedArray);

// Check if sorted correctly
const isSorted = unsortedArray.every((val, i, arr) => !i || arr[i-1] <= val);
console.log(isSorted ? "✅ Success: Array is sorted!" : "❌ Error: Sorting failed.");