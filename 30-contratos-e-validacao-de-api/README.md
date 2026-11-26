# Capítulo 30 — Contratos e validação de API

**Objetivo:** tratar toda entrada externa no servidor (`req.body`, `req.params`, `req.query` e arquivos JSON) como dado não confiável, desenhar o contrato explícito de uma API antes de escrever as rotas, validar entradas em tempo de execução com **Zod** (derivando os tipos estáticos da mesma fonte de verdade), reaproveitar validação em fábricas de *middleware*, implementar um **CRUD completo** com semântica HTTP coerente, centralizar o tratamento de erros em um único formato JSON e aplicar **limites de requisição** em camadas.

No capítulo 29, você construiu seu primeiro servidor HTTP em Node + TypeScript + Express, organizou rotas com `express.Router()` e configurou a API por variáveis de ambiente. Porém, naquele servidor a validação ainda era feita na mão para um único campo (`extrairTituloValido`), faltavam atualização e remoção de registros, e vários casos ruins de entrada ainda passariam despercebidos se a API crescesse. Neste capítulo, você transforma um servidor que "funciona quando o cliente colabora" em uma **API defensiva com contrato claro**, pronta para ganhar persistência real em banco de dados no capítulo 31.

**Percurso:** fronteira de confiança e contrato da API → schemas e validação em runtime com Zod → fábrica de *middleware*, parâmetros de rota e *query string* → CRUD completo com semântica HTTP (`GET`, `POST`, `PATCH`/`PUT`, `DELETE`) → erros centralizados e ordem do pipeline → limites de requisição e verificação do contrato. Em cada etapa, leia o recorte oficial indicado e use as explicações e exemplos para conectar o mecanismo ao TypeScript e ao Express 5 que você já conhece.

**Escopo:** focamos em contratos HTTP, validação em runtime com Zod 4, CRUD completo sobre o repositório em arquivo JSON do capítulo 29, padronização de erros e limites básicos de payload, campos e frequência. Persistência real em SQL (eliminando a condição de corrida do arquivo JSON) entra no capítulo 31; relações, `JOIN`, paginação e transações, no capítulo 32; integração com o frontend e testes automatizados do serviço em banco descartável, no capítulo 33; CORS em profundidade, cookies/sessões, autenticação/autorização, CSRF, senhas e deploy, no capítulo 34; *type predicates* e fronteiras com `satisfies`/`as`, no capítulo 48; abstrações genéricas próprias (`<T>`), no capítulo 49; evolução compatível de APIs, no capítulo 59; segurança de software aprofundada, no capítulo 61; e modelagem avançada de erros (`Result` e erros próprios), no capítulo 64.

## 1. Fronteira de confiança e contrato da API antes do código

### O problema: por que tipos TypeScript e validação no frontend não protegem o servidor

Imagine que você já validou um formulário de despesas no React (capítulo 24) e declarou uma `interface NovaDespesa` no servidor Express (capítulo 29). Isso impede que dados inválidos corrompam seu servidor? **Não.** Há dois motivos diretos:

1. **Tipos TypeScript somem em tempo de execução:** como vimos nos capítulos 26 e 29, o Node executa o código fazendo *type stripping* — todas as `interface` e `type` desaparecem antes da primeira requisição chegar. Escrever `const dados = req.body as NovaDespesa` apenas **silencia o compilador**; em runtime, nenhuma verificação acontece.
2. **Qualquer cliente pode chamar a API diretamente:** o seu frontend React é apenas *um* dos clientes possíveis. Qualquer pessoa (ou script) pode abrir o terminal e enviar requisições com `curl`, Postman ou `fetch` ignorando completamente as validações da tela.

Veja três requisições reais que quebram servidores sem validação de fronteira:

- **`POST` sem `Content-Type: application/json`:** o `express.json()` ignora o corpo, `req.body` chega como `undefined`, e código que lê `req.body.valor` estoura `TypeError` (ou grava `undefined`).
- **`POST` com tipo errado (`{ "descricao": "Almoço", "valor": "abc" }`):** o JSON é sintaticamente válido, então `express.json()` aceita. Se você usou `as NovaDespesa`, o texto `"abc"` passa direto e acaba gravado no arquivo ou quebrando contas depois.
- **`POST` com JSON cortado (`{"descricao": "Café`):** `express.json()` falha ao fazer o `JSON.parse` e dispara um `SyntaxError`. Sem um middleware de erro centralizado no lugar certo, o Express responde HTML padrão em vez de JSON.

Tudo o que cruza a rede (`req.body`, `req.params`, `req.query`, headers) ou volta do disco (`JSON.parse` de um arquivo) entra na aplicação como **`unknown`**. A validação na fronteira do servidor é obrigatória.

### Leitura principal

Consulte as páginas curtas de referência do MDN para os status que estruturam o contrato da API (leia apenas a introdução e **Examples**; pule **Specifications** e **See also**):

- [`204 No Content` — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204)
- [`400 Bad Request` — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400)
- [`404 Not Found` — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404)

*(Você já conhece `200`, `201` e `500` do capítulo 26; veremos `413` e `429` na etapa 6.)*

### Modelo mental: o contrato como acordo explícito antes do código

O **contrato da API** é o acordo documentado sobre o que entra e o que sai em cada endpoint — **incluindo os erros**. Escrever essa tabela antes de programar evita rotas contraditórias (uma devolvendo `{ erro: "..." }`, outra `{ message: "..." }`, outra respondendo `200` com mensagem de falha).

Um bom contrato define duas coisas com clareza:

1. **Um único formato de erro para a API inteira:**

