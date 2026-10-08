enum Prioridade {
    Baixa = 1,
    Media = 2,
    Alta = 3,
    Critica = 4,
}

function descreverPrioridade(prioridade: Prioridade): string {
    switch (prioridade) {
        case Prioridade.Baixa:
            return `Atendimento normal`;
        case Prioridade.Media:
            return `Atendimento em breve`;
        case Prioridade.Alta:
            return `Atendimento urgente`;
        case Prioridade.Critica:
            return `Atendimento imediato`;
    }
}

console.log(descreverPrioridade(Prioridade.Baixa));
// "Atendimento normal"

console.log(descreverPrioridade(Prioridade.Media));
// "Atendimento em breve"

console.log(descreverPrioridade(Prioridade.Alta));
// "Atendimento urgente"

console.log(descreverPrioridade(Prioridade.Critica));
// "Atendimento imediato"

console.log(Prioridade.Alta);
// Esperado: 3

console.log(Prioridade[3]);
// O que você espera receber? Resposta: "Alta"
