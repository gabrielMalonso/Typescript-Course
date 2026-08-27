function montarMensagem(texto: string, prioridade = "normal"): string {
    return `[${prioridade}] ${texto}`;
}

const teste1 = montarMensagem("texto");
console.log(teste1);

const teste2 = montarMensagem("texto", "urgente");
console.log(teste2);

// `prioridade`, dentro da função é sempre uma string. Ainda que o argumento seja omitido, a prioridade `normal` ficará preenchida, como valor padrão. 