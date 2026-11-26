# Capítulo 27 — Dados assíncronos em React

**Objetivo:** usar `useEffect` para sincronizar componentes React com sistemas externos (como APIs HTTP), configurar corretamente o array de dependências, implementar funções de limpeza (*cleanup*) para lidar com desmontagem e respostas fora de ordem, cancelar requisições obsoletas com `AbortController`, exibir estados claros de carregamento, erro e vazio, e evitar requisições e efeitos desnecessários.

No capítulo 26, você substituiu dados simulados por chamadas reais com `fetch`, verificou `response.ok` e validou a resposta como `unknown` na fronteira. Mas o carregamento só acontecia quando alguém clicava em um botão. Em aplicações reais, muitas telas precisam buscar dados **assim que aparecem** ou **sempre que um filtro muda** — sem disparar requisições em loop e sem deixar que uma resposta antiga atropele a mais recente.

**Percurso:** `useEffect` para sincronização externa → array de dependências e prevenção de loops → função de limpeza, `StrictMode` e respostas fora de ordem → cancelamento real com `AbortController` → quando **não** usar `useEffect` e como evitar requisições desnecessárias. Em cada etapa, leia o recorte oficial indicado e use as explicações e exemplos para conectar o mecanismo ao TypeScript que você já domina. Os desafios finais da documentação são opcionais e ficam fora deste percurso.

**Escopo:** trabalharemos com `useEffect` e `fetch` diretamente em componentes React para compreender o mecanismo de sincronização, limpeza e cancelamento. Testes automatizados de componentes com falha de API entram no capítulo 28; construção do backend e validação no servidor, nos capítulos 29 e 30; hooks personalizados, `useReducer`, Context e refs, no capítulo 68; navegação e estratégias de cache de dados, no capítulo 69; medição de performance de renderização, no capítulo 70; e mecanismos avançados de concorrência e timeout, no capítulo 77.

## 1. `useEffect`: sincronizar a tela com sistemas externos

### O problema: quando a busca não vem de um clique específico

No final do capítulo 26, `handleCarregar` chamava `fetch` dentro de um *event handler* (`onClick`). Isso funciona muito bem para ações disparadas por um clique. Mas imagine uma tela de tarefas que precisa mostrar os dados assim que o componente aparece na página.

Você poderia pensar em chamar `fetch(...)` diretamente no corpo da função `App`. Isso falha por dois motivos:

1. **A renderização precisa ser pura:** o corpo do componente serve apenas para transformar props e estado em JSX. Disparar efeitos externos durante a renderização torna imprevisível quantas vezes e em que ordem eles acontecem.
2. **Loop infinito imediato:** quando o `fetch` terminar e chamar `setStatus(...)`, React renderizará o componente de novo — que dispararia outro `fetch`, que chamaria `setStatus(...)`, sem nunca parar.

Para operações que precisam acontecer **porque o componente foi renderizado** (e não por causa de um clique específico), React oferece o hook **`useEffect`**.

### Leitura principal

