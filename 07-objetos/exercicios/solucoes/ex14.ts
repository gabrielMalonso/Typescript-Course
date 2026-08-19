const peca: {
    codigo: string;
    massa: number;
} = {
    codigo: "M-4",
    massa: 1.25,
};

/*
1. "cor" não é um item declarado no objeto, por isso não seria possível incluir cor: "cinza" na mesma tribuição.
2. peca.massa = "1.25" seria rejeitado porque "1.25" é uma string. o item peca.massa foi declarado como number.
*/

console.log(peca.codigo);
console.log(peca.massa);  