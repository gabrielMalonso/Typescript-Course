# Aula 04 — Mini-projeto: Analisador de semana de estudos

## Objetivo

Construir um programa que recebe as durações de estudo de uma semana e separa o trabalho em funções pequenas:

```text
duracoes
   │
   ├─→ somarDuracoes ─→ total
   ├─→ contarSessoesValidas ─→ quantidade
   │
   └──────── total + quantidade ─→ calcularMedia
                                      │
                         criarResumo ←┘
                              │
                         exibirResumo
```

O projeto combina arrays e loops já conhecidos com os fundamentos de funções. Não use métodos avançados de arrays nem callbacks.

## Requisitos

Crie `06-funcoes-fundamentos/exercicios/solucoes/mini-projeto.ts`.

Use este conjunto inicial:

```typescript
const duracoes: number[] = [35, 0, 50, 25, 0, 40, 30];
```

O valor `0` significa que não houve sessão naquele dia.

### 1. `somarDuracoes`

Contrato:

```typescript
function somarDuracoes(valores: number[]): number
```

Percorra o array e retorne a soma apenas dos valores maiores que `0`.

### 2. `contarSessoesValidas`

Contrato:

```typescript
function contarSessoesValidas(valores: number[]): number
```

Retorne quantos valores são maiores que `0`.

### 3. `calcularMedia`

Contrato:

```typescript
const calcularMedia = (total: number, quantidade: number): number => {
  // implementação
};
```

Se `quantidade` for `0`, retorne `0`. Caso contrário, retorne `total / quantidade`.

### 4. `criarResumo`

Use uma expressão de função:

```typescript
const criarResumo = function (
  total: number,
  quantidade: number,
  media: number,
): string {
  // implementação
};
```

Retorne uma única string no formato:

```text
Total: 180 min | Sessões: 5 | Média: 36 min
```

### 5. `exibirResumo`

Crie uma arrow function `void` que recebe uma `string` e a exibe.

### 6. Programa principal

Fora das funções:

1. chame `somarDuracoes`;
2. chame `contarSessoesValidas`;
3. passe os dois resultados para `calcularMedia`;
4. passe os três resultados para `criarResumo`;
5. passe a string final para `exibirResumo`.

## Resultado esperado

```text
Total: 180 min | Sessões: 5 | Média: 36 min
```

## Esqueleto

```typescript
const duracoes: number[] = [35, 0, 50, 25, 0, 40, 30];

function somarDuracoes(valores: number[]): number {
  // crie um acumulador, percorra e retorne
}

function contarSessoesValidas(valores: number[]): number {
  // crie um contador, percorra e retorne
}

const calcularMedia = (total: number, quantidade: number): number => {
  // proteja a divisão por zero e retorne
};

const criarResumo = function (
  total: number,
  quantidade: number,
  media: number,
): string {
  // retorne a string
};

const exibirResumo = (resumo: string): void => {
  // exiba o resumo
};

// programa principal
```

O esqueleto não compila enquanto os retornos estiverem ausentes. Isso é esperado durante a construção; complete uma função por vez.

## Testes obrigatórios

Depois do caso principal, substitua temporariamente o array e preveja o resultado antes de executar:

### Teste A — Uma sessão

```typescript
const duracoes: number[] = [0, 45, 0];
```

Resultado: total `45`, quantidade `1`, média `45`.

### Teste B — Nenhuma sessão

```typescript
const duracoes: number[] = [];
```

Resultado: total `0`, quantidade `0`, média `0`.

## Checklist

- [ ] Cada função tem uma única responsabilidade clara.
- [ ] Parâmetros e retornos estão tipados.
- [ ] As duas primeiras funções não dependem da constante externa `duracoes`.
- [ ] `calcularMedia` evita divisão por zero.
- [ ] `criarResumo` retorna a string em vez de exibi-la.
- [ ] `exibirResumo` é `void`.
- [ ] As chamadas estão no programa principal, fora das definições.
- [ ] Os três conjuntos de dados foram previstos e testados.