Em [Synchronizing with Effects — React](https://react.dev/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events), leia **What are Effects and how are they different from events?**, **You might not need an Effect**, **How to write an Effect** e **Step 1: Declare an Effect**. Pare antes de **Step 2: Specify the Effect dependencies**.

Nos exemplos de `<VideoPlayer>` da documentação, encare `useRef` apenas como uma ponte pronta para alcançar o elemento `<video>` no DOM (estudaremos refs em detalhe no capítulo 68). Concentre-se na diferença entre **código de renderização**, ***event handlers*** e ***Effects***, e no momento em que `useEffect` executa.

### Modelo mental e por que `useEffect` não aceita função `async` direta

Acompanhe a ordem em que React trabalha quando um componente usa `useEffect`:

```text
1. Renderização (pura)     ──► calcula o JSX com o estado atual (ex.: "Carregando...")
        │
        ▼
2. Commit no DOM           ──► o navegador pinta a tela (a pessoa já vê feedback!)
        │
        ▼
3. Executa useEffect       ──► conversa com o sistema externo (ex.: fetch na API)
        │
        ▼ (quando os dados chegam)
4. setStatus(...)          ──► agenda nova renderização com os dados recebidos
```

Os exemplos deste capítulo usam o mesmo laboratório Vite (`react-ts`) dos capítulos anteriores. Substitua `src/App.tsx` pelo exemplo abaixo para ver o carregamento automático na montagem:

```tsx
import { useEffect, useState } from "react";

interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

type StatusTarefa =
  | { readonly tipo: "carregando" }
  | { readonly tipo: "sucesso"; readonly tarefa: Tarefa }
  | { readonly tipo: "erro"; readonly mensagem: string };

function validarTarefa(valor: unknown): Tarefa | null {
  if (typeof valor !== "object" || valor === null) return null;
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
  return { id: valor.id, titulo: valor.title, concluida: valor.completed };
}

export default function App() {
  const [status, setStatus] = useState<StatusTarefa>({ tipo: "carregando" });

  useEffect(() => {
    async function carregar() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1",
          { headers: { Accept: "application/json" } },
        );

        if (!response.ok) {
          throw new Error(`A API respondeu com HTTP ${response.status}.`);
        }

        const bruto: unknown = await response.json();
        const tarefa = validarTarefa(bruto);

        if (tarefa === null) {
          throw new Error("A API retornou dados fora do contrato esperado.");
        }

        setStatus({ tipo: "sucesso", tarefa });
      } catch (erro: unknown) {
        const mensagem =
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar a tarefa.";
        setStatus({ tipo: "erro", mensagem });
      }
    }

    void carregar();
  }, []);

  return (
    <main>
      <h1>Tarefa carregada ao abrir</h1>

      {status.tipo === "carregando" && (
        <p role="status">Carregando tarefa...</p>
      )}

      {status.tipo === "erro" && <p role="alert">{status.mensagem}</p>}

      {status.tipo === "sucesso" && (
        <p>
          #{status.tarefa.id} — {status.tarefa.titulo} (
          {status.tarefa.concluida ? "Concluída" : "Pendente"})
        </p>
      )}
    </main>
  );
}
```

Conecte quatro detalhes essenciais desse código:

1. **Por que não escrevemos `useEffect(async () => { ... }, [])`:** você viu no capítulo 25 que toda função `async` retorna uma `Promise`. Porém, o `useEffect` espera que seu callback retorne **`void`** ou uma **função de limpeza (`() => void`)** (que veremos na etapa 3). Se você marcar o callback diretamente com `async`, o TypeScript acusa erro de tipo na hora. A solução padrão é declarar `async function carregar()` **dentro** do efeito e chamá-la em seguida (`void carregar()` deixa explícito que não aguardamos a Promise fora dela, pois o `try`/`catch` interno já trata erros).
2. **O estado inicial já é `"carregando"`:** como o `useEffect` só roda **depois** da primeira renderização, iniciar `useState` com `{ tipo: "carregando" }` evita uma tela em branco enquanto a resposta não chega.
3. **O que `useEffect` abstrai, custos e limitações:** `useEffect` abstrai o agendamento de código após o commit no DOM e o integra ao ciclo de vida do componente. Porém, como ele só inicia o `fetch` **depois** de o componente renderizar, existe uma pequena latência entre montar o componente e iniciar a requisição; além disso, esse exemplo ainda não tem limpeza (resolveremos isso na etapa 3).
4. **Regra dos hooks continua valendo:** assim como `useState`, `useEffect` fica sempre no nível superior do componente — nunca dentro de `if`, loops ou funções internas.

**Experimente:** no exemplo acima, troque temporariamente `useEffect(() => {` por `useEffect(async () => {` e observe a mensagem de erro do TypeScript explicando que `Promise<void>` não é compatível com `EffectCallback`. Restaure em seguida.

## 2. Array de dependências: controlar quando o efeito roda (e evitar loops)

### O problema: rodar demais ou rodar de menos

O segundo argumento de `useEffect(setup, dependencies)` diz ao React **quais valores reativos** (props, estados ou variáveis calculadas a partir deles) o efeito usa. Errar nesse array produz dois bugs clássicos:

- **Esquecer o array de dependências:** o efeito roda após **toda** renderização. Se ele chamar `setStatus(...)`, dispara nova renderização → novo efeito → **loop infinito de requisições** que pode derrubar o navegador ou estourar limites da API.
- **Omitir uma dependência usada no efeito (ex.: deixar `[]` quando o efeito lê `tarefaId`):** quando `tarefaId` mudar na tela, React achará que nada mudou para o efeito e **não buscará os novos dados**, deixando a tela fora de sincronia.

### Leitura principal

Volte a [Synchronizing with Effects — React](https://react.dev/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies) e leia **Step 2: Specify the Effect dependencies** (incluindo o quadro **Pitfall** sobre não "escolher" dependências). Pule **Why was the ref omitted from the dependency array?**.

Na referência [`useEffect` — React](https://react.dev/reference/react/useEffect#my-effect-runs-after-every-re-render), leia apenas as duas entradas curtas de diagnóstico **My Effect runs after every re-render** e **My Effect keeps re-running in an infinite cycle**.

### Os três modos e a armadilha das referências

Compare os três jeitos de passar (ou omitir) o array de dependências:

| Forma | Quando o efeito executa | Quando usar |
|---|---|---|
| `useEffect(fn)` (sem array) | Após **toda** renderização | Quase nunca em requisições de rede (causa loop se houver `setState`). |
| `useEffect(fn, [])` (array vazio) | Apenas na montagem inicial do componente | Apenas quando o efeito não lê nenhuma prop, estado ou valor derivado dele. |
| `useEffect(fn, [tarefaId])` | Na montagem e sempre que `tarefaId` mudar | Quando o efeito precisa acompanhar valores reativos específicos. |

Para decidir se uma dependência mudou entre uma renderização e outra, React compara cada item com **`Object.is`** (muito parecido com `===`). Isso se conecta diretamente ao que você viu sobre **referências** nos capítulos 7 e 23:

```tsx
// EVITE: cria um novo objeto a cada render -> Object.is(anterior, atual) é sempre false!
const opcoes = { tarefaId, incluirDetalhes: true };

useEffect(() => {
  // Se opcoes entrar nas dependências, este efeito roda em TODA renderização!
  // ...
}, [opcoes]);
```

Mesmo que `tarefaId` continue `1` e `incluirDetalhes` continue `true`, `{ tarefaId, incluirDetalhes: true }` aloca um **novo endereço na memória** em cada renderização. Se esse objeto (ou uma função criada no corpo do componente) entrar no array de dependências, o efeito dispara de novo a cada render — gerando requisições repetidas ou um loop infinito.

A correção mais simples é **depender apenas de valores primitivos** (`[tarefaId]`) e montar URLs, objetos de configuração ou funções auxiliares **dentro** do próprio `useEffect` (ou fora do componente, se não dependerem de props/estado).

Veja como um efeito sincronizado com `[tarefaId]` busca uma nova tarefa apenas quando `tarefaId` muda, ignorando outros estados da tela:

```tsx
import { useEffect, useState } from "react";

interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

type StatusTarefa =
  | { readonly tipo: "carregando" }
  | { readonly tipo: "sucesso"; readonly tarefa: Tarefa }
  | { readonly tipo: "erro"; readonly mensagem: string };

const API_BASE = "https://jsonplaceholder.typicode.com";

function validarTarefa(valor: unknown): Tarefa | null {
  if (typeof valor !== "object" || valor === null) return null;
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
  return { id: valor.id, titulo: valor.title, concluida: valor.completed };
}

export default function App() {
  const [tarefaId, setTarefaId] = useState(1);
  const [cliquesLocais, setCliquesLocais] = useState(0);
  const [status, setStatus] = useState<StatusTarefa>({ tipo: "carregando" });

  useEffect(() => {
    async function carregar() {
      setStatus({ tipo: "carregando" });

      try {
        const url = new URL(`/todos/${tarefaId}`, API_BASE);
        const response = await fetch(url, {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}.`);
        }

        const bruto: unknown = await response.json();
        const tarefa = validarTarefa(bruto);

        if (tarefa === null) {
          throw new Error("Formato inesperado retornado pela API.");
        }

        setStatus({ tipo: "sucesso", tarefa });
      } catch (erro: unknown) {
        const mensagem =
          erro instanceof Error ? erro.message : "Falha ao buscar tarefa.";
        setStatus({ tipo: "erro", mensagem });
      }
    }

    void carregar();
  }, [tarefaId]);

  return (
    <main>
      <h1>Detalhes da tarefa #{tarefaId}</h1>

      <div>
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={tarefaId === id}
            onClick={() => setTarefaId(id)}
          >
            Tarefa {id}
          </button>
        ))}
      </div>

      <p>
        Estado independente (cliques: {cliquesLocais}){" "}
        <button
          type="button"
          onClick={() => setCliquesLocais((atual) => atual + 1)}
        >
          +1 clique local
        </button>
      </p>

      {status.tipo === "carregando" && (
        <p role="status">Buscando tarefa #{tarefaId}...</p>
      )}

      {status.tipo === "erro" && <p role="alert">{status.mensagem}</p>}

      {status.tipo === "sucesso" && (
        <p>
          {status.tarefa.titulo} —{" "}
          {status.tarefa.concluida ? "Concluída" : "Pendente"}
        </p>
      )}
    </main>
  );
}
```

Note que `setStatus` (o setter devolvido por `useState`) tem identidade estável garantida pelo React — por isso não precisa ser listado no array de dependências. Já `tarefaId` é um número primitivo que muda quando a pessoa clica nos botões, disparando o efeito novamente apenas nessas trocas.

**Experimente:** abra a aba **Network** (Rede) do DevTools, limpe a lista de requisições e clique várias vezes em **+1 clique local**. Confirme que o componente re-renderiza, mas **nenhuma** requisição HTTP é disparada. Depois clique em **Tarefa 2** e **Tarefa 3** e veja uma nova requisição disparar apenas quando `tarefaId` muda.

> **Atenção:** o exemplo acima ainda tem um bug sutil quando você alterna entre tarefas muito rápido. É exatamente o problema que vamos resolver agora.

## 3. Limpeza (*cleanup*), `StrictMode` e respostas fora de ordem

### O problema: a rede não promete ordem de chegada

No exemplo da etapa 2, imagine que a pessoa clique em **Tarefa 1** e, 100 ms depois, clique em **Tarefa 2**. A rede não garante que a primeira requisição volte antes da segunda:

```text
t = 0 ms     clica em Tarefa 1  ──► Req #1 (lenta: 800 ms)
t = 100 ms   clica em Tarefa 2  ──► Req #2 (rápida: 150 ms)
t = 250 ms   ◄── Resp #2 chega  ──► tela mostra dados da Tarefa 2
t = 800 ms   ◄── Resp #1 chega  ──► SEM limpeza: sobrescreve a tela com Tarefa 1!
```

O cabeçalho da página diz **"Detalhes da tarefa #2"**, mas o conteúdo exibido pertence à **Tarefa 1**! Esse defeito clássico se chama ***race condition*** (condição de corrida): duas operações assíncronas competiram entre si e a resposta antiga venceu por chegar por último.

O mesmo problema acontece com erros: se a Req #1 falhar depois que a Req #2 já deu certo, o `catch` da Req #1 sobrescreveria os dados válidos com uma mensagem de erro antiga. E se o componente sair da tela (for **desmontado**) enquanto uma requisição ainda estiver em andamento, não queremos que sua resposta continue tentando atualizar o componente.

### Leitura principal

Volte a [Synchronizing with Effects — React](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) e leia **Step 3: Add cleanup if needed** e **How to handle the Effect firing twice in development?** — nesta seção, leia a introdução e avance direto para [**Fetching data**](https://react.dev/learn/synchronizing-with-effects#fetching-data) (pule **Don’t use refs to prevent Effects from firing**, **Controlling non-React widgets**, **Subscribing to events**, **Triggering animations**, **Sending analytics**, **Not an Effect: Initializing the application** e **Not an Effect: Buying a product**).

Em [You Might Not Need an Effect — React](https://react.dev/learn/you-might-not-need-an-effect#fetching-data), leia somente a seção **Fetching data** (repare no exemplo de digitar `"hello"` rápido e receber `"hell"` depois). Pare antes de **Recap**.

### Como a limpeza funciona e por que o efeito roda duas vezes em desenvolvimento

Para encerrar ou invalidar um efeito anterior, o callback do `useEffect` pode **retornar uma função de limpeza** (`return () => { ... }`). React executa essa função em dois momentos:

1. **Antes de rodar o efeito novamente**, quando alguma dependência muda (a limpeza enxerga as variáveis da execução **anterior**).
2. **Quando o componente é desmontado** (removido da tela).

Acompanhe a linha do tempo correta quando adicionamos limpeza:

```text
Render 1 (tarefaId = 1) ──► roda Efeito #1 (cria ignorado = false para #1)
Render 2 (tarefaId = 2) ──► roda Limpeza #1 (marca ignorado = true para #1)
                        ──► roda Efeito #2 (cria ignorado = false para #2)
