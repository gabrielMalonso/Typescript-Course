# Arrays + Loops

## Objetivos

Ao concluir esta extensão, você será capaz de:

- percorrer todos os elementos de um array com `for`;
- relacionar o contador do loop com o índice do array;
- usar `for...of` quando precisar apenas dos valores;
- combinar arrays, condicionais, acumuladores, `continue` e `break`;
- percorrer arrays bidimensionais com loops aninhados;
- escolher a forma de repetição mais simples para cada problema.

## A conexão entre os dois capítulos

Um array organiza vários valores por índice. Um loop permite repetir uma operação para cada um desses índices.

```text
array      ["planejar", "executar", "revisar"]
índice          0           1           2
                ▲           ▲           ▲
for             0  ───────► 1  ───────► 2  ───────► termina
```

O array informa quantos elementos existem por meio de `length`. O loop usa essa quantidade como limite.

## Percorrendo índices com `for`

Use o `for` tradicional quando o índice fizer parte do problema:

```typescript
const etapas: string[] = ["planejar", "executar", "revisar"];

for (let indice = 0; indice < etapas.length; indice++) {
  console.log(`Índice ${indice}: ${etapas[indice]}`);
}
```

```text
Índice 0: planejar
Índice 1: executar
Índice 2: revisar
```

Cada parte do cabeçalho possui uma responsabilidade:

| Parte | Papel |
|---|---|
| `let indice = 0` | começa no primeiro índice válido |
| `indice < etapas.length` | continua apenas enquanto o índice existir |
| `indice++` | avança para o próximo índice |
| `etapas[indice]` | lê o elemento da posição atual |

### Por que usar `<` e não `<=`?

Em um array com três elementos, `length` vale `3`, mas os índices válidos são `0`, `1` e `2`.

```typescript
const cores: string[] = ["azul", "verde", "amarelo"];

for (let indice = 0; indice < cores.length; indice++) {
  console.log(cores[indice]);
}
```

Se a condição fosse `indice <= cores.length`, o loop tentaria acessar `cores[3]`, que resulta em `undefined`.

### Array vazio

O mesmo cabeçalho também funciona com um array vazio:

```typescript
const avisos: string[] = [];

for (let indice = 0; indice < avisos.length; indice++) {
  console.log(avisos[indice]);
}
```

Como `0 < 0` é falso, o corpo não executa nenhuma vez. Não é necessário criar uma condição separada apenas para proteger o acesso feito pelo loop.

## Índice e posição humana

O índice começa em `0`, mas normalmente contamos itens a partir de `1`. Quando precisar mostrar uma posição humana, use `indice + 1` sem alterar o acesso ao array:

```typescript
const tarefas: string[] = ["ler", "praticar", "revisar"];

for (let indice = 0; indice < tarefas.length; indice++) {
  console.log(`Tarefa ${indice + 1}: ${tarefas[indice]}`);
}
```

O elemento continua sendo acessado com `tarefas[indice]`. Somente o rótulo apresentado ao usuário recebe `+ 1`.

## Percorrendo valores com `for...of`

Quando você não precisa do índice, pode ler diretamente cada valor:

```typescript
const linguagens: string[] = ["TypeScript", "Swift", "Python"];

for (const linguagem of linguagens) {
  console.log(linguagem);
}
```

Em cada iteração, `linguagem` recebe o próximo elemento do array.

```text
1ª iteração → linguagem = "TypeScript"
2ª iteração → linguagem = "Swift"
3ª iteração → linguagem = "Python"
```

`const` é apropriado porque a variável `linguagem` recebe um valor novo a cada iteração; ela não é reatribuída dentro da mesma iteração.

### `for` ou `for...of`?

| Necessidade | Escolha mais direta |
|---|---|
| Usar ou exibir o índice | `for` tradicional |
| Comparar posições vizinhas | `for` tradicional |
| Alterar uma posição específica | `for` tradicional |
| Apenas ler cada valor | `for...of` |
| Somar ou contar valores | Ambos funcionam; `for...of` costuma ser mais simples |

