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

const formatado: string[] = produtos.map((produto) => `${produto.codigo} - ${produto.nome}: ${produto.estoque}`);
console.log(formatado);

// antes do método, o tipo era um array de objetos. Após o método, foi criado um array de strings. A quantidade continua a mesma. No map, o tipo do array resultante depende do callback, que é executado para elemento. A quantidade de elementos permanece igual a quantidade do array original.