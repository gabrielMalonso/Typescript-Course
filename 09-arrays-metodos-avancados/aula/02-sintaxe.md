# Métodos Avançados de Array — Sintaxe

## 1. Formas da callback

Arrow concisa devolve a expressão implicitamente:

```typescript
const quadrados = [2, 3, 4].map((numero) => numero * numero);
```

Com bloco, use `return`:

```typescript
const quadrados = [2, 3, 4].map((numero) => {
  const quadrado = numero * numero;
  return quadrado;
});
```

Sem `return`, o resultado será `void[]`:

```typescript
const incorreto = [2, 3, 4].map((numero) => {
  numero * numero;
});
```

Para devolver um objeto diretamente, envolva-o em parênteses:

```typescript
const produtos = [{ nome: "Broca", preco: 20 }];
const copias = produtos.map((produto) => ({ ...produto }));
```

## 2. Parâmetros disponíveis

Os métodos fornecem valor, índice e o próprio array:

```typescript
const rotulos = ["A", "B", "C"].map(
  (valor, indice, array) => `${indice + 1}/${array.length}: ${valor}`,
);
```

Use apenas os parâmetros necessários. Nomeie a coleção no plural e o elemento no singular.
Na maioria dos métodos de array, a callback pode receber três parâmetros:

```typescript
(valorAtual, indice, array)
```

* **`valorAtual`** → elemento que está sendo processado naquele momento.
* **`indice`** → posição desse elemento no array.
* **`array`** → referência ao array completo que está sendo percorrido.

Exemplo:

```typescript
produtos.map((produto, indice, array) => {
  // produto → produto atual
  // indice  → posição atual
  // array   → produtos completo
});
```

Não é necessário declarar todos. Se precisamos apenas do elemento atual:

```typescript
produtos.map((produto) => produto.nome);
```

O `map` continua disponibilizando índice e array, mas a callback simplesmente não os utiliza.

A ordem dos parâmetros importa. Para usar o índice sem usar o primeiro parâmetro:

```typescript
produtos.map((_produto, indice) => indice);
```

Esse padrão `(valor, indice, array)` também aparece em `forEach`, `filter`, `find`, `findIndex`, `some` e `every`.

A principal exceção é o `reduce`, que possui o **acumulador** antes deles:

```typescript
(acumulador, valorAtual, indice, array)
```

Resumo:

```text
map, filter, forEach, find, findIndex, some, every
→ (valor, índice, array)

reduce
→ (acumulador, valor, índice, array)
```


## 3. Callback inline, nomeada e criada por closure

Inline:

```typescript
const positivos = [3, -1, 5].filter((numero) => numero > 0);
```

Nomeada e passada por referência:

```typescript
function positivo(numero: number): boolean {
  return numero > 0;
}

const positivos = [3, -1, 5].filter(positivo);
```

Produzida por closure:

```typescript
function criarMinimo(minimo: number): (numero: number) => boolean {
  return (numero): boolean => numero >= minimo;
}

const peloMenosDez = criarMinimo(10);
const aprovados = [7, 10, 14].filter(peloMenosDez);
```

Nos três casos, `filter` recebe uma função compatível com `(numero: number) => boolean`.

## 4. Base de objetos dos exemplos

```typescript
const produtos: {
  codigo: string;
  nome: string;
  preco: number;
  ativo: boolean;
}[] = [
  { codigo: "P1", nome: "Broca", preco: 20, ativo: true },
  { codigo: "P2", nome: "Serra", preco: 80, ativo: false },
  { codigo: "P3", nome: "Lixa", preco: 5, ativo: true },
];
```

O TypeScript infere o tipo do parâmetro `produto` em cada callback.

## 5. `forEach`: executar uma ação

```typescript
produtos.forEach((produto, indice) => {
  console.log(`${indice + 1}. ${produto.nome}`);
});
```

`forEach` retorna `void` e visita todos os elementos. Um `return` dentro da callback não interrompe o restante do array.

## 6. `map`: transformar todos os elementos

Objeto para string:

```typescript
const etiquetas: string[] = produtos.map(
  (produto) => `${produto.codigo} — ${produto.nome}`,
);
```

Objeto para novo objeto:

