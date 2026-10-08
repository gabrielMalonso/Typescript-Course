type Identificacao = {
    usuarioId: number;
    ativa: boolean;
};

type ModEmail = Identificacao & {
    modalidade: "email";
    endereco: string;
};

type ModSMS = Identificacao & {
    modalidade: "sms";
    telefone: string;
};

type ConfiguracaoNotificacao = ModEmail | ModSMS;

function descreverNotificacao(config: ConfiguracaoNotificacao): string {
    switch (config.modalidade) {
        case "email":
            return `Usuário ${config.usuarioId}: e-mail ${config.ativa ? "ativo" : "desativado"} - ${config.endereco}`;

        case "sms":
            return `Usuário ${config.usuarioId}: SMS ${config.ativa ? "ativo" : "desativado"} - ${config.telefone}`;
    }
}

console.log(
    descreverNotificacao({
        usuarioId: 1,
        ativa: true,
        modalidade: "email",
        endereco: "ana@email.com",
    }),
);
// "Usuário 1: e-mail ativo — ana@email.com"

console.log(
    descreverNotificacao({
        usuarioId: 2,
        ativa: false,
        modalidade: "sms",
        telefone: "27999999999",
    }),
);
// "Usuário 2: SMS desativado — 27999999999"

console.log(
    descreverNotificacao({
        usuarioId: 3,
        ativa: true,
        modalidade: "sms",
        telefone: "27888888888",
    }),
);
// "Usuário 3: SMS ativo — 27888888888"
