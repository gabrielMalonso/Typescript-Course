const produtos: {
    codigo: string;
    nome: string;
    estoque: number;
    ativo: boolean;
}[] = [
        { codigo: "P1", nome: "Broca", estoque: 8, ativo: true },
        { codigo: "P2", nome: "Serra", estoque: 0, ativo: true },
        { codigo: "P3", nome: "Lixa", estoque: 12, ativo: false },
        { codigo: "P4", nome: "Disco", estoque: 5, ativo: true },
    ];

const produtosAtivosComEstoque = produtos
    .filter(produto => produto.ativo)
    .filter(produto => produto.estoque > 0);

// outra forma de fazer é:
// const produtosAtivosComEstoque = produtos.filter ((produto) => produto.ativo && produto.estoque > 0);

console.log(produtosAtivosComEstoque);
console.log(`Número de objetos em produtos: ${produtos.length}`);