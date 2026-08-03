const nomeDoExperimento = "Teste de tração";
const forcaEmNewtons = 1.25e4; // N
const experimentoConcluido: boolean = false;

const resumoConcatenado = "Experimento: " + nomeDoExperimento + " | Força: " + forcaEmNewtons + " N | Concluído: " + experimentoConcluido;
const resumoComTemplate = `Experimento: ${nomeDoExperimento} | Força: ${forcaEmNewtons} N | Concluído: ${experimentoConcluido}`;

console.log(resumoConcatenado);
console.log(resumoComTemplate);
