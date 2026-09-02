# Mini-Projeto: Painel de Desempenho de Treinos

## Objetivo

Analisar uma semana de treinos modelada como array de objetos, escolhendo cada método pelo resultado necessário.

## Arquivo

Crie `exercicios/solucoes/painel-treinos.ts`.

## Dados iniciais

```typescript
const treinos: {
  dia: string;
  duracao: number;
  realizado: boolean;
}[] = [
  { dia: "segunda", duracao: 32, realizado: true },
  { dia: "terça", duracao: 0, realizado: false },
  { dia: "quarta", duracao: 45, realizado: true },
  { dia: "quinta", duracao: 18, realizado: true },
  { dia: "sexta", duracao: 0, realizado: false },
  { dia: "sábado", duracao: 36, realizado: true },
];
```

## Requisitos obrigatórios

Crie e exiba:

1. `treinosRealizados`: objetos com `realizado === true` e `duracao > 0`;
2. `resumos`: uma string por treino realizado no formato `segunda: 32 min`;
3. `diasLongos`: dias dos treinos realizados com duração `>= 30`, usando encadeamento;
4. `primeiroTreinoCurto`: primeiro treino realizado com duração `< 20`;
5. `indiceDaPrimeiraAusencia`: índice do primeiro treino não realizado;
6. `existeAcimaDeQuarenta`: se algum treino realizado dura mais de `40`;
7. `todosComQuinzeMinutos`: se existe ao menos um realizado e todos duram `>= 15`;
8. `totalRealizado`: soma das durações realizadas com `reduce` iniciado em `0`;
9. `comAquecimento`: novos objetos dos treinos realizados, com `5` minutos somados à duração;
10. `semanaEstendida`: novo array com spread e `{ dia: "domingo", duracao: 25, realizado: true }` no fim;
11. uma linha numerada para cada resumo usando `forEach`;
12. o array original depois de tudo, comprovando que não mudou.

## Saída conceitual esperada

```text
1. segunda: 32 min
2. quarta: 45 min
3. quinta: 18 min
4. sábado: 36 min
Dias longos: segunda,quarta,sábado
Primeiro curto: quinta
Índice da primeira ausência: 1
Existe acima de 40: true
Todos têm ao menos 15: true
Total realizado: 131
Durações com aquecimento: 37,50,23,41
Semana original: 6 objetos
Semana estendida: 7 objetos
```

## Construção guiada

### 1. Partir do que você já conhece

Com loop, a seleção começaria assim:

```typescript
const treinosRealizados: {
  dia: string;
  duracao: number;
  realizado: boolean;
}[] = [];

for (const treino of treinos) {
  if (treino.realizado && treino.duracao > 0) {
    treinosRealizados.push(treino);
  }
}
```

Neste capítulo, a controladora pronta é `filter`:

```typescript
const treinosRealizados = treinos.filter(
  (treino) => treino.realizado && treino.duracao > 0,
);
```

### 2. Transformar objetos em strings

```typescript
const resumos = treinosRealizados.map(
  (treino) => `${treino.dia}: ${treino.duracao} min`,
);
```

Entrada intermediária: objeto[]. Retorno: string[]. A quantidade permanece quatro.

### 3. Encadear seleção e transformação

```typescript
const diasLongos = treinosRealizados
  .filter((treino) => treino.duracao >= 30)
  .map((treino) => treino.dia);
```

Antes do `map`, existem três objetos: segunda, quarta e sábado.

### 4. Buscar valor e posição

```typescript
const primeiroTreinoCurto = treinosRealizados.find(
  (treino) => treino.duracao < 20,
);

const indiceDaPrimeiraAusencia = treinos.findIndex(
  (treino) => !treino.realizado,
);
```

O primeiro retorno é objeto ou `undefined`; o segundo é índice ou `-1`.

### 5. Verificar o domínio

```typescript
const existeAcimaDeQuarenta = treinosRealizados.some(
  (treino) => treino.duracao > 40,
);

const todosComQuinzeMinutos =
  treinosRealizados.length > 0 &&
  treinosRealizados.every((treino) => treino.duracao >= 15);
```

O teste de `length` evita considerar uma semana sem treinos como uma semana em que “todos os treinos” cumprem a meta.

### 6. Acumular

```typescript
const totalRealizado = treinosRealizados.reduce(
  (total, treino) => total + treino.duracao,
  0,
);
```

Rastreamento: `0 → 32 → 77 → 95 → 131`.

### 7. Criar objetos novos

```typescript
const comAquecimento = treinosRealizados.map((treino) => ({
  ...treino,
  duracao: treino.duracao + 5,
}));
```

Sem `...treino`, o novo objeto perderia `dia` e `realizado`. Sem os parênteses externos, a arrow não devolveria o literal como expressão concisa.

### 8. Estender a coleção

```typescript
const semanaEstendida = [
  ...treinos,
  { dia: "domingo", duracao: 25, realizado: true },
];
```

Complete as saídas e o `forEach` sem consultar uma solução pronta.

## Testes obrigatórios visíveis

Mantenha os dados principais e crie também, no mesmo arquivo:

```typescript
const semanaSemTreinos: {
  dia: string;
  duracao: number;
  realizado: boolean;
}[] = [
  { dia: "segunda", duracao: 0, realizado: false },
];

const semanaVazia: {
  dia: string;
  duracao: number;
  realizado: boolean;
}[] = [];
```

Comprove:

- `find` retorna `undefined` quando não existe treino realizado;
- `findIndex` retorna `-1` no array vazio;
- `some` retorna `false`;
- `every` sozinho retorna `true` no vazio;
- `length > 0 && every(...)` retorna `false`;
- `reduce` iniciado em `0` retorna `0`.

## Checklist

- [ ] Nomeei coleção no plural e item no singular.
- [ ] Escolhi o método pelo retorno necessário.
- [ ] Tratei `undefined` e `-1`.
- [ ] Usei valor inicial no `reduce`.
- [ ] Sei o tipo do intermediário em cada encadeamento.
- [ ] Criei novos objetos ao alterar a duração.
- [ ] Mantive os testes principal e alternativos visíveis.
- [ ] Confirmei que `treinos` não mudou.
