# Dar nomes aos contratos

## Um formato conhecido, escrito várias vezes

Você já sabe representar uma coordenada e recebê-la em uma função. Se várias funções trabalham com o mesmo formato, repetir `readonly [x: number, y: number]` em cada assinatura exige manter todas essas declarações de acordo.

Um **type alias** dá nome a um tipo:

```ts
type Ponto = readonly [x: number, y: number];

function somarCoordenadas(ponto: Ponto): number {
  const [x, y] = ponto;
  return x + y;
}

function deslocar(ponto: Ponto, dx: number, dy: number): Ponto {
  const [x, y] = ponto;
  return [x + dx, y + dy];
}

const origem: Ponto = [3, 4];
console.log(somarCoordenadas(origem)); // 7
console.log(deslocar(origem, 1, -2)); // [4, 2]
console.log(origem); // [3, 4]
```

Leia `type Ponto = ...` como “neste código, Ponto é o nome deste contrato”. A variável continua recebendo um array; o nome não cria um valor nem chama uma função. As restrições de `readonly` do capítulo 16 continuam as mesmas.

## Objetos também podem ter nomes

No capítulo 07, você escreveu os campos diretamente na anotação. Podemos nomear esse formato e reutilizá-lo em uma lista, em um parâmetro e em um retorno:

```ts
type Produto = {
  nome: string;
  preco: number;
  observacao?: string;
};

function comDesconto(produto: Produto): Produto {
  return { ...produto, preco: produto.preco * 0.9 };
}

const produtos: Produto[] = [
  { nome: "caderno", preco: 20 },
  { nome: "caneta", preco: 5, observacao: "azul" },
];

console.log(produtos.map(comDesconto));
// [{ nome: "caderno", preco: 18 },
//  { nome: "caneta", preco: 4.5, observacao: "azul" }]
console.log(produtos[0].preco); // 20: a função criou outro objeto.
```

`Produto[]` é um array de valores que atendem a `Produto`. O alias concentra o formato; o spread e a criação do objeto são operações JavaScript. O alias não faz uma cópia, não valida preços e não torna as propriedades imutáveis.

Para esses objetos pequenos, criar cada cópia custa O(1). O `map` ainda percorre os `n` produtos e cria um array de `n` resultados: tempo O(n) e espaço do resultado O(n).

## Um nome não cria uma restrição sozinho

Dar nome a `number` pode documentar a intenção, mas não cria uma unidade nem exige um número positivo:

```ts
type Metros = number;
type Segundos = number;

const duracao: Segundos = 8;
const distancia: Metros = duracao; // Aceito: ambos são number.
const outraDistancia: Metros = -3; // Também aceito.

console.log(distancia, outraDistancia); // 8 -3
```

O nome deve ajudar a ler o código, mas as restrições vêm do tipo descrito à direita de `=`. Alias não executa validação. Para `Produto`, por exemplo, o contrato exige que `preco` seja um número; decidir se esse número pode ser negativo é outra regra.

## Quando `string` permite coisas demais

Imagine uma função que recebe a direção de uma ordenação. Com `direcao: string`, o editor aceita `"crescnte"`, embora essa grafia não faça parte do domínio. Podemos descrever valores específicos:

```ts
type Direcao = "crescente" | "decrescente";

function comparar(a: number, b: number, direcao: Direcao): number {
  if (direcao === "crescente") {
    return a - b;
  }
  return b - a;
}

console.log(comparar(2, 5, "crescente")); // -3
console.log(comparar(2, 5, "decrescente")); // 3
// comparar(2, 5, "crescnte"); // Erro: valor fora das alternativas.
```

`"crescente"` em uma posição de tipo é um **literal type**: aceita exatamente esse texto. `|` reúne as alternativas permitidas. No parâmetro da função, o valor será uma delas. Os números deste exemplo são inteiros pequenos; a função só compara, não ordena uma lista.

Literais também podem ser números ou booleanos:

```ts
type Dimensoes = 2 | 3;
type Confirmado = true;

const dimensoes: Dimensoes = 3;
const confirmado: Confirmado = true;
console.log(dimensoes, confirmado); // 3 true

// const invalido: Dimensoes = 4;
// const pendente: Confirmado = false;
```

Um literal isolado costuma ganhar utilidade como parte de um contrato maior. Na aula 3, um campo literal vai identificar qual formato de objeto chegou.

## Inferência: `const` no objeto não fixa cada campo

Observe os tipos no editor:

```ts
type Direcao = "crescente" | "decrescente";

const fixa = "crescente"; // Tipo inferido: "crescente".
let editavel = "crescente"; // Tipo inferido: string.
editavel = "outro texto";

const livre = { direcao: "crescente" }; // Campo inferido: string.
livre.direcao = "outro texto"; // const não impede alterar a propriedade.

const configuracao: { direcao: Direcao } = { direcao: "crescente" };
configuracao.direcao = "decrescente";
// configuracao.direcao = "outro texto";

console.log(fixa, editavel, livre.direcao, configuracao.direcao);
// crescente outro texto outro texto decrescente
```

Ao anotar o objeto, comunicamos quais valores o campo deve aceitar. Não precisamos de um cast para corrigir a inferência: precisamos declarar o contrato na construção do valor.

Siga para a [aula 2 — Uma alternativa precisa de uma verificação](02-unions-e-narrowing.md).

[Voltar ao guia — etapa 1](../README.md#etapa-1)
