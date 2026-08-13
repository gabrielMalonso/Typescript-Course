let somaDosImpares = 0;
for (let numero = 1; numero <= 20; numero++) {
    if (numero%2 === 0) {
        continue;
    } else {
        console.log(`Somando: ${numero}`);
        somaDosImpares = somaDosImpares + numero;
        if (somaDosImpares >= 25) {
            break;
        }
    }
}

console.log(`Soma final: ${somaDosImpares}`);