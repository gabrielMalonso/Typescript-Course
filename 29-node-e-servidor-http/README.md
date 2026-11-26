# Capítulo 29 — Node e servidor HTTP

**Objetivo:** compreender as diferenças entre executar JavaScript/TypeScript no navegador e no Node.js, realizar leitura e escrita assíncrona de arquivos (`node:fs/promises` e `node:path`), entender como um servidor HTTP funciona por baixo com `node:http`, estruturar rotas e a cadeia de *middlewares* com Express e montar uma pequena API configurada por variáveis de ambiente (sem fixar porta, caminhos ou segredos no código-fonte).

Nos capítulos 20 a 28 (Bloco 3), todo o seu código viveu do lado do cliente: React no navegador enviando requisições com `fetch` para APIs prontas, tratando `response.ok`, validando `unknown` e testando a interface. A partir deste capítulo — o primeiro do **Bloco 4** — você atravessa para o outro lado da conversa HTTP: **construir o próprio servidor** em Node.js que recebe requisições, lê e grava arquivos e responde em JSON.

**Percurso:** Node.js versus navegador (e TypeScript no Node) → I/O assíncrono de arquivos e caminhos (`node:fs/promises` e `node:path`) → servidor HTTP mínimo com `node:http` → rotas, *middlewares* e tratamento de erros com Express → configuração por ambiente e montagem de uma pequena API modular. Em cada etapa, leia o recorte oficial indicado e use as explicações e exemplos para conectar o mecanismo ao TypeScript e ao HTTP que você já domina.

**Escopo:** focamos nos fundamentos do servidor em Node + TypeScript + Express, com configuração por ambiente e persistência introdutória em arquivo JSON apenas para experimentar I/O. Validação completa de entradas com schemas (Zod), CRUD completo e limites de requisição entram no capítulo 30; persistência real em banco relacional com SQL (substituindo o arquivo JSON), nos capítulos 31 e 32; integração com o frontend e testes automatizados da API em banco descartável, no capítulo 33; CORS em profundidade, cookies/sessões, autenticação/autorização, segredos em produção e deploy, no capítulo 34; configuração avançada de módulos e `tsconfig`, no capítulo 62; processos, permissões e filesystem do sistema operacional, no capítulo 74; *event loop* e I/O não-bloqueante em detalhe, no capítulo 76; e IP, portas, TCP/UDP, sockets e TLS em profundidade, nos capítulos 78–80.

## 1. Node.js versus navegador (e TypeScript no Node)

### O problema: por que um servidor não roda no navegador

Até aqui, você usou o Node indiretamente para rodar o `npm`, o Vite e o Vitest (capítulos 21 e 28), enquanto a aplicação em si executava dentro do navegador. Mas uma API não pode morar no navegador do usuário por três motivos práticos:

1. **Tempo de vida:** quando a pessoa fecha a aba, o programa do navegador morre. Um servidor precisa ficar ligado esperando requisições de vários clientes diferentes.
2. **Isolamento (*sandbox*):** por segurança, o navegador proíbe o código da página de ler arquivos arbitrários do disco, abrir portas de rede para escutar conexões ou acessar diretamente um banco de dados.
3. **Fronteira de confiança:** qualquer código enviado ao navegador pode ser lido e alterado pelo usuário no DevTools. Regras críticas de negócio, controle de acesso e senhas de banco nunca podem ficar no cliente.

O **Node.js** resolve isso trazendo o mesmo motor de JavaScript (V8) para fora do navegador — rodando diretamente como um processo do sistema operacional, com acesso controlado a arquivos, variáveis de ambiente e rede.

### Leitura principal

