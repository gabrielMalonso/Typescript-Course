function buscarComContagem(
    numeros: number[],
    alvo: number,
): readonly [indice: number, comparacoes: number] {
    let comparacoes = 0;
    const indice = numeros.findIndex((valor) => {
        comparacoes++;
        return valor === alvo;
    });

    return [indice, comparacoes];
}

console.log(buscarComContagem([4, 7, 7, 9], 7));
// esperado: [1, 2]

console.log(buscarComContagem([5, 8, 12], 3));
// esperado: [-1, 3]

console.log(buscarComContagem([10, 20, 30], 10));
// esperado: [0, 1]
