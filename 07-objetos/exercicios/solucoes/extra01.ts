const produtos = [
  { nome: "Furadeira", preco: 350, estoque: 4 },
  { nome: "Broca", preco: 25, estoque: 0 },
  { nome: "Martelo", preco: 70, estoque: 8 },
  { nome: "Serra", preco: 180, estoque: 0 },
];

function disponibilidade (lista: { estoque: number}[]): number {
    let cont = 0;
    for (const item of lista) {
        if (item.estoque !== 0) {
            cont += item.estoque;
        }
    }
    return cont;
}

function valorTotalDoEstoque (lista: { preco: number; estoque: number}[]): number {
    let valorTotal = 0;
    for (const item of lista) {
        if (item.estoque !== 0) {
            valorTotal += (item.preco * item.estoque);
        }
    }
    return valorTotal;
}

const produtoSemEstoque = (lista: { nome: string; estoque: string }): void => {
    console.log(lista.nome);
}

console.log(`Estão disponíveis ${disponibilidade(produtos)} produtos.`);
console.log(`O valor total do estoque é R$ ${valorTotalDoEstoque(produtos)}`);

for (const item of produtos) {
    if (item.estoque === 0) {
        console.log(`Sem estoque: ${item.nome}`);
    }
}
