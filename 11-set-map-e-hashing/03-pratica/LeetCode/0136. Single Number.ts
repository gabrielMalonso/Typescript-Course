function singleNumber(nums: number[]): number {
    const numsSet = new Set<number>();

    for (let i = 0; i < nums.length ; i++) {
        if (numsSet.has(nums[i])) {
            numsSet.delete(nums[i]);
        } else {
            numsSet.add(nums[i]);
        }
    }
    for (const num of numsSet) {
        return num;
    } 
    throw new Error("Nenhuma solução encontrada");
}

let nums = [2,2,1];
singleNumber(nums);

nums = [4,1,2,1,2];
singleNumber(nums);

nums = [1];
singleNumber(nums);

nums = [4,1,4,1,2];
singleNumber(nums);