```json
{
  "erro": {
    "codigo": "DADOS_INVALIDOS",
    "mensagem": "Dados inválidos em body.",
    "detalhes": {
      "formErrors": [],
      "fieldErrors": {
        "valor": ["O valor deve ser maior que zero."]
      }
    }
  }
}
```

O campo `codigo` dá ao cliente um identificador estável para reagir programaticamente; `mensagem` explica o problema em linguagem legível; e `detalhes` aparece quando há erros específicos de validação por campo.

2. **A tabela completa de endpoints, entradas, sucessos e erros.** Usaremos uma **API de Despesas** como fio condutor deste capítulo, porque ela combina vários tipos de validação (texto com tamanho limitado, lista fechada de categorias, número positivo, UUID e filtros de query):

| Método e caminho | Entradas aceitas | Sucesso | Erros esperados (mesmo formato JSON) |
|---|---|---|---|
| `GET /despesas` | Query opcional: `categoria` (valor válido), `valorMin` (número > 0) | `200 OK` + array de despesas | `400` se query for inválida; `500` falha interna |
| `GET /despesas/:id` | Param: `id` (UUID válido) | `200 OK` + despesa | `400` se `id` malformado; `404` se não existir |
| `POST /despesas` | Corpo JSON: `{ descricao, categoria, valor }` (sem `id`) | `201 Created` + despesa criada (com `id` gerado pelo servidor) | `400` JSON malformado ou dados inválidos; `413` corpo grande demais |
| `PATCH /despesas/:id` | Param: `id` (UUID); corpo JSON parcial com ao menos 1 campo | `200 OK` + despesa atualizada | `400` `id`/corpo inválidos; `404` se não existir; `413` corpo grande demais |
| `DELETE /despesas/:id` | Param: `id` (UUID) | `204 No Content` (sem corpo) | `400` se `id` malformado; `404` se não existir |

Repare que qualquer pessoa consegue implementar — ou consumir no frontend — exatamente o mesmo comportamento apenas lendo essa tabela.

## 2. Schemas e validação em runtime com Zod

### O problema: validação manual não escala e duplica o contrato

Nos capítulos 26 e 29, escrevemos funções manuais com `typeof`, `!== null`, `in` e `if` encadeados. Isso é ótimo para entender o mecanismo por baixo, mas rapidamente mostra dois custos quando um recurso tem vários campos e regras:

1. **Verbosidade crescente:** checar se `descricao` é string, aplicar `.trim()`, garantir entre 1 e 100 caracteres, conferir se `categoria` pertence a uma lista fechada, verificar se `valor` é número finito positivo e montar mensagens por campo gera dezenas de linhas repetitivas por endpoint.
2. **Duas fontes de verdade que divergem:** você mantém uma `interface NovaDespesa` para o TypeScript *e* uma função `validarNovaDespesa` separada para o runtime. Quando um campo muda, é fácil atualizar um lado e esquecer o outro.

A solução padrão no ecossistema TypeScript é usar uma biblioteca de **validação por schema**, como o **Zod** (versão 4 estável). Um **schema** é um objeto JavaScript executável que descreve as regras dos dados — o Zod executa essas regras em runtime **e** o TypeScript extrai automaticamente o tipo estático a partir do mesmo schema.

### Leitura principal

