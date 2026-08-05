# Recursos — Operadores e Estruturas Condicionais

## Documentação principal

- [Expressões e operadores — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators)
- [Controle de fluxo e tratamento de erros — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Operador condicional (ternário) — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
- [`switch` — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/switch)
- [Nullish coalescing (`??`) — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [Narrowing e análise de fluxo — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## Ordem de revisão

1. aritmética, resto e precedência;
2. comparações estritas;
3. tabelas mentais de `&&`, `||` e `!`;
4. `if/else` e faixas com `else if`;
5. ternário e `switch`;
6. truthy, falsy e `??`;
7. problemas integrados.

## Tabela lógica rápida

| A | B | `A && B` | `A \|\| B` |
|---|---|---|---|
| `true` | `true` | `true` | `true` |
| `true` | `false` | `false` | `true` |
| `false` | `true` | `false` | `true` |
| `false` | `false` | `false` | `false` |

| A | `!A` |
|---|---|
| `true` | `false` |
| `false` | `true` |

## Perguntas para revisão ativa

- Qual é a diferença entre `=` e `===`?
- Quando o limite exige `>=` em vez de `>`?
- A regra usa “e” ou “ou”?
- Qual condição deve ser testada primeiro?
- O problema escolhe um valor simples ou executa várias ações?
- Zero é ausência neste domínio ou é um valor válido?

## Prática no Playground

Use o [TypeScript Playground](https://www.typescriptlang.org/play) para alterar um valor por vez e observar qual bloco é executado. Evite colar a solução inteira: testar pequenas hipóteses ensina mais do que apenas confirmar um programa pronto.
