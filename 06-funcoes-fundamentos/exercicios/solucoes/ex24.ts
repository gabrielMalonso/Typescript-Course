function calcularDesconto(preco: number, percentual: number): number {
    return preco - (preco * (percentual / 100));
}

function exibirPrecoFinal(precoFinal: number): void {
    console.log(`Preço final: ${precoFinal}`);
}

const precoFinal = calcularDesconto(200, 15);
console.log(precoFinal);
exibirPrecoFinal(precoFinal)

// `calcularDesconto` não deve apenas usar `console.log` porque o resultado do cálculo pode precisar ser reutilizado pelo restante do programa. 