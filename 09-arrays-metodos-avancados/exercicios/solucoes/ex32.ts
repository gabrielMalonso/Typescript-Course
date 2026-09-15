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

function disponivel(produto: {
    codigo: string;
    nome: string;
    estoque: number;
    ativo: boolean;
}): boolean {
    if (produto.ativo && produto.estoque > 0) {
        return true;
    }
    return false;
}

const useFilter = produtos.filter (disponivel);
// `(disponivel)` é igual a `(produto)  → boolean`
// `disponivel` é uma função cujo contrato encaixa no contrato que o `filter` espera.
console.log (useFilter);

const useSome = produtos.some(disponivel);
console.log(useSome);

// (produto) => boolean é o contrato/assinatura do callback que o método recebe como argumento.
// O filter retorna um novo array com o mesmo tipo de elementos do array original, contendo de 0 a N elementos.
// O some retorna um boolean.