function criarLinha( { 
    titulo, 
    local: { sala },
    nota 
} : {
  titulo: string;
  local: { sala: string };
  nota?: string;
}): string {

    return `${titulo} | ${sala} | ${nota ?? "sem nota"}`;
}

const dados = { titulo: "Reunião", local: { sala: "Sala 2" } };
console.log(criarLinha(dados));

// embora o exercício tenha pedido pra usar "o mesmo objeto", quis utilizar o spread para testar e me acostumar com a sintaxe.
const dadosAdicionais = {
    ...dados,
    nota: "levar cabo",
}

console.log(criarLinha(dadosAdicionais));