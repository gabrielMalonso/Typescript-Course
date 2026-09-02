# Exercícios — Capítulo 09: Arrays — Métodos Avançados

## Instruções gerais

- Resolva na ordem apresentada em `exercicios/solucoes/`.
- Não use loops explícitos, exceto quando o enunciado pedir comparação.
- Use somente conteúdos estudados até este capítulo.
- Mantenha casos principal e alternativo visíveis no mesmo arquivo.
- Nas previsões pedidas, registre tipo e valor antes de executar.
- Nomeie coleções no plural e o item da callback no singular.
- Use valor inicial em todo `reduce`.
- Compile isoladamente com `npx tsc --strict --noEmit --target ES2022 arquivo.ts`.

## Nível 1 — Reconhecer cada método

### Exercício 1.1 — Inspeção numerada

**Arquivo:** `ex11.ts`

Use `forEach` em `["planejar", "construir", "testar"]` para exibir `1. planejar`. Explique por que seu retorno é `void`. Repita com um array vazio e comprove que nenhuma linha adicional aparece.

### Exercício 1.2 — Conversão de temperatura

**Arquivo:** `ex12.ts`

Use `map` para converter `[0, 20, 30]` de Celsius para Fahrenheit com `celsius * 1.8 + 32`. Exiba o original, o novo array e a comparação entre as referências.

Resultados: `[32, 68, 86]` e `false`. Faça também `[-40] → [-40]` no mesmo arquivo.

### Exercício 1.3 — Leituras válidas

**Arquivo:** `ex13.ts`

Use `filter` em `[12, -1, 0, 25, -3, 8]` para manter valores `>= 0`. Exiba resultado, quantidade removida e original. Faça também `[-1, -2]`, que deve produzir array vazio e duas remoções.

### Exercício 1.4 — Tipo transformado

**Arquivo:** `ex14.ts`

Use `map` em `[3, 8, 11]` para criar um `boolean[]` indicando se cada número é par. Explique por que o tipo pode mudar e a quantidade permanece três.

Resultado: `[false, true, false]`.

## Nível 2 — Aplicar a arrays de objetos

Use estes dados nos exercícios 2.1 a 2.4:

```typescript
const produtos: {
  codigo: string;
  nome: string;
  estoque: number;
  ativo: boolean;
}[] = [
  { codigo: "P1", nome: "Broca", estoque: 8, ativo: true },
  { codigo: "P2", nome: "Serra", estoque: 0, ativo: true },
  { codigo: "P3", nome: "Lixa", estoque: 12, ativo: false },
  { codigo: "P4", nome: "Disco", estoque: 5, ativo: true },
];
```

### Exercício 2.1 — Seleção de disponíveis

**Arquivo:** `ex21.ts`

Use o método adequado para criar outro array apenas com produtos ativos e `estoque > 0`. Exiba os códigos e comprove que `produtos` continua com quatro objetos.

Resultado: `P1` e `P4`.

### Exercício 2.2 — Etiquetas de estoque

**Arquivo:** `ex22.ts`

Transforme cada produto em uma string `P1 — Broca: 8`. Registre o tipo do item antes e depois do método e explique por que a quantidade continua quatro.

### Exercício 2.3 — Busca com duas ausências

**Arquivo:** `ex23.ts`

Encontre o objeto de código `P3` e o índice de `P4`. Depois procure `P9` das duas formas. Trate `undefined` com `if/else` e só calcule posição humana quando o índice for diferente de `-1`.

### Exercício 2.4 — Perguntas booleanas

**Arquivo:** `ex24.ts`

Responda com os métodos mais diretos:

1. existe produto ativo sem estoque?
2. todos os produtos possuem estoque não negativo?
3. todos os produtos ativos possuem estoque positivo?
4. em um array vazio, quais são os retornos de `some` e `every`?
5. como exigir ao mesmo tempo uma lista não vazia e todos válidos?

Resultados principais: `true`, `true`, `false`.

## Nível 3 — Integrar contratos, objetos e referências

### Exercício 3.1 — Total de pedidos válidos

**Arquivo:** `ex31.ts`

Use:

