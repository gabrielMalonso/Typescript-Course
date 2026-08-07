const pressaoMinima = 4.5;
const pressaoMaxima = 8.5;
const pressaoAtual = 8.5;

const pressaoDentroDaFaixa = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima ? "dentro da faixa" : "fora da faixa";

console.log(`Pressão: ${pressaoDentroDaFaixa}`);
