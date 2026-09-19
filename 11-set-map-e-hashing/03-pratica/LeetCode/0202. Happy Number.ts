function somaDosQuadradosDosDigitos(numero: number): number {
    let soma = 0;

    while (numero != 0) {
        const digito = numero % 10;
        soma += digito * digito;
        numero = Math.floor(numero/10);
    }
    return soma;
}

function isHappy(n: number): boolean {
    const historicoSet = new Set<number>();
    let somaDosQuadrados;
    let referencia: number = n;
    while (referencia !== 1) {
        somaDosQuadrados = somaDosQuadradosDosDigitos(referencia);
        if (somaDosQuadrados === 1) return true;
        if (historicoSet.has(somaDosQuadrados)) return false;
        historicoSet.add(somaDosQuadrados);
        referencia = somaDosQuadrados;
    }
    return true;
}

let n = 19;
console.log(isHappy(n));

n = 2;
console.log(isHappy(n));