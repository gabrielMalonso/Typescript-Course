# Roteiro de criação de capítulos por curadoria

Atualizado em 2026-09-16. [AGENTS.md](../AGENTS.md) define a metodologia; [EMENTA.md](../EMENTA.md) define conteúdo e sequência. Este roteiro organiza o trabalho do professor. Não é uma lista de tarefas ou de perguntas para o aluno.

## 1. Situar o capítulo

Ler estado atual, perfil, notas pertinentes, base de conhecimentos disponível e o trecho correspondente da ementa. Consultar correções anteriores apenas quando necessárias à tarefa. Distinguir estudo relatado, código inspecionado e domínio avaliado.

Definir o que o aluno precisa conseguir fazer ao final e qual experiência conhecida abre o assunto. Conferir os pré-requisitos. Aplicar os três níveis de profundidade do AGENTS: domínio prático, mecanismos que melhoram decisões e aprofundamento formal opcional. A fonte não determina a profundidade; delimitar ou interromper seções quando necessário. Não criar capítulos futuros nem ampliar a ementa para acomodar uma referência difícil.

## 2. Selecionar fontes e prática

Pesquisar primeiro CS50/Harvard para vídeo; sempre verificar a aula mais atualizada disponível, distinguindo edição do curso de ano da gravação, conforme AGENTS. Recorrer ao MIT OCW ou a outra fonte acadêmica quando mais adequada. Não exigir rever aula já assistida. Indicar link oficial, edição e trechos; usar timestamps somente quando conferidos.

Em DSA, usar CLRS 3ª edição como livro-âncora e o mapa de leituras do MIT como apoio. Inspecionar o conteúdo dos recortes, verificar páginas e selecionar o que serve à competência atual. Se houver muitos pré-requisitos ausentes, recortar ou substituir a referência. Registrar justificativas da seleção nas notas do professor.

Selecionar exercícios do livro, MIT ou CS50 conforme adequação, com LeetCode/labs quando pertinentes. Conferir o enunciado completo, o esforço e os conhecimentos exigidos. Registrar fonte e adaptações para TypeScript, preservando o objetivo e as restrições. Não incluir soluções junto aos enunciados.

As faixas de atividades do AGENTS são referências flexíveis, não metas. Contar o esforço dos subitens e incluir revisões e LeetCodes no total. Essenciais cobrem as competências; consolidação atende dificuldades; desafio é opcional.

## 3. Montar o percurso do aluno

Usar `README.md`, apresentado como **Guia de estudo**, para conectar fontes, aula autoral, experimentação, prática e feedback, sem exigir todos os formatos. Intercalar conforme o assunto. Cada etapa explica brevemente a ligação com a anterior, aponta o material e indica a próxima ação.

Informar livro/edição uma vez; delimitar seções, páginas e o foco de cada leitura. Usar a organização de referência do AGENTS: leituras do livro em `01-leituras-do-livro/`, aulas por assunto em `02-aulas-do-curso/` e prática em `03-pratica/`, costuradas pelo guia. Usar PDFs com metadados conforme `leitor/README.md`; nos links, `#page=N` é a página dentro do recorte, a partir de 1. Só criar links para arquivos existentes.

Planejar e escrever a aula conforme “Fontes, aula autoral e prática” do AGENTS: identificar as pontes e lacunas atuais, construir a progressão e concretizá-la em TypeScript. Registrar fontes/recortes e distinguir garantias de modelos e simplificações. A consulta à documentação pode fundamentar a aula sem se tornar leitura sequencial obrigatória.

O capítulo 10 é referência de navegação, recortes e prática intercalada. Seus questionários extensos e trechos densos não são um modelo a reproduzir.

## 4. Escrever atividades diretas

Apresentar o problema com os dados e as restrições necessários. Favorecer implementação/experimentação, breve justificativa e análise de tempo/espaço quando pertinente. Trade-offs e perguntas extras entram apenas para explorar um ponto relevante.

Não criar automaticamente Parte A + Parte B nem esconder várias perguntas em um único item. O aluno não precisa descrever cada detalhe do código. O professor verifica correção, limites e competências no conjunto das evidências; pede esclarecimento apenas onde houver dúvida real.

Preservar o percurso: modelagem manual/pseudocódigo → primeira solução correta com o repertório atual → testes/debugging → análise → melhoria possível. Força bruta é válida como ponto de partida. Guardar tentativas para revisitar depois de ensinar novas ferramentas, sem antecipar a solução ótima.

Nos labs, fornecer procedimento e limites seguros; pedir observação e explicação focadas no conceito. No debugging, conferir a causa, a correção e um teste que revele a falha, sem exigir um formulário. Consulta à documentação não precisa gerar relatório a cada uso.

Permitir entregas parciais e feedback durante o percurso. Não exigir respostas retrospectivas para cada subitem quando já houver evidência equivalente. Uma variação curta só é necessária quando uma competência essencial permanecer incerta. Preservar os quatro capstones, sem provas/checkpoints automáticos.

## 5. Revisar como professor e como leitor

Conferir antes de integrar:

- **Profundidade:** há prática suficiente e compreensão dos mecanismos? Formalismo de baixo retorno está opcional, sem reduzir o percurso a sintaxe/API?
- **Integração didática:** o contato com fontes, a reconstrução personalizada e a ponte explícita para TypeScript se complementam sem repetição desnecessária?
- **Conteúdo:** a prática cobre as competências e cobra apenas conhecimentos disponíveis? As fontes e adaptações foram verificadas?
- **Compreensão:** Gabriel consegue acompanhar cada trecho com o que já sabe? Há termos sem explicação, saltos de raciocínio ou conceitos demais numa frase?
- **Ação e esforço:** fica claro o que fazer em seguida? Cada pergunta acrescenta algo necessário? Código, conversa e experimentação já respondem a parte da cobrança?
- **Autonomia:** as orientações ajudam a entender o problema sem entregar sua solução? Os apoios e as retomadas entram no momento adequado?

Validar os exemplos executáveis pertinentes, os casos de borda e os links. Identificar código intencionalmente incorreto. Não executar todos os trabalhos antigos por uma mudança documental.

## 6. Integrar e registrar

Integrar guia, aulas, complementos, enunciados e recortes ao catálogo do leitor. Conferir páginas, âncoras, retorno ao guia e exclusão de respostas/correções/gabaritos. Preservar rotas, tema e visualizador existentes. Se o leitor mudar, executar typecheck, lint e build e conferir home/rota pertinente.

Atualizar estado e progresso quando houver avanço real. Nas notas, manter só decisões de curadoria e retomadas ainda úteis. Remover dificuldades superadas, pendências resolvidas e relatos sem uso atual; não criar arquivo histórico substituto. Atualizar no lugar, sem duplicar registros entre os documentos. Preservar materiais dos capítulos, diário, tentativas e resultados originais.

Distinguir material criado, estudo relatado, prática avaliada e publicação confirmada. Publicar somente no escopo autorizado, preservando projeto, URL e acesso conforme AGENTS.

## Delegação proporcional

Usar subagentes apenas no escopo autorizado pelo AGENTS e quando houver trabalho independente útil. Todos recebem as mesmas competências, conhecimentos e limites. Curadoria e seleção de prática podem ocorrer em paralelo; a revisão final considera o guia integrado. O professor principal confere as recomendações e resolve divergências. Se houver edição paralela, definir arquivos exclusivos antes de começar.
