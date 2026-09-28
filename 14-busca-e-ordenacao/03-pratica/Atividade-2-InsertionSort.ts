function insertionSort(valores: number[]): number[] {
    for (let atual = 0; atual < valores.length; atual++) {
        const valorAtual = valores[atual];
        let posicaoAnterior = atual - 1;

        while (posicaoAnterior >= 0 && valores[posicaoAnterior] > valorAtual) {
            valores[posicaoAnterior + 1] = valores[posicaoAnterior];
            posicaoAnterior--;
        }
        valores[posicaoAnterior + 1] = valorAtual;
    }
    return valores;
}

let valores = [1, 2, 3, 4, 5];
console.log(insertionSort(valores));

valores = [5, 4, 3, 2, 1];
console.log(insertionSort(valores));

valores = [3, 1, 2];
console.log(insertionSort(valores));
