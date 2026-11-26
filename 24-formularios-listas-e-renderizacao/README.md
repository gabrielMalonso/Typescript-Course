# Capítulo 24 — Formulários, listas e renderização

**Objetivo:** renderizar coleções dinâmicas com `map` e `key`, controlar o que aparece na tela com renderização condicional e construir formulários acessíveis com inputs controlados, envio e validação local. Ao final, você será capaz de estruturar interfaces que filtram, removem e cadastram itens com clareza, representando explicitamente estados de vazio, sucesso e erro.

No capítulo 23, você elevou o estado para `App`, derivou o resumo e manteve a lista atualizada de forma imutável — mas ainda escreveu `tarefas[0]` e `tarefas[1]` à mão, sem poder adicionar ou remover itens. No capítulo 20, você já criou formulários HTML com `<label>` e interceptou o envio com `preventDefault()`. Agora vamos unir essas duas partes no modelo declarativo do React.

**Percurso:** renderização condicional → listas dinâmicas com `map` e `key` → inputs controlados e envio de formulário → validação local, acessibilidade e estados de vazio, sucesso e erro. Em cada etapa, leia o recorte oficial indicado e use as explicações curtas para conectá-lo ao TypeScript que você já domina. Os desafios e aprofundamentos da documentação são opcionais e ficam fora deste percurso.

**Escopo:** trabalharemos com dados em memória e validação local no navegador. Operações assíncronas (`Promise`, `async`/`await`) entram no capítulo 25; envio para APIs com `fetch` e validação de dados externos, no 26; `useEffect`, no 27; testes automatizados, no 28; e validação de confiança no servidor, no capítulo 30.

## 1. Renderização condicional: mostrar o que o estado exige

### O problema: decidir o que entra na tela sem manipular o DOM

No JavaScript imperativo, mostrar ou esconder um aviso costumava exigir buscar o elemento e trocar uma classe ou `style.display`. Em React, a tela é uma função do estado atual: em vez de esconder manualmente um nó do DOM, decidimos no próprio JSX quais elementos devem existir naquela renderização.

Isso resolve situações muito comuns em interfaces reais: exibir um aviso quando a lista está vazia, trocar o texto de um botão conforme o estado, ou mostrar uma mensagem de sucesso ou erro após uma ação.

### Leitura principal

