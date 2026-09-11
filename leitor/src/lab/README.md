# Anotações nas leituras

As seis leituras de livros usam EmbedPDF 2.15, com o header compartilhado e as
barras nativas no rodapé. `/laboratorio/pdf` redireciona para a home; o protótipo
permanece arquivado no código, sem entrada no site. Nenhum PDF original é alterado.

## Autenticação

O Worker exige sessão WorkOS para todas as páginas e endpoints. O acesso exige
o ID do proprietário, também validado em toda função Convex. No Sites, arquivos
estáticos passam primeiro pelo dispatcher da hospedagem, que exige o acesso
privado do proprietário; eles não passam pelo cookie WorkOS. Não tornar o site
público sem migrar esses arquivos para uma entrega autenticada pelo backend.
`assets.run_worker_first` protege assets em hospedagens Cloudflare que respeitam
a configuração, mas não substitui a política privada do Sites.
Login Google usa PKCE e estado selado; a sessão fica em cookie HttpOnly, Secure
em HTTPS e SameSite=Lax. Somente o access token temporário é entregue em memória
ao cliente Convex. Tokens antigos do protótipo são removidos do localStorage.

Configurar no Worker: `WORKOS_CLIENT_ID`, `OWNER_WORKOS_USER_ID`,
`WORKOS_API_KEY` e `STUDY_COOKIE_PASSWORD` (segredo aleatório, pelo menos 32
caracteres). Em desenvolvimento, usar `.dev.vars`, ignorado pelo Git; na
hospedagem, usar os secrets do Sites. Nunca usar prefixo VITE para segredos.
O Convex precisa de `WORKOS_CLIENT_ID` e `OWNER_WORKOS_USER_ID`.

Os serviços continuam nos ambientes existentes: WorkOS Staging e Convex dev
`flexible-mallard-388`. Callback `/auth/retorno`, retorno de saída `/auth/entrar`.
As URLs publicada e localhost:3003 estão cadastradas no WorkOS.

## Persistência e manutenção

`shared/readings.ts` registra slug, hash do PDF e quantidade de páginas. O build
regenera esse arquivo. Ao acrescentar/substituir uma leitura, executar
`node scripts/reading-registry.mjs` e `npx convex dev --once` antes da publicação.
Cada versão de PDF tem seu histórico separado, evitando deslocar marcações para
páginas diferentes. A exportação do EmbedPDF produz uma cópia anotada.

Revisão por anotação, exclusões persistentes e recibos tornam operações
repetidas seguras. Alterações simultâneas no mesmo objeto pedem uma escolha.
A fila local preserva gravações pendentes, mas não garante leitura offline.
Avisos aparecem somente em erro ou conflito; não há painel permanente de sync.

`pdfLayout.ts` adapta a disposição dos slots originais no Shadow DOM do EmbedPDF
2.15. Ao atualizar a biblioteca, verificar rodapé, menus, zoom, anotação e tema.
A entrada usa os controles nativos; não há seletor adicional de caneta/toque.
Validar a caneta física no tablet, pois eventos simulados não comprovam rejeição
da palma nem pressão.

## Verificação

`npx vitest run` cobre autorização global, isolamento por leitura, limites de
páginas, revisão, exclusão, repetição, fila e conflitos. Completar com
`npm run typecheck`, `npm run lint`, `npm run build` e QA no navegador.
Na publicação, verificar que uma requisição anônima não recebe PDFs ou bundles
e que a allowlist do Sites continua contendo somente o proprietário. Testes com
o token administrativo de bypass do Sites não representam acesso anônimo: esse
token autoriza o dispatcher e permite arquivos estáticos mesmo sem WorkOS.
