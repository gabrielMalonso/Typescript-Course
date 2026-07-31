# Resultado da Prova — Capítulo 01: Variáveis e Constantes

> Data: 2026-07-31  
> Aluno: Gabriel Alonso

## Resultado geral

**Nota: 8,5/10 — Aprovado**

Você demonstrou boa compreensão de `let`, `const`, inferência, anotação explícita e escopos. Os três arquivos TypeScript compilam sem erros; os descontos se concentraram em uma alternativa teórica incorreta e em diferenças literais nos requisitos e nas saídas.

| Questão | Nota | Máximo |
|---|---:|---:|
| 1 — Escolha entre `let` e `const` | 1,00 | 1,00 |
| 2 — Por que evitar `var` | 0,00 | 1,00 |
| 3 — Verdadeiro ou falso | 0,85 | 1,00 |
| 4 — Escopos | 1,00 | 1,00 |
| 5 — Análise e correção | 1,50 | 1,50 |
| 6 — Registro de manutenção | 1,90 | 2,00 |
| 7 — Transmissão meteorológica | 2,25 | 2,50 |
| **Total** | **8,50** | **10,00** |

## Correção detalhada

### Questão 1 — 1,00/1,00

A alternativa **b** e a justificativa estão corretas. O nome permanece fixo e usa `const`; a quantidade será reatribuída e usa `let`.

### Questão 2 — 0,00/1,00

A alternativa marcada foi **b**, mas a correta é **c**. `var` aceita valor inicial; o problema é que não respeita escopo de bloco e permite comportamentos menos previsíveis, como certas redeclarações.

### Questão 3 — 0,85/1,00

Os itens 1, 2 e 4 foram classificados corretamente, e as justificativas das afirmações falsas estão corretas.

O item 3 deveria ser **V**. Ao inferir `number`, o TypeScript continua verificando atribuições posteriores e rejeita valores de tipos incompatíveis. Sua própria justificativa descreveu essa regra corretamente, apesar de a classificação ter sido marcada como falsa.

### Questão 4 — 1,00/1,00

Os três escopos foram explicados corretamente. Você identificou que nomes internos a blocos e funções não ficam disponíveis fora de suas respectivas regiões.

### Questão 5 — 1,50/1,50

As respostas conceituais estão corretas, e a menor correção possível foi aplicada. O arquivo `questao05c.ts` compila e gera exatamente:

```text
Local: Câmara A
Lote: LT-31
Temperatura: 24 °C
```

### Questão 6 — 1,90/2,00

As escolhas entre `let`, `const`, inferência e anotação explícita atendem aos requisitos. O programa compila e executa, mas o status inicial foi escrito como `agenada`, em vez de `agendada`; por isso, a saída não corresponde exatamente ao enunciado.

### Questão 7 — 2,25/2,50

A estrutura, as reatribuições e o escopo do canal estão corretos. Houve três ressalvas:

- `nomeDaEstacao` deveria usar inferência, sem `: string`;
- a saída deveria conter `Leitura final: 2`, com `final` em minúsculo;
- a explicação sobre `var` deveria afirmar diretamente que ele não respeita escopo de bloco.

## Síntese

### Pontos fortes

- Escolha correta entre `let` e `const` na prática.
- Boa compreensão de escopo de bloco e de função.
- Uso correto de reatribuição e tipos básicos.
- Todos os arquivos TypeScript compilam sem erros.

### Ponto principal para reforçar

Antes de concluir uma entrega, compare cada requisito e cada linha da saída com o enunciado. Nesta prova, `agenada`, `Leitura Final` e a anotação extra em `nomeDaEstacao` foram diferenças pequenas, mas objetivas.

## Próximo passo

**Capítulo 01 concluído. Você está liberado para avançar ao Capítulo 02 — Tipos Primitivos.**
