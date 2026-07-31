# Mini-Projeto: Boletim de Ensaio Térmico

## Objetivo

Vamos construir um boletim de terminal para registrar um ensaio térmico simples. O programa armazenará medidas, calculará resultados básicos e apresentará textos, um estado booleano e duas formas diferentes de ausência de valor.

Ao final, o terminal deverá mostrar exatamente:

```text
=== BOLETIM DE ENSAIO TÉRMICO ===
Ensaio: ET-27
Material: Liga de alumínio
Temperatura inicial: 22.5 °C
Temperatura final: 78.5 °C
Variação: 56 °C
Temperatura média: 50.5 °C
Concluído: true
Observação do inspetor: null
Código de falha: undefined
```

## Conceitos Aplicados

- `number` com inteiro e decimal;
- operações matemáticas básicas;
- `string` e template literals;
- `boolean`;
- diferença entre `null` e `undefined`;
- inferência e anotação explícita.

## Requisitos Obrigatórios

Seu arquivo deve cumprir todos os itens abaixo. A saída final, sozinha, não substitui os requisitos de implementação.

- [ ] O arquivo deve se chamar `boletim-ensaio.ts`.
- [ ] `numeroDoEnsaio` deve ser o `number` inteiro `27` e usar inferência.
- [ ] `materialDaAmostra` deve ser a `string` `"Liga de alumínio"` e usar inferência.
- [ ] `temperaturaInicial` deve ser `22.5`, com anotação explícita `: number`.
- [ ] `temperaturaFinal` deve ser `78.5`, com anotação explícita `: number`.
- [ ] `variacaoDeTemperatura` deve ser calculada com uma subtração, não escrita diretamente como `56`.
- [ ] `temperaturaMedia` deve ser calculada somando as temperaturas e dividindo o resultado por `2`, não escrita diretamente como `50.5`.
- [ ] `ensaioConcluido` deve ser o booleano `true`, sem aspas.
- [ ] `observacaoDoInspetor` deve ter anotação `: null` e valor `null`.
- [ ] `codigoDeFalha` deve ter anotação `: undefined` e valor `undefined`.
- [ ] As dez linhas, incluindo o cabeçalho, devem ser exibidas com template literals.
- [ ] A saída deve corresponder exatamente ao quadro apresentado no objetivo.
- [ ] Todas as instruções devem terminar com ponto e vírgula.

## Passo a Passo

Tente implementar o projeto usando apenas os requisitos acima. Consulte os passos seguintes quando precisar de orientação ou para conferir sua solução.

### Passo 1: Crie a identificação do ensaio

Declare o número e o material com inferência:

```typescript
const numeroDoEnsaio = 27;
const materialDaAmostra = "Liga de alumínio";
```

O primeiro valor é `number`; o segundo é `string`.

### Passo 2: Registre as temperaturas

Use a anotação explícita exigida nos dois valores:

```typescript
const temperaturaInicial: number = 22.5;
const temperaturaFinal: number = 78.5;
```

O TypeScript aceita inteiros e decimais como `number`.

### Passo 3: Calcule a variação e a média

Os resultados devem vir das medidas anteriores:

```typescript
const variacaoDeTemperatura = temperaturaFinal - temperaturaInicial;
const temperaturaMedia = (temperaturaInicial + temperaturaFinal) / 2;
```

Os parênteses garantem que a soma aconteça antes da divisão. A precedência dos operadores será aprofundada no Capítulo 03; aqui, basta seguir essa forma explícita.

### Passo 4: Registre o estado lógico

O ensaio foi concluído:

```typescript
const ensaioConcluido: boolean = true;
```

Não use aspas em `true`. Com aspas, o valor seria uma string.

### Passo 5: Represente as duas ausências

O inspetor confirmou que não há observação, mas o sistema ainda não definiu um código de falha:

```typescript
const observacaoDoInspetor: null = null;
const codigoDeFalha: undefined = undefined;
```

`null` registra a ausência intencional. `undefined` informa que o valor não foi definido.

### Passo 6: Forme a saída com template literals

Use crases em todas as linhas:

```typescript
console.log(`=== BOLETIM DE ENSAIO TÉRMICO ===`);
console.log(`Ensaio: ET-${numeroDoEnsaio}`);
console.log(`Material: ${materialDaAmostra}`);
console.log(`Temperatura inicial: ${temperaturaInicial} °C`);
console.log(`Temperatura final: ${temperaturaFinal} °C`);
console.log(`Variação: ${variacaoDeTemperatura} °C`);
console.log(`Temperatura média: ${temperaturaMedia} °C`);
console.log(`Concluído: ${ensaioConcluido}`);
console.log(`Observação do inspetor: ${observacaoDoInspetor}`);
console.log(`Código de falha: ${codigoDeFalha}`);
```

## Código Final Completo

Antes de consultar esta versão, compare seu arquivo com cada item dos requisitos obrigatórios.

```typescript
const numeroDoEnsaio = 27;
const materialDaAmostra = "Liga de alumínio";
const temperaturaInicial: number = 22.5;
const temperaturaFinal: number = 78.5;

const variacaoDeTemperatura = temperaturaFinal - temperaturaInicial;
const temperaturaMedia = (temperaturaInicial + temperaturaFinal) / 2;

const ensaioConcluido: boolean = true;
const observacaoDoInspetor: null = null;
const codigoDeFalha: undefined = undefined;

console.log(`=== BOLETIM DE ENSAIO TÉRMICO ===`);
console.log(`Ensaio: ET-${numeroDoEnsaio}`);
console.log(`Material: ${materialDaAmostra}`);
console.log(`Temperatura inicial: ${temperaturaInicial} °C`);
console.log(`Temperatura final: ${temperaturaFinal} °C`);
console.log(`Variação: ${variacaoDeTemperatura} °C`);
console.log(`Temperatura média: ${temperaturaMedia} °C`);
console.log(`Concluído: ${ensaioConcluido}`);
console.log(`Observação do inspetor: ${observacaoDoInspetor}`);
console.log(`Código de falha: ${codigoDeFalha}`);
```

## Testando

No terminal, entre na pasta onde salvou o arquivo e compile:

```bash
tsc boletim-ensaio.ts
```

Se não houver erro, execute o JavaScript gerado:

```bash
node boletim-ensaio.js
```

Faça duas conferências separadas:

### Conferência da implementação

- `variacaoDeTemperatura` foi calculada com subtração;
- `temperaturaMedia` foi calculada com soma e divisão;
- `true`, `null` e `undefined` estão sem aspas;
- as anotações e inferências exigidas foram respeitadas;
- todas as linhas usam template literals.

### Conferência da saída

- são exibidas exatamente dez linhas, incluindo o cabeçalho;
- os rótulos, acentos, letras maiúsculas e valores correspondem ao modelo;
- não existem espaços duplicados ou unidades ausentes;
- o arquivo executado é a versão que você acabou de conferir.

Compilar confirma a compatibilidade dos tipos e da sintaxe. A conferência dos requisitos confirma se o programa solicitado foi realmente construído.

## Desafios de Expansão

1. Acrescente `duracaoDoEnsaioEmSegundos` com o valor científico `1.8e3` e exiba `Duração: 1800 s`.
2. Acrescente `laboratorioAcreditado` como `false` e exiba o valor em uma nova linha.
3. Crie uma string `resumoDoEnsaio` que reúna o código, o material e a média em um único template literal.

Não use condicionais, arrays, objetos ou funções. O foco é representar corretamente valores primitivos e formar a saída solicitada.
