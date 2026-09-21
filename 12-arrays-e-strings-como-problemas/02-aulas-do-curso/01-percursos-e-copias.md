# Percorrer e transformar arrays

Você já sabe transformar valores com `map` e escolher elementos com `filter`. Antes de escolher um método, precisamos definir o resultado: queremos valores, posições ou alterar a própria entrada?

Considere temperaturas medidas em sequência: `[19, 19, 23, 21]`. Queremos as **posições em que a temperatura subiu em relação à medição anterior**. O resultado é `[2]`. Os dois valores 19 ocupam posições diferentes, e a primeira medição não tem anterior.

## O índice representa uma posição

```text
índice:        0    1    2    3
temperatura:  19   19   23   21
                   ↑    ↑    ↑
comparação:      19>19 23>19 21>23
resultado:       não   sim   não
```

O percurso começa em 1 porque vamos ler `i - 1`. Ele termina antes de `length` porque a última posição válida é `length - 1`.

```ts
function indicesDeSubida(temperaturas: number[]): number[] {
  const indices: number[] = [];

  for (let i = 1; i < temperaturas.length; i++) {
    if (temperaturas[i] > temperaturas[i - 1]) {
      indices.push(i);
    }
  }

  return indices;
}

console.log(indicesDeSubida([19, 19, 23, 21])); // [2]
console.log(indicesDeSubida([]));             // []
console.log(indicesDeSubida([19]));           // []
console.log(indicesDeSubida([23, 23]));       // []
```

Antes de cada comparação, todas as posições anteriores já foram examinadas. O array `indices` contém exatamente as subidas encontradas até então. Essa frase descreve o estado que o loop mantém; ajuda a explicar por que o resultado final está correto.

Para `n` medições, fazemos no máximo `n - 1` comparações: tempo O(n). O resultado pode ter O(n) índices. Descontando o resultado, usamos O(1) de espaço auxiliar. Se alguém incluir a saída na memória adicional, o valor passa a O(n); declare a convenção.

## Limites também fazem parte do contrato

Em um array comum, ler uma posição inexistente retorna `undefined`. Isso pode chegar a uma operação aritmética e produzir `NaN`, sem um erro imediato. A configuração atual do curso não faz o TypeScript avisar sobre todo acesso por índice: compilar não prova que o índice existe.

Use `for...of` quando só precisar dos valores. Use índices quando o problema pedir posições ou relações entre vizinhos. Evite `i <= array.length` se o corpo lê `array[i]`.

Um intervalo frequente é **início incluído, fim excluído**. Em `[início, fim)`, a quantidade de posições é `fim - início`, para limites válidos.

```ts
const valores = [10, 20, 30, 40];
console.log(valores.slice(1, 3)); // [20, 30]
console.log(valores.slice(2, 2)); // []
console.log(valores);            // [10, 20, 30, 40]
```

`slice(1, 3)` cria outro array contendo as posições 1 e 2. É a mesma regra de um loop que começa em 1 e continua enquanto `i < 3`. Copiar `k` elementos custa O(k) de tempo e memória no modelo que adotaremos.

## Outro nome não cria outro array

Um programa pode querer exibir as medições ao contrário, preservando a ordem usada em outros cálculos. Este código não preserva:

```ts
const original = [10, 20, 30];
const exibicao = original;
exibicao.reverse();

console.log(original);             // [30, 20, 10]
console.log(original === exibicao); // true
```

As duas variáveis apontam para o mesmo array. `reverse()` altera esse array. `const` impede atribuir outro valor à variável; não congela o objeto referenciado.

Para separar as ordens, copie primeiro:

```ts
const original = [10, 20, 30];
const exibicao = [...original];
exibicao.reverse();

console.log(original);             // [10, 20, 30]
console.log(exibicao);             // [30, 20, 10]
console.log(original === exibicao); // false
```

O spread percorre a entrada para formar a cópia. Depois, `reverse` percorre essa cópia. São duas etapas lineares: O(n) de tempo total e O(n) para o novo array.

## A cópia é rasa

Com objetos, copiar o array separa as posições, mas os elementos ainda podem apontar para os mesmos objetos:

```ts
const produtos = [{ nome: "Caderno", estoque: 3 }];
const copia = [...produtos];

copia[0].estoque = 0;
console.log(produtos[0].estoque); // 0

copia.push({ nome: "Caneta", estoque: 8 });
console.log(produtos.length); // 1
console.log(copia.length);    // 2
```

Temos dois arrays e um primeiro objeto compartilhado. Alterar o estoque modifica esse objeto; adicionar uma posição modifica apenas `copia`.

Se a tarefa exige atualizar os estoques preservando os registros recebidos, crie também os objetos alterados:

```ts
const produtos = [{ nome: "Caderno", estoque: 3 }];
const atualizados = produtos.map(produto => ({
  ...produto,
  estoque: produto.estoque + 1,
}));

console.log(produtos[0].estoque);   // 3
console.log(atualizados[0].estoque); // 4
```

Esses objetos só contêm campos primitivos. Se tivessem outro objeto dentro, o spread continuaria sendo raso. Copie os níveis que precisam de independência; não é necessário introduzir uma ferramenta de clonagem profunda para todo problema.

## Remover durante um percurso muda as posições

`splice(início, quantidade)` remove posições do próprio array e devolve os elementos removidos. Diferentemente de `slice`, o segundo argumento é uma quantidade.

```ts
const valores = [4, 4, 7];
const removidos = valores.splice(0, 1);
console.log(removidos); // [4]
console.log(valores);   // [4, 7]
```

O segundo 4 passou da posição 1 para a 0. Se um loop incrementar seu índice logo após a remoção, poderá deixar de examiná-lo. Além disso, deslocar o restante do array tem custo.

Quando o contrato permite criar um resultado, `filter` pode expressar melhor a remoção lógica. Se o contrato exige alterar a entrada, precisamos escolher um percurso compatível com os deslocamentos. Vamos experimentar esse erro na prática, antes de discutir correções.

**Continue:** [voltar à etapa 2](../README.md#etapa-2) e fazer o experimento.

## Referências

- [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array): posições, referências e métodos.
- [MDN — slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice): intervalo e cópia rasa.
- [MDN — splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice): remoção e mutação.
