function combinarNumeros(
    primeiro: number,
    segundo: number,
    operacao: (a: number, b: number) => number, 
): number {
    return operacao (primeiro, segundo);
}

function soma(primeiro: number, segundo: number): number {
    return primeiro + segundo;
}

console.log(`Soma: ${combinarNumeros(8, 3, soma)}`);

console.log(`Diferença: ${combinarNumeros(8, 3, (a, b) => a - b)}`);

console.log(`Produto: ${combinarNumeros(8, 3, (a, b) => a * b)}`);
