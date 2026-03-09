// 23_Array_FindMissingNumber.ts - REFINED FOR INDEX COMPATIBILITY
import { hrtime } from 'process';
import * as v8 from 'v8';

function findMissingQuantumState(arr: SharedArrayBuffer, n: bigint): bigint {
    const view = new BigUint64Array(arr);
    const expectedSum = (n * (n + 1n)) / 2n;
    let actualSum = 0n;

    for (let i = 0; i < view.length; i++) {
        actualSum += view[i];
    }

    return expectedSum - actualSum;
}

const N = 1000000n;
const sab = new SharedArrayBuffer(Number(N - 1n) * 8);
const view = new BigUint64Array(sab);

// Indexing fix: counter ko number mein rakha taake Array indexing valid ho
let counter = 0; 
for (let i = 1n; i <= N; i++) {
    if (i !== 500500n) {
        view[counter++] = i; // Now strictly valid index type
    }
}

const start = hrtime.bigint();
const missing = findMissingQuantumState(sab, N);
const end = hrtime.bigint();

console.log(`[TELEMETRY]: Missing Quantum State: ${missing}`);
console.log(`[LATENCY]: ${Number(end - start) / 1000000} ms`);
console.log(`[GC PRESSURE]: ${v8.getHeapStatistics().used_heap_size / 1024 / 1024} MB`);