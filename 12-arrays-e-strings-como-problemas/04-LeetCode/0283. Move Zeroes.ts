/**
 Do not return anything, modify nums in-place instead.
 */
 function moveZeroes(nums: number[]): void {
    let holdIndex = 0;
    let hold = 0;

    for (let i = 0 ; i < nums.length ; i++){
        if (nums[i] === 0){
            holdIndex = i;
            hold = nums[i];
            continue;
        }
        nums[holdIndex] = nums[i];
        nums[i] = hold;
        holdIndex++;
    }
    console.log(nums);
 };

// Example 1:

let nums = [0,1,0,3,12];
moveZeroes(nums);
// Output: [1,3,12,0,0]
// Example 2:

nums = [0];
moveZeroes(nums);
// Output: [0]

nums = [0, 0, 1];
moveZeroes(nums);