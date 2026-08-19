# Correção dos exercícios — Capítulo 07: Objetos

**Data:** 19/08/2026  
**Entrega:** 12 exercícios obrigatórios + bônus  
**Resultado final:** 12 exercícios obrigatórios e bônus aprovados

## Diagnóstico geral

Todos os 13 arquivos compilam isoladamente em modo estrito e executam sem erros. O domínio dos mecanismos centrais está visível: literal tipado, mutação com `const`, ponto versus colchetes, objeto aninhado, método com `this`, destructuring no parâmetro, alias versus spread, filtro com `for...of` e cópia sem alterar o original.

Nesta segunda passagem, `ex14.ts`, `ex21.ts` e `ex23.ts` fecharam o que faltava: exibição dos campos, os dois estados do opcional e o retorno da função separado do saldo final. Os dois detalhes restantes de `ex24.ts` e do bônus foram aplicados com autorização do aluno.

A dificuldade que você relatou — misturar objetos, arrays e funções na hora de escrever — também aparece aqui, mas mais como **hábito de completar o contrato da entrega** do que como lacuna conceitual. Nos arquivos em que a estrutura já estava desenhada, o código interno ficou correto.

O `ex33.ts` é o melhor sinal do que você já está construindo: os comentários descrevem o parâmetro como array de objetos, o `for...of` como um objeto de cada vez e o retorno como `number`. É exatamente essa leitura em camadas que o treino extra vai forçar você a escrever mais vezes.

## Resultado por exercício

| Exercício | Status | Feedback |
|---|---|---|
| 1.1 | ✅ Aprovado | Objeto tipado, acesso por ponto e distinção objeto versus propriedade corretos. |
| 1.2 | ✅ Aprovado | Mutação dos campos e explicação de `const` corretas: a constante prende a referência, não os valores internos. |
| 1.3 | ✅ Aprovado | Ponto, colchetes com variável e o comentário sobre `clima.campo` estão certos. Com o tipo explícito, o TypeScript rejeitaria essa leitura; o ponto-chave é que `.campo` procura a chave literal `"campo"`, não o conteúdo da variável `campo`. |
| 1.4 | ✅ Aprovado após ajuste | `M-4` e `1.25` exibidos; comentários sobre excesso de propriedade e tipo de `massa` corretos. |
| 2.1 | ✅ Aprovado após ajuste | As duas exibições no mesmo programa: `sem código` e depois `503`. |
| 2.2 | ✅ Aprovado | Alterou só `consulta.horario.hora`, sem substituir o objeto interno. |
| 2.3 | ✅ Aprovado após ajuste | Os dois retornos e o saldo final aparecem: `140`, `140` e `140`. O valor devolvido pela função agora é o que está sendo impresso. |
| 2.4 | ✅ Aprovado após ajuste | Destructuring, saídas e comentário de compatibilidade estrutural corretos. |
| 3.1 | ✅ Aprovado | Alias compartilha o mesmo objeto; spread cria outro. As saídas `80`, `true`, `120`, `150` e `false` comprovam os dois casos. |
| 3.2 | ✅ Aprovado | Extração, rename para `cidade` e custo `0` corretos. Observação: o teste com `dias: 0` alterou a variável extraída, não um segundo objeto de viagem. Funciona, e ainda mostra que o destructuring cria nomes independentes. |
| 3.3 | ✅ Aprovado | Contrato, filtro `> 0`, array vazio e comprovação de que `estoque` não mudou. Os comentários em camadas estão especialmente bons. |
| 3.4 | ✅ Aprovado | Spread, regra `percentual <= 0`, preços `36` / `40` e original preservado em `40`. |
| Bônus | ✅ Aprovado após ajuste | Formato `T1: 21 °C \| sem nota` e teste sem ativos exibindo `0` e `0`. |

## Ajustes finais aplicados

1. Em `ex24.ts`, o comentário passou a explicar que a função só exige `nome` e `quantidade`.
2. Em `bonus.ts`, o resumo ficou `T1: 21 °C | sem nota`, e o array sem ativos passou a exibir quantidade `0` e soma `0`.
3. Os dois arquivos foram recompilados isoladamente em modo estrito.

## Hábito a reforçar

As previsões de saída pedidas nas orientações quase não apareceram. No treino extra, escreva a previsão em comentário **antes** de executar: isso ajuda justamente a conferir se a sintaxe que você escreveu corresponde à camada que você pensou.

## Próximo passo

A lista principal está encerrada. O próximo passo é `exercicios/lista-sintaxe-extra.md`. A prova do Capítulo 07 continua bloqueada até esse treino.
