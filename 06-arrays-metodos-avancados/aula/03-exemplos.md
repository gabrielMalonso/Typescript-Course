# Métodos Avançados de Array — Exemplos Práticos

Execute cada exemplo separadamente. Antes de rodar, preveja o tipo e o valor do retorno.

## Exemplo 1: lista numerada com `forEach`

```typescript
const capitulos: string[] = ["Arrays", "Tuples", "Funções"];

capitulos.forEach((capitulo, indice) => {
  console.log(`${indice + 1}. ${capitulo}`);
});
```

Saída:

```text
1. Arrays
2. Tuples
3. Funções
```

O objetivo é o efeito de exibir cada item; não precisamos de um novo array.

## Exemplo 2: converter unidades com `map`

```typescript
const metros: number[] = [1.5, 2, 3.25];
const centimetros = metros.map((valor) => valor * 100);

console.log(centimetros); // [150, 200, 325]
console.log(metros); // [1.5, 2, 3.25]
```

Há um resultado para cada entrada, portanto `map` é adequado. O original permanece intacto.

## Exemplo 3: selecionar durações com `filter`

```typescript
const duracoes: number[] = [12, 25, 8, 30, 18];
const sessoesLongas = duracoes.filter((duracao) => duracao >= 20);

console.log(sessoesLongas); // [25, 30]
```

O resultado pode conter de zero até cinco elementos, mas todos continuam sendo números.

## Exemplo 4: valor ou índice?

```typescript
const codigos: string[] = ["A-10", "B-20", "C-30"];

const codigoEncontrado = codigos.find((codigo) => codigo === "B-20");
const indiceEncontrado = codigos.findIndex((codigo) => codigo === "B-20");
const ausente = codigos.find((codigo) => codigo === "X-99");

console.log(codigoEncontrado); // B-20
console.log(indiceEncontrado); // 1
console.log(ausente); // undefined
```

Use `find` quando precisa do elemento. Use `findIndex` quando precisa da posição para outra operação.

## Exemplo 5: perguntas booleanas

```typescript
const percentuais: number[] = [100, 80, 100, 60];

const existeIncompleto = percentuais.some((valor) => valor < 100);
const todosIniciados = percentuais.every((valor) => valor > 0);

console.log(existeIncompleto); // true
console.log(todosIniciados); // true
```

Não use `filter(...).length > 0` apenas para responder se algo existe. `some` comunica diretamente essa intenção.

## Exemplo 6: total com `reduce`

```typescript
const despesas: number[] = [35, 12, 8];

const total = despesas.reduce(
  (acumulador, despesa) => acumulador + despesa,
  0,
);

console.log(`Total: R$ ${total}`); // Total: R$ 55
```

Para prever o resultado, acompanhe o acumulador: `0 → 35 → 47 → 55`.

## Exemplo 7: encadeamento com etapas claras

```typescript
const pontuacoes: number[] = [4, 7, 9, 5, 10];

const bonusDosAprovados = pontuacoes
  .filter((pontuacao) => pontuacao >= 7)
  .map((pontuacao) => pontuacao + 1);

console.log(bonusDosAprovados); // [8, 10, 11]
console.log(pontuacoes); // [4, 7, 9, 5, 10]
```

Primeiro ficam `[7, 9, 10]`; depois cada valor recebe `1`.

## Exemplo 8: cópia e composição com spread

```typescript
const diasUteis: string[] = ["segunda", "terça"];
const agendaCompleta = ["domingo", ...diasUteis, "quarta"];

agendaCompleta[1] = "SEGUNDA";

console.log(diasUteis); // ["segunda", "terça"]
console.log(agendaCompleta); // ["domingo", "SEGUNDA", "terça", "quarta"]
console.log(diasUteis === agendaCompleta); // false
```

Para strings, alterar um elemento da nova lista não altera o elemento da lista original.

## Casos de limite

```typescript
const vazio: number[] = [];

console.log(vazio.map((numero) => numero * 2)); // []
console.log(vazio.filter((numero) => numero > 0)); // []
console.log(vazio.find((numero) => numero > 0)); // undefined
console.log(vazio.findIndex((numero) => numero > 0)); // -1
console.log(vazio.some((numero) => numero > 0)); // false
console.log(vazio.every((numero) => numero > 0)); // true
console.log(vazio.reduce((total, numero) => total + numero, 0)); // 0
```

O retorno de `every` merece atenção. Se sua regra de negócio exige uma lista não vazia:

```typescript
const todosPositivos = vazio.length > 0 && vazio.every((numero) => numero > 0);
console.log(todosPositivos); // false
```

## Desafio rápido

Crie `exercicios/desafio-rapido.ts` com:

```typescript
const tempos: number[] = [42, 35, 51, 28, 39];
```

Sem loops explícitos:

1. crie `temposValidos` com valores menores ou iguais a `45`;
2. crie `temposEmMilissegundos` transformando os válidos com `valor * 1000`;
3. encontre o primeiro tempo menor que `30`;
4. verifique se todos os tempos originais são positivos;
5. some os tempos válidos com `reduce` e valor inicial `0`;
6. exiba todos os resultados e confirme que `tempos` não mudou.

Resultado conceitual:

```text
Válidos: 42,35,28,39
Em milissegundos: 42000,35000,28000,39000
Primeiro abaixo de 30: 28
Todos positivos: true
Total válido: 144
Original: 42,35,51,28,39
```

## Perguntas de conferência

1. Por que `map` e `filter` não são intercambiáveis?
2. Qual ausência é indicada por `find`? E por `findIndex`?
3. Por que o valor inicial de `reduce` torna o array vazio previsível?
4. Qual é o valor intermediário antes do `map` no Exemplo 7?
5. Por que `forEach` não deve ser usado para criar `temposEmMilissegundos`?
