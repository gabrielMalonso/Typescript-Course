function contarFormas(n: number): number {
    const memo = new Map<number, number>();

    function calculos(n: number): number {
        // base
        if (n <= 1) return 1;

        // Memoização
        const memoria = memo.get(n);
        if (memoria !== undefined) return memoria;

        // recursão
        const resultado = calculos(n - 1) + calculos(n - 2);
        memo.set(n, resultado);
        return resultado;
    }
    return calculos(n);
}

console.log(contarFormas(0)); // 1
console.log(contarFormas(1)); // 1
console.log(contarFormas(2)); // 2
console.log(contarFormas(3)); // 3
console.log(contarFormas(4)); // 5
console.log(contarFormas(5)); // 8
console.log(contarFormas(6)); // 13
