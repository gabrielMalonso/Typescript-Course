const codigoProcurado = 7;
let codigoEncontrado = false;

for (let indice = 1; indice <= 10; indice++) {
    if (indice === codigoProcurado) {
        console.log(`Verificando código ${indice}`);
        codigoEncontrado = true;
        break;
    } else {
        console.log(`Verificando código ${indice}`);
    }
}

console.log(`Encontrado: ${codigoEncontrado}`);