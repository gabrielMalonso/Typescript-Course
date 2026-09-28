# Duas ordenações simples

Ordenar é produzir uma permutação dos mesmos elementos que respeite um critério. Para números em ordem crescente, queremos `valores[i - 1] <= valores[i]` em todas as posições válidas.

Esse contrato tem duas partes: nenhum valor pode ser perdido ou inventado, e a ordem precisa ser satisfeita. Apenas verificar que os vizinhos estão em ordem não detectaria uma função que apagou todos os elementos.

As duas implementações desta aula recebem números finitos, modificam o próprio array e devolvem a mesma referência. Essa escolha se chama ordenação **in-place**. O espaço auxiliar é Θ(1), sem contar o array recebido.

## Insertion sort: inserir na parte ordenada

Um array com uma posição já está ordenado. A partir do índice 1, retiramos mentalmente o valor atual, deslocamos para a direita os anteriores que são maiores e inserimos o valor no espaço aberto.

```text
[5 | 2, 4, 6, 1, 3]  → insere 2 → [2, 5 | 4, 6, 1, 3]
[2, 5 | 4, 6, 1, 3]  → insere 4 → [2, 4, 5 | 6, 1, 3]
[2, 4, 5 | 6, 1, 3]  → insere 6 → [2, 4, 5, 6 | 1, 3]
```

A barra separa a parte ordenada do restante. Antes de cada iteração externa, o prefixo anterior ao índice `atual` contém os mesmos elementos originais desse prefixo, já ordenados.

```typescript
function insertionSort(valores: number[]): number[] {
  for (let atual = 1; atual < valores.length; atual++) {
    const valorAtual = valores[atual];
    let posicao = atual - 1;

    while (posicao >= 0 && valores[posicao] > valorAtual) {
      valores[posicao + 1] = valores[posicao];
      posicao--;
    }

    valores[posicao + 1] = valorAtual;
  }

  return valores;
}

const numeros = [5, 2, 4, 6, 1, 3];
const retorno = insertionSort(numeros);

console.log(numeros);            // [1, 2, 3, 4, 5, 6]
console.log(retorno === numeros); // true
```

Guardar `valorAtual` é necessário porque os deslocamentos sobrescrevem posições. Quando o `while` termina, `posicao + 1` é exatamente o espaço em que o valor cabe.

Se o array já está ordenado, cada iteração faz uma comparação com o último valor do prefixo e não desloca nada: Θ(n). Em ordem inversa, o novo valor atravessa todo o prefixo: `1 + 2 + ... + (n - 1)` deslocamentos, Θ(n²). O pior caso e o caso médio sob uma hipótese explícita de permutações igualmente prováveis são Θ(n²).

Insertion sort costuma ser útil em entradas pequenas ou quase ordenadas. Essa vantagem não muda seu pior caso quadrático.

## Estabilidade: iguais preservam a ordem

Uma ordenação é **estável** quando elementos considerados iguais pelo critério mantêm sua ordem relativa original. Imagine registros ordenados somente pela nota:

```text
antes:  [A:8, B:6, C:8]
depois: [B:6, A:8, C:8]
```

`A` continua antes de `C`, embora ambos tenham nota 8. Nossa condição desloca apenas valores estritamente maiores: `valores[posicao] > valorAtual`. Se deslocássemos também os iguais com `>=`, a implementação deixaria de ser estável.

Estabilidade não significa que valores iguais ocupam o mesmo índice. Significa apenas que a ordem entre eles não se inverte.

## Selection sort: escolher o menor restante

Selection sort divide o array de outra maneira. Em cada passo, procura o menor valor de toda a parte não ordenada e o troca com a primeira posição dessa parte.

```typescript
function selectionSort(valores: number[]): number[] {
  for (let inicio = 0; inicio < valores.length - 1; inicio++) {
    let indiceDoMenor = inicio;

    for (let indice = inicio + 1; indice < valores.length; indice++) {
      if (valores[indice] < valores[indiceDoMenor]) {
        indiceDoMenor = indice;
      }
    }

    if (indiceDoMenor !== inicio) {
      [valores[inicio], valores[indiceDoMenor]] = [
        valores[indiceDoMenor],
        valores[inicio],
      ];
    }
  }

  return valores;
}

const numeros = [5, 2, 4, 6, 1, 3];
selectionSort(numeros);
console.log(numeros); // [1, 2, 3, 4, 5, 6]
```

Antes de cada iteração externa, o prefixo anterior a `inicio` já contém os menores elementos em suas posições finais. A busca interna encontra o menor do restante; a troca estende esse prefixo em uma posição.

Mesmo se o array já estiver ordenado, precisamos examinar todo o restante para confirmar qual é o menor. O total de comparações é:

```text
(n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2
```

Portanto, melhor e pior caso usam Θ(n²) comparações. A implementação faz no máximo `n - 1` trocas, o que pode ser interessante quando escrever elementos é muito mais caro que compará-los, mas isso não reduz o tempo assintótico.

## A troca pode quebrar estabilidade

Considere registros identificados, ordenados pela chave numérica:

```text
entrada: [A:2, B:2, C:1]
```

Na primeira seleção, `C:1` troca de lugar com `A:2`:

```text
[C:1, B:2, A:2]
```

`B` passou a aparecer antes de `A`; a ordem relativa dos dois registros de chave 2 foi invertida. A versão usual de selection sort com troca distante **não é estável**. Seria possível criar outra variante, mas ela teria movimentos e implementação diferentes.

## Comparação dos contratos

| Propriedade | Insertion sort desta aula | Selection sort desta aula |
|---|---|---|
| Melhor tempo | Θ(n) | Θ(n²) |
| Pior tempo | Θ(n²) | Θ(n²) |
| Espaço auxiliar | Θ(1) | Θ(1) |
| Altera a entrada | Sim | Sim |
| Estável | Sim, por usar `>` | Não, por causa da troca distante |
| Característica útil | Aproveita poucos deslocamentos | Faz no máximo O(n) trocas |

Duas funções com o mesmo pior caso não são equivalentes. Distribuição da entrada, quantidade de escritas, estabilidade e clareza do contrato também orientam a escolha.

Algoritmos de comparação como merge sort conseguem Θ(n log n) no pior caso, uma diferença importante para entradas grandes. Vamos implementá-lo no capítulo 15, depois de aprender recursão. Por enquanto, não esconda uma solução recursiva dentro destas versões.

**Próximo passo:** compare o comportamento das duas implementações na [atividade 2](../03-pratica/atividades.md#atividade-2). [Voltar ao guia](../README.md#etapa-4).
