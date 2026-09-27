function containsDuplicate(nums: number[]): boolean {
    for (let i = 0; i < nums.length; i++) {
        const referencia = nums[i];

        for (let j = i + 1; j < nums.length; j++) {
            if (referencia === nums[j]) {
                return true;
            }
        }
    }

    return false;
}