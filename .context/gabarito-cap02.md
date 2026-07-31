# Gabarito — Prova Capítulo 02: Tipos Primitivos

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

---

## Parte 1: Questões Teóricas (4 pontos)

### Questão 1 — Números e notação científica (1 ponto)

**Resposta:** a)

`6.4e2` representa `640`. Inteiros, decimais e valores escritos em notação científica pertencem ao tipo `number`; `640 / 2` resulta em `320`.

**Critérios:**

| Item | Pontos |
|------|--------|
| Marca a alternativa a | 0,50 |
| Identifica corretamente o tipo `number` | 0,25 |
| Explica corretamente o valor `320` | 0,25 |
| **Total** | **1,00** |

### Questão 2 — `null` e `undefined` (1 ponto)

**Resposta:** b)

`null` comunica que a ausência da restrição foi registrada intencionalmente. `undefined` comunica que o número do certificado ainda não foi definido.

**Critérios:**

| Item | Pontos |
|------|--------|
| Escolhe `null` para a ausência intencional | 0,50 |
| Escolhe `undefined` para o valor ainda não definido | 0,50 |
| **Total** | **1,00** |

### Questão 3 — Verdadeiro ou falso (1 ponto)

| Item | Resposta | Justificativa |
|------|----------|---------------|
| 1 | V | Inteiros e decimais são representados pelo tipo `number`. |
| 2 | F | `"false"` é uma `string`; o booleano é `false`, sem aspas. |
| 3 | F | Como há uma string, `+` concatena e produz a string `"105"`. |
| 4 | V | Cada chamada de `Symbol` cria um identificador único. |

**Critério:** 0,25 ponto por classificação correta, com justificativa adequada nos itens falsos. Total: 1 ponto.

### Questão 4 — Inferência e validação (1 ponto)

**Resposta esperada:**

O TypeScript infere que `temperatura` é do tipo `number` a partir de `22.5`. Depois, ele analisa cada atribuição: aceita `24` porque também é `number` e rejeita `"alta"` porque é `string`; portanto, validar significa verificar a compatibilidade, não aceitar qualquer valor.

**Critérios:**

| Item | Pontos |
|------|--------|
| Explica a inferência de `number` a partir do valor inicial | 0,35 |
| Afirma que atribuições posteriores continuam sendo analisadas | 0,35 |
| Distingue a aceitação de `24` da rejeição de `"alta"` | 0,30 |
| **Total** | **1,00** |

---

## Parte 2: Questões Práticas (6 pontos)

### Questão 5 — Análise e correção de código (1,5 pontos)

**a)** O código não compila. Há incompatibilidades nas declarações de `volumePorRecipiente` e `sistemaEmAlerta`.

**b)** `"2.5"` é `string`, mas a anotação exige `number`; `"false"` é `string`, mas a anotação exige `boolean`; além disso, a primeira saída usa aspas em vez de crases e exibiria `${volumeTotal}` literalmente se os erros de tipo fossem corrigidos isoladamente.

**c) Código corrigido:**

```typescript
const volumePorRecipiente: number = 2.5;
const quantidadeDeRecipientes = 4;
const volumeTotal = volumePorRecipiente * quantidadeDeRecipientes;
const sistemaEmAlerta: boolean = false;

console.log(`Volume total: ${volumeTotal} L`);
console.log(`Sistema em alerta: ${sistemaEmAlerta}`);
```

**Saída esperada:**

```text
Volume total: 10 L
Sistema em alerta: false
```

**Critérios:**

| Item | Pontos |
|------|--------|
| Afirma que o código não compila | 0,20 |
| Identifica a incompatibilidade de `"2.5"` com `number` | 0,25 |
| Identifica a incompatibilidade de `"false"` com `boolean` | 0,25 |
| Identifica o uso de aspas no lugar de crases | 0,20 |
| Corrige o valor numérico | 0,15 |
| Corrige o valor booleano | 0,15 |
| Corrige a interpolação com template literal | 0,15 |
| Código compila e produz exatamente as duas linhas | 0,15 |
| **Total** | **1,50** |

### Questão 6 — Registro de ensaio acústico (2 pontos)

**Código esperado:**

```typescript
const duracaoEmSegundos: number = 2.4e2;
const nivelInicial: number = 68.5;
const nivelFinal: number = 73.5;
const aumentoDoNivel = nivelFinal - nivelInicial;
const nomeDoEnsaio = "Ruído de bancada";
const ensaioAprovado = false;

const identificacaoDoEnsaio = "Ensaio: " + nomeDoEnsaio;

console.log(identificacaoDoEnsaio);
console.log(`Duração: ${duracaoEmSegundos} s`);
console.log(`Aumento do nível: ${aumentoDoNivel} dB`);
console.log(`Aprovado: ${ensaioAprovado}`);
```

