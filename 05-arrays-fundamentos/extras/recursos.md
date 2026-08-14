# Arrays — Recursos e Roteiro de Revisão

O material do próprio capítulo é suficiente para a introdução de hoje. Use os links abaixo apenas para confirmar uma dúvida específica, sem tentar estudar toda a documentação de uma vez.

## Documentação essencial

1. [TypeScript Handbook — Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)  
   Referência oficial e curta para as formas `number[]` e `Array<number>`.

2. [MDN — Coleções indexadas](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Indexed_collections)  
   Visão geral de arrays, índices e operações. Leia apenas a introdução e consulte os exemplos conforme necessário.

3. [MDN — Array.length](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/length)  
   Consulta sobre quantidade de elementos e relação com o último índice.

## Consulta dos quatro métodos

- [`push`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/push) e [`unshift`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift): adicionam e retornam o novo tamanho;
- [`pop`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) e [`shift`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/shift): removem e retornam o elemento ou `undefined`.

Não é necessário memorizar todas as possibilidades mostradas nessas páginas. Neste capítulo, concentre-se somente no comportamento apresentado na tabela acima.

## Roteiro curto para estudar hoje

### Bloco 1 — Modelo mental (15 minutos)

1. Releia `aula/01-teoria.md` até “Índices fora do array”.
2. Desenhe um array com três elementos, seus índices e seu `length`.
3. Responda sem executar: primeiro índice, último índice e resultado de acessar `array[array.length]`.

### Bloco 2 — Operações básicas (20 minutos)

1. Releia em `aula/02-sintaxe.md` a tabela das quatro operações.
2. Em papel ou comentário, acompanhe este estado linha por linha:

```typescript
const letras: string[] = ["B", "C"];
letras.unshift("A");
letras.push("D");
const primeira = letras.shift();
const ultima = letras.pop();
```

3. Registre separadamente o array final e os valores de `primeira` e `ultima`.

### Bloco 3 — Prática inicial (30–45 minutos)

1. Execute os exemplos 1 a 6 de `aula/03-exemplos.md` separadamente.
2. Faça `exercicios/desafio-rapido.ts` sem olhar a resposta pronta.
3. Se ainda houver energia, faça o mini-projeto `exercicios/fila-estudos.ts`.

### Encerramento (5 minutos)

Explique em voz alta, com suas palavras:

- por que o primeiro índice é `0`;
- por que o último índice é `length - 1`;
- o que cada um dos quatro métodos retorna;
- por que um array com `const` pode mudar;
- por que `const b = a` não cria outro array.

Se alguma resposta não vier com clareza, volte somente à seção correspondente em `extras/erros-comuns.md`.

## Extensão: arrays + loops

Depois de concluir os fundamentos:

1. leia `aula/05-arrays-e-loops.md`;
2. faça `exercicios/lista-arrays-e-loops.md`;
3. use a documentação de loops do Capítulo 04 apenas para revisar `for`, `continue`, `break` ou loops aninhados;
4. não antecipe métodos de transformação, busca ou filtragem do Capítulo 06;
5. não realize a prova do Capítulo 05 antes da liberação.