Leia por completo a página introdutória [Basic usage — Zod](https://zod.dev/basics) (**Defining a schema**, **Parsing data**, **Handling errors** e **Inferring types**).

Em [Formatting errors — Zod](https://zod.dev/error-formatting), leia **`z.treeifyError()`**, **`z.prettifyError()`** e **`z.flattenError()`** (observe como o Zod 4 oferece funções de topo dedicadas para formatar erros). Pule **`z.formatError()`**, que existe apenas para compatibilidade legada.

Use [Defining schemas — Zod](https://zod.dev/api) apenas como consulta rápida das seções **Strings**, **UUIDs**, **Numbers**, **Enums**, **Objects** e **`.partial()`** — não tente ler o catálogo inteiro de uma vez.

### Modelo mental: única fonte de verdade com `safeParse` e `z.infer`

Acompanhe o fluxo de um dado que chega pela rede até se tornar confiável:

```text
                       ┌──► em tempo de compilação: type NovaDespesa = z.infer<typeof schema>
                       │
criarDespesaSchema ────┤
(única fonte)          │
                       └──► em tempo de execução: schema.safeParse(entrada: unknown)
                                                         │
                                    ┌────────────────────┴────────────────────┐
                                    ▼                                         ▼
                        { success: true, data }                 { success: false, error }
                      (data já tem tipo NovaDespesa            (error é um ZodError pronto para
                       e passou por .trim() / strip)            z.flattenError / z.treeifyError)
```

Note dois detalhes que conectam diretamente com o que você já domina:

1. **`safeParse` retorna uma union discriminada (capítulo 17):** diferente de `parse()`, que lança exceção em caso de erro, `safeParse()` devolve `{ success: true, data }` ou `{ success: false, error }`. Em uma API, entrada inválida do cliente é um fluxo **esperado** (não uma pane do servidor), então `safeParse` deixa o código mais limpo para responder `400 Bad Request`.
2. **Chaves desconhecidas são removidas por padrão:** se o cliente enviar `{ descricao: "Café", categoria: "Alimentação", valor: 12, id: "forcado", admin: true }`, um `z.object(...)` padrão **descarta** (`strip`) as chaves extras `id` e `admin` automaticamente — evitando gravar lixo ou deixar o cliente escolher o próprio `id`. Quando você quiser *rejeitar* com `400` qualquer chave extra inesperada, use **`z.strictObject(...)`**.

### Modelando os schemas em TypeScript (Zod 4)

Instale o Zod 4 no projeto Node (`npm install zod` e confira a versão instalada com `npm ls zod`):

```ts
// src/schemas.ts
import * as z from "zod";

export const CATEGORIAS = [
  "Alimentação",
  "Assinaturas",
  "Transporte",
  "Moradia",
  "Outros",
] as const;

// 1. Schema de criação (POST): sem `id`, pois o servidor gera o identificador
export const criarDespesaSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "A descrição é obrigatória.")
    .max(100, "A descrição deve ter no máximo 100 caracteres."),
  categoria: z.enum(CATEGORIAS),
  // No Zod 4, z.number() já rejeita NaN e Infinity automaticamente
  valor: z
    .number()
    .positive("O valor deve ser maior que zero.")
    .max(1_000_000, "O valor excede o limite permitido."),
});

// 2. Schema de atualização parcial (PATCH): campos opcionais, exigindo ao menos um
export const atualizarDespesaSchema = criarDespesaSchema
  .partial()
  .refine((dados) => Object.keys(dados).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

// 3. Schema completo da entidade persistida (usado também ao ler o arquivo JSON)
export const despesaSchema = criarDespesaSchema.extend({
  id: z.uuid(),
});

// 4. Schema de parâmetro de rota (:id)
export const despesaIdParamsSchema = z.object({
  id: z.uuid("O parâmetro 'id' deve ser um UUID válido."),
});

// 5. Tipos estáticos derivados da mesma fonte de verdade (sem duplicar interfaces)
export type Categoria = (typeof CATEGORIAS)[number];
export type NovaDespesa = z.infer<typeof criarDespesaSchema>;
export type AtualizarDespesa = z.infer<typeof atualizarDespesaSchema>;
export type Despesa = z.infer<typeof despesaSchema>;
export type DespesaIdParams = z.infer<typeof despesaIdParamsSchema>;
```

Veja também como escolher entre os três formatadores de erro do Zod 4:

| Utilitário do Zod 4 | Formato retornado | Quando preferir |
|---|---|---|
| `z.flattenError(error)` | `{ formErrors: string[], fieldErrors: Record<string, string[]> }` | APIs e formulários com objetos planos (como `criarDespesaSchema`) — fácil de exibir campo a campo no frontend. |
| `z.treeifyError(error)` | Árvore aninhada espelhando exatamente o formato do schema (`properties`, `items`, `errors`) | Payloads complexos com objetos aninhados e arrays de itens. |
| `z.prettifyError(error)` | Texto formatado legível por humanos | Logs de terminal, scripts CLI e depuração rápida. |

### O que o Zod abstrai, custos e limitações

1. **Conceito que representa:** validação declarativa de fronteira + derivação de tipos estáticos.
2. **O que abstrai:** dezenas de checagens manuais (`typeof`, `!== null`, `in`, `Number.isFinite`, `.trim()`, regex de UUID, descarte de chaves extras) e a montagem de mensagens estruturadas de erro.
3. **Custos e limitações que continuam existindo:**
   - **Custo de CPU em runtime:** validar cada campo e transformar strings percorre o payload em tempo **O(n)** proporcional ao tamanho dos dados (por isso ainda precisamos limitar o tamanho máximo do corpo na etapa 6).
   - **Schema valida formato, não estado do sistema:** o Zod garante que `id` tem formato de UUID e `valor` é positivo, mas **não** sabe se aquela despesa existe no banco nem se o usuário atual tem permissão para apagá-la. Regras que dependem de estado armazenado continuam vivendo no handler/serviço (e produzem `404`, `403` ou `409`, não erro de schema).
   - **Dependência externa:** diferente de `node:fs`, o Zod é um pacote npm instalado em `dependencies` que precisa estar fixado no `package-lock.json` (capítulo 21).

**Experimente:** crie um script isolado `testar-schema.ts` importando `criarDespesaSchema`, execute `safeParse` para três entradas — uma válida com espaços extras na descrição e um campo extra `id: "123"`, uma com `valor: "abc"` e uma vazia `{}` — e imprima `resultado.data`, `z.flattenError(resultado.error)` e `z.prettifyError(resultado.error)`. Confirme que o campo `id` extra foi descartado na entrada válida antes mesmo de encostar no Express.

## 3. Fábrica de *middleware*, parâmetros de rota e *query string*

### O problema: validação repetida nos handlers e dados que chegam sempre como texto

Se você colocar `const resultado = schema.safeParse(req.body); if (!resultado.success) ...` dentro de cada rota, a mesma lógica de validação e formatação de erro se repete em `POST`, `PATCH`, `GET /:id`, `GET /` e `DELETE /:id`.

Além disso, dois detalhes sobre `req.params` e `req.query` causam bugs frequentes:

1. **`req.params` e `req.query` chegam sempre como texto:** na URL `GET /despesas?valorMin=50`, `req.query.valorMin` é a string `"50"`, nunca o número `50`. Se alguém repetir o parâmetro (`?categoria=A&categoria=B`), o Express entrega um array de strings.
2. **No Express 5, `req.query` é somente leitura (*getter*):** tentar fazer `req.query = resultado.data` dentro de um middleware lança `TypeError: Cannot set property query of #<IncomingMessage> which has only a getter`.

### Leitura principal

Em [Writing middleware for use in Express apps — Express.js](https://expressjs.com/en/guide/writing-middleware/#configurable-middleware), leia apenas a seção curta **Configurable middleware** no final da página (ela mostra o padrão de uma função que recebe configuração e devolve o middleware `(req, res, next)`).

Na referência da API do Express 5, consulte apenas [**`res.locals`**](https://expressjs.com/en/5x/api/response#reslocals) (local oficial para guardar dados derivados durante o ciclo de uma requisição) e [**`req.query`**](https://expressjs.com/en/5x/api/request#reqquery).

Em [Defining schemas — Zod](https://zod.dev/api#coercion), leia **Coercion** e **Stringbools** (`#stringbool`) para entender como converter strings de query com segurança.

### Modelo mental: fábrica de *middleware* + `res.locals` + coerção consciente

Uma **fábrica de *middleware*** é uma função que recebe o que varia (qual parte da requisição validar e qual schema usar) e devolve uma função `(req, res, next)` pronta para o Express — aplicando diretamente **closures** (capítulo 8) ao pipeline do Express (capítulo 29):

```text
POST /despesas
   │
   ▼
[ express.json({ limit: "10kb" }) ]    ──► converte bytes JSON em req.body
   │
   ▼
[ validar("body", criarDespesaSchema) ]
   ├── falhou ──► responde 400 JSON padronizado e encerra aqui [FIM]
   └── passou ──► salva dado limpo em res.locals.body e chama next()
   │
   ▼
[ handler da rota ]                    ──► já recebe dados válidos e limpos!
```

Dois cuidados importantes ao validar parâmetros e queries:

1. **Diferencie rigorosamente `400 Bad Request` de `404 Not Found`:**
   - `GET /despesas/nao-e-um-uuid` → **`400 Bad Request`**: o cliente enviou um identificador malformado; o servidor nem precisa consultar o armazenamento.
   - `GET /despesas/550e8400-e29b-41d4-a716-446655440000` (UUID válido que não está salvo) → **`404 Not Found`**: a requisição está bem formada, mas o recurso não existe.
2. **Cuidado com `z.coerce` em *query strings*:**
   - `z.coerce.boolean()` usa `Boolean(valor)` do JavaScript — e `Boolean("false")` é **`true`**! Para booleanos em texto (`?fixa=false`), use **`z.stringbool()`** do Zod 4 (que interpreta `"true"`/`"false"`, `"1"`/`"0"` corretamente) ou `z.enum(["true", "false"]).transform((v) => v === "true")`.
   - `z.coerce.number()` usa `Number(valor)` — e `Number("")` vira **`0`**! Para rejeitar `?valorMin=` vazio, valide que o texto não está vazio (ou combine com `.positive()`, já que `0` não é positivo, ou faça um pré-tratamento explícito).

### Exemplo em TypeScript: schema de query e fábrica `validar`

Primeiro, acrescentamos o schema da query string em `src/schemas.ts`:

```ts
// Trecho adicional em src/schemas.ts
export const filtroDespesasQuerySchema = z.object({
  categoria: z.enum(CATEGORIAS).optional(),
  valorMin: z.coerce
    .number()
    .positive("O parâmetro 'valorMin' deve ser um número maior que zero.")
    .optional(),
});

export type FiltroDespesasQuery = z.infer<typeof filtroDespesasQuerySchema>;
```

Agora criamos o módulo de resposta padronizada de erro (`src/erros.ts`, que expandiremos na etapa 5) e a fábrica reutilizável (`src/validacao.ts`):

```ts
// src/validacao.ts
import type { NextFunction, Request, RequestHandler, Response } from "express";
import * as z from "zod";
import { responderErro } from "./erros.ts";

export type AlvoValidacao = "body" | "params" | "query";

export function validar(
  alvo: AlvoValidacao,
  schema: z.ZodType,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const entrada: unknown = req[alvo];
    const resultado = schema.safeParse(entrada);

    if (!resultado.success) {
      responderErro(
        res,
        400,
        "DADOS_INVALIDOS",
        `Dados inválidos em ${alvo}.`,
        z.flattenError(resultado.error),
      );
      return;
    }

    // Em Express 5, req.query é somente leitura; res.locals funciona de forma
    // uniforme para body, params e query durante o ciclo desta requisição.
    res.locals[alvo] = resultado.data;
    next();
  };
}
```

> **Nota sobre tipagem de `res.locals`:** nas rotas da etapa 4, usaremos a anotação `res: Response<unknown, { body: NovaDespesa }>` — aproveitando o tipo genérico pronto `Response<CorpoResposta, Locals>` de `@types/express` (assim como usamos `useState<Tipo>` no React). Como o middleware `validar("body", criarDespesaSchema)` rodou imediatamente antes, `res.locals.body` já contém os dados validados e limpos; no capítulo 49 (*Generics*), você aprenderá a criar abstrações genéricas próprias para conectar o tipo do schema ao handler automaticamente.

## 4. CRUD completo com semântica HTTP (`GET`, `POST`, `PATCH`/`PUT`, `DELETE`)

### O problema: fechar o ciclo de vida do recurso sem ambiguidade

**CRUD** (*Create, Read, Update, Delete*) cobre as quatro operações básicas de um recurso: criar, consultar, atualizar e remover. No capítulo 29, implementamos apenas leitura (`GET`) e criação (`POST`). Ao adicionar atualização e remoção, três decisões de contrato precisam ficar cristalinas:

1. **`PUT` versus `PATCH`:**
   - **`PUT /despesas/:id`** significa **substituição completa** do recurso — o cliente precisa enviar todos os campos obrigatórios (`descricao`, `categoria`, `valor`). Se faltar um campo, é `400 Bad Request`.
   - **`PATCH /despesas/:id`** significa **atualização parcial** — o cliente envia apenas os campos que deseja mudar (por exemplo `{ "valor": 45.9 }`). Usa `atualizarDespesaSchema` (`.partial()` + exigência de pelo menos um campo).
   - Escolha a semântica que faz sentido para sua API e mantenha o schema coerente com o método escolhido.
2. **Quem gera o `id`:** no `POST /despesas`, o **servidor** sempre gera o `id` (por exemplo com `randomUUID()` do módulo nativo `node:crypto`) e responde **`201 Created`** com o objeto criado. Aceitar `id` vindo do cliente no `POST` abre espaço para sobrescrever registros existentes ou gerar colisões.
3. **O que responder no `DELETE`:** quando a despesa existe e é removida, a convenção mais comum é **`204 No Content`** (`res.status(204).end()`), **sem corpo JSON** — pois o recurso acabou de deixar de existir. Se o `id` válido não for encontrado, a resposta é **`404 Not Found`**.

### Leitura principal

Leia apenas a introdução curta de cada método no MDN para consolidar a semântica oficial (pule **Examples** detalhados e **Browser compatibility**):

- [`PUT` request method — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT)
- [`PATCH` request method — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PATCH)
- [`DELETE` request method — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/DELETE)

### Exemplo em TypeScript: os cinco endpoints com validação desacoplada

Suponha o repositório `src/repositorio.ts` seguindo o mesmo padrão assíncrono do capítulo 29 (`node:fs/promises`, `ENOENT` → `[]`), validando o arquivo lido do disco com `z.array(despesaSchema).parse(bruto)` em vez de validação manual. Veja como `src/rotas-despesas.ts` fica limpo quando a validação mora nos *middlewares*:

```ts
// src/rotas-despesas.ts
import { randomUUID } from "node:crypto";
import express, { type Request, type Response, type Router } from "express";
import { responderErro } from "./erros.ts";
import { carregarDespesas, salvarDespesas } from "./repositorio.ts";
import {
  atualizarDespesaSchema,
  criarDespesaSchema,
  despesaIdParamsSchema,
  filtroDespesasQuerySchema,
  type AtualizarDespesa,
  type Despesa,
  type DespesaIdParams,
  type FiltroDespesasQuery,
  type NovaDespesa,
} from "./schemas.ts";
import { validar } from "./validacao.ts";

export function criarRotasDespesas(caminhoArquivo: string): Router {
  const router = express.Router();

  // 1. Listar e filtrar (GET /despesas?categoria=...&valorMin=...)
  router.get(
    "/",
    validar("query", filtroDespesasQuerySchema),
    async (_req: Request, res: Response<unknown, { query: FiltroDespesasQuery }>) => {
      const { categoria, valorMin } = res.locals.query;
      const despesas = await carregarDespesas(caminhoArquivo);

      const filtradas = despesas.filter((item) => {
        if (categoria !== undefined && item.categoria !== categoria) return false;
        if (valorMin !== undefined && item.valor < valorMin) return false;
        return true;
      });

      res.json(filtradas);
    },
  );

  // 2. Buscar uma despesa por ID (GET /despesas/:id)
  router.get(
    "/:id",
    validar("params", despesaIdParamsSchema),
    async (_req: Request, res: Response<unknown, { params: DespesaIdParams }>) => {
      const { id } = res.locals.params;
      const despesas = await carregarDespesas(caminhoArquivo);
      const encontrada = despesas.find((item) => item.id === id);

      if (!encontrada) {
        responderErro(res, 404, "NAO_ENCONTRADO", `Despesa ${id} não encontrada.`);
        return;
      }

      res.json(encontrada);
    },
  );

  // 3. Criar despesa (POST /despesas) — servidor gera o id
  router.post(
    "/",
    validar("body", criarDespesaSchema),
    async (_req: Request, res: Response<unknown, { body: NovaDespesa }>) => {
      const despesas = await carregarDespesas(caminhoArquivo);
      const novaDespesa: Despesa = {
        id: randomUUID(),
        ...res.locals.body,
      };

      await salvarDespesas(caminhoArquivo, [...despesas, novaDespesa]);
      res.status(201).json(novaDespesa);
    },
  );

  // 4. Atualizar parcialmente (PATCH /despesas/:id)
  router.patch(
    "/:id",
    validar("params", despesaIdParamsSchema),
    validar("body", atualizarDespesaSchema),
    async (
      _req: Request,
      res: Response<unknown, { params: DespesaIdParams; body: AtualizarDespesa }>,
    ) => {
      const { id } = res.locals.params;
      const mudancas = res.locals.body;
      const despesas = await carregarDespesas(caminhoArquivo);
      const indice = despesas.findIndex((item) => item.id === id);

      if (indice === -1) {
        responderErro(res, 404, "NAO_ENCONTRADO", `Despesa ${id} não encontrada.`);
        return;
      }

      const atualizada: Despesa = {
        ...despesas[indice],
        ...mudancas,
      };

      const proximaLista = despesas.map((item, i) =>
        i === indice ? atualizada : item,
      );
      await salvarDespesas(caminhoArquivo, proximaLista);
      res.json(atualizada);
    },
  );

  // 5. Remover despesa (DELETE /despesas/:id)
  router.delete(
    "/:id",
    validar("params", despesaIdParamsSchema),
    async (_req: Request, res: Response<unknown, { params: DespesaIdParams }>) => {
      const { id } = res.locals.params;
      const despesas = await carregarDespesas(caminhoArquivo);
      const restantes = despesas.filter((item) => item.id !== id);

      if (restantes.length === despesas.length) {
        responderErro(res, 404, "NAO_ENCONTRADO", `Despesa ${id} não encontrada.`);
        return;
      }

      await salvarDespesas(caminhoArquivo, restantes);
      res.status(204).end();
    },
  );

  return router;
}
```

Observe dois pontos fundamentais nesse código:

1. **Nenhuma rota tem lógica de validação misturada ao domínio:** o `PATCH` encadeia `validar("params", ...)` e `validar("body", ...)` antes do handler. Se o `id` for inválido, responde `400` imediatamente sem sequer validar o corpo ou ler o arquivo.
2. **Limite consciente preservado:** assim como no capítulo 29, o repositório em arquivo JSON continua lendo e reescrevendo o arquivo inteiro em **O(n)** e continua sujeito a *race conditions* se duas requisições de escrita chegarem ao mesmo tempo. Isso é esperado neste estágio — o contrato HTTP e as rotas ficam prontos agora, e o armazenamento será substituído por SQL no **capítulo 31** (com transações no **capítulo 32**).

## 5. Erros centralizados e ordem real do pipeline

### O problema: erros que escapam do `Router` e vazamento de detalhes internos

Mesmo depois de validar todas as rotas com Zod, três falhas muito comuns continuam acontecendo em APIs iniciantes:

1. **Colocar o middleware de erro dentro de um `Router` em vez de no `app`:** quando o cliente envia um JSON cortado (`{"descricao": "sem fechar`) ou um corpo maior que o limite, o erro acontece dentro de `express.json()`, **antes** de a requisição entrar em `rotasDespesas`. Se o handler de erro de 4 parâmetros estiver preso ao `Router`, esse erro escapa e cai no tratador padrão do Express — que devolve HTML!
2. **Misturar formatos de erro:** `400` do Zod devolve `{ erro: { ... } }`, `404` de rota inexistente devolve texto `"Cannot GET /x"`, e `413` devolve HTML. O cliente (seu frontend React!) não consegue tratar erros de forma previsível.
3. **Vazar `err.message` ou `err.stack` em respostas `500`:** devolver mensagens técnicas do Node (como caminhos de disco `/Users/.../dados.json` ou erros internos de driver) ajuda atacantes a mapear sua infraestrutura e confunde o usuário final. O detalhe completo pertence ao **log do servidor** (`console.error`), nunca ao corpo HTTP `500`.

### Modelo mental: a ordem exata no `app`

Todo erro — venha de um middleware global, de uma rota ou de uma rejeição assíncrona no Express 5 — precisa descer até o **mesmo** tratador final registrado no `app`:

```text
Requisição HTTP
   │
   ▼
[ 1. Logs / cabeçalhos globais ]    ◄── quando houver CORS (cap. 34), entra AQUI,
   │                                    antes de rate limit e express.json(), para que
   ▼                                    respostas 400/413/429 também levem headers CORS!
[ 2. Rate limiter (etapa 6) ]       ──► excesso de frequência ──► 429 JSON [FIM]
   │
   ▼
[ 3. express.json({ limit }) ]      ──► JSON cortado ──► next(SyntaxError 400) ──┐
   │                                ──► corpo > limit ──► next(erro 413)       ──┤
   ▼                                                                             │
[ 4. Rotas (/health, /despesas) ]   ──► validar(...) ──► 400 JSON [FIM]          │
   │                                ──► handler OK   ──► 200 / 201 / 204 [FIM]   │
   │                                ──► throw/reject ──► next(erro)            ──┤
   ▼ (se nenhuma rota casou)                                                     │
[ 5. Fallback 404 (no app) ]        ──► 404 JSON padronizado [FIM]               │
   │                                                                             │
   ▼ ◄───────────────────────────────────────────────────────────────────────────┘
[ 6. Middleware de erro (no app, 4 parâmetros) ]
     ├── status 400 (SyntaxError do JSON) ──► 400 JSON padronizado
     ├── status 413 (entity.too.large)    ──► 413 JSON padronizado
     └── qualquer outro erro              ──► console.error(err) + 500 JSON genérico
```

### Exemplo em TypeScript: envelope único de erro e tratador central (`src/erros.ts`)

```ts
// src/erros.ts
import type { NextFunction, Request, Response } from "express";

export type CodigoErro =
  | "DADOS_INVALIDOS"
  | "JSON_INVALIDO"
  | "CORPO_MUITO_GRANDE"
  | "NAO_ENCONTRADO"
  | "ROTA_NAO_ENCONTRADA"
  | "MUITAS_REQUISICOES"
  | "ERRO_INTERNO";

export interface RespostaErro {
  readonly erro: {
    readonly codigo: CodigoErro;
    readonly mensagem: string;
    readonly detalhes?: unknown;
  };
}

export function responderErro(
  res: Response,
  status: number,
  codigo: CodigoErro,
  mensagem: string,
  detalhes?: unknown,
): void {
  const payload: RespostaErro = {
    erro:
      detalhes === undefined
        ? { codigo, mensagem }
        : { codigo, mensagem, detalhes },
  };

  res.status(status).json(payload);
}

function obterStatusDeErroHttp(erro: unknown): number | null {
  if (typeof erro !== "object" || erro === null || !("status" in erro)) {
    return null;
  }
  return typeof erro.status === "number" ? erro.status : null;
}

export function tratarRotaNaoEncontrada(req: Request, res: Response): void {
  responderErro(
    res,
    404,
    "ROTA_NAO_ENCONTRADA",
    `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  );
}

// Precisa ter exatamente 4 parâmetros e ser o ÚLTIMO middleware registrado no `app`
export function tratarErros(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = obterStatusDeErroHttp(err);

  if (err instanceof SyntaxError && status === 400) {
    responderErro(res, 400, "JSON_INVALIDO", "Corpo JSON malformado.");
    return;
  }

  if (status === 413) {
    responderErro(
      res,
      413,
      "CORPO_MUITO_GRANDE",
      "O corpo da requisição excede o tamanho máximo permitido.",
    );
    return;
  }

  console.error("Erro inesperado no servidor:", err);
  responderErro(res, 500, "ERRO_INTERNO", "Erro interno do servidor.");
}
```

Note que `obterStatusDeErroHttp` inspeciona `err: unknown` com estreitamento real (`typeof`, `!== null`, `in`), sem nenhum cast `as`. E qualquer falha inesperada — inclusive um `despesaSchema.parse(...)` falhando porque alguém corrompeu manualmente o arquivo no disco — cai no bloco `500`, registra o diagnóstico completo no terminal do servidor e devolve ao cliente apenas `"Erro interno do servidor."`.

## 6. Limites de requisição e verificação do contrato

### O problema: dados válidos em formato ainda podem derrubar o servidor

Validar tipos com Zod resolve a qualidade dos campos, mas não impede abuso de recursos:

- Um cliente pode enviar um JSON perfeitamente válido de **50 MB** (por exemplo, uma string gigante antes mesmo de o Zod checar `.max(100)`), forçando o `express.json()` a alocar memória e bloquear a *thread* principal do Node no `JSON.parse`.
- Um script em loop pode enviar **milhares de requisições por segundo** ao seu servidor, saturando CPU e disco até negar serviço aos demais clientes.

### Leitura principal

Leia apenas a introdução e o exemplo de resposta das duas páginas curtas de status HTTP no MDN:

- [`413 Content Too Large` — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/413)
- [`429 Too Many Requests` — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) (repare no header `Retry-After`)

Para conhecer o pacote padrão de controle de frequência no Express em nível introdutório, leia:

- [Overview — express-rate-limit](https://express-rate-limit.mintlify.app/overview) (apenas introdução e **Use Cases**).
- [Using the Library in Express — express-rate-limit](https://express-rate-limit.mintlify.app/quickstart/usage#using-the-library-in-express) (apenas o exemplo básico de `rateLimit(...)`; pule **Next.js** e **External Stores** por enquanto).

### Modelo mental: defesa em três camadas de limites

| Camada | O que controla | Onde atua | Status ao exceder |
|---|---|---|---|
| **1. Tamanho do corpo** | Quantos bytes o servidor aceita ler antes do `JSON.parse` | `express.json({ limit: "10kb" })` | `413 Content Too Large` |
| **2. Limites de domínio nos campos** | Tamanho de textos, faixas numéricas, listas fechadas | Schemas Zod (`.max(100)`, `.positive().max(1_000_000)`, `z.enum`) | `400 Bad Request` |
| **3. Frequência (*rate limiting*)** | Quantas requisições por janela de tempo cada cliente pode fazer | Middleware `rateLimit(...)` de `express-rate-limit` | `429 Too Many Requests` |

### Montando o `app.ts` com pipeline completo e limites

Com `npm install express-rate-limit` (além de `express` e `zod`), conectamos todas as peças do capítulo em `src/app.ts`:

```ts
// src/app.ts
import express, { type Express, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import type { AppConfig } from "./config.ts";
import {
  tratarErros,
  tratarRotaNaoEncontrada,
  type RespostaErro,
} from "./erros.ts";
import { criarRotasDespesas } from "./rotas-despesas.ts";

export function criarApp(config: AppConfig): Express {
  const app = express();

  // 1. Limite de frequência (introdutório): protege contra rajadas excessivas
  const respostaLimiteExcedido: RespostaErro = {
    erro: {
      codigo: "MUITAS_REQUISICOES",
      mensagem: "Limite de requisições excedido. Tente novamente em instantes.",
    },
  };

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // janela de 15 minutos
      limit: 100, // até 100 requisições por IP nessa janela
      standardHeaders: true, // envia headers RateLimit-* padronizados
      legacyHeaders: false,
      message: respostaLimiteExcedido,
    }),
  );

  // 2. Limite de tamanho do corpo JSON (bem menor que o padrão de 100kb)
  app.use(express.json({ limit: "10kb" }));

  // 3. Healthcheck e rotas do recurso
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, servico: config.appName });
  });

  app.use("/despesas", criarRotasDespesas(config.dataFile));

  // 4. Fallback 404 e middleware central de erros (sempre no app, por último)
  app.use(tratarRotaNaoEncontrada);
  app.use(tratarErros);

  return app;
}
```

### O que `express.json({ limit })` e `express-rate-limit` abstraem, custos e limitações

1. **`express.json({ limit: "10kb" })`:** interrompe a leitura do *stream* assim que o tamanho ultrapassa `10kb` e encaminha um erro com `status: 413` direto para `tratarErros` — evitando alocar memória para payloads gigantes. **Limite:** escolha o tamanho conforme o recurso (um endpoint de texto pequeno funciona bem com `10kb`; envio de arquivos/imagens exige outra estratégia, não JSON gigante).
2. **`express-rate-limit`:** conta requisições por IP dentro da janela `windowMs` e responde `429` com headers `RateLimit-*`/`Retry-After`. **Limites importantes:**
   - **Armazenamento padrão em memória:** os contadores ficam na RAM do processo Node; se o servidor reiniciar, os contadores zeram. Em produção com várias instâncias atrás de um *load balancer*, cada processo contaria separado (o que exige armazenamento compartilhado como Redis — assunto de sistemas distribuídos no Bloco 17).
   - **Proxy reverso e IP real:** quando a API roda atrás de um proxy (como Nginx ou Cloudflare), `req.ip` pode enxergar sempre o IP do proxy até configurar `app.set("trust proxy", ...)` adequadamente.
   - **Não substitui autenticação:** limitar frequência reduz abuso bruto, mas não controla *quem* pode acessar quais dados (capítulo 34).

### Verificando o contrato sistematicamente

Antes mesmo dos testes automatizados de integração com banco descartável (capítulo 33), vale conferir o contrato da API usando uma **tabela de casos de sucesso e falha** — cada linha declara caso, entrada, status esperado e formato do corpo:

| Caso | Requisição | Status esperado | Verificação no corpo |
|---|---|---|---|
| Criar válida | `POST /despesas` com `{ descricao, categoria, valor }` | `201` | Devolve objeto com `id` (UUID gerado pelo servidor) |
| Sem `Content-Type` JSON | `POST /despesas` sem header JSON | `400` | `{ erro: { codigo: "DADOS_INVALIDOS", ... } }` |
| Campo com tipo errado | `POST /despesas` com `valor: "abc"` | `400` | `detalhes.fieldErrors.valor` preenchido |
| JSON cortado | `POST /despesas` com `{"descricao":"Café` | `400` | `{ erro: { codigo: "JSON_INVALIDO", ... } }` |
| ID malformado | `GET /despesas/nao-e-uuid` | `400` | `{ erro: { codigo: "DADOS_INVALIDOS", ... } }` |
| ID válido inexistente | `GET /despesas/550e8400-e29b-41d4-a716-446655440000` | `404` | `{ erro: { codigo: "NAO_ENCONTRADO", ... } }` |
| Atualização parcial | `PATCH /despesas/:id` com `{ valor: 35 }` | `200` | Apenas `valor` muda; demais campos preservados |
| Remoção existente | `DELETE /despesas/:id` | `204` | Corpo vazio; `GET` seguinte devolve `404` |
| Corpo gigante (> 10kb) | `POST /despesas` com payload de ~20kb | `413` | `{ erro: { codigo: "CORPO_MUITO_GRANDE", ... } }` |

**Experimente:** com o servidor rodando localmente, valide pelo menos os casos críticos de fronteira via `curl -i` — especialmente o JSON cortado (`400`), o ID malformado (`400`) versus inexistente (`404`) e um payload acima de `10kb` (`413`):

```bash
# 1. Campo inválido (esperado: 400 DADOS_INVALIDOS)
curl -i -X POST http://127.0.0.1:3000/despesas \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Almoço","categoria":"Alimentação","valor":"abc"}'

# 2. JSON cortado (esperado: 400 JSON_INVALIDO)
curl -i -X POST http://127.0.0.1:3000/despesas \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Café'

# 3. ID malformado (400) versus UUID válido ausente (404)
curl -i http://127.0.0.1:3000/despesas/abc
curl -i http://127.0.0.1:3000/despesas/550e8400-e29b-41d4-a716-446655440000

# 4. Corpo maior que 10kb (esperado: 413 CORPO_MUITO_GRANDE)
node -e 'console.log(JSON.stringify({ descricao: "a".repeat(20000), categoria: "Outros", valor: 10 }))' \
  | curl -i -X POST http://127.0.0.1:3000/despesas \
      -H "Content-Type: application/json" \
      --data-binary @-
```

*(Quando você quiser automatizar essa tabela sem depender de um framework externo, o próprio Node já inclui `node:test` + `fetch`, antecipando a estrutura dos testes integrados do capítulo 33.)*

## Erros comuns a evitar

| Erro comum | Por que causa problema | Como evitar |
|---|---|---|
| **Validar apenas no frontend** | Qualquer pessoa pode chamar a API diretamente via `curl` ou script. | Validar sempre na fronteira do servidor com schemas. |
| **Usar `as MeuTipo` em `req.body`** | Tipos somem após a compilação; nenhuma checagem roda em runtime. | Tratar entradas como `unknown` e validar com `safeParse`. |
| **Manter `interface` e schema separados** | Os dois divergem assim que um requisito muda. | Derivar o tipo direto do schema com `z.infer<typeof schema>`. |
| **Esquecer que `params` e `query` são texto (ou mutar `req.query`)** | Comparações numéricas falham e atribuir a `req.query` quebra no Express 5. | Validar/converter com Zod e guardar o resultado em `res.locals`. |
| **Responder `200`/`201` quando deu erro ou misturar formatos de erro** | Quebra `response.ok` e impede tratamento consistente no cliente. | Usar status HTTP corretos (`400`, `404`, `413`, `429`, `500`) e um único envelope JSON. |
| **Devolver `err.message` ou `err.stack` no `500`** | Expõe caminhos, bibliotecas e detalhes internos do servidor. | Registrar o erro completo no log do servidor e responder mensagem genérica ao cliente. |

## Ao terminar

Antes de avançar para o capítulo 31 (Persistência e SQL essencial), confira se você consegue explicar:

- por que `req.body`, `req.params`, `req.query` e arquivos JSON precisam ser tratados como `unknown` mesmo em um projeto TypeScript `strict`, por que `as` não oferece proteção em runtime e por que validar no frontend não substitui validar no servidor;
- como um schema Zod funciona como única fonte de verdade (`safeParse` em runtime + `z.infer` em compilação), qual a diferença entre `z.object()` padrão e `z.strictObject()`, quando escolher `z.flattenError`, `z.treeifyError` ou `z.prettifyError`, e por que o schema de criação (`POST`) não aceita `id`;
- como funciona uma fábrica de *middleware* de validação (`validar(alvo, schema)`), por que guardamos os dados validados em `res.locals` no Express 5, quais armadilhas existem ao converter *query strings* (como `z.coerce.boolean()` com `"false"`) e qual a diferença semântica entre `400 Bad Request` e `404 Not Found`;
- qual a diferença entre `PUT` (substituição completa) e `PATCH` (atualização parcial), por que `DELETE` costuma responder `204 No Content`, e qual limite do armazenamento em arquivo JSON ainda permanece aberto para o capítulo 31;
- por que o middleware de erro de 4 parâmetros precisa ficar no `app` (depois de todas as rotas, e não dentro de um `Router`), por que nunca devemos devolver `err.stack` ao cliente no `500`, e como as três camadas de limites (tamanho do corpo `413`, limites de domínio no schema `400` e frequência `429`) protegem a API — junto com as limitações de um *rate limiter* em memória.
