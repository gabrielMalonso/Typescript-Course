function removeDuplicates(nums: number[]): number {
    let escritor = 1; // como já sabemos que o array está em ordem, a posição 0 não deve ser alterada.

    for (let i = 1 ; i < nums.length ; i++){
        if (nums[escritor - 1] !== nums[i]){
            nums[escritor] = nums[i];
            escritor++;
        }
    }
    return escritor;
}

// Example 1:
let nums = [1, 1, 2];
removeDuplicates(nums);
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:
nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
removeDuplicates(nums);
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).