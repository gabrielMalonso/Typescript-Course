var temperaturas = [18, 21, 17, 24];
var total = 0;
var acimaDeVinte = 0;
for (var _i = 0, temperaturas_1 = temperaturas; _i < temperaturas_1.length; _i++) {
    var temperatura = temperaturas_1[_i];
    total += temperatura;
    if (temperatura > 20) {
        acimaDeVinte++;
    }
}
var mediaDeTemperaturas = total / temperaturas.length;
console.log("Total: ".concat(total));
console.log("Acima de 20: ".concat(acimaDeVinte));
console.log("M\u00E9dia: ".concat(mediaDeTemperaturas));
