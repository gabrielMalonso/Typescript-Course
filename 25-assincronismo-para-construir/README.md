# Capítulo 25 — Assincronismo para construir

**Objetivo:** compreender o modelo de Promises e seus estados, escrever fluxos assíncronos com `async`/`await`, tratar erros e limpezas com `try`/`catch`/`finally`, combinar operações com composição básica (`Promise.all` e `Promise.allSettled`) e distinguir falhas reais de resultados válidos. Ao final, você terá a base para aguardar operações que levam tempo sem travar a interface e reagir de forma previsível quando algo falha.

Até o capítulo 24, tudo no seu código acontecia de forma imediata na memória: clicar em um botão alterava um array local e redesenhava a tela na hora. Em aplicações reais, porém, dados costumam vir de servidores, arquivos ou temporizadores — operações que não terminam na linha seguinte. Você já viu uma pista desse modelo nos **callbacks** (capítulo 8) e nos **event handlers** (capítulos 20 e 23). Agora vamos organizar esse trabalho com o modelo padrão do JavaScript moderno.

**Percurso:** por que assincronismo existe e os estados de uma `Promise` → `async`/`await` e tipagem `Promise<Tipo>` → `try`/`catch`/`finally` e falha × resultado válido → composição básica (`Promise.all` e `Promise.allSettled`) → ponte com ações assíncronas em React. Em cada etapa, leia o recorte oficial indicado e use a explicação para conectá-lo ao TypeScript que você já domina.

**Escopo:** trabalharemos com operações assíncronas simuladas em TypeScript (usando temporizadores) para focar no comportamento de Promises e no fluxo de controle. HTTP, JSON, `fetch` e validação de dados externos como `unknown` entram no capítulo 26; carregamento automático com `useEffect`, cancelamento e respostas fora de ordem em React, no capítulo 27; erros personalizados e padrão `Result`, no capítulo 64; funcionamento interno do *event loop* e microtasks, no capítulo 76; e controle avançado de concorrência, no capítulo 77.

## 1. Por que assincronismo existe, Promises e seus estados

### O problema: esperar sem travar o programa

No código síncrono que você escreveu até aqui, cada instrução espera a anterior terminar antes de rodar. Isso funciona bem para cálculos rápidos em memória. Mas o JavaScript no navegador compartilha uma única linha principal de execução com cliques, digitação e atualização da tela: se uma operação ficasse parada esperando uma resposta externa por dois segundos, a página inteira congelaria durante esse tempo.

Uma saída antiga era passar uma função de **callback** para ser executada quando a tarefa terminasse — parecido com um `addEventListener`. O problema aparece quando uma etapa depende da outra (buscar usuário → buscar pedidos → calcular total) e cada etapa pode falhar: os callbacks ficam aninhados uns dentro dos outros e o tratamento de erro se espalha pelo código.

Para resolver isso, o JavaScript usa **Promises**. Uma `Promise` é um objeto devolvido **imediatamente** por uma função assíncrona. Ele funciona como um protocolo de entrega: ainda não é o resultado final, mas representa a operação em andamento e avisa quando ela terminar com sucesso ou falhar.

### Leitura principal

