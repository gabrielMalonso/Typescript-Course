function productExceptSelf(nums: number[]): number[] {
    const answer: number[] = [];
    const prefixo: number[] = [];
    const sufixo = [];

    // construir sufixo e prefixo
    prefixo[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        prefixo[i] = prefixo[i - 1] * nums[i - 1];
    }

    sufixo[nums.length - 1] = 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        sufixo[i] = sufixo[i + 1] * nums[i + 1];
    }

    // multiplicar sufixo e prefixo para cada posição.
    for (let i = 0; i < nums.length; i++) {
        answer[i] = prefixo[i] * sufixo[i];
    }
    return answer;
}

// Example 1:
let nums = [1, 2, 3, 4];
console.log(productExceptSelf(nums));
// Output: [24,12,8,6]

// Example 2:
nums = [-1, 1, 0, -3, 3];
console.log(productExceptSelf(nums));
// Output: [0,0,9,0,0]
