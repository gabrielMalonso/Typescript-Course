const lotes = [
    { lote: "L-01", quantidade: 12, vencido: false },
    { lote: "L-02", quantidade: 3, vencido: true },
    { lote: "L-03", quantidade: 20, vencido: false },
    { lote: "L-04", quantidade: 0, vencido: false },
    { lote: "L-05", quantidade: 8, vencido: true },
];

function inspecionar(
    lotes: { lote: string; quantidade: number; vencido: boolean }[],
    acao: (codigoLote: string, quantidade: number) => void,
): number {
    let total = 0;

    for (const lote of lotes) {
        acao(lote.lote, lote.quantidade);

        if (!lote.vencido) {
            total++;
        }
    }
    return (total);
}

const totalLotesNaoVencidos = inspecionar (lotes, (codLote, qtdLote) => {
    console.log(`Registro Feito. Lote: ${codLote} | Quantidade: ${qtdLote}`);
});

console.log(totalLotesNaoVencidos);
