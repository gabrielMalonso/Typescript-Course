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

const encontrandoIndiceDeP4 = produtos.findIndex((produto) => produto.codigo === "P4");
console.log(encontrandoIndiceDeP4 + 1); //posição humana

const encontrandoP9 = produtos.find((produto) => produto.codigo === "P9");
if (encontrandoP9 === undefined) {
    console.log("Não encontrado");
} else {
    console.log(encontrandoP9);
}

const encontrandoIndiceDeP9 = produtos.findIndex((produto) => produto.codigo === "P9");
if (encontrandoIndiceDeP9 === -1) {
    console.log(encontrandoIndiceDeP9);
} else {
    console.log(encontrandoIndiceDeP9 + 1);
}