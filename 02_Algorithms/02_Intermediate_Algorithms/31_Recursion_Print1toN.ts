/**
 * Recursive AI Epoch Controller
 * Purpose: Understanding the Call Stack & Base Case
 */
function runTraining(current: number, total: number): void {
    // Base Case: Prevent Stack Overflow
    if (current > total) {
        console.log("✅ All Epochs Completed.");
        return;
    }

    console.log(`🚀 Starting AI Training Round ${current} of ${total}...`);

    // Self-invocation with incremented state
    runTraining(current + 1, total);
}

runTraining(1, 3);