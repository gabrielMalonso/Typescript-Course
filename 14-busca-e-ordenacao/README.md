# Guia de estudo — Busca e ordenação

**Objetivo:** escolher uma busca compatível com o estado dos dados, implementar busca binária iterativa e ordenações simples e explicar seus contratos, custos, mutação e estabilidade.

Você já percorre arrays, controla índices e analisa loops. Agora vamos usar a ordem dos valores como informação: ela permite descartar metade de uma busca, mas não aparece de graça. O percurso essencial é **vídeos de busca → aula 1 → atividade 1 → leitura e vídeo de ordenação → aula 2 → atividade 2 → aula 3 → atividade 3**.

## 1. Vídeos — procurar percorrendo ou dividindo

Assista aos shorts do CS50 com Doug Lloyd:

- [Linear Search](https://cs50.harvard.edu/x/shorts/linear_search/): **0:05–2:45**, da definição até a comparação entre melhor e pior caso.
- [Binary Search](https://cs50.harvard.edu/x/shorts/binary_search/): **0:05–9:23**, da pré-condição de ordenação até o custo e o preço de preparar os dados.

No segundo vídeo, acompanhe especialmente os limites `start` e `end`. A busca termina quando eles se cruzam, não quando se tornam iguais. Os vídeos usam arrays de números e pseudocódigo; a implementação iterativa em TypeScript vem na próxima etapa.

## 2. Aula — limites que encolhem

Leia a [aula 1 — Busca linear e busca binária](02-aulas-do-curso/01-busca-linear-e-binaria.md). Execute o bloco de busca binária e desenhe o intervalo restante nas buscas por `19` e `16`.

Depois, faça a [atividade 1](03-pratica/atividades.md#atividade-1). Ela inclui array vazio, alvo nas extremidades, ausência e valores repetidos. Não use `sort()` dentro da função: receber dados ordenados faz parte do contrato.

## 3. Livro e vídeo — construir uma parte ordenada

Abra [CLRS · 2.1 — Insertion sort, pp. 16–18](01-leituras-do-livro/clrs-2.1-insertion-sort.pdf). Comece no título **2.1 Insertion sort**, na p. 16. Acompanhe a analogia das cartas, a figura 2.2 e o pseudocódigo. **Pare antes de _Loop invariants and the correctness of insertion sort_, na p. 18.** A introdução do capítulo e a figura 2.1 permanecem no recorte apenas para preservar as páginas completas.

O pseudocódigo usa índices a partir de 1. Na nossa implementação, a primeira posição é 0 e o primeiro elemento ainda não inserido começa no índice 1.

Assista também a [Selection Sort](https://cs50.harvard.edu/x/shorts/selection_sort/), **0:15–3:55**. Observe que selecionar o menor exige examinar toda a parte não ordenada, mesmo quando o array já está em ordem.

## 4. Aula — insertion sort e selection sort

Leia a [aula 2 — Duas ordenações simples](02-aulas-do-curso/02-ordenacoes-simples.md). Execute as duas implementações com arrays vazios, já ordenados, invertidos e com repetições. As funções alteram o array recebido; esse efeito faz parte do contrato.

Faça a [atividade 2](03-pratica/atividades.md#atividade-2). Além de ordenar, compare o trabalho realizado: insertion sort pode aproveitar uma entrada quase ordenada; selection sort mantém a mesma quantidade quadrática de comparações.

## 5. Aula — a API pronta e o custo da preparação

Leia a [aula 3 — `sort()` não apaga as decisões](02-aulas-do-curso/03-sort-e-decisoes.md). Ela mostra por que números precisam de comparador, como evitar mutação acidental, o que estabilidade significa e por que não devemos inventar uma complexidade garantida para a implementação do runtime.

Finalize com a [atividade 3](03-pratica/atividades.md#atividade-3): decida entre busca linear, busca binária sobre dados já ordenados ou preparação para muitas consultas. Envie uma tentativa por vez, com testes e uma justificativa curta de tempo e espaço. Não há prova nem relatório obrigatório.

No capítulo 15, recursão permitirá implementar merge sort e justificar intuitivamente seu custo Θ(n log n). Este capítulo não exige recursão, classes, interfaces ou generics autorais.

## Fontes e limites da seleção

- CS50: trechos acima delimitados pela inspeção das legendas e transcrições oficiais de [Linear Search](https://cdn.cs50.net/2017/fall/shorts/linear_search/lang/en/linear_search.txt), [Binary Search](https://cdn.cs50.net/2017/fall/shorts/binary_search/lang/en/binary_search.txt) e [Selection Sort](https://cdn.cs50.net/2017/fall/shorts/selection_sort/lang/en/selection_sort.txt), gravações de 2017 disponibilizadas nos shorts atuais.
- O [mapa de leituras do MIT 6.006, Fall 2011](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) indica as seções 2.1–2.3 do CLRS para insertion sort e merge sort. Foram inspecionadas diretamente essas seções no exemplar canônico. A leitura exigida aqui é somente 2.1, pp. 16–18, nos limites da etapa 3; merge sort fica para o capítulo 15.
- MDN: na etapa 5, foram usados **Description**, **Sorting with non-ASCII characters**, **Sort stability** e **Sort returns the reference to the same array** de [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). A complexidade de `sort()` depende da implementação e não é tratada como garantia da linguagem.