Leia por completo a página curta [Differences between Node.js and the Browser — Node.js Learn](https://nodejs.org/learn/getting-started/differences-between-nodejs-and-the-browser) (observe a mudança de ecossistema de APIs e o fato de você controlar a versão do ambiente no servidor).

Em [Running TypeScript Natively — Node.js Learn](https://nodejs.org/learn/typescript/run-natively), leia a introdução e **Constraints** (**Type stripping** e **Type checking**). Pule **Configuration** em diante (configuração avançada de `tsconfig` e resolução de módulos entram no capítulo 62).

### Modelo mental: a mesma linguagem, dois ambientes diferentes

A sintaxe de JavaScript/TypeScript (`if`, `for`, `Map`, `Promise`, `async`/`await`, `JSON`, `URL`, `fetch`) é a mesma nos dois lados. O que muda são as **APIs fornecidas pelo ambiente** ao redor do motor:

```text
NAVEGADOR (cliente)                          NODE.JS (servidor / CLI)
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│  Motor JS (V8 / SpiderMonkey)    │        │  Motor JS (V8)                   │
│  + Web APIs:                     │        │  + APIs do SO (via libuv / C++): │
│    window, document (DOM),       │        │    node:fs/promises (arquivos),  │
│    eventos de clique/teclado,    │        │    node:http (servidor de rede), │
│    localStorage, fetch           │        │    node:path, node:os, process,  │
│  [isolado em sandbox]            │        │    process.env, fetch            │
└──────────────────────────────────┘        └──────────────────────────────────┘
```

Compare as diferenças mais importantes no dia a dia:

| Aspecto | Navegador | Node.js |
|---|---|---|
| **Interface / DOM** | Tem `window`, `document`, HTML e CSS. | **Não existe DOM** (`document` gera `ReferenceError`). |
| **Sistema de arquivos** | Bloqueado por segurança (salvo seleção manual do usuário). | Acesso direto via `node:fs/promises`, sujeito às permissões do SO. |
| **Rede** | Apenas **cliente** (`fetch` para fora, sujeito a CORS). | Pode ser **cliente** (`fetch`) e **servidor** (`node:http` escutando uma porta). |
| **Variáveis de ambiente** | Não acessa variáveis do SO do usuário. | Lê configuração da máquina/servidor via `process.env`. |
| **Controle de versão** | Cada visitante usa um navegador e versão diferentes. | Você escolhe exatamente qual versão do Node roda no seu servidor. |
| **Módulos nativos** | Importa pacotes/arquivos via bundler (Vite). | Oferece módulos embutidos com prefixo explícito `node:` (`node:fs`, `node:http`, `node:path`). |

> **Por que usar o prefixo `node:` nos imports?** Escrever `import path from "node:path"` deixa explícito para você e para o runtime que o módulo é nativo do Node — nunca um pacote instalado em `node_modules`.

### Como o TypeScript roda no Node moderno

Nas versões atuais do Node.js (a partir da v22.18+, incluindo v24), você pode executar arquivos `.ts` diretamente com `node arquivo.ts` sem precisar de uma etapa de compilação manual antes. O Node faz isso por ***type stripping***: ele remove as anotações de tipo da sintaxe e executa o JavaScript restante.

Guarde **três consequências práticas** desse mecanismo (repare na semelhança direta com o Vite no capítulo 21):

1. **Executar não verifica tipos:** assim como o Vite, o Node **não** faz *type-checking* quando roda `.ts`. Quem garante que seus tipos estão corretos continua sendo `npx tsc --noEmit` (e o editor com `@types/node` instalado).
2. **Apenas sintaxe "apagável" (*erasable*):** recursos que só existem em tempo de compilação (`interface`, `type`, anotações de parâmetro/retorno, `import type`) funcionam direto. Recursos que geram código JavaScript extra (como `enum` ou *parameter properties* de classes) não entram no *type stripping* padrão — mais um motivo pelo qual preferimos unions de literais (capítulo 18).
3. **Reinício automático em desenvolvimento:** rodar `node --watch arquivo.ts` reinicia o processo sozinho toda vez que você salva um arquivo, sem precisar parar e subir o comando manualmente.

Veja um primeiro script em TypeScript inspecionando o processo Node (`info-ambiente.ts`):

```ts
// info-ambiente.ts
import os from "node:os";

interface ResumoAmbiente {
  readonly versaoNode: string;
  readonly sistemaOperacional: NodeJS.Platform;
  readonly pid: number;
  readonly pastaAtual: string;
  readonly memoriaLivreMb: number;
}

const resumo: ResumoAmbiente = {
  versaoNode: process.version,
  sistemaOperacional: process.platform,
  pid: process.pid,
  pastaAtual: process.cwd(),
  memoriaLivreMb: Math.round(os.freemem() / (1024 * 1024)),
};

console.log(resumo);
```

**O que o Node abstrai, custos e limites:** o Node abstrai diferenças entre Linux, macOS e Windows por trás de APIs JavaScript unificadas (`node:os`, `node:fs`, `node:http`) e coordena operações de disco e rede de forma assíncrona. Porém, o código JavaScript executa por padrão em uma **única *thread* principal**: um cálculo pesado síncrono (por exemplo, um loop gigante ou `JSON.parse` de centenas de megabytes) trava o processo inteiro e impede o servidor de responder a outros clientes enquanto não terminar (aprofundaremos o *event loop* no capítulo 76).

**Experimente:** salve `info-ambiente.ts` em uma pasta temporária e execute `node info-ambiente.ts`. Depois, suba um nível no terminal (`cd ..`) e execute `node nome-da-pasta/info-ambiente.ts`. Observe que **`process.cwd()` mudou** para a pasta de onde o comando foi disparado — isso será crucial na próxima etapa ao lidar com arquivos.

## 2. I/O de arquivos no Node (`node:fs/promises` e `node:path`)

### O problema: ler e gravar arquivos sem travar o servidor nem quebrar caminhos

No navegador, um programa não consegue gravar um arquivo direto no disco. No Node, isso é parte central do trabalho de backend e de scripts de automação — mas traz dois erros clássicos de quem está começando:

1. **Usar funções síncronas (`readFileSync`, `writeFileSync`) dentro de um servidor:** ler um arquivo do disco (I/O — *Input/Output*) é milhares de vezes mais lento do que ler uma variável na memória RAM. Como o JavaScript no Node roda em uma *thread* principal única, uma chamada síncrona bloqueia **todas** as requisições HTTP simultâneas até o disco terminar.
2. **Montar caminhos concatenando strings (`"./dados/" + arquivo`):** Windows usa contrabarra (`\`), macOS e Linux usam barra (`/`), e caminhos relativos como `"./dados/tarefas.json"` dependem de `process.cwd()` — ou seja, quebram se alguém iniciar o servidor a partir de outra pasta.

### Leitura principal

Leia a página curta [Reading files with Node.js — Node.js Learn](https://nodejs.org/learn/manipulating-files/reading-files-with-nodejs) observando as três formas mostradas (callback, síncrona e `node:fs/promises` — usaremos a versão com Promises e `async`/`await`).

Em [Writing files with Node.js — Node.js Learn](https://nodejs.org/learn/manipulating-files/writing-files-with-nodejs), leia **Writing a file** (dando foco ao exemplo com `node:fs/promises`) e a advertência de **Writing a file synchronously**. Pule **Appending content to a file**.

Em [Node.js File Paths — Node.js Learn](https://nodejs.org/learn/manipulating-files/nodejs-file-paths), leia a introdução e **Working with paths** (foco em `path.join` e `path.resolve`). Você pode pular **Getting information out of a path** se já reconhece diretório, nome e extensão de arquivo.

### Modelo mental: I/O assíncrono + caminhos ancorados e seguros

Compare o que acontece quando duas requisições chegam quase juntas a um servidor:

```text
Com I/O SÍNCRONO (readFileSync) — bloqueia a fila inteira:
Req A ──► [===== esperando disco (bloqueado) =====] ──► resposta A
Req B ..................................................[aguarda A acabar] ──► resposta B

Com I/O ASSÍNCRONO (await readFile de node:fs/promises):
Req A ──► inicia leitura ──(SO lê o disco)──► retoma e envia resposta A
Req B ────► já é atendida enquanto o disco trabalha para A ──► resposta B
```

Por isso, em código de servidor, usamos sempre **`node:fs/promises`** com `async`/`await` (do capítulo 25). Reserve as versões `*Sync` apenas para scripts curtos de linha de comando ou leitura única na inicialização antes de aceitar tráfego.

Para caminhos de arquivo, duas ferramentas resolvem o problema de portabilidade:

- **`path.join(...)` e `path.resolve(...)`** de `node:path`: montam caminhos usando o separador correto do sistema operacional e normalizam barras extras ou `..`.
- **`import.meta.dirname`** (disponível a partir do Node 20.11): aponta para a pasta real onde o arquivo `.ts`/`.js` atual está salvo, independentemente de qual pasta você usou no terminal ao executar `node`. *(Em códigos mais antigos em ESM, você também verá `path.dirname(fileURLToPath(import.meta.url))` cumprindo exatamente o mesmo papel.)*

### Exemplo em TypeScript: lendo e salvando um arquivo JSON com segurança

Repare como reaproveitamos **tudo** o que você já construiu nos capítulos 25 e 26: `async`/`await`, `JSON.parse` como `unknown`, validação em runtime sem `as` e tratamento explícito do código de erro `ENOENT` (*Error NO ENTry* — o arquivo ainda não existe):

```ts
// src/repositorio.ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

function ehArquivoInexistente(erro: unknown): boolean {
  return (
    typeof erro === "object" &&
    erro !== null &&
    "code" in erro &&
    erro.code === "ENOENT"
  );
}

function validarTarefa(valor: unknown): Tarefa | null {
  if (typeof valor !== "object" || valor === null) return null;
  if (!("id" in valor) || !("titulo" in valor) || !("concluida" in valor)) {
    return null;
  }
  if (
    typeof valor.id !== "number" ||
    !Number.isSafeInteger(valor.id) ||
    typeof valor.titulo !== "string" ||
    typeof valor.concluida !== "boolean"
  ) {
    return null;
  }
  return {
    id: valor.id,
    titulo: valor.titulo,
    concluida: valor.concluida,
  };
}

function validarLista(valor: unknown): Tarefa[] {
  if (!Array.isArray(valor)) {
    throw new Error("Arquivo de dados corrompido: esperado um array JSON.");
  }

  const tarefas: Tarefa[] = [];
  for (const item of valor) {
    const tarefa = validarTarefa(item);
    if (tarefa === null) {
      throw new Error("Arquivo de dados contém uma tarefa inválida.");
    }
    tarefas.push(tarefa);
  }
  return tarefas;
}

export async function carregarTarefas(caminhoArquivo: string): Promise<Tarefa[]> {
  try {
    const conteudo = await readFile(caminhoArquivo, "utf8");
    const bruto: unknown = JSON.parse(conteudo);
    return validarLista(bruto);
  } catch (erro: unknown) {
    // Ausência inicial do arquivo é esperada: começamos com lista vazia
    if (ehArquivoInexistente(erro)) {
      return [];
    }
    throw erro;
  }
}

export async function salvarTarefas(
  caminhoArquivo: string,
  tarefas: readonly Tarefa[],
): Promise<void> {
  // Garante que a pasta pai exista antes de gravar o arquivo
  await mkdir(path.dirname(caminhoArquivo), { recursive: true });
  const json = JSON.stringify(tarefas, null, 2);
  await writeFile(caminhoArquivo, `${json}\n`, "utf8");
}
```

Conecte três pontos desse código:

1. **Erro esperado versus falha real (capítulo 25):** se `readFile` falhar com `ENOENT`, o arquivo ainda não foi criado — devolver `[]` faz sentido. Mas se o erro for falta de permissão (`EACCES`) ou JSON corrompido (`SyntaxError`), relançamos (`throw erro`) em vez de mascarar o defeito devolvendo uma lista vazia que apagaria dados na próxima gravação.
2. **Arquivo no disco também é entrada externa:** nunca faça `JSON.parse(conteudo) as Tarefa[]`. Alguém pode editar o arquivo manualmente ou uma escrita pode ficar pela metade; validar como `unknown` detecta a corrupção na hora.
3. **`mkdir(..., { recursive: true })`:** evita que `writeFile` falhe caso a pasta `dados/` ainda não exista na máquina.

**O que `node:fs/promises` e `node:path` abstraem — e por que um arquivo JSON NÃO é um banco de dados:**

- `node:fs/promises` abstrai chamadas de sistema do SO (abrir descritor de arquivo, ler/gravar bytes em UTF-8, fechar o descritor) e entrega uma Promise sem travar o processo.
- **Custo de escala:** toda vez que adicionamos **uma** tarefa, lemos o arquivo inteiro, fazemos `JSON.parse` de tudo, serializamos tudo de novo e sobrescrevemos o arquivo inteiro — tempo e memória **O(n)** proporcionais ao total de registros.
- **Limite grave de concorrência (*race condition*):** se duas requisições `POST` chegarem ao mesmo tempo, ambas podem executar `carregarTarefas()` antes de qualquer uma salvar, obter `[tarefa1]`, adicionar seus itens separadamente e chamar `salvarTarefas()` uma em cima da outra — a segunda escrita **apaga silenciosamente** a tarefa da primeira! Além disso, se o processo cair no meio de `writeFile`, o arquivo pode ficar truncado. Por isso, arquivo JSON serve aqui apenas para aprender I/O; persistência confiável com consultas, restrições e transações entra nos **capítulos 31 e 32** com SQL.

**Experimente:** crie um pequeno script temporário que importe `carregarTarefas` e `salvarTarefas` usando `path.resolve(import.meta.dirname, "dados", "tarefas.json")`, adicione uma tarefa nova e imprima a lista. Rode duas vezes seguidas para ver o arquivo crescer no disco; depois apague a pasta `dados/` e confirme que a execução seguinte recria tudo sem erro.

## 3. Como um servidor HTTP funciona por baixo (`node:http`)

### O problema: como um programa fica escutando requisições na rede

No capítulo 26, você enviou requisições HTTP com `fetch` para um servidor pronto. Agora vamos olhar o mecanismo mínimo do lado que **recebe** essa requisição. Antes de usar Express, vale construir um servidor pequeno com o módulo nativo **`node:http`** para que nada pareça "mágica" depois.

### Leitura principal

Em [Anatomy of an HTTP Transaction — Node.js Learn](https://nodejs.org/learn/http/anatomy-of-an-http-transaction), leia **Create the Server**, **Method, URL and Headers**, **HTTP Status Code**, **Setting Response Headers** e **Sending Response Body**.

Pule **Request Body** (manipulação manual de *streams*), **A Quick Thing About Errors**, **Another Quick Thing About Errors** e **Echo Server Example** por enquanto — vamos entender o papel do corpo aqui e usar Express na etapa 4 para lê-lo de forma limpa e segura.

### Modelo mental: host, porta e o ciclo `(req, res)`

Um servidor HTTP em Node é um processo que pede ao sistema operacional para **escutar** conexões em um endereço (**host**, como `127.0.0.1` — o endereço local da própria máquina, também chamado de *loopback*) e em uma **porta** (um número como `3000`). A porta existe porque vários servidores podem rodar ao mesmo tempo na mesma máquina (por exemplo, Vite na `5173` e sua API na `3000`).

Sempre que uma requisição HTTP chega nessa porta, o Node dispara a função de callback `(req, res) => { ... }`:

```text
CLIENTE (curl / navegador / fetch)               PROCESSO NODE (127.0.0.1:3000)
  │                                                      │
  ├── GET /tarefas HTTP/1.1 ────────────────────────────►│ createServer((req, res) => ...)
  │   Accept: application/json                           │   1. lê req.method e req.url
  │                                                      │   2. decide qual rota responder
  │                                                      │   3. define res.statusCode e headers
  │◄── HTTP/1.1 200 OK ──────────────────────────────────┤   4. chama res.end(corpoJson)
  │    Content-Type: application/json; charset=utf-8     │
  │    [{"id":1,"titulo":"Entender node:http",...}]      │
```

Veja esse servidor mínimo completo em TypeScript puro (`servidor-http.ts`), sem instalar nenhuma biblioteca externa:

```ts
// servidor-http.ts
import http, {
  type IncomingMessage,
  type ServerResponse,
} from "node:http";

const TAREFAS_EXEMPLO = [
  { id: 1, titulo: "Entender node:http", concluida: true },
  { id: 2, titulo: "Aprender rotas e middlewares", concluida: false },
];

function enviarJson(
  res: ServerResponse,
  status: number,
  dados: unknown,
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(dados));
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const metodo = req.method ?? "GET";
    // req.url traz apenas caminho + query (ex.: "/tarefas?limite=5"), por isso passamos uma base
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    if (metodo === "GET" && url.pathname === "/health") {
      enviarJson(res, 200, { ok: true });
      return;
    }

    if (metodo === "GET" && url.pathname === "/tarefas") {
      enviarJson(res, 200, TAREFAS_EXEMPLO);
      return;
    }

    enviarJson(res, 404, { erro: `Rota ${metodo} ${url.pathname} não encontrada.` });
  },
);

const PORTA = 3000;
const HOST = "127.0.0.1";

server.listen(PORTA, HOST, () => {
  console.log(`Servidor HTTP rodando em http://${HOST}:${PORTA}`);
});
```

Note dois detalhes técnicos úteis:

1. **O processo não encerra sozinho:** diferentemente de scripts comuns que terminam após o último `console.log`, `server.listen(...)` mantém o Node vivo escutando a porta até você pressionar `Ctrl+C` no terminal. Se outra aplicação já estiver usando a porta `3000`, o Node falha imediatamente com o erro **`EADDRINUSE`** (*Address already in use*).
2. **Reaproveitando `new URL(...)` (capítulo 26):** `req.url` vem apenas com o caminho relativo (`"/tarefas?concluida=true"`). Combiná-lo com a base em `new URL(...)` separa `url.pathname` e `url.searchParams` com segurança.

### O que `node:http` abstrai — e por que usamos um framework logo em seguida

O módulo `node:http` já abstrai muito trabalho de baixo nível: gerencia conexões TCP com o sistema operacional, interpreta o texto bruto do protocolo HTTP em `req.method`/`req.headers` e formata a resposta HTTP de volta em bytes (estudaremos sockets, TCP e portas em profundidade no capítulo 78).

Porém, assim que a API cresce além de duas ou três rotas simples, trabalhar direto com `node:http` fica repetitivo e sujeito a erros:

- **Roteamento manual:** cada nova rota vira mais um `if (metodo === ... && url.pathname === ...)` dentro de uma única função gigante.
- **Parâmetros dinâmicos:** extrair o `42` de `/tarefas/42` obriga a fatiar strings ou escrever expressões regulares na mão.
- **Leitura do corpo (`POST`/`PATCH`):** em `node:http`, o corpo da requisição chega aos pedaços (*chunks* de um *stream*); você precisa juntar os pedaços manualmente, impor um limite de bytes para não estourar a RAM, decodificar UTF-8 e envolver `JSON.parse` em `try`/`catch` em toda rota.
- **Passos repetidos entre rotas:** registrar logs, conferir autenticação ou padronizar erros exige repetir código ou montar sua própria cadeia de funções.

É exatamente para resolver essas quatro dores — **em cima do próprio `node:http`** — que entra o Express.

**Experimente:** rode `node servidor-http.ts` em um terminal. Em **outro** terminal, faça duas chamadas com `curl -i` (a flag `-i` imprime o status e os headers além do corpo):

```bash
curl -i http://127.0.0.1:3000/health
curl -i http://127.0.0.1:3000/tarefas
curl -i http://127.0.0.1:3000/nao-existe
```

Observe a linha `HTTP/1.1 200 OK` / `404 Not Found` e o header `Content-Type: application/json; charset=utf-8`. Quando terminar, volte ao primeiro terminal e encerre o servidor com `Ctrl+C`.

## 4. Rotas e *middlewares* com Express

### O problema: organizar rotas, leitura de JSON, logs e erros em uma cadeia previsível

Em vez de concentrar tudo em um único `if`/`else` no `createServer`, queremos declarar cada rota separadamente (`app.get("/tarefas/:id", ...)`), reutilizar etapas comuns entre rotas (como registrar logs e interpretar JSON) e ter um único lugar responsável por responder erros inesperados.

O **Express** oferece exatamente essa camada enxuta sobre `node:http`. (A ementa menciona *"Express ou equivalente"* — bibliotecas como Fastify ou Hono seguem o mesmo modelo mental de rotas, `(req, res)` e *middlewares*, então o que você aprender aqui se transfere diretamente.)

### Leitura principal

Em [Routing — Express.js](https://expressjs.com/en/guide/routing/), leia a introdução, **Route methods**, **Route paths** (apenas **String paths**; pule **Regular expressions**), **Route parameters** (**Named parameters**; pule **Wildcards** e **Optional segments**), **Response methods** e **express.Router**.

Em [Writing middleware for use in Express apps — Express.js](https://expressjs.com/en/guide/writing-middleware/), leia a introdução e **Example** (**Middleware function `myLogger`**). Pule `requestTime`, `validateCookies` e **Configurable middleware**.

Em [Using middleware — Express.js](https://expressjs.com/en/guide/using-middleware/), leia a lista dos cinco tipos na introdução, **Application-level middleware** (até **Middleware mounted on a path**), **Error-handling middleware** e **Built-in middleware**. Pule **Router-level middleware** detalhado e **Third-party middleware**.

Em [Error Handling — Express.js](https://expressjs.com/en/guide/error-handling/), leia **Catching Errors** (**Errors in synchronous code** e **Errors in asynchronous code**) e **Writing error handlers**. Pule **Working with callback APIs**.

### Modelo mental: o pipeline de *middlewares*

Um ***middleware*** é uma função que recebe `(req, res, next)` e fica posicionada no caminho entre a chegada da requisição e o envio da resposta. Cada requisição percorre a cadeia **na ordem exata em que você registrou** os middlewares e rotas com `app.use(...)`, `app.get(...)`, `app.post(...)`:

```text
Requisição HTTP
      │
      ▼
[ 1. registrarRequisicao ] ──► anota método/URL/tempo ──► chama next()
      │
      ▼
[ 2. express.json() ]      ──► lê corpo JSON e preenche req.body ──► next()
      │                        (se o JSON estiver quebrado ──► chama next(erro)!)
      ▼
[ 3. Rota correspondente ] ──► ex.: GET /tarefas/:id ou POST /tarefas
      │                        ├── responde: res.status(200).json(...)  [FIM]
      │                        └── falha: throw / Promise rejeitada ──► next(erro)
      ▼ (se nenhuma rota casou)
[ 4. Middleware 404 ]      ──► res.status(404).json({ erro: "..." })    [FIM]
      │
      ▼ (quando qualquer etapa acima chamou next(erro) ou lançou exceção)
[ 5. Middleware de erro ]  ──► (err, req, res, next) => res.status(...).json(...) [FIM]
```

Quatro regras explicam quase todo bug inicial com Express:

1. **Cada etapa precisa responder OU passar adiante:** se um middleware não enviar resposta (`res.json(...)`, `res.send(...)`, `res.sendStatus(...)`) **e** esquecer de chamar `next()`, a requisição fica congelada esperando para sempre até o cliente desistir por *timeout*.
2. **A ordem de registro importa muito:**
   - `app.use(express.json())` precisa vir **antes** das rotas que lêem `req.body`; se vier depois, `req.body` chegará `undefined`.
   - O middleware de rota não encontrada (`404`) precisa vir **depois** de todas as rotas válidas.
   - O middleware de erro precisa ser o **último** registrado no `app`.
3. **O middleware de erro exige exatamente 4 parâmetros `(err, req, res, next)`:** o Express verifica a quantidade de parâmetros da função para saber que ela é um tratador de erros e não um middleware comum. Mesmo sem usar `next` lá dentro, você **precisa** declarar os quatro parâmetros (usando `_next` para sinalizar ao TypeScript/linter que é intencionalmente não utilizado).
4. **Erros assíncronos no Express 5:** no **Express 5** (versão atual), se uma rota `async` lançar exceção ou tiver uma Promise rejeitada (por exemplo, `readFile` falhou por permissão), o Express captura automaticamente e encaminha para o middleware de erro de 4 parâmetros. *(Em projetos legados com Express 4, você verá `try`/`catch` chamando `next(erro)` manualmente em cada handler `async`.)*

### De onde vêm os dados na requisição (`req.params`, `req.query`, `req.body`)

| Origem | Exemplo de requisição | Onde chega no Express | Cuidado essencial em TypeScript / runtime |
|---|---|---|---|
| **Parâmetro de rota** | `GET /tarefas/42` (rota `"/tarefas/:id"`) | `req.params.id` | Sempre chega como **texto** (`"42"`), nunca como `number`. Converta e valide antes de usar. |
| **Query string** | `GET /tarefas?concluida=false` | `req.query.concluida` | Sempre texto (ou array se repetida na URL). No Express 5, `req.query` é somente leitura. |
| **Corpo JSON** | `POST /tarefas` com `Content-Type: application/json` | `req.body` | Só é preenchido depois de `express.json()`. **Não é validado automaticamente** — trate como `unknown`! |

Quando a API passa a ter vários grupos de recursos (por exemplo `/tarefas` e `/usuarios`), o Express permite agrupar rotas em módulos separados com **`express.Router()`** e montá-los no `app` com `app.use("/tarefas", rotasTarefas)` — assim o arquivo principal continua enxuto e cada recurso cuida apenas dos seus caminhos relativos (`"/"`, `"/:id"`).

### O que o Express abstrai, custos e limitações

1. **O que ele abstrai:** casamento de rotas e parâmetros nomeados (`:id`), leitura de *stream* e `JSON.parse` do corpo (`express.json()`), definição de headers de resposta (`res.status(201).json(...)`), composição por `Router` e encaminhamento centralizado de erros.
2. **Custos que continuam existindo:**
   - **Express não substitui validação de entrada:** se um cliente mandar `POST /tarefas` com `{"titulo": 12345}` ou `{}` vazio, `express.json()` aceita sem reclamar porque o JSON é sintaticamente válido. A interface TypeScript não protege nada em runtime — você continua precisando validar na fronteira (faremos validação introdutória na etapa 5 e schemas completos com Zod + limites de requisição no **capítulo 30**).
   - **Limite de corpo padrão:** `express.json()` limita o corpo a `100kb` por padrão (configurável com `{ limit: "10kb" }` no capítulo 30) para evitar que um cliente envie centenas de megabytes e esgote a memória do servidor.
   - **Erro interno nunca deve vazar detalhes:** no middleware de erro, registre o erro completo no console/log do servidor (`console.error(err)`), mas responda ao cliente uma mensagem genérica em `500` — nunca devolva `err.stack` nem detalhes internos de caminhos/arquivos do servidor.

## 5. Configuração por ambiente e montagem de uma pequena API

### O problema: nunca fixar porta, caminhos de máquina ou segredos no código

Se você escreve `const PORTA = 3000` e `const ARQUIVO = "/Users/gabriel/dados.json"` diretamente no código-fonte, o servidor quebra na máquina de outra pessoa, conflita com outro serviço na porta `3000` ou exige alterar código apenas para trocar o endereço do banco entre desenvolvimento e produção. E pior: se algum dia você colocar uma senha ou chave de API no código e fizer `git commit`, esse segredo fica gravado no histórico do Git.

A solução padrão em backend é **configuração por variáveis de ambiente** (`process.env`). O código-fonte diz *quais* variáveis espera; o ambiente onde o processo roda fornece os *valores*.

### Leitura principal

Leia a página curta [How to read environment variables from Node.js — Node.js Learn](https://nodejs.org/learn/command-line/how-to-read-environment-variables-from-nodejs) por completo (passagem de variáveis no terminal, leitura via `process.env` e suporte nativo do Node a `.env` com `--env-file`).

### Modelo mental: quatro regras de ouro para configuração por ambiente

1. **Tudo em `process.env` chega como `string | undefined`:** exatamente como `req.params` e `req.query`, o sistema operacional só guarda texto. Nunca espalhe `Number(process.env.PORT)` por vários arquivos — leia, converta e valide tudo em um único módulo `src/config.ts` logo na partida.
2. **Falhar rápido (*fail fast*):** se alguém configurar `PORT=abc` ou `PORT=99999`, o servidor deve recusar iniciar imediatamente com uma mensagem clara em vez de subir em estado quebrado.
3. **`.env` nunca vai para o Git; `.env.example` vai:** em desenvolvimento local, guardamos as variáveis em um arquivo `.env` listado no `.gitignore` (capítulo 21). No repositório, versionamos um `.env.example` contendo apenas os nomes das variáveis e valores fictícios/seguros para qualquer pessoa saber o que configurar.
4. **Carregamento nativo sem dependência extra:** no Node moderno, `node --env-file-if-exists=.env src/server.ts` carrega `.env` automaticamente se o arquivo existir (e não falha em produção quando as variáveis já vêm direto do ambiente do servidor). *(Em projetos mais antigos você verá a biblioteca `dotenv` fazendo o mesmo papel.)*

### Montando uma pequena API completa e modular

Veja como todas as peças deste capítulo — TypeScript no Node, `node:fs/promises`, `node:path`, Express (rotas + *middlewares* + erros) e configuração por ambiente — se encaixam em um projeto pequeno e limpo:

```text
api-tarefas/
├── .env               # local — listado no .gitignore (nunca commitar)
├── .env.example       # versionado no Git como documentação
├── .gitignore         # inclui node_modules/, dados/ e .env
├── package.json       # "type": "module", dependências e scripts
├── tsconfig.json      # strict + noEmit para checagem com tsc
└── src/
    ├── config.ts      # lê e valida process.env (fail fast)
    ├── repositorio.ts # I/O assíncrono no arquivo JSON (etapa 2)
    ├── app.ts         # monta o Express, middlewares, rotas e erros
    └── server.ts      # ponto de entrada: carrega config e inicia listen
```

> **Por que separar `src/app.ts` de `src/server.ts`?** Quando `criarApp(config)` apenas devolve o objeto `app` sem chamar `app.listen(...)`, o módulo fica fácil de importar e testar sem abrir portas fixas de rede — o padrão exato que usaremos nos testes integrados do capítulo 33.

#### 1. Preparação do pacote (`package.json`, `tsconfig.json` e `.env.example`)

Dentro de uma pasta nova `api-tarefas/`:

```bash
npm init -y
npm install express
npm install -D typescript @types/node @types/express
```

Ajuste `package.json` para usar ES Modules (`"type": "module"`) e scripts reproduzíveis. As seções `dependencies` e `devDependencies` já foram preenchidas pelo `npm install` com as versões atuais (Express 5 e TypeScript mais recente); não precisa editá-las à mão:

```json
{
  "name": "api-tarefas",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node --watch --env-file-if-exists=.env src/server.ts",
    "start": "node --env-file-if-exists=.env src/server.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

Crie `tsconfig.json` alinhado ao *type stripping* nativo do Node (com checagem estrita via `npm run typecheck`):

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Crie `.env.example` (e copie para `.env` localmente, lembrando de incluir `.env`, `node_modules/` e `dados/` no `.gitignore`):

```dotenv
PORT=3000
HOST=127.0.0.1
DATA_FILE=./dados/tarefas.json
APP_NAME=API de Tarefas (local)
```

#### 2. Configuração validada na partida (`src/config.ts`)

```ts
// src/config.ts
import path from "node:path";

export interface AppConfig {
  readonly port: number;
  readonly host: string;
  readonly dataFile: string;
  readonly appName: string;
}

function lerPorta(valor: string | undefined, padrao: number): number {
  if (valor === undefined || valor.trim() === "") {
    return padrao;
  }

  if (!/^\d+$/.test(valor.trim())) {
    throw new Error(`PORT inválida: "${valor}". Informe um inteiro entre 1 e 65535.`);
  }

  const porta = Number(valor.trim());
  if (porta < 1 || porta > 65535) {
    throw new Error(`PORT fora da faixa válida (1–65535): ${porta}.`);
  }

  return porta;
}

export function carregarConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = lerPorta(env.PORT, 3000);
  const host = env.HOST?.trim() || "127.0.0.1";
  const dataFileBruto = env.DATA_FILE?.trim() || "./dados/tarefas.json";
  const appName = env.APP_NAME?.trim() || "API de Tarefas";

  return {
    port,
    host,
    // Resolve o caminho uma única vez na partida. Um valor relativo é resolvido
    // a partir de process.cwd(): como `npm run` sempre executa na raiz do
    // projeto, "./dados/tarefas.json" aponta para api-tarefas/dados/.
    dataFile: path.resolve(dataFileBruto),
    appName,
  };
}
```

#### 3. Aplicação Express, *middlewares* e rotas (`src/app.ts`)

Reaproveite o arquivo `src/repositorio.ts` da etapa 2 e crie `src/app.ts` conectando o pipeline completo:

```ts
// src/app.ts
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type { AppConfig } from "./config.ts";
import { carregarTarefas, salvarTarefas, type Tarefa } from "./repositorio.ts";

function registrarRequisicao(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const inicio = Date.now();

  res.on("finish", () => {
    const duracaoMs = Date.now() - inicio;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duracaoMs}ms)`);
  });

  next();
}

