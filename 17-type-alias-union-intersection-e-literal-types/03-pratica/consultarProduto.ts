const produtos = [
    { id: 1, nome: "Teclado", estoque: 8 },
    { id: 2, nome: "Mouse", estoque: 0 },
    { id: 3, nome: "Monitor", estoque: 4 },
];

type Produto = {
    id: number;
    nome: string;
    estoque: number;
};

type RespostaDaConsulta = Produto | null;

function consultarProduto(
    produtos: Produto[],
    idBusca: number,
): RespostaDaConsulta {
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === idBusca) {
            return produtos[i];
        }
    }
    return null;
}

function descreverProduto(resultadoBusca: RespostaDaConsulta): string {
    if (resultadoBusca === null) return `Produto não encontrado`;
    if (resultadoBusca.estoque === 0)
        return `${resultadoBusca.nome} - sem estoque`;
    return `${resultadoBusca.nome} - ${resultadoBusca.estoque} unidade(s) em estoque`;
}

const resultado1 = consultarProduto(produtos, 1);
console.log(descreverProduto(resultado1));
// "Teclado — 8 unidade(s) em estoque"

const resultado2 = consultarProduto(produtos, 2);
console.log(descreverProduto(resultado2));
// "Mouse — sem estoque"

const resultado3 = consultarProduto(produtos, 99);
console.log(descreverProduto(resultado3));
// "Produto não encontrado"
