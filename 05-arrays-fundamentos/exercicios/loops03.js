var tentativas = [4, -1, 7, 0, 9];
var totalValido = 0;
var quantidadeValida = 0;
for (var _i = 0, tentativas_1 = tentativas; _i < tentativas_1.length; _i++) {
    var tentativa = tentativas_1[_i];
    if (tentativa === -1) {
        continue;
    }
    else if (tentativa === 0) {
        break;
    }
    else {
        console.log("Valor aceito: ".concat(tentativa));
        totalValido += tentativa;
        quantidadeValida++;
    }
}
console.log("Total v\u00E1lido: ".concat(totalValido));
console.log("Quantidade V\u00E1lida: ".concat(quantidadeValida));
