# Capítulo 03 — Operadores e Estruturas Condicionais: Exemplos

## Exemplo 1: Consumo médio e precedência

```typescript
const consumoTurnoA = 18;
const consumoTurnoB = 24;
const consumoTurnoC = 21;
const consumoMedio = (consumoTurnoA + consumoTurnoB + consumoTurnoC) / 3;

console.log(`Consumo médio: ${consumoMedio} kWh`);
```

Os parênteses fazem a soma completa acontecer antes da divisão. A saída é:

```text
Consumo médio: 21 kWh
```

## Exemplo 2: Atualização de estoque

```typescript
let quantidadeEmEstoque = 40;

quantidadeEmEstoque += 12;
quantidadeEmEstoque -= 7;

console.log(`Estoque final: ${quantidadeEmEstoque}`);
```

O estoque começa em 40, recebe 12 e perde 7. A saída é `Estoque final: 45`.

## Exemplo 3: Limite de pressão

```typescript
const pressaoAtual = 8.7;
const pressaoMaxima = 8.5;

if (pressaoAtual > pressaoMaxima) {
  console.log("Alerta: pressão acima do limite.");
} else {
  console.log("Pressão dentro do limite.");
}
```

`pressaoAtual > pressaoMaxima` produz `true`, então apenas o primeiro bloco é executado.

## Exemplo 4: Liberação com duas condições

```typescript
const temperaturaSegura = true;
const protecaoFechada = true;
const operacaoLiberada = temperaturaSegura && protecaoFechada;

if (operacaoLiberada) {
  console.log("Operação liberada.");
} else {
  console.log("Operação bloqueada.");
}
```

Como a regra exige as duas condições, usamos `&&`.

## Exemplo 5: Classificação por faixas

```typescript
const percentualDoTanque = 64;

if (percentualDoTanque >= 80) {
  console.log("Nível alto");
} else if (percentualDoTanque >= 30) {
  console.log("Nível operacional");
} else {
  console.log("Nível baixo");
}
```

A primeira condição é falsa e a segunda é verdadeira. O programa exibe `Nível operacional` e para de testar a cadeia.

## Exemplo 6: Estado com ternário

```typescript
const ensaioAprovado = false;
const estadoDoEnsaio = ensaioAprovado ? "Aprovado" : "Reprovado";

console.log(`Estado: ${estadoDoEnsaio}`);
```

O ternário é adequado porque escolhe apenas um de dois textos.

## Exemplo 7: Plano de manutenção com `switch`

```typescript
const prioridade: string = "media";

switch (prioridade) {
  case "alta":
    console.log("Atendimento imediato");
    break;
  case "media":
    console.log("Atendimento em até 24 horas");
    break;
  case "baixa":
    console.log("Incluir na próxima parada");
    break;
  default:
    console.log("Prioridade inválida");
}
```

`switch` é claro aqui porque `prioridade` é comparada com alternativas exatas.

## Exemplo 8: Valor ausente com `??`

```typescript
const nomeDoResponsavel: undefined = undefined;
const responsavelExibido = nomeDoResponsavel ?? "Não informado";

console.log(`Responsável: ${responsavelExibido}`);
```

Como o valor é `undefined`, o texto alternativo é usado.

## Exemplo integrado: partida de um compressor

```typescript
const pressaoAtual = 6.5;
const pressaoMinima = 5;
const pressaoMaxima = 8;
const protecaoFechada = true;
const manutencaoPendente = false;

const pressaoValida = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const podePartir = pressaoValida && protecaoFechada && !manutencaoPendente;

if (podePartir) {
  console.log("Compressor liberado para partida.");
} else {
  console.log("Partida bloqueada.");
}
```

Leia a regra em camadas:

```text
pressão >= mínima E pressão <= máxima
                 │
                 ▼
pressão válida E proteção fechada E NÃO há manutenção
                 │
                 ▼
              pode partir
```

## Desafio rápido

Crie `desafio-rapido.ts` para uma carga de `82` kg e um limite de `100` kg:

1. calcule a margem restante com subtração;
2. crie `cargaSegura` comparando a carga com o limite;
3. use um ternário para produzir `Dentro do limite` ou `Acima do limite`;
4. exiba exatamente:

```text
Margem: 18 kg
Estado: Dentro do limite
```
