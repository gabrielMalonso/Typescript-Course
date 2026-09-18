function numIdenticalPairs(nums: number[]): number {
    // A ideia central seria percorrer o array duas vezes, mas prestando atenção porque i deve ser menor do que j. Então j deve ser, por consequência, sempre maior. Isso é importante para ser levado em consideração na hora de montar o loop interno.
    let countGood = 0;
    for (let i = 0 ; i < nums.length ; i++) {
        for (let j = i + 1 ; j < nums.length ; j++) {
            if(nums[i] === nums [j]) {
                countGood++;
            }
        }
    }
    return countGood;
}