Resp #2 chega           ──► ignorado (#2) é false ──► atualiza a tela com Tarefa 2
Resp #1 chega atrasada  ──► ignorado (#1) é true  ──► descartada com segurança!
```

Você também provavelmente notou algo curioso na aba **Network** do DevTools ao abrir o projeto Vite: mesmo com `[]`, o efeito rodou **duas vezes** ao carregar a página. Isso acontece porque `src/main.tsx` envolve `<App />` com `<StrictMode>`.

Em **desenvolvimento** (nunca no build de produção), o `StrictMode` executa propositalmente:

```text
monta componente ──► executa efeito ──► executa limpeza ──► executa efeito novamente
```

O objetivo é testar se a sua limpeza realmente desfaz ou invalida a execução anterior. **Nunca tente "desligar" ou driblar o `StrictMode`** com variáveis globais ou gambiarras: se o comportamento quebra ao rodar duas vezes, o bug está na falta de limpeza.

### Primeira proteção: flag `ignorado` por closure

Cada execução do `useEffect` cria o seu próprio escopo (uma **closure**, como vimos no capítulo 8). Declarar `let ignorado = false` dentro do efeito cria uma bandeira exclusiva daquela requisição. Aplicando isso ao efeito da etapa 2 (aqui, `buscarTarefa(tarefaId)` representa o mesmo `fetch` + validação que estava dentro de `carregar`):

```tsx
useEffect(() => {
  let ignorado = false;

  async function carregar() {
    setStatus({ tipo: "carregando" });

    try {
      const tarefa = await buscarTarefa(tarefaId);
      if (!ignorado) {
        setStatus({ tipo: "sucesso", tarefa });
      }
    } catch (erro: unknown) {
      if (!ignorado) {
        const mensagem =
          erro instanceof Error ? erro.message : "Falha ao carregar.";
        setStatus({ tipo: "erro", mensagem });
      }
    }
  }

  void carregar();

  return () => {
    ignorado = true;
  };
}, [tarefaId]);
```

Observe dois detalhes importantes:

1. **Proteja tanto o sucesso quanto o erro:** verificar `if (!ignorado)` no `try` **e** no `catch` garante que nem um dado antigo nem uma falha antiga consigam sobrescrever a tela atual.
2. **Custo e limite da flag `ignorado`:** ela resolve completamente o problema de estado obsoleto na interface (e funciona até com APIs assíncronas que não oferecem cancelamento). Porém, a requisição HTTP antiga **continua rodando na rede** e baixando o JSON completo até terminar, apenas para ter o resultado jogado fora no final. Para interromper a requisição de verdade no navegador, precisamos do `AbortController`.

## 4. Cancelamento real com `AbortController` e `fetch`

### O problema: parar o trabalho de rede que ninguém vai usar

Quando a pessoa troca rapidamente de filtro ou sai de uma tela pesada, deixar requisições antigas baixando dados desperdiça banda, memória e trabalho do servidor. O navegador (e o Node moderno) oferece uma API padrão para cancelar operações assíncronas: **`AbortController`** e **`AbortSignal`**.

### Leitura principal

Volte a [Using the Fetch API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#canceling_a_request) e leia a seção **Canceling a request** (justamente o trecho que deixamos para este capítulo). Pare antes de **Handling the response**.

Em [`AbortController` — MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), leia apenas a introdução, **Instance properties** (`signal`) e **Instance methods** (`abort()`). Pule **Examples** e o restante da página.

### Conectando `AbortController` à limpeza do `useEffect`

O fluxo tem quatro peças que trabalham juntas:

1. Dentro do `useEffect`, criamos um `const controller = new AbortController();` exclusivo daquela execução.
2. Passamos `controller.signal` para `fetch(url, { signal })`.
3. Na função de limpeza do `useEffect`, chamamos `controller.abort()`.
4. Se o `fetch` (ou o `response.json()`) ainda estiver em andamento quando `abort()` for chamado, o navegador cancela a requisição e **rejeita a Promise** com um `DOMException` cujo `name` é `"AbortError"` (e marca `controller.signal.aborted === true`).

**Atenção à armadilha do `catch`:** um cancelamento disparado pela nossa própria limpeza **não é um erro para exibir ao usuário**! Se o `catch` não ignorar requisições abortadas, trocar de usuário rapidamente fará piscar na tela uma mensagem técnica do navegador (no Chrome, algo como `"signal is aborted without reason"`).

Veja o padrão limpo e seguro em TypeScript:

```tsx
async function buscarTarefasDoUsuario(
  usuarioId: number,
  signal: AbortSignal,
): Promise<readonly Tarefa[]> {
  const url = new URL("/todos", API_BASE);
  url.searchParams.set("userId", String(usuarioId));
  url.searchParams.set("_limit", "5");

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`A API respondeu com erro HTTP ${response.status}.`);
  }

  const bruto: unknown = await response.json();
  const tarefas = validarListaDeTarefas(bruto);

  if (tarefas === null) {
    throw new Error("A API retornou dados fora do contrato esperado.");
  }

  return tarefas;
}
```

E dentro do componente:

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function carregar() {
    setStatus({ tipo: "carregando" });

    try {
      const tarefas = await buscarTarefasDoUsuario(usuarioId, controller.signal);

      // Protege também o caso raro de abort() acontecer logo após o JSON terminar
      if (!controller.signal.aborted) {
        setStatus({ tipo: "sucesso", tarefas });
      }
    } catch (erro: unknown) {
      // Cancelamento intencional não é falha para o usuário
      if (controller.signal.aborted) {
        return;
      }

      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível carregar as tarefas.";
      setStatus({ tipo: "erro", mensagem });
    }
  }

  void carregar();

  return () => {
    controller.abort();
  };
}, [usuarioId]);
```

