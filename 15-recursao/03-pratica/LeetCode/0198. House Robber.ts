function rob(nums: number[]): number {
    const memo = new Map<number, number>();

    function calculos(i: number): number {
        if (i >= nums.length) return 0;

        const memory = memo.get(i);
        if (memory !== undefined) {
            return memory;
        }
        const opcaoRoubar = nums[i] + calculos(i + 2);
        const opcaoPular = calculos(i + 1);
        const opcaoEscolhida = Math.max(opcaoRoubar, opcaoPular);
        memo.set(i, opcaoEscolhida);

        return opcaoEscolhida;
    }

    return calculos(0);
}

// Example 1:
let nums = [1, 2, 3, 1];
console.log(rob(nums));
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

// Example 2:
nums = [2, 7, 9, 3, 1];
console.log(rob(nums));
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.
