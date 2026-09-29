# Merge sort em TypeScript

## A limitação das ordenações simples

No capítulo 14, insertion sort e selection sort chegaram a custo quadrático no pior caso. Vamos tentar outra pergunta: se duas metades **já estivessem ordenadas**, quanto trabalho daria reuni-las em ordem?

Considere `[2, 5, 7]` e `[1, 3, 6]`. Não precisamos comparar cada elemento com todos os outros. Basta comparar o primeiro ainda não consumido de cada lado:

| Comparação | Próximo valor da saída | Saída até agora |
|---|---|---|
| `2` e `1` | `1` | `[1]` |
| `2` e `3` | `2` | `[1, 2]` |
| `5` e `3` | `3` | `[1, 2, 3]` |
| `5` e `6` | `5` | `[1, 2, 3, 5]` |
| `7` e `6` | `6` | `[1, 2, 3, 5, 6]` |
| só resta o lado esquerdo | `7` | `[1, 2, 3, 5, 6, 7]` |

Como cada lado está ordenado, seu primeiro valor restante é o menor daquele lado. O menor dos dois é, portanto, o próximo da saída. Isso justifica a escolha em cada passo.

**Intercalar não é concatenar.** Juntar os arrays com spread produziria `[2, 5, 7, 1, 3, 6]`, ainda fora de ordem.

## Conseguir as metades ordenadas

Se uma metade ainda tem vários valores, aplicamos a mesma tarefa a ela. Quando chegamos a zero ou um elemento, a parte já está ordenada.

```text
Dividir:
              [5, 2, 1, 3]
             /            \
         [5, 2]          [1, 3]
         /    \          /    \
       [5]    [2]      [1]    [3]

Combinar na volta:
       [5] + [2] → [2, 5]
       [1] + [3] → [1, 3]
       [2, 5] + [1, 3] → [1, 2, 3, 5]
```

Esse é o modelo de **divisão e conquista**: dividir em problemas menores, resolvê-los e combinar as respostas. A recursão descreve como resolver as partes; a intercalação faz o trabalho que constrói a ordem.

## Uma implementação completa

Nosso contrato: receber um array denso de números finitos, ordenar em ordem crescente e retornar **um novo array**, preservando a entrada. Array denso significa que todas as posições de `0` até `length - 1` possuem um número, sem buracos. `NaN` fica fora do contrato porque suas comparações não fornecem a ordem esperada.

Execute o bloco inteiro no Pad ou em um arquivo TypeScript:

```ts
// Contrato: as duas entradas já estão ordenadas em ordem crescente.
function intercalar(esquerda: number[], direita: number[]): number[] {
  const resultado: number[] = [];
  let i = 0;
  let j = 0;

  while (i < esquerda.length && j < direita.length) {
    if (esquerda[i] <= direita[j]) {
      resultado.push(esquerda[i]);
      i++;
    } else {
      resultado.push(direita[j]);
      j++;
    }
  }

  while (i < esquerda.length) {
    resultado.push(esquerda[i]);
    i++;
  }

  while (j < direita.length) {
    resultado.push(direita[j]);
    j++;
  }

  return resultado;
}

// Contrato: array denso de números finitos; retorna uma cópia ordenada.
function mergeSort(numeros: number[]): number[] {
  if (numeros.length <= 1) {
    return [...numeros];
  }

  const meio = Math.floor(numeros.length / 2);
  const esquerda = mergeSort(numeros.slice(0, meio));
  const direita = mergeSort(numeros.slice(meio));

  return intercalar(esquerda, direita);
}

const entrada = [5, -2, 5, 1, 0];
const ordenado = mergeSort(entrada);

console.log(ordenado); // [-2, 0, 1, 5, 5]
console.log(entrada); // [5, -2, 5, 1, 0]
console.log(ordenado === entrada); // false
console.log(mergeSort([])); // []
console.log(mergeSort([7])); // [7]
console.log(intercalar([], [1, 3])); // [1, 3]
```

`slice(0, meio)` copia do índice zero até **antes** de `meio`; `slice(meio)` copia de `meio` até o fim. Assim, nenhum elemento desaparece ou entra nas duas metades. Em tamanho ímpar, elas diferem por um elemento. Para qualquer tamanho maior que um, ambas são menores que a entrada: esse é o avanço até o caso base.

O caso base também copia. Retornar `numeros` diretamente não alteraria seu conteúdo, mas faria a saída compartilhar o mesmo array em entradas de tamanho zero ou um, contrariando nosso contrato de novo array.

## A ordem das chamadas importa

A linha que calcula `esquerda` conclui toda a ordenação desse lado antes de começar a linha de `direita`. Só depois de obter as duas respostas a função chama `intercalar`.

