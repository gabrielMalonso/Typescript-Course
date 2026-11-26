# Capítulo 30: Contratos e validação de API

**O que você vai conseguir fazer no fim:** receber dados externos na sua API sem confiar no que chega, responder sempre com status e erros previsíveis, e ter o CRUD completo de despesas. O fio condutor é o playground que você já tem. Aquele "POST que responde 201 para lixo" vira a pergunta que guia o capítulo inteiro.

## Como o capítulo se organiza

Em quatro sessões, cada uma terminando em algo que roda:

| Sessão | Etapas | Resultado |
|---|---|---|
| A. Fundação | 30.1 a 30.3 | Você prova o problema e cria o schema que o resolve |
| B. CRUD | 30.4 a 30.6 | Os cinco endpoints, validados |
| C. Robustez | 30.7 a 30.9 | Erros padronizados, limites e testes do contrato |
| D. Checkpoint | Desafio final | Você demonstra e explica o que construiu |

## Sessão A: Fundação

### 30.1 O problema: entrada externa não é confiável
- **Ideia:** tipos do TypeScript somem depois de compilar. Tudo que vem de fora (`req.body`, `req.params`, `req.query`, o próprio arquivo JSON) chega, na prática, como `unknown`. O `as` só silencia o compilador.
- **No playground:** reproduza com curl ou um cliente REST os casos do simulador: POST sem `Content-Type` JSON, POST com `valor: "abc"` e POST com JSON cortado. Anote o que cada um fez no `despesas.json`.
- **Pronto quando:** você tem essa lista de três casos ruins escrita e consegue explicar por que o `as HistoricoList` não protegeu nenhum deles. Essa lista vira seus casos de teste na etapa 30.9.

### 30.2 O contrato da API, antes do código
- **Ideia:** contrato é o acordo sobre o que entra e o que sai em cada endpoint, incluindo os erros. Status é parte dele: 200, 201, 204, 400, 404, 413, 500. Escolha também como padronizar o erro, por exemplo `{ "erro": { "mensagem": "...", "detalhes": ... } }`, e use sempre o mesmo formato.
- **No playground:** escreva uma tabela (num `README` ou comentário) com os cinco endpoints: método + caminho, parâmetros, corpo, resposta de sucesso e respostas de erro.
- **Pronto quando:** qualquer pessoa implementaria o mesmo comportamento só lendo a tabela.

### 30.3 Schemas e validação em runtime
- **Ideia:** um schema é a descrição do formato que roda de verdade. Com Zod, um schema só gera a validação em runtime e o tipo estático. O Zod 4 já está estável, então instale a versão 4 (confira com `npm ls zod`). `safeParse` devolve um objeto com `success` em vez de lançar exceção, o que combina bem com "falhou, então responda 400". Para formatar os erros há funções como `z.treeifyError` (estrutura aninhada) e `z.prettifyError` (texto legível).
- **Detalhes de modelagem:** o schema de **criação** não tem `id` (o servidor gera). O de **atualização** tem campos opcionais. Decida limites (`despesa` não vazia e com tamanho máximo, `valor` positivo, `categoria` de uma lista).
- **Formato do schema (adapte às suas categorias):**
  ```ts
  import * as z from "zod";

  const novaDespesaSchema = z.object({
    despesa: z.string().trim().min(1).max(100),
    categoria: z.enum(["Alimentação", "Assinaturas", "Transporte"]),
    valor: z.number().positive(),
  });
  type NovaDespesa = z.infer<typeof novaDespesaSchema>;
  ```
- **No playground:** primeiro teste o schema **isolado**, num script, com casos válidos e inválidos. Só depois ligue ao POST, chamando `safeParse(req.body)` direto no handler.
- **Pronto quando:** o POST rejeita com 400 os três casos ruins da etapa 30.1.

## Sessão B: CRUD

### 30.4 Middleware de validação reutilizável
- **Ideia:** a validação repetida em cada rota pede uma fábrica de middleware, algo como `validar(schema)`, que devolve a função `(req, res, next)`. Ela valida e responde 400, ou chama `next()` e segue. É o conceito de middleware do capítulo 29 em ação.
- **No playground:** extraia o `safeParse` do POST para essa função e reaproveite em outras rotas.
- **Pronto quando:** a rota POST não tem mais lógica de validação dentro do handler.

