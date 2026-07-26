# Capítulo 01 — Variáveis e Constantes: Sintaxe

## Estrutura Básica

Uma declaração com anotação explícita possui quatro partes:

```typescript
let temperaturaAtual: number = 25;
```

| Parte | Trecho | Função |
|-------|--------|--------|
| Palavra-chave | `let` | Define uma variável reatribuível |
| Nome | `temperaturaAtual` | Identifica o valor |
| Tipo | `: number` | Informa o tipo aceito |
| Valor inicial | `= 25` | Inicializa a variável |

Com inferência, a anotação pode ser omitida:

```typescript
let temperaturaAtual = 25;
```

Para um valor que não será reatribuído, use `const`:

```typescript
const temperaturaDeReferencia = 25;
```

## Regras

### 1. Use `let` quando houver reatribuição

```typescript
let quantidadeEmEstoque = 20;
quantidadeEmEstoque = 18;
```

Não repita `let` na reatribuição. A declaração cria a variável; a atribuição posterior apenas troca seu valor.

### 2. `const` precisa de um valor inicial

Correto:

```typescript
const codigoDaPeca = "PX-01";
```

Incorreto:

```typescript
const codigoDaPeca: string;
```

Como a constante não pode receber outro valor depois, ela precisa ser inicializada na própria declaração.

### 3. Uma constante não pode ser reatribuída

```typescript
const codigoDaPeca = "PX-01";
codigoDaPeca = "PX-02";
```

A segunda linha produz erro de compilação.

### 4. O novo valor de um `let` deve ser compatível com seu tipo

```typescript
let velocidadeAtual = 1200;
velocidadeAtual = 1350;
```

Isto é incompatível:

```typescript
let velocidadeAtual = 1200;
velocidadeAtual = "rápida";
```

### 5. Use nomes válidos e descritivos

```typescript
const diametroDoEixo = 25;
const totalDePecas = 80;
```

Exemplos inválidos:

```typescript
const 2pecas = 2;
const nome da peca = "Eixo";
const codigo-peca = "E-10";
```

Exemplos tecnicamente válidos, mas pouco claros:

```typescript
const d = 25;
const qtd = 80;
```

### 6. Letras maiúsculas e minúsculas fazem diferença

```typescript
const pressaoAtual = 8;
const pressaoatual = 10;
```

Esses são dois nomes diferentes. Evite diferenças sutis desse tipo.

### 7. Respeite o escopo de bloco

```typescript
{
  const unidadeDeMedida = "mm";
  console.log(unidadeDeMedida);
}
```

Isto produz erro porque o nome só existe dentro do bloco:

```typescript
{
  const unidadeDeMedida = "mm";
}

console.log(unidadeDeMedida);
```

### 8. Mantenha uma convenção de ponto e vírgula

Estas duas linhas normalmente compilam:

```typescript
const nomeDaPeca = "Flange"
const quantidade = 4
```

Neste curso, escreva:

```typescript
const nomeDaPeca = "Flange";
const quantidade = 4;
```

A presença do `;` aqui é a convenção escolhida. Não confunda consistência de estilo com compatibilidade de tipos.

## Variações

### Inferência e anotação explícita

```typescript
const nomeInferido = "Gabriel";
const nomeAnotado: string = "Gabriel";
```

Nos dois casos, o tipo é `string`.

### Declaração e atribuição posterior com `let`

```typescript
let numeroDaOrdem: number;
numeroDaOrdem = 1042;
```

Essa forma é permitida com `let`, desde que a variável receba um valor antes de ser usada.

### `camelCase` e `snake_case`

```typescript
const limiteDeCarga = 500;
const limite_de_carga = 500;
```

Ambos são nomes válidos, mas adotaremos `camelCase` por ser o padrão mais comum em TypeScript.

### Exibindo nomes e valores

Com vírgula, `console.log` recebe argumentos separados e costuma inserir um espaço entre eles:

```typescript
const material = "Aço";
console.log("Material:", material);
```

Saída:

```text
Material: Aço
```

Com `+`, os textos são unidos exatamente como foram escritos:

```typescript
const material = "Aço";
console.log("Material: " + material);
```

Também é possível usar um template literal:

```typescript
const material = "Aço";
console.log(`Material: ${material}`);
```

Os template literals serão aprofundados no Capítulo 02. Por enquanto, observe que as três formas podem gerar a mesma saída quando os espaços são planejados corretamente.

## Erros de Sintaxe Comuns

### Redeclarar ao tentar atualizar

Com problema:

```typescript
let pecasRestantes = 10;
let pecasRestantes = 8;
```

Corrigido:

```typescript
let pecasRestantes = 10;
pecasRestantes = 8;
```

### Reatribuir uma constante

Com problema:

```typescript
const nomeDoCliente = "Oficina Alfa";
nomeDoCliente = "Oficina Beta";
```

Corrigido, se a mudança fizer parte do problema:

```typescript
let nomeDoCliente = "Oficina Alfa";
nomeDoCliente = "Oficina Beta";
```

### Misturar tipos

Com problema:

```typescript
let totalDePecas: number = 30;
totalDePecas = "trinta";
```

Corrigido:

```typescript
let totalDePecas: number = 30;
totalDePecas = 32;
```

### Acessar um nome fora do escopo

Com problema:

```typescript
{
  const loteAtual = "L-07";
}

console.log(loteAtual);
```

Corrigido:

```typescript
const loteAtual = "L-07";

{
  console.log(loteAtual);
}
```

Agora `loteAtual` foi declarado fora do bloco e pode ser lido dentro dele.

### Criar espaçamento acidental na saída

```typescript
const raio = 5;
console.log("Raio: ", raio);
```

A string já termina com espaço e a vírgula costuma adicionar outro separador. Para obter exatamente `Raio: 5`, use uma destas formas:

```typescript
const raio = 5;
console.log("Raio:", raio);
console.log("Raio: " + raio);
```

Sempre compare a saída real com o formato solicitado.

## Tabela de Referência Rápida

| Sintaxe | Descrição | Exemplo |
|---------|-----------|---------|
| `let nome = valor;` | Declara valor reatribuível com inferência | `let estoque = 10;` |
| `let nome: tipo = valor;` | Declara valor reatribuível com tipo explícito | `let estoque: number = 10;` |
| `let nome: tipo;` | Declara para atribuição posterior | `let estoque: number;` |
| `const nome = valor;` | Declara valor não reatribuível | `const setor = "A";` |
| `nome = novoValor;` | Reatribui um `let` existente | `estoque = 8;` |
| `{ ... }` | Delimita um bloco | `{ const teste = 1; }` |
| `camelCase` | Convenção adotada para nomes | `temperaturaAtual` |
| `snake_case` | Convenção válida, comum em outros contextos | `temperatura_atual` |
| `console.log(a, b);` | Exibe argumentos separados | `console.log("Total:", total);` |
| `console.log(a + b);` | Concatena antes de exibir | `console.log("Total: " + total);` |
