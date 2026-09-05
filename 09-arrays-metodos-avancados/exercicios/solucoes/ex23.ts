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

const encontrandoP3 = produtos.find((produto) => produto.codigo === "P3");
console.log(encontrandoP3);