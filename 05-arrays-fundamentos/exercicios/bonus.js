var tempos = [42, 38, 45, 40];
var total = 0;
for (var indice = 0; indice < tempos.length; indice++) {
    console.log("Medi\u00E7\u00E3o ".concat(indice + 1, ": ").concat(tempos[indice]));
    total = total + tempos[indice];
}
console.log("Total: ".concat(total));
