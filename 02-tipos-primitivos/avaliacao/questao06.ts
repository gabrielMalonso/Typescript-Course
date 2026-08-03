const duracaoEmSegundos: number = 2.4e2; //segundos
const nivelInicial: number = 68.5; //dB
const nivelFinal: number = 73.5; //dB
const nomeDoEnsaio = "Ruído de bancada";
const ensaioAprovado = false;

const aumentoDoNivel = nivelFinal - nivelInicial;
const identificacaoDoEnsaio = "Ensaio: " + nomeDoEnsaio;

console.log(identificacaoDoEnsaio);
console.log(`Duração: ${duracaoEmSegundos} s`);
console.log(`Aumento do nível: ${aumentoDoNivel} dB`);
console.log(`Aprovado: ${ensaioAprovado}`);