Repare no que `AbortController` abstrai, seus custos e seus limites:

- **Por que verificar `controller.signal.aborted` em vez de depender só do nome do erro:** além de evitar o bug do `AbortError` no `catch`, verificar `controller.signal.aborted` funciona tanto quando o `fetch` rejeita com `AbortError` quanto caso o cancelamento aconteça no instante entre o fim do `response.json()` e a chamada a `setStatus(...)`. (Você também pode encontrar em projetos a verificação `erro instanceof DOMException && erro.name === "AbortError"`, que testa especificamente o tipo do erro lançado pelo navegador.)
- **Limite importante:** `controller.abort()` interrompe o recebimento da resposta no cliente e fecha a conexão quando possível, mas **não desfaz** uma operação que o servidor já tenha recebido e executado — por exemplo, se um `POST` já chegou ao backend e gravou no banco, abortar no cliente apenas descarta a resposta.
- **Limites de tempo (*timeout*):** a mesma ideia de `AbortSignal` permite impor tempo máximo em requisições (com `AbortSignal.timeout(ms)`), tema que aprofundaremos nos capítulos 77 e 87.

## 5. Evitar requisições desnecessárias e saber quando NÃO usar `useEffect`

### O problema: usar `useEffect` para tudo deixa o app lento e difícil de rastrear

