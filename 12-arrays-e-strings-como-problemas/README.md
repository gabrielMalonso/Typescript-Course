# Guia de estudo — Arrays e strings como problemas

**Objetivo:** resolver transformações e contagens, controlar índices, reconhecer mutação e cópias e justificar o custo do código, inclusive dos métodos prontos.

**Comece pela etapa 1.** Você já conhece arrays, callbacks, Big O e as operações de Set/Map. Agora vamos juntar essas ferramentas em problemas nos quais os detalhes da entrada mudam a solução. Não há prova nem relatório obrigatório; envie uma tentativa por vez para discutirmos.

## 1. Vídeo — índices e percursos

Assista ao trecho **1:12:51–1:28:21** da [CS50x 2026 — Lecture 2, Arrays, David Malan](https://www.youtube.com/watch?v=h5Gc1n8ZuU8&t=4371s), gravação de 2025. Pare antes das perguntas sobre tipos numéricos. Observe as posições do array, o percurso com um índice e a função que calcula a média. Se essa base estiver clara, use o trecho como consulta.

A aula usa C: o array de tamanho fixo e a passagem separada do tamanho não são a API de `Array` em TypeScript. Aqui temos `length` e arrays que podem crescer. Não é preciso reproduzir a sintaxe de C. As [notas oficiais, seção Arrays](https://cs50.harvard.edu/x/2026/notes/2/#arrays) acompanham o trecho; a transcrição e as legendas foram usadas para delimitar a seleção.

## 2. Índices, limites e cópias

Leia a [aula 1 — Percorrer e transformar arrays](02-aulas-do-curso/01-percursos-e-copias.md). Execute os blocos separadamente em um rascunho com `ts-node arquivo.ts`.

Depois, consulte na MDN apenas **Description** e **Using slice with arrays of objects** de [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#description). Procure explicar o que é copiado quando um array contém objetos. Faça o [experimento de mutação](03-pratica/atividades.md#atividade-1).

## 3. O trabalho escondido nos métodos

Comece pelo [CLRS · 17.4 — Expansão de tabelas, pp. 463–465](01-leituras-do-livro/clrs-17.4-expansao.pdf), da 3ª edição em inglês. O recorte preserva as páginas completas; siga estes limites:

- **p. 463:** comece no título **17.4 Dynamic tables**, depois dos exercícios da seção anterior. Leia a motivação: o armazenamento pode ficar cheio, exigindo uma área maior e a cópia dos elementos. O fator de carga compara posições ocupadas com capacidade disponível.
- **p. 464:** leia **17.4.1 Table expansion** e acompanhe `TABLE-INSERT`. Diferencie a inserção comum da inserção que exige expansão. A capacidade dobra; a quantidade de elementos aumenta apenas em um.
- **p. 465:** leia a análise até a conclusão de custo amortizado constante, antes de **By using the accounting method**. A soma formal é opcional nesta primeira passagem: acompanhe a ideia de que cópias de tamanhos 1, 2, 4, 8… somam menos que duas vezes o último tamanho. As inserções comuns também entram no custo total. O parágrafo final sobre o método contábil continua na página seguinte e não faz parte desta leitura.

Esse é um modelo de array dinâmico, não uma descrição obrigatória da implementação de `Array` em JavaScript. A pergunta que vamos levar à aula é: **como uma inserção ocasionalmente cara pode conviver com custo O(n) para n inserções?** Não é necessário resolver os exercícios da página 463.

Leia a [aula 2 — Custos de métodos e encadeamentos](02-aulas-do-curso/02-custos-dos-metodos.md). O foco é distinguir vários percursos sequenciais de uma busca repetida dentro de cada percurso.

Resolva [Lotes recebidos](03-pratica/atividades.md#atividade-2) sem consultar uma solução. Escolha você a representação e compare seu custo com uma alternativa.

## 4. Strings e a unidade de caractere

Na MDN, leia os exemplos **Using length** e **Strings with length not equal to the number of characters** de [`String.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#examples). Não precisa estudar os limites máximos de tamanho por motor.

Siga para a [aula 3 — Strings, transformação e contagem](02-aulas-do-curso/03-strings-e-unicode.md). Execute os exemplos de emoji e acento combinado antes da [prática com texto](03-pratica/atividades.md#atividade-3). As restrições dos enunciados fazem parte do problema: não suponha ASCII quando ele não foi informado.

## 5. Prática e feedback

O percurso essencial é **aula 1 → atividade 1 → leitura do CLRS e aula 2 → atividade 2 → aula 3 → atividade 3**. A [atividade 4](03-pratica/atividades.md#atividade-4) retoma um problema de pares sem indicar a estrutura de solução; faça depois do feedback das anteriores.

Ao enviar código, inclua os testes que executou e uma explicação curta de tempo e espaço. Considere vazio, valores repetidos e resultado ausente quando fizerem parte do contrato. Corrigimos a partir da sua tentativa, sem gabarito antecipado.

Padrões de janelas ficam para os capítulos 29–31; busca binária e ordenação, para o 14. Este capítulo não exige classes, interfaces ou generics autorais.

## Fontes e limites da seleção

- CS50: [Week 2](https://cs50.harvard.edu/x/2026/weeks/2/), somente o trecho de arrays indicado acima; notas e [transcrição oficial](https://cdn.cs50.net/2025/fall/lectures/2/lang/en/lecture2.txt) consultadas.
- MDN: leituras delimitadas nas etapas 2 e 4; referências adicionais ao final das aulas servem para consulta.
- O [mapa de leituras do MIT 6.006, Fall 2011](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) orientou a consulta ao CLRS, 3ª edição inglesa. Foram inspecionadas a seção 10.1 (pilhas e filas, pp. 232–235), a introdução de 17.4 e a análise de expansão (pp. 463–465), além de 32.1 (busca de padrões, pp. 988–989). A leitura selecionada é 17.4/17.4.1, pp. 463–465, nos limites da etapa 3; os outros assuntos não são leitura exigida aqui.
