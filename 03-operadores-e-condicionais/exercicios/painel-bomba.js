var codigoDaBomba = "B-17";
var vazao1 = 38; // L/min
var vazao2 = 42;
var vazao3 = 46;
var vazaoMedia = (vazao1 + vazao2 + vazao3) / 3;
var pressaoMinima = 4.5; // bar
var pressaoMaxima = 7.5;
var faixaDePressao = pressaoMaxima - pressaoMinima;
var pressaoAtual = 6.2;
var temperaturaAtual = 68;
var nivelDoReservatorio = 55;
var sensorIndisponivel = false;
var observacaoDoOperador = undefined;
var pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
var temperaturaSegura = temperaturaAtual <= 75;
var nivelSeguro = nivelDoReservatorio >= 30;
var operacaoSegura = pressaoSegura && temperaturaSegura && nivelSeguro && !sensorIndisponivel;
var estadoDaBomba = "";
var acaoRecomendada = "";
if (operacaoSegura) {
    estadoDaBomba = "OPERAÇÃO NORMAL";
    acaoRecomendada = "manter monitoramento";
}
else if (nivelDoReservatorio < 30) {
    estadoDaBomba = "PARADA PREVENTIVA";
    acaoRecomendada = "reabastecer reservatório";
}
else {
    estadoDaBomba = "ATENÇÃO";
    acaoRecomendada = "verificar parâmetros";
}
var estadoDoSensor = !sensorIndisponivel ? "disponível" : "indisponível";
var observacaoExibida = observacaoDoOperador !== null && observacaoDoOperador !== void 0 ? observacaoDoOperador : "Sem observação";
console.log("=== PAINEL DA BOMBA ".concat(codigoDaBomba, " ==="));
console.log("Vaz\u00E3o m\u00E9dia: ".concat(vazaoMedia, " L/min"));
console.log("Faixa depress\u00E3o: ".concat(faixaDePressao, " Bar"));
console.log("A\u00E7\u00E3o: ".concat(acaoRecomendada));
console.log("Sensor: ".concat(estadoDoSensor));
