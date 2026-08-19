const pedidos = [
  {
    numero: 101,
    cliente: "Marcos",
    valor: 250,
    pago: true,
    entrega: {
      cidade: "Recife",
      urgente: false,
    },
  },
  {
    numero: 102,
    cliente: "Julia",
    valor: 480,
    pago: false,
    entrega: {
      cidade: "Olinda",
      urgente: true,
    },
    observacao: "Ligar antes da entrega",
  },
  {
    numero: 103,
    cliente: "Paulo",
    valor: 150,
    pago: true,
    entrega: {
      cidade: "Recife",
      urgente: true,
    },
    observacao: "Deixar na portaria",
  },
];

// funções
function valorTotalPago ( clientes: { valor: number; pago: boolean }[]): number {
    let valorTotal = 0;
    for (const cliente of clientes) {
        if (cliente.pago) {
            valorTotal += cliente.valor;
        }
    }
    return valorTotal;
}

function quantidadeNaoPagos ( clientes: {pago: boolean }[]): number {
    let cont = 0;
    for (const cliente of clientes) {
        if (!cliente.pago) {
            cont++;
        }
    }
    return cont;
}

function entregasUrgentes ( clientes: { entrega: {urgente: boolean}}[]): number {
    let cont = 0;
    for (const cliente of clientes) {
        if (cliente.entrega.urgente) {
            cont++;
        }
    }
    return cont;
}

function resumoPedidosPagos ( 
    clientes: { 
        numero: number; 
        cliente: string; 
        valor: number;
        entrega: { 
            cidade: string;
        };
        observacao?: string;
}): string {
    let formatoFinal = `Pedido ${clientes.numero} | ${clientes.cliente} | ${clientes.entrega.cidade} | R$ ${clientes.valor} | ${clientes.observacao ?? "sem observação"}`;

    return formatoFinal;
}

console.log (`Valor total pago: ${valorTotalPago(pedidos)}`);
console.log (`Quantidade de pedidos ainda não pagos: ${quantidadeNaoPagos(pedidos)}`);
console.log (`Quantidade de entregas urgentes: ${entregasUrgentes(pedidos)}`);

for (const pedido of pedidos) {
    if (pedido.pago) {
        console.log(resumoPedidosPagos(pedido));
    }
}