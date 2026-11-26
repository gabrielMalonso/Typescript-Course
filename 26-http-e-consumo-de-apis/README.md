# Capítulo 26 — HTTP e consumo de APIs

**Objetivo:** compreender como cliente e servidor trocam dados pela web usando HTTP e HTTPS (URLs, métodos, códigos de status e headers), trabalhar com JSON como formato de troca, fazer requisições reais com `fetch` verificando o status da resposta e validar dados externos recebidos como `unknown` com narrowing introdutório em TypeScript. Ao final, você conseguirá substituir dados simulados por chamadas HTTP reais tratando falhas de rede, erros HTTP e respostas inesperadas sem confiar cegamente em tipos.

No capítulo 25, você aprendeu a esperar operações que levam tempo com `Promise`, `async`/`await` e `try`/`catch`/`finally` — mas toda a simulação ainda acontecia dentro da memória do seu próprio programa com `setTimeout`. Em aplicações reais, os dados vivem em outro programa (um servidor) rodando em outra máquina. Para conversar com esse servidor, precisamos de um protocolo comum (**HTTP**), de um formato neutro de texto (**JSON**) e de uma forma segura de validar o que chega de fora.

**Percurso:** URL, HTTP (métodos, status, headers) e HTTPS básico → JSON: estrutura, restrições e conversão → `fetch` e verificação real da resposta (`response.ok`, `status`, `GET` e `POST`) → fronteira de confiança: receber dados externos como `unknown` e validar em runtime → ponte com a interface em React usando `fetch` real sob clique. Em cada etapa, leia o recorte oficial indicado e use a explicação para conectá-lo ao TypeScript que você já domina.

**Escopo:** focamos no consumo de APIs HTTP a partir do cliente (TypeScript no Node ou no navegador/React). Carregamento automático ao abrir a tela com `useEffect`, cancelamento (`AbortController`) e respostas fora de ordem ficam no capítulo 27; testes de interface com falha de API, no 28; construção do próprio servidor HTTP em Node, no 29; validação de contratos no servidor e bibliotecas de schema, no 30; CORS em detalhe, cookies e autenticação, no 34; narrowing completo e *type predicates*, nos capítulos 47 e 48; padrão `Result`, no 64; e mecanismos profundos de redes, DNS e TLS, nos capítulos 78–80.

## 1. HTTP, URL, métodos, status, headers e HTTPS básico

### O problema: como dois programas em máquinas diferentes conversam

Quando você chama uma função TypeScript no mesmo projeto, o compilador conhece o nome da função, os argumentos e o tipo de retorno. Quando o seu frontend pede dados a uma API na internet, não existe memória compartilhada: o navegador e o servidor são processos separados, muitas vezes escritos em linguagens diferentes.

Para que qualquer cliente converse com qualquer servidor na web, existe o **HTTP** (*Hypertext Transfer Protocol*). Ele organiza a comunicação em pares de mensagens: o cliente envia uma **requisição** (*request*) dizendo **onde** quer chegar (URL), **o que** quer fazer (método) e **metadados** extras (headers); o servidor processa e devolve uma **resposta** (*response*) com um **código de status**, **headers** e, quando aplicável, um **corpo** com os dados.

### Leitura principal

