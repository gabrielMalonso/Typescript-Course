function somarArray(numeros: number[], indice: number = 0): number {
    // base case
    if (indice === numeros.length) return 0; // pensar como vai ficar depois

    // recursion
    return numeros[indice] + somarArray(numeros, indice + 1);
}

let numeros = [2, -3, 5];
console.log(somarArray(numeros));
