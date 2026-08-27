function combinarNumeros(
    primeiro: number,
    segundo: number,
    operacao: (a: number, b: number) => number, 
): number {
    return operacao (primeiro, segundo);
}

// callback de soma:
const soma = (primeiro:  number, segundo: number): number => {
    return (primeiro + segundo);
};


console.log(`Soma: ${combinarNumeros(8, 3, soma)}`);

// callback diferença:
const diferenca = (primeiro:  number, segundo: number): number => {
    return (primeiro - segundo);
};


console.log(`Diferença: ${combinarNumeros(8, 3, diferenca)}`);

// callback produto:
const produto = (primeiro: number, segundo: number): number => {
    return (primeiro * segundo);
};

console.log(`Produto: ${combinarNumeros(8, 3, produto)}`);
