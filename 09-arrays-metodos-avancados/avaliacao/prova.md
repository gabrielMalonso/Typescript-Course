# Prova — Capítulo 09: Arrays — Métodos Avançados

> **PROVA PREPARADA, MAS AINDA NÃO LIBERADA.**
>
> Realize somente após concluir as aulas, o mini-projeto, a lista e receber a liberação do professor.

## Informações

- **Duração sugerida:** 75–90 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos
- **Composição:** 4 pontos de teoria e 6 pontos de prática

## Orientações

- Não altere este enunciado.
- Use apenas conteúdos estudados até o Capítulo 09.
- Não use loops explícitos nas questões práticas.
- Use valor inicial em todo `reduce`.
- Registre previsões antes de executar quando solicitado.
- Compile, execute e teste exatamente os arquivos entregues.

## Arquivos obrigatórios

| Arquivo | Conteúdo |
|---|---|
| `resposta.md` | Questões 1 a 4 |
| `questao05.ts` | Questão 5 |
| `questao06.ts` | Questão 6 |
| `questao07.ts` | Questão 7 |
| `questao08.ts` | Questão 8 |

Todos devem ficar em `09-arrays-metodos-avancados/avaliacao/`.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1 — Escolha do método (1 ponto)

Para cada objetivo, indique o método mais direto e explique brevemente:

1. criar um novo array com uma conversão para cada elemento;
2. manter somente elementos aprovados por uma condição;
3. descobrir se existe ao menos um valor inválido;
4. obter o primeiro índice que atende a uma regra;
5. combinar todos os números em um total.

### Questão 2 — Retorno, quantidade e mutação (1 ponto)

Compare `forEach`, `map` e `filter`:

1. qual retorna `void`?
2. qual cria um array com a mesma quantidade da entrada?
3. qual pode criar um array de zero até `N` elementos?
4. `map` e `filter` alteram o array original por si próprios?
5. por que usar `console.log` dentro de `map` não substitui devolver o valor transformado?

### Questão 3 — Ausência e arrays vazios (1 ponto)

Sem executar, informe os quatro resultados e explique os marcadores de ausência:

```typescript
const valores: number[] = [];

const encontrado = valores.find((valor) => valor > 10);
const indice = valores.findIndex((valor) => valor > 10);
const existe = valores.some((valor) => valor > 10);
const todos = valores.every((valor) => valor > 10);
```

Como você representaria “a lista possui ao menos um valor e todos são maiores que 10”?

### Questão 4 — Rastreamento do `reduce` (1 ponto)

Considere:

```typescript
const resultado = [3, 5, 2].reduce(
  (acumulador, valor) => acumulador + valor * 2,
  10,
);
```

Monte uma tabela com o acumulador recebido, o valor atual e o acumulador devolvido em cada chamada. Informe o resultado final e explique o papel do `10`.

---

## Parte 2 — Prática (6 pontos)

### Questão 5 — Seleção e transformação (1,25 ponto)

Crie `questao05.ts` com:

```typescript
const velocidades: number[] = [0, 35, 52, 18, 61];
```

1. Crie `velocidadesValidas` mantendo valores maiores que `0`.
2. Crie `velocidadesEmMetrosPorSegundo` transformando as válidas com `valor / 3.6`.
3. Exiba os dois arrays e o original.
4. Em comentário, informe a quantidade de elementos depois de cada etapa e explique por que o original não muda.

Não arredonde os resultados.

### Questão 6 — Busca e verificação (1,25 ponto)

Crie `questao06.ts` com:

```typescript
const niveis: number[] = [40, 55, 72, 68, 90];
```

Crie e exiba:

1. o primeiro nível maior ou igual a `70` com `find`;
2. o índice do primeiro nível maior ou igual a `70` com `findIndex`;
3. se existe nível maior que `85` com `some`;
4. se todos os níveis estão entre `0` e `100`, inclusive, com `every`.

Em comentários, registre os retornos previstos antes de executar e explique o que mudaria se nenhum valor atendesse à busca.

### Questão 7 — Total e cópia independente (1,5 ponto)

Crie `questao07.ts` com:

```typescript
const parcelas: number[] = [20, 35, 15];
```

1. Some as parcelas com `reduce` e valor inicial `0`.
2. Crie `parcelasComTaxa` como novo array contendo `...parcelas` e `5` no fim.
3. Altere o primeiro elemento de `parcelasComTaxa` para `25`.
4. Some `parcelasComTaxa` com outro `reduce` iniciado em `0`.
5. Exiba os dois arrays, os dois totais e `parcelas === parcelasComTaxa`.
6. Explique em comentário por que a alteração não atingiu `parcelas`.

Resultados esperados: total original `70`, total com taxa e alteração `80`, comparação `false`.

### Questão 8 — Pipeline de medições (2 pontos)

Crie `questao08.ts` com:

```typescript
const medicoes: number[] = [12, -1, 25, 8, 30, -1, 18];
```

O valor `-1` representa medição inválida.

1. Em um único encadeamento, mantenha medições válidas (`>= 0`) e multiplique cada uma por `2`; guarde em `medicoesProcessadas`.
2. Registre em comentário o array intermediário entre as duas etapas.
3. Em `medicoesProcessadas`, encontre o primeiro valor maior que `40`.
4. Verifique se todos os valores processados são não negativos.
5. Some os valores processados com `reduce` iniciado em `0`.
6. Use `forEach` para exibir cada valor processado com posição humana.
7. Exiba a busca, o boolean, o total e o array original.

Resultados principais:

- intermediário: `[12, 25, 8, 30, 18]`;
- processado: `[24, 50, 16, 60, 36]`;
- primeiro maior que `40`: `50`;
- todos não negativos: `true`;
- total: `186`;
- original inalterado.

## Checklist de entrega

- [ ] Preservei `prova.md`.
- [ ] Respondi às quatro questões teóricas em `resposta.md`.
- [ ] Criei os quatro arquivos TypeScript pedidos.
- [ ] Não usei loops explícitos.
- [ ] Usei valor inicial em cada `reduce`.
- [ ] Registrei previsões e valor intermediário pedidos.
- [ ] Compilei e executei a versão entregue.
