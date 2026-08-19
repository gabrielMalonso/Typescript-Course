function criarEtiqueta({nome, quantidade}: { nome: string; quantidade: number }): string {
    return `${nome} × ${quantidade}`;
}

console.log(criarEtiqueta({ nome: "Parafuso", quantidade: 8 }));
console.log(criarEtiqueta({ nome: "Arruela", quantidade: 0 }));

// A função pede só nome e quantidade. Um objeto original com campos a mais
// continua compatível, porque a função lê apenas o que declara no parâmetro.