// utilizado: Binary Search
function mySqrt(x: number): number {
    let inicio = 0;
    let fim = x;

    while (inicio <= fim) {
        let meio = inicio + Math.floor((fim - inicio) / 2);
        let meioSq = meio * meio;
        if (meioSq === x) return meio;

        if (meioSq < x) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    return fim; // maior número cujo quadrado NÃO passou de x (!!!)
}

// Example 1:
let x = 4;
console.log(mySqrt(x));
// Output: 2
// Explanation: The square root of 4 is 2, so we return 2.

// Example 2:
x = 8;
console.log(mySqrt(x));
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
