# Métodos Avançados de Array — Exemplos Práticos

Execute os exemplos separadamente. Antes de rodar, preveja o tipo e o valor do retorno.

## Exemplo 1 — Aquecimento com valores primitivos

```typescript
const metros: number[] = [1.5, 2, 3.25];
const centimetros = metros.map((valor) => valor * 100);
const maioresQueDuzentos = centimetros.filter((valor) => valor > 200);

console.log(centimetros); // [150, 200, 325]
console.log(maioresQueDuzentos); // [325]
console.log(metros); // [1.5, 2, 3.25]
```

`map` produz um resultado por entrada. `filter` decide quais resultados permanecem.

## Dados usados nos próximos exemplos

```typescript
const tarefas: {
  titulo: string;
  minutos: number;
  concluida: boolean;
}[] = [
  { titulo: "Revisar callbacks", minutos: 30, concluida: true },
  { titulo: "Praticar map", minutos: 45, concluida: false },
  { titulo: "Ler código real", minutos: 25, concluida: true },
  { titulo: "Refazer exercício", minutos: 20, concluida: false },
];
```

## Exemplo 2 — `forEach` para efeito

```typescript
tarefas.forEach((tarefa, indice) => {
  console.log(`${indice + 1}. ${tarefa.titulo}`);
});
```

O método percorre todos os objetos e retorna `void`.

## Exemplo 3 — `filter` seleciona objetos

```typescript
const concluidas = tarefas.filter((tarefa) => tarefa.concluida);

console.log(concluidas.length); // 2
console.log(concluidas[0].titulo); // Revisar callbacks
```

O callback recebe uma tarefa, não o array inteiro. O resultado continua sendo um array de objetos com a mesma forma.

## Exemplo 4 — `map` muda o tipo do elemento

```typescript
const titulos: string[] = tarefas.map((tarefa) => tarefa.titulo);
const resumos: string[] = tarefas.map(
  (tarefa) => `${tarefa.titulo}: ${tarefa.minutos} min`,
);

console.log(titulos);
console.log(resumos);
```

Quatro objetos entram; quatro strings saem.

## Exemplo 5 — `find` e `findIndex`

```typescript
const primeiraLonga = tarefas.find((tarefa) => tarefa.minutos >= 40);
const indiceDaPrimeiraPendente = tarefas.findIndex(
  (tarefa) => !tarefa.concluida,
);

console.log(primeiraLonga?.titulo); // Praticar map
console.log(indiceDaPrimeiraPendente); // 1
```

O `?.` apenas permite a leitura segura no exemplo. Nos exercícios, pratique também o tratamento explícito com `if/else`.

## Exemplo 6 — `some` e `every` encerram quando podem

```typescript
let chamadasSome = 0;
const existeLonga = tarefas.some((tarefa) => {
  chamadasSome++;
  return tarefa.minutos >= 40;
});

let chamadasEvery = 0;
const todasPositivas = tarefas.every((tarefa) => {
  chamadasEvery++;
  return tarefa.minutos > 0;
});

console.log(existeLonga, chamadasSome); // true, 2
console.log(todasPositivas, chamadasEvery); // true, 4
```

`some` encontrou sua resposta no segundo item. `every` precisou confirmar os quatro.

## Exemplo 7 — `reduce` com item objeto

```typescript
const minutosConcluidos = tarefas.reduce(
  (total, tarefa) => tarefa.concluida ? total + tarefa.minutos : total,
  0,
);

console.log(minutosConcluidos); // 55
```

Rastreamento:

```text
0 → 30 → 30 → 55 → 55
```

O acumulador é `number`; o elemento atual é um objeto tarefa.

## Exemplo 8 — Callback nomeada e referência

```typescript
function pendente(tarefa: {
  titulo: string;
  minutos: number;
  concluida: boolean;
}): boolean {
  return !tarefa.concluida;
}

const tarefasPendentes = tarefas.filter(pendente);
const existePendente = tarefas.some(pendente);

console.log(tarefasPendentes.length); // 2
console.log(existePendente); // true
```

