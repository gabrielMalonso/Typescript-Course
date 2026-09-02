# Gabarito Interno — Capítulo 09: Arrays — Métodos Avançados

> Uso exclusivo do professor. Não publicar no leitor.

## Critérios gerais

- Priorizar escolha do método, contrato da callback, valores intermediários e preservação dos originais.
- Cobrar item singular e uso da coleção correta quando a troca provocar erro conceitual.
- Cobrar tratamento de `undefined`, `-1`, vazio e valor inicial do `reduce`.
- Diferenças cosméticas não impedem aprovação, salvo quando o formato é requisito funcional.

## Exercícios — resultados essenciais

| Exercício | Resultado / conceito obrigatório |
|---|---|
| 1.1 | três linhas; `forEach` retorna `void`; vazio não exibe |
| 1.2 | `[32, 68, 86]`; `[-40]`; referências diferentes |
| 1.3 | `[12, 0, 25, 8]`; duas remoções; alternativa `[]` |
| 1.4 | `[false, true, false]`; `boolean[]`; mesma quantidade |
| 2.1 | objetos `P1` e `P4`; original com quatro |
| 2.2 | quatro strings; objeto vira string |
| 2.3 | `P3`; índice `3`; ausências `undefined` e `-1` tratadas |
| 2.4 | `true`, `true`, `false`; vazio `false`/`true`; regra com `length` |
| 3.1 | total `35`; vazio `0`; acumulador `0 → 20 → 20 → 35` |
| 3.2 | referência nomeada usada em `filter` e `some`; array e boolean |
| 3.3 | array novo; primeiro objeto compartilhado na cópia por spread; objetos novos no `map` |
| 3.4 | intermediários `[20, 40]` e `[5, 10, 20]`; finais `[10, 20]` e `[20]` |
| 3.5 | ativos, nomes, Prensa, índice 1, `true`, `true`, total `360`, cópias sem mutação |
| Bônus | closures independentes para 80 e 150; referências válidas em `filter` |

## Prova — teoria

### Questão 1 — 1,0

- coleção: `produtos`;
- `produto`: um objeto do array em cada chamada;
- `filter` espera `boolean`;
- intermediário: `[{ nome: "Broca", ativo: true }]`, mesmo tipo de objeto em array;
- final: `["Broca"]`, `string[]`.

### Questão 2 — 1,0

- `forEach` retorna `void`;
- `map` produz `N` resultados;
- `filter` produz `0..N` elementos;
- `find` para no primeiro `true`; `some`, no primeiro `true`;
- `return` encerra somente a callback atual do `forEach`; o método continua.

### Questão 3 — 1,0

Resultados: `false`, `true`, `false`. Spread cria novo array, mas preserva referências internas; `map` com spread cria cada objeto. Parênteses fazem `{ ...item }` ser uma expressão objeto retornada.

### Questão 4 — 1,0

| chamada | acumulador | pedido | devolvido |
|---:|---:|---|---:|
| 1 | 0 | ativo, `2 × 10` | 20 |
| 2 | 20 | inativo, `1 × 50` | 20 |
| 3 | 20 | ativo, `3 × 5` | 35 |

Resultado `35`; `0` é o valor inicial e define o caso vazio.

## Prova — prática

### Questão 5 — 1,25

```typescript
const velocidades: number[] = [0, 36, 72, -1, 18];
// Intermediário: [36, 72, 18]
const validas = velocidades.filter((velocidade) => velocidade > 0);
const metrosPorSegundo = velocidades
  .filter((velocidade) => velocidade > 0)
  .map((velocidade) => velocidade / 3.6);
```

Cobrar intermediário, `[10, 20, 5]`, original e encadeamento.

### Questão 6 — 1,25

Resultados: objeto `T3`, índice `1`, `false`, `true`, busca `T9` como `undefined` tratada em `if/else`.

### Questão 7 — 1,5

```typescript
const copiaDoArray = [...tarefas];
const copiaDosObjetos = tarefas.map((tarefa) => ({ ...tarefa }));
```

Comparações: `false`, `true`, `false`. Depois da alteração, original `false`, cópia `true`.

### Questão 8 — 2,0

```typescript
function ordemValida(ordem: {
  codigo: string;
  quantidade: number;
  preco: number;
  aprovada: boolean;
}): boolean {
  return ordem.aprovada && ordem.quantidade > 0;
}

const resumos = ordens
  .filter(ordemValida)
  .map((ordem) => ({
    codigo: ordem.codigo,
    total: ordem.quantidade * ordem.preco,
  }));

const primeiraAlta = resumos.find((resumo) => resumo.total >= 50);
const todosPositivos = resumos.every((resumo) => resumo.total > 0);
const total = resumos.reduce((soma, resumo) => soma + resumo.total, 0);
```

Cobrar função por referência, intermediário A1/D4, resumos `20`/`50`, busca D4, `true`, `70`, `forEach`, original e vazio `undefined`/`true`/`0`.

## Pontuação

| Parte | Pontos |
|---|---:|
| Teoria | 4,0 |
| Prática | 6,0 |
| **Total** | **10,0** |