Depois de conhecer `useEffect`, é muito comum cair na tentação de resolver qualquer atualização dentro de um efeito. Isso gera renderizações extras em cascata, código difícil de depurar e requisições que nunca precisariam acontecer.

### Leitura principal

Em [You Might Not Need an Effect — React](https://react.dev/learn/you-might-not-need-an-effect#how-to-remove-unnecessary-effects), leia **How to remove unnecessary Effects**, **Updating state based on props or state** e [**Sending a POST request**](https://react.dev/learn/you-might-not-need-an-effect#sending-a-post-request). Pule as demais subseções intermediárias e os desafios.

### Quatro regras práticas para economizar efeitos e requisições

1. **Filtrar ou transformar dados já carregados? Não use `useEffect` nem outro `fetch`.**
   Se as tarefas do usuário já estão no estado, aplicar um filtro local (**Todas / Pendentes / Concluídas**) é **estado derivado** (capítulos 23 e 24): basta calcular `tarefas.filter(...)` durante a renderização. Criar um `useEffect` para copiar a lista filtrada para outro `useState` faz o componente renderizar duas vezes sem necessidade.
2. **Ação iniciada por clique ou envio de formulário (`POST`, `PUT`, `DELETE`)? Faça no *event handler*.**
   Enviar um cadastro acontece **porque a pessoa clicou em Salvar**, não porque o componente apareceu na tela. Colocar esse `POST` em um `useEffect` disparado por um estado intermediário complica o fluxo e pode reenviar dados por engano.
3. **Campo de busca ligado a uma API: não dispare um `fetch` para cada tecla sem controle.**
   Se a pessoa digitar `"poesia"` rápido e o `useEffect` depender diretamente do texto do `<input>`, o componente dispara 6 requisições (`p`, `po`, `poe`, `poes`, `poesi`, `poesia`). Há duas formas limpas de evitar esse desperdício:
   - **Busca por envio explícito (mais simples):** mantenha `textoDigitado` controlado no `<input>` e só atualize `termoBuscado` no `onSubmit` do `<form>`. O `useEffect` depende de `[termoBuscado]`, disparando apenas quando a pessoa confirma a busca.
   - **Busca automática com *debounce* (esperar uma pausa na digitação):** quando o requisito exigir busca enquanto digita, use um temporizador dentro de um `useEffect` com `clearTimeout` na limpeza:

```tsx
const [textoDigitado, setTextoDigitado] = useState("");
const [termoBuscado, setTermoBuscado] = useState("");

useEffect(() => {
  const timerId = setTimeout(() => {
    setTermoBuscado(textoDigitado.trim());
  }, 400);

  // Se a pessoa digitar outra letra antes de 400 ms, cancela o timer anterior
  return () => {
    clearTimeout(timerId);
  };
}, [textoDigitado]);
```

Assim, enquanto a pessoa digita sem parar, cada nova tecla cancela o `setTimeout` anterior na função de limpeza; a requisição (que depende de `termoBuscado`) só dispara quando ela pausa por 400 ms.

4. **Mantenha dependências primitivas e estáveis:** evite passar objetos ou funções recriados a cada render para o array de dependências do `useEffect` (como vimos na etapa 2).

### Juntando tudo: exemplo completo em React + TypeScript

Substitua `src/App.tsx` pelo exemplo abaixo. Ele reúne todos os conceitos do capítulo 27 em cima da base dos capítulos 24, 25 e 26: `useEffect` com dependência primitiva, cancelamento real com `AbortController`, validação na fronteira (`unknown`), estados de carregamento/erro/vazio com acessibilidade, botão de **Tentar novamente** e filtro local derivado sem requisições extras:

```tsx
import { useEffect, useState } from "react";

interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

type FiltroLocal = "todas" | "pendentes" | "concluidas";

type StatusTarefas =
  | { readonly tipo: "carregando" }
  | { readonly tipo: "sucesso"; readonly tarefas: readonly Tarefa[] }
  | { readonly tipo: "erro"; readonly mensagem: string };

const API_BASE = "https://jsonplaceholder.typicode.com";

const OPCOES_FILTRO: readonly {
  readonly valor: FiltroLocal;
  readonly rotulo: string;
}[] = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

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

async function buscarTarefasDoUsuario(
  usuarioId: number,
  simularErro: boolean,
  signal: AbortSignal,
): Promise<readonly Tarefa[]> {
  const caminho = simularErro ? "/todos-inexistente" : "/todos";
  const url = new URL(caminho, API_BASE);
  url.searchParams.set("userId", String(usuarioId));
  url.searchParams.set("_limit", "6");

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal,
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
  const [usuarioId, setUsuarioId] = useState(1);
  const [simularErro, setSimularErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [filtroLocal, setFiltroLocal] = useState<FiltroLocal>("todas");
  const [status, setStatus] = useState<StatusTarefas>({ tipo: "carregando" });

  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      setStatus({ tipo: "carregando" });

      try {
        const tarefas = await buscarTarefasDoUsuario(
          usuarioId,
          simularErro,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setStatus({ tipo: "sucesso", tarefas });
        }
      } catch (erro: unknown) {
        if (controller.signal.aborted) {
          return;
        }

        const mensagem =
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as tarefas.";
        setStatus({ tipo: "erro", mensagem });
      }
    }

    void carregar();

    return () => {
      controller.abort();
    };
  }, [usuarioId, simularErro, tentativa]);

  // Estado derivado: filtrar dados já carregados NÃO precisa de useEffect nem de fetch
  const tarefasVisiveis =
    status.tipo === "sucesso"
      ? status.tarefas.filter((tarefa) => {
          if (filtroLocal === "pendentes") return !tarefa.concluida;
          if (filtroLocal === "concluidas") return tarefa.concluida;
          return true;
        })
      : [];

  return (
    <main>
      <h1>Tarefas sincronizadas — Usuário {usuarioId}</h1>

      <section aria-label="Seleção de usuário">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={usuarioId === id}
            onClick={() => setUsuarioId(id)}
          >
            Usuário {id}
          </button>
        ))}
      </section>

      <label>
        <input
          type="checkbox"
          checked={simularErro}
          onChange={(event) => setSimularErro(event.target.checked)}
        />{" "}
        Simular falha (HTTP 404)
      </label>

      <section aria-label="Filtro local">
        {OPCOES_FILTRO.map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            aria-pressed={filtroLocal === opcao.valor}
            onClick={() => setFiltroLocal(opcao.valor)}
          >
            {opcao.rotulo}
          </button>
        ))}
      </section>

      {status.tipo === "carregando" && (
        <p role="status">Carregando tarefas do usuário {usuarioId}...</p>
      )}

      {status.tipo === "erro" && (
        <div>
          <p role="alert">{status.mensagem}</p>
          <button
            type="button"
            onClick={() => setTentativa((atual) => atual + 1)}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {status.tipo === "sucesso" &&
        (tarefasVisiveis.length === 0 ? (
          <p>Nenhuma tarefa corresponde ao filtro atual.</p>
        ) : (
          <ul>
            {tarefasVisiveis.map((tarefa) => (
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

Repare no estado `tentativa`: o efeito não lê o valor dele, mas ele está no array de dependências de propósito. Clicar em **Tentar novamente** soma 1 a `tentativa`, a dependência muda e o React executa o efeito outra vez — uma forma simples de repetir a busca sem duplicar a lógica do `fetch` em um *event handler*.

### Limitações honestas do `useEffect` para dados remotos

Entender `useEffect` + `AbortController` é fundamental para dominar como React sincroniza estado com a rede. Ao mesmo tempo, vale conhecer desde já seus limites práticos em aplicações maiores:

- **Sem cache em memória:** se a pessoa visita o Usuário 1, vai para o Usuário 2 e volta ao Usuário 1, o componente refaz a requisição inteira do zero.
- **Sem deduplicação:** se dois componentes na mesma página precisarem do mesmo endpoint, cada um dispara seu próprio `fetch` se não houver coordenação.
- **Mais código repetitivo:** repetir `controller`, `status`, `try/catch` e validação em dezenas de telas cresce rápido.

Por isso, conforme a aplicação amadurece, primeiro extraímos lógica repetida em **hooks personalizados** (capítulo 68) e depois avaliamos camadas dedicadas de **cache e sincronização de dados** (capítulo 69).

**Experimente:**
1. Abra a aba **Network** do DevTools (se quiser ver o cancelamento com ainda mais clareza, selecione temporariamente *3G* (chamado *Slow 3G* em versões antigas do Chrome) no seletor de velocidade da aba Network). Clique rapidamente em **Usuário 1 → Usuário 2 → Usuário 3** e observe as requisições anteriores marcadas como **canceled**, sem exibir mensagem de erro na tela.
2. Volte a velocidade para *No throttling*, alterne os botões de filtro (**Todas / Pendentes / Concluídas**) e confirme na aba **Network** que **nenhuma** requisição nova é disparada.
3. Marque **Simular falha (HTTP 404)** para ver o estado de erro com `role="alert"`. Desmarque a caixa (ou clique em **Tentar novamente**) e confirme a recuperação.
4. Recarregue a página em desenvolvimento e note na aba **Network** que o `StrictMode` dispara e cancela a primeira requisição antes da segunda — provando que sua limpeza com `AbortController` funcionou.

## Ao terminar

Antes de avançar para o capítulo 28, confira se você consegue explicar:

- a diferença entre código de renderização, *event handlers* e `useEffect`, em que momento o efeito executa e por que o callback passado ao `useEffect` não deve ser `async` diretamente;
- a diferença entre omitir o array de dependências, passar `[]` e passar `[dep1, dep2]`, e por que colocar objetos ou funções recriados a cada render nas dependências causa requisições repetidas ou loops infinitos;
- quando a função de limpeza roda, por que o `StrictMode` executa efeitos duas vezes em desenvolvimento, como acontecem respostas fora de ordem (*race conditions*) e como a flag `ignorado` e o `AbortController` resolvem o problema (incluindo por que cancelamentos não devem virar mensagem de erro na tela);
- quando **não** usar `useEffect` (estado derivado de dados já carregados e mutações como `POST` disparadas por interação) e como evitar requisições desnecessárias em campos de busca usando envio explícito ou *debounce* com `clearTimeout`.
