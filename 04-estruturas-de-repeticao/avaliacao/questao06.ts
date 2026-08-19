let numero = 1
let soma = 0;

for (; numero <= 15; numero++) { // A inicialização foi feita fora do `for` com o objetivo de utilizar a variável fora do loop.
    if (numero%2 === 0) {
        continue;
    } else {
        console.log(`Numero somado: ${numero}`);
        soma = soma + numero;
        if (soma >= 36) {
            break;
        }
    }
}

console.log(`Soma final: ${soma}`);
console.log(`Último número: ${numero}`);
