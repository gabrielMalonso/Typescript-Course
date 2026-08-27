function calcularTotalComTaxa(taxa: number, ...valores: number[]): number {
    let total = taxa;

    for (const valor of valores) {
        total += valor;
    }
    return total;
}

console.log(calcularTotalComTaxa(5, 10, 20, 30)); // 65
console.log(calcularTotalComTaxa(5));             // 5
console.log(calcularTotalComTaxa(0, -2, 2));      // 0

// alcularTotalComTaxa(5, [10, 20]) violaria o contrato da função, uma vez que, apesar de `...valores: number[]` ser, também, do tipo array, porque ele se mostra apenas um parâmetro da função. A razão para existir o rest parameter é ter parâmetros indefinidos. 