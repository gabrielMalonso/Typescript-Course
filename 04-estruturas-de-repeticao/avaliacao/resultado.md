# Resultado da prova — Capítulo 04

**Data:** 13/08/2026  
**Nota:** **9,4 / 10,0**  
**Resultado:** **Aprovado**

## Resumo

| Questão | Valor | Nota |
|---------|------:|-----:|
| 1 — Previsão de execução | 1,0 | 0,4 |
| 2 — Escolha da estrutura | 1,0 | 1,0 |
| 3 — Verdadeiro ou falso | 1,0 | 1,0 |
| 4 — Segurança de um loop | 1,0 | 1,0 |
| 5 — Diagnóstico e correção | 1,5 | 1,5 |
| 6 — Seleção de números | 2,0 | 2,0 |
| 7 — Emissão de ingressos | 2,5 | 2,5 |
| **Total** | **10,0** | **9,4** |

## Correção

### Questão 1 — 0,4 / 1,0

Você previu corretamente os números `1`, `2`, `4` e `5` e as quatro execuções do `console.log`.

Faltaram as duas explicações solicitadas:

- em `3`, `continue` pula o restante daquela iteração e o `for` segue para a próxima;
- em `6`, `break` encerra o loop inteiro, impedindo a exibição de `6`, `7` e `8`.

### Questão 2 — 1,0 / 1,0

As três escolhas e justificativas estão corretas: `for`, `while` e `do...while` foram associados adequadamente aos respectivos cenários.

### Questão 3 — 1,0 / 1,0

Todas as classificações estão corretas e as falsas foram justificadas adequadamente. No item 2, você escreveu “estrutura do `while`”, mas a explicação descreve corretamente o funcionamento do `do...while`; tratei isso como um deslize de nomenclatura.

### Questão 4 — 1,0 / 1,0

Resposta completa: identificou limite/condição de término, atualização do contador e avanço na direção correta.

### Questão 5 — 1,5 / 1,5

Diagnóstico correto da incompatibilidade entre a condição e o incremento. A correção para `contador--`, a previsão da saída e o arquivo completo estão corretos.

### Questão 6 — 2,0 / 2,0

O programa usa corretamente `for`, `%`, `continue`, acumulador e `break`. Manter `numero` fora do cabeçalho para exibi-lo depois do loop é uma solução válida neste exercício. A saída funcional está completa; a ausência do acento em `Numero somado` é apenas cosmética.

### Questão 7 — 2,5 / 2,5

Solução completa: dados obrigatórios, loops aninhados, condição com `&&`, posição bloqueada, `continue`, contador, estado booleano e encerramento coordenado dos dois loops estão corretos.

## Verificação técnica

Os arquivos `questao05.ts`, `questao06.ts` e `questao07.ts` foram compilados isoladamente em modo estrito e executados. Todos terminaram sem erros e produziram o comportamento esperado.

## Conclusão

Você demonstrou domínio sólido de `while`, `do...while`, `for`, atualização de contadores, loops aninhados, `continue` e `break`. O Capítulo 04 está concluído. O próximo passo formal é o Projeto 1 — Calculadora, antes da liberação definitiva do Capítulo 05.
