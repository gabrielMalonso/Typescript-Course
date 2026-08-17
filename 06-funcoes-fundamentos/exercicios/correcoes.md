# Correção dos exercícios — Capítulo 06: Funções — Fundamentos

**Data:** 17/08/2026  
**Entrega:** 12 exercícios obrigatórios + bônus  
**Resultado final:** 12 exercícios obrigatórios e bônus aprovados

## Diagnóstico geral

Gabriel demonstrou boa compreensão dos fundamentos: tipou parâmetros e retornos, diferenciou `return` de `console.log`, usou `void`, guardou funções em variáveis e criou funções que processam arrays sem modificá-los. Todos os 13 arquivos compilam isoladamente em modo estrito e executam sem erros.

Os ajustes finais confirmaram também a distinção entre declaração, expressão e arrow function, além da diferença entre guardar uma função e guardar seu retorno. A lista está encerrada.

## Resultado por exercício

| Exercício | Status | Feedback |
|---|---|---|
| 1.1 | ✅ Aprovado | Parâmetro, argumentos, chamadas e retornos corretos. Falta apenas o `!` da saudação, diferença cosmética. |
| 1.2 | ✅ Aprovado | Conversão e dois casos de teste corretos. |
| 1.3 | ✅ Aprovado | Contrato booleano e limite inclusivo `>=` corretos nos três testes. |
| 1.4 | ✅ Aprovado após ajuste | Nome da função e limite inclusivo corrigidos; `80`, `90`, `120` e `135` percorrem as faixas esperadas. |
| 2.1 | ✅ Aprovado | Uso de `void`, condicional e saídas corretos. |
| 2.2 | ✅ Aprovado após ajuste | Expressão de função, contratos, resultados e explicação sobre a chamada estão corretos. |
| 2.3 | ✅ Aprovado após ajuste | Arrow concisa implementada e forma equivalente com bloco e `return` registrada no comentário. |
| 2.4 | ✅ Aprovado | Cálculo, retorno reutilizável, função de exibição e explicação corretos. O primeiro `console.log` é apenas redundante. |
| 3.1 | ✅ Aprovado após ajuste | Função guardada com contrato explícito, chamada e comparação de referência corretas; explicação distingue função de retorno. |
| 3.2 | ✅ Aprovado após ajuste | Soma correta nos dois casos e arrays originais exibidos depois das chamadas, comprovando que não foram modificados. |
| 3.3 | ✅ Aprovado | Caso positivo, valores negativos e array vazio retornam corretamente `31`, `-3` e `0`. A inicialização pode ser simplificada começando diretamente em `valores[0]`, mas a lógica atual funciona. |
| 3.4 | ✅ Aprovado após ajuste | Pipeline vazio incluído e retorna total, quantidade e média iguais a `0`. |
| Bônus | ✅ Aprovado | O código demonstra a seleção pelo booleano, produz `16` com `dobro`, e o teste manual relatado confirmou `18` com `acrescimoDez`. A compatibilidade pelo mesmo contrato foi explicada corretamente. |

## Ajustes finais aplicados

1. A explicação contraditória foi removida de `ex31.ts`.
2. Os arrays originais passaram a ser exibidos em `ex32.ts`.
3. Todos os 13 arquivos foram recompilados isoladamente em modo estrito.

## Hábito a reforçar

As previsões de saída solicitadas nas orientações não foram registradas. Não é necessário reconstruí-las nesta revisão, mas nas próximas listas escreva a previsão antes de executar: isso ajuda a confirmar se você está acompanhando mentalmente retornos, limites e fluxo de chamadas.

## Próximo passo

A lista está encerrada e a prova do Capítulo 06 está liberada.
