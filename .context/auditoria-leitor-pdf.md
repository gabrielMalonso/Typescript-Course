# Leitor PDF noturno — 2026-09-10

Implementação e deploy autorizados por Gabriel. Recorte CLRS 1.2 com quatro páginas completas, 243638 bytes: impressas 11–14, posições 32–35 do PDF enviado. Texto extraído idêntico ao original nas quatro páginas; primeira página renderizada e inspecionada. Original completo preservado fora do repositório.

Catálogo tipado distingue Markdown e PDF, valida metadados e integra link/cartão, índice e rota existente. PDF.js carregado sob demanda, worker local, uma página por vez, zoom e cores invertidas por CSS para modo noturno. Cancelamento das tarefas evita concorrência no canvas. Tela em canvas; seleção de texto e acessibilidade textual pelo botão de PDF original. Não implementados marcadores, anotações ou novos recortes.

Verificações: typecheck, lint e build aprovados; permanecem dois avisos de Fast Refresh e aviso de chunk grande. PDF.js leu as quatro páginas e encerrou sua tarefa sem erro. Catálogo executado em memória: 103 documentos, mapeamento de páginas correto, exclusões preservadas, redirecionamento antigo funcionando. Home, guia e rota PDF responderam HTTP 200; não foi feita inspeção visual de navegador. `git diff --check` aprovado; nenhum arquivo de 00–09, DIARIO, teste.ts ou EMENTA alterado no workspace. Histórico e soluções adicionais do aluno não foram enviados na atualização de fonte do site.

Publicação: fonte `63678c3e12ccb20974ba74f7db636141f8869eeb`, build e pacote produzidos desse checkout. Versão 32, deployment `appgdep_6aa313ab05ec8191b238a4867e0f641b`, estado `succeeded` confirmado. Site `appgprj_6a6621cf10348191b05987faeea46310`, acesso verificado como proprietário único, sem grupos/visitantes. URL: https://leitor-typescript-gabriel.gabrielm-alonso.chatgpt.site. Registros da publicação atualizados localmente após confirmação, sem antecipar domínio do aluno.


## Ajuste visual posterior — versão 33

A pedido de Gabriel, removidos cabeçalho editorial, metadados, rodapé e controles de paginação/zoom. Páginas em rolagem contínua, barra somente com índice e alternância entre original e noturno. Nenhum PDF ou material de estudo alterado neste ajuste. Typecheck, lint, build e diff check aprovados; avisos antigos mantidos. Rota PDF HTTP 200; sem inspeção de navegador. Fonte `b0855ebbe07eaf1e43af062a94d3a631dcbb719c`, deployment `appgdep_6aa31584020c8191bf9efcc325b90797`, versão 33 confirmada como `succeeded`. Publicação privada no mesmo endereço.


## Zoom interno — versão 34

Pinça restrita ao PDF (1×–4×), viewport com rolagem independente, toolbar fixa. Gesto atualiza a largura visual imediatamente; PDF.js refaz a resolução ao terminar, limitado a 2400 pixels de largura por canvas. Rolagem nativa com um dedo preservada; Ctrl+roda/pinça de trackpad tratados dentro do PDF. Eventos não passivos e touch-action delimitados ao viewport, sem desabilitar o zoom do restante do site. Referência técnica: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action.

Typecheck, lint, build e diff check aprovados; avisos anteriores mantidos. Teste `leitor/tests/pdf-zoom.test.mjs` cobre ponto de ancoragem, limites, prevenção de zoom nativo na pinça, rolagem comum, resolução somente ao terminar e remoção dos listeners. Rota PDF HTTP 200. Sem teste físico no tablet ou inspeção visual de navegador; essa limitação foi comunicada. Nenhum PDF ou trabalho do aluno modificado.

Versão 34 publicada com acesso privado, estado `succeeded`. Fonte `1ba0aa09097df60fb0a8a943ab294b2d74bea318`, deployment `appgdep_6aa3172fb044819199510a8c9f9df85c`, mesma URL do leitor.


## Barra compartilhada e leituras completas do guia — versão 35

`ReaderToolbar` reutilizado em Markdown e PDF, com mesmo `ThemeToggle` e preferência persistida no `ThemeProvider`. PDF mantém barra mínima, sem breadcrumbs/cópia de Markdown. Removidas cores e botão de tema independentes. Zoom aprovado pelo relato de Gabriel e preservado.