function extrairTituloValido(corpo: unknown): string | null {
  if (typeof corpo !== "object" || corpo === null || !("titulo" in corpo)) {
    return null;
  }
  if (typeof corpo.titulo !== "string") {
    return null;
  }
  const limpo = corpo.titulo.trim();
  return limpo.length >= 3 ? limpo : null;
}

function ehErroDeJsonInvalido(erro: unknown): boolean {
  return (
    erro instanceof SyntaxError &&
    "status" in erro &&
    erro.status === 400
  );
}

export function criarApp(config: AppConfig): Express {
  const app = express();

  // 1. Middlewares globais (rodam antes das rotas)
  app.use(registrarRequisicao);
  app.use(express.json());

  // 2. Rota de verificação de saúde (healthcheck)
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, servico: config.appName });
  });

  // 3. Rotas do recurso /tarefas organizadas com Router
  const rotasTarefas = express.Router();

  rotasTarefas.get("/", async (req: Request, res: Response) => {
    const tarefas = await carregarTarefas(config.dataFile);
    const filtro = req.query.concluida;

    if (filtro === undefined) {
      res.json(tarefas);
      return;
    }

    if (filtro !== "true" && filtro !== "false") {
      res.status(400).json({
        erro: "O parâmetro de query 'concluida' deve ser 'true' ou 'false'.",
      });
      return;
    }

    const esperado = filtro === "true";
    res.json(tarefas.filter((tarefa) => tarefa.concluida === esperado));
  });

  rotasTarefas.get("/:id", async (req: Request, res: Response) => {
    const idParam = req.params.id;
    if (typeof idParam !== "string" || !/^\d+$/.test(idParam)) {
      res.status(400).json({ erro: "O parâmetro 'id' deve ser um inteiro positivo." });
      return;
    }

    const id = Number(idParam);
    const tarefas = await carregarTarefas(config.dataFile);
    const encontrada = tarefas.find((tarefa) => tarefa.id === id);

    if (!encontrada) {
      res.status(404).json({ erro: `Tarefa ${id} não encontrada.` });
      return;
    }

    res.json(encontrada);
  });

  rotasTarefas.post("/", async (req: Request, res: Response) => {
    // Fronteira externa: tratamos req.body como unknown antes de confiar nos campos
    const corpo: unknown = req.body;
    const titulo = extrairTituloValido(corpo);

    if (titulo === null) {
      res.status(400).json({
        erro: "Informe um campo 'titulo' (texto com pelo menos 3 caracteres).",
      });
      return;
    }

    const tarefas = await carregarTarefas(config.dataFile);
    const proximoId =
      tarefas.reduce((maior, tarefa) => Math.max(maior, tarefa.id), 0) + 1;

    const novaTarefa: Tarefa = {
      id: proximoId,
      titulo,
      concluida: false,
    };

    await salvarTarefas(config.dataFile, [...tarefas, novaTarefa]);
    res.status(201).json(novaTarefa);
  });

  app.use("/tarefas", rotasTarefas);

  // 4. Fallback 404 (depois de todas as rotas válidas)
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      erro: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
    });
  });

  // 5. Middleware de erro centralizado (sempre o último, com 4 parâmetros)
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (ehErroDeJsonInvalido(err)) {
      res.status(400).json({ erro: "Corpo JSON malformado." });
      return;
    }

    console.error("Erro inesperado no servidor:", err);
    res.status(500).json({ erro: "Erro interno do servidor." });
  });

  return app;
}
```

#### 4. Ponto de entrada (`src/server.ts`)

```ts
// src/server.ts
import { criarApp } from "./app.ts";
import { carregarConfig } from "./config.ts";

