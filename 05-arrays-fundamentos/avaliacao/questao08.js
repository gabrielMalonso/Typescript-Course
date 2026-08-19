var registros = [12, 0, 18, 25, 0, 15];
var totalValido = 0;
var quantidadeValida = 0;
for (var indice = 0; indice < registros.length; indice++) {
    if (registros[indice] === 0) {
        continue;
    }
    else {
        console.log("Registro: ".concat(indice + 1, ": ").concat(registros[indice]));
        totalValido += registros[indice];
        quantidadeValida++;
    }
}
console.log("Total v\u00E1lido: ".concat(totalValido));
console.log("Quantidade v\u00E1lida: ".concat(quantidadeValida));
