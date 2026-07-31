# Capítulo 02 — Tipos Primitivos: Sintaxe

## Estrutura Básica

Um valor primitivo pode ter o tipo inferido ou anotado explicitamente:

```typescript
const temperaturaInferida = 24.5;
const temperaturaAnotada: number = 24.5;

const setorInferido = "Usinagem";
const setorAnotado: string = "Usinagem";

const maquinaAtivaInferida = true;
const maquinaAtivaAnotada: boolean = true;
```

Nos três pares, as duas formas produzem o mesmo tipo. A anotação é útil quando acrescenta clareza; a inferência evita repetir uma informação já evidente.

## Regras

### 1. Inteiros e decimais usam `number`

```typescript
const numeroDeAmostras: number = 12;
const massaDaAmostra: number = 4.75;
const frequencia: number = 2.4e3;
```

No código, escreva decimais com ponto. `4,75` não representa um único número em TypeScript.

### 2. Operações básicas exigem atenção aos tipos

```typescript
const massaA = 12.5;
const massaB = 7.5;

const massaTotal = massaA + massaB;
const diferencaDeMassa = massaA - massaB;
const dobroDaMassaA = massaA * 2;
const metadeDaMassaA = massaA / 2;
```

Todos os resultados são `number`. A divisão por zero não causa erro de compilação; em JavaScript, ela produz o valor especial `Infinity`.

### 3. Strings precisam de delimitadores compatíveis

```typescript
const materialA = "Alumínio";
const materialB = 'Aço';
const materialC = `Bronze`;
```

Comece e termine a string com o mesmo delimitador.

Quando o texto contém uma aspa igual à externa, use outro delimitador:

```typescript
const medida = 'Eixo de 2"';
const aviso = "Material classificado como 'especial'";
```

### 4. Concatenação com `+` produz texto quando há uma string

```typescript
const codigo = "PX";
const numero = 12;
const identificacao = codigo + "-" + numero;
```

`identificacao` contém a string `PX-12`.

Compare:

```typescript
const somaNumerica = 10 + 5;
const uniaoDeTextos = "10" + "5";
```

O primeiro resultado é o número `15`; o segundo é a string `"105"`.

### 5. Template literals usam crases e `${expressao}`

```typescript
const componente = "Eixo";
const quantidade = 4;
const resumo = `Componente: ${componente} | Quantidade: ${quantidade}`;
```

O conteúdo dentro de `${...}` é avaliado e inserido na string. Os espaços fora das chaves são preservados exatamente.

Também é possível inserir uma operação simples:

```typescript
const largura = 8;
const altura = 5;
const mensagem = `Área: ${largura * altura} cm²`;
```

### 6. Booleanos usam `true` e `false` sem aspas

```typescript
const testeAprovado: boolean = true;
let sistemaEmOperacao = false;

sistemaEmOperacao = true;
```

`"false"` é um texto e não pode ser atribuído a uma variável do tipo `boolean`.

### 7. `null` deve ser escrito explicitamente

```typescript
const motivoDaRejeicao: null = null;
```

Essa declaração comunica que a ausência foi registrada de propósito.

### 8. `undefined` representa um valor não definido

```typescript
const numeroDoLaudo: undefined = undefined;
```

Não use a string `"undefined"` para representar ausência. Ela é apenas um texto com nove caracteres.

### 9. A validação continua após a inferência

```typescript
let nivelDoTanque = 60;
nivelDoTanque = 75;
```

O TypeScript infere `number` na primeira linha e valida a segunda atribuição. Como `75` também é `number`, ela é aceita. Uma string seria analisada e rejeitada; validar não significa aceitar automaticamente.

## Variações

### Três formas de formar uma mensagem

```typescript
const pressao = 8.5;

console.log("Pressão:", pressao, "bar");
console.log("Pressão: " + pressao + " bar");
console.log(`Pressão: ${pressao} bar`);
```

As três linhas podem gerar:

```text
Pressão: 8.5 bar
```

