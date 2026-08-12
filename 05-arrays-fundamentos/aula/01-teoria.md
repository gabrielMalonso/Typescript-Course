# Arrays — Teoria

## Objetivos de aprendizagem

Ao final desta aula, você será capaz de:

- descrever um array como uma lista ordenada;
- distinguir posição humana de índice;
- explicar por que um array deve possuir um tipo preciso;
- prever o primeiro e o último índice válido;
- entender inicialmente a diferença entre copiar uma referência e criar outro array;
- reconhecer a forma de um array multidimensional.

## O problema que arrays resolvem

Imagine registrar três temperaturas:

```typescript
const temperaturaManha = 21;
const temperaturaTarde = 28;
const temperaturaNoite = 23;
```

As variáveis funcionam, mas não deixam explícito que os valores formam uma sequência. Um array representa essa relação diretamente:

```typescript
const temperaturas: number[] = [21, 28, 23];
```

Agora existe uma única estrutura chamada `temperaturas`, com três valores ordenados.

Arrays são úteis para dados como:

- etapas de um processo;
- nomes de participantes;
- medições de um experimento;
- itens de uma fila;
- pontuações de partidas.

## Array é uma lista ordenada

**Ordenada** significa que cada elemento ocupa uma posição definida. Não significa que os valores estão automaticamente em ordem alfabética ou numérica.

```typescript
const prioridades: string[] = ["média", "alta", "baixa"];
```

O array preserva exatamente essa sequência: `"média"` vem primeiro, mesmo que outra organização pudesse parecer mais lógica.

```text
ordem armazenada
      ↓
┌─────────┬────────┬─────────┐
│ "média" │ "alta" │ "baixa" │
└─────────┴────────┴─────────┘
```

## Elementos e índices

Cada valor guardado é um **elemento**. Cada elemento é localizado por um número chamado **índice**.

Os índices começam em zero:

```typescript
const etapas: string[] = ["planejar", "executar", "revisar"];
```

```text
posição humana       1ª            2ª           3ª
índice                0             1            2
                 ┌───────────┬───────────┬───────────┐
etapas           │ "planejar" │ "executar" │ "revisar" │
                 └───────────┴───────────┴───────────┘
```

Portanto:

```typescript
console.log(etapas[0]); // planejar
console.log(etapas[1]); // executar
console.log(etapas[2]); // revisar
```

### Por que começar em zero?

Uma forma útil de pensar é que o índice representa o **deslocamento a partir do início**:

- índice `0`: zero passos depois do início;
- índice `1`: um passo depois do início;
- índice `2`: dois passos depois do início.

Você não precisa decorar detalhes internos da memória. Para programar com segurança, basta consolidar esta regra: a primeira posição usa índice `0`.

## `length`: quantidade de elementos

A propriedade `length` informa quantos elementos existem:

```typescript
const etapas: string[] = ["planejar", "executar", "revisar"];

console.log(etapas.length); // 3
```

Observe a diferença:

```text
quantidade de elementos: 3
último índice válido:     2
```

Como o primeiro índice é zero, o último índice válido é sempre:

```typescript
etapas.length - 1
```

Assim, o último elemento pode ser lido sem saber previamente o tamanho:

```typescript
const ultimoIndice = etapas.length - 1;
console.log(etapas[ultimoIndice]); // revisar
```

## Arrays tipados

Em TypeScript, o tipo informa quais valores pertencem à lista:

```typescript
const nomes: string[] = ["Lia", "Caio"];
const notas: number[] = [8.5, 7, 9.2];
const estados: boolean[] = [true, false, true];
```

Isso impede misturas acidentais:

```typescript
const notas: number[] = [8, 9];

// notas.push("dez"); // Erro: string não pertence a number[]
```

O tipo não descreve quantos elementos existem. `number[]` pode estar vazio, ter dois números ou ter milhares deles. Ele descreve o tipo de cada elemento.

### Por que tipar um array vazio?

Quando a lista começa vazia, escreva a intenção claramente:

```typescript
const tarefas: string[] = [];
```

Assim, o TypeScript sabe desde a declaração quais elementos poderão entrar depois.

## Um array pode mudar mesmo com `const`

`const` impede que a variável passe a apontar para outro array, mas não congela o conteúdo do array atual:

```typescript
const cores: string[] = ["azul", "verde"];

cores[0] = "roxo"; // permitido
cores.push("amarelo"); // permitido

// cores = ["preto"]; // erro: não é possível reatribuir a constante
```

Modelo mental:

```text
const cores ─────→ ["azul", "verde"]
     │                        │
     │ não pode apontar       └─ conteúdo pode ser alterado
     │ para outro array
```

Use `const` quando a variável deve continuar representando o mesmo array. Isso é comum mesmo em listas que recebem ou removem elementos.

