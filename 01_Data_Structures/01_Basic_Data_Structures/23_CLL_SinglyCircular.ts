/**
 * FILE: 23_CLL_SinglyCircular.ts
 * Pattern: Cyclic Data Structure (Last -> First)
 */

class GameNode {
    public player: string;
    public next: GameNode | null = null;
    constructor(name: string) { this.player = name; }
}

class MultiplayerSystem {
    private head: GameNode | null = null;
    private tail: GameNode | null = null;
    public length: number = 0;

    // Player ko circle mein shamil karna
    public addPlayer(name: string): void {
        const newNode = new GameNode(name);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head; // Apna rasta apne hi paas
        } else {
            this.tail!.next = newNode;
            newNode.next = this.head; // CIRCLE POINT: Tail connects to Head
            this.tail = newNode;
        }
        this.length++;
    }

    // Display: Circle ko aik martaba print karna
    public showTurns(): void {
        if (!this.head) return;
        
        let current: GameNode | null = this.head;
        let result = "";
        
        // Circular list mein hum 'do-while' loop use karte hain
        // Taake hum Head se shuru hon aur dobara Head par aakar ruk skein
        do {
            result += `[${current!.player}] -> `;
            current = current!.next;
        } while (current !== this.head);

        console.log("Game Cycle: " + result + "(Back to " + this.head.player + ")");
    }
}

// --- EXECUTION ---
const game = new MultiplayerSystem();
game.addPlayer("Player A");
game.addPlayer("Player B");
game.addPlayer("Player C");

game.showTurns(); 
// Output: [Player A] -> [Player B] -> [Player C] -> (Back to Player A)