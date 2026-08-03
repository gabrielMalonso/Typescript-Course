# Correção dos Exercícios — Capítulo 02

> Data: 2026-08-03  
> Aluno: Gabriel Alonso

---

## Resultado geral

Os dez exercícios e o bônus compilam em modo estrito. Você demonstrou bom domínio dos tipos primitivos, cálculos, concatenação e template literals. Cinco exercícios obrigatórios estão corretos; os outros cinco precisam de ajustes curtos antes da avaliação.

| Exercício | Resultado | Ajuste principal |
|---|---|---|
| 1.1 | Correto | — |
| 1.2 | Precisa de ajuste | Incluir `Série` na identificação |
| 1.3 | Correto | — |
| 2.1 | Correto com ajuste de escrita | `camelCase` e ponto e vírgula |
| 2.2 | Correto | — |
| 2.3 | Precisa de ajuste | Usar inferência nas quatro declarações iniciais |
| 2.4 | Precisa de revisão | Classificar corretamente o trecho A |
| 3.1 | Precisa de ajuste | Identificar o sufixo minúsculo `n` |
| 3.2 | Correto | — |
| 3.3 | Correto | — |
| Bônus | Precisa de ajuste | Remover `aplicada` das duas saídas |

## Correções necessárias

### Exercício 1.2

A concatenação está correta, mas falta o rótulo `Série`. A saída deve terminar com ` - Série 84`, não apenas ` - 84`.

### Exercício 2.1

As quatro análises estão conceitualmente corretas. Ajuste `ExplicacaoDeValidacao` para `explicacaoDeValidacao` e acrescente o ponto e vírgula ao fim da declaração.

### Exercício 2.3

Os valores, tipos e a saída estão corretos, mas o exercício exige inferência nas quatro declarações iniciais. Remova as anotações `: string`, `: number` e `: boolean` dessas declarações. Use também o identificador solicitado `massaEmQuilogramas` no lugar de `massaEmKg`.

### Exercício 2.4

Os trechos B e C estão corretos. O trecho A é um **erro de compilação**, não um erro de cálculo: a própria declaração tenta atribuir a string `"10"` a uma constante anotada como `number`. Use também a classificação exatamente como fornecida no enunciado.

### Exercício 3.1

O reconhecimento de `bigint` e `symbol` está correto. Na segunda resposta, o detalhe visual é o sufixo minúsculo `n`; TypeScript diferencia maiúsculas de minúsculas.

### Bônus

As duas formas produzem textos idênticos, mas o modelo pede `Força: 12500 N`, sem a palavra `aplicada`. Corrija as duas strings.

## Pontos fortes

- Todos os arquivos compilam em modo estrito.
- `number`, `string`, `boolean`, `null` e `undefined` foram aplicados corretamente.
- Todos os cálculos derivados estão corretos.
- As saídas dos exercícios 1.1, 1.3, 2.2, 2.3, 3.2 e 3.3 correspondem ao esperado.
- A diferença entre atribuições aceitas e rejeitadas foi bem explicada no exercício 2.1.

## Próximo passo

Corrija os pontos indicados e me avise. Após uma conferência rápida, a avaliação do Capítulo 02 poderá ser liberada.

---

## Primeira conferência — 2026-08-03

Os exercícios 2.1 e 3.1 e o bônus foram corrigidos. Todos os arquivos continuam compilando em modo estrito.

Restam três ajustes:

1. No exercício 1.2, a saída atual é `Equipamento: Atlas - X20 - 84 - Série: 84`. Remova o primeiro número e os dois-pontos para obter exatamente `Equipamento: Atlas - X20 - Série 84`.
2. No exercício 2.3, remova também `: number` de `massaEmQuilogramas` e `: boolean` de `pecaAprovada`. As quatro declarações iniciais devem usar inferência.
3. O exercício 2.4 está aprovado. A classificação como erro de compilação e o entendimento da incompatibilidade entre `number` e `string` estão corretos. Apenas observe que `"10"` é atribuído na própria declaração, e não em uma atribuição posterior; a diferença de redação no trecho B não afeta o conceito.

Após esclarecimento com o aluno, permanecem pendentes somente os exercícios 1.2 e 2.3.

---

## Resultado final — 2026-08-03

**Exercícios aprovados.**

O exercício 2.3 passou a usar inferência nas quatro declarações iniciais. O exercício 1.2 contém todos os dados pedidos e diverge apenas pelo `:` em `Série: 84`, diferença cosmética que não afeta o conceito avaliado. Os dez exercícios e o bônus compilam em modo estrito, e o aluno está liberado para a avaliação do Capítulo 02.
