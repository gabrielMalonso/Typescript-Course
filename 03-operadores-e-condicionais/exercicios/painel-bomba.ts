const codigoDaBomba = "B-17";

const vazao1 = 38; // L/min
const vazao2 = 42; 
const vazao3 = 46; 
const vazaoMedia = (vazao1 + vazao2 + vazao3) / 3;

const pressaoMinima = 4.5; // bar
const pressaoMaxima = 7.5;
const faixaDePressao = pressaoMaxima - pressaoMinima;

const pressaoAtual = 6.2; 
const temperaturaAtual = 68; 
const nivelDoReservatorio = 55;
const sensorIndisponivel = false;
const observacaoDoOperador = undefined;

const pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const temperaturaSegura = temperaturaAtual <= 75;
const nivelSeguro = nivelDoReservatorio >= 30;
const operacaoSegura = pressaoSegura && temperaturaSegura && nivelSeguro && !sensorIndisponivel;

let estadoDaBomba = "";
let acaoRecomendada = "";

if (operacaoSegura) {
    estadoDaBomba = "OPERAÇÃO NORMAL";
    acaoRecomendada = "manter monitoramento";
} else if (nivelDoReservatorio < 30) {
    estadoDaBomba = "PARADA PREVENTIVA";
    acaoRecomendada = "reabastecer reservatório";
} else {
    estadoDaBomba = "ATENÇÃO";
    acaoRecomendada = "verificar parâmetros";
}

const estadoDoSensor = !sensorIndisponivel ? "disponível" : "indisponível";
const observacaoExibida = observacaoDoOperador ?? "Sem observação";

console.log(`=== PAINEL DA BOMBA ${codigoDaBomba} ===`);
console.log(`Vazão média: ${vazaoMedia} L/min`);
console.log(`Faixa depressão: ${faixaDePressao} Bar`);
console.log(`Ação: ${acaoRecomendada}`);
console.log(`Sensor: ${estadoDoSensor}`);

