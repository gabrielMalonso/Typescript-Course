let soma = 0;

for (let numero = 1; numero <= 10; numero++) {
    if (numero%3 === 0) {
         continue;
    } else {
        console.log(`Número não múltiplo de 3: ${numero}`);
        soma = soma + numero;
    }
}

console.log(`A soma dos números não múltiplos de 3 é ${soma}.`);