## Leitura e alteração são operações diferentes

Ler um elemento não modifica o array:

```typescript
const velocidades: number[] = [60, 80, 100];
const velocidadeCentral = velocidades[1];

console.log(velocidadeCentral); // 80
console.log(velocidades); // [60, 80, 100]
```

Escrever em um índice substitui o elemento daquela posição:

```typescript
velocidades[1] = 85;

console.log(velocidades); // [60, 85, 100]
```

A quantidade continua igual; apenas um valor foi trocado.

## Índices fora do array

Em JavaScript, tentar ler uma posição inexistente produz `undefined` em tempo de execução:

```typescript
const sensores: string[] = ["frontal", "traseiro"];

console.log(sensores[5]); // undefined em tempo de execução
```

Dependendo da configuração do TypeScript, o compilador também pode exigir que você trate essa possibilidade. A regra prática é simples: mantenha o índice entre `0` e `length - 1`.

Para um array vazio, não existe índice válido:

```text
length = 0
último índice calculado = -1
```

Por isso, operações que tentam remover um elemento de um array vazio podem não encontrar valor algum.

## Início e fim possuem custos e usos diferentes

Neste capítulo, você usará quatro operações:

```text
              INÍCIO                          FIM
                 ↓                             ↓
adicionar     unshift  [ elemento | elemento ] push
remover         shift  [ elemento | elemento ] pop
```

- `push`: adiciona no fim;
- `pop`: remove do fim;
- `unshift`: adiciona no início;
- `shift`: remove do início.

Alterar o início exige reposicionar os índices dos elementos existentes. Em listas muito grandes ou operações muito repetidas, isso pode custar mais trabalho que alterar o fim. Não precisamos otimizar antecipadamente; por enquanto, escolha a operação que representa corretamente a regra do problema.

## Cópia ou referência?

Arrays não se comportam como números e strings quando são atribuídos a outra variável.

Com números, cada variável guarda seu próprio valor:

```typescript
let original = 10;
let copia = original;

copia = 20;

console.log(original); // 10
console.log(copia); // 20
```

Com arrays, a atribuição copia a **referência**, não todos os elementos:

```typescript
const original: string[] = ["A", "B"];
const apelidoDoMesmoArray = original;

apelidoDoMesmoArray[0] = "X";

console.log(original); // ["X", "B"]
```

```text
original ───────────────┐
                       ├──→ ["A", "B"]
apelidoDoMesmoArray ────┘
```

Depois da alteração, ambos continuam apontando para a mesma estrutura.

Para dois elementos conhecidos, outro literal cria outro array:

```typescript
const original: string[] = ["A", "B"];
const copiaIndependente: string[] = [original[0], original[1]];

copiaIndependente[0] = "X";

console.log(original); // ["A", "B"]
console.log(copiaIndependente); // ["X", "B"]
```

Mais adiante, você aprenderá formas convenientes de copiar arrays de tamanho variável. Por enquanto, o conceito importante é: `const b = a` faz `a` e `b` apontarem para o mesmo array.

## Arrays multidimensionais: uma primeira visão

Um array pode guardar outros arrays. Uma grade simples pode ser tipada como `string[][]`:

```typescript
const mapa: string[][] = [
  ["A1", "A2"],
  ["B1", "B2"],
];

console.log(mapa[0][1]); // A2
```

```text
                coluna 0   coluna 1
linha 0          "A1"       "A2"
linha 1          "B1"       "B2"

mapa[linha][coluna]
mapa[0][1] → "A2"
```

Essa é apenas uma prévia. Você não precisa usar arrays multidimensionais no mini-projeto nem nos exercícios fundamentais de hoje.

## Conexão opcional com loops

Loops podem visitar os índices de um array, mas você não precisa dominar essa combinação agora:

```typescript
const etapas: string[] = ["planejar", "executar", "revisar"];

for (let indice = 0; indice < etapas.length; indice++) {
  console.log(etapas[indice]);
}
```

Note apenas a relação entre as partes:

- começa no índice `0`;
- continua enquanto `indice < etapas.length`;
- aumenta o índice após cada acesso.

Se essa parte ainda parecer difícil, pule-a sem prejuízo e retorne depois da prática do Capítulo 04.

## Resumo

- Um array é uma lista ordenada de elementos.
- O primeiro índice é `0`.
- `length` é a quantidade, e o último índice é `length - 1`.
- Tipos como `string[]` informam quais elementos pertencem à lista.
- `const` impede reatribuir a variável, mas não impede alterar o array.
- Atribuir um array a outra variável compartilha a mesma referência.
- `string[][]` representa, de forma inicial, um array de arrays.

## Próximo passo

Na próxima aula, você verá as duas sintaxes de tipagem e praticará acesso, alteração, inclusão e remoção.
