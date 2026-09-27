function pivotIndex(nums: number[]): number {
    let somaArrayTotal = 0;
    // somar array total
    for (let i = 0; i < nums.length; i++) {
        somaArrayTotal += nums[i];
    }

    // Estado inicial do array
    let leftSum: number = 0;
    let rightSum: number = somaArrayTotal - nums[0];
    if (leftSum === rightSum) return 0;
    for (let i = 1; i < nums.length; i++) {
        leftSum += nums[i - 1];
        rightSum -= nums[i];
        if (leftSum === rightSum) return i;
    }
    return -1;
}

// Example 1:
let nums = [1, 7, 3, 6, 5, 6];
console.log(pivotIndex(nums));
// Output: 3
// Explanation:
// The pivot index is 3.
// Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
// Right sum = nums[4] + nums[5] = 5 + 6 = 11

// Example 2:
nums = [1, 2, 3];
console.log(pivotIndex(nums));
// Output: -1
// Explanation:
// There is no index that satisfies the conditions in the problem statement.

// Example 3:
nums = [2, 1, -1];
console.log(pivotIndex(nums));
// Output: 0
// Explanation:
// The pivot index is 0.
// Left sum = 0 (no elements to the left of index 0)
// Right sum = nums[1] + nums[2] = 1 + -1 = 0
