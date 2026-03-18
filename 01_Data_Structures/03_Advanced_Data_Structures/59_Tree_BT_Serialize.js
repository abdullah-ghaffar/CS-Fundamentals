/**
 * FILE: 59_Tree_BT_Serialize.js
 * Pattern: Pre-order Serialization (Text snapshot of Tree)
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// 1. SERIALIZE: Tree -> String
function serialize(node) {
    if (!node) return "X"; // X ka matlab hai path khatam (null)
    
    // Root, phir Left, phir Right
    return node.data + "," + serialize(node.left) + "," + serialize(node.right);
}

// 2. DESERIALIZE: String -> Tree
function deserialize(data) {
    const nodes = data.split(",");
    
    function build() {
        const val = nodes.shift(); // Pehla dabba uthao
        if (val === "X") return null; // Agar X hai toh null wapis karo
        
        const node = new TreeNode(parseInt(val));
        node.left = build();  // Recursively left dabba banao
        node.right = build(); // Recursively right dabba banao
        return node;
    }
    
    return build();
}

// --- EXECUTION ---
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);

const serializedData = serialize(root);
console.log("Tree Snapshot (String):", serializedData); 
// Output: 10,5,X,X,15,X,X

const newTree = deserialize(serializedData);
console.log("Deserialized Root:", newTree.data);