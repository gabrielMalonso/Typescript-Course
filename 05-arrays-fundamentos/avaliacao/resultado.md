# Resultado da prova — Capítulo 05

**Data:** 15/08/2026  
**Nota:** **9,5 / 10,0**  
**Resultado:** **Aprovado**

## Resumo

| Questão | Valor | Nota |
|---------|------:|-----:|
| 1 — Modelo mental e tipagem | 1,0 | 1,0 |
| 2 — Estado e valores retornados | 1,0 | 1,0 |
| 3 — Referência compartilhada | 1,0 | 1,0 |
| 4 — Array vazio e leitura segura | 1,0 | 0,8 |
| 5 — Registro temporário | 1,0 | 1,0 |
| 6 — Etapas de uma entrega | 1,5 | 1,25 |
| 7 — Painel compartilhado | 1,5 | 1,45 |
| 8 — Percorrendo registros | 2,0 | 2,0 |
| **Total** | **10,0** | **9,5** |

## Correção

### Questão 1 — 1,0 / 1,0

Resposta completa. Você distinguiu ordem armazenada de classificação automática, explicou corretamente `number[]`, identificou os índices `0` e `5` e separou mutação do array de reatribuição da variável declarada com `const`.

### Questão 2 — 1,0 / 1,0

Tamanhos, retornos, estado final e `length` corretos. A inicial maiúscula em `"Beta"` foi tratada como diferença cosmética; o valor original no código permanece `"beta"`. A explicação sobre os retornos de `unshift` e `push` está correta.

### Questão 3 — 1,0 / 1,0

As três saídas estão corretas. Você identificou que existe apenas um array e explicou com precisão que as duas variáveis guardam a mesma referência.

### Questão 4 — 0,8 / 1,0

`alertaRemovido` e `ultimoAlerta` valem `undefined`, e `alertas.length !== 0` é uma verificação válida antes dos acessos.

O ajuste principal é este:

- `ultimoIndice` vale **`-1`**, pois `alertas.length - 1` resulta em `0 - 1`;
- `ultimoAlerta` é que recebe `undefined` ao tentar ler `alertas[-1]`;
- o tipo `string | undefined` existe porque `pop()` devolve uma `string` quando remove um elemento e `undefined` quando o array está vazio.

### Questão 5 — 1,0 / 1,0

Implementação completa: inclusões, tamanhos retornados, remoções, inferência de `retiradaExtra`, array final e quantidade estão corretos. A variação textual em “Retirado extra” é apenas cosmética.

### Questão 6 — 1,25 / 1,5

As cinco mutações foram feitas na ordem correta, os retornos foram guardados e todas as leituras e saídas finais estão corretas.

Faltaram apenas os comentários com o estado previsto depois de cada uma das cinco mutações, exigidos pelo enunciado.

### Questão 7 — 1,45 / 1,5

Referência compartilhada, mutações, retornos, comparação com `===`, conteúdo final e explicação estão corretos.

O enunciado pedia criar `ultimoIndice` com `length - 1`. Você fez o cálculo corretamente diretamente no acesso, mas não criou a variável solicitada.

### Questão 8 — 2,0 / 2,0

O `for` percorre todos os índices válidos, `continue` ignora os zeros e os acumuladores produzem total `70` e quantidade `4`. A explicação sobre índice real e posição humana também está correta. O `:` adicional no rótulo é cosmético.

## Verificação técnica

Os arquivos `questao05.ts`, `questao06.ts`, `questao07.ts` e `questao08.ts` foram compilados isoladamente em modo estrito e executados com Node.js. Todos terminaram sem erros e produziram os valores esperados.

## Conclusão

Você demonstrou domínio sólido de arrays tipados, índices, `length`, mutações, valores retornados, referência compartilhada e integração entre arrays e loops. A prova está aprovada e não precisa ser refeita.

Para encerrar formalmente esta etapa do curso, ainda é preciso corrigir a lista de Arrays + Loops e concluir o Projeto 1 — Calculadora, que permaneceu pendente na sequência.
