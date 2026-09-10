# Auditoria do piloto por curadoria — 2026-09-10

## Escopo e preservação

Reconstrução expressamente solicitada por Gabriel. O capítulo passou de 15 documentos didáticos para três: README.md, notas.md e pratica/atividades.md. Não havia arquivos de respostas/soluções na pasta antes da substituição. O README foi reescrito e os 14 documentos abaixo foram retirados do percurso ativo; sua versão está preservada no commit anterior `faa0924fb005d9a5a20ea2f7d0c12c3bd7c46ef5`. A auditoria de 09/09 permanece intacta como histórico.

- `10-complexidade-e-big-o/aula/01-do-problema-a-contagem.md`
- `10-complexidade-e-big-o/aula/02-big-o-e-crescimento.md`
- `10-complexidade-e-big-o/aula/03-memoria-e-custos-escondidos.md`
- `10-complexidade-e-big-o/aula/04-experimentos.md`
- `10-complexidade-e-big-o/checkpoint/perguntas.md`
- `10-complexidade-e-big-o/pratica/01-fundamentos.md`
- `10-complexidade-e-big-o/pratica/02-aplicacao.md`
- `10-complexidade-e-big-o/pratica/03-desafios.md`
- `10-complexidade-e-big-o/pratica/debugging.md`
- `10-complexidade-e-big-o/pratica/leetcode.md`
- `10-complexidade-e-big-o/recursos/referencias.md`
- `10-complexidade-e-big-o/revisao/erros-comuns.md`
- `10-complexidade-e-big-o/revisao/resumo.md`
- `10-complexidade-e-big-o/revisao/revisitar.md`

Foram comparados por SHA-256 os arquivos versionados de 00–09, diário, teste.ts, EMENTA, AGENTS, histórico de avaliações e auditoria anterior: todos permaneceram idênticos ao início. Nenhuma competência, nota, entrega ou conclusão foi inventada. Contexto e progresso distinguem a disponibilidade do guia de domínio demonstrado.

## Curadoria e limites

- CS50x 2026 Week 3: página oficial conferida; já assistido por relato. Retomada por segmentos nomeados, sem impor nova reprodução integral.
- CLRS 3ª edição inglesa: leitura de 1.2, recortes de 2.2, 3.1 e 3.2; páginas impressas e subtítulos inspecionados no texto integral. Exercícios 1.2-2, 1.2-3, 2.2-1 e 2.2-3 conferidos. O guia encaminha ao exemplar próprio e identifica extensões do curso, sem reproduzir enunciados ou gabaritos.
- Fonte de conferência textual: exemplar institucional em https://www.eng.biu.ac.il/~wimers/files/courses/Data_Structures_and_Algorithms_I/Materials/Introduction_to_algorithms-3rd%20Edition.pdf. Identificação editorial: https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/. Páginas em traduções não foram presumidas equivalentes.
- MIT 6.006 Fall 2011: mapa oficial correspondente à 3ª edição; Lecture 2 como consulta opcional. Os recortes são nossa seleção. PS1 não foi imposto por depender de recorrências/peak finding além do escopo.
- LeetCode: enunciados oficiais de Two Sum, Contains Duplicate e Best Time to Buy and Sell Stock conferidos. Atividades retomam tentativas reais; versões ausentes podem ser descritas como lembrança, sem fabricação de resultados. Set/Map não foram antecipados.
- MDN map/find e Node performance.now conferidos para os apoios de linguagem e medição. Custos declarados como modelo, não garantia de runtime.
- Revisão independente por subagente confirmou recortes, cobertura da EMENTA, ausência de soluções antecipadas e adequação das adaptações. Principal integrou a seleção.

## Verificações

- 8 atividades essenciais, 2 de consolidação e 1 desafio opcional, incluindo 3 LeetCodes. Sem checkpoint ou prova obrigatória. Recursão é apoio opcional, sem cobrança ou domínio atribuído.
- Quatro blocos TypeScript compilados em modo estrito, alvo ES2022, e executados em memória. Conferidos vazio, um elemento, 4/8/16, negativos e rastreamento do exemplo opcional; código intencionalmente ineficiente mantém o contrato descrito.
- Catálogo executado em memória com os Markdown reais: os mesmos 99 documentos históricos e sua ordem; três documentos no 10; notas na raiz; respostas/correções/resultados/gabaritos excluídos. Links locais, sequência entre os três arquivos e resolução de caminho substituído conferidos. Lista de 14 caminhos substituídos encaminha ao guia sem reintroduzir arquivos no índice.
- `npm run typecheck`, `npm run lint` e `npm run build` aprovados. Permanecem dois avisos de Fast Refresh e aviso de chunk grande; build também informa limite de classificação estática de rotas do Vinext. Não houve alteração de dependências ou hospedagem.
- Home, guia e prática responderam HTTP 200 localmente. HTTP 200 foi complementado pela conferência funcional do catálogo, não tratado isoladamente como prova de conteúdo. Preview inicializado, sem inspeção visual ou testes de navegador solicitados; ferramenta informou aba disponível com visible=false.
- `git diff --check` aprovado. Ambiente: Node v24.15.0, ts-node v10.9.2.

## Entrega e continuidade

Resultado local integrado ao leitor. Nenhuma publicação externa realizada nesta tarefa; a versão hospedada anterior não foi apresentada como atualizada. Próximo passo do aluno: CLRS 1.2 e atividade 1. Feedback pode começar após as primeiras tentativas; refinamento do piloto depende da experiência real de estudo.