Em [What is a URL? — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#basics_anatomy_of_a_url), leia **Basics: anatomy of a URL**, **Scheme**, **Authority**, **Path to resource**, **Parameters** e **Anchor**. Pule **How to use URLs** em diante.

Em [An overview of HTTP — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview#components_of_http-based_systems), leia **Components of HTTP-based systems** (apenas **Client: the user-agent** e **The Web server**; pule **Proxies**), **Basic aspects of HTTP** (**HTTP is simple**, **HTTP is extensible** e **HTTP is stateless, but not sessionless**; pule **HTTP and connections**) e **HTTP Messages** (**Requests** e **Responses**). Pule **What can be controlled by HTTP**, **HTTP flow** e **APIs based on HTTP**.

Em [HTTP request methods — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), leia a introdução e apenas as definições curtas de **`GET`**, **`POST`**, **`PUT`**, **`PATCH`** e **`DELETE`**. Pule os demais métodos e a seção **Safe, idempotent, and cacheable request methods** por enquanto.

Em [HTTP response status codes — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#successful_responses), consulte como mapa de referência as faixas **Successful responses** (`200`, `201`, `204`), **Redirection messages** (`301`, `302`), **Client error responses** (`400`, `401`, `403`, `404`) e **Server error responses** (`500`, `503`). Não tente decorar a lista inteira.

Em [HTTP headers — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers), leia apenas a introdução (até os quatro grupos de headers — *Request*, *Response*, *Representation* e *Payload*). Pule o catálogo completo abaixo.

Por fim, leia o verbete curto [HTTPS — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS) (um parágrafo).

### Modelo mental: anatomia de uma URL, da troca HTTP e o papel do HTTPS

Veja como as peças de uma URL e de uma troca HTTP se encaixam:

```text
https://api.exemplo.com/sessoes?tema=poesia&limite=5#lista
└─┬──┘  └──────┬──────┘└──┬───┘└─────────┬─────────┘└─┬──┘
scheme     autoridade   caminho    query string    fragmento
(protocolo) (domínio)   (recurso)  (parâmetros)  (só no cliente)

CLIENTE (navegador / Node)                     SERVIDOR (API)
  │                                                  │
  ├── GET /sessoes?tema=poesia&limite=5 HTTP/1.1 ───►│
  │   Accept: application/json                       │ processa a consulta
  │                                                  │
  │◄── HTTP/1.1 200 OK ──────────────────────────────┤
  │    Content-Type: application/json                │
  │    [{"id": 1, "tema": "Poesia contemporânea"}]   │
```

Note que o **fragmento** (`#lista`) serve para o navegador rolar até um trecho da página — ele **não** é enviado ao servidor na requisição HTTP.

Guarde este resumo prático das três peças que você lerá em toda API:

| Peça | Exemplos essenciais | O que comunica |
|---|---|---|
| **Métodos** | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | `GET` busca dados (sem corpo); `POST` envia dados para criar algo; `PUT` substitui um recurso; `PATCH` atualiza parte dele; `DELETE` remove. |
| **Status** | `2xx`, `3xx`, `4xx`, `5xx` | `2xx` deu certo (`200 OK`, `201 Created`, `204 No Content`); `3xx` redirecionamento; `4xx` problema no pedido do cliente (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`); `5xx` erro no servidor (`500`, `503`). |
| **Headers** | `Accept`, `Content-Type`, `Authorization` | Metadados em pares `Nome: valor`. `Content-Type: application/json` avisa o formato do corpo enviado ou devolvido; `Accept` indica o formato que o cliente espera receber; `Authorization` carrega credenciais quando a API exige. |

Sobre **HTTPS básico**: HTTP comum trafega texto legível por qualquer equipamento intermediário na rede. **HTTPS** roda o mesmo HTTP dentro de um canal criptografado com **TLS**, garantindo confidencialidade (ninguém no meio lê o conteúdo), integridade (ninguém altera a resposta no caminho) e verificação da identidade do servidor. Atenção ao limite: HTTPS protege o **transporte**, mas **não** substitui autenticação nem controle de acesso na aplicação — um site com cadeado HTTPS ainda precisa verificar quem pode ler ou alterar cada recurso (assunto do capítulo 34; detalhes de DNS e TLS entram no capítulo 79).

### Construindo URLs com segurança em TypeScript (`URL` e `URLSearchParams`)

Quando uma URL recebe filtros digitados por alguém, concatenar strings na mão (`base + "?tema=" + busca`) quebra facilmente se a pessoa digitar espaços, acentos ou o símbolo `&` (que separaria outro parâmetro por acidente).

O JavaScript oferece as classes prontas `URL` e `URLSearchParams`. Este exemplo puro de TypeScript pode ser executado no **TypeScript Pad** do leitor ou no Node:

```ts
function montarUrlDeBusca(
  base: string,
  caminho: string,
  tema: string,
  limite: number,
): string {
  const url = new URL(caminho, base);
  url.searchParams.set("tema", tema.trim());
  url.searchParams.set("limite", String(limite));
  return url.toString();
}

const endereco = montarUrlDeBusca(
  "https://api.exemplo.com",
  "/sessoes",
  "poesia & crônicas",
  5,
);

console.log(endereco);
// https://api.exemplo.com/sessoes?tema=poesia+%26+cr%C3%B4nicas&limite=5
```

Observe o que `URL` e `URLSearchParams` fazem por você:

1. **Conceito que representam:** modelam a estrutura da URL (esquema, autoridade, caminho e parâmetros de consulta) em vez de tratá-la como texto solto.
2. **O que abstraem:** juntam barras corretamente entre `base` e `caminho`, aplicam codificação de URL (*percent-encoding*) automaticamente em espaços, acentos e `&`, e garantem que todos os valores sejam convertidos em texto válido para a query string.
3. **Custos e limitações:** `new URL(...)` valida a sintaxe e **lança `TypeError`** se `base` não for uma URL válida (por exemplo, sem `https://`). Além disso, parâmetros de query sempre viajam como **texto** — por isso `limite` precisou de `String(limite)`.

**Experimente:** no exemplo acima, chame `montarUrlDeBusca` passando `"api.exemplo.com"` (sem `https://`) dentro de um `try`/`catch` e veja o `TypeError` ser lançado. Depois restaure `https://` e teste outros caracteres especiais em `tema` (como `"?"` ou `"#"`).

## 2. JSON: o formato de troca entre cliente e servidor

### O problema: enviar estruturas de dados como texto pela rede

Uma resposta HTTP transporta uma sequência de bytes — no caso de APIs web, quase sempre texto. Não é possível "enviar um objeto TypeScript" diretamente pela rede, porque objetos com referências, métodos e tipos só existem dentro da memória de um runtime específico.

**JSON** (*JavaScript Object Notation*) resolve isso oferecendo um formato textual simples, padronizado e independente de linguagem. Ele parece com literais de objeto e array do JavaScript, mas tem regras mais rígidas para evitar ambiguidades.

### Leitura principal

Em [Working with JSON — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON#no_really_what_is_json), leia **No, really, what is JSON?** (**JSON structure**, **Arrays as JSON** e **JSON syntax restrictions**). Depois pule **Working through a JSON example** e leia [**Converting between objects and text**](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON#converting_between_objects_and_text).

### O que cabe em JSON — e o que muda na ida e na volta

Antes de enviar ou ler JSON, conheça as diferenças que mais geram bugs silenciosos:

| Em JavaScript / TypeScript | Em JSON válido | O que acontece no `JSON.stringify` / `JSON.parse` |
|---|---|---|
| `{ tema: 'Poesia', }` | `{"tema": "Poesia"}` | Chaves e strings exigem **aspas duplas**; vírgula sobrando e comentários não existem em JSON. |
| `string`, `number` finito, `boolean`, `null`, array, objeto | Mesmos tipos | Preservados na ida e na volta. |
| Propriedade com `undefined` ou função | Não existe | **Removida** silenciosamente em objetos (em arrays, `undefined` vira `null`). |
| `NaN`, `Infinity` | Não existe | Viram `null`. |
| Objeto `Date` | Não existe | Vira **string** ISO (ex.: `"2026-11-26T12:00:00.000Z"`). No `JSON.parse`, volta como `string`, **não** como `Date`. |

Rode este exemplo no **TypeScript Pad** ou no Node para ver a serialização (`JSON.stringify`) e a desserialização (`JSON.parse`) na prática:

```ts
interface NovaSessao {
  readonly tema: string;
  readonly vagas: number;
  readonly observacao?: string;
  readonly criadaEm: Date;
}

const rascunho: NovaSessao = {
  tema: "Crônicas urbanas",
  vagas: 15,
  observacao: undefined,
  criadaEm: new Date("2026-11-26T14:00:00.000Z"),
};

// Objeto -> texto JSON (serialização)
const textoJson = JSON.stringify(rascunho);
console.log("Serializado:", textoJson);
// Repare: "observacao" sumiu e "criadaEm" virou string!

// Texto JSON -> valor JavaScript (desserialização segura com try/catch e unknown)
function interpretarJson(texto: string): unknown {
  return JSON.parse(texto);
}

try {
  const valorRecebido: unknown = interpretarJson(textoJson);
  console.log("Desserializado:", valorRecebido);
} catch (erro: unknown) {
  const mensagem = erro instanceof Error ? erro.message : "JSON inválido.";
  console.error("Falha ao ler JSON:", mensagem);
}
```

Conecte o exemplo ao que você precisa saber sobre as abstrações `JSON.stringify` e `JSON.parse`:

1. **O que abstraem:** `JSON.stringify` percorre a árvore de objetos/arrays e gera o texto JSON escapando aspas e quebras de linha; `JSON.parse` analisa o texto segundo a gramática do JSON e reconstrói objetos, arrays e primitivos em memória.
2. **Por que anotar `unknown` no retorno de `JSON.parse`:** na biblioteca padrão do TypeScript, `JSON.parse` tem tipo de retorno `any` (por razões históricas). Envolver ou atribuir o resultado imediatamente a `unknown` obriga o código seguinte a verificar o formato antes de usar os dados — exatamente o que faremos na etapa 4.
3. **Custos e limitações:**
   - **Operação síncrona em O(n):** o tempo e a memória crescem proporcionalmente ao tamanho do texto e da estrutura. Converter JSONs de vários megabytes bloqueia a linha principal de execução.
   - **Falha em texto malformado:** `JSON.parse` lança **`SyntaxError`** se o texto não for JSON válido — algo muito comum quando um servidor quebrado devolve uma página HTML de erro (`<html>502 Bad Gateway</html>`) em vez de JSON.
   - **Referências circulares:** `JSON.stringify` lança `TypeError` se um objeto apontar direta ou indiretamente para si mesmo.

**Experimente:** passe `"{ tema: 'sem aspas duplas' }"` para `interpretarJson` dentro do `try`/`catch` acima e confirme que o `catch` captura um `SyntaxError`.

## 3. Fazendo requisições com `fetch` e verificando a resposta

### O problema: cruzar a rede sem presumir que toda resposta deu certo

Agora temos todas as peças do lado teórico: HTTP, URLs, métodos, status, headers, JSON e Promises com `async`/`await` (capítulo 25). A função padrão do navegador — e também disponível nativamente no Node moderno (versão 18 em diante) — para disparar requisições HTTP é **`fetch()`**.

Ela parece simples à primeira vista, mas tem dois comportamentos que costumam pegar iniciantes de surpresa: a leitura acontece em **duas etapas assíncronas** e respostas de erro HTTP (`404`, `500`) **não rejeitam a Promise**.

### Leitura principal

Em [Using the Fetch API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#making_a_request), leia a introdução, **Making a request** (**Setting the method**, **Setting a body**, **Setting headers** e **Sending data in a GET request**) e depois avance para [**Handling the response**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#handling_the_response) (**Checking response status**, **Checking headers** e **Reading the response body**).

Pule **Making cross-origin requests**, **Including credentials**, **Creating a `Request` object**, **Canceling a request** (estudaremos cancelamento no capítulo 27 e CORS/credenciais no capítulo 34) e todas as seções sobre *streams* (**Streaming the response body** em diante).

### O ciclo de duas etapas e a armadilha do `response.ok`

Acompanhe o caminho completo de uma chamada `fetch`:

```text
const response = await fetch(url, opcoes)          ← 1º await (espera status + headers)
  │
  ├── Falha de rede / sem internet / DNS inválido ──► Promise REJEITA (vai para o catch)
  │
  └── Servidor respondeu (200, 404, 500...) ────────► Promise CUMPRE com objeto Response
        │
        ├── response.ok === false (fora de 200–299)
        │     ├── ex.: 404 em busca por ID ─────────► ausência esperada (retornar null)
        │     └── ex.: 500 ou erro inesperado ──────► lançar Error (vai para o catch)
        │
        └── response.ok === true (status 200–299)
              └── const dados: unknown = await response.json()  ← 2º await (baixa e faz parse do corpo)
```

> **Onde testar exemplos com `fetch`:** o TypeScript Pad do leitor bloqueia acesso à rede por segurança. Para executar exemplos que acessam URLs reais, rode-os localmente com Node (em um arquivo `.ts` ou via `npx tsx`) ou no seu projeto Vite/React.

Veja um exemplo completo com `GET` (tratando `404` como ausência válida e demais erros HTTP como falha técnica) e `POST` (enviando JSON com `Content-Type`):

```ts
const API_BASE = "https://jsonplaceholder.typicode.com";

async function buscarTarefaBrutaPorId(id: number): Promise<unknown | null> {
  const url = new URL(`/todos/${id}`, API_BASE);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  // 404 aqui representa um resultado válido: o item não existe (como no cap. 25)
  if (response.status === 404) {
    return null;
  }

  // Qualquer outro status fora de 200–299 é tratado como falha HTTP
  if (!response.ok) {
    throw new Error(`Falha na API (HTTP ${response.status}).`);
  }

  const dados: unknown = await response.json();
  return dados;
}

async function criarTarefaBruta(titulo: string): Promise<unknown> {
  const url = new URL("/todos", API_BASE);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title: titulo,
      completed: false,
      userId: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`Não foi possível criar tarefa (HTTP ${response.status}).`);
  }

  const criada: unknown = await response.json();
  return criada;
}

async function testarRequisicoes(): Promise<void> {
  try {
    console.log("GET /todos/1:", await buscarTarefaBrutaPorId(1));
    console.log("GET /todos/99999:", await buscarTarefaBrutaPorId(99999));
    console.log("POST /todos:", await criarTarefaBruta("Revisar capítulo 26"));
  } catch (erro: unknown) {
    const mensagem = erro instanceof Error ? erro.message : "Erro de rede.";
    console.error("Erro:", mensagem);
  }
}

testarRequisicoes();
```

Observe os quatro pontos essenciais — incluindo o que `fetch` abstrai e seus limites:

1. **Por que existem dois `await`:** `await fetch(...)` conclui assim que os headers e o status chegam, permitindo decidir **antes** de baixar o corpo inteiro se vale a pena lê-lo. Só depois chamamos `await response.json()` (ou `response.text()` quando a resposta não for JSON).
2. **`response.ok` não é opcional:** como `fetch` cumpre a Promise mesmo em `404` ou `500`, omitir `if (!response.ok)` faz o programa tentar ler um corpo de erro como se fosse dado válido. No `GET` por ID acima, separamos `404` como ausência esperada (`null`) e tratamos outros erros (`500`, `503`, `403`) como falha técnica — aplicando diretamente a tabela do capítulo 25.
3. **`POST` precisa de `method`, `headers` e `body` em string:** sem `method: "POST"`, `fetch` usa `GET` por padrão. Sem `"Content-Type": "application/json"`, muitos servidores não sabem que o corpo está em JSON. E `body` recebe texto (`JSON.stringify(...)`), nunca o objeto direto.
4. **O que `fetch` abstrai, custos e limitações:**
   - Abstrai conexões de rede, montagem da mensagem HTTP, redirecionamentos padrão e decodificação do corpo.
   - **O corpo só pode ser lido uma única vez:** chamar `await response.json()` duas vezes na mesma `Response` falha porque o fluxo de bytes já foi consumido.
   - **Custo de rede:** diferente de ler um array em memória (nanossegundos), uma chamada HTTP leva dezenas ou centenas de milissegundos e pode falhar a qualquer momento. Além disso, `fetch` não impõe um limite de tempo (*timeout*) curto por padrão (cancelamento entra no capítulo 27).
   - **Restrição do navegador (CORS):** no navegador, o próprio browser pode bloquear a leitura de respostas vindas de outro domínio caso o servidor não envie headers autorizando a origem (veremos CORS em detalhe no capítulo 34).

**Experimente:** rode o exemplo acima no Node e confira que `GET /todos/99999` devolve `null` (sem cair no `catch`). Depois, altere temporariamente `API_BASE` para `"https://endereco-inexistente.invalid"` e observe a diferença: agora a Promise do `fetch` rejeita por falha de rede e entra no `catch`.

## 4. Fronteira de confiança: validar dados externos como `unknown`

### O problema: tipos TypeScript desaparecem em tempo de execução

No exemplo da etapa 3, `buscarTarefaBrutaPorId` retornou `Promise<unknown | null>`. Por que não simplesmente escrever o seguinte?

```ts
// NÃO faça isso com dados externos!
const tarefa = (await response.json()) as TarefaRemota;
```

Há dois motivos críticos:

1. **Na biblioteca padrão do TypeScript, `response.json()` devolve `Promise<any>`.** Como `any` desliga a checagem de tipos, tanto `as TarefaRemota` quanto `const tarefa: TarefaRemota = await response.json()` compilam sem aviso — mas **nenhuma verificação acontece de verdade**. (Em projetos Node que usam apenas os tipos de `@types/node`, sem a biblioteca do navegador, `response.json()` já aparece como `Promise<unknown>`; mesmo assim, um `as TarefaRemota` continua compilando sem verificar nada.)
2. **Os tipos somem depois da compilação.** Quando o TypeScript vira JavaScript para rodar no navegador, todas as `interface` e `type` deixam de existir. Se a API mudar o nome de um campo (`title` virar `name`), devolver `null` em vez de `string`, ou retornar um objeto `{ error: "rate limit" }` com status `200`, o código continua rodando com o valor errado até quebrar em outro ponto da interface (como `tarefa.title.toUpperCase()` lançando `TypeError`).

Por isso, tratamos toda entrada externa (API, arquivo, `localStorage`, formulário) como uma **fronteira de confiança**: os dados entram como **`unknown`** e só ganham um tipo confiável do nosso domínio depois de passar por validação real em runtime.

### Leitura principal

No [TypeScript Handbook — `unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown), leia apenas a subseção **`unknown`** (repare justamente no exemplo de `safeParse` envolvendo `JSON.parse`). Pare antes de **`never`**.

No [TypeScript Handbook — The `in` operator narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing), leia os parágrafos iniciais até o primeiro exemplo de `"swim" in animal` para ver como o operador `in` verifica em runtime se uma propriedade existe em um objeto. (O estudo completo de narrowing e *type predicates* fica nos capítulos 47 e 48.)

### Modelo mental e validação introdutória em TypeScript (sem casts)

A ideia é simples: isolar a desconfiança na entrada do programa.

```text
API (JSON) ─► response.json() ─► bruto: unknown
                                      │
                           [ função de validação ]
                     typeof / !== null / in / Array.isArray
                                      │
                      ┌───────────────┴───────────────┐
                      ▼                               ▼
               formato inválido                Tarefa válida
             (retorna null / erro)      (o resto do app confia no tipo)
```

Rode este exemplo no **TypeScript Pad** ou no Node. Ele valida dados vindos como `unknown` usando apenas recursos que você já conhece (`typeof`, `!== null`, `Array.isArray`) mais o operador `in` — **sem nenhum `as` e sem `any`**:

```ts
interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

function validarTarefa(valor: unknown): Tarefa | null {
  // 1. Precisa ser um objeto não-nulo (em JS, typeof null === "object")
  if (typeof valor !== "object" || valor === null) {
    return null;
  }

  // 2. Confere se as propriedades esperadas existem no objeto
  if (!("id" in valor) || !("title" in valor) || !("completed" in valor)) {
    return null;
  }

  // 3. Agora TypeScript conhece valor.id, valor.title e valor.completed como unknown.
  //    Validamos o tipo real de cada campo em runtime:
  if (
    typeof valor.id !== "number" ||
    !Number.isFinite(valor.id) ||
    typeof valor.title !== "string" ||
    typeof valor.completed !== "boolean"
  ) {
    return null;
  }

  // 4. Devolvemos um objeto limpo no contrato do nosso domínio
  return {
    id: valor.id,
    titulo: valor.title,
    concluida: valor.completed,
  };
}

function validarListaDeTarefas(valor: unknown): readonly Tarefa[] | null {
  if (!Array.isArray(valor)) {
    return null;
  }

  const tarefas: Tarefa[] = [];

  for (const item of valor) {
    const tarefa = validarTarefa(item);
    if (tarefa === null) {
      return null;
    }
    tarefas.push(tarefa);
  }

  return tarefas;
}

// Testando três respostas simuladas vindas de JSON.parse
const respostas: readonly string[] = [
  '[{"userId":1,"id":1,"title":"Estudar HTTP","completed":false}]',
  '{"mensagem":"API em manutenção"}',
  '[{"id":"1","title":"ID como string quebra o contrato","completed":false}]',
];

for (const texto of respostas) {
  const bruto: unknown = JSON.parse(texto);
  const resultado = validarListaDeTarefas(bruto);
  console.log(resultado === null ? "Contrato inválido" : resultado);
}
```

Observe como essa pequena função resolve quatro problemas de uma vez:

1. **Estreitamento progressivo sem `as`:** primeiro descartamos primitivos e `null` (`typeof valor !== "object" || valor === null`). Em seguida, `"id" in valor` prova ao TypeScript (e verifica em runtime) que a chave existe, liberando `valor.id` com tipo `unknown`. Por fim, `typeof valor.id === "number"` estreita para `number`.
2. **Atenção à armadilha `typeof null === "object"`:** em JavaScript, `typeof null` devolve `"object"` por um bug histórico da linguagem. Além disso, `typeof []` também é `"object"`, mas um array não terá `"id" in valor` (e sempre podemos testar `Array.isArray` quando queremos diferenciar listas de objetos).
3. **Adaptação na fronteira:** a API externa manda campos em inglês (`title`, `completed`) e um campo extra que não usamos (`userId`). Ao construir o novo objeto `{ id, titulo, concluida }`, mantemos o restante da aplicação protegido das convenções e sobras da API externa.
4. **Custos e limitações:**
   - Validar cada item percorre os dados em **O(n)** (proporcional ao total de registros e campos), um custo muito menor que a espera de rede.
   - Escrever validadores manuais funciona muito bem para contratos pequenos, mas fica verboso quando uma API tem dezenas de campos aninhados. A partir do **capítulo 30**, conheceremos bibliotecas de validação por schema (como Zod) que automatizam essa mesma checagem em runtime — e no **capítulo 48** veremos *type predicates* (`valor is Tipo`) para criar guardas reutilizáveis.

**Experimente:** no array `respostas` acima, adicione um quarto JSON válido com dois itens e um quinto JSON onde `title` foi trocado por `null`. Execute e confirme que apenas as listas 100% aderentes ao contrato passam pela fronteira.

## 5. Ponte com a interface: substituindo a simulação por `fetch` real em React

### O problema: conectar rede, status HTTP e validação ao estado da tela

No final do capítulo 25, o componente `App` tinha um botão que chamava uma função simulada com `setTimeout` e atualizava uma union discriminada (`ocioso`, `carregando`, `sucesso`, `erro`). Agora vamos trocar **apenas a fonte dos dados**: no lugar do `setTimeout`, usaremos `fetch` real contra uma API pública de testes (`JSONPlaceholder`), com construção segura de URL, verificação de `response.ok` e validação de `unknown` na fronteira.

### Exemplo completo em React + TypeScript

Para testar no seu laboratório Vite (`react-ts`), substitua `src/App.tsx` pelo código abaixo e abra também a aba **Network** (Rede) do DevTools do navegador antes de clicar no botão:

```tsx
import { useState } from "react";

interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

type StatusLista =
  | { readonly tipo: "ocioso" }
  | { readonly tipo: "carregando" }
  | { readonly tipo: "sucesso"; readonly tarefas: readonly Tarefa[] }
  | { readonly tipo: "erro"; readonly mensagem: string };

const API_BASE = "https://jsonplaceholder.typicode.com";

function validarTarefa(valor: unknown): Tarefa | null {
  if (typeof valor !== "object" || valor === null) {
    return null;
  }

  if (!("id" in valor) || !("title" in valor) || !("completed" in valor)) {
    return null;
  }

  if (
    typeof valor.id !== "number" ||
    !Number.isFinite(valor.id) ||
    typeof valor.title !== "string" ||
    typeof valor.completed !== "boolean"
  ) {
    return null;
  }

  return {
    id: valor.id,
    titulo: valor.title,
    concluida: valor.completed,
  };
}

function validarListaDeTarefas(valor: unknown): readonly Tarefa[] | null {
  if (!Array.isArray(valor)) {
    return null;
  }

  const tarefas: Tarefa[] = [];

  for (const item of valor) {
    const tarefa = validarTarefa(item);
    if (tarefa === null) {
      return null;
    }
    tarefas.push(tarefa);
  }

  return tarefas;
}

async function buscarTarefasRemotas(
  limite: number,
  simularEndpointInexistente: boolean,
): Promise<readonly Tarefa[]> {
  const caminho = simularEndpointInexistente ? "/todos-inexistente" : "/todos";
  const url = new URL(caminho, API_BASE);
  url.searchParams.set("_limit", String(limite));

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`A API respondeu com erro HTTP ${response.status}.`);
  }

  const dadosBrutos: unknown = await response.json();
  const tarefas = validarListaDeTarefas(dadosBrutos);

  if (tarefas === null) {
    throw new Error("A API retornou dados em um formato inesperado.");
  }

  return tarefas;
}

export default function App() {
  const [status, setStatus] = useState<StatusLista>({ tipo: "ocioso" });
  const [simular404, setSimular404] = useState(false);

  async function handleCarregar() {
    setStatus({ tipo: "carregando" });

    try {
      const tarefas = await buscarTarefasRemotas(5, simular404);
      setStatus({ tipo: "sucesso", tarefas });
    } catch (erro: unknown) {
      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível carregar as tarefas.";
      setStatus({ tipo: "erro", mensagem });
    }
  }

  const carregando = status.tipo === "carregando";

  return (
    <main>
      <h1>Tarefas da API</h1>

      <label>
        <input
          type="checkbox"
          checked={simular404}
          onChange={(event) => setSimular404(event.target.checked)}
        />{" "}
        Testar endpoint inexistente (HTTP 404)
      </label>

      <div>
        <button type="button" onClick={handleCarregar} disabled={carregando}>
          {carregando ? "Carregando..." : "Carregar tarefas"}
        </button>
      </div>

      {status.tipo === "carregando" && (
        <p role="status">Buscando tarefas no servidor...</p>
      )}

      {status.tipo === "erro" && <p role="alert">{status.mensagem}</p>}

      {status.tipo === "sucesso" &&
        (status.tarefas.length === 0 ? (
          <p>Nenhuma tarefa retornada pela API.</p>
        ) : (
          <ul>
            {status.tarefas.map((tarefa) => (
              <li key={tarefa.id}>
                {tarefa.titulo} — {tarefa.concluida ? "Concluída" : "Pendente"}
              </li>
            ))}
          </ul>
        ))}
    </main>
  );
}
```

Observe como a responsabilidade fica bem separada — e o que muda a seguir:

1. **Fronteira isolada do componente:** `App` não sabe nada sobre URLs, headers, `response.ok` ou nomes de campos em inglês da API externa. Toda essa lógica fica encapsulada em `buscarTarefasRemotas` e `validarListaDeTarefas`; o componente recebe `readonly Tarefa[]` já validadas ou uma falha clara no `catch`.
2. **Veja a troca HTTP real no navegador:** com a aba **Network** (Rede) do DevTools aberta, clique em **Carregar tarefas** duas vezes — primeiro com a caixa desmarcada e depois marcada. Inspecione em cada requisição: a URL com `?_limit=5`, o método `GET`, o status (`200` ou `404`), o header `content-type` da resposta e o JSON bruto em **Response**.
3. **O que fica para o capítulo 27:** assim como no capítulo 25, o carregamento ainda só dispara quando a pessoa **clica** no botão. Quando quisermos buscar dados automaticamente ao abrir a tela ou reagir a um campo de busca, precisaremos sincronizar com `useEffect` — e lidar com dois problemas novos: cancelar requisições obsoletas e evitar que uma resposta lenta antiga sobrescreva uma resposta mais nova.

## Ao terminar

Antes de avançar para o capítulo 27, confira se você consegue explicar:

- quais são as partes de uma URL, qual a intenção dos métodos `GET`, `POST`, `PUT`/`PATCH` e `DELETE`, o que significam as faixas de status `2xx`, `3xx`, `4xx` e `5xx`, para que servem headers como `Content-Type` e `Accept`, e o que o HTTPS protege (e não protege);
- quais tipos o formato JSON aceita, o que se perde ou se transforma ao usar `JSON.stringify` (como `undefined` e `Date`) e por que `JSON.parse` pode lançar `SyntaxError`;
- por que usar `fetch` envolve duas etapas assíncronas (`await fetch(...)` e `await response.json()`), por que você precisa verificar `response.ok` mesmo dentro de `try`/`catch` e quando um status como `404` pode ser tratado como ausência esperada em vez de falha técnica;
- por que fazer `await response.json() as MeuTipo` não protege o programa em tempo de execução, e como receber dados externos como `unknown` e validá-los na fronteira usando `typeof`, `!== null`, `Array.isArray` e o operador `in`.
