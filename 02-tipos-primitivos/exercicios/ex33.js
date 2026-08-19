var codigoDoSensor = "SP-09";
var pressaoMinima = 2.5; // bar
var pressaoMaxima = 8.5; // bar
var faixaDeOperacao = pressaoMaxima - pressaoMinima;
var pressaoMedia = (pressaoMaxima + pressaoMinima) / 2;
var calibracaoValida = true;
var observacaoTecnica = null;
var dataDoCertificado = undefined;
var tituloDoPainel = "=== CALIBRAÇÃO DO SENSOR " + codigoDoSensor + " ===";
console.log(tituloDoPainel);
console.log("Press\u00E3o m\u00EDnima: ".concat(pressaoMinima, " bar"));
console.log("Press\u00E3o m\u00E1xima: ".concat(pressaoMaxima, " bar"));
console.log("Faixa de opera\u00E7\u00E3o: ".concat(faixaDeOperacao, " bar"));
console.log("Press\u00E3o m\u00E9dia: ".concat(pressaoMedia, " bar"));
console.log("Calibra\u00E7\u00E3o v\u00E1lida: ".concat(calibracaoValida));
console.log("Observa\u00E7\u00E3o t\u00E9cnica: ".concat(observacaoTecnica));
console.log("Data do certificado: ".concat(dataDoCertificado));
