function somarEstoque (itens: {quantidade: number }[]): number { 
/*
Essa função recebe um parâmetro chamado itens, que é um array de objetos. 
Cada objeto desse array deve possuir uma propriedade quantidade do tipo number. 
A função retorna um number.
*/
    let total = 0;
    for (const item of itens) {
        if (item.quantidade > 0) {
            total += item.quantidade;
        }
/*
O for...of percorre o array itens. 
A cada repetição, ele pega um objeto do array e guarda esse objeto temporariamente na constante item. 
Depois verifica se item.quantidade é maior que zero. Se for, soma essa quantidade ao total.
*/
    }
    return total;
}

const estoque = [ //estoque é um array de objetos.
  { nome: "Parafuso", quantidade: 10 },
  { nome: "Porca", quantidade: 0 },
  { nome: "Arruela", quantidade: 4 },
];

console.log(somarEstoque(estoque)); // 14
console.log(somarEstoque([]));      // 0

console.log(estoque);