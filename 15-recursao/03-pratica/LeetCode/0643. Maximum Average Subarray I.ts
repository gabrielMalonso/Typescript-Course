function findMaxAverage(nums: number[], k: number): number {
    let maxAvarage = -Infinity;

    // primeira soma
    let index = k - 1;
    let soma = 0;
    while (index >= 0) {
        soma += nums[index];
        index--;
    }
    let average = soma / k;
    if (maxAvarage < average) {
        maxAvarage = average;
    }

    // somas subsequentes
    for (let i = 1; i <= nums.length - k; i++) {
        let j = i + k - 1;
        soma = soma - nums[i - 1];
        soma = soma + nums[j];
        average = soma / k;
        if (maxAvarage < average) {
            maxAvarage = average;
        }
    }

    return maxAvarage;
}

// Example 1:
let nums = [1, 12, -5, -6, 50, 3];
let k = 4;
console.log(findMaxAverage(nums, k));
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

// Example 2:
nums = [5];
k = 1;
// console.log(findMaxAverage(nums, k));
// Output: 5.00000
