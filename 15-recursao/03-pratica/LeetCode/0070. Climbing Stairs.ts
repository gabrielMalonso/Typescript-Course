function climbStairs(n: number): number {
    const memo = new Map<number, number>();

    function calcular(n: number): number {
        // base case
        if (n <= 1) return 1;

        // recursive
        const resultadoSalvo = memo.get(n);

        // verificar se o resultado salvo existe
        if (resultadoSalvo !== undefined) return resultadoSalvo;

        // Quando resultado salvo não existe, fazer o cálculo
        const resultado = calcular(n - 1) + calcular(n - 2);
        memo.set(n, resultado);
        return resultado;
    }
    return calcular(n);
}

// Example 1:
let n = 2;
console.log(climbStairs(n));
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
n = 3;
console.log(climbStairs(n));
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Example 3:
n = 4;
console.log(climbStairs(n));

// Example 4:
n = 5;
console.log(climbStairs(n));
