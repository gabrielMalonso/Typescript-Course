# `sort()` não apaga as decisões

Em código de aplicação, normalmente usamos a ordenação oferecida pela linguagem. Isso evita reimplementar um algoritmo geral, mas ainda precisamos definir a ordem, conhecer a mutação e analisar o custo no contexto do programa.

## A ordem padrão não é numérica

Sem comparador, `sort()` converte os elementos em strings e os compara por unidades UTF-16. Isso produz uma ordem válida para esse critério, mas não a ordem numérica que provavelmente esperamos:

```typescript
const valores = [80, 9, 100];
valores.sort();
console.log(valores); // [100, 80, 9]
```

Para números crescentes, forneça uma função de comparação:

```typescript
const valores = [80, 9, 100];
valores.sort((a, b) => a - b);
console.log(valores); // [9, 80, 100]
```

O runtime interpreta o sinal do retorno:

- valor negativo: `a` deve vir antes de `b`;
- zero: os dois são equivalentes para este critério;
- valor positivo: `a` deve vir depois de `b`.

Não sabemos em que ordem nem quantas vezes o comparador será chamado. Ele deve produzir uma resposta consistente e não depender de alterar os dados durante a comparação.

O contrato também precisa dizer quais números aceita. `NaN`, por exemplo, faz `a - b` resultar em `NaN` e não estabelece a ordem numérica pretendida. Nos exercícios do capítulo, as entradas contêm apenas números finitos.

## `sort()` modifica o array

`sort()` devolve a mesma referência que recebeu:

```typescript
const original = [3, 1, 2];
const ordenado = original.sort((a, b) => a - b);

console.log(original);              // [1, 2, 3]
console.log(ordenado === original); // true
```

Quando a entrada deve ser preservada, copie antes:

```typescript
const original = [3, 1, 2];
const ordenado = [...original].sort((a, b) => a - b);

console.log(original); // [3, 1, 2]
console.log(ordenado); // [1, 2, 3]
```

O spread faz uma cópia rasa em Θ(n) posições. Se os elementos forem objetos, os dois arrays ainda apontam para os mesmos objetos. Preservar a ordem do array não cria cópias profundas dos elementos.

## A ordenação pronta é estável

Nas versões atuais do padrão ECMAScript, `Array.prototype.sort()` deve ser estável. Elementos para os quais o comparador devolve zero preservam sua ordem relativa:

```typescript
const tentativas = [
  { pessoa: "Ana", pontos: 8 },
  { pessoa: "Bia", pontos: 10 },
  { pessoa: "Caio", pontos: 8 },
];

tentativas.sort((a, b) => b.pontos - a.pontos);

console.log(tentativas.map(item => item.pessoa));
// ["Bia", "Ana", "Caio"]
```

Ana continua antes de Caio porque ambos têm 8 pontos e chegaram nessa ordem. A estabilidade depende de o comparador representar corretamente a igualdade do critério; se ele devolver respostas incoerentes, não há uma ordem útil a preservar.

## Qual é o custo de `sort()`?

A especificação define o comportamento observável, mas não fixa um algoritmo nem uma complexidade única para `sort()`. A implementação pode variar entre runtimes e versões. Portanto, não escreva “`sort()` é O(n log n)” como se fosse garantia da API.

Ainda precisamos conhecer a diferença de escala entre famílias de algoritmos. Ignorando constantes, para `n = 1.024`:

```text
n²          = 1.048.576
n log₂ n    =    10.240
```

Insertion e selection sort têm pior caso quadrático. Algoritmos mais avançados podem garantir Θ(n log n), e runtimes usam estratégias apropriadas para uma ordenação de propósito geral. Para uma decisão que dependa de limite rígido, consulte e meça o runtime alvo em vez de inventar uma promessa do JavaScript.

## Ordenar antes de buscar é uma preparação

Suponha `n` valores desordenados e `q` consultas.

- Fazer busca linear a cada vez custa Θ(q × n) no pior caso.
- Se os dados já estão ordenados, `q` buscas binárias custam Θ(q log n).
- Se usarmos uma ordenação com Θ(n log n) como preparação, o total será Θ(n log n + q log n).
- Se prepararmos com uma das ordenações simples desta aula, o pior caso começa em Θ(n²), não em Θ(n log n).

Isso não prova que sempre devemos ordenar quando `q` é grande. Também importam memória, mutação, tempo das atualizações, necessidade de preservar a ordem original e a possibilidade de usar outra estrutura. Um `Set`, por exemplo, responde pertinência sob outro contrato, sem informar a posição ordenada.

Uma regra prática para este capítulo:

| Situação | Ponto de partida |
|---|---|
| Dados desordenados, uma ou poucas consultas | Busca linear |
| Dados já ordenados e sem alterações incompatíveis | Busca binária |
| Muitas consultas sobre uma fotografia dos dados | Avaliar ordenar uma vez e reutilizar |
| Entrada pequena ou quase ordenada, mutação permitida | Considerar insertion sort |
| Código de aplicação precisa apenas ordenar | Usar `sort()` com contrato e comparador explícitos |

A melhor escolha não vem do nome “binária” ou de uma chamada curta. Ela vem do estado dos dados e do custo total necessário para manter a pré-condição.

**Próximo passo:** resolva os cenários da [atividade 3](../03-pratica/atividades.md#atividade-3). [Voltar ao guia](../README.md#etapa-5).

## Referência

- [MDN — `Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort): comparador, mutação, estabilidade e complexidade dependente da implementação.
