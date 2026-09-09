# Prática 2 — Aplicação

Entregue código, testes e uma análise curta em `pratica/solucoes/`. Escolha nomes e decomposição. Para cada problema, declare entrada/saída, tamanho, pior caso e espaço auxiliar; preserve os arrays recebidos. Use arrays densos de números finitos, com somas dentro de limites numéricos seguros. Não há biblioteca nova necessária.

## 1. Painel de temperaturas

Um painel recebe temperaturas e um limite. Deve devolver um objeto com a soma de todas as temperaturas e a quantidade de leituras estritamente acima do limite. Para `[-3, 5, 8]` e limite 5, a soma é 10 e a quantidade é 1. Para vazio, ambos são zero.

Implemente. Teste também valor exatamente igual ao limite, somente negativos e uma segunda coleção que não compartilhe os valores da primeira. Justifique a contagem do seu código. Se dobrarmos as leituras, o que você prevê para o trabalho? Separe essa previsão do tempo de relógio.

## 2. Inscrições e sessões

Um evento recebe `n` participantes e `m` sessões. Cada participante precisa ser considerado uma vez para cada sessão. Você só precisa contar quantas considerações seriam feitas, sem construir uma lista de pares.

Escreva uma versão que execute as considerações e conte cada uma. Depois proponha outra que devolva a mesma quantidade sem visitar cada combinação. Considere `n` e `m` inteiros de 0 a 100; use tamanhos pequenos nos testes. Compare as duas para `(3, 4)`, `(0, 5)` e `(2, 1)`. O que muda na análise se a exigência passar a ser **produzir cada par**, e não só a quantidade? Não é necessário implementar essa última variação.

## 3. Decisão para um relatório

Um relatório imutável tem 10.000 leituras. Durante seu uso, 2.000 consultas pedem a soma das primeiras `k` leituras, com `0 ≤ k ≤ n`. Compare recalcular cada consulta e preparar somas parciais, como na aula. Estime trabalho no pior caso, indique a memória extra e escolha uma alternativa.

Agora mude apenas uma condição: há uma única consulta das primeiras três leituras. Você manteria a escolha? E se as leituras fossem alteradas depois da preparação? Responda em texto; não precisa criar um sistema.

Próximo: [desafio](03-desafios.md).
