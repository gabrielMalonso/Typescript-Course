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

// 1. existe produto ativo sem estoque?
const produtoAtivoSemEstoque = produtos.some(produto => (produto.ativo && produto.estoque === 0));
console.log(`1. existe produto ativo sem estoque? ${produtoAtivoSemEstoque ? "Sim" : "Não"}`);

// 2. todos os produtos possuem estoque não negativo?
const estoquesNegativos = produtos.some(produto => produto.estoque < 0);
console.log(`2. todos os produtos possuem estoque não negativo? ${!estoquesNegativos ? "Sim" : "Não"}`);

// 3. todos os produtos ativos possuem estoque positivo?
const todosAtivosComEstoquesPositivos = produtos.every(
    produto => !produto.ativo || produto.estoque > 0
);
console.log(`3. todos os produtos ativos possuem estoque positivo? ${todosAtivosComEstoquesPositivos ? "Sim" : "Não"}`);

// 4. em um array vazio, quais são os retornos de some e every? some = false | every = true
console.log(`4. em um array vazio, quais são os retornos de some e every? some = false | every = true`);

// 5. como exigir ao mesmo tempo uma lista não vazia e todos válidos?
if (produtos.length > 0 && produtos.every(produto => produto.ativo)) {
    console.log("5. Todos os produtos estão ativos e a lista não está vazia");
} else {
    console.log("5. A lista está vazia ou algum produto não está ativo");
}