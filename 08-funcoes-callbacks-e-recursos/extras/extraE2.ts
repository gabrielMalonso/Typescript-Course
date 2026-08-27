const lotes = [
    { lote: "L-01", quantidade: 12, vencido: false },
    { lote: "L-02", quantidade: 3, vencido: true },
    { lote: "L-03", quantidade: 20, vencido: false },
    { lote: "L-04", quantidade: 0, vencido: false },
    { lote: "L-05", quantidade: 8, vencido: true },
];

function contarLotes(
    lotes: { lote: string; quantidade: number; vencido: boolean }[],
    criterio: (lote: { lote: string; quantidade: number; vencido: boolean }) => boolean,
): number {
    let total = 0;

    for (const lote of lotes) {
        if (criterio(lote)) {
            total++;
        }
    }
    return total;
}

// vencidos
const lotesVencidos = contarLotes(lotes, (lote) => lote.vencido);
console.log(`Lotes vencidos: ${lotesVencidos}`);

// quantidade >= 10
const lotesQuantidadeMaiorIgual10 = contarLotes(lotes, (lote) => lote.quantidade >= 10);
console.log(`Lotes com quantidades maiores ou iguais a 10: ${lotesQuantidadeMaiorIgual10}`);

// não vencidos com quantidade === 0 (se não houver, tem que dar 0)
const naoVencidosQtd0 = contarLotes(lotes, (lote) => !lote.vencido && lote.quantidade === 0);
console.log(`Lotes não vencidos e com quantidade igual a zero: ${naoVencidosQtd0}`);
