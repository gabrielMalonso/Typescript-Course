# Do array ao par com significado

## Uma lista não descreve uma coordenada

Até aqui, `number[]` serviu para representar uma sequência de números. O tamanho podia variar: nenhum elemento, um, dois ou muitos. Isso funciona para uma lista de notas. Para um ponto no plano, porém, queremos duas posições: a primeira representa `x`, a segunda representa `y`.

```ts
const lista: number[] = [3, 4];
lista.push(5); // Continua sendo uma lista válida de números.

const ponto: [number, number] = [3, 4];
console.log(ponto[0]); // 3: coordenada x
console.log(ponto[1]); // 4: coordenada y
console.log(ponto.length); // 2

// Descomente uma linha por vez para observar o erro de tipo:
// const incompleto: [number, number] = [3];
// const excedente: [number, number] = [3, 4, 5];
// console.log(ponto[2]);
```

`[number, number]` é um **tipo de tuple**, também chamado de tupla. Nesta forma, ele descreve duas posições obrigatórias. Não confunda o tipo, depois de `:`, com o valor, depois de `=`:

```text
const ponto: [number, number] = [3, 4];
             └── contrato ──┘   └ valor ┘

posição       0          1
significado   x          y
tipo          number     number
```

O contrato permite ao compilador conferir quantidade e tipos quando construímos o valor. Ainda há um limite: `[4, 3]` também atende a `[number, number]`. Quando os tipos são iguais, o compilador não descobre se você trocou os significados. A ordem precisa ser conhecida por quem produz e por quem usa o par.

## Posições podem ter tipos diferentes

Um par de nome e quantidade precisa de um texto seguido de um número:

```ts
const produto: [string, number] = ["caderno", 3];

console.log(produto[0].toUpperCase()); // CADERNO
console.log(produto[1] + 1); // 4

// const invertido: [string, number] = [3, "caderno"];
// produto[1] = "três";
```

Ao acessar `produto[0]`, o editor sabe que o resultado é `string`; em `produto[1]`, sabe que é `number`. Não precisamos conferir qual dos dois tipos chegou àquela posição.

Também podemos incluir **rótulos** no tipo:

```ts
const item: [nome: string, quantidade: number] = ["caderno", 3];
const coordenada: [x: number, y: number] = [3, 4];

console.log(item[0], coordenada[1]); // caderno 4

// console.log(item.nome); // O rótulo não cria uma propriedade.
```

`nome`, `quantidade`, `x` e `y` ajudam a documentar o contrato e aparecem no editor. O acesso continua sendo por posição. Rótulos não impedem a troca entre duas posições do mesmo tipo.

## Destructuring dá nomes aos valores

No capítulo 07, você extraiu propriedades de objetos com chaves. Em arrays e tuples, os colchetes extraem valores pela ordem:

```ts
const ponto: [x: number, y: number] = [3, 4];
const [horizontal, vertical] = ponto;

console.log(horizontal); // 3
console.log(vertical); // 4
```

Os nomes das variáveis são sua escolha; não precisam coincidir com os rótulos. Aqui, `horizontal` recebe a posição `0`, e `vertical`, a posição `1`. Ambos são inferidos como `number`.

Destructuring é sintaxe JavaScript e também funciona com arrays comuns. O tipo de tuple acrescenta informação sobre as posições; a extração em si não valida nem transforma os valores.

## Uma função pode retornar um par

Você já sabe que `return` entrega um valor. Se duas informações pertencem ao mesmo resultado, esse valor pode ser uma tuple.

Considere repartir uma quantidade inteira de itens em grupos completos. Precisamos informar quantos grupos foram formados e quantos itens sobraram:

```ts
// Contrato: total inteiro não negativo; tamanho inteiro positivo.
// Use inteiros pequenos para este exemplo.
function separarEmGrupos(
  total: number,
  tamanho: number,
): [grupos: number, sobra: number] {
  const grupos = Math.floor(total / tamanho);
  const sobra = total % tamanho;
  return [grupos, sobra];
}

const [grupos, sobra] = separarEmGrupos(17, 5);
console.log(grupos, sobra); // 3 2
console.log(separarEmGrupos(0, 5)); // [0, 0]
console.log(separarEmGrupos(20, 5)); // [4, 0]
```

`Math.floor` arredonda para baixo. O retorno declarado exige um par de números em todos os caminhos que retornam um valor. Ele não verifica que `tamanho` seja positivo: essa restrição continua fazendo parte do contrato de entrada.

Confira o tipo que aparece no editor ao retirar a anotação do retorno. Neste exemplo, TypeScript passa a inferir `number[]`: viu um array de números, mas não recebeu a intenção de preservar duas posições. Recoloque a anotação para expressar o formato público da função. Não é necessário forçar o tipo com um cast.

## Pares em uma coleção conhecida

O `Map` do capítulo 11 organiza chaves e valores. Seu método `entries()` permite percorrer pares `[chave, valor]`. Com destructuring, podemos dar nomes aos dois elementos em cada passagem:

```ts
const frequencias = new Map<string, number>();
frequencias.set("ana", 3);
frequencias.set("bia", 1);

for (const [nome, quantidade] of frequencias.entries()) {
  console.log(`${nome}: ${quantidade}`);
}
// ana: 3
// bia: 1
```

Nesse `Map<string, number>`, cada par é tipado como `[string, number]`. `nome` e `quantidade` são inferidos a partir dele. `entries()` fornece os pares para o percurso; não é preciso montar antecipadamente um array com todas as entradas. Por enquanto, basta usar o resultado com `for...of`.

Tuples não mudam o custo do problema. Percorrer `k` entradas ainda exige visitar `k` pares. Produzir um par de tamanho fixo, como em `separarEmGrupos`, usa espaço constante; produzir uma lista com `k` pares usa espaço proporcional a `k`. A modelagem melhora o contrato, sem eliminar o trabalho da execução.

## O valor ainda é um array

Uma tuple não cria uma nova estrutura em JavaScript. O tipo desaparece na compilação, e o valor continua sendo um array. Isso traz uma limitação das tuples **mutáveis**:

```ts
const ponto: [number, number] = [3, 4];
ponto[0] = 8; // Permitido: a posição continua recebendo um número.
ponto.push(5); // Também é aceito pelo compilador.

console.log(ponto); // [8, 4, 5]
console.log(ponto.length); // 3 em execução
```

Métodos herdados de array, como `push` e `pop`, podem quebrar o tamanho descrito pelo tipo. O compilador não atualiza o contrato da tuple após essas chamadas. Portanto, não use esses métodos para manter um par com formato fixo. Na próxima aula, `readonly` vai restringir a escrita por essa referência.

Faça a [atividade 1 — Uma busca, duas informações](../03-pratica/atividades.md#atividade-1). Depois, siga para [opcionais, readonly e escolha do formato](02-opcionais-readonly-e-modelagem.md).

[Voltar ao guia — etapa 2](../README.md#etapa-2)
