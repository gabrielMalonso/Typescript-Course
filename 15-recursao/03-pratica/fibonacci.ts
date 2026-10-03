function fibonacci(n: number): number {
    const fiboMap = new Map<number, number>();

    function calculos(n: number): number {
        // base
        if (n <= 1) return n;

        const salvo = fiboMap.get(n);
        if (salvo !== undefined) return salvo;

        const resultado = calculos(n - 1) + calculos(n - 2);
        fiboMap.set(n, resultado);
        return resultado;
    }
    return calculos(n);
}

console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8
