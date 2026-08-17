const obterMaior = (valores: number[]): number => {
    let maior = 0;
    if (valores.length === 0) {
        return 0;
    } else {
        for (let indice = 0; indice < valores.length; indice++) {
            if (indice === 0) {
                maior = valores[indice];
            } else if (maior < valores[indice]) {
                maior = valores [indice];                
            }
        }
    }
    return maior;

};

const arrayTeste1 = [12, 7, 31, 18];
const arrayTeste2 = [-8, -3, -12];
const arrayTeste3: number[] = [];

console.log(`Teste 1: ${obterMaior(arrayTeste1)}`);
console.log(`Teste 2: ${obterMaior(arrayTeste2)}`);
console.log(`Teste 3: ${obterMaior(arrayTeste3)}`);