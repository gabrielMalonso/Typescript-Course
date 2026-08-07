const pressaoAtual = 6.8;
const pressaoMinima = 5;
const pressaoMaxima = 8;
const temperaturaAtual = 74;
const temperaturaMaxima = 75;
const protecaoFechada = true;
const manutencaoPendente = false;
const margemDeTemperatura = temperaturaMaxima - temperaturaAtual;

const pressaoDentroDaFaixa = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const temperaturaSegura = temperaturaAtual <= temperaturaMaxima;

const partidaLiberada = pressaoDentroDaFaixa && temperaturaSegura && protecaoFechada && !manutencaoPendente;

console.log(`=== COMPRESSOR ===`);
console.log(`Margem de temperatura: ${margemDeTemperatura}`);

let mensagemDePartida;
if (partidaLiberada){
    mensagemDePartida = "Partida liberada";
} else {
    mensagemDePartida = "Partida bloqueada";
}

console.log(`${mensagemDePartida}`);