- a vírgula envia valores separados ao `console.log`;
- `+` concatena antes da chamada;
- o template literal cria uma única string interpolada.

### Notação decimal e científica

```typescript
const distanciaDecimal = 2500;
const distanciaCientifica = 2.5e3;
```

Os dois valores representam o mesmo número.

### Ausência intencional e valor não definido

```typescript
const observacaoConfirmada: null = null;
const observacaoAindaNaoInformada: undefined = undefined;
```

O valor exibido pode parecer apenas “vazio” nos dois casos, mas a intenção comunicada é diferente.

### Tipos especiais

```typescript
const inteiroMuitoGrande: bigint = 9007199254740993n;
const identificadorUnico: symbol = Symbol("registro");
```

O primeiro exemplo requer alvo ES2020 ou posterior. O segundo requer uma biblioteca JavaScript com suporte a `Symbol`. Eles aparecem aqui somente para reconhecimento.

## Erros de Sintaxe Comuns

### Usar vírgula decimal

Com problema:

```typescript
const temperatura = 23,5;
```

Corrigido:

```typescript
const temperatura = 23.5;
```

### Esquecer as aspas de uma string

Com problema:

```typescript
const material = Aço;
```

Corrigido:

```typescript
const material = "Aço";
```

Sem aspas, o TypeScript interpreta `Aço` como o nome de uma variável.

### Confundir soma com concatenação

Com problema, se o objetivo era calcular:

```typescript
const largura = "10";
const altura = "5";
const soma = largura + altura;
```

O resultado é `"105"`, não `15`.

Corrigido:

```typescript
const largura = 10;
const altura = 5;
const soma = largura + altura;
```

### Usar aspas em um booleano

Com problema:

```typescript
const sistemaAtivo: boolean = "true";
```

Corrigido:

```typescript
const sistemaAtivo: boolean = true;
```

### Usar aspas em `null` ou `undefined`

Com problema:

```typescript
const observacao: null = "null";
const codigo: undefined = "undefined";
```

Corrigido:

```typescript
const observacao: null = null;
const codigo: undefined = undefined;
```

### Usar aspas em vez de crases na interpolação

Com problema:

```typescript
const temperatura = 25;
console.log("Temperatura: ${temperatura} °C");
```

Essa linha exibe os caracteres `${temperatura}` literalmente.

Corrigido:

```typescript
const temperatura = 25;
console.log(`Temperatura: ${temperatura} °C`);
```

### Misturar `bigint` e `number`

Com problema:

```typescript
const totalGrande = 100n;
const incremento = 1;
const resultado = totalGrande + incremento;
```

Os tipos precisam ser compatíveis. Como `bigint` será aprofundado apenas futuramente, não o use nos exercícios matemáticos deste capítulo.

## Tabela de Referência Rápida

| Sintaxe | Descrição | Exemplo |
|---------|-----------|---------|
| `const nome: number = valor;` | Número com tipo explícito | `const massa: number = 8.5;` |
| `2.5e3` | Notação científica | `const rotacao = 2.5e3;` |
| `a + b` | Soma numérica ou concatenação | `const total = 2 + 3;` |
| `a - b` | Subtração | `const diferenca = 8 - 3;` |
| `a * b` | Multiplicação | `const area = 4 * 5;` |
| `a / b` | Divisão | `const metade = 8 / 2;` |
| `"texto"` | String com aspas duplas | `const setor = "A";` |
| `'texto'` | String com aspas simples | `const setor = 'A';` |
| `` `texto ${valor}` `` | Template literal | `` `Massa: ${massa}` `` |
| `true` / `false` | Valores booleanos | `const ativo = true;` |
| `null` | Ausência intencional | `const falha: null = null;` |
| `undefined` | Valor não definido | `const laudo: undefined = undefined;` |
| `123n` | Literal `bigint` | `const total = 123n;` |
| `Symbol("x")` | Cria símbolo único | `const id = Symbol("x");` |