Em [Introducing asynchronous JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing#synchronous_programming), leia **Synchronous programming**, **A long-running synchronous function**, **The trouble with long-running synchronous functions** (incluindo **Types of long-running tasks and how to approach them**), **Event handlers** e **Callbacks**. Em **Event handlers**, não se preocupe em memorizar `XMLHttpRequest` (é uma API antiga; usaremos `fetch` no capítulo 26) — foque na diferença entre bloquear a execução e reagir quando uma tarefa termina.

Depois, em [How to use promises — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#using_the_fetch_api), leia a introdução, **Using the `fetch()` API**, **Chaining promises**, **Catching errors** e **Promise terminology**. Pare antes de **Combining multiple promises**. Nos exemplos da página, `fetch(...)` aparece apenas como uma função pronta que devolve uma `Promise`; estudaremos HTTP, status e `fetch` em detalhe no capítulo 26.

### Os três estados e a tipagem `Promise<Tipo>`

Toda `Promise` começa em andamento e só pode terminar de duas maneiras:

```text
                       ┌──► fulfilled (concluída com um valor)
pending ───────────────┤
(em andamento)         └──► rejected  (falhou com um motivo/erro)

Depois de sair de pending (settled/concluída), o estado nunca mais muda.
```

- **`pending`:** estado inicial; a operação ainda está acontecendo.
- **`fulfilled`:** a operação terminou com sucesso e entregou um valor.
- **`rejected`:** a operação falhou e registrou um motivo (em geral, um `Error`).
- **`settled` (concluída):** termo usado quando a Promise deixou de estar `pending` — ou seja, já está `fulfilled` ou `rejected`. Uma Promise só pode ser resolvida ou rejeitada **uma única vez**; chamadas extras a `resolve` ou `reject` são ignoradas.

Os exemplos puros de TypeScript deste guia podem ser executados no **TypeScript Pad** do leitor ou em um arquivo `.ts` local com Node. Continuaremos usando o domínio da **agenda de leitura**:

```ts
function buscarTemaPorId(id: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve("Contos brasileiros");
        return;
      }

      reject(new Error(`Sessão ${id} indisponível no momento.`));
    }, 300);
  });
}

console.log("1. Antes de chamar a função");

const promessa = buscarTemaPorId(1);
console.log("2. Retorno imediato:", promessa);

promessa
  .then((tema) => {
    console.log("4. Sucesso:", tema.toUpperCase());
  })
  .catch((erro: unknown) => {
    const mensagem = erro instanceof Error ? erro.message : "Erro desconhecido";
    console.error("4. Falha:", mensagem);
  })
  .finally(() => {
    console.log("5. Encerrado (sempre executa)");
  });

console.log("3. O programa continua sem esperar o timer");
```

Conecte cada parte do exemplo ao que você já conhece:

1. **A notação `Promise<string>`:** assim como `useState<Tipo>` nos capítulos 23 e 24, `Promise` é uma API pronta da linguagem que aceita um **argumento de tipo** entre `<` e `>`. `Promise<string>` significa: *"uma Promise que, quando cumprir, entregará uma `string`"*. Por isso, dentro de `.then((tema) => ...)`, TypeScript já sabe que `tema` é `string`.
2. **Ordem de execução:** a linha `3.` aparece **antes** da linha `4.`. Chamar `buscarTemaPorId(1)` inicia o temporizador e devolve imediatamente uma `Promise` em estado `pending`; o código fora dela segue normalmente.
3. **`.then`, `.catch` e `.finally`:** `.then` registra o que fazer se a Promise cumprir; `.catch` registra o que fazer se ela rejeitar; `.finally` roda ao final dos dois caminhos, sem receber valor nem erro. Cada um desses métodos também devolve uma nova Promise, permitindo encadeamento.
4. **O que `Promise` abstrai, custos e limites:** `Promise` abstrai o registro de callbacks de sucesso/falha, padroniza o encadeamento e garante transição única de estado. Mas atenção a dois limites: criar uma Promise **não torna a operação mais rápida** nem executa cálculo pesado em outro núcleo — um loop demorado dentro de `new Promise(...)` continua travando o programa. Na prática, você vai **consumir** Promises (de APIs prontas) com muito mais frequência do que escrevê-las manualmente com `new Promise`.

**Experimente:** no exemplo acima, troque `buscarTemaPorId(1)` por `buscarTemaPorId(99)` e execute novamente. Observe que o bloco `.then` é pulado, o `.catch` recebe o `Error` e o `.finally` continua rodando ao final.

## 2. `async` e `await`: escrever fluxo assíncrono com clareza

### O problema: encadear etapas dependentes sem perder a leitura

Com `.then()`, fazer uma operação, guardar seu resultado, decidir algo com `if` e disparar a próxima etapa divide o fluxo em vários callbacks. A sintaxe **`async`/`await`** não substitui Promises — ela usa exatamente as mesmas Promises por baixo, mas permite escrever etapas assíncronas de cima para baixo, como um código sequencial.

### Leitura principal

Volte a [How to use promises — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#async_and_await) e leia **`async` and `await`** e **Summary**.

Para conferir o contrato exato de retorno e pausa, leia apenas a seção **Description** de [`async function` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#description) e a seção **Description** de [`await` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#description). Pule **Thenable objects**, **Top-level await** e os detalhes sobre *microtasks* (estudaremos o mecanismo interno do runtime no capítulo 76).

### Modelo mental e ponte com TypeScript

Veja o que acontece quando uma função `async` encontra um `await`:

```text
Chamador                        Função async exibirResumo(1)
  │                                        │
  ├── chama exibirResumo(1) ──────────────►│ executa até o 1º await
  │◄── recebe Promise<void> (pending) ─────┤ pausa só esta função enquanto espera
  │ segue rodando outras linhas            │ ... timer termina (fulfilled) ...
  │                                        │ retoma após o await com o valor pronto
  │                                        │ termina → Promise devolvida fica fulfilled
```

Teste este exemplo em TypeScript:

```ts
interface Sessao {
  readonly id: number;
  readonly tema: string;
}

function esperar(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function buscarSessao(id: number): Promise<Sessao> {
  await esperar(250);
  return { id, tema: "Contos brasileiros" };
}

async function buscarTotalInscritos(sessaoId: number): Promise<number> {
  await esperar(250);
  return sessaoId === 1 ? 12 : 4;
}

async function exibirResumo(id: number): Promise<void> {
  console.log("B. Iniciando carregamento...");

  const sessao = await buscarSessao(id);
  const inscritos = await buscarTotalInscritos(sessao.id);

  console.log(`D. ${sessao.tema} — ${inscritos} inscritos`);
}

console.log("A. Antes de chamar exibirResumo");
exibirResumo(1);
console.log("C. Depois de chamar exibirResumo (ainda aguardando)");
```

Repare em quatro regras fundamentais:

1. **Toda função `async` sempre retorna uma `Promise`:** em `buscarSessao`, a linha `return { id, tema: ... }` devolve um objeto `Sessao`, mas como a função é `async`, o retorno real é `Promise<Sessao>`. Se a função não retorna nada relevante, seu tipo é `Promise<void>`.
2. **`await` desembrulha o tipo `Promise<T>` para `T`:** `buscarSessao(id)` devolve `Promise<Sessao>`; ao escrever `const sessao = await buscarSessao(id)`, a variável `sessao` tem tipo `Sessao`, e você acessa `sessao.id` e `sessao.tema` diretamente.
3. **O compilador pega `await` esquecido:** se você esquecer o `await` e escrever `const sessao = buscarSessao(id)`, `sessao` terá tipo `Promise<Sessao>`. Tentar ler `sessao.tema` gera erro de compilação imediato no TypeScript.
4. **Pausar a função não pausa o programa:** na saída do console, a ordem é **A → B → C → D**. A linha `B` roda sincronamente até o primeiro `await`; nesse ponto, `exibirResumo` devolve uma `Promise` pendente ao chamador, a linha `C` executa, e a linha `D` só roda quando os dois `await` terminam.

**O que `async`/`await` abstrai, custos e limitações:** `async`/`await` abstrai o encadeamento manual de `.then()`, mantendo as mesmas Promises por baixo. Atenção a três limites práticos:

- `await` só pode ser usado dentro de uma função marcada com `async` (ou no nível superior de módulos ES).
- Evite usar `async` dentro de `array.forEach(async (item) => ...)`: o `forEach` não espera as Promises retornadas e termina antes das operações concluírem. Use `for...of` quando precisar de execução sequencial ou `Promise.all` quando puder rodar em concorrência (etapa 4).
- Colocar `await` um abaixo do outro faz cada operação esperar a anterior terminar. Aqui `buscarTotalInscritos(sessao.id)` **precisa** do `sessao.id` da primeira chamada; quando duas chamadas são independentes, aguardar uma de cada vez desperdiça tempo (veremos como resolver isso na etapa 4).

**Experimente:** remova temporariamente `await` da linha `const sessao = await buscarSessao(id)` e observe o erro do TypeScript em `sessao.id` e `sessao.tema`. Depois restaure o `await` e rode o código para confirmar a ordem `A → B → C → D`.

## 3. Erros com `try`/`catch`/`finally` e falha × resultado válido

### O problema: quando uma Promise rejeita — e quando o resultado apenas está ausente

Na etapa 2, tudo deu certo. Mas operações assíncronas falham: uma rede cai, um serviço demora demais ou um recurso fica indisponível. Quando uma `Promise` rejeita dentro de um `await`, o JavaScript **lança** o motivo da rejeição exatamente como um `throw` síncrono.

Se nada capturar esse erro, surge uma **rejeição não tratada** (*unhandled promise rejection*): no Node, isso pode encerrar o processo com erro; no navegador, o erro aparece no Console e a interface pode ficar travada em "Carregando..." para sempre.

Além disso, há uma decisão de modelagem igualmente importante: **nem toda resposta "negativa" é uma falha técnica**. Pesquisar um tema e não encontrar nenhuma sessão, ou tentar reservar uma vaga em uma turma já lotada, são **resultados válidos previstos pelo problema**, não falhas inesperadas.

### Leitura principal

Em [`try...catch` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#description), leia **Description**, **Catch binding** e **The `finally` block**. Em **Examples**, leia apenas **Resource cleanup using `finally`**. Pule **Conditional catch blocks**, **Nested `try` blocks** e **Returning from a `finally` block**.

Em [`await` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#handling_rejected_promises), leia somente **Handling rejected promises**.

### Separar resultado válido de falha e estreitar `unknown` no `catch`

Compare os dois tipos de desfecho antes de olhar o código:

| Situação | Natureza | Como representar na `Promise` | Onde tratar |
|---|---|---|---|
| Sessão não encontrada para o ID buscado | Resultado válido (ausência esperada) | Cumpre (`fulfilled`) com `null` (`Promise<Sessao \| null>`) | Fluxo normal (`if (sessao === null)`) |
| Lista filtrada sem correspondências | Resultado válido (vazio) | Cumpre (`fulfilled`) com `[]` (`Promise<readonly Sessao[]>`) | Fluxo normal (`lista.length === 0`) |
| Regra de negócio recusou (ex.: turma lotada) | Resultado válido do domínio | Cumpre (`fulfilled`) com union discriminada (`{ ok: false; motivo: ... }`) | Fluxo normal (`if (!resultado.ok)`) |
| Falha de conexão ou erro inesperado | Falha operacional/técnica | Rejeita (`rejected`) com `Error` | Bloco `catch (erro)` |

Veja essa separação em um exemplo completo de TypeScript:

```ts
interface Sessao {
  readonly id: number;
  readonly tema: string;
}

const BANCO_LOCAL: readonly Sessao[] = [
  { id: 1, tema: "Contos brasileiros" },
  { id: 2, tema: "Poesia contemporânea" },
];

function buscarSessaoPorId(
  id: number,
  simularFalhaDeConexao = false,
): Promise<Sessao | null> {
  return new Promise<Sessao | null>((resolve, reject) => {
    setTimeout(() => {
      if (simularFalhaDeConexao) {
        reject(new Error("Não foi possível conectar ao catálogo."));
        return;
      }

      const encontrada = BANCO_LOCAL.find((sessao) => sessao.id === id) ?? null;
      resolve(encontrada);
    }, 200);
  });
}

function extrairMensagemDeErro(erro: unknown): string {
  if (erro instanceof Error) {
    return erro.message;
  }
  return "Ocorreu uma falha inesperada.";
}

async function consultarSessao(
  id: number,
  simularFalha = false,
): Promise<void> {
  let carregando = true;
  console.log(`[id=${id}] carregando = ${carregando}`);

  try {
    const sessao = await buscarSessaoPorId(id, simularFalha);

    if (sessao === null) {
      console.log(`[id=${id}] Resultado válido: sessão não encontrada.`);
      return;
    }

    console.log(`[id=${id}] Resultado válido: ${sessao.tema}`);
  } catch (erro: unknown) {
    console.error(`[id=${id}] Falha técnica: ${extrairMensagemDeErro(erro)}`);
  } finally {
    carregando = false;
    console.log(`[id=${id}] finally → carregando = ${carregando}`);
  }
}

async function executarTestes(): Promise<void> {
  await consultarSessao(1);
  await consultarSessao(99);
  await consultarSessao(1, true);
}

executarTestes();
```

Observe os quatro pontos essenciais do código:

1. **Por que `erro` no `catch` é `unknown`:** em JavaScript, qualquer valor pode ser lançado (`throw "ops"`, `reject(404)` ou `reject(new Error(...))`). Por isso, em TypeScript com modo estrito, o parâmetro do `catch` tem tipo `unknown` — você não pode acessar `erro.message` direto. Usar `erro instanceof Error` estreita o tipo com segurança, sem `as`.
2. **`finally` para limpeza garantida:** repare que, quando `sessao === null`, há um `return` antecipado dentro do `try`. Mesmo assim, o bloco `finally` **sempre executa** antes de a função encerrar — tanto no sucesso, quanto no `return` antecipado, quanto depois do `catch`. É isso que garante que estados como `carregando = false` nunca fiquem presos.
3. **Ausência não precisa lançar exceção:** `id = 99` não entrou no `catch`. A consulta funcionou e respondeu honestamente `null`. Assim, a interface pode mostrar *"Sessão não encontrada"* em vez de *"Erro de conexão, tente novamente"*.
4. **Dois erros comuns para evitar:**
   - **Engolir erro com `catch` vazio (`catch {}`):** faz a falha desaparecer silenciosamente e dificulta depurar o problema depois. Sempre trate o erro (mostrando feedback, aplicando fallback explícito ou relançando).
   - **Esquecer `await` no `return` dentro de `try`:** se você escrever `try { return buscarSessaoPorId(1, true); } catch { ... }`, a função devolve a Promise pendente e sai do `try` **antes** de ela rejeitar — o `catch` local nunca roda! Quando quiser capturar a rejeição no próprio `try/catch`, escreva `return await buscarSessaoPorId(1, true)`.

**Experimente:** abaixo do exemplo, crie uma função separada e chame-a com um `.catch` externo (para a rejeição não ficar sem tratamento):

```ts
async function testarReturn(): Promise<Sessao | null> {
  try {
    return buscarSessaoPorId(1, true);
  } catch {
    console.log("pegou no catch local");
    return null;
  }
}

testarReturn().catch(() => console.log("escapou para o chamador"));
```

Verifique que aparece `"escapou para o chamador"`, e não `"pegou no catch local"`. Depois troque por `return await buscarSessaoPorId(1, true)` e veja o `catch` local entrar em ação.

## 4. Composição básica: sequencial × concorrente (`Promise.all` e `Promise.allSettled`)

### O problema: quando operações independentes não precisam esperar na fila

Suponha que, ao abrir a página da agenda, você precise carregar duas informações independentes: a lista de sessões (leva 400 ms) e o aviso do dia (leva 300 ms). Se você aguardar uma e só depois chamar a outra, o tempo total será a soma das duas (~700 ms). Como a segunda não depende do resultado da primeira, podemos iniciar as duas ao mesmo tempo e aguardar a conclusão do conjunto (~400 ms):

```text
Sequencial (await a(); await b()) — use quando B depende de A:
|------ A (400 ms) ------|---- B (300 ms) ----|  Total ≈ 700 ms

Concorrente (Promise.all([a(), b()])) — use quando A e B são independentes:
|------ A (400 ms) ------|
|---- B (300 ms) ----|                           Total ≈ 400 ms
```

### Leitura principal

Volte a [How to use promises — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#combining_multiple_promises) e leia **Combining multiple promises** até o final dos exemplos de `Promise.all()`. Pare antes de `Promise.any()`.

Em [`Promise.all()` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all#return_value), leia **Return value**, **Description**, **Destructuring the result** e **Promise.all fail-fast behavior**. Pule **Asynchronicity or synchronicity of `Promise.all`** e **Using `Promise.all()` with async functions**.

Em [`Promise.allSettled()` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value), leia **Return value**, **Description** e **Using `Promise.allSettled()`**.

### `Promise.all` (tudo ou nada) × `Promise.allSettled` (resultado individual)

Teste este exemplo comparando execução sequencial, `Promise.all` e `Promise.allSettled`:

```ts
function carregarSessoes(): Promise<readonly string[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Contos brasileiros", "Poesia contemporânea"]), 400);
  });
}

function carregarAvisoDoDia(falhar = false): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falhar) {
        reject(new Error("Serviço de avisos fora do ar."));
        return;
      }
      resolve("Traga um livro para trocar no intervalo.");
    }, 300);
  });
}

async function demonstrarComposicao(): Promise<void> {
  // 1. Tudo ou nada: só segue se ambas cumprirem
  const inicio = Date.now();
  const [sessoes, aviso] = await Promise.all([
    carregarSessoes(),
    carregarAvisoDoDia(false),
  ]);
  console.log(`Promise.all concluído em ~${Date.now() - inicio} ms`);
  console.log("Sessões:", sessoes.length, "| Aviso:", aviso);

  // 2. Resultado parcial: queremos saber o desfecho de cada uma
  const [resultadoSessoes, resultadoAviso] = await Promise.allSettled([
    carregarSessoes(),
    carregarAvisoDoDia(true),
  ]);

  if (resultadoSessoes.status === "fulfilled") {
    console.log("Sessões carregadas:", resultadoSessoes.value.join(", "));
  }

  if (resultadoAviso.status === "fulfilled") {
    console.log("Aviso:", resultadoAviso.value);
  } else {
    const motivo =
      resultadoAviso.reason instanceof Error
        ? resultadoAviso.reason.message
        : "Falha ao carregar aviso.";
    console.warn("Aviso indisponível (tela continua funcionando):", motivo);
  }
}

demonstrarComposicao();
```

Compare as duas ferramentas e o que TypeScript faz por você em cada uma:

1. **Ordem garantida e tipagem em tupla no `Promise.all`:** mesmo que `carregarAvisoDoDia` (300 ms) termine antes de `carregarSessoes` (400 ms), `Promise.all` devolve os valores **na mesma ordem do array passado**. Em TypeScript, o destructuring `[sessoes, aviso]` recebe uma tupla tipada automaticamente: `sessoes` é `readonly string[]` e `aviso` é `string`.
2. **Comportamento *fail-fast* do `Promise.all`:** se qualquer Promise do array rejeitar, `Promise.all` rejeita **imediatamente** com o motivo da primeira falha e cai no `catch`. Use `Promise.all` quando a tela ou o cálculo precisar de **todas** as partes para fazer sentido.
3. **Unions discriminadas no `Promise.allSettled`:** `Promise.allSettled` espera todas as Promises concluírem (com sucesso ou falha) e devolve um array de objetos com dois formatos possíveis:
   - `{ status: "fulfilled", value: T }`
   - `{ status: "rejected", reason: unknown }`
   É exatamente o padrão de **union discriminada** do capítulo 17: ao verificar `resultado.status === "fulfilled"`, TypeScript libera `.value` com o tipo correto; no `else`, libera `.reason` como `unknown`. Use `Promise.allSettled` quando operações independentes puderem falhar separadamente sem derrubar o restante da tela.
4. **Custos e limitações:**
   - **Sem cancelamento automático:** no `Promise.all`, quando uma Promise rejeita rápido, as outras operações já iniciadas **não são canceladas** — continuam rodando em segundo plano até terminarem (cancelamento entra nos capítulos 27 e 77).
   - **Cuidado com lotes grandes:** passar centenas de Promises simultâneas para `Promise.all` dispara todas ao mesmo tempo, o que pode sobrecarregar rede ou servidor. Limitar concorrência é assunto do capítulo 77.
   - **Outras combinações:** JavaScript também oferece `Promise.race` e `Promise.any` (para esperar apenas a primeira Promise a concluir ou cumprir), que exploraremos quando precisarmos de timeouts e concorrência avançada.

**Experimente:**
1. Meça com `Date.now()` quanto tempo leva trocar o `Promise.all` por dois `await` sequenciais (`const sessoes = await carregarSessoes(); const aviso = await carregarAvisoDoDia(false);`).
2. Passe `true` para `carregarAvisoDoDia(true)` dentro do `Promise.all` (envolvendo em `try/catch`) e compare o comportamento com o `Promise.allSettled`.

## 5. Ponte com a interface: ações assíncronas em React

### O problema: evitar cliques duplicados e representar o estado de carregamento

No capítulo 24, você modelou `StatusFormulario` com uma union discriminada (`ocioso`, `sucesso`, `erro`). Quando a ação passa a ser assíncrona, surge um quarto estado essencial: **`carregando`**.

Sem ele, quem usa a página clica no botão, nada parece acontecer por meio segundo e a pessoa clica três vezes seguidas — disparando três operações simultâneas.

### Exemplo completo em React + TypeScript

Se quiser testar esta ponte no seu laboratório Vite (`react-ts`), substitua `src/App.tsx` pelo código abaixo. Ele usa uma busca simulada (sem rede ainda) para mostrar como `async`/`await`, `try`/`catch`/`finally` e estados explícitos se conectam:

```tsx
import { useState } from "react";

interface Sessao {
  readonly id: number;
  readonly tema: string;
}

type StatusAgenda =
  | { readonly tipo: "ocioso" }
  | { readonly tipo: "carregando" }
  | { readonly tipo: "sucesso"; readonly sessoes: readonly Sessao[] }
  | { readonly tipo: "erro"; readonly mensagem: string };

function carregarAgendaSimulada(simularErro: boolean): Promise<readonly Sessao[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simularErro) {
        reject(new Error("Serviço temporariamente indisponível."));
        return;
      }

      resolve([
        { id: 1, tema: "Contos brasileiros" },
        { id: 2, tema: "Poesia contemporânea" },
      ]);
    }, 600);
  });
}

export default function App() {
  const [status, setStatus] = useState<StatusAgenda>({ tipo: "ocioso" });
  const [simularErro, setSimularErro] = useState(false);

  async function handleCarregar() {
    setStatus({ tipo: "carregando" });

    try {
      const sessoes = await carregarAgendaSimulada(simularErro);
      setStatus({ tipo: "sucesso", sessoes });
    } catch (erro: unknown) {
      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível carregar a agenda.";
      setStatus({ tipo: "erro", mensagem });
    }
  }

  const carregando = status.tipo === "carregando";

  return (
    <main>
      <h1>Agenda de leitura</h1>

      <label>
        <input
          type="checkbox"
          checked={simularErro}
          onChange={(event) => setSimularErro(event.target.checked)}
        />{" "}
        Simular falha na consulta
      </label>

      <div>
        <button type="button" onClick={handleCarregar} disabled={carregando}>
          {carregando ? "Carregando..." : "Carregar sessões"}
        </button>
      </div>

      {status.tipo === "carregando" && (
        <p role="status">Buscando sessões...</p>
      )}

      {status.tipo === "erro" && <p role="alert">{status.mensagem}</p>}

      {status.tipo === "sucesso" &&
        (status.sessoes.length === 0 ? (
          <p>Nenhuma sessão agendada no momento.</p>
        ) : (
          <ul>
            {status.sessoes.map((sessao) => (
              <li key={sessao.id}>{sessao.tema}</li>
            ))}
          </ul>
        ))}
    </main>
  );
}
```

Observe como tudo o que vimos se encaixa — e onde ficam os limites desta etapa:

1. **Uma fonte de verdade para os quatro estados:** `StatusAgenda` impede estados contraditórios (como exibir carregamento e mensagem de erro ao mesmo tempo). Desabilitar o botão com `disabled={carregando}` evita disparar novas chamadas enquanto uma ainda está pendente.
2. **Quando usar `finally` no React:** neste exemplo, `try` sempre move para `"sucesso"` e `catch` sempre move para `"erro"`, saindo de `"carregando"` nos dois casos. Quando você mantiver os dados anteriores na tela e controlar um booleano separado (`const [enviando, setEnviando] = useState(false)`), use `finally { setEnviando(false); }` para garantir que o botão volte a ficar ativo em qualquer cenário.
3. **O que ainda fica para os próximos capítulos:**
   - Aqui os dados vêm de uma função simulada em memória. No **capítulo 26**, substituiremos a simulação por chamadas HTTP reais com `fetch`, checando status HTTP e validando os dados externos vindos de fora do programa.
   - Aqui o carregamento só acontece quando a pessoa **clica** em um botão. Para carregar dados automaticamente ao abrir uma tela, cancelar requisições obsoletas e lidar com respostas que chegam fora de ordem, entraremos em `useEffect` no **capítulo 27**.

## Ao terminar

Antes de avançar para o capítulo 26, confira se você consegue explicar:

- o que é uma `Promise`, quais são seus três estados (`pending`, `fulfilled`, `rejected`) e o que significa dizer que ela foi concluída (*settled*);
- o que `async` garante sobre o retorno de uma função, o que `await` faz com o fluxo de execução e por que pausar uma função `async` não congela o restante do programa;
- qual o papel de `try`, `catch` e `finally`, por que o parâmetro de `catch` é tratado como `unknown` em TypeScript e como distinguir um resultado válido (como `null` ou lista vazia) de uma falha técnica;
- quando aguardar operações em sequência (`await` um após o outro) e quando combiná-las de forma concorrente, diferenciando `Promise.all` (*fail-fast*, tudo ou nada) de `Promise.allSettled` (resultado individual de cada operação).
