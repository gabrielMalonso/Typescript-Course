type Encontrado = {
    estado: "encontrado";
    usuario: {
        id: number;
        nome: string;
    };
};

type NaoEncontrado = {
    estado: "nao-encontrado";
    idBuscado: number;
};

type Erro = {
    estado: "erro";
    mensagem: string;
    codigo: number;
};

type ResultadoBusca = Encontrado | NaoEncontrado | Erro;

function descreverResultado(resultado: ResultadoBusca): string {
    switch (resultado.estado) {
        case "encontrado":
            return `Usuário ${resultado.usuario.nome} encontrado - ID ${resultado.usuario.id}`;
        case "nao-encontrado":
            return `Usuário de ID ${resultado.idBuscado} não encontrado.`;
        case "erro":
            return `Erro ${resultado.codigo}: ${resultado.mensagem}`;
    }
}

console.log(
    descreverResultado({
        estado: "encontrado",
        usuario: {
            id: 10,
            nome: "Gabriel",
        },
    }),
);
// "Usuário Gabriel encontrado — ID 10"

console.log(
    descreverResultado({
        estado: "nao-encontrado",
        idBuscado: 25,
    }),
);
// "Usuário de ID 25 não encontrado"

console.log(
    descreverResultado({
        estado: "erro",
        mensagem: "Falha na conexão",
        codigo: 500,
    }),
);
// "Erro 500: Falha na conexão"
