function calcularMetade(valor) {
    return valor / 2;
}
var operacao = calcularMetade;
var operacao1 = operacao(20);
var operacao2 = operacao(7);
console.log(operacao1);
console.log(operacao2);
console.log(operacao === calcularMetade);
// calcularMetade diz respeito à função por completo, com o seu tipo e contrato. calcularMetade(20) é o que a função retorna ao receber o argumento 20. Nesse caso, o número (number) 10.
