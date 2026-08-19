const tentativas: number[] = [4, -1, 7, 0, 9];
let totalValido = 0;
let quantidadeValida = 0;

for (const tentativa of tentativas) {
    if (tentativa === -1) {
        continue;
    } else if (tentativa === 0) {
        break;
    } else {
        console.log(`Valor aceito: ${tentativa}`);
        totalValido += tentativa;
        quantidadeValida++;
    }
}

console.log(`Total válido: ${totalValido}`);
console.log(`Quantidade Válida: ${quantidadeValida}`);