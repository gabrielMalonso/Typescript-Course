var duracaoEmSegundos = 2.4e2; //segundos
var nivelInicial = 68.5; //dB
var nivelFinal = 73.5; //dB
var nomeDoEnsaio = "Ruído de bancada";
var ensaioAprovado = false;
var aumentoDoNivel = nivelFinal - nivelInicial;
var identificacaoDoEnsaio = "Ensaio: " + nomeDoEnsaio;
console.log(identificacaoDoEnsaio);
console.log("Dura\u00E7\u00E3o: ".concat(duracaoEmSegundos, " s"));
console.log("Aumento do n\u00EDvel: ".concat(aumentoDoNivel, " dB"));
console.log("Aprovado: ".concat(ensaioAprovado));
