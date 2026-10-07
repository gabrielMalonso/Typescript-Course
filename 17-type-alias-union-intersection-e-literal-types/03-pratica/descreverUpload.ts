type Identificacao = {
    id: number;
    nomeArquivo: string;
};

type Enviando = Identificacao & {
    estado: "enviando";
    progresso: number;
};

type Concluido = Identificacao & {
    estado: "concluído";
    url: string;
};

type Falha = Identificacao & {
    estado: "falhou";
    erro: string;
    tentativas: number;
};

type Status = Enviando | Concluido | Falha;

function descreverUpload(upload: Status): string {
    switch (upload.estado) {
        case "enviando":
            return `${upload.nomeArquivo}: ${upload.estado} - ${upload.progresso}%`;
        case "concluído":
            return `${upload.nomeArquivo}: ${upload.estado} - ${upload.url}`;
        case "falhou":
            return `${upload.nomeArquivo}: ${upload.estado} - ${upload.erro} após ${upload.tentativas} tentativa(s)`;
    }
}

console.log(
    descreverUpload({
        id: 1,
        nomeArquivo: "foto.png",
        estado: "enviando",
        progresso: 65,
    }),
);
// "foto.png: enviando — 65%"

console.log(
    descreverUpload({
        id: 2,
        nomeArquivo: "curriculo.pdf",
        estado: "concluído",
        url: "/arquivos/curriculo.pdf",
    }),
);
// "curriculo.pdf: concluído — /arquivos/curriculo.pdf"

console.log(
    descreverUpload({
        id: 3,
        nomeArquivo: "video.mp4",
        estado: "falhou",
        erro: "tempo esgotado",
        tentativas: 2,
    }),
);
// "video.mp4: falhou — tempo esgotado após 2 tentativa(s)"
