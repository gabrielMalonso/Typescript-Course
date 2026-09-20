# Agentes de criação e revisão de aulas

Metodologia vigente em 2026-09-20. A [EMENTA](../EMENTA.md) define o assunto e sua posição no curso; este documento concentra as instruções pedagógicas dos agentes.

## Responsabilidades

O agente principal define o capítulo solicitado e integra a entrega. Pode delegar curadoria e revisão a subagentes quando houver trabalho independente útil; antes de edições paralelas, definir arquivos de responsabilidade exclusiva. Todos recebem o mesmo trecho da ementa, objetivo e limites. Não é necessário abrir um agente para cada etapa.

- **Curadoria:** buscar a videoaula adequada, consultar o mapa de leituras do MIT para o assunto, inspecionar as seções indicadas no livro canônico e selecionar o que precisa de leitura, explicação e experimentação.
- **Escrita:** desenvolver a aula a partir das fontes selecionadas, construir a ponte para TypeScript e organizar o guia de estudo.
- **Revisão:** conferir precisão, clareza, pré-requisitos, exemplos, custos das abstrações e necessidade das atividades; devolver correções concretas para integração.

Criar somente o capítulo solicitado. Usar a ementa, os materiais anteriores pertinentes e as orientações da conversa para situar o leitor; consultar trabalhos anteriores apenas quando necessários, sem presumir domínio nem exigir um cadastro permanente do aluno.

## Percurso de criação

**Assunto da ementa → videoaula CS50/Harvard → leitura do livro orientada pelo MIT → aula autoral prática em TypeScript → experimentação.**

Esse é o percurso preferencial, adaptável ao assunto. O vídeo oferece a primeira intuição; o livro desenvolve os fundamentos; a aula autoral reconstrói as conexões e mostra como usar o conhecimento ao programar. A ementa determina a sequência: não seguir a ordem do MIT nem terminar seções do livro apenas para cumprir a referência. Não exigir rever materiais já estudados. Se não houver vídeo ou recorte adequado, explicar brevemente a escolha no guia e usar uma alternativa pertinente.

## Livro e fontes

Para algoritmos e estruturas de dados, o livro canônico é **Introduction to Algorithms — Cormen, Leiserson, Rivest e Stein (CLRS), 3ª edição em inglês**. Exemplar local autorizado: `/Volumes/SSD1TB/Documents/Cormen Introduction to Algorithms.pdf`. Conferir esse arquivo antes de pedir outro; preservar o original completo fora do repositório. Se indisponível, informar antes de substituir o exemplar.

Para selecionar leituras de algoritmos e estruturas de dados, consultar o [mapa oficial do MIT 6.006 — Fall 2011](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/), que relaciona assuntos a capítulos e seções do CLRS, 3ª edição. Localizar o tema correspondente à ementa; a indicação do MIT é o ponto de partida da seleção, não um recorte automaticamente aprovado.

Ler as seções candidatas no exemplar canônico antes de escolher as páginas. Conferir se desenvolvem o objetivo do capítulo, quais pré-requisitos exigem, o que merece contato direto e o que precisa de mediação. Delimitar fundamentos úteis, aplicação prática e aprofundamento formal opcional. Conferir edição, páginas impressas e posições do PDF; não escolher pelo título nem importar a lista inteira do MIT. Se não houver correspondência adequada, buscar uma fonte pertinente em vez de forçar um recorte. Nas demais áreas, usar a referência canônica correspondente quando definida.

Preservar o contato direto com o livro. A aula autoral é a passagem que desenvolve as conexões, esclarece os mecanismos e leva o assunto ao código; não é apenas um resumo nem uma substituição automática da leitura. Identificar o que a fonte já explica bem e quais saltos precisam de mediação. Dar espaço para a tentativa de compreensão independente; a aula seguinte deve esclarecer o que ficou abstrato e conectar ao repertório do aluno, sem recontar indiscriminadamente o livro.

Na pesquisa de videoaulas, verificar primeiro **CS50/Harvard**, depois MIT OCW ou outra fonte acadêmica quando mais adequada. Procurar a edição mais atual disponível sobre o assunto e conferir o ano real da gravação; uma página atual pode reutilizar vídeo antigo. Indicar link oficial e trechos pertinentes, com timestamps verificados. Ao escolher uma aula anterior, explicar brevemente a adequação em relação à alternativa mais recente. Conteúdos futuros que apareçam no vídeo não se tornam pré-requisitos do capítulo.

Documentação oficial e MDN complementam o comportamento e as APIs da linguagem; não viram leitura sequencial de um catálogo de métodos. Fontes em C, Python ou pseudocódigo exigem tradução didática: não transportar automaticamente seus modelos de custo para TypeScript.

Registrar junto à aula somente as fontes usadas, seções e links verificáveis. No guia, informar livro/edição, foco e limite de leitura, com páginas conferidas. Não produzir relatórios separados de curadoria.

## Desenvolvimento do assunto

Seguir uma progressão que faça sentido para o tema:

**conhecido → problema → conceito e mecanismo → modelo mental → TypeScript → exemplo/experimento → custo e limitações → aplicação.**

