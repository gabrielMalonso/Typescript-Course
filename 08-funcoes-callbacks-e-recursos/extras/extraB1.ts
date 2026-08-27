const cobrancas = [
    { nome: "A", valor: 20, pago: true },
    { nome: "B", valor: 35, pago: false },
    { nome: "C", valor: 10, pago: true },
];

function somarValores(
    itens: { nome: string; valor: number; pago: boolean }[],
    escolher: (item: { nome: string; valor: number; pago: boolean }) => number,
): number {
    let total = 0;

    for (const item of itens) {
        total += escolher(item);
    }
    return total;
}

const resultadoSoma = somarValores (cobrancas, (cobranca) => cobranca.valor);
console.log(resultadoSoma);

const resultadoSomaDosPagos = somarValores (cobrancas, (cobranca) => cobranca.pago ? cobranca.valor : 0);
console.log(resultadoSomaDosPagos);
