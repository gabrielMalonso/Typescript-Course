type Leitura = number | "sem-leitura";
function maiorLeitura(leituras: Leitura[]): number | null {
    let maiorValor: number = -Infinity;

    for (let i = 0; i < leituras.length; i++) {
        const leituraAtual = leituras[i];
        if (leituraAtual === "sem-leitura") {
            continue;
        }
        if (maiorValor < leituraAtual) {
            maiorValor = leituraAtual;
        }
    }
    return maiorValor === -Infinity ? null : maiorValor;
}

console.log(maiorLeitura([]));
// null

console.log(maiorLeitura(["sem-leitura", "sem-leitura"]));
// null

console.log(maiorLeitura([0]));
// 0

console.log(maiorLeitura(["sem-leitura", -8, -3, -5]));
// -3

console.log(maiorLeitura([2, "sem-leitura", 7, 7, 1]));
// 7
