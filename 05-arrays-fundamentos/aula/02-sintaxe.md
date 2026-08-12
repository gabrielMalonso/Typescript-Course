# Arrays — Sintaxe

## Criando arrays

### Forma com colchetes

```typescript
const cidades: string[] = ["Recife", "Curitiba", "Manaus"];
const distancias: number[] = [12.5, 30, 7.8];
const verificacoes: boolean[] = [true, true, false];
```

Leia `string[]` como “array de strings”. Essa será a forma principal do curso por ser compacta e comum.

### Forma genérica

```typescript
const cidades: Array<string> = ["Recife", "Curitiba", "Manaus"];
const distancias: Array<number> = [12.5, 30, 7.8];
```

`string[]` e `Array<string>` descrevem o mesmo tipo:

```typescript
const formaCurta: string[] = ["A", "B"];
const formaGenerica: Array<string> = ["A", "B"];
```

Não existe diferença de comportamento em tempo de execução. Escolha uma forma e mantenha consistência. Neste curso, prefira `tipo[]` para arrays simples.

## Inferência e anotação explícita

O TypeScript pode inferir o tipo a partir dos elementos:

```typescript
const linguagens = ["TypeScript", "Swift"];
// TypeScript infere string[]
```

Quando o array começa vazio, declare o tipo para comunicar a intenção:

```typescript
const linguagens: string[] = [];
```

Um tipo incompatível é rejeitado:

```typescript
const linguagens: string[] = ["TypeScript"];

// linguagens.push(42); // Erro: number não pode entrar em string[]
```

## Acessando elementos

Use colchetes com o índice:

```typescript
const combustiveis: string[] = ["etanol", "gasolina", "elétrico"];

const primeiro = combustiveis[0];
const segundo = combustiveis[1];

console.log(primeiro); // etanol
console.log(segundo); // gasolina
```

### Primeiro elemento

```typescript
const primeiroElemento = combustiveis[0];
```

### Último elemento

```typescript
const ultimoIndice = combustiveis.length - 1;
const ultimoElemento = combustiveis[ultimoIndice];

console.log(ultimoElemento); // elétrico
```

Evite escrever `combustiveis[combustiveis.length]`: esse índice está uma posição depois do último elemento.

```text
length = 3
índices válidos = 0, 1, 2
índice 3 = fora do array
```

## Modificando um elemento

Atribua um novo valor ao índice:

```typescript
const status: string[] = ["pendente", "pendente", "pendente"];

status[1] = "concluído";

console.log(status); // ["pendente", "concluído", "pendente"]
```

A alteração preserva o tamanho:

```typescript
console.log(status.length); // 3
```

O novo valor deve respeitar o tipo:

```typescript
// status[1] = true; // Erro: boolean não pertence a string[]
```

## Propriedade `length`

`length` é uma propriedade, por isso não usa parênteses:

```typescript
const pecas: string[] = ["eixo", "mancal", "engrenagem"];

console.log(pecas.length); // correto: 3
// console.log(pecas.length()); // incorreto
```

Ela acompanha inclusões e remoções:

```typescript
const pecas: string[] = ["eixo"];

console.log(pecas.length); // 1
pecas.push("mancal");
console.log(pecas.length); // 2
pecas.pop();
console.log(pecas.length); // 1
```

## `push`: adicionar no fim

```typescript
const fila: string[] = ["Ana", "Beto"];

fila.push("Clara");

console.log(fila); // ["Ana", "Beto", "Clara"]
```

`push` modifica o array e retorna o novo tamanho:

```typescript
const novoTamanho = fila.push("Davi");

console.log(novoTamanho); // 4
console.log(fila); // ["Ana", "Beto", "Clara", "Davi"]
```

## `pop`: remover do fim

```typescript
const historico: string[] = ["início", "configuração", "resultado"];
const removido = historico.pop();

console.log(removido); // resultado
console.log(historico); // ["início", "configuração"]
```

Se o array estiver vazio, não existe elemento para devolver:

```typescript
const historicoVazio: string[] = [];
const removido = historicoVazio.pop();

console.log(removido); // undefined
```

Por isso, o valor retornado por `pop` pode ser `string | undefined`. Você estudará essa escrita de tipo com mais profundidade em um capítulo futuro; por enquanto, leia como “uma string ou nenhum valor”.

