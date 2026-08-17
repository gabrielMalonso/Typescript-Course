# Exercícios — Capítulo 07: Objetos

## Orientações

- Crie cada solução em `exercicios/solucoes/` com o nome indicado.
- Declare os tipos inline quando o enunciado pedir forma explícita.
- Registre em comentário a previsão das saídas antes de executar.
- Teste pelo menos o caso principal e o caso alternativo solicitado.
- Use apenas fundamentos, condicionais, loops, arrays, funções e objetos deste capítulo.
- Não use `type`, `interface`, classes, callbacks nem métodos avançados de arrays.

## Bloco 1 — Literal, acesso e mutação

### Exercício 1.1 — Ficha simples (`ex11.ts`)

Crie `livro` com:

- `titulo: string`
- `autor: string`
- `paginas: number`

Valores: `"O hobbit"`, `"Tolkien"`, `310`. Exiba as três propriedades com notação de ponto. Em comentário, identifique o objeto e o tipo de uma propriedade isolada.

### Exercício 1.2 — Alterar campos (`ex12.ts`)

Crie `const marcador: { pagina: number; concluido: boolean }` com `pagina: 1` e `concluido: false`. Atualize para `pagina: 12` e `concluido: true`. Exiba os dois campos depois da alteração.

Em comentário, explique por que `const` permitiu essas atribuições e o que seria rejeitado.

### Exercício 1.3 — Ponto versus colchetes (`ex13.ts`)

Crie `clima: { cidade: string; temperatura: number }` com `"Curitiba"` e `14`. Exiba `cidade` com ponto. Depois, declare `const campo = "temperatura"` e exiba o valor usando colchetes.

Em comentário, explique o que `clima.campo` procuraria.

### Exercício 1.4 — Tipo do objeto (`ex14.ts`)

Declare `peca` com tipo explícito `{ codigo: string; massa: number }` e valores `"M-4"` e `1.25`. Exiba os dois campos.

Em comentário, registre:

1. o que aconteceria se o literal incluísse `cor: "cinza"` na mesma atribuição;
2. por que `peca.massa = "1.25"` seria rejeitado.

Não deixe o código inválido compilando; os dois casos ficam só no comentário.

## Bloco 2 — Opcionais, aninhamento e métodos

### Exercício 2.1 — Propriedade opcional (`ex21.ts`)

Crie `alerta: { mensagem: string; codigo?: number }` apenas com `mensagem: "Falha de leitura"`. Exiba `alerta.codigo ?? "sem código"`.

Depois atribua `codigo: 503` e exiba de novo com o mesmo fallback.

Saídas conceituais: `sem código` e `503`.

### Exercício 2.2 — Objeto aninhado (`ex22.ts`)

Crie `consulta` com:

- `paciente: string`
- `horario: { data: string; hora: string }`

Valores: `"Helena"`, `"2026-08-17"`, `"09:30"`. Exiba `consulta.horario.hora`. Altere a hora para `"10:15"` e exiba novamente.

Não substitua o objeto `horario` inteiro; altere só a propriedade interna.

### Exercício 2.3 — Método (`ex23.ts`)

Crie `conta` com `saldo: 100` e um método `depositar(valor: number): number` que:

- soma `valor` a `this.saldo` somente quando `valor > 0`;
- devolve o saldo resultante em qualquer caso.

Chame `depositar(40)` e `depositar(-10)`. Exiba os dois retornos e, no fim, `conta.saldo`.

Saídas conceituais: `140`, `140` e `140`.

### Exercício 2.4 — Função que lê um objeto (`ex24.ts`)

Crie:

```typescript
function criarEtiqueta(item: { nome: string; quantidade: number }): string
```

A função deve retornar `Parafuso × 8` para `{ nome: "Parafuso", quantidade: 8 }`. Use destructuring no parâmetro. Exiba também o resultado para `{ nome: "Arruela", quantidade: 0 }`.

Em comentário, explique por que a função não precisa conhecer outras propriedades que o objeto original possa ter.

