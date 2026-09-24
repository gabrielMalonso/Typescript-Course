function removeElement(nums: number[], val: number): number {
    let escritor = 0;
    let k = 0;
    nums.forEach(valor => {
        if (valor !== val) k++;
    });
    console.log(k);
    
    for(let i = 0; i < nums.length ; i++){
        if (nums[i] !== val){
            nums[escritor] = nums[i];
            escritor++;
        }
    }
    console.log(nums);
    return k;
}



// Example 1:
let nums = [3,2,2,3];
let val = 3;
removeElement(nums, val);
// Output: 2, nums = [2,2,_,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 2.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:
nums = [0,1,2,2,3,0,4,2];
val = 2;
removeElement(nums, val);
// Output: 5, nums = [0,1,4,0,3,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
// Note that the five elements can be returned in any order.
// It does not matter what you leave beyond the returned k (hence they are underscores).
