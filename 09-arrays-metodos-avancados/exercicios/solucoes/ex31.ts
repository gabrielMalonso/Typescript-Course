const pedidos: {
    codigo: string;
    quantidade: number;
    preco: number;
    cancelado: boolean;
}[] = [
        { codigo: "A1", quantidade: 2, preco: 10, cancelado: false },
        { codigo: "B2", quantidade: 1, preco: 30, cancelado: true },
        { codigo: "C3", quantidade: 3, preco: 5, cancelado: false },
    ];

const somaTotal = pedidos.reduce(
    (soma, pedido) => !pedido.cancelado ? soma + (pedido.preco * pedido.quantidade) : soma,
    0,
);

console.log(somaTotal);

const arrayVazio: {
    codigo: string;
    quantidade: number;
    preco: number;
    cancelado: boolean;
}[] = [];

const somaTotalArrayVazio = arrayVazio.reduce(
    (soma, pedido) => !pedido.cancelado ? soma + (pedido.preco * pedido.quantidade) : soma,
    0,
);

console.log(somaTotalArrayVazio);