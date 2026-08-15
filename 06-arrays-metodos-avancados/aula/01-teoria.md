# Métodos Avançados de Array — Teoria

## Objetivos de aprendizagem

Ao final desta aula, você será capaz de:

- explicar por que existem diferentes métodos de percurso;
- ler uma callback curta sem precisar dominar funções por completo;
- prever a forma do retorno de cada família de métodos;
- distinguir métodos que criam arrays de métodos que devolvem um valor;
- reconhecer quando um loop explícito ainda é a escolha mais clara.

## Do mecanismo para a intenção

No Capítulo 05, você controlou o percurso diretamente:

```typescript
const temperaturas: number[] = [18, 21, 24];
const temperaturasAltas: number[] = [];

for (const temperatura of temperaturas) {
  if (temperatura > 20) {
    temperaturasAltas.push(temperatura);
  }
}
```

Esse código mostra cada passo. Agora podemos expressar a intenção de manter somente os valores que passam por uma regra:

```typescript
const temperaturasAltas = temperaturas.filter(
  (temperatura) => temperatura > 20,
);
```

O loop não deixou de existir: `filter` percorre o array internamente. A diferença é que o nome do método comunica **por que** estamos percorrendo.

## Callback: uma regra entregue ao método

Considere:

```typescript
const dobrados = [2, 4, 6].map((numero) => numero * 2);
```

Leia da esquerda para a direita:

> No array `[2, 4, 6]`, transforme (`map`) cada `numero` no resultado de `numero * 2`.

O trecho abaixo é uma arrow function usada como callback:

```typescript
(numero) => numero * 2
```

Neste capítulo, use este modelo simples:

```text
(valorAtual) => regra
```

O método chama essa regra uma vez para cada elemento necessário. O TypeScript infere o tipo de `valorAtual` a partir do array:

```typescript
const nomes: string[] = ["Ana", "Bia"];
const tamanhos = nomes.map((nome) => nome.length);
//                              nome é string
// tamanhos é number[]
```

## A pergunta determina o método

O erro mais comum não é de sintaxe: é escolher um método cujo retorno não representa a pergunta.

| Pergunta | Método | Retorno típico |
|---|---|---|
| Quero executar uma ação para cada item? | `forEach` | `void` |
| Quero transformar cada item? | `map` | novo array |
| Quero manter itens que passam por uma regra? | `filter` | novo array |
| Quero o primeiro item que passa? | `find` | item ou `undefined` |
| Quero o índice do primeiro item que passa? | `findIndex` | índice ou `-1` |
| Quero saber se existe pelo menos um? | `some` | `boolean` |
| Quero saber se todos passam? | `every` | `boolean` |
| Quero combinar tudo em um resultado? | `reduce` | acumulador final |

## Quantidade de elementos no resultado

O tamanho do retorno ajuda a prever o comportamento:

```text
entrada com N elementos

forEach   → nenhum array retornado
map       → novo array com N elementos
filter    → novo array com 0 até N elementos
find      → um elemento ou undefined
findIndex → um índice ou -1
some      → um boolean
every     → um boolean
reduce    → um resultado acumulado
```

`map` preserva a quantidade, mas pode mudar o tipo:

```typescript
const nomes: string[] = ["Sol", "Marina"];
const quantidades: number[] = nomes.map((nome) => nome.length);
```

`filter` preserva o tipo dos elementos, mas pode mudar a quantidade:

```typescript
const notas: number[] = [4, 7, 9];
const aprovadas: number[] = notas.filter((nota) => nota >= 7);
```

## Retornar não é exibir

Uma callback precisa produzir o resultado esperado pelo método. `console.log` apenas exibe e retorna `undefined`.

```typescript
const numeros: number[] = [1, 2, 3];

numeros.forEach((numero) => console.log(numero)); // ação: exibir

const dobrados = numeros.map((numero) => numero * 2); // transformação
```

Use `forEach` quando a ação externa é o objetivo. Use `map` quando você precisa do novo array.

## Mutação: o que muda e o que não muda

Os métodos centrais deste capítulo não alteram o array original por si próprios:

```typescript
const original: number[] = [1, 2, 3];
const dobrados = original.map((numero) => numero * 2);

console.log(original); // [1, 2, 3]
console.log(dobrados); // [2, 4, 6]
console.log(original === dobrados); // false
```

`map` e `filter` criam novos arrays. O spread operator também cria um novo array:

```typescript
const copia = [...original];
console.log(original === copia); // false
```

Isso não significa que qualquer código dentro da callback seja incapaz de alterar algo. Uma callback pode conter mutações, mas misturar transformação com efeitos colaterais torna o raciocínio mais difícil. Nos exercícios, mantenha cada método em seu papel principal.

## Encadeamento como linha de produção

Cada método pode entregar seu resultado ao próximo:

```typescript
const resultado = [3, 8, 5, 10]
  .filter((numero) => numero >= 5)
  .map((numero) => numero * 2);
```

```text
[3, 8, 5, 10]
      filter >= 5
         ↓
   [8, 5, 10]
      map × 2
         ↓
  [16, 10, 20]
```

A ordem importa. Transformar antes de filtrar pode produzir outra resposta. Encadeie apenas quando você consegue nomear o tipo e o valor intermediário de cada etapa.

## Quando preferir um loop

Métodos não substituem todos os loops. Um loop explícito continua útil quando:

- você precisa combinar vários efeitos e saídas diferentes;
- a regra depende de `break` ou `continue` de maneira natural;
- o encadeamento esconderia estados importantes;
- a turma ainda está aprendendo o mecanismo que o método abstrai.

Escolher o código mais legível é mais importante que usar o maior número de métodos.

## Resumo

- callback é a regra entregue ao método;
- escolha o método pela pergunta e pelo retorno desejado;
- `map` preserva a quantidade; `filter` pode reduzi-la;
- `find` e `findIndex` representam ausência de formas diferentes;
- `some` e `every` devolvem respostas booleanas;
- `reduce` produz um acumulador final;
- encadeamento é uma sequência de transformações, não uma competição de concisão.
