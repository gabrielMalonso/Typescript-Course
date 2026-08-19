function converterHorasParaMinutos(horas) {
    return horas * 60;
}
var criarEtiqueta = function (minutos) { return "Dura\u00E7\u00E3o: ".concat(minutos, " minutos."); };
// Conversão com 2.5 horas
var conversao = converterHorasParaMinutos(2.5);
var etiqueta = criarEtiqueta(conversao);
console.log(etiqueta);
// Conversão com 0 hora
var conversao2 = converterHorasParaMinutos(0);
var etiqueta2 = criarEtiqueta(conversao2);
console.log(etiqueta2);
