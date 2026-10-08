// EXERCÍCIO EDITADO PARA ESTUDO DE TYPESCRIPT
type Resposta = {
    readonly diaCompra: number;
    readonly diaVenda: number;
    readonly maiorLucro: number;
} | null;

function melhorOperacao(prices: number[]): Resposta {
    let menor = Infinity;
    let lucro = 0;
    let indexCompra = 0;
    let indexVenda = 0;
    let indexMenor = 0;

    for (let i = 0; i < prices.length; i++) {
        if (menor > prices[i]) {
            menor = prices[i];
            indexMenor = i;
            console.log(`indexCompra = ${i} | valor: ${menor}`);
        }
        if (lucro < prices[i] - menor) {
            lucro = prices[i] - menor;
            indexCompra = indexMenor;
            indexVenda = i;
        }
    }
    if (lucro === 0) return null;
    return {
        diaCompra: indexCompra,
        diaVenda: indexVenda,
        maiorLucro: lucro,
    };
}

function formatacao(resposta: Resposta): string {
    if (resposta === null) return "nenhuma operação lucrativa";
    return `compra: índice ${resposta.diaCompra}
venda: índice ${resposta.diaVenda};
lucro: ${resposta.maiorLucro}`;
}

console.log(melhorOperacao([3, 1, 4, 0, 2]));
