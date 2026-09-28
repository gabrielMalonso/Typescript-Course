function missingNumber(nums: number[]): number {
    const n = nums.length;
    const soma = (n * (n + 1)) / 2;
    let somaArray = 0;

    for (let i = 0; i < n; i++) {
        somaArray += nums[i];
    }
    return soma - somaArray;
}

// Example 1:
let nums = [3, 0, 1];
console.log(missingNumber(nums));
// Output: 2
// Explanation:
// n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

// Example 2:
nums = [0, 1];
console.log(missingNumber(nums));
// Output: 2
// Explanation:
// n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

// Example 3:
nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(missingNumber(nums));
// Output: 8
// Explanation:
// n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
