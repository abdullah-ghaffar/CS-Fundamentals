export {}; // Conflict se bachne ke liye

/**
 * FILE: 31_Stack_ArrayBased.ts
 * Pattern: LIFO (Last In, First Out)
 * Storage: Contiguous Memory (Array)
 */

class AIUndoStack<T> {
    // Private taake bahar se koi .length ya .push direct na kar sakay
    private storage: T[] = [];

    /**
     * PUSH: Adds an item to the top of the stack.
     * Efficiency: O(1)
     */
    public push(item: T): void {
        this.storage.push(item);
        console.log(`[Push] Added to Stack: ${item}`);
    }

    /**
     * POP: Removes and returns the top item.
     * Efficiency: O(1)
     */
    public pop(): T | string {
        if (this.isEmpty()) {
            return "Stack is Empty! Nothing to Undo.";
        }
        return this.storage.pop()!;
    }

    /**
     * PEEK: View the top item without removing it.
     */
    public peek(): T | null {
        return this.isEmpty() ? null : this.storage[this.storage.length - 1];
    }

    public isEmpty(): boolean {
        return this.storage.length === 0;
    }

    public size(): number {
        return this.storage.length;
    }
}

// --- EXECUTION ---
const textEditor = new AIUndoStack<string>();

textEditor.push("Hello World");
textEditor.push("AI is Awesome");
textEditor.push("Learning Stacks");

console.log("Current Top (Peek):", textEditor.peek());

console.log("Action Taken:", textEditor.pop()); // Learning Stacks bahar aa jayega
console.log("Action Taken:", textEditor.pop()); // AI is Awesome bahar aa jayega

console.log("Remaining Size:", textEditor.size());