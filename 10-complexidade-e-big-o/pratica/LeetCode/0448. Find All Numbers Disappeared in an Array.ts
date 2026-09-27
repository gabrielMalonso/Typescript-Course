function findDisappearedNumbers(nums: number[]): number[] {
    const missingNums: number[] = [];
    const vistos = new Set<number>(nums);

    for (let i = 0 ; i < nums.length ; i++) {
        if (vistos.has(i + 1)) continue;
        missingNums.push(i + 1);
    }
    return missingNums;
}