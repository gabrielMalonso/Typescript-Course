# Guia de estudo — Set, Map e hashing

**Objetivo:** escolher o que guardar para evitar buscas repetidas, usar Set e Map em TypeScript e justificar o custo dessa escolha.

No capítulo 10, você identificou o trabalho de procurar novamente um valor dentro de um array. Agora a pergunta é: **podemos organizar a informação para encontrá-la sem percorrer tudo a cada consulta?** Depois de conhecer as ferramentas, você voltará a Contains Duplicate e Two Sum.

Siga as etapas e retorne ao guia entre materiais. A leitura usa **Introduction to Algorithms, CLRS, 3ª edição em inglês**. As páginas indicadas são as impressas. Os recortes PDF abaixo preservam as páginas completas; siga os limites de leitura de cada etapa.

## 1. Uma primeira visão de hashing

Assista ao [CS50 — Short: Hash Tables, Doug Lloyd](https://cs50.harvard.edu/x/shorts/hash_tables/) (gravação de 2017, disponível no CS50x):

- [**02:44–06:14**](https://www.youtube.com/watch?v=nvzVHwrrub0&t=164s): como uma função transforma uma chave em uma posição; acompanhe os exemplos com nomes.
- [**08:29–09:42**](https://www.youtube.com/watch?v=nvzVHwrrub0&t=509s): duas chaves podem chegar à mesma posição. Pare antes da explicação de *linear probing*.

A posição calculada ajuda a localizar um valor. Ela não é uma identificação exclusiva: o segundo trecho apresenta justamente esse limite. Há uma menção a listas ligadas; você não precisa conhecer nem implementar essa estrutura agora. Pule o exemplo em C entre os recortes.

**Depois:** veja como o livro representa essa mesma ideia.

## 2. Do índice conhecido à posição calculada

[CLRS 11.1 · página 254](leituras/clrs-11.1.pdf)

Leia o primeiro parágrafo e observe a figura 11.1.

[CLRS 11.2 · páginas 256–258](leituras/clrs-11.2.pdf)

Leia as pp. **256–257**, até o parágrafo que abre *Collision resolution by chaining*. Deixe a p. 258 para a etapa 4.

Procure a diferença entre usar a própria chave como índice e calcular uma posição para ela. Nas figuras, as setas apenas indicam onde encontrar os elementos; não implemente ponteiros. No agrupamento de colisões, basta entender que várias chaves continuam guardadas e precisam ser distinguidas.

Se a notação atrapalhar: `U` é o conjunto de todas as chaves possíveis; `K`, o das chaves guardadas; `h(k)`, a posição calculada para a chave `k`. `NIL` representa ausência.

**Depois:** faça a [atividade 1 — desenho da distribuição](pratica/atividades.md#atividade-1). Volte aqui para usar coleções prontas, sem construir uma tabela hash.

## 3. Levar a ideia para TypeScript

Comece pela [nota Set: guardar presença](notas.md#set-guardar-presenca). Ela transforma uma consulta em array em uma consulta à coleção. Siga para [Map: associar uma informação](notas.md#map-associar-uma-informacao) e [Igualdade e identidade](notas.md#igualdade-e-identidade).

Para consultar os métodos durante a prática, use as referências [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods) e [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#instance_methods). Não é necessário estudar todos os métodos: os usados nas notas bastam.

**Depois:** faça a [atividade 2 — experimentar as coleções](pratica/atividades.md#atividade-2). Pode enviar essa primeira entrega junto com o desenho da atividade 1 para feedback.

## 4. O que sustenta o custo esperado?

Retorne à [seção 11.2 · página 258](leituras/clrs-11.2.pdf#page=3), somente ao trecho *Analysis of hashing with chaining*. Leia até o fim da página: ele relaciona quantidade de elementos, quantidade de posições e distribuição. Pule o pseudocódigo e a discussão de remoção que vêm antes desse subtítulo.

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
