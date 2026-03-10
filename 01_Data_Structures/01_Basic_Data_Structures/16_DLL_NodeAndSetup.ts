/**
 * Doubly Linked List Node Structure
 * Optimized for Bi-directional navigation
 */
class DoublyNode {
    public data: string;
    public next: DoublyNode | null = null;
    public prev: DoublyNode | null = null;

    constructor(data: string) {
        this.data = data;
    }
}

// Setup
const home: DoublyNode = new DoublyNode("Home.html");
const dashboard: DoublyNode = new DoublyNode("Dashboard.html");

// Linking (The Bi-directional Bridge)
home.next = dashboard;
dashboard.prev = home;

console.log(`Current: ${dashboard.data}, Previous: ${dashboard.prev?.data}`);