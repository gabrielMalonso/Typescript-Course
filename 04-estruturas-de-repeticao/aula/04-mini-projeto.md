# Mini-Projeto: Planejador de Sessões de Estudo

## Objetivo

Construir um simulador que distribui sessões de estudo por semanas, registra pausas programadas e encerra o planejamento quando uma meta total é atingida.

O projeto usa apenas conceitos estudados até aqui. Não precisamos de arrays nem funções: o foco é controlar corretamente o fluxo dos loops.

## Conceitos aplicados

- `for` tradicional;
- loops aninhados;
- contador e acumulador;
- condições inclusivas;
- `continue` para pular uma sessão;
- `break` para encerrar ao atingir a meta;
- variável booleana para comunicar o término entre dois loops.

## Requisitos obrigatórios

Crie `exercicios/planejador-estudos.ts` com:

- `totalDeSemanas = 3`;
- `sessoesPorSemana = 4`;
- `metaDeSessoes = 8`;
- `semanaDePausa = 2`;
- `sessaoDePausa = 3`;
- um loop externo para as semanas;
- um loop interno para as sessões;
- `continue` para pular a sessão de pausa;
- `break` quando a meta for alcançada;
- uma mensagem final que informe o total planejado e se a meta foi atingida.

## Saída obrigatória

```text
=== PLANEJADOR DE ESTUDOS ===
Semana 1, sessão 1: planejada
Semana 1, sessão 2: planejada
Semana 1, sessão 3: planejada
Semana 1, sessão 4: planejada
Semana 2, sessão 1: planejada
Semana 2, sessão 2: planejada
Semana 2, sessão 3: pausa
Semana 2, sessão 4: planejada
Semana 3, sessão 1: planejada
Meta atingida!
Total planejado: 8
Objetivo concluído: true
```

## Passo 1: declarar os dados

```typescript
const totalDeSemanas = 3;
const sessoesPorSemana = 4;
const metaDeSessoes = 8;
const semanaDePausa = 2;
const sessaoDePausa = 3;

let sessoesPlanejadas = 0;
let metaAtingida = false;
```

As constantes representam regras fixas. As variáveis com `let` registram um estado que muda durante o planejamento.

## Passo 2: percorrer semanas e sessões

```typescript
for (let semana = 1; semana <= totalDeSemanas; semana++) {
  for (let sessao = 1; sessao <= sessoesPorSemana; sessao++) {
    console.log(`Semana ${semana}, sessão ${sessao}`);
  }
}
```

O loop interno recomeça em `1` para cada nova semana.

## Passo 3: tratar a pausa com `continue`

Dentro do loop interno, antes de contar a sessão:

```typescript
const pausaProgramada =
  semana === semanaDePausa && sessao === sessaoDePausa;

if (pausaProgramada) {
  console.log(`Semana ${semana}, sessão ${sessao}: pausa`);
  continue;
}
```

`continue` impede que a pausa seja somada como uma sessão planejada, mas não encerra o restante do cronograma.

## Passo 4: contar sessões válidas

Depois da verificação da pausa:

```typescript
sessoesPlanejadas++;
console.log(`Semana ${semana}, sessão ${sessao}: planejada`);
```

O acumulador aumenta apenas quando a sessão é válida.

## Passo 5: interromper ao atingir a meta

Ainda dentro do loop interno:

```typescript
if (sessoesPlanejadas >= metaDeSessoes) {
  metaAtingida = true;
  console.log("Meta atingida!");
  break;
}
```

Esse `break` encerra somente o loop interno. Por isso, o loop externo também precisa verificar `metaAtingida`:

```typescript
if (metaAtingida) {
  break;
}
```

Essa verificação deve ficar depois do fechamento do loop interno, mas ainda dentro do loop de semanas.

## Código final completo

Tente montar sozinho antes de consultar este bloco.

```typescript
const totalDeSemanas = 3;
const sessoesPorSemana = 4;
const metaDeSessoes = 8;
const semanaDePausa = 2;
const sessaoDePausa = 3;

let sessoesPlanejadas = 0;
let metaAtingida = false;

console.log("=== PLANEJADOR DE ESTUDOS ===");

for (let semana = 1; semana <= totalDeSemanas; semana++) {
  for (let sessao = 1; sessao <= sessoesPorSemana; sessao++) {
    const pausaProgramada =
      semana === semanaDePausa && sessao === sessaoDePausa;

    if (pausaProgramada) {
      console.log(`Semana ${semana}, sessão ${sessao}: pausa`);
      continue;
    }

    sessoesPlanejadas++;
    console.log(`Semana ${semana}, sessão ${sessao}: planejada`);

    if (sessoesPlanejadas >= metaDeSessoes) {
      metaAtingida = true;
      console.log("Meta atingida!");
      break;
    }
  }

  if (metaAtingida) {
    break;
  }
}

console.log(`Total planejado: ${sessoesPlanejadas}`);
console.log(`Objetivo concluído: ${metaAtingida}`);
```

## Como testar

### Teste 1: configuração original

Resultado esperado: a pausa ocorre na semana 2, sessão 3, e a meta é atingida na semana 3, sessão 1.

### Teste 2: meta pequena

Troque `metaDeSessoes` para `2`. O programa deve parar na semana 1, sessão 2.

### Teste 3: meta inalcançável

Troque `metaDeSessoes` para `20`. Todos os espaços disponíveis devem ser percorridos, e `Objetivo concluído` deve ser `false`.

### Teste 4: pausa logo no início

Troque `semanaDePausa` e `sessaoDePausa` para `1`. A primeira posição deve ser marcada como pausa sem aumentar o total.

## Perguntas de conferência

1. Por que o `continue` precisa aparecer antes de `sessoesPlanejadas++`?
2. Por que são necessários dois testes de `metaAtingida`?
3. O que mudaria se a condição da meta fosse `===` em vez de `>=`?
4. Quantas sessões válidas existem no máximo com a configuração original?

## Desafios de expansão

1. Adicione uma segunda pausa programada sem usar arrays.
2. Exiba quantas semanas foram parcialmente ou totalmente percorridas.
3. Crie um limite diário e use `continue` para ignorar sessões acima dele.
4. Reescreva uma versão simplificada usando `while` para as semanas.
