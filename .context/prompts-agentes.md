# Roteiro de criação de capítulos por curadoria

Atualizado em 2026-09-16. [AGENTS.md](../AGENTS.md) define a metodologia; [EMENTA.md](../EMENTA.md) define o conteúdo e a sequência. Este roteiro substitui a geração automática de apostilas, checkpoints e provas de bloco. Não reorganizar ou renumerar o currículo.

## Antes de criar

Ler estado atual, perfil, notas relevantes, histórico de avaliações, última correção e trecho da ementa. Identificar capítulo/bloco/área, conhecimento-âncora, pré-requisitos, competências esperadas e dificuldades observadas. Distinguir relato do aluno, código encontrado e domínio avaliado.

## Pedido-base ao professor

> Monte o guia de estudo somente do capítulo solicitado. Use vídeo para a primeira visão, leitura orientada para aprofundamento e prática para desenvolver e demonstrar competências. Preserve a ponte entre experiência conhecida, pergunta e conceito novo. Não reescreva teoria já bem ensinada nas fontes.
>
> Pesquise a videoaula no momento da criação: CS50/Harvard primeiro, depois MIT OCW ou outra fonte acadêmica mais adequada. No guia, indique link oficial, edição e trechos ou timestamps verificados. Guarde motivo da escolha, data e justificativas no contexto do professor. Não exigir rever o que o aluno já assistiu nem dominar conteúdos que aparecem apenas como prévia.
>
> Em DSA, use CLRS 3ª edição como livro-âncora e o mapa do MIT 6.006 Fall 2011 como apoio. Inspecione os recortes antes da seleção final. Informe livro/edição uma vez e, em cada etapa, capítulo/seções, páginas verificadas, foco e limites de leitura. Antecipe somente o pequeno contexto necessário ao recorte, sem reorganizar a ementa. Não importar a sequência ou a carga do MIT.
>
> Selecione exercícios adequados do livro, MIT e CS50, complementando com LeetCode ou labs conforme a área. Registre origem e adaptações; preserve o objetivo ao traduzir para TypeScript. Não incluir soluções junto aos enunciados. Use a faixa inicial total de 8–15 atividades, incluindo LeetCode, labs e revisões, como referência flexível de esforço. Essenciais formam o percurso padrão; consolidação é condicional e desafios são opcionais. Os cerca de 3–6 LeetCodes, quando pertinentes, já pertencem a esse total e não constituem quota.
>
> Mantenha atividades enxutas: resolver/implementar, breve justificativa, tempo/espaço e trade-off quando útil, sem transformar isso em campos obrigatórios. Perguntas extras somente por necessidade conceitual; evite Parte A + Parte B automáticas e repetições de Big O. Avalie evidências em conjunto, sem exigir preenchimento retrospectivo de cada subitem. Preserve modelagem manual, força bruta correta, testes/debugging e análise antes da melhoria; não antecipe técnicas desconhecidas. No 11, use buscas repetidas já vividas como ponte e retome Contains Duplicate e Find All Numbers Disappeared in an Array após Set/Map, sem entregar soluções.
>
> Crie notas próprias apenas para lacunas concretas, com exemplos conhecidos e transformações graduais. Não presumir que a dificuldade didática se resolve apenas encurtando o texto. Se a referência exigir muitos pré-requisitos ausentes, recorte ou substitua o apoio em vez de abrir novas aulas paralelas.
>
> Permita prática entre trechos e feedback antes do fim da lista. Defina competências observáveis; a prática pode demonstrá-las sem checkpoint ou prova obrigatória. Se houver lacuna essencial, proponha reforço localizado. Preserve os quatro capstones e incorpore revisão em atividades futuras, sem calendário ou formulário obrigatório.
>
> Use README.md como caminho técnico e “Guia de estudo” como nome visível. Construa etapas na ordem real de uso: conexão curta → material → atividade → retorno ao guia. Notas entram por link à seção necessária; exercícios do livro ligam à página do recorte PDF com #page=N (posição local a partir de 1). Não duplicar teoria nem justificativas docentes no percurso. Crie outros arquivos apenas quando úteis. Preserve respostas, tentativas e histórico; integre novos enunciados no leitor e registre o trabalho sem inventar estudo concluído ou publicação.

## Ordem de trabalho do professor

1. Definir escopo e competências a partir do contexto e da ementa.
2. Pesquisar e conferir referências e exercícios, incluindo pré-requisitos e esforço.
3. Montar o guia em etapas: vídeo e recortes intercalados com prática, notas pontuais e feedback; conexões curtas tornam a sequência compreensível.
4. Acrescentar somente notas e adaptações que resolvam lacunas identificáveis.
5. Revisar cobertura, redundância, clareza, autonomia, links e exemplos executáveis pertinentes.
6. Integrar arquivos no catálogo do leitor, usando recortes PDF + JSON quando disponíveis e autorizados. Conferir mapeamento de páginas, links diretos a enunciados, âncoras e retorno ao guia; reutilizar tema, barra e zoom existentes. Se o leitor mudar, executar typecheck, lint e build e conferir home/rota pertinente. Publicar apenas no escopo autorizado, preservando projeto, URL e acesso.
7. Atualizar contexto e progresso com evidências e um próximo passo; não registrar consumo de recursos como domínio.

## Delegação proporcional

Conforme autorização registrada em AGENTS, o professor pode usar subagentes para curadoria de fontes, seleção de prática e revisão. Dar a todos o mesmo briefing de competências, conhecimentos demonstrados e limites. Paralelizar apenas trabalho independente; revisar o guia depois da integração. Entregas dos agentes são recomendações fundamentadas, não aulas completas nem arquivos extras obrigatórios. O principal responde pela coerência. Se houver edição paralela, atribuir arquivos exclusivos antes de começar.

## Conferência final

- A EMENTA e seus pré-requisitos foram preservados?
- O guia conduz de um material ao próximo, com conexão curta, link, limites e ação; notas e exercícios abrem no ponto certo?
- Vídeo, livro e cada apoio têm funções claras, com referências e recortes verificados?
- Páginas, timestamps, origem e adaptações são verificáveis, sem seleção baseada só em títulos?
- Tudo cobrado está nas fontes selecionadas, no conhecimento anterior ou em apoio explícito?
- O esforço total inclui subitens, LeetCode, labs e revisão, sem quotas artificiais?
- As notas complementam lacunas sem repetir o livro, e detalhes de curadoria ficam no contexto do professor?
- A prática permite autonomia, ajuda gradual e feedback durante o estudo?
- O avanço usa evidências de competência, sem prova disfarçada ou nova burocracia?
- As retomadas futuras pedem recuperação e transferência, sem antecipar todas as listas?
- Arquivos novos são reconhecidos no leitor, com respostas/correções/gabaritos excluídos?
- Capítulos 00–09, diário, notas históricas e tentativas estão preservados?
- O registro distingue proposta, material criado, estudo relatado, prática avaliada e publicação confirmada?
