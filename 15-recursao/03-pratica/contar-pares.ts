function contarPares(numeros: number[], indice: number = 0): number {
    if (indice === numeros.length) return 0;

    // se é par:
    if (numeros[indice] % 2 === 0) {
        return 1 + contarPares(numeros, indice + 1);
    } else {
        return contarPares(numeros, indice + 1);
    }
}

let numeros = [2, -3, 5, 8, 9, 6, 3];
console.log(contarPares(numeros));
