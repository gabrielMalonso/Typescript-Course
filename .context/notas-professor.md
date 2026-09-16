# Orientações para os próximos conteúdos

Atualizado em 2026-09-16. Manter apenas decisões que orientam acompanhamento e criação; regras gerais ficam no [AGENTS.md](../AGENTS.md).

## Curadoria do capítulo 11

Fundamentos e exercício de chaining concluídos; a entrega está preservada e o resultado consta no PROGRESSO. Set/Map ainda não avaliados. Continuação na etapa 3 com a aula de Set; não exigir repetição dos vídeos ou conceitos do CLRS. Âncora: buscas repetidas nas tentativas do 10. Contains Duplicate e Two Sum têm código inspecionado; Find All Numbers Disappeared in an Array é experiência relatada, sem tentativa externa conferida.

Fontes verificadas em 16/09/2026:

- [CS50x 2026 — Week 5](https://cs50.harvard.edu/x/2026/weeks/5/), David Malan, gravação 2025: [vídeo oficial](https://www.youtube.com/watch?v=PmAI76OGE_E), Dictionaries 10:44–12:26 e Hashing and Hash Tables 1:36:47–1:53:51. Limites conferidos na tabela de capítulos da descrição oficial do YouTube em 16/09/2026; conteúdo conferido na transcrição/legendas oficiais. O SRT do CDN usa tempos diferentes do vídeo editado: não transportar seus timestamps para links do YouTube. Dicionários prepara chave/valor; hashing fornece exemplos, colisões e trade-off com memória. Código C e ponteiros são contexto, não cobrança. O exemplo de número fixo de grupos mantém custo linear; leitura CLRS e nota de custo explicitam as hipóteses para custo esperado constante. Substitui o short de 2017 por solicitação de Gabriel; preferência permanente por buscar a aula mais atual em AGENTS.
- CLRS 3ª edição inglesa, original autorizado em `/Volumes/SSD1TB/Documents/Cormen Introduction to Algorithms.pdf`: introdução e 11.1 nas pp. 253–255, 11.2 nas pp. 256–260, exercício 11.2-2 na p. 261. Posição no PDF = impressa + 21. Recortes com nove páginas completas, conferidos contra o original. Recortes e caminhos preservados. Teoremas, provas, esperança e variáveis indicadoras das pp. 259–260 são aprofundamento opcional; nenhuma releitura obrigatória. Exercício 11.2-2 concluído, sem nova entrega.
- [MIT 6.006 Fall 2011 — readings](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) confirma 11.1–11.3 para hashing. Usamos só os recortes necessários; provas probabilísticas, listas ligadas, implementação genérica e open addressing ficam fora.
- [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) e [ECMAScript keyed collections](https://tc39.es/ecma262/multipage/keyed-collections.html): API, identidade e garantia de acesso sublinear em média. O(1) é hipótese de hashing, não promessa universal do JavaScript; considerar distribuição, carga, tamanho das chaves e custo de construção.
- Aulas autorais em `02-aulas-do-curso/01-set.md`, `02-aulas-do-curso/02-map.md` e `02-aulas-do-curso/03-escolher-representacoes.md`: permissões → presença/identidade/custo; preços → associação/ausência → atualização de quantidade; requisitos de empréstimos → escolha de representação. Recortes MDN/ECMAScript e Handbook revalidados em 16/09/2026 e documentados junto das aulas. A explicação de contagem usa um único evento de reserva, sem antecipar algoritmos de anagramas ou dos problemas revisitados. Documentação é consulta, não apostila sequencial.
- Enunciados completos do LeetCode 217, 1, 242, 448 e 387 conferidos nos links da prática. 242 mantém a–z, exclui follow-up Unicode e acrescenta tentativa sem ordenação. 448 permite memória auxiliar e acrescenta preservação da entrada; follow-up de espaço constante dispensado. 387 opcional. Labs próprios cobrem as lacunas de API/identidade e ausência versus zero, que o exercício CLRS não cobre.

## Acompanhamento e retomadas

Aceitar feedback após o experimento de Set ou Contains Duplicate, antes de Map. Essenciais 2–6 cobrem API/identidade, presença, ausência versus valor válido, índice associado e frequências. A atividade 9 aplica escolha de representação a um programa pequeno em memória; 7 e 8 permanecem adicionais, sem quota. Colisões/carga já foram estudadas e serão relacionadas às decisões sem repetir a leitura. Consolidação 7 e desafio 8 não bloqueiam sem lacuna essencial. Não atribuir Accepted ou execução independente sem evidência.

Após Set/Map, comparar o trabalho anterior e o novo, incluindo memória e hipóteses do custo esperado. Retomar O/Ω/Θ nessa análise somente quando necessário. Retomar colisão versus igualdade somente se a prática revelar dúvida.

Em 12–13, apresentar um contrato/contexto diferente que exija recuperar contagem ou pertinência sem nomear a estrutura. Reavaliar conforme as entregas do 11, retirando pendências resolvidas. No C01, integrar escolha de representação e comparação de alternativas. Não criar atividades futuras agora.

Ao revisitar Two Sum, preservar a tentativa existente: Gabriel conhece a ressalva de retorno estrito e decidiu mantê-la pelo contrato do LeetCode. Não é pendência obrigatória. Arrays, funções, referências e a análise do 10 são conhecimentos disponíveis; generics autorais, classes e hash table própria não são pré-requisitos do 11.

## Revisão da continuação preparada

Vídeos e CLRS continuam como contato direto já realizado; a nova aula não exige repeti-los. Os exemplos partem de arrays, objetos e callbacks conhecidos e introduzem uma necessidade por vez. O modelo de hashing é separado do contrato ECMAScript; formalismo opcional permanece fora da prática essencial. Set antecede sua revisão independente; Map vem depois, sem soluções de Contains Duplicate ou Two Sum. Experimentos pedem somente previsão/observação pertinente e os enunciados pedem implementação curta. Materiais preparados não equivalem a competências demonstradas; não iniciar o 12 nesta alteração.