Quatro novos recortes: 23–25 (PDF 44–46), 27–29 (48–50), 43–49 (64–70), 55–57 (76–78). Vinte páginas ao incluir 11–14 existente. Todos os textos e pixels rasterizados dos novos recortes comparados ao PDF original e idênticos; folha de contato inspecionada. Guia liga a cada leitura e delimita trechos dispensáveis nas páginas completas. Nenhuma alteração curricular ou de trabalhos do aluno.

Typecheck, lint, build, testes de zoom e diff check passaram; avisos anteriores mantidos. Catálogo: 107 documentos, cinco leituras/20 páginas, links do guia resolvidos e exclusões preservadas. Guia e rota CLRS 3.1 retornaram HTTP 200. Sem teste visual de navegador. Fonte `d63c4326374dce8f389f087ee059daf143490690`; versão 35, deployment `appgdep_6aa318a95d208191a3d968b686268e4d`, confirmado `succeeded` no mesmo site privado.


## Guia como percurso — validação em 2026-09-10

Piloto restrito ao capítulo 10: README com sete etapas, conexões curtas e leituras intercaladas com exercícios; notas apenas complementares. Justificativas de fontes e plano de revisões preservados nas notas do professor. Nome visual “Guia de estudo” no índice, toolbar e navegação; arquivo/rota README preservados. Rodapé do piloto retorna ao guia, sem impor leitura sequencial de todas as notas. Referências aos apoios na prática atualizadas; enunciados e respostas não alterados.

Adicionados IDs de títulos e rolagem por fragmento para abrir uma nota/atividade no ponto indicado. Vinte links ancorados conferidos no HTML efetivamente renderizado de guia, notas e prática. Typecheck, lint, build, testes de zoom e diff check aprovados; avisos anteriores mantidos. Guia e notas responderam HTTP 200. Nenhum PDF, currículo ou material 00–09 alterado. Sem inspeção de navegador; não se atribui domínio ao relato de leitura do aluno.

Publicação do percurso confirmada: versão 36, fonte `11a05ad98a90d24af60e0ff318359fd82780cbcd`, deployment `appgdep_6aa31b5368d88191b7a16dcd398d9a55`, estado `succeeded`. Mesmo endereço e acesso privado.


## CLRS 2.1 — versão 37

Acrescentadas páginas impressas 16–18, posições 37–39 do PDF original, como ponte antes de 2.2 na etapa 3. Guia delimita início no título 2.1 e fim antes de invariantes; nenhuma exigência de implementação ou prova. JSON mantém mapeamento e extensão de três páginas. Texto e rasterização das três páginas idênticos ao original; prévia inspecionada. Typecheck, lint e build aprovados, avisos anteriores mantidos. PDF presente no pacote e rota HTTP 200. Seis recortes somam 23 páginas. Nenhum trabalho do aluno ou currículo alterado.

Publicação privada confirmada (`succeeded`): versão 37, fonte `cef7f1025d38816630457ba53bd04ccb25827699`, deployment `appgdep_6aa31d72517c81918438fd908fde1235`. Mesmo endereço do leitor.


## Links de enunciados e adoção do fluxo — 2026-09-10

Quatro links diretos nas atividades do CLRS: 1/9 para `clrs-1.2.pdf#page=4` (impressa 14); 2/3 para `clrs-2.2-02-casos.pdf#page=3` (impressa 29). Markdown preserva o fragmento; leitor espera páginas anteriores/target finalizarem layout e rola uma vez por navegação. Zoom não repete o salto; fragmentos inválidos voltam à página 1. Enunciados e arquivos PDF não alterados.

AGENTS, prompts, README geral e documentação do leitor incorporam guia como percurso, notas pontuais, justificativas docentes no contexto, PDF/JSON e páginas diretas. Rótulo de guia, âncoras e retorno generalizados para capítulos >=10; nenhum capítulo futuro criado e nomes 00–09 preservados. Perfil/progresso registram relato de leitura, sem domínio. Sem mudança de ementa, provas, respostas ou diário.

Typecheck, lint, build e testes de zoom/links passaram. Testes cobrem limites, fragmentos inválidos e renderização fora de ordem; HTML renderizado confere quatro links PDF e vinte âncoras Markdown, além do nome de guia futuro e nome histórico. Rota atividades HTTP 200; diff check limpo. Sem inspeção visual de navegador. Permanecem avisos anteriores.

Publicação confirmada: versão 38, fonte `9758d5d9d55cae577ea95ad9dc2c9a55ff29dd9e`, deployment `appgdep_6aa32003c570819191e4c33930f8e541`, estado `succeeded`, acesso privado e URL preservados.
