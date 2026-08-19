var vibracaoAtual = 6.8;
var classificacao;
var margemAteCritica = 8 - vibracaoAtual;
var exigeInspecao = (vibracaoAtual >= 6) ? "sim" : "não";
if (vibracaoAtual > 8) {
    classificacao = "CRÍTICA";
}
else if (vibracaoAtual <= 6) {
    classificacao = "ATENÇÃO";
}
else {
    classificacao = "NORMAL";
}
console.log("=== AN\u00C1LISE DE VIBRA\u00C7\u00C3O ===");
console.log("Classifica\u00E7\u00E3o: ".concat(classificacao));
console.log("Margem at\u00E9 cr\u00EDtica: ".concat(margemAteCritica, " mm/s"));
console.log("Exige inspe\u00E7\u00E3o: ".concat(exigeInspecao));
