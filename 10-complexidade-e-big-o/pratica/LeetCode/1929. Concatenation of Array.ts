function getConcatenation(nums: number[]): number[] {
    // Estou pensando inicialmente em usar dois FOR, mas eles não estarão alinhados. A ideia é usar um FOR e depois outro, fazendo push para o array a ser retornado.
    const ans: number[] = [];

    for(let i = 0 ; i < nums.length ; i++) {
        ans.push(nums[i]);
    }
    for (let i = 0 ; i < nums.length ; i++) {
        ans.push(nums[i]);
    }
    return ans;
};