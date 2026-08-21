# Aula 03 — Exemplos progressivos

Antes de executar cada exemplo, preveja a saída e localize o ponto exato em que o callback é chamado.

## Exemplo 1 — Valor padrão

```typescript
function registrarEvento(evento: string, origem = "sistema"): string {
  return `[${origem}] ${evento}`;
}

console.log(registrarEvento("iniciado"));
console.log(registrarEvento("concluído", "operador"));
```

Saída:

```text
[sistema] iniciado
[operador] concluído
```

## Exemplo 2 — Opcional com teste explícito

```typescript
function identificarPeca(nome: string, lote?: number): string {
  if (lote === undefined) {
    return `${nome} | sem lote`;
  }

  return `${nome} | lote ${lote}`;
}

console.log(identificarPeca("Válvula"));
console.log(identificarPeca("Rolamento", 0));
```

Saída:

```text
Válvula | sem lote
Rolamento | lote 0
```

O teste usa `=== undefined`; o lote `0` existe e não deve ser tratado como ausência.

## Exemplo 3 — Rest parameters

```typescript
function media(nome: string, ...leituras: number[]): string {
  let total = 0;

  for (const leitura of leituras) {
    total += leitura;
  }

  const resultado = leituras.length === 0 ? 0 : total / leituras.length;
  return `${nome}: ${resultado}`;
}

console.log(media("Sensor A", 10, 20, 30));
console.log(media("Sensor B"));
```

Saída:

```text
Sensor A: 20
Sensor B: 0
```

## Exemplo 4 — Callback `void`

```typescript
function repetirAcao(
  vezes: number,
  acao: (numero: number) => void,
): void {
  for (let numero = 1; numero <= vezes; numero += 1) {
    acao(numero);
  }
}

repetirAcao(3, (numero): void => {
  console.log(`Etapa ${numero}`);
});
```

Saída:

```text
Etapa 1
Etapa 2
Etapa 3
```

`repetirAcao` decide quantas chamadas haverá. O callback decide o efeito de cada chamada.

## Exemplo 5 — Callback com retorno

```typescript
function calcularResultado(
  a: number,
  b: number,
  operacao: (primeiro: number, segundo: number) => number,
): number {
  return operacao(a, b);
}

const diferenca = calcularResultado(
  18,
  7,
  (primeiro, segundo): number => primeiro - segundo,
);

console.log(diferenca);
```

Saída:

```text
11
```

## Exemplo 6 — Mesma controladora, regras diferentes

```typescript
function aprovarLeitura(
  valor: number,
  regra: (valor: number) => boolean,
): string {
  return regra(valor) ? "aprovada" : "reprovada";
}

const positiva = aprovarLeitura(12, (valor): boolean => valor > 0);
const abaixoDoLimite = aprovarLeitura(
  12,
  (valor): boolean => valor < 10,
);

console.log(positiva);
console.log(abaixoDoLimite);
```

Saída:

```text
aprovada
reprovada
```

Os dados não mudaram. O comportamento mudou porque o callback mudou.

## Exemplo 7 — Array de objetos e callback

```typescript
function contarPorRegra(
  pecas: { nome: string; estoque: number; critica: boolean }[],
  regra: (peca: { nome: string; estoque: number; critica: boolean }) => boolean,
): number {
  let quantidade = 0;

  for (const peca of pecas) {
    if (regra(peca)) {
      quantidade += 1;
    }
  }

  return quantidade;
}

const pecas = [
  { nome: "Válvula", estoque: 2, critica: true },
  { nome: "Arruela", estoque: 40, critica: false },
  { nome: "Correia", estoque: 0, critica: true },
];

const semEstoque = contarPorRegra(
  pecas,
  (peca): boolean => peca.estoque === 0,
);

const criticas = contarPorRegra(
  pecas,
  (peca): boolean => peca.critica,
);

console.log(semEstoque);
console.log(criticas);
```

Saída:

```text
1
2
```

Importante: o resultado conta objetos que atendem à regra. Ele não soma `estoque`.

## Exemplo 8 — Produzir um novo array manualmente

```typescript
function gerarDescricoes(
  equipamentos: { codigo: string; horas: number }[],
  descrever: (equipamento: { codigo: string; horas: number }) => string,
): string[] {
  const descricoes: string[] = [];

  for (const equipamento of equipamentos) {
    descricoes.push(descrever(equipamento));
  }

  return descricoes;
}

const descricoes = gerarDescricoes(
  [
    { codigo: "M-1", horas: 120 },
    { codigo: "M-2", horas: 45 },
  ],
  (equipamento): string => `${equipamento.codigo}: ${equipamento.horas} h`,
);

for (const descricao of descricoes) {
  console.log(descricao);
}
```

Saída:

```text
M-1: 120 h
M-2: 45 h
```

## Exemplo 9 — Callback nomeado e reutilizado

```typescript
function estaAtrasada(ordem: { prazo: number; concluida: boolean }): boolean {
  return ordem.prazo < 0 && !ordem.concluida;
}

function contarOrdens(
  ordens: { prazo: number; concluida: boolean }[],
  criterio: (ordem: { prazo: number; concluida: boolean }) => boolean,
): number {
  let total = 0;

  for (const ordem of ordens) {
    if (criterio(ordem)) {
      total += 1;
    }
  }

  return total;
}

const ordens = [
  { prazo: -2, concluida: false },
  { prazo: -1, concluida: true },
  { prazo: 3, concluida: false },
];

console.log(contarOrdens(ordens, estaAtrasada));
```

Saída:

```text
1
```

## Exemplo 10 — Closure configurável

```typescript
function criarRegraDeEstoque(
  minimo: number,
): (produto: { nome: string; estoque: number }) => boolean {
  return (produto): boolean => produto.estoque < minimo;
}

const abaixoDeCinco = criarRegraDeEstoque(5);

console.log(abaixoDeCinco({ nome: "Filtro", estoque: 3 }));
console.log(abaixoDeCinco({ nome: "Óleo", estoque: 8 }));
```

Saída:

```text
true
false
```

A função interna lembra de `minimo = 5`.

## Exemplo 11 — IIFE isolada

```typescript
const versao = (() => {
  const principal = 2;
  const revisao = 1;
  return `${principal}.${revisao}`;
})();

console.log(versao);
```

Saída:

```text
2.1
```

`versao` guarda a string retornada, não a função: a função já foi chamada pelos últimos `()`.

## Desafio de previsão

Sem executar, diga a saída e explique cada contrato:

```typescript
function processar(
  valores: number[],
  transformar: (valor: number) => number,
): number {
  let total = 0;

  for (const valor of valores) {
    total += transformar(valor);
  }

  return total;
}

const fator = 3;
const resultado = processar([2, 4], (valor): number => valor * fator);

console.log(resultado);
```

Perguntas:

1. Qual é o tipo de `transformar`?
2. Quantas vezes o callback é chamado?
3. Quais argumentos ele recebe?
4. Qual valor externo a arrow function utiliza?
5. Qual é o tipo de `resultado`?