Partir de uma situação concreta ou código já apresentado, mudar uma coisa por vez e explicar entrada, saída e estado quando necessário. Mostrar por que a ferramenta existe antes de enumerar sua API. Voltar ao problema inicial para mostrar o que o novo conceito permite compreender ou resolver.

Preservar fundamentos de Ciência da Computação e o raciocínio transferível entre linguagens. Priorizar o que ajuda Gabriel a implementar, escolher ferramentas, testar, depurar e analisar tempo e espaço. Aprofundar mecanismos que melhoram essas decisões; provas extensas e formalismo de baixo retorno podem ficar opcionais. Explicar por que funciona e sob quais condições, sem transformar o curso em catálogo de APIs nem importar todos os pré-requisitos acadêmicos do livro.

Fazer explicitamente a tradução para o código que o aluno escreverá. Por exemplo, após hashing e colisões, apresentar `Set` e `Map` como abstrações disponíveis em TypeScript/JavaScript, distinguindo o modelo de implementação das garantias da linguagem. Quando pertinente, incluir repertório breve de criação, operações e iteração, com exemplos pequenos; não apresentar uma documentação completa da API.

Sintaxe concisa também realiza trabalho: em `palavra.split("").sort().join("")`, explicar o custo de separar, ordenar e reunir, incluindo memória intermediária. Ligar operações prontas à análise de tempo e espaço; declarar tamanho da entrada, hipóteses e limitações relevantes, sem prometer complexidades não garantidas pela linguagem.

Usar TypeScript idiomático, tipos precisos e exemplos executáveis. Explicar a sintaxe auxiliar necessária de C, SQL ou outras linguagens no próprio contexto, sem abrir cursos paralelos. Não acumular sintaxe futura e contexto profissional desconhecido no mesmo exemplo.

Escrever uma ideia por vez, definir termos no primeiro uso e conectar as frases. Clareza pode exigir mais explicação; evitar tanto a prolixidade quanto a compressão em listas de termos. Diagramas e rastreamentos entram quando ajudam a compreender.

## Exercícios somente quando necessários

Adicionar uma atividade apenas quando ela permitir experimentar ou compreender algo específico que a aula e seus exemplos não resolvam bem. Um capítulo pode não ter lista de exercícios. Não gerar baterias para cobrir formalmente cada tópico, quotas, provas, checkpoints ou planos de revisão obrigatórios.

Preferir uma tarefa pequena, com objetivo claro, dados e restrições suficientes. Evitar partes A/B, muitas subperguntas e relatórios; pedir justificativa ou análise de custo somente quando acrescentarem aprendizagem. Não entregar decomposição ou solução no enunciado. Se adaptar uma questão, conferir o original e identificar fonte e adaptações.

Em labs, fornecer procedimento e ambiente isolado, com encerramento seguro. Não usar dados reais ou infraestrutura compartilhada para experimentos didáticos. Respostas e soluções são produzidas pelo aluno, não antecipadas pelos agentes.

## Organização e integração

O `README.md` do capítulo é o **Guia de estudo**: objetivo breve, links diretos, limites de leitura e próxima ação. Conectar vídeo, leitura delimitada e aula correspondente, com experimentos no ponto útil; não obrigar a consumir toda a teoria antes de ver código.

- `01-leituras-do-livro/`: recortes PDF autorizados e respectivos metadados JSON.
- `02-aulas-do-curso/`: aulas por assunto, reunindo explicação, TypeScript, exemplos e fontes.
- `03-pratica/atividades.md`: somente quando houver necessidade de exercícios.

Criar apenas arquivos necessários, sem pastas vazias. Não impor divisão entre teoria, sintaxe e exemplos nem quantidade fixa de aulas. Preservar os caminhos dos capítulos antigos. Complementos pontuais podem usar `notas.md`; o conteúdo principal pertence às aulas.

Recortes mantêm páginas completas. Conferir páginas impressas, posições no PDF original e conteúdo; o guia delimita o que estudar dentro delas. Links `nome.pdf#page=N` contam a página dentro do recorte, a partir de 1, enquanto o texto mostra a página impressa. Seguir [leitor/README.md](../leitor/README.md) para metadados, catálogo, âncoras e integração, mantendo respostas e correções fora do leitor.

## Revisão antes da entrega

Conferir se o leitor consegue compreender o conceito, visualizar seu uso em código e reconhecer as abstrações relevantes e seus custos. Remover repetições e atividades que só aumentem o volume. Verificar se os pré-requisitos e a sintaxe foram apresentados, se a seleção do livro foi inspecionada e se os limites de vídeo e leitura estão claros. A aula precisa desenvolver o assunto e mostrar sua utilidade, sem apenas resumir as fontes.

Validar exemplos executáveis, saídas, casos de borda relevantes e links locais/externos usados; identificar exemplos intencionalmente incorretos. Conferir o percurso e a entrada dos materiais no catálogo. Não executar todos os trabalhos antigos por uma alteração documental. Se mudar o leitor, seguir suas verificações técnicas.

Entregar um relato curto dos materiais alterados e das verificações ou limitações. Não gerar arquivos de progresso, perfil, histórico, auditoria ou acompanhamento. Publicação é uma ação separada, conforme o escopo autorizado.
