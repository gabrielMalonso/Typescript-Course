# Correção dos exercícios — Capítulo 06: Funções — Fundamentos

**Data:** 17/08/2026  
**Entrega:** 12 exercícios obrigatórios + bônus  
**Resultado da primeira revisão:** 6 aprovados; 6 precisam de ajustes pontuais

## Diagnóstico geral

Gabriel demonstrou boa compreensão dos fundamentos: tipou parâmetros e retornos, diferenciou `return` de `console.log`, usou `void`, guardou funções em variáveis e criou funções que processam arrays sem modificá-los. Todos os 13 arquivos compilam isoladamente em modo estrito e executam sem erros.

As pendências estão concentradas em dois pontos: testar integralmente os casos pedidos e distinguir com precisão declaração de função, expressão de função e arrow function. Há também um erro funcional no limite `120` do exercício 1.4.

## Resultado por exercício

| Exercício | Status | Feedback |
|---|---|---|
| 1.1 | ✅ Aprovado | Parâmetro, argumentos, chamadas e retornos corretos. Falta apenas o `!` da saudação, diferença cosmética. |
| 1.2 | ✅ Aprovado | Conversão e dois casos de teste corretos. |
| 1.3 | ✅ Aprovado | Contrato booleano e limite inclusivo `>=` corretos nos três testes. |
| 1.4 | 🔧 Ajustar | `120` deveria resultar em `"normal"`, mas a condição `pressao < 120` o envia para `"alta"`. Use o limite inclusivo e o nome solicitado `classificarPressao`. |
| 2.1 | ✅ Aprovado | Uso de `void`, condicional e saídas corretos. |
| 2.2 | 🔧 Ajustar | O cálculo está correto, mas foi usada uma arrow function. O objetivo era praticar uma expressão com `function`. Complete também a explicação: os parênteses executam a função passando os argumentos. |
| 2.3 | 🔧 Ajustar | A arrow concisa e os resultados estão corretos. A equivalência comentada, porém, virou uma declaração de função; reescreva como arrow com bloco e `return`. |
| 2.4 | ✅ Aprovado | Cálculo, retorno reutilizável, função de exibição e explicação corretos. O primeiro `console.log` é apenas redundante. |
| 3.1 | 🔧 Ajustar | Guardar e comparar a referência da função foi compreendido. Use `const operacao` diretamente e acrescente a explicação pedida sobre `elevarAoQuadrado()` executar a função e exigir um argumento. A chamada isolada da linha 9 é redundante. |
| 3.2 | 🔧 Ajustar | A soma e o array vazio estão corretos. Guarde os arrays em variáveis e exiba-os depois das chamadas para cumprir a comprovação de que não foram modificados. |
| 3.3 | ✅ Aprovado | Caso positivo, valores negativos e array vazio retornam corretamente `31`, `-3` e `0`. A inicialização pode ser simplificada começando diretamente em `valores[0]`, mas a lógica atual funciona. |
| 3.4 | 🔧 Ajustar | Contagem, soma, média e proteção contra divisão por zero estão corretas. Falta executar e exibir também o pipeline para um array vazio. |
| Bônus | 🔧 Incompleto | A seleção de uma função compatível funciona para `false` e produz `18`. Falta trocar o booleano, confirmar o resultado `16` com `dobro` e explicar que ambas têm o mesmo contrato `(valor: number) => number`. |

## Ajustes necessários

1. Corrigir o limite inclusivo e o nome da função em `ex14.ts`.
2. Usar uma expressão de função tradicional e completar a explicação em `ex22.ts`.
3. Mostrar a arrow equivalente com bloco e `return` em `ex23.ts`.
4. Completar os requisitos sobre referência versus chamada em `ex31.ts`.
5. Exibir os arrays depois das chamadas em `ex32.ts`.
6. Testar o pipeline com array vazio em `ex34.ts`.
7. Se quiser concluir o bônus, testar as duas escolhas e adicionar a explicação pedida.

## Hábito a reforçar

As previsões de saída solicitadas nas orientações não foram registradas. Não é necessário reconstruí-las nesta revisão, mas nas próximas listas escreva a previsão antes de executar: isso ajuda a confirmar se você está acompanhando mentalmente retornos, limites e fluxo de chamadas.

## Próximo passo

Faça os seis ajustes obrigatórios e me avise para a conferência final. O bônus é opcional. A prova permanece bloqueada até essa conferência.
