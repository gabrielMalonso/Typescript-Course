const chamados = [
    { id: "C1", minutos: 40, critico: true },
    { id: "C2", minutos: 15, critico: false },
    { id: "C3", minutos: 55, critico: true },
];

function processarChamados(
    lista: ({ id: string; minutos: number; critico: boolean; })[],
    medir: (item: { id: string; minutos: number; critico: boolean; }) => number,
    avisar: (id: string, minutosMedidos: number) => void,
): number {
    let total = 0;

    for (const item of lista) {
        const valor = medir(item);
        total += valor;
        avisar(item.id, valor);
    }
    return total;
}

const processamento = processarChamados(chamados, (chamado) => chamado.minutos, (id, valor) => {
    console.log(`${id}: ${valor}`);
});

console.log(`Total: ${processamento}`);

const arrayVazio: { id: string; minutos: number; critico: boolean; }[] = [];
let quantidadeDeAvisos = 0;

const processamentoVazio = processarChamados(arrayVazio, (chamado) => chamado.minutos, (id, valor) => {
    quantidadeDeAvisos++;
    console.log(`${id}: ${valor}`);
});

console.log(`Total: ${processamentoVazio}`);
console.log(`Avisos executados: ${quantidadeDeAvisos}`);