Não use `for...in` nesta etapa. Ele percorre nomes de propriedades, não foi criado como a forma principal de ler os valores de arrays e acrescentaria uma distinção desnecessária agora.

## Acumuladores e contadores

Um loop pode produzir um resultado a partir de todos os elementos:

```typescript
const duracoes: number[] = [25, 40, 15];
let duracaoTotal = 0;
let sessoesLongas = 0;

for (const duracao of duracoes) {
  duracaoTotal += duracao;

  if (duracao >= 30) {
    sessoesLongas++;
  }
}

console.log(`Total: ${duracaoTotal}`);
console.log(`Sessões longas: ${sessoesLongas}`);
```

O acumulador começa com o valor neutro da operação — `0` para uma soma — e é atualizado em cada iteração. O resultado deve ser exibido depois do loop, quando todos os elementos já foram processados.

## `continue` e `break` durante o percurso

As regras aprendidas no Capítulo 04 continuam iguais:

- `continue` ignora o restante da iteração atual e avança para o próximo elemento;
- `break` encerra o loop inteiro.

```typescript
const medicoes: number[] = [12, -1, 18, 0, 25];
let total = 0;

for (const medicao of medicoes) {
  if (medicao === -1) {
    continue;
  }

  if (medicao === 0) {
    break;
  }

  total += medicao;
}

console.log(total); // 30
```

O valor `-1` é ignorado. O valor `0` encerra o percurso, portanto `25` nunca é somado.

## Arrays bidimensionais e loops aninhados

Em um `string[][]`, o primeiro índice escolhe o array interno e o segundo escolhe um elemento dentro dele:

```typescript
const setores: string[][] = [
  ["A1", "A2"],
  ["B1", "B2", "B3"],
];
```

Para visitar todos os lugares, cada dimensão precisa de seu próprio loop:

```typescript
for (let linha = 0; linha < setores.length; linha++) {
  for (let coluna = 0; coluna < setores[linha].length; coluna++) {
    console.log(`Linha ${linha}, coluna ${coluna}: ${setores[linha][coluna]}`);
  }
}
```

O limite do loop interno é `setores[linha].length`, e não `setores[0].length`. Assim, cada linha pode ter uma quantidade diferente de elementos.

```text
loop externo: escolhe a linha
    └── loop interno: percorre as colunas daquela linha
```

## Evite alterar o tamanho enquanto percorre

Adicionar ou remover elementos do mesmo array durante o percurso muda `length` e desloca índices. Isso pode fazer o loop pular elementos ou executar mais vezes que o esperado.

```typescript
const fila: string[] = ["A", "B", "C"];

// Evite nesta etapa:
for (let indice = 0; indice < fila.length; indice++) {
  fila.shift();
}
```

Por enquanto, percorra o array para ler, contar, somar ou localizar valores. Quando o problema exigir mudanças, faça-as antes ou depois do percurso, salvo se o enunciado explicar cuidadosamente a regra.

## O que continua reservado ao Capítulo 06

Ainda não use `forEach`, `map`, `filter`, `find`, `some`, `every` ou `reduce`. Eles oferecem outras formas de percorrer e transformar arrays, mas ficam mais fáceis de entender depois que a relação entre índice, valor, condição e acumulador está sólida.

## Resumo de decisão

```text
Preciso do índice?
├── sim → for tradicional
└── não → for...of

O array contém outros arrays?
├── sim → um loop para cada dimensão
└── não → um único loop normalmente basta
```

Antes de executar, confirme:

- o índice começa em `0`;
- a condição usa `< array.length`;
- o acesso usa o índice atual;
- acumuladores foram inicializados antes do loop;
- `continue` e `break` estão posicionados antes das ações que devem impedir;
- loops aninhados usam o tamanho da linha atual.

## Próximo passo

Faça `exercicios/lista-arrays-e-loops.md`. Depois dessa prática, você estará preparado para a versão atualizada da prova do Capítulo 05.
