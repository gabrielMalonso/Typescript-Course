# Backend do leitor

`annotations.ts` autoriza o proprietário e persiste marcações com revisão por objeto,
recibos para repetição de operações e exclusões persistentes. `schema.ts` define
as tabelas e os índices. O cadastro de PDFs é compartilhado com o frontend.

`access.ts` centraliza a autorização e o cadastro permitido. `http.ts` entrega e
recebe PNG/JPEG autenticados, com limite de 5 MB e hash validado. `images.ts`
vincula os arquivos do Storage ao proprietário e à versão da leitura, sem
expor URLs públicas. Excluir uma anotação preserva seu arquivo para desfazer.

Configuração, sincronização e publicação: [leitor PDF](../src/pdf/README.md).
