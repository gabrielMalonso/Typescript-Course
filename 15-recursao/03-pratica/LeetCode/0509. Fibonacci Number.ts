function fib(n: number): number {
    const memo = new Map<number, number>();

    function calculos(n: number): number {
        //base
        if (n <= 1) return n;

        //memoização
        const memoria = memo.get(n);
        if (memoria !== undefined) {
            return memoria;
        }
        const resultado = calculos(n - 1) + calculos(n - 2);
        memo.set(n, resultado);
        return resultado;
    }
    return calculos(n);
}

// Example 1:
let n = 2;
console.log(fib(n));
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

// Example 2:
n = 3;
console.log(fib(n));
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

// Example 3:
n = 4;
console.log(fib(n));
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
