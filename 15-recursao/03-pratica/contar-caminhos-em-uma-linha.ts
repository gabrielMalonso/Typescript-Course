function contarCaminhos(n: number): number {
    const memo = new Map<number, number>();

    // função interna de cálculo:
    function calculos(n: number): number {
        // base
        if (n === 0) return 1;
        if (n < 0) return 0;

        const memoria = memo.get(n);

        if (memoria !== undefined) {
            return memoria;
        }
        // recursion
        const resultado = calculos(n - 1) + calculos(n - 3);
        memo.set(n, resultado);
        return resultado;
    }
    return calculos(n);
}

console.log(contarCaminhos(0)); // 1
console.log(contarCaminhos(1)); // 1
console.log(contarCaminhos(2)); // 1
console.log(contarCaminhos(3)); // 2
console.log(contarCaminhos(4)); // 3
console.log(contarCaminhos(5)); // 4
console.log(contarCaminhos(6)); // 6
