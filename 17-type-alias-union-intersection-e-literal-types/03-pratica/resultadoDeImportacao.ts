type Cliente = {
    id: number;
    nome: string;
};

type Resultado = {
    readonly qtdClientesImportados: number;
    readonly idPrimeiroCliente: number;
    readonly idUltimoCliente: number;
} | null;

function importarClientes(clientes: Cliente[]): Resultado {
    if (clientes.length === 0) return null;
    const primeiroCliente = clientes[0].id;
    const ultimoCliente = clientes[clientes.length - 1].id;
    const quantidadeDeClientesImportados = clientes.length;

    return {
        qtdClientesImportados: quantidadeDeClientesImportados,
        idPrimeiroCliente: primeiroCliente,
        idUltimoCliente: ultimoCliente,
    };
}

function descreverImportacao(resultado: Resultado): string {
    if (resultado === null) return "Nenhum cliente importado";
    return `${resultado.qtdClientesImportados} cliente(s) importado(s) - IDs: ${resultado.idPrimeiroCliente} até ${resultado.idUltimoCliente}`;
}

const clientes = [
    { id: 10, nome: "Ana" },
    { id: 25, nome: "Bruno" },
    { id: 40, nome: "Carla" },
];

console.log(descreverImportacao(importarClientes(clientes)));
// "3 cliente(s) importado(s) — IDs: 10 até 40"

console.log(descreverImportacao(importarClientes([])));
// "Nenhum cliente importado"