Em [Conditional Rendering — React](https://react.dev/learn/conditional-rendering#conditionally-returning-jsx), leia **Conditionally returning JSX**, **Conditionally returning nothing with `null`**, **Conditionally including JSX**, **Conditional (ternary) operator (`? :`)** e **Logical AND operator (`&&`)** (incluindo o aviso **Pitfall** sobre números à esquerda do `&&`). Pule o aprofundamento **Are these two examples fully equivalent?**, a seção **Conditionally assigning JSX to a variable** e os desafios finais.

### Escolher a forma certa e evitar estados contraditórios

Os exemplos deste guia continuam usando a **agenda de leitura**. Para executá-los, use um projeto Vite com template `react-ts` (como o laboratório já montado nos capítulos 22 e 23) e substitua o conteúdo de `src/App.tsx` por um exemplo de cada vez:

```tsx
import { useState } from "react";

type StatusInscricao =
  | { readonly tipo: "ocioso" }
  | { readonly tipo: "sucesso"; readonly mensagem: string }
  | { readonly tipo: "erro"; readonly mensagem: string };

export default function App() {
  const [vagas, setVagas] = useState(1);
  const [status, setStatus] = useState<StatusInscricao>({ tipo: "ocioso" });

  function handleReservar() {
    if (vagas === 0) {
      setStatus({
        tipo: "erro",
        mensagem: "Não há mais vagas disponíveis para este encontro.",
      });
      return;
    }

    setVagas((atual) => atual - 1);
    setStatus({
      tipo: "sucesso",
      mensagem: "Sua vaga foi reservada.",
    });
  }

  return (
    <main>
      <h1>Encontro de leitura</h1>
      <p>
        {vagas > 0
          ? `Restam ${vagas} vaga(s).`
          : "Turma lotada no momento."}
      </p>

      <button type="button" onClick={handleReservar}>
        Reservar vaga
      </button>

      {status.tipo === "erro" && <p role="alert">{status.mensagem}</p>}
      {status.tipo === "sucesso" && <p role="status">{status.mensagem}</p>}
    </main>
  );
}
```

Conecte o exemplo ao que você já conhece de TypeScript e JavaScript:

1. **Três recursos conhecidos:** dentro de `{ }`, o operador ternário (`condicao ? a : b`) escolhe entre duas saídas; o operador `&&` exibe um trecho apenas quando a condição é verdadeira (e não renderiza nada quando ela é `false`); e um `if (...) return ...` antes do `return` principal continua útil quando o componente inteiro precisa devolver outra estrutura — ou `null` para não renderizar nada.
2. **A armadilha do `0` com `&&`:** em JSX, `false`, `null` e `undefined` não aparecem na tela, mas o número `0` **aparece como texto**. Se você escrever `{vagas && <p>Há vagas</p>}` quando `vagas` vale `0`, o React imprime `0` na página. Por isso, sempre transforme o lado esquerdo do `&&` em booleano explícito: `{vagas > 0 && ...}`.
3. **Unions discriminadas impedem estados impossíveis:** lembre-se do capítulo 17. Se criássemos dois estados separados (`erro` e `sucesso`), um esquecimento poderia deixar ambos visíveis ao mesmo tempo. Com `StatusInscricao`, o componente só pode estar em **um** estado por vez (`ocioso`, `sucesso` ou `erro`), e o TypeScript só permite acessar `status.mensagem` depois de verificar `status.tipo`.
4. **O que a renderização condicional abstrai e seus limites:** React cria e remove automaticamente os nós do DOM quando a condição muda. Atenção a um efeito importante: quando um componente deixa de ser renderizado e volta depois, ele é **desmontado e montado novamente**, perdendo qualquer estado local que guardava dentro de si.

**Experimente:** no exemplo acima, adicione temporariamente `{vagas && <p>Inscrições abertas</p>}` e clique em **Reservar vaga** até zerar as vagas. Veja o `0` aparecer na página. Corrija para `{vagas > 0 && <p>Inscrições abertas</p>}` e confirme que o `0` desaparece.

## 2. Listas dinâmicas com `map`, `filter` e `key`

### O problema: coleções mudam de tamanho

No final do capítulo 23, escrevemos `<CartaoSessao sessao={sessoes[0]} ... />` e `<CartaoSessao sessao={sessoes[1]} ... />` explicitamente. Essa abordagem deixa de funcionar assim que a coleção tem zero itens, dez itens ou muda com filtros, inserções e remoções.

No capítulo 9, você já usou `.filter()` para selecionar registros e `.map()` para transformar cada elemento de um array em outro valor. Em React, fazemos exatamente a mesma transformação: um array de dados vira um array de elementos JSX.

### Leitura principal

Em [Rendering Lists — React](https://react.dev/learn/rendering-lists#rendering-data-from-arrays), leia **Rendering data from arrays**, **Filtering arrays of items** (incluindo o aviso **Pitfall** sobre arrow functions com `{}`), **Keeping list items in order with `key`**, **Where to get your `key`**, **Rules of keys** e **Why does React need keys?** (incluindo o **Pitfall** sobre índice e `Math.random()`). Pule o aprofundamento **Displaying several DOM nodes for each list item** e os desafios finais.

### Identidade estável com `key` e filtragem derivada

Substitua `App.tsx` por este exemplo, que combina `filter`, `map`, `key` e estado vazio:

```tsx
import { useState } from "react";

interface Sessao {
  readonly id: number;
  readonly tema: string;
  readonly confirmada: boolean;
}

type FiltroSessao = "todas" | "confirmadas" | "pendentes";

const SESSOES_INICIAIS: readonly Sessao[] = [
  { id: 1, tema: "Contos brasileiros", confirmada: false },
  { id: 2, tema: "Poesia contemporânea", confirmada: true },
  { id: 3, tema: "Crônicas urbanas", confirmada: false },
];

export default function App() {
  const [sessoes, setSessoes] = useState<readonly Sessao[]>(SESSOES_INICIAIS);
  const [filtro, setFiltro] = useState<FiltroSessao>("todas");

  function handleAlternar(id: number) {
    setSessoes((atual) =>
      atual.map((sessao) =>
        sessao.id === id
          ? { ...sessao, confirmada: !sessao.confirmada }
          : sessao,
      ),
    );
  }

  function handleRemover(id: number) {
    setSessoes((atual) => atual.filter((sessao) => sessao.id !== id));
  }

  const sessoesVisiveis = sessoes.filter((sessao) => {
    if (filtro === "confirmadas") return sessao.confirmada;
    if (filtro === "pendentes") return !sessao.confirmada;
    return true;
  });

  return (
    <main>
      <h1>Agenda de leitura</h1>

      <div>
        <button
          type="button"
          aria-pressed={filtro === "todas"}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          type="button"
          aria-pressed={filtro === "pendentes"}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>
        <button
          type="button"
          aria-pressed={filtro === "confirmadas"}
          onClick={() => setFiltro("confirmadas")}
        >
          Confirmadas
        </button>
      </div>

      {sessoesVisiveis.length === 0 ? (
        <p>
          {sessoes.length === 0
            ? "Nenhuma sessão cadastrada ainda."
            : "Nenhuma sessão corresponde ao filtro selecionado."}
        </p>
      ) : (
        <ul>
          {sessoesVisiveis.map((sessao) => (
            <li key={sessao.id}>
              <span>
                {sessao.tema} — {sessao.confirmada ? "Confirmada" : "Pendente"}
              </span>{" "}
              <button type="button" onClick={() => handleAlternar(sessao.id)}>
                Alternar
              </button>{" "}
              <button type="button" onClick={() => handleRemover(sessao.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

Observe os detalhes que conectam dados, renderização e desempenho:

- **Filtragem como estado derivado:** não criamos outro `useState` para `sessoesVisiveis`. Guardamos a fonte de verdade (`sessoes`) e o critério escolhido (`filtro`), e calculamos `sessoesVisiveis` na renderização. Trocar de filtro nunca apaga os dados originais.
- **Onde vai a `key`:** a prop `key` fica no elemento mais externo devolvido diretamente dentro do `.map(...)` — aqui, no `<li>` (ou no componente `<CartaoSessao key={sessao.id} ... />` quando extraímos o item). O componente filho **não** recebe `key` em `props`; se ele precisar do identificador, passe `id` ou o objeto `sessao` em outra prop.
- **Por que não usar o índice do array nem `Math.random()`:** quando o item `0` é removido, o antigo item `1` passa a ser o `0`. Se a `key` fosse o índice, React acreditaria que o primeiro elemento permaneceu e que o último sumiu — podendo reaproveitar nós do DOM errados e misturar foco ou estado interno entre itens. Já `Math.random()` troca todas as chaves a cada renderização, forçando React a destruir e recriar toda a lista. Use sempre um `id` estável vindo dos dados (único entre irmãos daquela lista).
- **Estado vazio significativo:** quando não há itens a mostrar, evitamos renderizar um `<ul>` vazio e informamos à pessoa se a lista inteira está vazia ou se apenas o filtro atual não encontrou correspondências.
- **Custos e limitações:** `filter` e `map` percorrem a lista a cada renderização — custo **O(n)** em tempo e memória para os novos arrays. A `key` permite ao React reconciliar e atualizar apenas os nós que realmente mudaram no DOM, mas em listas com milhares de itens ainda há custo de renderização (técnicas para listas grandes entram no capítulo 70).

**Experimente:** remova temporariamente `key={sessao.id}` do `<li>` e abra o Console do navegador para ver o aviso do React. Restaure a `key`, filtre por **Confirmadas** e remova a sessão confirmada para observar a transição para o estado vazio.

## 3. Inputs controlados e envio de formulário

### O problema: ler o que a pessoa digita sem perder a fonte de verdade

No capítulo 20, você deixou o navegador guardar o texto dentro do `<input>` e só o leu no evento `submit` usando `querySelector` e `.value`. Em React, muitas vezes precisamos reagir ao valor enquanto a pessoa digita, limpar o campo após enviar, desabilitar ações ou exibir mensagens conforme o estado atual.

Quando o estado React guarda o valor do campo e o repassa de volta pela prop `value`, temos um **input controlado**.

### Leitura principal

Em [`<input>` — React](https://react.dev/reference/react-dom/components/input#providing-a-label-for-an-input), leia **Providing a label for an input** e depois avance para [**Controlling an input with a state variable**](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) (incluindo o **Pitfall**). Na seção **Troubleshooting**, leia apenas **My text input doesn’t update when I type into it** e **I’m getting an error: “A component is changing an uncontrolled input to be controlled”**. Pule **Reading the input values when submitting a form**, **Optimizing re-rendering on every keystroke** e o restante da página.

Se quiser revisar a tipagem de eventos de entrada, releia [Using TypeScript — DOM Events](https://react.dev/learn/typescript#typing-dom-events).

### O ciclo do input controlado e o envio do `<form>`

```text
Estado React (tema = "Po")
        │
        ▼ prop value={tema}
  <input value="Po" />
        │ pessoa digita "e"
        ▼ dispara onChange(event)
  setTema(event.target.value)  ──► "Poe"
        │
        ▼ nova renderização com value="Poe"
```

Teste este exemplo em `src/App.tsx`:

```tsx
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

interface Sessao {
  readonly id: number;
  readonly tema: string;
  readonly formato: "Presencial" | "Online";
}

type FormatoSessao = Sessao["formato"];

export default function App() {
  const [sessoes, setSessoes] = useState<readonly Sessao[]>([
    { id: 1, tema: "Contos brasileiros", formato: "Presencial" },
  ]);
  const [proximoId, setProximoId] = useState(2);
  const [tema, setTema] = useState("");
  const [formato, setFormato] = useState<FormatoSessao>("Presencial");

  function handleTemaChange(event: ChangeEvent<HTMLInputElement>) {
    setTema(event.target.value);
  }

  function handleFormatoChange(event: ChangeEvent<HTMLSelectElement>) {
    const valor = event.target.value;
    if (valor === "Presencial" || valor === "Online") {
      setFormato(valor);
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const temaLimpo = tema.trim();
    if (temaLimpo === "") {
      return;
    }

    const novaSessao: Sessao = {
      id: proximoId,
      tema: temaLimpo,
      formato,
    };

    setSessoes((atual) => [...atual, novaSessao]);
    setProximoId((atual) => atual + 1);
    setTema("");
    setFormato("Presencial");
  }

  return (
    <main>
      <h1>Agenda de leitura</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="campo-tema">Tema da sessão</label>
          <input
            id="campo-tema"
            type="text"
            value={tema}
            onChange={handleTemaChange}
          />
        </div>

        <div>
          <label htmlFor="campo-formato">Formato</label>
          <select
            id="campo-formato"
            value={formato}
            onChange={handleFormatoChange}
          >
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <button type="submit">Adicionar sessão</button>
      </form>

      <ul>
        {sessoes.map((sessao) => (
          <li key={sessao.id}>
            {sessao.tema} ({sessao.formato})
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Pontos importantes do código acima:

1. **Controlado × não controlado:** se você passa `value={tema}` sem `onChange`, o campo fica travado porque React sempre restaura o valor do estado. E se `tema` começasse como `undefined` e depois virasse `string`, o input mudaria de não controlado para controlado — inicialize campos de texto sempre com `""`. (Em `<input type="checkbox">`, o par controlado é `checked` e `event.target.checked`.)
2. **`htmlFor` em JSX:** no HTML do capítulo 20 usamos `<label for="campo-tema">`. Como `for` é palavra reservada de JavaScript/TypeScript, em JSX o atributo se chama **`htmlFor`**. Ele continua conectando o rótulo ao `id` do campo para cliques e leitores de tela.
3. **`onSubmit` no `<form>` e `event.preventDefault()`:** colocar o envio no `<form>` com um `<button type="submit">` faz o envio funcionar tanto clicando no botão quanto pressionando `Enter` dentro do campo. Chamar `event.preventDefault()` impede que o navegador recarregue a página e apague o estado em memória.
4. **Tipagem dos eventos sem casts:** `ChangeEvent<HTMLInputElement>` e `ChangeEvent<HTMLSelectElement>` entregam `event.target.value` como `string`. No `<select>`, como `event.target.value` é `string`, estreitamos com `if (valor === "Presencial" || valor === "Online")` em vez de usar `as`. Para `onSubmit`, usamos `SubmitEvent<HTMLFormElement>` (nos tipos atuais do React 19; em projetos ou tutoriais mais antigos com `@types/react` anterior à versão 19.2, você ainda verá `FormEvent<HTMLFormElement>`).
5. **ID estável sem usar `sessoes.length + 1`:** se você tiver itens `1` e `2`, remover o `1` e criar o próximo com `length + 1`, o novo item receberia `id: 2` — duplicando a `key`! Manter um contador crescente (`proximoId`) ou gerar um identificador único (como `crypto.randomUUID()` em string) evita colisões.
6. **O que o input controlado abstrai, custos e limites:** React mantém o valor exibido sincronizado com o estado e facilita limpar, transformar ou validar o campo. Por outro lado, **cada tecla digitada** dispara `setState` e re-renderiza o componente dono desse estado e seus filhos. Por isso, vale isolar o formulário em um componente próprio (`FormularioSessao`): assim, digitar nele não re-renderiza a lista inteira a cada caractere.

**Experimente:**
1. Remova temporariamente `onChange={handleTemaChange}` do `<input>` e tente digitar nele. Restaure em seguida.
2. Remova temporariamente `event.preventDefault()` de `handleSubmit`, digite um tema e aperte `Enter`: observe a página recarregar e a lista voltar ao início. Restaure a linha.

## 4. Validação local, acessibilidade e estados de vazio, sucesso e erro

### O problema: feedback claro para quem enxerga a tela e para quem usa teclado ou leitor de tela

No exemplo da etapa 3, tentar enviar um tema vazio simplesmente não fazia nada — quem usa a página fica sem saber se o botão travou ou o que faltou preencher. Além disso, mostrar apenas uma borda vermelha não explica o erro nem alcança quem navega com leitor de tela.

Precisamos validar os dados no envio, preservar o que a pessoa digitou quando houver erro, limpar o campo apenas quando der certo e anunciar o resultado de forma acessível.

### Leitura principal

Em [Client-side form validation — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#what_is_form_validation), leia **What is form validation?** (atente ao aviso de que validação no navegador não substitui validação no servidor) e **Different types of client-side validation**. Pare antes de **Using built-in form validation**; faremos nossa validação controlada em TypeScript.

Em [User Notifications — W3C/WAI](https://www.w3.org/WAI/tutorials/forms/notifications/#inline), leia **In-line feedback** e **After submit**. Pare antes de **During typing**; pule **Overall feedback**.

Para conferir os atributos ARIA usados na associação e anúncio das mensagens, consulte apenas a seção **Description** de [`aria-invalid` — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid#description), [`aria-describedby` — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby#description) e [`aria-live` — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live#description) (incluindo **Choosing the `aria-live` value**).

### Juntando tudo: formulário isolado, validação pura e feedback acessível

Substitua `App.tsx` por este exemplo completo, que reúne todos os conceitos do capítulo:

```tsx
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

interface Sessao {
  readonly id: number;
  readonly tema: string;
}

type StatusFormulario =
  | { readonly tipo: "ocioso" }
  | { readonly tipo: "erro"; readonly mensagem: string }
  | { readonly tipo: "sucesso"; readonly mensagem: string };

function validarTema(
  valor: string,
  temasExistentes: readonly string[],
): string | null {
  const limpo = valor.trim();

  if (limpo === "") {
    return "Informe um tema para a sessão.";
  }

  if (limpo.length < 3) {
    return "O tema deve ter pelo menos 3 caracteres.";
  }

  const jaExiste = temasExistentes.some(
    (existente) => existente.trim().toLowerCase() === limpo.toLowerCase(),
  );

  if (jaExiste) {
    return "Já existe uma sessão cadastrada com esse tema.";
  }

  return null;
}

interface FormularioSessaoProps {
  temasExistentes: readonly string[];
  onAdicionar: (tema: string) => void;
}

function FormularioSessao({
  temasExistentes,
  onAdicionar,
}: FormularioSessaoProps) {
  const [tema, setTema] = useState("");
  const [status, setStatus] = useState<StatusFormulario>({ tipo: "ocioso" });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTema(event.target.value);
    if (status.tipo !== "ocioso") {
      setStatus({ tipo: "ocioso" });
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const erro = validarTema(tema, temasExistentes);
    if (erro !== null) {
      setStatus({ tipo: "erro", mensagem: erro });
      return;
    }

    const temaLimpo = tema.trim();
    onAdicionar(temaLimpo);
    setTema("");
    setStatus({
      tipo: "sucesso",
      mensagem: `Sessão "${temaLimpo}" adicionada à agenda.`,
    });
  }

  const temErro = status.tipo === "erro";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="tema-sessao">Novo tema</label>
        <input
          id="tema-sessao"
          type="text"
          value={tema}
          onChange={handleChange}
          aria-invalid={temErro}
          aria-describedby={temErro ? "erro-tema-sessao" : undefined}
        />
      </div>

      {status.tipo === "erro" && (
        <p id="erro-tema-sessao" role="alert">
          {status.mensagem}
        </p>
      )}

      {status.tipo === "sucesso" && (
        <p role="status">{status.mensagem}</p>
      )}

      <button type="submit">Adicionar sessão</button>
    </form>
  );
}

export default function App() {
  const [sessoes, setSessoes] = useState<readonly Sessao[]>([]);
  const [proximoId, setProximoId] = useState(1);

  function handleAdicionarSessao(tema: string) {
    setSessoes((atual) => [...atual, { id: proximoId, tema }]);
    setProximoId((atual) => atual + 1);
  }

  function handleRemoverSessao(id: number) {
    setSessoes((atual) => atual.filter((sessao) => sessao.id !== id));
  }

  const temasExistentes = sessoes.map((sessao) => sessao.tema);

  return (
    <main>
      <h1>Agenda de leitura</h1>

      <FormularioSessao
        temasExistentes={temasExistentes}
        onAdicionar={handleAdicionarSessao}
      />

      {sessoes.length === 0 ? (
        <p>Nenhuma sessão cadastrada ainda. Use o formulário acima para começar.</p>
      ) : (
        <ul>
          {sessoes.map((sessao) => (
            <li key={sessao.id}>
              <span>{sessao.tema}</span>{" "}
              <button
                type="button"
                onClick={() => handleRemoverSessao(sessao.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

Observe como quatro decisões deixam esse fluxo claro e acessível:

1. **Regra de validação pura fora do JSX:** `validarTema` recebe apenas strings e devolve `string | null`. Ela não depende do DOM nem do React, facilita a leitura e poderá receber testes diretos no capítulo 28.
2. **Associação explícita entre campo e erro:** `aria-invalid={temErro}` sinaliza que o campo tem um problema; `aria-describedby="erro-tema-sessao"` liga o `<input>` ao parágrafo que explica o erro; e `role="alert"` anuncia a falha imediatamente em tecnologias assistivas. Já `role="status"` (equivalente a `aria-live="polite"`) anuncia o sucesso sem interromper abruptamente a leitura atual.
3. **Respeito ao trabalho de quem digita:** quando há erro, o texto continua no `<input>` para ser corrigido. Só limpamos o campo quando o envio é válido, e limpamos o feedback antigo assim que a pessoa volta a digitar. O atributo `noValidate` no `<form>` evita que balões nativos do navegador disputem espaço com nossas mensagens controladas.
4. **Limite importante da validação local:** validar no navegador oferece resposta instantânea e boa usabilidade, mas **não protege dados nem regras críticas**. Qualquer pessoa pode inspecionar a página ou enviar dados diretamente a uma API sem passar pelo formulário. Quando construirmos o backend no capítulo 30, validaremos toda entrada novamente no servidor.

**Experimente:** teste no navegador (inclusive usando apenas `Tab`, `Enter` e o inspetor de elementos) enviar o formulário vazio, com espaços em branco, com menos de 3 caracteres e com um tema duplicado. Observe `aria-invalid`, `aria-describedby` e as mensagens com `role="alert"` e `role="status"` mudando conforme o estado.

## Ao terminar

Antes de avançar para o capítulo 25, confira se você consegue explicar:

- por que `{contagem && <p>...</p>}` pode imprimir `0` na tela e como evitar isso;
- por que a `key` precisa vir de um identificador estável em vez do índice do array ou de `Math.random()`;
- o que diferencia um input controlado de um não controlado, e por que isolar o estado do formulário no próprio componente evita re-renderizações desnecessárias na lista;
- como associar rótulos e mensagens de erro de forma acessível (`htmlFor`, `aria-invalid`, `aria-describedby`, `role="alert"`, `role="status"`) e por que validação no navegador não substitui validação no servidor.
