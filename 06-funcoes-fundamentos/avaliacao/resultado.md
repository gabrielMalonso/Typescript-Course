# Resultado da Prova — Capítulo 06: Funções — Fundamentos

**Data:** 17/08/2026  
**Nota final:** **9,4 / 10,0**  
**Resultado:** ✅ Aprovado

## Resumo

Gabriel demonstrou domínio sólido dos fundamentos de funções. Os quatro arquivos práticos compilam isoladamente em modo estrito, executam sem erros e produzem as saídas principais esperadas. Os descontos ficaram concentrados no tipo conceitual de uma função e em uma regra de validação que não cobre números negativos.

| Questão | Valor | Nota | Feedback |
|---|---:|---:|---|
| 1 | 1,0 | 1,0 | Definição, chamada, parâmetros, argumentos, valor e tipo identificados corretamente. |
| 2 | 1,0 | 1,0 | Diferença entre retorno reutilizável, exibição e `void` explicada corretamente. |
| 3 | 1,0 | 0,55 | Identificou que `itemA` guarda a função, que `itemB` vale `14` e que `itemA(4)` resulta em `8`. Porém, atribuiu a `itemA` o tipo `number`; seu tipo é uma função, `(valor: number) => number`. Também faltou explicar diretamente que os parênteses executam a chamada. |
| 4 | 1,0 | 1,0 | Caminho sem retorno diagnosticado e corrigido sem alterar o contrato `string`. |
| 5 | 1,0 | 1,0 | Declaração, arrow concisa, composição e dois testes corretos. O ponto final adicional é cosmético. |
| 6 | 1,5 | 1,5 | Contratos, três faixas, limites inclusivos, separação entre classificação e exibição e quatro testes corretos. |
| 7 | 1,5 | 1,5 | Tipo explícito, referência guardada sem chamada, resultados, comparação e explicação corretos. |
| 8 | 2,0 | 1,8 | Pipeline, média protegida, expressão de função, caso vazio e saídas corretos. As funções de soma e contagem ignoram apenas `0`; pela regra, também deveriam rejeitar negativos usando a condição `valor > 0`. |

**Pontuação bruta:** 9,35 / 10,0  
**Nota arredondada:** **9,4 / 10,0**

## Validação técnica

- `questao05.ts`: compila; exibe `150` e `0` minutos.
- `questao06.ts`: compila; classifica corretamente `25`, `40`, `75` e `90`.
- `questao07.ts`: compila; exibe `10`, `3.5` e `true`.
- `questao08.ts`: compila; exibe os resumos `80 / 4 / 20` e `0 / 0 / 0`.
- No momento da correção original, o teste adicional da Questão 8 com `[14, -5, 0]` retornava total `9` e quantidade `2`, confirmando que `-5` era aceito indevidamente.

## Correção pós-prova — 17/08/2026

A condição das funções de soma e contagem foi alterada para ignorar `valor <= 0`. A nova versão:

- compila em modo estrito;
- preserva as saídas originais `80 / 4 / 20` e `0 / 0 / 0`;
- para `[14, -5, 0]`, considera somente `14`, produzindo total `14` e quantidade `1`.

**Pendência da Questão 8 resolvida.** A nota permanece **9,4**, pois registra a entrega original; a correção posterior fica registrada como consolidação do aprendizado.

## Pontos para reforçar

1. O tipo de uma função descreve seus parâmetros e retorno: `(valor: number) => number`. Ele não é igual ao tipo do valor retornado.
2. Sem parênteses, usa-se a referência da função; com parênteses, a função é executada.
3. Implemente a regra do domínio, não apenas os valores presentes no exemplo. “Maiores que zero” exige testar `valor > 0`.

## Organização da entrega

As respostas teóricas foram entregues em `respostas.md`, embora o enunciado solicitasse `resposta.md`. Não houve desconto, pois o conteúdo estava completo e no diretório correto; mantenha o nome exato nas próximas provas.

## Conclusão

Capítulo 06 concluído com aprovação. O domínio prático de contratos, composição, `void`, formas de definição e funções como valores está bem consolidado.
