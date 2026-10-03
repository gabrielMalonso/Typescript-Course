function sortedSquares(nums: number[]): number[] {
    let esq = 0;
    let dir = nums.length - 1;
    const arraySaida: number[] = [];
    let posicaoSaida: number = nums.length - 1;

    while (esq <= dir) {
        const esquerdaAoQuadrado = nums[esq] * nums[esq];
        const direitaAoQuadrado = nums[dir] * nums[dir];

        if (esquerdaAoQuadrado > direitaAoQuadrado) {
            arraySaida[posicaoSaida] = esquerdaAoQuadrado;
            esq++;
        } else {
            arraySaida[posicaoSaida] = direitaAoQuadrado;
            dir--;
        }
        posicaoSaida--;
    }
    return arraySaida;
}
// Example 1:
let nums = [-4, -1, 0, 3, 10];
console.log(sortedSquares(nums));
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].

// Example 2:
nums = [-7, -3, 2, 3, 11];
console.log(sortedSquares(nums));
// Output: [4,9,9,49,121]
