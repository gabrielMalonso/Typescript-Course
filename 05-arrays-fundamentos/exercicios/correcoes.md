# Correção dos Exercícios — Capítulo 05: Arrays — Fundamentos

**Data:** 14/08/2026  
**Entrega:** 11 exercícios obrigatórios + bônus  
**Resultado:** primeira revisão concluída; 6 arquivos aprovados e 6 com ajustes

## Validação técnica

Todos os 12 arquivos compilam isoladamente em modo estrito e executam sem erros. As diferenças de capitalização, acentuação e rótulos equivalentes foram tratadas como cosméticas.

## Resultado por exercício

| Exercício | Status | Feedback |
|---|---|---|
| 1.1 | 🟡 Ajustar explicação | Arrays e saídas corretos. A rejeição de `"vinte"` acontece porque os elementos de `pontuacoes` devem ser `number`; não porque o array foi declarado com `const`. |
| 1.2 | ✅ Aprovado | Índices, `length` e último elemento corretos. |
| 1.3 | 🔴 Corrigir | A alteração do índice e a explicação sobre `const` estão corretas, mas `quantidadeAntes` e `quantidadeDepois` devem guardar `rota.length`, cujo valor é `3`. `length - 1` calcula o último índice, que é `2`. |
| 1.4 | ✅ Aprovado | Quantidade, último índice válido, último elemento e acesso fora do array corretos. |
| 2.1 | 🟡 Ajustar comentário | Código e saídas corretos. Reescreva “colcha e dancha” como `push` e `unshift`; ambos retornam o novo tamanho. A observação sobre `pop` e `shift` está correta, mas não era necessária. |
| 2.2 | ✅ Aprovado | Remoções, elementos restantes, índices e quantidade corretos. |
| 2.3 | 🟡 Completar | Código e saídas corretos. Falta a constante `string` explicando que `pop` e `shift` retornam `undefined` quando não existe elemento para remover. |
| 2.4 | ✅ Aprovado | Rastreamento completo e estado final correto. |
| 3.1 | 🟡 Completar | A referência compartilhada e o resultado `true` estão corretos. Exiba `configuracaoPrincipal` e `configuracaoDaTela` — atualmente o segundo nome é exibido duas vezes — e acrescente as três respostas solicitadas em comentário. |
| 3.2 | ✅ Aprovado | Condição e leituras seguras corretas; o ramo do array vazio também está correto. |
| 3.3 | 🟡 Completar | Acessos e saídas corretos. A explicação deve dizer que o primeiro índice (`1`) escolhe a segunda fileira e o segundo (`0`) escolhe o primeiro lugar dessa fileira. |
| Bônus | ✅ Aprovado | `for`, posição humana, acesso pelo índice e acumulador corretos. Com array vazio, o corpo não executa e o total permanece `0`. |

## Ajustes necessários

1. Corrigir `ex13.ts` para guardar `rota.length`, sem subtrair `1`.
2. Corrigir a justificativa de tipo em `ex11.ts`.
3. Reescrever o comentário de `ex21.ts` com os nomes dos métodos.
4. Adicionar a explicação solicitada em `ex23.ts`.
5. Completar os comentários e as duas chamadas de exibição em `ex31.ts`.
6. Completar a explicação dos dois índices em `ex33.ts`.

## Observações gerais

- Os arquivos foram entregues diretamente em `exercicios/`, embora o enunciado ainda indique `exercicios/solucoes/`. Isso não afeta a avaliação conceitual, mas a organização deverá ser uniformizada futuramente.
- Vários arquivos não preservam em comentário a previsão feita antes da execução. Não é necessário reconstruí-la agora; nos próximos exercícios, registre a previsão antes de rodar o código, pois essa etapa treina o acompanhamento mental do estado.
- Após esses seis ajustes, a lista pode ser encerrada e o capítulo ampliado com a seção de arrays + loops combinada anteriormente.