```typescript
const reajustados = produtos.map((produto) => ({
  ...produto,
  preco: produto.preco * 1.1,
}));
```

O resultado tem a mesma quantidade da entrada. O tipo pode permanecer igual ou mudar.

## 7. `filter`: selecionar zero ou mais elementos

```typescript
const ativos = produtos.filter((produto) => produto.ativo);
```

A callback devolve `true` para manter o objeto e `false` para descartá-lo. O array resultante é novo, mas os objetos mantidos continuam sendo as mesmas referências.

## 8. `find`: buscar o primeiro elemento

```typescript
const encontrado = produtos.find((produto) => produto.codigo === "P2");
// objeto | undefined
```

Antes de acessar uma propriedade, trate a ausência:

```typescript
if (encontrado !== undefined) {
  console.log(encontrado.nome);
} else {
  console.log("Produto não encontrado");
}
```

`find` para no primeiro `true`.

## 9. `findIndex`: buscar a primeira posição

```typescript
const indice = produtos.findIndex((produto) => produto.codigo === "P2");

if (indice !== -1) {
  console.log(`Posição humana: ${indice + 1}`);
}
```

Ausência de posição é `-1`, não `undefined`.

## 10. `some`: pelo menos um?

```typescript
const existeCaro = produtos.some((produto) => produto.preco > 50);
// true
```

`some` para na primeira callback que devolve `true`. Em array vazio, retorna `false`.

## 11. `every`: todos?

```typescript
const todosComPrecoValido = produtos.every((produto) => produto.preco >= 0);
// true
```

`every` para na primeira callback que devolve `false`. Em array vazio, retorna `true`. Quando o domínio exige itens:

```typescript
const listaValida = produtos.length > 0 && produtos.every(
  (produto) => produto.preco >= 0,
);
```

## 12. `reduce`: acumular em um resultado

Forma geral:

```typescript
const resultado = array.reduce(
  (acumulador, elementoAtual) => proximoAcumulador,
  valorInicial,
);
```

Soma de números:

```typescript
const total = [4, 6, 10].reduce(
  (acumulador, numero) => acumulador + numero,
  0,
);
```

Soma de propriedades:

```typescript
const totalDosAtivos = produtos.reduce(
  (total, produto) => produto.ativo ? total + produto.preco : total,
  0,
);
```

Rastreamento para `[4, 6, 10]`:

| chamada | acumulador recebido | número | devolvido |
|---:|---:|---:|---:|
| 1 | 0 | 4 | 4 |
| 2 | 4 | 6 | 10 |
| 3 | 10 | 10 | 20 |

O valor inicial torna o tipo do acumulador e o caso vazio previsíveis.

## 13. Encadeamento

```typescript
const nomesAtivos = produtos
  .filter((produto) => produto.ativo)
  .map((produto) => produto.nome);
```

O intermediário é um array de objetos ativos. O resultado final é `string[]`.

Para depurar, separe:

```typescript
const produtosAtivos = produtos.filter((produto) => produto.ativo);
const nomesAtivos = produtosAtivos.map((produto) => produto.nome);
```

## 14. Spread e referências internas

Cópia apenas do array:

```typescript
const copiaDoArray = [...produtos];

console.log(copiaDoArray === produtos); // false
console.log(copiaDoArray[0] === produtos[0]); // true
```

Cópia de cada objeto:

```typescript
const copiaDosObjetos = produtos.map((produto) => ({ ...produto }));

console.log(copiaDosObjetos[0] === produtos[0]); // false
```

Ambas são cópias superficiais. Uma propriedade que também seja objeto continuaria compartilhada até ser copiada separadamente.

## 15. Tabela de escolha rápida

| Método | Callback devolve | Resultado | Pode parar cedo? |
|---|---|---|---|
| `forEach` | efeito; retorno ignorado | `void` | não |
| `map` | valor transformado | novo array com `N` resultados | não |
| `filter` | `boolean` | novo array com `0..N` itens | não |
| `find` | `boolean` | item ou `undefined` | sim |
| `findIndex` | `boolean` | índice ou `-1` | sim |
| `some` | `boolean` | `boolean` | sim |
| `every` | `boolean` | `boolean` | sim |
| `reduce` | próximo acumulador | acumulador final | não |