const config = carregarConfig();
const app = criarApp(config);

app.listen(config.port, config.host, () => {
  console.log(`${config.appName} rodando em http://${config.host}:${config.port}`);
});
```

### Limites conscientes desta primeira API (a ponte para os próximos capítulos)

Você já tem uma API HTTP real, modular, tipada e configurável por ambiente. Ao mesmo tempo, reconheça exatamente o que **ainda falta** — porque cada limite abaixo é o tema central dos próximos capítulos do Bloco 4:

- **Validação manual simples e CRUD incompleto:** `extrairTituloValido` funciona para um único campo, mas não escala para contratos maiores, e ainda faltam atualização (`PATCH`/`PUT`), remoção (`DELETE`), formato padronizado de erros e limites mais rígidos de corpo/frequência → **capítulo 30**.
- **Persistência em arquivo JSON:** continua sujeita a *race conditions* sob requisições simultâneas e reescreve o arquivo inteiro a cada gravação → substituída por SQL e banco relacional nos **capítulos 31 e 32**.
- **Testes automatizados do serviço e ligação com o frontend:** ainda testamos manualmente via terminal, e um frontend React rodando em outra porta (como `http://localhost:5173`) precisará de configuração de **CORS** e controle de acesso para conversar com segurança com a API → **capítulos 33 e 34**.

