function threeSum(nums: number[]): number[][] {
    const arraySaida: number[][] = [];
    const ordenado = [...nums].sort((a, b) => a - b);

    for (let fixo = 0; fixo < ordenado.length; fixo++) {
        if (fixo > 0 && ordenado[fixo] === ordenado[fixo - 1]) {
            continue;
        }
        let esq = fixo + 1;
        let dir = ordenado.length - 1;

        while (esq < dir) {
            const soma = ordenado[fixo] + ordenado[esq] + ordenado[dir];

            if (soma === 0) {
                arraySaida.push([ordenado[fixo], ordenado[esq], ordenado[dir]]);
                esq++;
                dir--;

                while (esq < dir && ordenado[esq] === ordenado[esq - 1]) {
                    esq++;
                }
                while (esq < dir && ordenado[dir] === ordenado[dir + 1]) {
                    dir--;
                }
            } else if (soma < 0) {
                esq++;
            } else {
                dir--;
            }
        }
    }
    return arraySaida;
}

// Example 1:
let nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

// Example 2:
nums = [0, 1, 1];
console.log(threeSum(nums));
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:
nums = [0, 0, 0];
console.log(threeSum(nums));
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.
