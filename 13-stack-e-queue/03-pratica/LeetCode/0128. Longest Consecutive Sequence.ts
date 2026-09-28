function longestConsecutive(nums: number[]): number {
    const numsSet = new Set<number>(nums);
    let maiorSequencia = 0;

    for (const numero of numsSet) {
        // Não é início de sequência
        if (numsSet.has(numero - 1)) continue;

        // É início de sequência
        let referencia = numero;
        let tamanhoSequencia = 0;

        while (numsSet.has(referencia)) {
            tamanhoSequencia++;
            referencia++;
        }

        if (tamanhoSequencia > maiorSequencia) {
            maiorSequencia = tamanhoSequencia;
        }
    }

    return maiorSequencia;
}

// Example 1:
let nums = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutive(nums));
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

// Example 2:
nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
console.log(longestConsecutive(nums));
// Output: 9

// Example 3:
nums = [1, 0, 1, 2];
console.log(longestConsecutive(nums));
// Output: 3
