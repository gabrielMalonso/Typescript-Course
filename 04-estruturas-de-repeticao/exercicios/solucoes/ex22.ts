const codigoProcurado = 7;
let codigoEncontrado = false;

for (let indice = 1; indice <= 10; indice++) {
    if (indice === 7) {
        console.log(`Verificando código ${indice}`);
        codigoEncontrado = true;
        break;
    }
}

console.log(`Encontrado: ${codigoEncontrado}`);