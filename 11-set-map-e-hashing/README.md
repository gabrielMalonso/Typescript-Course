# Guia de estudo — Set, Map e hashing

**Objetivo:** escolher o que guardar para evitar buscas repetidas, usar Set e Map em TypeScript e justificar o custo dessa escolha.

No capítulo 10, você identificou o trabalho de procurar novamente um valor dentro de um array. Agora a pergunta é: **podemos organizar a informação para encontrá-la sem percorrer tudo a cada consulta?** Depois de conhecer as ferramentas, você voltará a Contains Duplicate e Two Sum.

Siga as etapas e retorne ao guia entre materiais. A leitura usa **Introduction to Algorithms, CLRS, 3ª edição em inglês**. As páginas indicadas são as impressas. Os recortes PDF abaixo preservam as páginas completas; siga os limites de leitura de cada etapa.

## 1. Uma primeira visão de hashing

Assista à [CS50x 2026 — Week 5: Data Structures, David Malan](https://cs50.harvard.edu/x/2026/weeks/5/), com aula gravada em **2025**. Use estes trechos do vídeo:

- [**10:44–12:26 — Dictionaries**](https://www.youtube.com/watch?v=PmAI76OGE_E&t=644s): como associar uma chave a um valor. Pare ao começar *Resizing Arrays*.
- [**1:36:47–1:53:51 — Hashing and Hash Tables**](https://www.youtube.com/watch?v=PmAI76OGE_E&t=5807s): acompanhe a distribuição das cartas e dos nomes, as colisões e a troca entre trabalho de busca e memória. Pare ao começar *Tries*.

Nos exemplos em C, foque na entrada e na saída da função: um nome entra e uma posição sai. Não precisa reproduzir o código nem acompanhar os detalhes de `const`, `unsigned int` e ponteiros. Nos desenhos, as setas ligam elementos que ficaram no mesmo grupo; listas ligadas serão estudadas depois.

Observe também que o exemplo usa uma quantidade fixa de grupos. Na etapa 4, o livro explica as condições para obter custo médio constante conforme a quantidade de dados cresce.

**Depois:** veja como o livro representa essa mesma ideia.

## 2. Do índice conhecido à posição calculada

[CLRS · Introdução e seção 11.1 · páginas 253–255](leituras/clrs-11.1.pdf)

Comece pela **abertura do capítulo, p. 253**. Ela apresenta o problema que a tabela hash resolve e sua relação com arrays. As menções às seções seguintes são um mapa do livro, não uma lista de pré-requisitos.

Depois leia **11.1 — Direct-address tables**, da p. 254 até o parágrafo anterior a *Exercises*, na p. 255. Acompanhe a figura 11.1 e a ideia das operações de buscar, inserir e remover. Nos pequenos pseudocódigos, `T[k]` é a posição de índice `k`; `x.key` é a chave do elemento `x`. Não precisa implementar ponteiros nem fazer os exercícios de 11.1.

[CLRS 11.2 · páginas 256–260](leituras/clrs-11.2.pdf)

Leia as pp. **256–257**, até o parágrafo que abre *Collision resolution by chaining*. Deixe as pp. 258–260 para a etapa 4.

Procure a diferença entre usar a própria chave como índice e calcular uma posição para ela. Nas figuras, as setas apenas indicam onde encontrar os elementos; não implemente ponteiros. No agrupamento de colisões, basta entender que várias chaves continuam guardadas e precisam ser distinguidas.

Se a notação atrapalhar: `U` é o conjunto de todas as chaves possíveis; `K`, o das chaves guardadas; `h(k)`, a posição calculada para a chave `k`. `NIL` representa ausência.

**Depois:** faça a [atividade 1 — desenho da distribuição](pratica/atividades.md#atividade-1). Volte aqui para usar coleções prontas, sem construir uma tabela hash.

## 3. Levar a ideia para TypeScript

Comece pela [nota Set: guardar presença](notas.md#set-guardar-presenca). Ela transforma uma consulta em array em uma consulta à coleção. Siga para [Map: associar uma informação](notas.md#map-associar-uma-informacao) e [Igualdade e identidade](notas.md#igualdade-e-identidade).

Para consultar os métodos durante a prática, use as referências [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods) e [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#instance_methods). Não é necessário estudar todos os métodos: os usados nas notas bastam.

**Depois:** faça a [atividade 2 — experimentar as coleções](pratica/atividades.md#atividade-2). Pode enviar essa primeira entrega junto com o desenho da atividade 1 para feedback.

## 4. O que sustenta o custo esperado?

Retorne à [seção 11.2 · página 258](leituras/clrs-11.2.pdf#page=3), a partir de *Analysis of hashing with chaining*. Pule o pseudocódigo e a discussão de remoção que vêm antes desse subtítulo.

Siga até a conclusão da seção com estes limites:

- **P. 258:** leia a introdução da análise e o pior caso. O fator de carga `α = n/m` é a quantidade de elementos dividida pela quantidade de posições.
- **[P. 259](leituras/clrs-11.2.pdf#page=4):** leia a hipótese de distribuição uniforme, a explicação da busca e os enunciados dos teoremas 11.1 e 11.2. Pode pular os trechos intitulados *Proof* e as fórmulas de valor esperado; eles não são necessários para esta etapa.
- **[P. 260](leituras/clrs-11.2.pdf#page=5):** retome no último parágrafo, iniciado por *What does this analysis mean?*. Ele conclui quando a busca tem custo médio constante. Deixe a demonstração acima e os detalhes de remoção com listas duplamente ligadas para depois.

Procure a ligação: se a distribuição for adequada e a quantidade de posições acompanhar a de elementos, a quantidade média de candidatos por posição permanece limitada. É isso que sustenta a conclusão sobre a busca.

Em seguida, leia [Custo das coleções no JavaScript](notas.md#custo-das-colecoes-no-javascript). A nota conecta o modelo do livro às operações que você vai usar.

**Depois:** faça a [atividade 3 — Contains Duplicate](pratica/atividades.md#atividade-3). Compare com sua tentativa do 10, preservando-a. O foco é reconhecer qual trabalho deixou de se repetir e o que passou a ocupar memória.

## 5. Quando presença não basta

Agora pratique consultas que precisam devolver uma informação associada à chave. Faça, nesta ordem:

1. [Atividade 4 — investigar uma consulta](pratica/atividades.md#atividade-4).
2. [Atividade 5 — Two Sum](pratica/atividades.md#atividade-5).
3. [Atividade 6 — Valid Anagram](pratica/atividades.md#atividade-6).

Na última, você encontrará um contrato diferente das revisões. Experimente decidir o que precisa guardar antes de escrever o código. Se houver dificuldade, envie a tentativa e o ponto em que travou; não precisa terminar a lista para receber feedback.

## 6. Feedback e continuidade

Envie as atividades essenciais **1–6**. Código, testes e uma explicação breve podem fornecer a evidência necessária: escolher a coleção pela informação exigida, tratar ausência e identidade corretamente, explicar colisões e analisar tempo e memória sob hipóteses claras.

Se precisar consolidar, retome [Find All Numbers Disappeared in an Array — atividade 7](pratica/atividades.md#atividade-7). Há também um [desafio opcional — atividade 8](pratica/atividades.md#atividade-8). Nenhum dos dois bloqueia o avanço sem uma lacuna essencial identificada.

No início da próxima sessão, explique com suas palavras por que uma colisão não significa que duas chaves sejam iguais. Após o feedback, a sequência segue para **12 — Arrays e strings como problemas**.
