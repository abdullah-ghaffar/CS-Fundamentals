/**
 * SubsequenceGenerator: Uses Pick/Non-Pick backtracking pattern.
 */
class SubsequenceGenerator {
    
    public generate(nums: number[]): number[][] {
        const result: number[][] = [];
        this.backtrack(nums, 0, [], result);
        return result;
    }

    private backtrack(nums: number[], index: number, current: number[], result: number[][]): void {
        // Base Case: Jab hum array ke end par pohanch jayein
        if (index === nums.length) {
            result.push([...current]); // Defensive copy of the current state
            return;
        }

        // Choice 1: PICK the element
        current.push(nums[index]);
        this.backtrack(nums, index + 1, current, result);

        // Choice 2: NON-PICK the element (Backtrack/undo the pick)
        current.pop();
        this.backtrack(nums, index + 1, current, result);
    }
}

// --- Execution Block ---
const gen = new SubsequenceGenerator();
const nums = [1, 2, 3];
console.log("Subsequences:", gen.generate(nums));