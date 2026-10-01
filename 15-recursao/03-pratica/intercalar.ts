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

let esquerda = [2, 5, 7];
let direita = [1, 3, 6];
console.log(intercalar(esquerda, direita));