**Saída esperada:**

```text
Ensaio: Ruído de bancada
Duração: 240 s
Aumento do nível: 5 dB
Aprovado: false
```

**Critérios:**

| Item | Pontos |
|------|--------|
| Declara a duração como `number` usando `2.4e2` | 0,25 |
| Declara os dois níveis com anotação `: number` | 0,25 |
| Calcula o aumento por subtração | 0,30 |
| Usa inferência no nome e no booleano `false` | 0,20 |
| Forma `identificacaoDoEnsaio` por concatenação com `+` | 0,20 |
| Usa template literals nas outras três linhas | 0,20 |
| Código compila e executa | 0,20 |
| Produz exatamente as quatro linhas solicitadas | 0,40 |
| **Total** | **2,00** |

### Questão 7 — Balanço hidráulico (2,5 pontos)

**Código esperado:**

```typescript
const codigoDaBancada = "H-12";
const volumeDeEntrada: number = 18.75;
const volumeDeSaida: number = 6.25;
const saldoDeVolume = volumeDeEntrada - volumeDeSaida;
const volumeMovimentado = volumeDeEntrada + volumeDeSaida;
const testeConcluido = true;
const observacaoFinal: null = null;
const numeroDoRegistro: undefined = undefined;

console.log(`=== BALANÇO HIDRÁULICO ===`);
console.log(`Bancada: ${codigoDaBancada}`);
console.log(`Volume de entrada: ${volumeDeEntrada} L`);
console.log(`Volume de saída: ${volumeDeSaida} L`);
console.log(`Saldo de volume: ${saldoDeVolume} L`);
console.log(`Volume movimentado: ${volumeMovimentado} L`);
console.log(`Teste concluído: ${testeConcluido}`);
console.log(`Observação final: ${observacaoFinal}`);
console.log(`Número do registro: ${numeroDoRegistro}`);
```

**Saída esperada:**

```text
=== BALANÇO HIDRÁULICO ===
Bancada: H-12
Volume de entrada: 18.75 L
Volume de saída: 6.25 L
Saldo de volume: 12.5 L
Volume movimentado: 25 L
Teste concluído: true
Observação final: null
Número do registro: undefined
```

**Critérios:**

| Item | Pontos |
|------|--------|
| Declara o código da bancada com inferência | 0,15 |
| Declara os dois volumes com anotação `: number` | 0,25 |
| Calcula o saldo por subtração | 0,30 |
| Calcula o volume movimentado por soma | 0,30 |
| Usa o booleano `true` sem aspas | 0,15 |
| Declara `observacaoFinal` como `null` | 0,20 |
| Declara `numeroDoRegistro` como `undefined` | 0,20 |
| Usa template literals nas nove linhas | 0,20 |
| Código compila e executa | 0,25 |
| Produz exatamente as nove linhas solicitadas | 0,50 |
| **Total** | **2,50** |

---

## Resumo da Pontuação

| Questão | Pontuação Máxima |
|---------|------------------|
| Q1 — Números e notação científica | 1,0 |
| Q2 — `null` e `undefined` | 1,0 |
| Q3 — Tipos e resultados | 1,0 |
| Q4 — Inferência e validação | 1,0 |
| **Subtotal Teoria** | **4,0** |
| Q5 — Análise e correção | 1,5 |
| Q6 — Registro de ensaio acústico | 2,0 |
| Q7 — Balanço hidráulico | 2,5 |
| **Subtotal Prática** | **6,0** |
| **Total Geral** | **10,0** |

## Critérios Gerais de Correção

1. Avaliar separadamente a compatibilidade dos tipos, os cálculos e a saída solicitada.
2. Não considerar `"false"`, `"null"` ou `"undefined"` equivalentes aos valores primitivos sem aspas.
3. Dar crédito parcial quando o conceito estiver correto, seguindo as tabelas granulares.
4. Descontar no item de saída exata quando houver espaços duplicados, acentos ausentes, pontuação diferente ou linhas fora da ordem.
5. Não tratar a ausência de ponto e vírgula como erro de compilação; se for recorrente, registrar como inconsistência com a convenção do curso.
6. Avaliar o código efetivamente entregue. Um relato de que outra versão foi testada não substitui a compilação da versão presente na entrega.
7. Se forem usados recursos ainda não estudados, avaliar primeiro se os requisitos foram atendidos, mas orientar a reescrita com os recursos permitidos.

## Nota para Aprovação

- **Aprovação:** mínimo de 7,0 pontos.
- **Abaixo de 7,0:** revisão obrigatória antes de avançar.
