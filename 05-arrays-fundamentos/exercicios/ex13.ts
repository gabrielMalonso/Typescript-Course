const rota: string[] = ["início", "desvio", "destino"];
const quantidadeAntes = rota.length;

rota [1] = "ponte";
const quantidadeDepois = rota.length;

console.log(`Array fina: ${rota}`);
console.log(`Quantidade Antes: ${quantidadeAntes}`);
console.log(`Quantidade depois: ${quantidadeDepois}`);
const comparacao = quantidadeAntes === quantidadeDepois;
console.log(`Resultado da Comparação: ${comparacao}`);

// A alteração é permitida mesmo com a rota sendo uma constante, porque é permitido fazer alterações em um array; o que não é permitido para uma constante é apontá-la para outro array.
