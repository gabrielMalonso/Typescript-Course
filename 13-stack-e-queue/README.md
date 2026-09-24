# Guia de estudo — Stack e Queue

**Objetivo:** escolher entre pilha e fila pela ordem de saída, implementá-las com arrays e funções e explicar o custo das operações, incluindo memória retida e compactação.

Você já conhece `push`, `pop`, índices e custos de métodos. Agora vamos restringir o que fazemos com um array para representar duas regras úteis: desfazer primeiro a ação mais recente ou atender primeiro quem chegou antes. Não precisamos de classes, interfaces ou generics autorais.

## 1. Vídeo — quem sai primeiro?

Assista a estes trechos dos shorts do CS50, com Doug Lloyd:

- [Stacks](https://cs50.harvard.edu/x/shorts/stacks/): **0:44–2:08**, da definição da estrutura até as operações `push` e `pop`.
- [Queues](https://cs50.harvard.edu/x/shorts/queues/): **0:27–2:13**, da comparação com pilhas até `enqueue` e `dequeue`.

Os trechos introduzem as regras de saída. O restante dos vídeos usa C e aborda implementações com listas encadeadas, assunto posterior do curso; não é necessário assistir agora. A menção inicial a listas não é um pré-requisito desta aula.

## 2. Livro e aula — pilha

Abra [CLRS · 10.1 — Pilhas e filas, pp. 232–235](01-leituras-do-livro/clrs-10.1.pdf). Nesta etapa, leia **do título 10.1 na p. 232 até o fim da p. 233**. Acompanhe a figura 10.1 e as operações `STACK-EMPTY`, `PUSH` e `POP`.

O livro usa índices a partir de 1 e capacidade fixa. Nosso array começa em 0 e pode crescer. Observe também que o livro sinaliza erro ao retirar de uma pilha vazia; podemos escolher outro contrato, desde que ele seja explícito.

Leia a [aula 1 — Pilha: a ação mais recente primeiro](02-aulas-do-curso/01-pilha.md). Execute o bloco completo em um rascunho com `ts-node arquivo.ts`. Depois, faça a [atividade 1](03-pratica/atividades.md#atividade-1).

## 3. Livro e aula — fila

Continue o [mesmo recorte, a partir da p. 234](01-leituras-do-livro/clrs-10.1.pdf#page=3): leia a figura 10.2, o trecho **Queues** e os algoritmos da p. 235. **Pare antes de Exercises.** Os exercícios impressos não são obrigatórios.

Na figura, o início pode avançar sem deslocar os elementos. O livro reaproveita o começo do array quando chega ao fim: essa é uma fila circular de capacidade fixa. Entenda o desenho, sem precisar implementar essa versão. Os algoritmos impressos omitem verificações de vazio e cheio; não copie essa omissão.

Leia a [aula 2 — Fila: ordem de chegada, índices e memória](02-aulas-do-curso/02-fila.md). Vamos usar um array que cresce e recuperar o espaço consumido por compactação. Faça a [atividade 2](03-pratica/atividades.md#atividade-2) para testar a fila em uso contínuo.

## 4. Aplicar e discutir

Resolva a [atividade 3 — Delimitadores](03-pratica/atividades.md#atividade-3). Envie uma tentativa por vez, com os testes executados e uma justificativa curta de tempo e espaço. Não há prova nem relatório obrigatório.

Ao terminar, procure explicar por que usar o mesmo array não torna pilha e fila equivalentes e por que uma remoção ocasionalmente linear pode ter custo amortizado constante. Busca e ordenação ficam para o capítulo 14; a pilha de chamadas reaparece com recursão no 15.

## Fontes e limites da seleção

- CS50: trechos acima delimitados pela inspeção das transcrições e legendas oficiais de [Stacks](https://cdn.cs50.net/2017/fall/shorts/stacks/lang/en/stacks.txt) e [Queues](https://cdn.cs50.net/2017/fall/shorts/queues/lang/en/queues.txt), gravações de 2017 disponibilizadas nos shorts atuais.
- O [mapa de leituras do MIT 6.006, Fall 2011](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) foi consultado como ponto de partida. Ele usa a 3ª edição do CLRS, mas não indica 10.1 como leitura isolada; a seleção foi feita pela ementa e pela inspeção direta das pp. 232–235 do exemplar local.
- MDN: apenas **Return value** e **Description** de [`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) e [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift), para conferir mutação e retorno no estado vazio. Os custos apresentados nas aulas usam o modelo de array dinâmico já discutido no capítulo 12, não uma garantia de tempo da API JavaScript.
