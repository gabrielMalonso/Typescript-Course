# Gabarito Interno — Capítulo 09: Arrays — Métodos Avançados

> Uso exclusivo do professor. Não publicar no leitor.

## Critérios gerais

- Priorizar escolha correta do método, tipo do retorno, valores, ordem e tratamento de ausência.
- Diferenças cosméticas de rótulos não impedem aprovação.
- Cobrar `return` quando a callback usa chaves e precisa produzir resultado.
- Cobrar valor inicial em `reduce`, pois é objetivo explícito do capítulo.
- Nos encadeamentos, o aluno deve conseguir informar o valor intermediário.

## Mini-projeto — referência

```typescript
const duracoes: number[] = [32, 18, 45, 27, 0, 36];

const treinosRealizados = duracoes.filter((duracao) => duracao > 0);
const duracoesComAquecimento = treinosRealizados.map((duracao) => duracao + 5);
const treinosLongosComAquecimento = treinosRealizados
  .filter((duracao) => duracao >= 30)
  .map((duracao) => duracao + 5);
const primeiroTreinoCurto = treinosRealizados.find((duracao) => duracao < 20);
const indiceDaAusencia = duracoes.findIndex((duracao) => duracao === 0);
const existeAcimaDeQuarenta = duracoes.some((duracao) => duracao > 40);
const todosComQuinzeMinutos = treinosRealizados.every((duracao) => duracao >= 15);
const totalRealizado = treinosRealizados.reduce(
  (total, duracao) => total + duracao,
  0,
);
const semanaEstendida = [...duracoes, 25];

treinosRealizados.forEach((duracao, indice) => {
  console.log(`Treino realizado ${indice + 1}: ${duracao} min`);
});

console.log(`Com aquecimento: ${duracoesComAquecimento}`);
console.log(`Longos com aquecimento: ${treinosLongosComAquecimento}`);
console.log(`Primeiro curto: ${primeiroTreinoCurto}`);
console.log(`Índice da ausência: ${indiceDaAusencia}`);
console.log(`Existe acima de 40: ${existeAcimaDeQuarenta}`);
console.log(`Todos têm ao menos 15: ${todosComQuinzeMinutos}`);
console.log(`Total realizado: ${totalRealizado}`);
console.log(`Semana original: ${duracoes}`);
console.log(`Semana estendida: ${semanaEstendida}`);
```

## Exercícios — resultados essenciais

| Exercício | Resultado / conceito obrigatório |
|---|---|
| 1.1 | Três linhas numeradas; `forEach` para efeito e retorno `void` |
| 1.2 | `[32, 68, 86]`; original intacto; `[-40] → [-40]` |
| 1.3 | `[12, 0, 25, 8]`; dois removidos; original intacto |
| 1.4 | `[false, true, false]`; `boolean[]`; mesma quantidade |
| 2.1 | `12`; alternativa trata `undefined` |
| 2.2 | índice `2`, posição humana `3`; alternativa trata `-1` |
| 2.3 | `true` e mensagem de bloqueio; alternativa `false` |
| 2.4 | principal `true`; vazio `true`; exigir `length > 0 && every(...)` |
| 3.1 | `40`; acumulador `0 → 15 → 35 → 40`; vazio `0` |
| 3.2 | `TS-06`; acumulador e valor inicial são strings |
| 3.3 | base `["B", "C"]`; completo `["A", "B2", "C", "D"]`; `false` |
| 3.4 | intermediário `[4, 10, 16]`; final `[12, 30, 48]` |
| 3.5 | resultados definidos no enunciado; no vazio: `[]`, `[]`, `undefined`, `-1`, `false`, `true`, `0`, `[10]` |
| Bônus | ambas as versões retornam `24`; comparação argumentada |

## Prova — Parte 1

### Questão 1 — 1,0

1. `map`: transforma cada elemento e cria novo array.
2. `filter`: mantém os elementos cuja callback devolve `true`.
3. `some`: responde se ao menos um atende à condição.
4. `findIndex`: retorna o primeiro índice ou `-1`.
5. `reduce`: combina valores em um acumulador.

Dar 0,1 pelo método e 0,1 pela explicação em cada item.

### Questão 2 — 1,0

- `forEach` retorna `void`.
- `map` cria novo array com `N` elementos.
- `filter` cria novo array com `0..N` elementos.
- `map` e `filter` não alteram o original por si próprios.
- `console.log` retorna `undefined`; `map` precisa receber o valor transformado da callback.

Dar 0,2 por item.

### Questão 3 — 1,0

```text
encontrado: undefined
indice: -1
existe: false
todos: true
```

`find` representa ausência de valor com `undefined`; `findIndex`, ausência de posição com `-1`. `some` não encontra testemunha. `every` não encontra contraexemplo. Regra pedida:

```typescript
const valido = valores.length > 0 && valores.every((valor) => valor > 10);
```

### Questão 4 — 1,0

| chamada | acumulador | valor | devolvido |
|---:|---:|---:|---:|
| 1 | 10 | 3 | 16 |
| 2 | 16 | 5 | 26 |
| 3 | 26 | 2 | 30 |

Resultado `30`. O `10` é o valor inicial do acumulador e torna o comportamento explícito, inclusive no array vazio.

## Prova — Parte 2

### Questão 5 — 1,25

```typescript
const velocidades: number[] = [0, 35, 52, 18, 61];
const velocidadesValidas = velocidades.filter((velocidade) => velocidade > 0);
const velocidadesEmMetrosPorSegundo = velocidadesValidas.map(
  (velocidade) => velocidade / 3.6,
);

console.log(velocidadesValidas);
console.log(velocidadesEmMetrosPorSegundo);
console.log(velocidades);
```

| Critério | Pontos |
|---|---:|
| `filter` correto | 0,30 |
| `map` e fórmula corretos | 0,30 |
| arrays e original exibidos | 0,20 |
| quantidades e não mutação explicadas | 0,20 |
| compila e executa | 0,25 |

### Questão 6 — 1,25

```typescript
const niveis: number[] = [40, 55, 72, 68, 90];
const primeiroNivelAlto = niveis.find((nivel) => nivel >= 70);
const indiceDoPrimeiroAlto = niveis.findIndex((nivel) => nivel >= 70);
const existeAcimaDeOitentaECinco = niveis.some((nivel) => nivel > 85);
const todosNaFaixa = niveis.every((nivel) => nivel >= 0 && nivel <= 100);

console.log(primeiroNivelAlto); // 72
console.log(indiceDoPrimeiroAlto); // 2
console.log(existeAcimaDeOitentaECinco); // true
console.log(todosNaFaixa); // true
```

| Critério | Pontos |
|---|---:|
| `find` e retorno | 0,25 |
| `findIndex` e retorno | 0,25 |
| `some` correto | 0,20 |
| `every` com limites inclusivos | 0,20 |
| previsões e ausências explicadas | 0,15 |
| compila e executa | 0,20 |

### Questão 7 — 1,5

```typescript
const parcelas: number[] = [20, 35, 15];
const totalOriginal = parcelas.reduce((total, parcela) => total + parcela, 0);
const parcelasComTaxa = [...parcelas, 5];
parcelasComTaxa[0] = 25;
const totalComTaxa = parcelasComTaxa.reduce(
  (total, parcela) => total + parcela,
  0,
);

console.log(parcelas);
console.log(parcelasComTaxa);
console.log(totalOriginal);
console.log(totalComTaxa);
console.log(parcelas === parcelasComTaxa);
```

| Critério | Pontos |
|---|---:|
| primeiro `reduce`, inicial `0`, total `70` | 0,30 |
| spread e alteração somente na cópia | 0,30 |
| segundo `reduce`, inicial `0`, total `80` | 0,30 |
| arrays e comparação `false` exibidos | 0,20 |
| explicação da nova referência | 0,15 |
| compila e executa | 0,25 |

### Questão 8 — 2,0

```typescript
const medicoes: number[] = [12, -1, 25, 8, 30, -1, 18];

// Intermediário após filter: [12, 25, 8, 30, 18]
const medicoesProcessadas = medicoes
  .filter((medicao) => medicao >= 0)
  .map((medicao) => medicao * 2);

const primeiraAcimaDeQuarenta = medicoesProcessadas.find(
  (medicao) => medicao > 40,
);
const todasNaoNegativas = medicoesProcessadas.every((medicao) => medicao >= 0);
const total = medicoesProcessadas.reduce(
  (acumulador, medicao) => acumulador + medicao,
  0,
);

medicoesProcessadas.forEach((medicao, indice) => {
  console.log(`Medição ${indice + 1}: ${medicao}`);
});

console.log(primeiraAcimaDeQuarenta);
console.log(todasNaoNegativas);
console.log(total);
console.log(medicoes);
```

| Critério | Pontos |
|---|---:|
| encadeamento `filter` → `map` | 0,40 |
| intermediário e processado corretos | 0,25 |
| `find` retorna `50` | 0,20 |
| `every` retorna `true` | 0,20 |
| `reduce` com inicial `0` retorna `186` | 0,30 |
| `forEach` e posição humana | 0,20 |
| original exibido e intacto | 0,15 |
| compila e executa | 0,30 |

## Total da prova

| Parte | Pontos |
|---|---:|
| Teoria | 4,0 |
| Prática | 6,0 |
| **Total** | **10,0** |