A mesma referência é compatível com os dois métodos porque ambos esperam uma regra booleana para cada tarefa.

## Exemplo 9 — Closure como critério configurável

```typescript
function criarDuracaoMinima(
  minima: number,
): (tarefa: { minutos: number }) => boolean {
  return (tarefa): boolean => tarefa.minutos >= minima;
}

const peloMenosTrinta = criarDuracaoMinima(30);
const tarefasLongas = tarefas.filter(peloMenosTrinta);

console.log(tarefasLongas.map((tarefa) => tarefa.titulo));
// ["Revisar callbacks", "Praticar map"]
```

`filter` recebe a função guardada em `peloMenosTrinta`, não o resultado de chamar essa função com uma tarefa específica.

## Exemplo 10 — Encadeamento com tipo intermediário

```typescript
const titulosConcluidos = tarefas
  .filter((tarefa) => tarefa.concluida)
  .map((tarefa) => tarefa.titulo);

console.log(titulosConcluidos);
// ["Revisar callbacks", "Ler código real"]
```

```text
tarefas → filter → objeto[] com 2 tarefas → map → string[] com 2 títulos
```

## Exemplo 11 — Ordem que muda o resultado

```typescript
const precos: number[] = [10, 20, 40];

const filtrarDepoisDescontar = precos
  .filter((preco) => preco >= 20)
  .map((preco) => preco / 2);

const descontarDepoisFiltrar = precos
  .map((preco) => preco / 2)
  .filter((preco) => preco >= 20);

console.log(filtrarDepoisDescontar); // [10, 20]
console.log(descontarDepoisFiltrar); // [20]
```

Na segunda versão, o filtro recebe os preços já reduzidos.

## Exemplo 12 — Novo array e novos objetos

```typescript
const apenasOutroArray = [...tarefas];
const novosObjetos = tarefas.map((tarefa) => ({ ...tarefa }));

console.log(apenasOutroArray === tarefas); // false
console.log(apenasOutroArray[0] === tarefas[0]); // true
console.log(novosObjetos[0] === tarefas[0]); // false
```

Spread no array troca apenas a coleção externa. `map` com spread cria também um objeto novo para cada elemento.

## Casos de limite

```typescript
const vazio: { titulo: string; minutos: number; concluida: boolean }[] = [];

console.log(vazio.map((tarefa) => tarefa.titulo)); // []
console.log(vazio.filter((tarefa) => tarefa.concluida)); // []
console.log(vazio.find((tarefa) => tarefa.concluida)); // undefined
console.log(vazio.findIndex((tarefa) => tarefa.concluida)); // -1
console.log(vazio.some((tarefa) => tarefa.concluida)); // false
console.log(vazio.every((tarefa) => tarefa.minutos > 0)); // true
console.log(vazio.reduce((total, tarefa) => total + tarefa.minutos, 0)); // 0
```

## Desafio rápido

Crie `exercicios/solucoes/desafio-rapido.ts` com:

```typescript
const leituras: {
  sensor: string;
  valor: number;
  valida: boolean;
}[] = [
  { sensor: "T1", valor: 42, valida: true },
  { sensor: "T2", valor: -1, valida: false },
  { sensor: "T3", valor: 28, valida: true },
  { sensor: "T4", valor: 51, valida: true },
];
```

Sem loops explícitos:

1. mantenha somente leituras válidas;
2. transforme as válidas em textos `T1: 42`;
3. encontre o primeiro objeto com `valor < 30`;
4. verifique se existe leitura inválida;
5. verifique se todas as válidas possuem valor positivo;
6. some os valores válidos com `reduce` iniciado em `0`;
7. exiba os resultados e confirme que `leituras` não mudou.

## Perguntas de conferência

1. Quem controla o percurso em `tarefas.filter(...)`?
2. Qual é o contrato do callback de `map` quando objetos viram strings?
3. Por que `find` pode chamar a callback menos vezes que `filter`?
4. Qual é o tipo intermediário antes do `map` no Exemplo 10?
5. Por que `[...tarefas]` não cria novos objetos internos?
6. O que `total` e `tarefa` representam dentro do `reduce`?
