var soma = 0;
for (var numero = 1; numero <= 10; numero++) {
    if (numero % 3 === 0) {
        continue;
    }
    else {
        console.log("N\u00FAmero n\u00E3o m\u00FAltiplo de 3: ".concat(numero));
        soma = soma + numero;
    }
}
console.log("A soma dos n\u00FAmeros n\u00E3o m\u00FAltiplos de 3 \u00E9 ".concat(soma));
