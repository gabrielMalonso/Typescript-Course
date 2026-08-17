const somarValores = (valores: number[]): number => {
    let total = 0;
    for (const valor of valores) {
        total += valor;
    }
    return total;
};

const teste1 = somarValores([4, 6, 10]);
const teste2 = somarValores([]);

console.log(`Total: ${teste1}`);
console.log(`Total: ${teste2}`);