## Bloco 3 — Spread, destructuring e arrays de objetos

### Exercício 3.1 — Spread versus alias (`ex31.ts`)

Use:

```typescript
const original = {
  nome: "Motor",
  potencia: 120,
};
```

1. Crie `alias = original` e altere `alias.potencia` para `80`.
2. Exiba `original.potencia` e `alias === original`.
3. Crie outro objeto `originalParaCopia`, também com `nome: "Motor"` e `potencia: 120`, e faça `copia` com spread.
4. Altere `copia.potencia` para `150`.
5. Exiba `originalParaCopia.potencia`, `copia.potencia` e `copia === originalParaCopia`.

Comente a diferença entre os dois casos.

### Exercício 3.2 — Destructuring (`ex32.ts`)

Crie `viagem: { destino: string; dias: number; diaria: number }` com `"Gramado"`, `4` e `220`. Extraia `destino` e `dias` por destructuring, calcule `custo = dias * diaria` e exiba `Gramado: 880`.

Renomeie `destino` para `cidade` no destructuring e use `cidade` na saída. Teste também `dias: 0`; o custo deve ser `0`.

### Exercício 3.3 — Percorrer fichas (`ex33.ts`)

Crie `somarEstoque(itens: { quantidade: number }[]): number` com `for...of`. Some somente quantidades maiores que `0`.

Teste:

```typescript
[
  { nome: "Parafuso", quantidade: 10 },
  { nome: "Porca", quantidade: 0 },
  { nome: "Arruela", quantidade: 4 },
]
```

e `[]`. Exiba `14` e `0`. Não modifique os arrays; exiba-os depois das chamadas para comprovar.

### Exercício 3.4 — Atualização sem mutação (`ex34.ts`)

Crie:

```typescript
function aplicarDesconto(
  produto: { nome: string; preco: number },
  percentual: number,
): { nome: string; preco: number }
```

Regras:

- se `percentual <= 0`, devolva uma cópia com o mesmo preço;
- caso contrário, devolva um objeto novo com o preço reduzido;
- não altere `produto`.

Use `{ nome: "Broca", preco: 40 }` com `10` e depois com `0`. Exiba os preços novos e o preço original após as duas chamadas.

Saídas conceituais: `36`, `40` e `40`.

## Bônus — Painel de sensores (`bonus.ts`)

Crie um array de sensores:

```typescript
const sensores: {
  id: string;
  valor: number;
  unidade: string;
  ativo: boolean;
  local: { sala: string };
  nota?: string;
}[] = [
  { id: "T1", valor: 21, unidade: "°C", ativo: true, local: { sala: "A" } },
  { id: "T2", valor: -3, unidade: "°C", ativo: true, local: { sala: "B" }, nota: "recalibrar" },
  { id: "P1", valor: 1.8, unidade: "bar", ativo: false, local: { sala: "A" } },
];
```

Crie:

```typescript
function contarAtivos(itens: { ativo: boolean }[]): number
function somarValoresAtivos(itens: { valor: number; ativo: boolean }[]): number
function criarResumo(item: {
  id: string;
  valor: number;
  unidade: string;
  nota?: string;
}): string
```

`somarValoresAtivos` só inclui sensores com `ativo === true`. `criarResumo` usa destructuring e `nota ?? "sem nota"`, no formato `T1: 21 °C | sem nota`.

Exiba a quantidade de ativos, a soma dos valores ativos e o resumo de cada sensor ativo, percorrendo com `for...of`. Depois teste um array sem nenhum ativo.

## Checklist de entrega

- [ ] Entreguei os 12 arquivos obrigatórios.
- [ ] Tipos inline foram usados quando pedidos.
- [ ] Diferenciei objeto, propriedade e referência.
- [ ] Spread e mutação não foram confundidos.
- [ ] Testei limites, zeros, ausências e arrays vazios quando solicitado.
- [ ] Não usei conteúdo dos capítulos 08, 09, 11 ou 13.
