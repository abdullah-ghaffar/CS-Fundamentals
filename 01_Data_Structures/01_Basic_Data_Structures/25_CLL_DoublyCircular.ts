/**
 * FILE: 25_CLL_DoublyCircular.ts
 * Pattern: Infinite Bi-directional Ring
 */

class DCNode {
    public data: string;
    public next: DCNode | null = null;
    public prev: DCNode | null = null;
    constructor(val: string) { this.data = val; }
}

class AIModelHub {
    private head: DCNode | null = null;
    private tail: DCNode | null = null;

    public addModel(name: string): void {
        const newNode = new DCNode(name);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            // Apna rasta apne hi paas (Both ways)
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            // Surgery: 4 Pointers update karne hain
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            
            newNode.next = this.head; // Forward Circle
            this.head.prev = newNode; // Backward Circle
            
            this.tail = newNode;
        }
    }

    // Aage ki taraf chakra lagana
    public rotateForward(steps: number): void {
        if (!this.head) return;
        let current = this.head;
        console.log("Rotating Forward:");
        for (let i = 0; i < steps; i++) {
            console.log(`Current Model: ${current.data}`);
            current = current.next!;
        }
    }

    // Piche ki taraf chakra lagana
    public rotateBackward(steps: number): void {
        if (!this.tail) return;
        let current = this.tail;
        console.log("Rotating Backward:");
        for (let i = 0; i < steps; i++) {
            console.log(`Current Model: ${current.data}`);
            current = current.prev!;
        }
    }
}

// --- EXECUTION ---
const hub = new AIModelHub();
hub.addModel("GPT-4");
hub.addModel("Claude-3");
hub.addModel("Llama-3");

hub.rotateForward(4);  // GPT-4 -> Claude -> Llama -> GPT-4
hub.rotateBackward(4); // Llama -> Claude -> GPT-4 -> Llama