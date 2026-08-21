const pecas: {
    nome: string;
    quantidade: number;
    preco: number;
    ativa: boolean;
}[] = [
        { nome: "Parafuso", quantidade: 10, preco: 0.5, ativa: true },
        { nome: "Porca", quantidade: 0, preco: 0.3, ativa: true },
        { nome: "Arruela", quantidade: 4, preco: 0.2, ativa: false },
        { nome: "Broca", quantidade: 2, preco: 8, ativa: true },
    ];

function somarQuantidadesValidas(itens: { quantidade: number; ativa: boolean }[]): number {
    let soma = 0;
    for (let index = 0; index < itens.length; index++) {
        if (itens[index].ativa && itens[index].quantidade > 0) {
            soma += itens[index].quantidade;
        }
    }
    return soma;
}

function calcularTotal(itens: { quantidade: number; preco: number; ativa: boolean }[]): number {
    let calcularTotal = 0;
    for (const peca of itens) {
        if (peca.ativa && peca.quantidade > 0) {
            calcularTotal = calcularTotal + peca.quantidade * peca.preco;
        }
    }
    return calcularTotal;
}

const criarResumo = function (
    quantidade: number,
    total: number,
): string {
    return `Peças: ${quantidade} | Total: ${total}`;
}

const quantidadeTotal = somarQuantidadesValidas(pecas);
const calcularTotal2 = calcularTotal(pecas);

console.log(quantidadeTotal);
console.log(calcularTotal2);
console.log(criarResumo(quantidadeTotal, calcularTotal2));

// teste com array vazio
const pecasVazio: {
    nome: string;
    quantidade: number;
    preco: number;
    ativa: boolean;
}[] = [];

const quantidadeTotalVazio = somarQuantidadesValidas(pecasVazio);
const calcularTotalVazio = calcularTotal(pecasVazio);

console.log(quantidadeTotalVazio);
console.log(calcularTotalVazio);
console.log(criarResumo(quantidadeTotalVazio, calcularTotalVazio));