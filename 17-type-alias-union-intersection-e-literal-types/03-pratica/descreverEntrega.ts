type Identificacao = {
    id: number;
    destinatario: string;
};

type Aguardando = Identificacao & {
    estado: "aguardando";
    previsao: string;
};

type EmRota = Identificacao & {
    estado: "em-rota";
    entregador: string;
};

type Entregue = Identificacao & {
    estado: "entregue";
    recebidoPor: string;
    horario: string;
};

type Falhou = Identificacao & {
    estado: "falhou";
    motivo: string;
    novaTentativa: boolean;
};

type Entrega = Aguardando | EmRota | Entregue | Falhou;

function descreverEntrega(entrega: Entrega): string {
    switch (entrega.estado) {
        case "aguardando":
            return `Entrega ${entrega.id} para ${entrega.destinatario}: aguardando - previsão ${entrega.previsao}`;

        case "em-rota":
            return `Entrega ${entrega.id} para ${entrega.destinatario}: em rota com ${entrega.entregador}`;

        case "entregue":
            return `Entrega ${entrega.id}: recebida por ${entrega.recebidoPor} às ${entrega.horario}`;

        case "falhou":
            return `Entrega ${entrega.id}: falhou - ${entrega.motivo} - nova tentativa: ${entrega.novaTentativa ? "sim" : "não"}`;
    }
}

console.log(
    descreverEntrega({
        id: 1,
        destinatario: "Ana",
        estado: "aguardando",
        previsao: "14:00",
    }),
);
// "Entrega 1 para Ana: aguardando — previsão 14:00"

console.log(
    descreverEntrega({
        id: 2,
        destinatario: "Bruno",
        estado: "em-rota",
        entregador: "Carlos",
    }),
);
// "Entrega 2 para Bruno: em rota com Carlos"

console.log(
    descreverEntrega({
        id: 3,
        destinatario: "Daniel",
        estado: "entregue",
        recebidoPor: "Marina",
        horario: "16:35",
    }),
);
// "Entrega 3: recebida por Marina às 16:35"

console.log(
    descreverEntrega({
        id: 4,
        destinatario: "Eduardo",
        estado: "falhou",
        motivo: "ninguém no endereço",
        novaTentativa: true,
    }),
);
// "Entrega 4: falhou — ninguém no endereço — nova tentativa: sim"
