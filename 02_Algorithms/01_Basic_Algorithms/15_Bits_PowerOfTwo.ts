/**
 * IRON RULE 2: Strict Type Mastery
 * Branded Type for 15-Bit Unsigned Integer [0, 32767].
 * Compile-time guarantee ke invalid bounds system mein enter nahi honge.
 */
declare const __brand: unique symbol;
export type Uint15 = number & { readonly [__brand]: 'Uint15' };

/**
 * IRON RULE 4: Defensive Architecture - Explicit Error Domains
 */
export class BackpressureError extends Error {
    constructor(msg: string) {
        super(`[Backpressure Triggered]: ${msg}`);
        this.name = 'BackpressureError';
    }
}

export class MemoryAlignmentError extends Error {
    constructor(msg: string) {
        super(`[MemoryAlignmentError]: ${msg}`);
        this.name = 'MemoryAlignmentError';
    }
}

/**
 * IRON RULE 5: Design Patterns on Steroids
 * Strategy Pattern for Backpressure. 
 * Hum hardcode nahi karenge ke buffer full hone par kya ho. Drop oldest? Throw error? 
 * Consumer decide karega taake decoupling maintain rahe.
 */
export interface IBackpressureStrategy {
    handleFullBuffer(buffer: HyperscaleRingBuffer, newEvent: number): void;
}

export class RejectNewestStrategy implements IBackpressureStrategy {
    handleFullBuffer(): void {
        throw new BackpressureError('Ring Buffer is full. Rejecting new event to prevent Memory Leak.');
    }
}

export class DropOldestStrategy implements IBackpressureStrategy {
    handleFullBuffer(buffer: HyperscaleRingBuffer, newEvent: number): void {
        // Force dequeue the oldest to make room, then enqueue new
        buffer.forceDequeue(); 
    }
}

/**
 * THE CORE ENGINE: Zero-GC Lock-Free Ring Buffer
 */
export class HyperscaleRingBuffer {
    // Underlying contiguous memory chunk (Bypasses V8 Garbage Collector)
    private readonly buffer: Int32Array;
    
    // Mask for O(1) bitwise modulo operations
    private readonly mask: number;
    public readonly capacity: number;

    // Sequence numbers (Using safe numbers up to 2^53 - 1)
    private writeSequence: number = 0;
    private readSequence: number = 0;

    private readonly backpressureStrategy: IBackpressureStrategy;

    constructor(capacity: number, strategy: IBackpressureStrategy = new RejectNewestStrategy()) {
        const capacityUint15 = this.validateAndCastUint15(capacity);
        
        this.capacity = capacityUint15;
        // The magic mask: If capacity is 32768 (1000000000000000 in binary)
        // mask is 32767 (0111111111111111 in binary).
        this.mask = capacityUint15 - 1;
        this.backpressureStrategy = strategy;

        // IRON RULE 1: Hyperscale Mental Model
        // Allocating pure C++ backed memory. Zero JavaScript Object allocation per event.
        this.buffer = new Int32Array(this.capacity);
    }

    /**
     * Factory validation for strict boundaries and O(1) Bitwise check
     */
    private validateAndCastUint15(value: number): Uint15 {
        if (!Number.isSafeInteger(value) || value < 1 || value > 32768) {
            throw new MemoryAlignmentError(`Capacity out of 15-bit bounds[1, 32768]. Received: ${value}`);
        }
        // O(1) Bitwise Power of Two check
        if ((value & (value - 1)) !== 0) {
            throw new MemoryAlignmentError(`Capacity MUST be a power of 2 for bitwise masking. Received: ${value}`);
        }
        return value as Uint15;
    }

    /**
     * Producer Method: O(1) Time Complexity
     */
    public enqueue(eventId: number): void {
        // Buffer Full Check
        if (this.writeSequence - this.readSequence >= this.capacity) {
            this.backpressureStrategy.handleFullBuffer(this, eventId);
            // If strategy was DropOldest, there is room now. If RejectNewest, it threw an error.
        }

        // Bitwise Modulo: writeSequence % capacity -> Extremely fast CPU ALU instruction
        const index = this.writeSequence & this.mask;
        
        this.buffer[index] = eventId;
        this.writeSequence++;
    }

    /**
     * Consumer Method: O(1) Time Complexity
     */
    public dequeue(): number | null {
        if (this.readSequence === this.writeSequence) {
            return null; // Empty
        }

        const index = this.readSequence & this.mask;
        const eventId = this.buffer[index];
        
        this.readSequence++;
        return eventId;
    }

    /**
     * Internal method strictly for DropOldestStrategy
     */
    public forceDequeue(): void {
        this.readSequence++;
    }

    public getAvailableCapacity(): number {
        return this.capacity - (this.writeSequence - this.readSequence);
    }
}

// ==========================================
// USAGE EXAMPLE & TESTING
// ==========================================
// 16384 is 2^14 (Valid 15-bit power of 2)
const ringBuffer = new HyperscaleRingBuffer(16384, new DropOldestStrategy());

// Simulating ingestion
ringBuffer.enqueue(1001);
ringBuffer.enqueue(1002);
console.log(`Dequeued: ${ringBuffer.dequeue()}`); // 1001