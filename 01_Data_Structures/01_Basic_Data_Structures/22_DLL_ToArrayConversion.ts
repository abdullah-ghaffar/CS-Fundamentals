/**
 * FILE: 22_DLL_ToArrayConversion.ts
 * Pattern: Data Transformation (Adapter Pattern basics)
 */

class DLLNode {
    data: string;
    next: DLLNode | null = null;
    prev: DLLNode | null = null;
    constructor(val: string) { this.data = val; }
}

class DataProcessor {
    private head: DLLNode | null = null;
    private tail: DLLNode | null = null;
    public length: number = 0;

    // Method 1: DLL se Array banana (Exporting)
    public toArray(): string[] {
        const result: string[] = [];
        let current = this.head;

        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    // Method 2: Array se DLL banana (Importing)
    // Architect's Tip: Use 'static' to create a list directly from an array
    public static fromArray(data: string[]): DataProcessor {
        const newList = new DataProcessor();
        data.forEach(item => newList.append(item));
        return newList;
    }

    // Standard Append
    append(val: string) {
        const newNode = new DLLNode(val);
        if (!this.tail) { this.head = this.tail = newNode; }
        else { this.tail.next = newNode; newNode.prev = this.tail; this.tail = newNode; }
        this.length++;
    }
}

// --- EXECUTION ---

// Step A: Manually list banayi
const logs = new DataProcessor();
logs.append("User Login");
logs.append("API Request");
logs.append("User Logout");

// Step B: List ko Array mein badla (Export for AI Model)
const arrayFormat = logs.toArray();
console.log("Exported Array:", arrayFormat); 
// Output: ["User Login", "API Request", "User Logout"]

// Step C: Wapis Array se List banayi (Importing back)
const importedList = DataProcessor.fromArray(["Task 1", "Task 2"]);
console.log("Imported List Length:", importedList.length);