### 30.5 Parâmetros de rota e query
- **Ideia:** `req.params.id` e `req.query` chegam **sempre como texto**. Valide o `id` (UUID) e, se quiser filtros (`GET /despesas?categoria=Transporte`), valide e converta a query. Em Express 5, `req.query` é somente leitura, então guarde o resultado validado em outro lugar (por exemplo `res.locals`). Confira qual versão você usa.
- **No playground:** `GET /despesas/:id` com 400 para id mal formado e 404 para id que não existe. Diferencie bem os dois: 400 é "sua requisição está errada", 404 é "está certa, mas não existe".
- **Pronto quando:** os dois casos de erro respondem diferente, com o formato padronizado da 30.2.

### 30.6 CRUD completo
- **Ideia:** `PUT` substitui o recurso inteiro, `PATCH` altera parte dele. Escolha um e mantenha o contrato coerente (o schema de atualização depende dessa escolha). `DELETE` costuma responder 204. O **servidor** gera o `id`.
- **No playground:** implemente `PATCH /despesas/:id` e `DELETE /despesas/:id`. Remova o `id` do corpo aceito no POST.
- **Pronto quando:** os cinco endpoints funcionam e passam em um roteiro de testes manual.
- **Nota:** a condição de corrida do arquivo JSON continua existindo. Isso é esperado, e quem resolve é o capítulo 31.

## Sessão C: Robustez

### 30.7 Erros centralizados
- **Ideia:** o middleware de erro deve ficar no `app`, **depois de todas as rotas**, e responder JSON. Assim ele pega o JSON malformado do `express.json()`, que hoje escapa (o caso do simulador). Também vale uma resposta 404 JSON para rotas inexistentes e nunca vazar stack trace nem `error.message` interno para o cliente.
- **No playground:** mova o handler de erro, trate o erro de JSON inválido como 400 e, por fim, repense a ordem entre `cors` e `express.json()` (se o CORS vier antes, as respostas de erro também carregam os headers certos).
- **Pronto quando:** JSON cortado devolve 400 em JSON, e uma falha inesperada devolve 500 sem expor detalhes.

### 30.8 Limites de requisição
- **Ideia:** três camadas de limite. (1) **Tamanho do corpo:** `express.json({ limit: "10kb" })`, que gera 413 se estourar. (2) **Limites nos campos:** `.max()` em strings, faixas de valor. (3) **Frequência:** *rate limiting* (por exemplo com o pacote `express-rate-limit`), só no nível introdutório aqui.
- **No playground:** aplique os dois primeiros e teste mandando um corpo gigante.
- **Pronto quando:** o corpo gigante recebe 413 padronizado e você sabe explicar o que o rate limit faria.

### 30.9 Testar o contrato
- **Ideia:** teste cada endpoint nos casos de sucesso e de falha. A tabela é: caso, entrada, status esperado, corpo esperado. Pode ser um arquivo de requisições (REST Client no VS Code) ou um script com `fetch` e o `node:test`. Os testes de integração formais vêm no capítulo 33, mas esta tabela já é a semente deles.
- **Pronto quando:** você roda tudo e a tabela passa inteira.

## Sessão D: Checkpoint

**Desafio:** sem olhar o material, explique ou demonstre:
1. Por que `as` não valida e o que valida.
2. O caminho de um POST inválido pela cadeia de middlewares, até o 400.
3. Quando usar 400, 404, 413 e 500.
4. Por que o middleware de erro precisa ficar no `app` e não no router.
5. Qual problema do seu playground ainda **não** está resolvido, e em qual capítulo será.

Depois, uma alteração de requisito para praticar o princípio de "evoluir uma entrega": por exemplo, adicionar o campo `data` (string no formato `YYYY-MM-DD`) como obrigatório. Dá para fazer sem quebrar o resto?

## Erros comuns

- Validar só no frontend. Qualquer um chama a API direto.
- Declarar o tipo à mão e o schema à mão. Derive o tipo do schema com `z.infer`.
- Esquecer que `params` e `query` são texto.
- Responder 200 (ou 201) quando algo deu errado.
- Misturar formatos de erro entre rotas.
- Devolver `error.message` ou stack trace ao cliente.

## O que fica de fora

SQL e persistência (31), relações, paginação e transações (32), testes integrados (33), autenticação, CSRF e CORS em profundidade (34).