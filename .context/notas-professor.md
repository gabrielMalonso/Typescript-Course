# Orientações para os próximos conteúdos

Atualizado em 2026-09-16. Manter apenas decisões que orientam acompanhamento e criação; regras gerais ficam no [AGENTS.md](../AGENTS.md).

## Curadoria do capítulo 11

Material criado, ainda não estudado nem avaliado. Âncora: buscas repetidas nas tentativas do 10. Contains Duplicate e Two Sum têm código inspecionado; Find All Numbers Disappeared in an Array é experiência relatada, sem tentativa externa conferida.

Fontes verificadas em 16/09/2026:

- [CS50x 2026 — Week 5](https://cs50.harvard.edu/x/2026/weeks/5/), David Malan, gravação 2025: [vídeo oficial](https://www.youtube.com/watch?v=PmAI76OGE_E), Dictionaries 10:44–12:26 e Hashing and Hash Tables 1:36:47–1:53:51. Limites conferidos na tabela de capítulos da descrição oficial do YouTube em 16/09/2026; conteúdo conferido na transcrição/legendas oficiais. O SRT do CDN usa tempos diferentes do vídeo editado: não transportar seus timestamps para links do YouTube. Dicionários prepara chave/valor; hashing fornece exemplos, colisões e trade-off com memória. Código C e ponteiros são contexto, não cobrança. O exemplo de número fixo de grupos mantém custo linear; leitura CLRS e nota de custo explicitam as hipóteses para custo esperado constante. Substitui o short de 2017 por solicitação de Gabriel; preferência permanente por buscar a aula mais atual em AGENTS.
- CLRS 3ª edição inglesa, original autorizado em `/Volumes/SSD1TB/Documents/Cormen Introduction to Algorithms.pdf`: introdução e 11.1 nas pp. 253–255, 11.2 nas pp. 256–260, exercício 11.2-2 na p. 261. Posição no PDF = impressa + 21. Recortes com nove páginas completas, conferidos contra o original. Abertura e fechamento incluídos para preservar a continuidade; no guia, provas probabilísticas e detalhes de implementação ficam dispensados. Etapa 4 aponta para páginas internas 3, 4 e 5 do recorte 11.2. Índice e navegação ordenam PDFs do mesmo livro por página impressa, mantendo caminhos existentes. Revisão solicitada por Gabriel após perceber cortes e exercícios fora de ordem; não ampliar a lista de prática. Cadastro do Convex sincronizado; revisão publicada no site privado em 16/09/2026, versão 51 (`succeeded`).
- [MIT 6.006 Fall 2011 — readings](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) confirma 11.1–11.3 para hashing. Usamos só os recortes necessários; provas probabilísticas, listas ligadas, implementação genérica e open addressing ficam fora.
- [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) e [ECMAScript keyed collections](https://tc39.es/ecma262/multipage/keyed-collections.html): API, identidade e garantia de acesso sublinear em média. O(1) é hipótese de hashing, não promessa universal do JavaScript; considerar distribuição, carga, tamanho das chaves e custo de construção.
- Enunciados completos do LeetCode 217, 1, 242, 448 e 387 conferidos nos links da prática. 242 mantém a–z, exclui follow-up Unicode e acrescenta tentativa sem ordenação. 448 permite memória auxiliar e acrescenta preservação da entrada; follow-up de espaço constante dispensado. 387 opcional. Labs próprios cobrem as lacunas de API/identidade e ausência versus zero, que o exercício CLRS não cobre.

## Acompanhamento e retomadas

Aceitar feedback parcial após atividades 1–2. Essenciais 1–6 cobrem distribuição/colisão, API/identidade, presença, ausência versus valor válido, índice associado e frequências. Consolidação 7 e desafio 8 não bloqueiam sem lacuna essencial. Não atribuir Accepted ou execução independente sem evidência.

Após Set/Map, comparar o trabalho anterior e o novo, incluindo memória e hipóteses do custo esperado. Retomar O/Ω/Θ nessa análise somente quando necessário. No começo da próxima sessão, recuperar a diferença entre colisão e igualdade sem releitura; é retomada, não prova.

Em 12–13, apresentar um contrato/contexto diferente que exija recuperar contagem ou pertinência sem nomear a estrutura. Reavaliar conforme as entregas do 11, retirando pendências resolvidas. No C01, integrar escolha de representação e comparação de alternativas. Não criar atividades futuras agora.

Ao revisitar Two Sum, preservar a tentativa existente: Gabriel conhece a ressalva de retorno estrito e decidiu mantê-la pelo contrato do LeetCode. Não é pendência obrigatória. Arrays, funções, referências e a análise do 10 são conhecimentos disponíveis; generics autorais, classes e hash table própria não são pré-requisitos do 11.
