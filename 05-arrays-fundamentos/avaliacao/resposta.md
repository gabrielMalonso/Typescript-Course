# Avaliação do capítulo 05
## Questão 01
1. O array é uma lista ordenada no sentido de que ela segue uma ordem específica definida. Mas não quer dizer que esses valores são automaticamente classificados em ordem alfabética, numérica ou crescente de alguma maneira.

2. O tipo number[] informa que aquele array possuirá apenas valores tipo number. O TypeScript rejeita outros tipos dentro do array. Não, ele não discrimina quantos elementos o array terá.

3. Primeiro índice = 0; Último índice válido = 5 (length - 1).

4. Um array declarado como const pode ser alterado; o array em si pode ser modificado, mas o que não pode acontecer é que a constante seja apontada para outro array.

## Questão 02
- o valor de tamanhoA: 3
- o valor de tamanhoB: 4
- o valor de removidoDoInicio: "alfa"
- o valor de removidoDoFim: "delta"
- o conteúdo final de etapas: ["Beta", "GAMA REVISADA"]
- o length final: 2
- tamanhoA e tamanhoB não contém os textos adicionados porque o `unshift` e o `push` retornam o novo `length` após a adição dos itens.

## Questão 03
Saídas conceituais:
```text
["rascunho", "teste", "publicação"]
["rascunho", "teste", "publicação"]
true
```

1. Apenas 1 array foi criado.
2. Quando fluxoDaTela recebe fluxoPrincipal, o array não é copiado. As duas variáveis passam a apontar para o mesmo array na memória. Por isso, qualquer alteração feita no array por meio de uma das variáveis também aparece quando ele é acessado pela outra.

## Questão 04
1. undefined
2. Porque o array está declarado como uma string[], mas, como não houve retorno, ele pode ser escrito como undefined.
3. o valor de ultimoIndice e o valor recebido por ultimoAlerta são ambos undefined.
4. alertas.length !== 0; 