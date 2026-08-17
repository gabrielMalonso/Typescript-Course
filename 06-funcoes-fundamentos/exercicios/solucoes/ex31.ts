function elevarAoQuadrado(valor: number): number {
  return valor * valor;
}

let operacao: (valor: number) => number;

operacao = elevarAoQuadrado;

console.log(operacao(6));

console.log(operacao === elevarAoQuadrado);

// const operacao = elevarAoQuadrado() não faria sentido, pois estaríamos comparando a função `operação` com o retorno da operação da função `elevarAoQuadrado` sem passar argumento algum. Isso não faz sentido.