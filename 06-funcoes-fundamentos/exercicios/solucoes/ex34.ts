function contarValidos(valores: number[]): number {
    let cont = 0;
    for (const valor of valores) {
        if (valor > 0) {
            cont++;
        }
    }
    return cont;        
}

function somarValidos(valores: number[]): number {
    let soma = 0;
    for (const valor of valores) {
        if (valor > 0) {
            soma += valor;
        }
    }
    return soma;        

}

const calcularMedia = (total: number, quantidade: number): number => {
    if (quantidade === 0){
        return 0;
    } else {
        return total / quantidade;
    }
};


const medicoes: number[] = [18, 0, 24, 30, 0];
const medicoesVazio: number[] = [];

const quantidade = contarValidos(medicoes);
const total = somarValidos(medicoes);
const media = calcularMedia(total, quantidade);

const quantidadeVazio = contarValidos(medicoesVazio);
const totalVazio = somarValidos(medicoesVazio);
const mediaVazio = calcularMedia(totalVazio, quantidadeVazio);

console.log(`Total: ${total}`);
console.log(`Quantidade: ${quantidade}`);
console.log(`Média: ${media}`);

console.log(`Total: ${totalVazio}`);
console.log(`Quantidade: ${quantidadeVazio}`);
console.log(`Média: ${mediaVazio}`);