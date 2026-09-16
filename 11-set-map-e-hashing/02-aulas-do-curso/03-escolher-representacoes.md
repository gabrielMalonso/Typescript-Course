# Escolher entre Array, Set, Map e Object

## Uma mudança no requisito muda a representação

Pense num pequeno sistema de empréstimo de livros. Um livro tem título, código e ano. São campos conhecidos com significados diferentes. Um **objeto** deixa essa estrutura visível, e o TypeScript pode inferir os tipos de cada campo:

```typescript
const livro = { codigo: "L7", titulo: "Algoritmos", ano: 2009 };
console.log(livro.titulo); // Algoritmos
```

Agora precisamos mostrar o histórico dos empréstimos na ordem em que ocorreram. Duas retiradas do mesmo livro são eventos distintos que precisamos preservar. Um **Array** expressa essa sequência e suas posições; transformar o histórico em um Set de códigos perderia ocorrências.

Mude a pergunta: quais códigos estão bloqueados para novos empréstimos? Se interessa apenas presença, um **Set** expressa a regra. Mude novamente: para qual pessoa cada livro está emprestado agora? Um **Map** pode associar código à pessoa. Se um livro puder ter vários exemplares simultâneos, o código do título sozinho deixa de identificar a unidade: a escolha da chave precisa acompanhar o contrato.

As quatro representações podem coexistir: um array de objetos para eventos, um Set de bloqueios e um Map para consultas atuais. Não crie todos automaticamente. Cada coleção extra ocupa memória e precisa continuar coerente quando os dados mudam.

## Por que não guardar tudo num objeto?

Um objeto também associa nomes a valores, e pode servir como dicionário. Mas campos conhecidos, como `titulo` e `ano`, ajudam a descrever um registro; uma coleção dinâmica de códigos pede outra comparação.

Propriedades de objetos usam chaves string ou symbol. Uma chave numérica é convertida em string; Map pode distinguir o número `4` da string `"4"`. Um objeto comum também herda propriedades: `Object.hasOwn(objeto, chave)` verifica se o campo é próprio, quando essa diferença importar. Map começa sem entradas e expõe diretamente tamanho, consulta e remoção.

Isso não torna Map substituto universal de Object. Prefira o que comunica a informação e suas operações. Para um histórico pequeno percorrido uma única vez, manter apenas o array pode ser mais simples do que construir um índice que nunca será reutilizado.

## Experimentar uma mudança de estado

No código abaixo, registre mentalmente qual coleção muda após `push`. Execute e confira:

```typescript
const codigos = ["L7", "L8"];
const bloqueados = new Set(codigos);
codigos.push("L9");
console.log(codigos.length);
console.log(bloqueados.has("L9"));
```

Construir uma representação derivada não cria sincronização automática. Essa limitação é tão relevante para software quanto a velocidade da consulta. Volte à [etapa 5](../README.md#etapa-5) para decidir suas representações num problema pequeno.

## Fontes e limites desta comparação

- [MDN — Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps): recorte *Accidental Keys*, *Key Types*, *Size* e *Iteration*, verificado em 16/09/2026. A escolha para livros é raciocínio de modelagem autoral, não uma regra normativa de “sempre usar Map”.
- [MDN — Object.hasOwn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn): diferença entre campo próprio e herdado. Symbols/protótipos ficam como referência, sem implementação obrigatória agora.
- Os exemplos usam chaves pequenas, execução síncrona e estado em memória. Não modelam persistência, concorrência ou índices de banco de dados. Esses problemas não são pré-requisitos deste capítulo.
