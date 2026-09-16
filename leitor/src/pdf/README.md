# Anotações nas leituras

As seis leituras de livros usam EmbedPDF 2.15, com o header compartilhado e as
barras nativas no rodapé. `/laboratorio/pdf` redireciona para a home; a rota antiga é mantida somente como redirecionamento. Nenhum PDF original é alterado.

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

Os padrões de novas anotações ficam em `PdfReader.tsx`: sublinhado com 55% de
opacidade; caneta com 55% e espessura 1; Realçar e Marca-texto em amarelo
(`#FFCD45`), com 45% e mesclagem Luz intensa. Marca-texto usa espessura 8 e
rotação 0°. Espessuras usam unidades do documento e acompanham o zoom.
O EmbedPDF 2.15 não expõe espessura configurável para sublinhado.
Esses padrões não modificam anotações já salvas.

`build/embedpdf-highlight.ts` corrige o comando nativo do EmbedPDF 2.15 que
força Multiplicar quando o texto é selecionado antes de clicar em Realçar.
A correção faz esse caminho respeitar a mesclagem da ferramenta, como ocorre
ao ativar Realçar antes de selecionar o texto. Ao atualizar EmbedPDF, revisar
essa compatibilidade; o build falha se o trecho esperado mudar.

Padrões e correção do Realçar publicados em 16/09/2026 na versão 54, com acesso
privado preservado e deployment `appgdep_6aaaf3a12148819190f36148641ecee6`
confirmado como `succeeded`.

`shared/readings.ts` registra slug, hash do PDF e quantidade de páginas. O build
regenera esse arquivo. Ao acrescentar/substituir uma leitura, executar
`npm run readings:sync` antes da publicação. `dev` e `build` regeneram o
cadastro local sem executar publicações do backend.
Cada versão de PDF tem seu histórico separado, evitando deslocar marcações para
páginas diferentes. A exportação do EmbedPDF produz uma cópia anotada.

Revisão por anotação, exclusões persistentes e recibos tornam operações
repetidas seguras. Alterações simultâneas no mesmo objeto pedem uma escolha.
A fila local preserva gravações pendentes, mas não garante leitura offline.
Avisos aparecem somente em erro ou conflito; não há painel permanente de sync.

### Imagens

Em **Inserir → Imagem**, clicar na página e escolher um PNG ou JPEG de até
5 MB. A imagem pode ser movida, redimensionada e excluída pelas ferramentas
nativas. Suas cores são preservadas no modo escuro.

`imageAssets.ts` guarda o rascunho binário no IndexedDB, envia o arquivo ao
Convex Storage e só então libera a gravação da anotação. O campo `_imageKey`
associa a posição ao conteúdo SHA-256; mover a imagem não repete o upload.
Imagens restauradas são mantidas em memória durante a leitura. O banco local
guarda somente uploads pendentes e não constitui um modo offline completo.

`VITE_CONVEX_SITE_URL` aponta para o domínio HTTP do Convex (`*.convex.site`).
O endpoint `/reading-image` exige o token WorkOS e verifica o proprietário e a
leitura em cada upload/download. Nenhuma URL pública de Storage é entregue.
Novos domínios de frontend precisam entrar na allowlist CORS de `convex/http.ts`.
Arquivos permanecem armazenados após excluir uma anotação, permitindo desfazer;
não há coleta automática de arquivos órfãos. As imagens também entram na cópia
anotada exportada pelo EmbedPDF; o livro original permanece intacto.

`pdfLayout.ts` adapta a disposição dos slots originais no Shadow DOM do EmbedPDF
2.15. Ao atualizar a biblioteca, verificar rodapé, menus, zoom, anotação e tema.
`pdfInput.ts` intercepta os eventos antes que o EmbedPDF remova `pointerType`:
somente caneta e mouse chegam às ferramentas da página. Um dedo move o viewport;
os TouchEvents de dois dedos continuam chegando ao zoom nativo. Durante contato
da caneta, os toques são ignorados até serem levantados. Botões e menus continuam
aceitando toque; não há seletor adicional de entrada.
Validar a caneta física no tablet, pois eventos simulados não comprovam rejeição
da palma nem pressão.

## Verificação

`npm test` cobre autorização global, isolamento por leitura, limites de
páginas, revisão, exclusão, repetição, fila e conflitos. Completar com
`npm run typecheck`, `npm run lint`, `npm run build` e QA no navegador.
Na publicação, verificar que uma requisição anônima não recebe PDFs ou bundles
e que a allowlist do Sites continua contendo somente o proprietário. Testes com
o token administrativo de bypass do Sites não representam acesso anônimo: esse
token autoriza o dispatcher e permite arquivos estáticos mesmo sem WorkOS.
Os testes de imagens cobrem acesso anônimo e de outra conta, isolamento por
leitura, limites, integridade do arquivo, deduplicação e vínculo da anotação.

## Organização

- `PdfReader.tsx`: composição do leitor, tema e navegação por página.
- `useAnnotations.ts`: integração React/EmbedPDF/Convex e restauração das marcações.
- `restoreAnnotations.ts`: recuperação independente de cada anotação e do último rascunho local, preservando o histórico de desfazer das edições locais.
- `sync.ts`: fila persistente, revisões e resolução de conflitos, sem depender do React.
- `imageAssets.ts`: rascunhos binários e transporte autenticado das imagens.
- `pdfLayout.ts`: adaptação das barras e menus nativos ao rodapé.
- `pdfPageLink.ts`: interpretação dos links para páginas do recorte.

O código e o PDF do laboratório foram removidos. Registros antigos no banco e
rascunhos locais não são apagados pela limpeza; somente PDFs cadastrados recebem
novas leituras/escritas pela API atual.
