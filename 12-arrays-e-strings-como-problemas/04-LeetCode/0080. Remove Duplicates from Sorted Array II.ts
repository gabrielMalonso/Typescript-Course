function removeDuplicates(nums: number[]): number {
    let escritor: number = 0;

    for (let i = 0 ; i < nums.length ; i++){
        if (nums[escritor - 2] !== nums[i]){
            nums[escritor] = nums[i];
            escritor++;
        }
    }
    console.log(nums);
    return escritor;
}


// Example 1:
let nums = [1, 1, 1, 2, 2, 3];
removeDuplicates(nums);
// Output: 5, nums = [1,1,2,2,3,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2
nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
removeDuplicates(nums);
// Output: 7, nums = [0,0,1,1,2,3,3,_,_]
// Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).
