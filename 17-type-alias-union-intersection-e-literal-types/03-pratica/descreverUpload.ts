type Identificacao = {
    id: number;
    nomeArquivo: string;
};

type Enviando = Identificacao & {
    estado: "enviando";
    progresso: number;
};

type Concluido = Identificacao & {
    estado: "concluido";
    url: string;
};

type Falha = Identificacao & {
    estado: "falhou";
    erro: string;
    tentativas: number;
};

type Estado = Enviando | Concluido | Falha;
