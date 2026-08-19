var nomeDoExperimento = "Teste de tração";
var forcaEmNewtons = 1.25e4; // N
var experimentoConcluido = false;
var resumoConcatenado = "Experimento: " + nomeDoExperimento + " | Força aplicada: " + forcaEmNewtons + " N | Concluído: " + experimentoConcluido;
var resumoComTemplate = "Experimento: ".concat(nomeDoExperimento, " | For\u00E7a aplicada: ").concat(forcaEmNewtons, " N | Conclu\u00EDdo: ").concat(experimentoConcluido);
console.log(resumoConcatenado);
console.log(resumoComTemplate);
