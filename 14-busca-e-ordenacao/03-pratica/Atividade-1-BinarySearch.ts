function buscaBinaria(valores: readonly number[], alvo: number): number {
    let inicio = 0;
    let fim = valores.length - 1;

    while (inicio <= fim) {
        const meio = inicio + Math.floor((fim - inicio) / 2);
        const valorDoMeio = valores[meio];

        if (valorDoMeio === alvo) return meio;

        if (alvo >= valorDoMeio) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }

    return -1;
}

let valores: readonly number[];
let alvo: number;

valores = [];
alvo = 4;
console.log(buscaBinaria(valores, alvo));

valores = [4];
alvo = 4;
console.log(buscaBinaria(valores, alvo));

valores = [4];
alvo = 3;
console.log(buscaBinaria(valores, alvo));

valores = [1, 3, 5, 7, 9];
alvo = 1;
console.log(buscaBinaria(valores, alvo));

valores = [1, 3, 5, 7, 9];
alvo = 9;
console.log(buscaBinaria(valores, alvo));

valores = [1, 3, 5, 7, 9];
alvo = 6;
console.log(buscaBinaria(valores, alvo));

valores = [1, 3, 3, 3, 8];
alvo = 3;
console.log(buscaBinaria(valores, alvo));
