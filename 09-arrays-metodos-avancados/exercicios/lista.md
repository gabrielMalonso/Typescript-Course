# Exercícios — Capítulo 09: Arrays — Métodos Avançados

## Instruções gerais

- Resolva na ordem apresentada.
- Crie os arquivos diretamente em `09-arrays-metodos-avancados/exercicios/`.
- Não use loops explícitos, exceto se o enunciado pedir uma comparação.
- Use somente os conteúdos estudados até este capítulo.
- Antes de executar, registre em comentário o tipo e o valor previstos para cada resultado.
- Faça o teste alternativo indicado e restaure os dados principais.
- Diferenças cosméticas de texto não são o foco; tipos, valores, ordem e comportamento são.
- Para compilar um arquivo isolado, use `npx tsc --strict --noEmit --target ES2022 arquivo.ts`.

## Nível 1 — Percorrer, transformar e filtrar

### Exercício 1.1 — Inspeção numerada

**Arquivo:** `ex11.ts`

Use:

```typescript
const etapas: string[] = ["planejar", "construir", "testar"];
```

Com `forEach`, exiba cada etapa no formato `1. planejar`. Depois, explique em comentário por que `forEach` é adequado e qual é seu retorno.

**Teste alternativo:** array vazio; nenhuma linha deve ser exibida.

### Exercício 1.2 — Conversão de temperatura

**Arquivo:** `ex12.ts`

Use `map` para converter `[0, 20, 30]` de Celsius para Fahrenheit com `celsius * 1.8 + 32`. Exiba o original e o novo array.

**Resultado:** `[32, 68, 86]`.

**Teste alternativo:** `[-40]`; o resultado deve ser `[-40]`.

### Exercício 1.3 — Leituras válidas

**Arquivo:** `ex13.ts`

Use `filter` em `[12, -1, 0, 25, -3, 8]` para manter valores maiores ou iguais a `0`. Exiba o resultado, a quantidade removida e o original.

**Resultado filtrado:** `[12, 0, 25, 8]`.

**Teste alternativo:** `[-1, -2]`; o resultado deve ser vazio e a quantidade removida deve ser `2`.

### Exercício 1.4 — Tipo transformado

**Arquivo:** `ex14.ts`

Use `map` em `[3, 8, 11]` para criar um `boolean[]` indicando se cada número é par. Exiba o resultado e responda em comentário por que `map` pode produzir outro tipo, mas conserva a quantidade.

**Resultado:** `[false, true, false]`.

## Nível 2 — Buscar e verificar

### Exercício 2.1 — Primeira prioridade

**Arquivo:** `ex21.ts`

Use `find` em `[3, 8, 12, 5]` para obter o primeiro valor maior ou igual a `10`. Exiba o valor.

**Teste alternativo:** `[3, 8]`; trate `undefined` com um `if/else` e exiba `Nenhuma prioridade encontrada`.

### Exercício 2.2 — Índice de um código

**Arquivo:** `ex22.ts`

Use `findIndex` em `["AA", "BC", "DX", "EF"]` para buscar `"DX"`. Se encontrado, exiba a posição humana; caso contrário, exiba uma mensagem de ausência.

**Resultado principal:** posição `3`.

**Teste alternativo:** busque `"ZZ"`; o índice deve ser `-1` e nenhuma posição humana deve ser calculada como válida.

### Exercício 2.3 — Existe bloqueio?

**Arquivo:** `ex23.ts`

Use `some` em `["ok", "ok", "bloqueado", "ok"]` para verificar se existe `"bloqueado"`. Exiba o boolean e uma mensagem condicional.

**Teste alternativo:** todos os valores `"ok"`; o boolean deve ser `false`.

### Exercício 2.4 — Todos dentro da faixa?

**Arquivo:** `ex24.ts`

Use `every` em `[18, 22, 25, 19]` para verificar se todos os valores estão entre `18` e `25`, inclusive.

Depois teste um array vazio e registre em comentário:

1. o retorno de `every`;
2. por que ele ocorre;
3. como exigir ao mesmo tempo uma lista não vazia e todos os valores válidos.

## Nível 3 — Acumular, copiar e encadear

### Exercício 3.1 — Soma segura

**Arquivo:** `ex31.ts`

Use `reduce` com valor inicial `0` para somar `[15, 20, 5]`. Em comentário, registre o acumulador após cada elemento.

**Resultado:** `40`.

**Teste alternativo:** array vazio; o resultado deve ser `0` sem erro.

### Exercício 3.2 — Construção de código

**Arquivo:** `ex32.ts`

Use `reduce` com valor inicial `""` para unir `["TS", "-", "06"]` em uma única string.

**Resultado:** `TS-06`.

Explique em comentário por que o tipo do acumulador é `string`.

### Exercício 3.3 — Cópia e extensão

**Arquivo:** `ex33.ts`

Use:

```typescript
const base: string[] = ["B", "C"];
```

Crie `completo` como `["A", ...base, "D"]`. Altere `completo[1]` para `"B2"` e exiba os dois arrays e a comparação `base === completo`.

Explique por que `base` continua `["B", "C"]`.

### Exercício 3.4 — Filtrar e transformar

**Arquivo:** `ex34.ts`

Use um encadeamento em `[4, 7, 10, 13, 16]` para:

1. manter apenas os pares;
2. multiplicar cada valor mantido por `3`.

**Resultado:** `[12, 30, 48]`.

Registre em comentário o array intermediário e explique por que inverter `filter` e `map` mudaria a regra avaliada.

### Exercício 3.5 — Relatório completo

**Arquivo:** `ex35.ts`

Use:

```typescript
const consumos: number[] = [0, 12, 18, 7, 25];
```

Crie e exiba:

- `consumosRegistrados`: somente maiores que `0`;
- `consumosEmDobro`: transformação dos registrados;
- `primeiroAlto`: primeiro valor original maior que `15`;
- `indiceDoPrimeiroZero`: índice do primeiro `0`;
- `existeAcimaDeVinte`: com `some`;
- `todosNaoNegativos`: com `every`;
- `totalRegistrado`: com `reduce` iniciado em `0`;
- `copiaComFechamento`: spread de `consumos` seguido de `10`.

**Resultados principais:** `[12, 18, 7, 25]`, `[24, 36, 14, 50]`, `18`, `0`, `true`, `true`, `62` e `[0, 12, 18, 7, 25, 10]`.

**Teste alternativo:** `[]`; preveja todos os retornos antes de executar.

## Bônus — Duas implementações, uma escolha

**Arquivo:** `bonus.ts`

Calcule a soma dos números pares de `[2, 5, 8, 11, 14]` de duas formas:

1. `filter` seguido de `reduce`;
2. um único `reduce` com condicional dentro da callback.

As duas devem produzir `24`. Em comentário, compare legibilidade e número de arrays intermediários. Não existe uma resposta universal: justifique qual versão você escolheria neste caso.

## Checklist final

- [ ] Sei o retorno de cada método usado.
- [ ] Tratei `undefined` e `-1` como ausências diferentes.
- [ ] Usei `map` para transformar e `filter` para selecionar.
- [ ] Usei valor inicial em todo `reduce`.
- [ ] Consigo prever os valores intermediários dos encadeamentos.
- [ ] Confirmei quando o array original permanece intacto.
- [ ] Restaurei os dados principais após os testes alternativos.
