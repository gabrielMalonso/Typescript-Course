function runningSum(nums: number[]): number[] {
    const soma: number[] = [];

    soma.push(nums[0]);

    for (let i = 1 ; i < nums.length ; i++) {
        soma.push(nums[i] + soma[i-1]);
    }
    return soma;
}