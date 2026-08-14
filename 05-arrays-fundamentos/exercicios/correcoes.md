# Correção dos Exercícios — Capítulo 05: Arrays — Fundamentos

**Data:** 14/08/2026  
**Entrega:** 11 exercícios obrigatórios + bônus  
**Resultado:** lista aprovada após revisão

## Validação técnica

Todos os 12 arquivos compilam isoladamente em modo estrito e executam sem erros. As diferenças de capitalização, acentuação e rótulos equivalentes foram tratadas como cosméticas.

Na revisão final, os seis pontos indicados inicialmente foram conferidos. O entendimento expresso no `ex11.ts` foi considerado conceitualmente correto; a distinção entre `const` e `number[]` permanece apenas como refinamento de terminologia.

## Resultado por exercício

| Exercício | Status | Feedback |
|---|---|---|
| 1.1 | ✅ Aprovado | Arrays e saídas corretos; o aluno identificou a incompatibilidade com o tipo numérico. Refinar apenas a terminologia: o tipo é `number[]`, enquanto `const` controla reatribuição. |
| 1.2 | ✅ Aprovado | Índices, `length` e último elemento corretos. |
| 1.3 | ✅ Aprovado após ajuste | `quantidadeAntes` e `quantidadeDepois` agora usam `rota.length` e valem `3`; alteração e explicação sobre `const` corretas. |
| 1.4 | ✅ Aprovado | Quantidade, último índice válido, último elemento e acesso fora do array corretos. |
| 2.1 | ✅ Aprovado após ajuste | Código e saídas corretos; comentário agora identifica corretamente `push` e `unshift`. |
| 2.2 | ✅ Aprovado | Remoções, elementos restantes, índices e quantidade corretos. |
| 2.3 | ✅ Aprovado após ajuste | Código e saídas corretos; explicação sobre `undefined` adicionada. |
| 2.4 | ✅ Aprovado | Rastreamento completo e estado final correto. |
| 3.1 | ✅ Aprovado após ajuste | Os dois nomes são exibidos, a comparação resulta em `true` e os comentários explicam a referência compartilhada. |
| 3.2 | ✅ Aprovado | Condição e leituras seguras corretas; o ramo do array vazio também está correto. |
| 3.3 | ✅ Aprovado após ajuste | Acessos e saídas corretos; explicação agora identifica o papel dos dois índices. |
| Bônus | ✅ Aprovado | `for`, posição humana, acesso pelo índice e acumulador corretos. Com array vazio, o corpo não executa e o total permanece `0`. |

## Ajustes aplicados

1. `ex13.ts` passou a guardar `rota.length`, sem subtrair `1`.
2. A explicação do `ex11.ts` foi reavaliada como conceitualmente correta.
3. O comentário de `ex21.ts` passou a nomear `push` e `unshift`.
4. `ex23.ts` recebeu a explicação solicitada.
5. `ex31.ts` passou a exibir os dois nomes e recebeu as três respostas.
6. `ex33.ts` passou a explicar os dois índices.

## Observações gerais

- Os arquivos foram entregues diretamente em `exercicios/`, embora o enunciado ainda indique `exercicios/solucoes/`. Isso não afeta a avaliação conceitual, mas a organização deverá ser uniformizada futuramente.
- Vários arquivos não preservam em comentário a previsão feita antes da execução. Não é necessário reconstruí-la agora; nos próximos exercícios, registre a previsão antes de rodar o código, pois essa etapa treina o acompanhamento mental do estado.
- A lista fundamental está encerrada. O próximo passo é a aula e a lista de arrays + loops.
