function aplicarDesconto(
  produto: { nome: string; preco: number }, 
  percentual: number,
): { nome: string; preco: number } {
  if (percentual <= 0) {
    return {... produto};
  }
  const produtoComDesconto = {...produto}
  produtoComDesconto.preco -= produtoComDesconto.preco * (percentual/100);
  return produtoComDesconto;
}

const produto = {
  nome: "Broca",
  preco: 40,
};

// "Broca", preco 40 e desconto 10:
const novoPreco = aplicarDesconto( produto, 10 ); 
console.log(novoPreco.preco);

// "Broca", preco 40 e desconto 0:
const novoPreco2 = aplicarDesconto(produto, 0); 
console.log(novoPreco2.preco);

// Mostrando o valor original do objeto:
console.log(produto.preco);