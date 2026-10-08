type Produto = {
    nome: string;
    preco: number;
};

type FaixaDePrecos = readonly [menorPreco: number, maiorPreco: number] | null;

function obterFaixaDePrecos(produtos: Produto[]): FaixaDePrecos {
    if (produtos.length === 0) return null;
    const produtosOrdenados = [...produtos].sort((a, b) => a.preco - b.preco);
    const menorPreco = produtosOrdenados[0].preco;
    const maiorPreco = produtosOrdenados[produtos.length - 1].preco;

    return [menorPreco, maiorPreco];
}

function descreverFaixa(resultado: FaixaDePrecos): string {
    if (resultado === null) return "Nenhum produto disponível";
    const [menorPreco, maiorPreco] = resultado;
    return `Preços entre R$${menorPreco} e R${maiorPreco}`;
}

const produtos: Produto[] = [
    { nome: "Mouse", preco: 80 },
    { nome: "Teclado", preco: 150 },
    { nome: "Monitor", preco: 1200 },
    { nome: "Cabo", preco: 30 },
];

console.log(obterFaixaDePrecos(produtos));
// [30, 1200]

console.log(obterFaixaDePrecos([]));
// null

console.log(descreverFaixa(obterFaixaDePrecos(produtos)));
// "Preços entre R$30 e R$1200"

console.log(descreverFaixa(obterFaixaDePrecos([])));
// "Nenhum produto disponível"
