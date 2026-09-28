# Prática — Busca e ordenação

Use rascunhos TypeScript e envie uma tentativa por vez. As atividades pedem implementação e decisão; não há gabarito antecipado.

### 1. Busca binária sem copiar a aula

Implemente `buscaBinaria(valores: readonly number[], alvo: number): number` de forma iterativa. A entrada está em ordem crescente. Devolva o índice de uma ocorrência ou `-1` se o alvo estiver ausente. Não use `indexOf`, `findIndex`, `includes`, `sort` nem recursão.

Teste pelo menos:

| Valores | Alvo | Resultado esperado |
|---|---:|---:|
| `[]` | 4 | `-1` |
| `[4]` | 4 | `0` |
| `[4]` | 3 | `-1` |
| `[1, 3, 5, 7, 9]` | 1 | `0` |
| `[1, 3, 5, 7, 9]` | 9 | `4` |
| `[1, 3, 5, 7, 9]` | 6 | `-1` |
| `[1, 3, 3, 3, 8]` | 3 | qualquer índice de `1` a `3` |

Antes de executar o caso ausente, anote a sequência de `[inicio, fim]`. Explique em uma frase por que o intervalo diminui sempre e justifique tempo e espaço no pior caso.

### 2. Ordenar e contar o trabalho

Sem copiar as implementações, escolha **insertion sort** ou **selection sort** e implemente uma função que ordene números finitos em ordem crescente, altere o array recebido e devolva a mesma referência. Teste `[]`, um elemento, valores repetidos, array já ordenado e array em ordem inversa.

Depois, acrescente temporariamente contadores de comparações entre valores e de escritas no array. Execute sua função com `[1, 2, 3, 4, 5]` e `[5, 4, 3, 2, 1]`. Preveja antes qual entrada exigirá mais trabalho e confronte a previsão com os contadores. Remova os contadores ao terminar.

Por fim, trace no papel uma passagem do outro algoritmo sobre `[3, 1, 2]`. Explique a principal diferença entre as duas estratégias e indique se a implementação estudada é estável.

### 3. Preparar ou buscar diretamente?

Para cada cenário, escolha busca linear, busca binária direta ou ordenação seguida de buscas binárias. Justifique o custo total, não apenas o da consulta final.

1. Um array desordenado com 80 leituras será consultado uma vez e descartado.
2. Um arquivo já entrega um milhão de identificadores em ordem crescente; serão feitas muitas consultas, sem alterações.
3. Uma fotografia desordenada de muitos registros será consultada milhares de vezes e pode ser preparada uma vez. A ordem original precisa continuar disponível.

No terceiro cenário, escreva apenas o pequeno trecho que preserva o array original, cria uma cópia numericamente ordenada e faz uma busca binária nela. Confira que `original` não mudou. Diga também por que a complexidade exata de `sort()` não pode ser prometida apenas pela API do JavaScript.

[Voltar ao guia de estudo](../README.md#etapa-5).
