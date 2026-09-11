# Laboratório de anotações

Rota `/laboratorio/pdf`, com um PDF próprio de duas páginas. O leitor e os
materiais do curso continuam usando o fluxo anterior.

EmbedPDF 2.15 fornece caneta, marca-texto, texto, formas, desfazer/refazer e
exportação. A borracha adicional remove um traço inteiro, inclusive marca-texto
livre; não apaga pixels. `Somente caneta` aceita Pointer Events do tipo `pen`
na área de leitura e mantém os controles utilizáveis. A identificação da caneta
depende do navegador/dispositivo; validar a S Pen no tablet real.

## Acesso e persistência

- WorkOS: projeto **Leitor de Aulas — Gabriel Alonso**, ambiente **Staging**.
- Convex: projeto **leitor-aulas-gabriel**, implantação de desenvolvimento
  **flexible-mallard-388**. Este laboratório ainda usa ambientes de teste.
- A hospedagem mantém o bloqueio privado existente. O laboratório tem login
  próprio pelo WorkOS; o Convex valida o token e exige o `subject` do proprietário
  em todas as leituras/escritas. Cadastro público desativado no WorkOS.
- `WORKOS_CLIENT_ID` e `OWNER_WORKOS_USER_ID` são configurações do servidor
  Convex. Nenhuma chave administrativa vai para o navegador.
- `.env.production` contém somente identificadores públicos. Para desenvolver,
  copie `.env.example` para `.env.local` e selecione o projeto Convex existente.
- Callback: `/auth/retorno`. CORS e retorno de saída estão cadastrados para a
  URL privada publicada e `http://localhost:3002`.

`VITE_AUTHKIT_TEST_MODE=true` ativa o `devMode` oficial do SDK neste laboratório
privado de staging. Ele guarda o refresh token no `localStorage` para manter
a sessão entre recargas, sem precisar de um domínio próprio da Authentication
API. Antes de promover para uso definitivo, migrar para sessões com cookies
HttpOnly no servidor ou configurar o domínio de autenticação de produção e
desativar essa opção. Referência: https://github.com/workos/authkit-react.

As anotações ficam separadas do PDF original, com revisão por anotação, exclusões
persistentes e recibos de operações repetidas. Alterações simultâneas no mesmo
traço exigem escolha explícita. Uma fila em `localStorage` preserva gravações
pendentes após recarga; não é uma implementação completa de leitura offline.
Exportar incorpora as marcações numa cópia do PDF. O teste mantém suas próprias
anotações no Convex; não usa os PDFs de livros nem altera arquivos do curso.

## Verificação

`npx vitest run` testa autorização, revisão, exclusão, repetição de operações,
fila persistente e resolução de conflitos. `npm run typecheck`, `npm run lint`
e `npm run build` verificam o app. A QA no navegador cobre login/saída, desenho
com mouse, recarga, borracha, desfazer, exportação e bloqueio de Pointer Events
de mouse/toque no modo de caneta. Eventos simulados não substituem o teste
físico de pressão, rejeição da palma e precisão da S Pen.
