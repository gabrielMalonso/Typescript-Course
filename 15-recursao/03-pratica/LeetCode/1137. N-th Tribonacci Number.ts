function tribonacci(n: number): number {
    const memo = new Map<number, number>();

    function calculos(n: number): number {
        if (n <= 1) return n;
        if (n === 2) return 1;

        const memory = memo.get(n);
        if (memory !== undefined) return memory;
        const resultado = calculos(n - 1) + calculos(n - 2) + calculos(n - 3);
        memo.set(n, resultado);
        return resultado;
    }
    return calculos(n);
}

// Example 1:
let n = 4;
console.log(tribonacci(n));
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4

// Example 2:
n = 25;
console.log(tribonacci(n));
// Output: 1389537
