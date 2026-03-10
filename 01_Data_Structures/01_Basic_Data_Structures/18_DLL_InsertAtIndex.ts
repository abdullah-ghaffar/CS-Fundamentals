// 1. Dabba (Node) ka Blueprint
class DLLNode {
    public data: string;
    public next: DLLNode | null = null;
    public prev: DLLNode | null = null;

    constructor(val: string) {
        this.data = val;
    }
}

// 2. List (Manager) ki Class
class MusicPlaylist {
    private head: DLLNode | null = null;
    private tail: DLLNode | null = null;
    public length: number = 0;

    // Aakhir mein jorna
    append(songName: string) {
        const newNode = new DLLNode(songName);
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    // Shuru mein jorna
    prepend(songName: string) {
        const newNode = new DLLNode(songName);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    // Index ke mutabiq node dhondna
    getNode(index: number): DLLNode | null {
        if (index < 0 || index >= this.length) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            if (current) current = current.next;
        }
        return current;
    }

    // SURGERY: Insert at Index
    insertAt(index: number, songName: string): boolean {
        if (index < 0 || index > this.length) return false;

        if (index === 0) { this.prepend(songName); return true; }
        if (index === this.length) { this.append(songName); return true; }

        const newNode = new DLLNode(songName);
        let beforeNode = this.getNode(index - 1); 
        
        if (!beforeNode || !beforeNode.next) return false;
        let afterNode = beforeNode.next;

        // Surgery: 4 Links Rerouting
        newNode.next = afterNode;
        newNode.prev = beforeNode;
        afterNode.prev = newNode;
        beforeNode.next = newNode;

        this.length++;
        console.log(`System: Inserted '${songName}' at index ${index}`);
        return true;
    }

    // Console mein dikhane ke liye helper function
    display() {
        let current = this.head;
        let list = "";
        while (current) {
            list += `[${current.data}] <-> `;
            current = current.next;
        }
        console.log("Playlist: " + list + "NULL");
    }
}

// ==========================================
// 3. EXECUTION: YE CODE CHALAYE GA CONSOLE MEIN
// ==========================================

const myApp = new MusicPlaylist();

console.log("--- Shuruat ---");
myApp.append("Song A");
myApp.append("Song C");
myApp.display(); // [Song A] <-> [Song C]

console.log("\n--- Surgery (Insert) Shuru ---");
myApp.insertAt(1, "Song B"); // Index 1 par B daalo
myApp.display(); // [Song A] <-> [Song B] <-> [Song C]

console.log("\n--- Final Status ---");
console.log("Total Gaane: " + myApp.length);