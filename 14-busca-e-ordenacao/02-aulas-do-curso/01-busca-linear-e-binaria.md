# Busca linear e busca binária

Você recebe uma lista de códigos e quer encontrar `42`. Em um array qualquer, o primeiro valor não diz nada sobre os seguintes. Em um array ordenado, comparar com um valor central revela qual metade ainda pode conter o alvo.

Ordenação muda o que podemos concluir depois de uma comparação. Essa é a diferença essencial entre as duas buscas.

## Busca linear: examinar até decidir

A busca linear visita os valores da esquerda para a direita. Ela funciona mesmo quando o array não está ordenado.

```typescript
function buscaLinear(valores: readonly number[], alvo: number): number {
  for (let indice = 0; indice < valores.length; indice++) {
    if (valores[indice] === alvo) return indice;
  }

  return -1;
}

console.log(buscaLinear([8, 3, 8, 1], 8)); // 0
console.log(buscaLinear([8, 3, 8, 1], 1)); // 3
console.log(buscaLinear([8, 3, 8, 1], 9)); // -1
```

O contrato devolve o índice da primeira ocorrência ou `-1` quando o alvo não aparece. O tipo `readonly number[]` comunica que a função apenas lê o array. Ele não torna o array original imutável fora da função.

Se o primeiro valor for o alvo, fazemos uma comparação: melhor caso Θ(1). Se o alvo for o último ou estiver ausente, examinamos `n` posições: pior caso Θ(n). O algoritmo usa Θ(1) de espaço auxiliar.

Métodos como `indexOf` e `findIndex` abstraem esse percurso, mas não tornam a busca sublinear. No pior caso, ainda precisam decidir após examinar o array.

## A pré-condição da busca binária

Considere o array crescente:

```text
índice:  0   1   2   3   4   5   6
valor:   3   7  11  15  19  24  31
```

Ao comparar o alvo `19` com o valor central `15`, sabemos que os índices de 0 a 3 não servem. Isso só é válido porque todos os valores à esquerda são menores ou iguais ao centro e todos à direita são maiores ou iguais.

Busca binária em dados desordenados não é apenas mais lenta: ela pode devolver uma resposta errada. A ordenação crescente é uma **pré-condição**, algo que deve ser verdade antes da função começar.

## Um intervalo fechado

Vamos representar a parte ainda possível por dois índices inclusivos: `[inicio, fim]`.

- inicialmente, `inicio = 0` e `fim = valores.length - 1`;
- o meio pertence ao intervalo;
- após comparar o meio, ele próprio pode ser descartado com `meio + 1` ou `meio - 1`;
- enquanto `inicio <= fim`, existe pelo menos uma posição candidata;
- quando `inicio > fim`, o intervalo está vazio e o alvo não existe.

Para buscar `19`:

| Intervalo | Meio e valor | Decisão |
|---|---|---|
| `[0, 6]` | índice 3 → `15` | `19` é maior; novo início `4` |
| `[4, 6]` | índice 5 → `24` | `19` é menor; novo fim `4` |
| `[4, 4]` | índice 4 → `19` | encontrou |

Não criamos subarrays. `inicio` e `fim` descrevem uma parte do mesmo array, evitando cópias que acrescentariam trabalho e memória.

## Implementação iterativa

```typescript
function buscaBinaria(valores: readonly number[], alvo: number): number {
  let inicio = 0;
  let fim = valores.length - 1;

  while (inicio <= fim) {
    const meio = inicio + Math.floor((fim - inicio) / 2);
    const valorDoMeio = valores[meio];

    if (valorDoMeio === alvo) return meio;

    if (valorDoMeio < alvo) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  return -1;
}

const ordenados = [3, 7, 11, 15, 19, 24, 31];

console.log(buscaBinaria(ordenados, 19)); // 4
console.log(buscaBinaria(ordenados, 3));  // 0
console.log(buscaBinaria(ordenados, 31)); // 6
console.log(buscaBinaria(ordenados, 16)); // -1
console.log(buscaBinaria([], 16));        // -1
```

O cálculo do meio também poderia ser `Math.floor((inicio + fim) / 2)`. A forma usada deixa explícito que avançamos a partir de `inicio` por metade da distância restante e evita estouro da soma em linguagens com inteiros de tamanho fixo. Arrays JavaScript têm outros limites antes de esse detalhe se tornar relevante, mas a fórmula é portátil.

## Por que termina?

O invariante é: **se o alvo existe no array, ele está dentro do intervalo fechado `[inicio, fim]`**.

Quando o meio não é o alvo, a ordem prova qual lado pode ser descartado. Como usamos `meio + 1` ou `meio - 1`, o intervalo diminui em toda iteração. Usar apenas `inicio = meio` poderia deixar um intervalo de duas posições sem diminuir e causar loop infinito.

No array vazio, `fim` começa em `-1`, então a condição já é falsa. Em um intervalo de uma posição, ainda fazemos a comparação porque `inicio === fim` satisfaz `<=`. Só depois de descartar essa posição os limites se cruzam.

## Custo e valores repetidos

Cada comparação elimina aproximadamente metade das posições restantes:

```text
n → n/2 → n/4 → n/8 → ... → 1
```

O número de divisões até chegar a 1 cresce como log₂ n. O pior caso é Θ(log n), e a versão iterativa usa Θ(1) de espaço auxiliar.

Se houver valores repetidos, esta função devolve **uma ocorrência**, não necessariamente a primeira. Encontrar a primeira ocorrência exige guardar um resultado e continuar procurando à esquerda; é outro contrato. Não atribua uma garantia que a implementação não oferece.

## Ordenar para uma única busca?

Se os dados estão desordenados e você fará uma busca, percorrê-los custa Θ(n). Ordenar primeiro custa pelo menos o trabalho da ordenação e só depois permite Θ(log n) para a consulta. A busca binária não recupera automaticamente esse custo de preparação.

Ela faz sentido quando os dados já chegam ordenados ou quando uma preparação pode ser compartilhada por muitas consultas. Também é preciso preservar a ordem após inserções e alterações. A escolha considera o ciclo de vida dos dados, não apenas a linha que chama a busca.

**Próximo passo:** implemente novamente a busca sem copiar o bloco na [atividade 1](../03-pratica/atividades.md#atividade-1). [Voltar ao guia](../README.md#etapa-2).