**Experimente:** suba o servidor com `npm run dev` (e valide os tipos com `npm run typecheck`). Em outro terminal, teste o fluxo inteiro — inclusive uma mudança de porta por variável de ambiente sem editar o código (`PORT=4000 npm run dev`):

```bash
# 1. Conferir saúde e configuração por ambiente
curl -i http://127.0.0.1:3000/health

# 2. Criar uma tarefa válida (esperado: 201 Created)
curl -i -X POST http://127.0.0.1:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Construir primeira API em Node"}'

# 3. Listar e filtrar via query string (esperado: 200 OK)
curl -i "http://127.0.0.1:3000/tarefas?concluida=false"

# 4. Consultar por ID existente, inexistente e inválido (200, 404 e 400)
curl -i http://127.0.0.1:3000/tarefas/1
curl -i http://127.0.0.1:3000/tarefas/999
curl -i http://127.0.0.1:3000/tarefas/abc

# 5. Enviar JSON quebrado e confirmar que o middleware de erro devolve 400 em JSON
curl -i -X POST http://127.0.0.1:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "sem fechar}'
```

Olhe também o terminal onde o servidor está rodando e observe o log gerado pelo middleware `registrarRequisicao` para cada chamada.

## Ao terminar

Antes de avançar para o capítulo 30, confira se você consegue explicar:

