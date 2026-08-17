function elevarAoQuadrado(valor: number): number {
  return valor * valor;
}

const operacao: (valor: number) => number = elevarAoQuadrado;

console.log(operacao(6));

console.log(operacao === elevarAoQuadrado);

// `elevarAoQuadrado()` é uma chamada sem argumento e tentaria guardar o retorno `number`, não a função.
