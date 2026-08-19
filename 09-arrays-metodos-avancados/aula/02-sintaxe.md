# Métodos Avançados de Array — Sintaxe

## Arrow function curta

Quando a regra possui uma única expressão, o resultado é retornado implicitamente:

```typescript
const quadrados = [2, 3, 4].map((numero) => numero * numero);
```

Com chaves, escreva `return` explicitamente:

```typescript
const quadrados = [2, 3, 4].map((numero) => {
  const quadrado = numero * numero;
  return quadrado;
});
```

Este formato é incorreto para `map`, pois não devolve o novo valor:

```typescript
const quadrados = [2, 3, 4].map((numero) => {
  numero * numero;
});
// tipo inferido: void[]
```

## Parâmetros disponíveis

Os métodos podem fornecer o valor, o índice e o próprio array:

```typescript
const rotulos = ["A", "B", "C"].map(
  (valor, indice, array) => `${indice + 1}/${array.length}: ${valor}`,
);
```

Use apenas os parâmetros necessários. Na maioria dos casos, o valor atual basta.

## `forEach`: executar uma ação

```typescript
array.forEach((valor, indice) => {
  // ação
});
```

Exemplo:

```typescript
const etapas: string[] = ["planejar", "executar"];

etapas.forEach((etapa, indice) => {
  console.log(`${indice + 1}. ${etapa}`);
});
```

`forEach` retorna `void`. Ele não cria um array com os valores retornados pela callback.

## `map`: transformar todos os elementos

```typescript
const novoArray = array.map((valor) => transformacao);
```

```typescript
const precos: number[] = [10, 25];
const precosEmCentavos = precos.map((preco) => preco * 100);
// [1000, 2500]
```

O novo array possui a mesma quantidade de elementos. O tipo pode mudar:

```typescript
const pares = [1, 2, 3].map((numero) => numero % 2 === 0);
// boolean[]
```

## `filter`: selecionar zero ou mais elementos

```typescript
const selecionados = array.filter((valor) => condicaoBooleana);
```

```typescript
const idades: number[] = [15, 21, 17, 30];
const maiores = idades.filter((idade) => idade >= 18);
// [21, 30]
```

A callback responde `true` para manter o elemento e `false` para descartá-lo.

## `find`: buscar o primeiro valor

```typescript
const encontrado = array.find((valor) => condicaoBooleana);
```

```typescript
const notas: number[] = [5, 8, 9];
const primeiraAprovada = notas.find((nota) => nota >= 7);
// 8; tipo number | undefined
```

Se nada for encontrado, o retorno é `undefined`. Verifique antes de usar operações específicas do tipo:

```typescript
if (primeiraAprovada !== undefined) {
  console.log(primeiraAprovada.toFixed(1));
}
```

## `findIndex`: buscar o primeiro índice

```typescript
const indice = array.findIndex((valor) => condicaoBooleana);
```

```typescript
const nomes: string[] = ["Lia", "Caio", "Bia"];
const indice = nomes.findIndex((nome) => nome === "Caio");
// 1
```

Se nada for encontrado, o retorno é `-1`:

```typescript
if (indice !== -1) {
  console.log(`Encontrado na posição ${indice + 1}`);
}
```

## `some`: pelo menos um?

```typescript
const existe = array.some((valor) => condicaoBooleana);
```

```typescript
const estoque: number[] = [3, 0, 8];
const existeEsgotado = estoque.some((quantidade) => quantidade === 0);
// true
```

## `every`: todos?

```typescript
const todosPassam = array.every((valor) => condicaoBooleana);
```

```typescript
const leituras: number[] = [12, 15, 18];
const todasPositivas = leituras.every((leitura) => leitura > 0);
// true
```

Em um array vazio, `some` retorna `false` e `every` retorna `true`. Não existe item que satisfaça `some`, e também não existe contraexemplo que torne `every` falso. Se o domínio exige ao menos um item, combine com `array.length > 0`.

## `reduce`: acumular em um resultado

Forma geral:

```typescript
const resultado = array.reduce(
  (acumulador, valorAtual) => novoAcumulador,
  valorInicial,
);
```

Soma:

```typescript
const valores: number[] = [4, 6, 10];

const total = valores.reduce(
  (acumulador, valorAtual) => acumulador + valorAtual,
  0,
);
// 20
```

Rastreamento:

| chamada | acumulador recebido | valor atual | acumulador devolvido |
|---:|---:|---:|---:|
| 1 | 0 | 4 | 4 |
| 2 | 4 | 6 | 10 |
| 3 | 10 | 10 | 20 |

Use um valor inicial explícito. Assim, um array vazio ainda produz um resultado previsível:

```typescript
const vazio: number[] = [];
const total = vazio.reduce((acumulador, valor) => acumulador + valor, 0);
// 0
```

O acumulador pode ter outro tipo:

```typescript
const palavras: string[] = ["Type", "Script"];
const texto = palavras.reduce(
  (acumulador, palavra) => acumulador + palavra,
  "",
);
// "TypeScript"
```

## Encadeamento

```typescript
const resultado = [2, 5, 8, 11]
  .filter((numero) => numero >= 5)
  .map((numero) => numero * 10);
// [50, 80, 110]
```

Para depurar, separe temporariamente as etapas:

```typescript
const filtrados = [2, 5, 8, 11].filter((numero) => numero >= 5);
const resultado = filtrados.map((numero) => numero * 10);
```

## Spread operator com arrays

### Copiar

```typescript
const original: number[] = [10, 20];
const copia: number[] = [...original];
```

### Acrescentar sem alterar o original

```typescript
const base: string[] = ["A", "B"];
const expandido = ["início", ...base, "fim"];
// ["início", "A", "B", "fim"]
```

### Unir arrays compatíveis

```typescript
const primeiraParte: number[] = [1, 2];
const segundaParte: number[] = [3, 4];
const completo = [...primeiraParte, ...segundaParte];
```

O spread cria um novo array, mas a cópia é superficial. Com números, strings e booleans, isso basta para os exemplos atuais. Objetos e cópias aninhadas serão estudados adiante.

## Tabela de escolha rápida

| Método | Callback deve devolver | Resultado |
|---|---|---|
| `forEach` | nada obrigatório | `void` |
| `map` | valor transformado | novo array |
| `filter` | condição | novo array filtrado |
| `find` | condição | primeiro valor ou `undefined` |
| `findIndex` | condição | primeiro índice ou `-1` |
| `some` | condição | `boolean` |
| `every` | condição | `boolean` |
| `reduce` | próximo acumulador | acumulador final |
