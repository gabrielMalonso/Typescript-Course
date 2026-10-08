enum NivelAcesso {
    Visitante = "visitante",
    Usuario = "usuario",
    Administrador = "admin",
}

function descreverAcesso(nivel: NivelAcesso): string {
    switch (nivel) {
        case NivelAcesso.Visitante:
            return `Acesso limitado`;

        case NivelAcesso.Usuario:
            return `Acesso padrão`;

        case NivelAcesso.Administrador:
            return `Acesso completo`;
    }
}

console.log(descreverAcesso(NivelAcesso.Visitante));
// "Acesso limitado"

console.log(descreverAcesso(NivelAcesso.Usuario));
// "Acesso padrão"

console.log(descreverAcesso(NivelAcesso.Administrador));
// "Acesso completo"

// descreverAcesso("admin"); → Argument of type '"admin"' is not assignable to parameter of type 'NivelAcesso'.
