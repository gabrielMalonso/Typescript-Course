function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const numsMap = new Map<number, number>();
    for(let i = 0 ; i < nums.length ; i++) {
        if(numsMap.has(nums[i])){
            const indiceAnterior = numsMap.get(nums[i])!;
            if(i - indiceAnterior <= k){
                return true;
            }
        }
        numsMap.set(nums[i], i);
    }
    return false;
}

let nums = [1,2,3,1];
let k = 3;
console.log(containsNearbyDuplicate(nums,k)); //true

nums = [1,0,1,1];
k = 1;
console.log(containsNearbyDuplicate(nums,k)); // true

nums = [1,2,3,1,2,3];
k = 2;
console.log(containsNearbyDuplicate(nums,k)); // false