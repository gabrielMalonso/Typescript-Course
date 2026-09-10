# Prática 3 — Desafio de transferência

## Uma rodada de calibração

Uma equipe tem `n` sensores. Para cada sensor, simula uma calibração que começa com `n` candidatos. A cada etapa, o total restante é dividido por dois e arredondado para baixo; para quando resta no máximo um. Não precisamos armazenar os candidatos, só contar as etapas realizadas para toda a equipe.

Implemente uma função que recebe `n`, inteiro de 0 a 1000, e **executa as etapas descritas**, devolvendo seu total. Não use uma fórmula pronta para substituir a simulação. Você pode usar a função de arredondamento ensinada na aula.

1. Antes de executar, preveja o resultado para 0, 1, 8 e 16. Verifique e explique divergências.
2. Rastreie uma entrada pequena, mostrando o estado reiniciado para cada sensor.
3. Justifique tempo e espaço auxiliar. Explique por que contar quantos loops aparecem no texto não determina a complexidade.
4. Variação somente em texto: se cada sensor começasse com `m` candidatos, independente de `n`, o que mudaria na análise? Considere `m ≥ 2` e explique separadamente 0 e 1.

Entregue `pratica/solucoes/calibracao.ts` e sua explicação em `pratica/solucoes/calibracao.md`. Sem classes, recursão ou estruturas novas. Se travar, entregue a tentativa e peça uma pista conceitual.

Próximo: [debugging](debugging.md).
