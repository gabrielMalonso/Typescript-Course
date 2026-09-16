# Fechamento — Capítulo 10: Complexidade e Big O

**2026-09-16 — Concluído, por avaliação qualitativa do conjunto de evidências. Sem nota ou prova adicional.**

Foram revisadas as respostas das atividades 1–8, incluindo os oito blocos TypeScript, e considerado o relato de estudo e prática adicional de Gabriel nesta data. As respostas originais foram preservadas. Não é necessário completar retrospectivamente as subperguntas, reconstruir versões anteriores de Stock nem realizar as consolidações 9–10 ou o desafio 11 para fechar o capítulo.

## Revisão após os ajustes do aluno — 2026-09-16

Conferidas e corretas as alterações em 3.B.4 (alvo ausente), 4 (4n em contarB), 5.A.7 (espaço total Θ(n) nas duas versões) e 5.B.3 (invalidar/recalcular o resultado). Os apontamentos originais abaixo ficam preservados como histórico; esses quatro pontos estão resolvidos.

Os blocos de código não foram alterados, portanto não foi necessário repetir os testes. A ressalva de retorno estrito em Two Sum permanece, sem bloquear o fechamento já aprovado. A explicação da razão de contarC continua disponível no feedback, sem exigir complementação textual. Capítulo 10 segue concluído.

## Evidências e avaliação

- **Tamanho da entrada, constantes e termo dominante:** atividades 1–2; a comparação numérica encontra corretamente o intervalo inteiro de 2 a 43, e a expressão cúbica é classificada em Θ(n³).
- **Casos e hipóteses:** atividade 3; busca linear correta, melhor caso constante, pior caso linear e média linear sob posição equiprovável do alvo presente. O contador usa o parâmetro recebido e encontra a primeira ocorrência.
- **Limites reais e famílias de crescimento:** atividade 4; loops sequenciais, limite interno constante e soma triangular corretamente diferenciados. Reconhecimento de crescimento constante, linear, logarítmico, n log n, quadrático e 2ⁿ.
- **Trabalho oculto e otimização:** atividade 5; identifica a soma repetida no callback e a move para antes do map, reduzindo tempo de Θ(n²) para Θ(n), preservando o resultado. Distingue entrada, saída e espaço auxiliar, e reconhece o trade-off de manter resultados entre pedidos.
- **Aplicação em problemas:** atividades 6–7; soluções por pares, custo quadrático no pior caso, caso com índices distintos em Two Sum e relação entre crescimento e TLE em Contains Duplicate. A limitação do retorno de Two Sum foi identificada pelo próprio aluno.
- **Reutilização de informação:** a implementação final de Stock mantém o menor preço do prefixo e o maior lucro observado. Pela inspeção do professor, executa uma passagem, Θ(n) de tempo e Θ(1) de espaço auxiliar; o mínimo nunca vem de um dia futuro. Essa análise é da correção, não uma resposta retrospectivamente atribuída ao aluno.

O conjunto sustenta os pré-requisitos para Set, Map e hashing. O uso formal de Ω não possui uma resposta específica no arquivo; seu estudo foi relatado. Não se atribui demonstração formal das notações nem domínio de hashing. Retomar naturalmente os limites O/Ω/Θ nas próximas análises, sem condicionar o fechamento a um novo questionário.

## Correções pontuais — sem nova entrega obrigatória

1. **Atividade 5, A.7:** a pergunta é sobre espaço total no pico. A resposta “original: n²; modificada: n” corresponde ao tempo. Em ambas, entrada Θ(n) + saída Θ(n) + auxiliar Θ(1) resulta em **espaço total Θ(n)**. A separação correta em A.6 mostra que o erro é localizado.
2. **Atividade 3:** alvo ausente exige n comparações, Θ(n); não há melhor caso constante entre entradas de tamanho n em que o alvo está ausente. Com alvo presente equiprovável, a média exata é (n + 1)/2, coerente com a aproximação dada.
3. **Atividade 4:** contarB faz 4n incrementos para todo n inteiro positivo; não depende de n ultrapassar 4. A razão de contarC entre 8 e 16 é 120/28 ≈ 4,286 e tende a 4 ao dobrar n; crescimento quadrático não exige razão exatamente 4 para entradas pequenas.
4. **Atividade 5, B.3:** se a entrada mudar, é necessário invalidar ou recalcular o resultado guardado; trocar apenas a referência não garante atualização dos valores.
5. **Two Sum:** o código funciona nos casos testados que possuem solução, mas falha na checagem TypeScript estrita por poder terminar sem retorno. A garantia do problema não é inferida pelo compilador. O aluno já identificou essa limitação; permanece registrada sem reescrever sua tentativa ou antecipar a otimização.

## Verificação do professor

Oito blocos foram checados isoladamente: sete passaram na checagem de tipos em modo estrito; Two Sum apresentou somente a falta de retorno descrita acima. Após transpilação em memória, passaram 21 verificações comportamentais de busca, contagem, soma, pares, duplicados e Stock, incluindo vazio onde pertinente, primeira ocorrência, ausência, negativos, preços decrescentes/iguais e entrada unitária. A fronteira numérica 43/44 da atividade 1 também foi conferida. Esses testes foram feitos pelo professor nesta revisão, não são entregas do aluno nem submissões ao LeetCode.

A prática adicional, o desenho manual/pseudocódigo, o debugging e as análises feitas durante a viagem são relatos considerados na avaliação, sem códigos externos ou resultados Accepted auditados. O nível de ajuda recebido nessas tentativas não foi documentado; não se presume realização sem apoio. O apoio desta revisão consiste na inspeção, nos testes e nas correções pontuais acima.

**Próximo passo:** preparar futuramente o Capítulo 11 — Set, Map e hashing, quando solicitado. Contains Duplicate e Find All Numbers Disappeared in an Array são pontes para buscas repetidas; revisitar após ensinar as ferramentas, sem antecipar soluções.