- quais são as diferenças práticas entre executar JavaScript/TypeScript no navegador e no Node.js (ausência de DOM, acesso a arquivos/rede/`process.env`, prefixo `node:`, tempo de vida do processo), e por que executar `.ts` direto no Node via *type stripping* não dispensa `tsc --noEmit`;
- por que servidores Node devem usar I/O assíncrono (`node:fs/promises`) em vez de funções `*Sync`, como `node:path` e `import.meta.dirname` evitam caminhos quebrados entre sistemas operacionais e pastas de execução, como tratar `ENOENT` sem mascarar outros erros, e por que um arquivo JSON não substitui um banco de dados;
- como um servidor mínimo com `node:http` escuta em um host e uma porta (`127.0.0.1:3000`), recebe `(req, res)` e envia respostas JSON — e quais tarefas repetitivas motivam o uso de um framework como o Express;
- como funciona o pipeline de *middlewares* no Express (importância da ordem de registro, obrigatoriedade de responder ou chamar `next()`, papel de `express.json()`, organização com `express.Router()`, por que o middleware de erro precisa de 4 parâmetros e por que `req.params`, `req.query` e `req.body` continuam sendo entradas externas não confiáveis);
- como configurar uma API via variáveis de ambiente (`process.env`, `--env-file-if-exists=.env`), por que validar a configuração na inicialização (*fail fast*), por que `.env` fica no `.gitignore` enquanto `.env.example` é versionado, e por que separar a criação do `app` (`app.ts`) da abertura da porta (`server.ts`).
