# Capítulo 03 — Operadores e Estruturas Condicionais: Teoria

## Objetivos de aprendizagem

Ao final desta aula, você conseguirá transformar regras escritas em português em expressões booleanas e caminhos de execução.

## O modelo mental do capítulo

Imagine um sistema de proteção de uma bomba. Ele recebe pressão, temperatura e estado do sensor. Os operadores transformam esses dados em respostas; a estrutura condicional escolhe uma ação.

```text
pressão = 9.2
limite = 8.5
     │
     ▼
pressão > limite ──► true ──► exibir alerta
```

Uma **expressão** é um trecho que produz um valor:

```typescript
const area = largura * altura;
const acimaDoLimite = pressao > limite;
```

Uma **condição** é uma expressão interpretada como verdadeira ou falsa. Uma estrutura condicional decide qual bloco executar a partir desse resultado.

```typescript
if (acimaDoLimite) {
  console.log("Pressão acima do limite.");
}
```

## Operadores aritméticos

| Operador | Operação | Exemplo | Resultado |
|---|---|---|---:|
| `+` | soma | `10 + 4` | `14` |
| `-` | subtração | `10 - 4` | `6` |
| `*` | multiplicação | `10 * 4` | `40` |
| `/` | divisão | `10 / 4` | `2.5` |
| `%` | resto | `10 % 4` | `2` |
| `**` | potência | `10 ** 2` | `100` |

O resto `%` responde quanto sobra de uma divisão inteira. Ele é útil para descobrir se um número é par:

```typescript
const numero = 18;
const numeroPar = numero % 2 === 0;
```

O resultado de `18 % 2` é `0`; comparar esse resultado com zero produz `true`.

## Precedência

Expressões não são avaliadas apenas da esquerda para a direita. Potência vem antes de multiplicação e divisão, que vêm antes de soma e subtração.

```typescript
const resultadoA = 10 + 2 * 3;
const resultadoB = (10 + 2) * 3;
```

`resultadoA` vale `16`; `resultadoB` vale `36`. Parênteses tornam a intenção explícita e mudam a ordem quando necessário.

## Operadores de atribuição

Quando uma variável precisa mudar, podemos combinar a operação e a atribuição:

```typescript
let estoque = 20;
estoque += 5;
estoque -= 3;
```

As duas formas abaixo são equivalentes:

```typescript
estoque = estoque + 5;
estoque += 5;
```

Também existem `*=`, `/=` e `%=`. Eles exigem `let`, pois reatribuem a variável.

## Operadores de comparação

Comparações produzem `boolean`:

```typescript
const temperatura = 78;
const limite = 75;

const acimaDoLimite = temperatura > limite;
const exatamenteNoLimite = temperatura === limite;
const dentroDoLimite = temperatura <= limite;
```

| Operador | Pergunta |
|---|---|
| `===` | os valores e seus tipos são iguais? |
| `!==` | os valores ou seus tipos são diferentes? |
| `>` | o valor da esquerda é maior? |
| `<` | o valor da esquerda é menor? |
| `>=` | é maior ou igual? |
| `<=` | é menor ou igual? |

JavaScript também possui `==` e `!=`, que podem converter tipos antes da comparação. No JavaScript puro, por exemplo, `5 == "5"` resulta em `true`, enquanto `5 === "5"` resulta em `false`. O TypeScript pode alertar sobre comparações entre tipos incompatíveis; neste curso, prefira sempre `===` e `!==`.

## Operadores lógicos

Operadores lógicos combinam ou invertem condições:

| Operador | Significado | Resultado verdadeiro quando... |
|---|---|---|
| `&&` | E | as duas condições são verdadeiras |
| `\|\|` | OU | pelo menos uma condição é verdadeira |
| `!` | NÃO | a condição original é falsa |

```typescript
const temperaturaSegura = temperatura <= 75;
const sensorAtivo = true;
const operacaoPermitida = temperaturaSegura && sensorAtivo;
```

Leia a expressão em voz alta: “a temperatura está segura **e** o sensor está ativo”. Isso reduz erros com condições compostas.

