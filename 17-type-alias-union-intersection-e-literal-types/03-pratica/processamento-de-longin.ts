type Usuario = {
    id: number;
    nome: string;
    senha: string;
};

type NaoExiste = {
    estado: "usuario-nao-encontrado";
    idBuscado: number;
};

type SenhaIncorreta = {
    usuario: Usuario;
    estado: "senha-incorreta";
};

type LoginRealizado = {
    usuario: Usuario;
    estado: "sucesso";
};

type ResultadoLogin = NaoExiste | SenhaIncorreta | LoginRealizado;

function fazerLogin(
    usuarios: Usuario[],
    id: number,
    senha: string,
): ResultadoLogin {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            if (usuarios[i].senha === senha) {
                return {
                    usuario: usuarios[i],
                    estado: "sucesso",
                };
            } else {
                return {
                    usuario: usuarios[i],
                    estado: "senha-incorreta",
                };
            }
        }
    }
    return {
        estado: "usuario-nao-encontrado",
        idBuscado: id,
    };
}

function descreverLogin(resultado: ResultadoLogin): string {
    switch (resultado.estado) {
        case "usuario-nao-encontrado":
            return `Usuario ${resultado.idBuscado} não encontrado`;
        case "senha-incorreta":
            return `Senha incorreta para ${resultado.usuario.nome}`;
        case "sucesso":
            return `Login realizado: ${resultado.usuario.nome}`;
    }
}

const usuarios: Usuario[] = [
    { id: 1, nome: "Ana", senha: "abc123" },
    { id: 2, nome: "Bruno", senha: "xyz789" },
];

console.log(descreverLogin(fazerLogin(usuarios, 99, "qualquer")));
// "Usuário 99 não encontrado"

console.log(descreverLogin(fazerLogin(usuarios, 1, "errada")));
// "Senha incorreta para Ana"

console.log(descreverLogin(fazerLogin(usuarios, 1, "abc123")));
// "Login realizado: Ana"
