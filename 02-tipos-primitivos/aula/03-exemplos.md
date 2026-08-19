# Capítulo 02 — Tipos Primitivos: Exemplos Práticos

Os três primeiros exemplos usam apenas recursos que podem ser compilados com a configuração atual do curso.

## Exemplo 1: Conversão de Unidades de Comprimento

### Contexto

Uma oficina recebeu uma medida em metros e precisa exibi-la também em milímetros. O exemplo usa números inteiros, decimais e notação científica.

### Código

```typescript
const comprimentoEmMetros: number = 2.75;
const milimetrosPorMetro = 1e3;
const comprimentoEmMilimetros = comprimentoEmMetros * milimetrosPorMetro;

console.log(`Comprimento: ${comprimentoEmMetros} m`);
console.log(`Comprimento: ${comprimentoEmMilimetros} mm`);
```

### Explicação

- `2.75` é um número decimal.
- `1e3` usa notação científica e representa `1000`.
- A multiplicação produz outro `number`.
- Os template literals inserem os valores numéricos nas mensagens.
- A validação dos tipos garante que os valores usados no cálculo são compatíveis.

### Saída Esperada

```text
Comprimento: 2.75 m
Comprimento: 2750 mm
```

## Exemplo 2: Resumo de uma Chapa

### Contexto

Uma ficha precisa calcular uma área retangular e formar uma identificação legível.

### Código

```typescript
const material = "Aço inoxidável";
const larguraEmMilimetros = 800;
const alturaEmMilimetros = 500;
const areaEmMilimetrosQuadrados = larguraEmMilimetros * alturaEmMilimetros;

const identificacao = material + " - " + larguraEmMilimetros + " x " + alturaEmMilimetros + " mm";
const resumoDaArea = `Área: ${areaEmMilimetrosQuadrados} mm²`;

console.log(identificacao);
console.log(resumoDaArea);
```

### Explicação

- `material` é uma `string`.
- As dimensões e a área são valores `number`.
- `identificacao` usa concatenação com `+`.
- Quando a concatenação encontra números, eles são convertidos para texto.
- `resumoDaArea` usa template literal, que deixa clara a posição do valor inserido.

### Saída Esperada

```text
Aço inoxidável - 800 x 500 mm
Área: 400000 mm²
```

## Exemplo 3: Registro de uma Inspeção

### Contexto

Uma inspeção foi concluída sem observações. O número do laudo ainda não foi informado pelo sistema externo.

### Código

```typescript
const equipamento = "Compressor 02";
const inspecaoConcluida: boolean = true;
const observacaoDoInspetor: null = null;
const numeroDoLaudo: undefined = undefined;

console.log(`Equipamento: ${equipamento}`);
console.log(`Inspeção concluída: ${inspecaoConcluida}`);
console.log(`Observação: ${observacaoDoInspetor}`);
console.log(`Número do laudo: ${numeroDoLaudo}`);
```

### Explicação

- `inspecaoConcluida` é um booleano real, não a string `"true"`.
- `observacaoDoInspetor` usa `null`: a ausência foi registrada intencionalmente.
- `numeroDoLaudo` usa `undefined`: o valor ainda não foi definido.
- O template literal converte os valores para sua representação textual apenas ao formar a mensagem.
- Essa conversão para exibição não altera os tipos das constantes originais.

### Saída Esperada

```text
Equipamento: Compressor 02
Inspeção concluída: true
Observação: null
Número do laudo: undefined
```

## Exemplo de Erro Comum

### Código com Problema

```typescript
const largura = "10";
const altura = 5;
const area = largura + altura;
const ensaioAprovado: boolean = "true";
const responsavel: null = "null";

console.log("Área: ${area} cm²");
```

### Por que está errado?

Há quatro problemas diferentes:

1. `largura` foi criada como string, então `+` forma o texto `"105"` em vez de calcular uma soma.
2. `"true"` é string e não pode ser atribuído a `boolean`.
3. `"null"` é string e não representa o valor primitivo `null`.
4. `${area}` só é interpolado dentro de crases; com aspas, o trecho aparece literalmente.

O TypeScript rejeita as incompatibilidades explícitas de `boolean` e `null`. A concatenação e as aspas no `console.log` podem compilar, mas produzem um resultado diferente do pretendido. Compilar não garante que a regra do problema foi atendida.

### Código Corrigido

```typescript
const largura = 10;
const altura = 5;
const area = largura * altura;
const ensaioAprovado: boolean = true;
const responsavel: null = null;

console.log(`Área: ${area} cm²`);
console.log(`Ensaio aprovado: ${ensaioAprovado}`);
console.log(`Responsável: ${responsavel}`);
```

### Saída Esperada

```text
Área: 50 cm²
Ensaio aprovado: true
Responsável: null
```

## Reconhecendo `bigint` e `symbol`

Estes exemplos são apenas para leitura. Não os inclua nos exercícios do capítulo sem ajustar a configuração do compilador.

```typescript
const numeroDeSerieMuitoGrande: bigint = 9007199254740993n;
const chaveInterna: symbol = Symbol("sensor");
```

- `bigint` armazena inteiros muito grandes e requer ES2020 ou posterior;
- `symbol` cria uma identidade única e aparece em usos mais avançados.

## Desafio Rápido

Crie um arquivo `desafio-rapido.ts` que atenda a todos os requisitos:

1. declare a massa de duas peças como valores `number`, `12.5` e `7.5`;
2. calcule a massa total com `+`;
3. declare o texto `"Lote LT-08"` como `string`;
4. declare `loteLiberado` como `boolean` com valor `true`;
5. exiba exatamente as três linhas abaixo usando template literals.

```text
Lote: Lote LT-08
Massa total: 20 kg
Liberado: true
```

Antes de encerrar, compare os tipos, os valores e cada caractere da saída com os requisitos.
