/**
 * FILE: 24_CLL_Operations.ts
 * Pattern: Circular Traversal with Safety Termination
 */

class ServerNode {
    public serverName: string;
    public next: ServerNode | null = null;
    constructor(name: string) { this.serverName = name; }
}

class LoadBalancer {
    private head: ServerNode | null = null;
    private tail: ServerNode | null = null;

    // Server shamil karna (CLL style)
    public addServer(name: string): void {
        const newNode = new ServerNode(name);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
            this.tail.next = this.head;
        }
    }

    /**
     * SAFE TRAVERSAL: Ek martaba poora circle ghoomna
     */
    public runMaintenanceCheck(): void {
        if (!this.head) {
            console.log("No servers in the cluster.");
            return;
        }

        let current: ServerNode = this.head;

        console.log("--- Starting Maintenance Cycle ---");

        // Strategy: Do-While ensures we process the head, 
        // and stop EXACTLY when we come back to it.
        do {
            console.log(`[OK] Diagnostic complete for: ${current.serverName}`);
            current = current.next!; // Exclamation marks because we know it's circular
        } while (current !== this.head);

        console.log("--- Cycle Finished. Cluster is Healthy ---");
    }
}

// --- EXECUTION ---
const myCluster = new LoadBalancer();
myCluster.addServer("GPT-4-Engine");
myCluster.addServer("Claude-3-Opus");
myCluster.addServer("Llama-3-70B");

myCluster.runMaintenanceCheck();