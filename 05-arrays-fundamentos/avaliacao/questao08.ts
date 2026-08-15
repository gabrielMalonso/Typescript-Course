const registros: number[] = [12, 0, 18, 25, 0, 15];
let totalValido = 0;
let quantidadeValida = 0;

for (let indice = 0; indice < registros.length; indice++) {
    if (registros[indice] === 0) {
        continue;
    } else {
        console.log(`Registro: ${indice + 1}: ${registros[indice]}`);
        totalValido += registros[indice];
        quantidadeValida++;
    }
}
console.log(`Total válido: ${totalValido}`);
console.log(`Quantidade válida: ${quantidadeValida}`);

// `indice + 1` É utilizado somente no rótulo devido ao fato de que os índices são iniciados no zero e é natural para os seres humanos iniciarem contagens no 1. registros[indice] continua apontado para a posição real do indice