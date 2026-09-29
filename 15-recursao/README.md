# Guia de estudo — Recursão

**Objetivo:** escrever funções recursivas que terminam, rastrear chamadas e retornos, distinguir trabalho total de profundidade da pilha e implementar merge sort explicando seu custo.

Você já conhece funções, pilhas e ordenações simples. Agora uma função poderá resolver uma parte menor do próprio problema. O percurso é **vídeo de recursão → aula 1 → atividade 1 → aula 2 → vídeo e livro → aula 3 → atividade 2 → aplicação final**.

## 1. Vídeo — uma função pode chamar a si mesma

Assista a [Recursion, do CS50](https://cs50.harvard.edu/x/shorts/recursion/), com Doug Lloyd, **0:05–8:17**: da introdução até a comparação entre fatorial recursivo e iterativo. Pare antes da discussão de múltiplos casos base. O código usa C; concentre-se no caso base, no problema menor e no retorno das chamadas. Nossa aula fará a ponte para TypeScript com uma soma conhecida.

## 2. Aula — chamadas, espera e retorno

Leia a [aula 1 — Caso base e pilha de chamadas](02-aulas-do-curso/01-caso-base-e-pilha.md). Execute o exemplo e acompanhe a ordem dos logs antes de olhar o rastreamento. Depois, faça a [atividade 1](03-pratica/atividades.md#atividade-1), que leva a ideia para um array sem criar cópias a cada chamada.

## 3. Aula — terminar não significa ser eficiente

Leia a [aula 2 — Tempo, profundidade e trabalho repetido](02-aulas-do-curso/02-custos-e-repeticao.md). Compare as versões da soma e execute Fibonacci apenas com entradas pequenas. A pergunta central é: quantas chamadas são feitas no total e quantas permanecem ativas ao mesmo tempo?

## 4. Vídeo e livro — voltar à ordenação

Assista a [Merge Sort, do CS50](https://cs50.harvard.edu/x/shorts/merge_sort/), **0:05–10:22**, da comparação com ordenações quadráticas até o custo e a memória. Bubble sort aparece como comparação; não é necessário estudá-lo para acompanhar este capítulo.

Abra [CLRS · Divisão e conquista com merge sort, pp. 30–35](01-leituras-do-livro/clrs-2.3-merge-sort.pdf). A leitura essencial é:

- **pp. 30–31:** seção 2.3.1, os passos dividir/resolver/combinar, a ideia de intercalar e o pseudocódigo `MERGE`.
- **pp. 32–33:** acompanhe somente a figura 2.3 e sua continuação. A prova por invariante pode ser pulada agora.
- **p. 34:** leia até o fim da explicação de `MERGE-SORT`, antes de **2.3.2 Analyzing divide-and-conquer algorithms**.
- **p. 35:** observe somente a figura 2.4 e sua legenda. Pare antes da análise por recorrência abaixo dela.

O livro usa índices a partir de 1, modifica o array e utiliza sentinelas no `MERGE`. Nossa versão começa em 0, retorna um novo array e verifica quando cada metade acaba. A análise formal de recorrências fica para o capítulo 81; vamos justificar o crescimento contando trabalho por nível.

## 5. Aula e prática — dividir, resolver e combinar

Leia a [aula 3 — Merge sort em TypeScript](02-aulas-do-curso/03-merge-sort.md). Execute o bloco completo com tamanho ímpar, vazio, negativos e repetições. Faça a [atividade 2](03-pratica/atividades.md#atividade-2) para reconstruir a intercalação sem copiar a implementação.

Finalize com a [atividade 3](03-pratica/atividades.md#atividade-3): um problema de registros sem indicação da estrutura ou do algoritmo. Envie uma tentativa por vez, com testes e uma justificativa curta de tempo e espaço. Não há prova nem relatório obrigatório.

Este capítulo encerra os conteúdos do bloco 1. O capstone C01 é o próximo marco de integração, a ser definido separadamente; o capítulo 16 retoma a modelagem em TypeScript com tuples.

## Fontes e limites da seleção

- CS50: trechos delimitados pela inspeção das transcrições e legendas oficiais de [Recursion](https://cdn.cs50.net/2017/fall/shorts/recursion/lang/en/recursion.txt) e [Merge Sort](https://cdn.cs50.net/2017/fall/shorts/merge_sort/lang/en/merge_sort.txt), gravações de 2017 disponíveis nos shorts atuais. Os limites de vídeo estão nas etapas 1 e 4.
- O [mapa de leituras do MIT 6.006, Fall 2011](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) indica CLRS 2.1–2.3 para insertion sort e merge sort. A seção 2.3 foi inspecionada no exemplar canônico; somente as pp. 30–35 foram recortadas, com os limites da etapa 4.
- MDN: a definição e o exemplo de [Call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack) e **What went wrong?** de [Too much recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion), para conferir retorno de chamadas e limites de profundidade do runtime.
