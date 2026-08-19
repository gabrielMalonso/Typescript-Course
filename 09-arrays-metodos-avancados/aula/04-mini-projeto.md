# Mini-Projeto: Painel de Desempenho de Treinos

## Objetivo

Transformar uma lista de durações em um pequeno painel de análise, usando cada método para uma intenção específica.

## Conceitos aplicados

- `forEach` para exibição;
- `filter` para seleção;
- `map` para transformação;
- `find` e `findIndex` para busca;
- `some` e `every` para verificações;
- `reduce` para total;
- encadeamento;
- spread para criar uma nova lista.

## Arquivo

Crie `exercicios/painel-treinos.ts`.

## Estado inicial

```typescript
const duracoes: number[] = [32, 18, 45, 27, 0, 36];
```

O valor `0` representa um treino não realizado.

## Requisitos obrigatórios

1. Crie `treinosRealizados` mantendo apenas valores maiores que `0`.
2. Crie `duracoesComAquecimento` somando `5` a cada treino realizado.
3. Crie `treinosLongosComAquecimento` por encadeamento:
   - parta de `treinosRealizados`;
   - mantenha durações originais maiores ou iguais a `30`;
   - some `5` a cada valor mantido.
4. Encontre em `treinosRealizados` o primeiro treino menor que `20`.
5. Encontre o índice original do treino não realizado.
6. Verifique se existe treino original com duração maior que `40`.
7. Verifique se todos os treinos realizados possuem ao menos `15` minutos.
8. Some os minutos realizados com `reduce` e valor inicial `0`.
9. Crie `semanaEstendida` como novo array contendo `...duracoes` e um novo treino de `25` minutos no fim.
10. Use `forEach` para exibir as durações realizadas em posições humanas.
11. Exiba os demais resultados e os dois arrays finais.

## Saída conceitual esperada

```text
Treino realizado 1: 32 min
Treino realizado 2: 18 min
Treino realizado 3: 45 min
Treino realizado 4: 27 min
Treino realizado 5: 36 min
Com aquecimento: 37,23,50,32,41
Longos com aquecimento: 37,50,41
Primeiro curto: 18
Índice da ausência: 4
Existe acima de 40: true
Todos têm ao menos 15: true
Total realizado: 158
Semana original: 32,18,45,27,0,36
Semana estendida: 32,18,45,27,0,36,25
```

## Construção guiada

### 1. Limpar e transformar os dados

```typescript
const treinosRealizados = duracoes.filter((duracao) => duracao > 0);

const duracoesComAquecimento = treinosRealizados.map(
  (duracao) => duracao + 5,
);
```

`filter` pode reduzir a quantidade. `map` mantém a quantidade recebida.

### 2. Encadear duas etapas

```typescript
const treinosLongosComAquecimento = treinosRealizados
  .filter((duracao) => duracao >= 30)
  .map((duracao) => duracao + 5);
```

O filtro avalia as durações **antes** do aquecimento. O valor intermediário é `[32, 45, 36]`.

### 3. Buscar valor e posição

```typescript
const primeiroTreinoCurto = treinosRealizados.find(
  (duracao) => duracao < 20,
);

const indiceDaAusencia = duracoes.findIndex((duracao) => duracao === 0);
```

`primeiroTreinoCurto` possui tipo `number | undefined`. Com estes dados ele vale `18`, mas a possibilidade de ausência continua fazendo parte do tipo.

### 4. Fazer perguntas booleanas

```typescript
const existeAcimaDeQuarenta = duracoes.some((duracao) => duracao > 40);

const todosComQuinzeMinutos = treinosRealizados.every(
  (duracao) => duracao >= 15,
);
```

### 5. Acumular o total

```typescript
const totalRealizado = treinosRealizados.reduce(
  (total, duracao) => total + duracao,
  0,
);
```

Rastreamento do acumulador:

```text
0 → 32 → 50 → 95 → 122 → 158
```

### 6. Criar uma nova semana

```typescript
const semanaEstendida = [...duracoes, 25];
```

O array `duracoes` continua com seis elementos; `semanaEstendida` possui sete.

### 7. Exibir com `forEach`

```typescript
treinosRealizados.forEach((duracao, indice) => {
  console.log(`Treino realizado ${indice + 1}: ${duracao} min`);
});
```

Complete as demais saídas usando `console.log`.

## Testes obrigatórios

Depois de validar a versão principal, teste temporariamente:

### Todos os valores iguais a zero

```typescript
const duracoes: number[] = [0, 0];
```

Previsões:

- arrays derivados ficam vazios;
- buscas retornam `undefined` e índice `0` para a primeira ausência;
- `some` retorna `false`;
- `every` em `treinosRealizados` retorna `true`;
- o total retorna `0`;
- a semana estendida se torna `[0, 0, 25]`.

### Nenhuma ausência

```typescript
const duracoes: number[] = [15, 20];
```

`indiceDaAusencia` deve ser `-1`.

Restaure os dados principais antes da entrega.

## Checklist

- [ ] Escolhi o método pelo retorno necessário.
- [ ] Não alterei `duracoes`.
- [ ] Usei valor inicial no `reduce`.
- [ ] Consigo informar o array intermediário do encadeamento.
- [ ] Testei `undefined`, `-1` e array vazio.
- [ ] Restaurei os dados principais antes de entregar.
