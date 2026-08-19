var rota = ["início", "desvio", "destino"];
var quantidadeAntes = rota.length;
rota[1] = "ponte";
var quantidadeDepois = rota.length;
console.log("Array fina: ".concat(rota));
console.log("Quantidade Antes: ".concat(quantidadeAntes));
console.log("Quantidade depois: ".concat(quantidadeDepois));
var comparacao = quantidadeAntes === quantidadeDepois;
console.log("Resultado da Compara\u00E7\u00E3o: ".concat(comparacao));
// A alteração é permitida mesmo com a rota sendo uma constante, porque é permitido fazer alterações em um array; o que não é permitido para uma constante é apontá-la para outro array.