Não são duas tarefas em paralelo. Durante a ordenação da direita, a chamada atual guarda o resultado ordenado da esquerda. Durante a intercalação, os dois resultados existem para serem lidos.

Em `intercalar`, os índices funcionam como o início da fila do capítulo 13: avançam sem retirar fisicamente os elementos. Usar `shift()` repetidamente deslocaria o array e poderia estragar o custo linear da combinação no modelo de array discutido no curso.

## Por que a intercalação é linear?

Se os lados têm `a` e `b` valores, cada valor entra na saída uma vez. Os três loops são sequenciais e, juntos, avançam os índices exatamente `a + b` vezes. A quantidade de comparações entre lados é no máximo `a + b - 1` quando ambos têm elementos.

Logo, a intercalação tem tempo Θ(a + b) e usa Θ(a + b) para a saída. Consideramos acesso por índice constante e `push` amortizado constante no modelo de array dinâmico; não é uma promessa de latência para cada chamada da API.

## De onde vem n log n?

Com oito elementos, existem três níveis de combinação:

| Nível de combinação | Quantidade de intercalações | Tamanho de cada saída | Total de elementos escritos |
|---|---|---|---|
| Pares | 4 | 2 | 8 |
| Grupos de quatro | 2 | 4 | 8 |
| Array inteiro | 1 | 8 | 8 |

Cada nível processa `n` elementos. A quantidade de níveis acompanha quantas vezes podemos dividir `n` pela metade até chegar a um: log₂ n, a mesma ideia da busca binária. **Trabalho linear por nível × quantidade logarítmica de níveis = Θ(n log n)**, para `n >= 2`.

Há uma diferença em relação à busca binária: a busca descarta uma metade e continua em apenas um lado. Merge sort precisa ordenar **os dois lados**. Dividir pela metade sozinho não implica tempo O(log n).

As cópias de `slice()` também custam tempo linear no tamanho copiado. Somadas por nível, continuam Θ(n); portanto, não mudam a ordem Θ(n log n) desta implementação. A árvore tem Θ(n) chamadas ao todo, mas algumas chamadas intercalam arrays grandes. Contar chamadas sem contar o trabalho de cada uma deixaria esse custo de fora.

Mesmo com a entrada já ordenada, esta versão continua dividindo, copiando e intercalando: melhor e pior caso são Θ(n log n). Não há atalho implementado aqui. Isso permite comparar com insertion sort, que pode aproveitar uma entrada quase ordenada.

## Pilha pequena, arrays maiores

A pilha tem profundidade Θ(log n), porque um caminho divide os tamanhos pela metade. Isso não representa toda a memória: ainda existem as cópias das partes e os resultados das intercalações.

No modelo que conta dados vivos e permite reaproveitar memória de arrays que ficaram sem uso, o pico de espaço é **Θ(n)**, incluindo os arrays temporários e a saída; a pilha adiciona O(log n). Mesmo excluindo a saída final, as cópias intermediárias desta versão exigem Θ(n) de espaço auxiliar.

Ao longo de toda a execução, são alocadas Θ(n log n) posições, somando todos os níveis. **Total alocado durante a execução e pico de memória viva são medidas distintas.** O consumo observado do processo também depende de quando o garbage collector recupera arrays sem uso. Uma versão com índices e buffer reutilizável pode diminuir cópias; não precisamos dessa complexidade para entender o algoritmo agora.

## Estabilidade e uso real

O `<=` escolhe o lado esquerdo em um empate. Como ele representa posições anteriores da entrada e cada lado mantém sua ordem, esse critério preserva a ordem relativa de valores com a mesma chave: o algoritmo é estável.

Com números iguais, essa propriedade não fica visível. Imagine registros `2A` e `2B`, comparados só pelo número, com `2A` originalmente antes de `2B`. Em um empate entre as metades, escolher a esquerda mantém `2A` antes de `2B`; trocar por `<` pode inverter essa ordem. Tipar uma ordenação reutilizável de registros será assunto de modelagem e generics.

Para ordenar dados em uma aplicação, o `sort()` com comparador do capítulo 14 continua útil. Ele abstrai a implementação, mas ainda precisamos decidir sobre mutação, ordem e custos; não devemos atribuir este merge sort ao runtime sem evidência. Aqui, implementar o algoritmo permite explicar concretamente a troca de tempo quadrático por memória e divisão em níveis.

Faça a [atividade 2 — Intercalar do zero](../03-pratica/atividades.md#atividade-2) e depois a [aplicação final](../03-pratica/atividades.md#atividade-3).

[Voltar ao guia — etapa 5](../README.md#etapa-5)
