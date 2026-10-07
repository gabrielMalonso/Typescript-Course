type Identificacao = {
    id: number;
};

type Aguardando = Identificacao & {
    estado: "aguardando";
};

type Pronto = Identificacao & {
    estado: "pronto";
    codigo: string;
};

type Retirado = Identificacao & {
    estado: "retirado";
    retiradoPor: string;
};

type Pedido = Aguardando | Pronto | Retirado;

function resumirPedido(pedido: Pedido): string {
    if (pedido.estado === "aguardando")
        return `Pedido ${pedido.id}: ${pedido.estado}`;
    if (pedido.estado === "pronto")
        return `Pedido ${pedido.id}: ${pedido.estado} - código ${pedido.codigo}`;
    if (pedido.estado === "retirado")
        return `Pedido ${pedido.id}: retirado por ${pedido.retiradoPor}`;
    throw new Error(`erro`);
}

console.log(
    resumirPedido({
        id: 2,
        estado: "pronto",
        codigo: "A7",
    }),
);
