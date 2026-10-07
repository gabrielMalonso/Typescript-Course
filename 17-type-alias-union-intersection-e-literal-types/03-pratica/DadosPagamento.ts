type dadosDoPagamento = {
    id: number;
    valor: number;
};
type Pendente = dadosDoPagamento & {
    estado: "pendente";
};

type Autorizacao = dadosDoPagamento & {
    estado: "aprovado";
    codigoAutorizacao: string;
};

type Recusado = dadosDoPagamento & {
    estado: "recusado";
    motivo: string;
};

type Pagamento = Pendente | Autorizacao | Recusado;

function resumirPagamento(pagamento: Pagamento): string {
    switch (pagamento.estado) {
        case "pendente":
            return `Pagamento ${pagamento.id}: R$${pagamento.valor} pendente`;

        case "aprovado":
            return `Pagamento ${pagamento.id}: aprovado - autorização ${pagamento.codigoAutorizacao}`;

        case "recusado":
            return `Pagamento ${pagamento.id}: recusado - motivo: ${pagamento.motivo}`;
    }
}

console.log(
    resumirPagamento({
        id: 1,
        valor: 120,
        estado: "pendente",
    }),
);
// "Pagamento 1: R$120 pendente"

console.log(
    resumirPagamento({
        id: 2,
        valor: 250,
        estado: "aprovado",
        codigoAutorizacao: "XYZ123",
    }),
);
// "Pagamento 2: aprovado — autorização XYZ123"

console.log(
    resumirPagamento({
        id: 3,
        valor: 80,
        estado: "recusado",
        motivo: "saldo insuficiente",
    }),
);
// "Pagamento 3: recusado — saldo insuficiente"
