const medicoes: number[] = [14, 0, 22, 18, 0, 26];
const medicaoZero: number [] = [];

function somarMedicoesValidas(valores: number[]): number {
    let soma = 0;
    for (const valor of valores) {
        if (valor <= 0) {
            continue;
        } else {
            soma += valor;
        }
    }
    return soma;
}

function contarMedicoesValidas(valores: number[]): number {
    let cont = 0;
    for (const valor of valores) {
        if (valor <= 0) {
            continue;
        } else {
            cont++;
        }
    }
    return cont;
}

const calcularMedia = (total: number, quantidade: number): number => {
    if (quantidade === 0) {
        return 0;
    } else {
        return total / quantidade;
    }
};

const criarResumo = function (total: number, quantidade: number, media: number): string {
    return `Total: ${total} | Quantidade: ${quantidade} | Média: ${media}`; 
}

// Medições:
const soma = somarMedicoesValidas(medicoes);
const cont = contarMedicoesValidas(medicoes);
const mediaMedicoes = calcularMedia(soma, cont);
const resumo = criarResumo(soma, cont, mediaMedicoes);

console.log(resumo);

// Medições zeradas:
const somaZero = somarMedicoesValidas(medicaoZero);
const contZero = contarMedicoesValidas(medicaoZero);
const mediaMedicoesZero = calcularMedia(somaZero, contZero);
const resumoZero = criarResumo(somaZero, contZero, mediaMedicoesZero);

console.log(resumoZero);