```typescript
const pedidos: {
  codigo: string;
  quantidade: number;
  preco: number;
  cancelado: boolean;
}[] = [
  { codigo: "A1", quantidade: 2, preco: 10, cancelado: false },
  { codigo: "B2", quantidade: 1, preco: 30, cancelado: true },
  { codigo: "C3", quantidade: 3, preco: 5, cancelado: false },
];
```

Com um único `reduce`, some `quantidade * preco` apenas dos não cancelados. Registre o acumulador depois de cada objeto. Resultado: `35`. Repita com array vazio: `0`.

### Exercício 3.2 — Callback nomeada reutilizada

**Arquivo:** `ex32.ts`

Crie uma função nomeada:

```typescript
function disponivel(produto: {
  codigo: string;
  nome: string;
  estoque: number;
  ativo: boolean;
}): boolean
```

Ela deve aceitar somente produto ativo com estoque positivo. Passe a referência para `filter` e `some`, sem chamá-la antecipadamente. Explique o contrato recebido pelos dois métodos e os tipos dos dois retornos.

### Exercício 3.3 — Cópia do array versus cópia dos objetos

**Arquivo:** `ex33.ts`

Use:

```typescript
const sensores: { codigo: string; ativo: boolean }[] = [
  { codigo: "T1", ativo: true },
  { codigo: "T2", ativo: false },
];
```

1. crie `copiaDoArray` com `[...sensores]`;
2. comprove que o array é novo, mas o primeiro objeto é compartilhado;
3. crie `copiaDosObjetos` com `map` + spread;
4. comprove que o primeiro objeto também é novo;
5. altere `copiaDosObjetos[0].ativo` e mostre que `sensores[0].ativo` permanece `true`.

### Exercício 3.4 — A ordem altera a regra

**Arquivo:** `ex34.ts`

Em `[10, 20, 40]`, faça dois encadeamentos:

1. mantenha valores `>= 20` e depois aplique desconto de `50%`;
2. aplique o desconto primeiro e depois mantenha resultados `>= 20`.

Resultados: `[10, 20]` e `[20]`. Registre os dois intermediários e explique por que diferem.

### Exercício 3.5 — Painel de equipamentos

**Arquivo:** `ex35.ts`

Use:

```typescript
const equipamentos: {
  nome: string;
  horas: number;
  ativo: boolean;
}[] = [
  { nome: "Torno", horas: 120, ativo: true },
  { nome: "Fresa", horas: 80, ativo: false },
  { nome: "Prensa", horas: 200, ativo: true },
  { nome: "Serra", horas: 40, ativo: true },
];
```

Escolha os métodos, sem arquitetura pronta, para produzir:

- objetos ativos;
- nomes dos ativos;
- primeiro ativo com pelo menos `150` horas;
- índice do primeiro inativo;
- existência de ativo acima de `100` horas;
- confirmação de que todos possuem horas não negativas;
- total de horas dos ativos;
- cópias dos ativos com `10` horas adicionais, sem alterar os originais;
- uma linha numerada para cada cópia.

Faça também o caso abaixo e preveja todos os retornos:

```typescript
const equipamentosVazios: {
  nome: string;
  horas: number;
  ativo: boolean;
}[] = [];
```

## Bônus — Critério configurável

**Arquivo:** `bonus.ts`

Crie uma closure `criarMinimoDeHoras(minimo)` que devolve um callback para objetos com `horas: number`. Gere critérios de `80` e `150` horas e use cada referência em `filter` sobre `equipamentos`.

Explique quando o valor mínimo é definido, quando é reutilizado e por que `filter(criarMinimoDeHoras(80))` é válido, mas `filter(criarMinimoDeHoras(80)(equipamentos[0]))` entregaria um boolean.

## Checklist final

- [ ] Escolhi cada método pela pergunta e pelo retorno.
- [ ] Nomeei coleção no plural e item no singular.
- [ ] Tratei `undefined`, `-1` e array vazio.
- [ ] Usei valor inicial em todo `reduce`.
- [ ] Registrei os valores intermediários dos encadeamentos.
- [ ] Diferenciei novo array de novos objetos.
- [ ] Passei callbacks por referência quando solicitado.
- [ ] Mantive casos principal e alternativo visíveis.
- [ ] Confirmei quando o original permanece intacto.
