function criarSaudacao (nome: string): string {
    return `Olá, ${nome}`;
}

const nomeUm = criarSaudacao("Gabriel");
const nomeDois = criarSaudacao("Vanessa");

console.log(nomeUm);
console.log(nomeDois);

// `nome` - Parâmetro. Argumentos: `Gabriel` e `Vanessa`.
// O parâmetro aparece na definição da função, já os argumentos aparecem nas chamadas.