## `unshift`: adicionar no início

```typescript
const avisos: string[] = ["reunião", "backup"];

avisos.unshift("urgente");

console.log(avisos); // ["urgente", "reunião", "backup"]
```

Os elementos antigos mudam de índice:

```text
antes:  ["reunião", "backup"]
índice:      0          1

depois: ["urgente", "reunião", "backup"]
índice:      0          1          2
```

Assim como `push`, `unshift` retorna o novo tamanho.

## `shift`: remover do início

```typescript
const fila: string[] = ["Ana", "Beto", "Clara"];
const atendida = fila.shift();

console.log(atendida); // Ana
console.log(fila); // ["Beto", "Clara"]
```

Os elementos restantes avançam um índice. Em um array vazio, `shift` retorna `undefined`.

## As quatro operações lado a lado

```typescript
const itens: string[] = ["B", "C"];

itens.unshift("A"); // ["A", "B", "C"]
itens.push("D"); // ["A", "B", "C", "D"]

const primeiro = itens.shift(); // primeiro = "A"; itens = ["B", "C", "D"]
const ultimo = itens.pop(); // ultimo = "D"; itens = ["B", "C"]
```

| Operação | Local | Efeito | Retorno |
|----------|-------|--------|---------|
| `push(valor)` | Fim | Adiciona | Novo `length` |
| `pop()` | Fim | Remove | Elemento ou `undefined` |
| `unshift(valor)` | Início | Adiciona | Novo `length` |
| `shift()` | Início | Remove | Elemento ou `undefined` |

## Sequência de operações: acompanhe o estado

Ao ler código com arrays, desenhe o estado depois de cada linha:

```typescript
const letras: string[] = ["B", "C"];
letras.unshift("A");
letras.push("D");
letras[1] = "X";
letras.pop();
```

```text
início             ["B", "C"]
unshift("A")       ["A", "B", "C"]
push("D")          ["A", "B", "C", "D"]
letras[1] = "X"    ["A", "X", "C", "D"]
pop()              ["A", "X", "C"]
```

Essa técnica evita confundir o valor de um índice depois de `shift` ou `unshift`.

## Referência compartilhada

```typescript
const principal: number[] = [10, 20];
const secundaria = principal;

secundaria.push(30);

console.log(principal); // [10, 20, 30]
console.log(secundaria); // [10, 20, 30]
```

`secundaria` não é uma cópia independente. As duas variáveis acessam o mesmo array.

## Array multidimensional

A anotação ganha um par de colchetes por nível:

```typescript
const linhas: number[][] = [
  [10, 20],
  [30, 40],
];

console.log(linhas[1][0]); // 30
```

Leia da esquerda para a direita:

1. `linhas[1]` escolhe o segundo array: `[30, 40]`;
2. `[0]` escolhe o primeiro elemento desse array: `30`.

Isso é apenas uma menção inicial; não será exigido no mini-projeto.

## Erros frequentes de sintaxe e raciocínio

### Confundir índice com posição humana

```typescript
const dias: string[] = ["segunda", "terça", "quarta"];

console.log(dias[1]); // terça, não segunda
```

### Usar `length` como último índice

```typescript
const dias: string[] = ["segunda", "terça", "quarta"];

console.log(dias[dias.length]); // undefined
console.log(dias[dias.length - 1]); // quarta
```

### Ignorar que `shift` muda os índices

```typescript
const fila: string[] = ["A", "B", "C"];
fila.shift();

console.log(fila[0]); // B
```

### Esperar uma cópia independente

```typescript
const a: string[] = ["original"];
const b = a;
b[0] = "alterado";

console.log(a[0]); // alterado
```

## Checklist

- [ ] Declarei o tipo do array, principalmente se ele começa vazio.
- [ ] Lembrei que o primeiro índice é `0`.
- [ ] Usei `length - 1` para encontrar o último índice.
- [ ] Recalculei os índices depois de `shift` ou `unshift`.
- [ ] Considerei `undefined` ao remover de um array vazio.
- [ ] Verifiquei se duas variáveis compartilham a mesma referência.
- [ ] Não usei métodos do próximo capítulo antes de entender estas operações.
