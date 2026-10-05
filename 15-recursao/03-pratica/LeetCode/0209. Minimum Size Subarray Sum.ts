function minSubArrayLen(target: number, nums: number[]): number {
    let esq = 0;
    let acumulado = 0;
    let minTamanho = Infinity;

    for (let dir = 0; dir < nums.length; dir++) {
        acumulado += nums[dir];

        if (acumulado < target) continue;

        while (acumulado >= target) {
            const tamanho = dir - esq + 1;

            if (minTamanho > tamanho) minTamanho = tamanho;

            acumulado -= nums[esq];
            esq++;
        }
    }
    return minTamanho === Infinity ? 0 : minTamanho;
}

// Example 1:
let target = 7;
let nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(target, nums));
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

// Example 2:
target = 4;
nums = [1, 4, 4];
console.log(minSubArrayLen(target, nums));
// Output: 1

// Example 3:
target = 11;
nums = [1, 1, 1, 1, 1, 1, 1, 1];
console.log(minSubArrayLen(target, nums));
// Output: 0
