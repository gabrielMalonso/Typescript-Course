function productExceptSelf(nums: number[]): number[] {
    const answer: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        const referencia = nums[i];
        let multiplicacao: number = 1;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] !== referencia) {
                multiplicacao *= nums[j];
            }
        }
        answer.push(multiplicacao);
        multiplicacao = 1;
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
