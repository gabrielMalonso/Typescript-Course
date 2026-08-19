var numero = 1;
var soma = 0;
for (; numero <= 15; numero++) { // A inicialização foi feita fora do `for` com o objetivo de utilizar a variável fora do loop.
    if (numero % 2 === 0) {
        continue;
    }
    else {
        console.log("Numero somado: ".concat(numero));
        soma = soma + numero;
        if (soma >= 36) {
            break;
        }
    }
}
console.log("Soma final: ".concat(soma));
console.log("\u00DAltimo n\u00FAmero: ".concat(numero));