### Curto-circuito

Em `A && B`, se `A` já for falso, `B` não precisa ser avaliado. Em `A || B`, se `A` já for verdadeiro, `B` não precisa ser avaliado. Por enquanto, use esse conhecimento para ler o fluxo; efeitos práticos mais avançados aparecerão depois.

## `if`, `else if` e `else`

Um `if` executa seu bloco somente quando a condição é verdadeira:

```typescript
if (pressao > limite) {
  console.log("Alerta de pressão.");
}
```

`else` define o caminho alternativo:

```typescript
if (pressao > limite) {
  console.log("Alerta de pressão.");
} else {
  console.log("Pressão normal.");
}
```

Quando existem três ou mais faixas, use `else if`:

```typescript
if (temperatura > 90) {
  console.log("Crítica");
} else if (temperatura >= 70) {
  console.log("Atenção");
} else {
  console.log("Normal");
}
```

A ordem importa. Apenas o primeiro bloco cuja condição for verdadeira é executado.

## Condições aninhadas

Um `if` pode existir dentro de outro, mas o aninhamento aumenta o esforço de leitura:

```typescript
if (sistemaLigado) {
  if (sensorAtivo) {
    console.log("Monitoramento ativo.");
  }
}
```

Quando a regra couber em uma expressão clara, `&&` costuma ser mais direto:

```typescript
if (sistemaLigado && sensorAtivo) {
  console.log("Monitoramento ativo.");
}
```

## Operador ternário

O ternário escolhe entre dois valores:

```typescript
const estado = pressao <= limite ? "Normal" : "Alerta";
```

Leia como: “a pressão está dentro do limite? então `Normal`; caso contrário, `Alerta`”. Use-o para decisões simples. Para regras com várias ações ou caminhos, prefira `if`.

## `switch`

`switch` compara um único valor com alternativas conhecidas:

```typescript
const turno = "B";

switch (turno) {
  case "A":
    console.log("Manhã");
    break;
  case "B":
    console.log("Tarde");
    break;
  default:
    console.log("Turno inválido");
}
```

`break` encerra o caso atual. Sem ele, a execução continua no próximo caso, comportamento chamado *fall-through*.

## Truthy e falsy

Uma condição não precisa ser escrita como `boolean`. JavaScript converte valores ao decidir o caminho.

São falsy:

- `false`;
- `0`;
- `""`;
- `null`;
- `undefined`;
- `NaN`.

Os demais valores são geralmente truthy, incluindo strings como `"false"` e `"0"`.

```typescript
const nomeDoOperador = "";

if (nomeDoOperador) {
  console.log("Operador identificado.");
} else {
  console.log("Nome não informado.");
}
```

Condições explícitas costumam comunicar melhor a regra do domínio, especialmente no início.

## Nullish coalescing: `??`

`??` fornece um valor alternativo apenas quando o valor da esquerda é `null` ou `undefined`:

```typescript
const observacao: null = null;
const textoDaObservacao = observacao ?? "Sem observação";
```

Diferentemente de `||`, `??` preserva valores válidos como `0`, `false` e `""`.

## Encadeamento opcional: `?.`

`?.` tenta acessar algo somente se o valor anterior não for `null` nem `undefined`. Ele será muito mais útil quando estudarmos objetos:

```typescript
const codigo = "BX-20";
const quantidadeDeCaracteres = codigo?.length;
```

Por enquanto, o objetivo é reconhecer a sintaxe e sua finalidade. Não criaremos objetos apenas para praticá-la antes do capítulo apropriado.

## Estratégia para resolver regras

Antes de escrever código, divida o problema:

1. Quais são os dados?
2. Qual resultado precisa ser calculado?
3. Qual comparação produz a condição?
4. Há mais de uma condição? Elas usam E, OU ou NÃO?
5. Quantos caminhos existem?
6. Cada caminho produz um valor ou executa várias instruções?

Essa sequência ajuda a escolher entre ternário, `if` e `switch` sem decorar receitas.
