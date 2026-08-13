# Correção dos exercícios — Capítulo 04

**Data:** 13/08/2026  
**Resultado final:** 12 exercícios obrigatórios e bônus aprovados após revisão.

Todos os 13 arquivos compilam em modo estrito e executam sem erros. O uso de `while`, `do...while`, `for`, contadores, loops aninhados, `break` e `continue` está bem consolidado.

## Resultado por exercício

| Exercício | Resultado | Observação |
|-----------|-----------|------------|
| 1.1 | ✅ Aprovado | `while`, limites e incremento corretos. Com início em `6`, o corpo não executa. |
| 1.2 | ✅ Aprovado | Contagem regressiva e mensagem final corretas. |
| 1.3 | ✅ Aprovado | `do...while` e explicação conceitual corretos. |
| 1.4 | ✅ Aprovado | Limites e passo de `10` corretos. Falta apenas o símbolo `%` na saída; é uma diferença de apresentação e não impede a aprovação. |
| 2.1 | ✅ Aprovado | `%`, igualdade estrita e `continue` usados corretamente. |
| 2.2 | ✅ Aprovado após ajuste | Exibe as verificações de `1` a `7`, compara com `codigoProcurado` e interrompe a busca corretamente. |
| 2.3 | ✅ Aprovado | Limite, incremento, estado booleano e `break` corretos; o teste com código `8` também termina após a tentativa `5`. |
| 2.4 | ✅ Aprovado | Loops aninhados e totalização corretos. |
| 3.1 | ✅ Aprovado | Pares ignorados, ímpares somados e interrupção em `25` corretos. |
| 3.2 | ✅ Aprovado | Posição indisponível ignorada e total `11` correto. |
| 3.3 | ✅ Aprovado | Pausa, contador, meta, booleano e interrupção corretos. Com meta `10`, o código percorre os sete dias e termina com `false`. |
| 3.4 | ✅ Aprovado | Diagnóstico e versão corrigida estão corretos; a saída é `1`, `2`, `4`, `5`. |
| Bônus | ✅ Aprovado após ajuste | Loops aninhados, posição bloqueada, contador, booleano e os dois `break`s estão corretos. |

## Ajustes realizados

- O `ex22.ts` agora exibe todas as verificações e usa `codigoProcurado` na condição.
- O bônus agora usa `numeroDeSetores` como limite do loop externo.

Todos os arquivos foram recompilados em modo estrito e executados após as correções.

## Observações opcionais

- No `ex14.ts`, inclua `%` depois de `${porcentagem}` para representar a unidade mostrada no enunciado.
- Há alguns pontos e vírgulas ausentes em `ex13.ts`, `ex24.ts`, `ex34.ts` e no bônus. O TypeScript aceita por inserção automática, mas a lista pediu consistência nessa convenção.
- Os `else` depois de `continue` ou `break` não são necessários. Removê-los pode deixar o fluxo mais direto, mas isso é apenas uma melhoria de clareza.
- Em `ex34.ts`, prefira chamar `continue` pelo nome em vez de “comando contínuo”. O raciocínio descrito está correto.

## Próximo passo

A lista está encerrada e a prova do Capítulo 04 está liberada. O símbolo `%` no `ex14.ts` permanece apenas como melhoria opcional de apresentação.
