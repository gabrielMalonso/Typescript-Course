const somarValores = (valores: number[]): number => {
    let total = 0;
    for (const valor of valores) {
        total += valor;
    }
    return total;
};

const arrayTeste1 = [4, 6, 10];
const arrayTeste2: number[] = [];

const teste1 = somarValores(arrayTeste1);
const teste2 = somarValores(arrayTeste2);

console.log(`Total: ${teste1}`);
console.log(`Total: ${teste2}`);
console.log(arrayTeste1);
console.log(arrayTeste2);
