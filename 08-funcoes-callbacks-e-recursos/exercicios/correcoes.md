# Correção dos exercícios — Capítulo 08: Funções — Callbacks e Recursos

**Data:** 28/08/2026  
**Entrega:** `ex01.ts` a `ex12.ts`, extras já aprovados, leitura real (recortes 2 e 3)  
**Resultado:** `ex01` a `ex12` aprovados após ajuste; prova **não liberada** até `ex13`–`ex16`

## Diagnóstico geral

Os 12 arquivos da primeira entrega compilam isoladamente em modo estrito e executam sem erros. A arquitetura central do capítulo já aparece com clareza na Parte 3: a controladora percorre, o callback decide ou formata, o retorno sai da controladora. Os extras de callbacks, corrigidos em 27/08, reforçam esse mesmo domínio.

Os cinco ajustes de atenção (`ex01`, `ex04`, `ex07`, `ex08` e `ex12`) foram aplicados nesta sessão, com autorização do aluno. Os 12 obrigatórios da Parte 1 à Parte 3 estão encerrados.

A prova continua bloqueada porque a Parte 4 (`ex13` a `ex16`) ainda não foi entregue — closures e IIFE entram na prova.

A leitura dos recortes 2 e 3 está aprovada. O recorte 4 ficou de lado nesta etapa: o mecanismo é o mesmo (entregar agora, executar depois).

## Resultado por exercício

| Exercício | Status | Feedback |
|---|---|---|
| 1 | ✅ Aprovado após ajuste | Opcional e o `0` como crachá existente corretos. Saída `Marina \| crachá 42`. |
| 2 | ✅ Aprovado | Valor padrão, chamada omitindo o segundo argumento e comentário sobre o tipo `string` corretos. |
| 3 | ✅ Aprovado | Soma + taxa uma vez, array vazio e negativos corretos. |
| 4 | ✅ Aprovado após ajuste | Declaração, expressão com `function` e arrow com contrato `(valor: number) => number`. Chamadas com `4` produzem `16`. |
| 5 | ✅ Aprovado | Referência em `criar`, resultado em `codigo` e os quatro tipos nos comentários estão certos. |
| 6 | ✅ Aprovado | Callback `void`, numeração e contador externo no `vezes = 0` corretos. |
| 7 | ✅ Aprovado após ajuste | Controladora devolve o retorno do callback. Função nomeada na soma e arrows inline na diferença e no produto. |
| 8 | ✅ Aprovado após ajuste | Correções de contrato, referência e `return`; saídas `inválido` e `válido`; comentários com os termos pedidos. |
| 9 | ✅ Aprovado | Mesma controladora, três critérios, contagens `2`, `2` e `1`. Nome do item no singular. |
| 10 | ✅ Aprovado | Novo `string[]`, dois formatadores e comprovação de que `livros` não mudou. |
| 11 | ✅ Aprovado | Cooperativos, `>= 4`, rejeição total, array vazio e original com quatro jogos. |
| 12 | ✅ Aprovado após ajuste | Dois callbacks no mesmo percurso, total `94`, array vazio com contador `0` e item no singular. |
| 13–16 | ❌ Não entregues | Closure, IIFE e o painel configurável. São conteúdo da prova. |

## Leitura de código real

| Recorte | Status | Feedback |
|---|---|---|
| 1 | — | Explicado na aula; não pedia resposta. |
| 2 | ✅ Aprovado | `onStage` é o argumento-função, contrato `(stage: string) => void`, a arrow é guardada na entrega e só roda dentro de `transcribe`. |
| 3 | ✅ Aprovado | Localizou o contrato, a execução interna, `stages` final e `result`. O item 8 já descreve uma closure: o callback usa o `stages` de fora. |
| 4 | ⏭️ Dispensado nesta etapa | Mesmo mecanismo dos outros: a arrow entra agora e `setTimeout` a chama depois. |

## O que isso significa para a prova

A prova cobra, entre outras coisas:

- parâmetro opcional, valor padrão e rest (Questões 2 e 5);
- referência versus chamada, callback `void` e callback com retorno (Questões 1, 3, 6 e 7);
- **closure e IIFE** (Questões 4 e 8).

As Questões 4 e 8 ainda não têm correspondente na entrega atual. Por isso a prova continua bloqueada.

## Próximo passo

Fazer `ex13.ts` a `ex16.ts` e pedir conferência. Se essa passagem fechar, a prova é liberada.

