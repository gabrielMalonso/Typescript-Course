# Prática 1 — Fundamentos

Faça após as quatro aulas. Entregue as respostas em `pratica/solucoes/fundamentos.md` e o código da tarefa 3 em `pratica/solucoes/busca.ts`. Registre primeiro sua previsão, depois a execução; não apague uma previsão errada, explique a diferença.

## 1. Contar antes de classificar

Em cada situação, declare o tamanho da entrada, a operação contada, a contagem exata quando possível e Big O. As operações do corpo são constantes.

1. Ler o primeiro e o último elemento de um array de tamanho `n`, após verificar se ele está vazio.
2. Visitar `n` elementos e, ao terminar, visitar novamente os mesmos `n`.
3. Para cada um dos `n` itens, fazer exatamente cinco verificações.
4. Comparar todos os elementos de uma coleção de tamanho `n` com todos de outra de tamanho `m`, ambos positivos.
5. Executar `n` etapas e depois contar todos os pares sem repetição entre os `n` itens.

Para os itens 2 e 5, calcule o trabalho com `n = 4` e `n = 8`. O fator de crescimento foi igual?

## 2. Rastrear reduções

Sem executar primeiro, escreva todos os valores de `restante` em `contarReducoes(9)`, da aula 2. Conte as etapas. Compare com `contarReducoes(18)` e explique por que um percurso de `n/2` itens teria outra ordem de crescimento. Execute depois para conferir.

## 3. Instrumentar uma busca

Escreva uma função que recebe números e procura o primeiro negativo. Retorne um objeto com o índice (`-1` se ausente) e a quantidade de comparações com zero. O array não deve ser alterado.

Mostre testes com negativo no começo, no fim, nenhum negativo e array vazio. Use ainda dois arrays diferentes em chamadas consecutivas. Explique por que isso ajuda a detectar dependência de uma variável global. Declare melhor e pior caso; só discuta caso médio após escrever uma hipótese sobre as entradas.

## 4. Separar memórias

Uma função recebe `n` números, produz um array intermediário com `filter` e devolve apenas quantos foram selecionados. Outra conta os selecionados com um acumulador. Assuma que todos podem passar no critério e que a callback tem custo constante. Compare tempo, entrada, saída e espaço auxiliar; a mesma classe de tempo significa o mesmo uso de memória?

Próximo: [aplicação](02-aplicacao.md).
