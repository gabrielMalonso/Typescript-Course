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

---

# Treino extra de sintaxe — primeira correção

**Data:** 21/08/2026  
**Entrega:** `extra01.ts` a `extra05.ts`  
**Modo:** correto / problema aqui / pense novamente nesta parte — sem reescrever o código

## Diagnóstico geral

Os cinco arquivos compilam isoladamente em modo estrito e executam sem erros. A mistura pedida — função recebendo array de objetos, processando um objeto por vez e devolvendo um resultado tipado — aparece com clareza nos Extras 2, 3 e 5.

O Extra 2 é o melhor sinal desta entrega: você separou a regra de aprovação, as quantidades, a média e o texto do resumo. O Extra 3 leu objeto aninhado e propriedade opcional com `??`. O Extra 5 filtrou disponível + quilometragem e montou o resumo no formato pedido.

As previsões de saída em comentário, pedidas nas regras gerais, não apareceram.

## Resultado por exercício

| Exercício | Status | Marcação |
|---|---|---|
| Extra 1 | 🔄 Ajustar | Problema aqui em `disponibilidade`. Pense novamente em `produtoSemEstoque`. |
| Extra 2 | ✅ Correto | Quantidades 2 e 2, média `7.375`, Carla reprovada pelas faltas, formato do resumo certo. |
| Extra 3 | ✅ Correto | Total pago `400`, 1 não pago, 2 urgentes, observação ausente e presente. |
| Extra 4 | 🔄 Ajustar | A função está correta. Problema aqui na exibição. |
| Extra 5 | ✅ Correto | 3 disponíveis, média da quilometragem, 2 abaixo de 50.000 km, resumo só desses dois. |

## Extra 1 — interpretação, não falha de lógica

A soma das unidades (`4 + 8 = 12`) é coerente com a leitura de almoxarifado: duas furadeiras são dois produtos.

Neste enunciado, “produto” vale pela ficha (cada objeto do array). `estoque` é a quantidade daquela ficha. Por isso a saída pedida é `2` (Furadeira e Martelo), e “nome de cada produto sem estoque” lista Broca e Serra — um nome por objeto, não por unidade.

O ajuste pedido é só alinhar o contador a essa leitura: contar fichas com estoque disponível, sem somar `estoque`.

Ainda vale a pergunta 3 da correção anterior: `produtoSemEstoque` está sendo chamada? O tipo de `estoque` nela bate com os dados?

## Extra 4 — problema aqui

A lógica da função está correta. Conferido na execução:

- Amanda `3240`, Lucas `2376`, João `3024`
- Renata fora da cópia
- originais intactos: Amanda `3000`, Renata `4500`

O `console.log` imprimiu os arrays inteiros. Compare essa saída com o bloco `SALÁRIOS REAJUSTADOS` / `SALÁRIOS ORIGINAIS` pedido no enunciado.

## Próximo passo

Ajustar Extra 1 e Extra 4. A prova permanece bloqueada até essa conferência.
