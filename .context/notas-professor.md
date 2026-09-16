# Orientações para os próximos conteúdos

Atualizado em 2026-09-16. Manter apenas decisões que orientam acompanhamento e criação; regras gerais ficam no [AGENTS.md](../AGENTS.md).

## Curadoria do capítulo 11

Material criado, ainda não estudado nem avaliado. Âncora: buscas repetidas nas tentativas do 10. Contains Duplicate e Two Sum têm código inspecionado; Find All Numbers Disappeared in an Array é experiência relatada, sem tentativa externa conferida.

Fontes verificadas em 16/09/2026:

- [CS50 Short Hash Tables](https://cs50.harvard.edu/x/shorts/hash_tables/), Doug Lloyd, gravação 2017 disponibilizada no CS50x atual: 02:44–06:14 e 08:29–09:42, conferidos nas [legendas oficiais](https://cdn.cs50.net/2017/fall/shorts/hash_tables/lang/en/hash_tables.srt). Recortes para função, determinismo, distribuição e colisão, evitando implementação em C/listas. A menção breve a linked list não é pré-requisito. Não repetir a aula de algoritmos já assistida.
- CLRS 3ª edição inglesa: p. 254, abertura de 11.1/figura 11.1; pp. 256–257, abertura de 11.2 até o primeiro parágrafo de chaining; p. 258, apenas Analysis of hashing with chaining. Exercício 11.2-2 na p. 261: desenho dos grupos com inserção no início, sem implementar lista ligada. Conteúdo integral dessas páginas inspecionado no [exemplar institucional usado na conferência do 10](https://www.eng.biu.ac.il/~wimers/files/courses/Data_Structures_and_Algorithms_I/Materials/Introduction_to_algorithms-3rd%20Edition.pdf). Posição do PDF = impressa + 21. Original pessoal disponibilizado e autorizado por Gabriel em `/Volumes/SSD1TB/Documents/Cormen Introduction to Algorithms.pdf`; terceira edição inglesa e paginação conferidas. Três recortes integrados localmente: p. 254 (posição 275), pp. 256–258 (277–279) e p. 261 (282), cinco páginas completas. Texto de cada página comparado com o original, que permanece intacto. Link da etapa 4 usa página 3 do recorte; exercício usa página 1. Cadastro local atualizado; sincronização do backend e publicação ainda não realizadas.
- [MIT 6.006 Fall 2011 — readings](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) confirma 11.1–11.3 para hashing. Usamos só os recortes necessários; provas probabilísticas, listas ligadas, implementação genérica e open addressing ficam fora.
- [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) e [ECMAScript keyed collections](https://tc39.es/ecma262/multipage/keyed-collections.html): API, identidade e garantia de acesso sublinear em média. O(1) é hipótese de hashing, não promessa universal do JavaScript; considerar distribuição, carga, tamanho das chaves e custo de construção.
- Enunciados completos do LeetCode 217, 1, 242, 448 e 387 conferidos nos links da prática. 242 mantém a–z, exclui follow-up Unicode e acrescenta tentativa sem ordenação. 448 permite memória auxiliar e acrescenta preservação da entrada; follow-up de espaço constante dispensado. 387 opcional. Labs próprios cobrem as lacunas de API/identidade e ausência versus zero, que o exercício CLRS não cobre.

## Acompanhamento e retomadas

Aceitar feedback parcial após atividades 1–2. Essenciais 1–6 cobrem distribuição/colisão, API/identidade, presença, ausência versus valor válido, índice associado e frequências. Consolidação 7 e desafio 8 não bloqueiam sem lacuna essencial. Não atribuir Accepted ou execução independente sem evidência.

Após Set/Map, comparar o trabalho anterior e o novo, incluindo memória e hipóteses do custo esperado. Retomar O/Ω/Θ nessa análise somente quando necessário. No começo da próxima sessão, recuperar a diferença entre colisão e igualdade sem releitura; é retomada, não prova.

Em 12–13, apresentar um contrato/contexto diferente que exija recuperar contagem ou pertinência sem nomear a estrutura. Reavaliar conforme as entregas do 11, retirando pendências resolvidas. No C01, integrar escolha de representação e comparação de alternativas. Não criar atividades futuras agora.

Ao revisitar Two Sum, preservar a tentativa existente: Gabriel conhece a ressalva de retorno estrito e decidiu mantê-la pelo contrato do LeetCode. Não é pendência obrigatória. Arrays, funções, referências e a análise do 10 são conhecimentos disponíveis; generics autorais, classes e hash table própria não são pré-requisitos do 11.
