function intercalar(esquerda: number[], direita: number[]): number[] {
    const arraySaida: number[] = [];
    let i = 0;
    let j = 0;

    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i] <= direita[j]) {
            arraySaida.push(esquerda[i]);
            i++;
        } else {
            arraySaida.push(direita[j]);
            j++;
        }
    }

    while (i < esquerda.length) {
        arraySaida.push(esquerda[i]);
        i++;
    }
    while (j < direita.length) {
        arraySaida.push(direita[j]);
        j++;
    }
    return arraySaida;
}

function mergeSort(numeros: number[]): number[] {
    // caso base
    if (numeros.length <= 1) {
        return [...numeros];
    }

    // descobrir meio
    const meio = Math.floor(numeros.length / 2);

    // obter metade esquerda
    let esquerda = numeros.slice(0, meio);

    // obter metade direita
    let direita = numeros.slice(meio);

    // pedir para mergeSort ordenar esquerda
    esquerda = mergeSort(esquerda);

    // pedir para mergeSort ordenar direita
    direita = mergeSort(direita);

    // usar SUA intercalar()
    return intercalar(esquerda, direita);
}
