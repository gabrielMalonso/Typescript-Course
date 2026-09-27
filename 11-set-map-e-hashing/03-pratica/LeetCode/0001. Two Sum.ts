function twoSum(nums: number[], target: number): number[] {
    const valores = new Map<number, number>();
    for (let i = 0 ; i < nums.length ; i++) {
        if (valores.has(target - nums[i])) {
            const valorEncontrado = valores.get(target - nums[i]);
            return [i, valorEncontrado!];
        }
        valores.set (nums[i], i);
    }   
    throw new Error("Nenhuma solução encontrada");
};