# Aula 04 — Mini-projeto: Ficha de equipamento

## Objetivo

Construir um programa que representa um equipamento de laboratório como objeto, atualiza dados sem perder o original e resume uma pequena lista de fichas:

```text
equipamentoInicial
        │
        ├─→ criarEtiqueta
        ├─→ registrarUso ─→ equipamentoAtualizado
        │                         │
        └─────────────────────────┴─→ exibirFicha
                                            │
listaDeEquipamentos ─→ contarAtivos         │
                 └─→ somarHoras             │
```

O projeto combina objetos, funções, spread e um array de objetos. Não use `map`, `filter`, `find` nem callbacks.

## Requisitos

Crie `07-objetos/exercicios/solucoes/mini-projeto.ts`.

Use este conjunto inicial:

```typescript
const equipamentoInicial: {
  nome: string;
  codigo: string;
  horasDeUso: number;
  ativo: boolean;
  local: {
    laboratorio: string;
    bancada: number;
  };
  observacao?: string;
} = {
  nome: "Paquímetro digital",
  codigo: "EQ-17",
  horasDeUso: 120,
  ativo: true,
  local: {
    laboratorio: "Metrologia",
    bancada: 3,
  },
};
```

`observacao` começa ausente.

### 1. `criarEtiqueta`

Contrato:

```typescript
function criarEtiqueta(item: { nome: string; codigo: string }): string
```

Retorne `EQ-17 — Paquímetro digital` para o equipamento inicial. Extraia as duas propriedades por destructuring no parâmetro ou no corpo da função.

### 2. `registrarUso`

Contrato:

```typescript
function registrarUso(
  item: {
    nome: string;
    codigo: string;
    horasDeUso: number;
    ativo: boolean;
    local: {
      laboratorio: string;
      bancada: number;
    };
    observacao?: string;
  },
  horas: number,
): {
  nome: string;
  codigo: string;
  horasDeUso: number;
  ativo: boolean;
  local: {
    laboratorio: string;
    bancada: number;
  };
  observacao?: string;
}
```

Regras:

- se `horas` for `<= 0`, devolva uma cópia do objeto sem alterar as horas;
- caso contrário, devolva um objeto novo com `horasDeUso` somado;
- não mutar `item`.

Use spread para a cópia.

### 3. `exibirFicha`

Crie uma função `void` que recebe o objeto completo e exibe:

```text
EQ-17 — Paquímetro digital
Laboratório: Metrologia | Bancada: 3
Horas: 120 | Ativo: sim
Observação: sem nota
```

Use `ativo ? "sim" : "não"` e `observacao ?? "sem nota"`. A etiqueta deve vir de `criarEtiqueta`.

### 4. Programa principal da ficha

1. Exiba a ficha inicial.
2. Chame `registrarUso(equipamentoInicial, 8)` e guarde o retorno.
3. Exiba a ficha atualizada.
4. Exiba `equipamentoInicial.horasDeUso` para comprovar que o original permaneceu `120`.

### 5. Lista de equipamentos

Depois das exibições da ficha, declare:

```typescript
const equipamentos: {
  nome: string;
  horasDeUso: number;
  ativo: boolean;
}[] = [
  { nome: "Paquímetro digital", horasDeUso: 128, ativo: true },
  { nome: "Balança analítica", horasDeUso: 40, ativo: true },
  { nome: "Estufa", horasDeUso: 210, ativo: false },
];
```

Crie:

```typescript
function contarAtivos(itens: { ativo: boolean }[]): number
function somarHoras(itens: { horasDeUso: number; ativo: boolean }[]): number
```

`somarHoras` deve somar somente equipamentos com `ativo === true`. Percorra com `for...of`. Não altere o array.

Exiba:

```text
Ativos: 2 | Horas ativas: 168
```

## Resultado esperado

```text
EQ-17 — Paquímetro digital
Laboratório: Metrologia | Bancada: 3
Horas: 120 | Ativo: sim
Observação: sem nota
EQ-17 — Paquímetro digital
Laboratório: Metrologia | Bancada: 3
Horas: 128 | Ativo: sim
Observação: sem nota
120
Ativos: 2 | Horas ativas: 168
```

A linha `120` é a comprovação do objeto original.

## Esqueleto

```typescript
const equipamentoInicial: {
  nome: string;
  codigo: string;
  horasDeUso: number;
  ativo: boolean;
  local: {
    laboratorio: string;
    bancada: number;
  };
  observacao?: string;
} = {
  nome: "Paquímetro digital",
  codigo: "EQ-17",
  horasDeUso: 120,
  ativo: true,
  local: {
    laboratorio: "Metrologia",
    bancada: 3,
  },
};

function criarEtiqueta(item: { nome: string; codigo: string }): string {
  // extraia as propriedades e retorne a string
}

function registrarUso(
  item: {
    nome: string;
    codigo: string;
    horasDeUso: number;
    ativo: boolean;
    local: {
      laboratorio: string;
      bancada: number;
    };
    observacao?: string;
  },
  horas: number,
): {
  nome: string;
  codigo: string;
  horasDeUso: number;
  ativo: boolean;
  local: {
    laboratorio: string;
    bancada: number;
  };
  observacao?: string;
} {
  // proteja horas <= 0 e devolva uma cópia
}

function exibirFicha(item: {
  nome: string;
  codigo: string;
  horasDeUso: number;
  ativo: boolean;
  local: {
    laboratorio: string;
    bancada: number;
  };
  observacao?: string;
}): void {
  // monte as quatro linhas
}

function contarAtivos(itens: { ativo: boolean }[]): number {
  // percorra e conte
}

function somarHoras(itens: { horasDeUso: number; ativo: boolean }[]): number {
  // some apenas os ativos
}

const equipamentos: {
  nome: string;
  horasDeUso: number;
  ativo: boolean;
}[] = [
  { nome: "Paquímetro digital", horasDeUso: 128, ativo: true },
  { nome: "Balança analítica", horasDeUso: 40, ativo: true },
  { nome: "Estufa", horasDeUso: 210, ativo: false },
];

// programa principal
```

O esqueleto não precisa ser copiado à risca, mas os contratos e as saídas são obrigatórios.

## Testes obrigatórios

Depois do caso principal, substitua temporariamente os dados e preveja o resultado antes de executar:

### Teste A — Horas inválidas

```typescript
registrarUso(equipamentoInicial, 0);
registrarUso(equipamentoInicial, -5);
```

Os dois retornos devem manter `horasDeUso` em `120`. O original também permanece `120`.

### Teste B — Observação presente

Crie uma cópia com spread, incluindo `observacao: "calibração em agosto"`, e chame `exibirFicha`. A última linha deve mostrar essa observação, não `sem nota`.

### Teste C — Lista sem ativos

```typescript
const equipamentos = [
  { nome: "Estufa", horasDeUso: 210, ativo: false },
];
```

Resultado: `Ativos: 0 | Horas ativas: 0`.

## Checklist

- [ ] O tipo do equipamento inclui objeto aninhado e propriedade opcional.
- [ ] `criarEtiqueta` usa destructuring.
- [ ] `registrarUso` devolve um objeto novo e protege `horas <= 0`.
- [ ] `exibirFicha` é `void` e reutiliza `criarEtiqueta`.
- [ ] O original permanece com `120` horas após o registro de uso.
- [ ] A soma ignora equipamentos inativos, não apenas o exemplo da lista.
- [ ] Os três testes alternativos foram previstos e executados.
