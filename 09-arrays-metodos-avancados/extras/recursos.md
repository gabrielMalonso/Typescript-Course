# Métodos Avançados de Array — Recursos e Revisão

## Ordem recomendada de revisão

1. Releia a tabela de escolha em `aula/01-teoria.md`.
2. Para cada método, diga em voz alta qual é seu retorno.
3. Refaça os casos de limite de `aula/03-exemplos.md`.
4. Desenhe o acumulador de um `reduce` em três linhas.
5. Separe um encadeamento em variáveis intermediárias e depois reúna-o novamente.

## Documentação oficial

- [Array.prototype.forEach — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.prototype.map — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.filter — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.find — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.findIndex — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [Array.prototype.some — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [Array.prototype.every — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [Array.prototype.reduce — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Spread syntax — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Cartão mental

```text
AÇÃO       forEach  → void
TRANSFORMA map      → novo array, mesmo tamanho
SELECIONA  filter   → novo array, tamanho variável
BUSCA      find     → valor | undefined
POSIÇÃO    findIndex→ índice | -1
EXISTE?    some     → boolean
TODOS?     every    → boolean
ACUMULA    reduce   → um resultado
COPIA/UNE  spread   → novo array
```

## Perguntas para revisão oral

1. Qual método você escolhe para converter metros em centímetros? Por quê?
2. Qual a diferença de ausência entre `find` e `findIndex`?
3. Por que `map` não reduz a quantidade de elementos?
4. O que `every` devolve em `[]` e como exigir uma lista não vazia?
5. Para que serve o valor inicial do `reduce`?
6. Qual é o array intermediário de `valores.filter(...).map(...)`?
7. `const copia = original` e `const copia = [...original]` criam a mesma relação?

## Sinais de prontidão para os exercícios

- você consegue escolher o método sem olhar a tabela;
- prevê `undefined`, `-1`, `false`, `true` e `0` nos casos vazios;
- acompanha três etapas de um `reduce` manualmente;
- explica por que um encadeamento produz determinado array intermediário;
- distingue ação externa de transformação de dados.
