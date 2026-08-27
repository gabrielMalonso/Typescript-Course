const pedidos = [
    { codigo: "P1", quantidade: 2, preco: 15 },
    { codigo: "P2", quantidade: 1, preco: 40 },
    { codigo: "P3", quantidade: 3, preco: 8 },
];

function percorrerPedidos (pedidos: {
    codigo: string;
    quantidade: number;
    preco: number;
}[],
calcular: (pedido: {
    codigo: string;
    quantidade: number;
    preco: number;
}) => number,
registrar: (
    codigo: string,
    valorCalculado: number,
) => void,
): number {
    let total = 0;

    for (let index = 0; index < pedidos.length; index++) {
        const valor = calcular (pedidos[index]); // foi criada a variável `valor`, só pq a função `registrar` também precisará usar o resultado de `calcular`.
        total += valor;

        registrar (pedidos[index].codigo, valor);
    }
    return total;
}


percorrerPedidos(pedidos, (pedidos) => pedidos.quantidade * pedidos.preco, (codigo, valorCalculado) => {
    console.log(`${codigo}: ${valorCalculado}`);
})