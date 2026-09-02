const pedidos: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
}[] = [
        { codigo: "A1", quantidade: 2, preco: 12, entregue: true },
        { codigo: "B2", quantidade: 0, preco: 30, entregue: false },
        { codigo: "C3", quantidade: 3, preco: 10, entregue: false },
        { codigo: "D4", quantidade: 1, preco: 60, entregue: true },
    ];

function calcularPorCriterio(
    itens: {
        codigo: string;
        quantidade: number;
        preco: number;
        entregue: boolean;
    }[],
    incluir: (pedido: {
        codigo: string;
        quantidade: number;
        preco: number;
        entregue: boolean;
    }) => boolean,
    calcular: (pedido: {
        codigo: string;
        quantidade: number;
        preco: number;
        entregue: boolean;
    }) => number,
): number {
    let total = 0;

    for (const pedido of itens) {
        if (incluir(pedido)) {
            total += calcular(pedido);
        }
    }
    return total;
}

const totalPedidosEntregues = calcularPorCriterio(
    pedidos,
    (pedido) => pedido.entregue,
    (pedido) => pedido.preco * pedido.quantidade,
);
console.log("Total de pedidos entregues:", totalPedidosEntregues);

function incluirNaoEntregueComQuantidade(pedido: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
}): boolean {
    return !pedido.entregue && pedido.quantidade > 0;
}

function obterQuantidade(pedido: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
}): number {
    return pedido.quantidade;
}


const quantidadeTotalNaoEntregue = calcularPorCriterio(
    pedidos,
    incluirNaoEntregueComQuantidade,
    obterQuantidade,
);
console.log(
    "Quantidade total de unidades dos pedidos não entregues com quantidade > 0:",
    quantidadeTotalNaoEntregue,
);

const criterioQueRejeitaTodos = calcularPorCriterio(
    pedidos,
    () => false,
    (pedido) => pedido.quantidade,
);
console.log("Critério que rejeita todos:", criterioQueRejeitaTodos);

const pedidosVazios: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
}[] = [];

const resultadoParaArrayVazio = calcularPorCriterio(
    pedidosVazios,
    () => true,
    (pedido) => pedido.quantidade,
);
console.log("Resultado para array vazio:", resultadoParaArrayVazio);

console.log(pedidos.length);
console.log(pedidos[0].quantidade);
