# Capítulo 28 — Debugging e primeiros testes

**Objetivo:** investigar e corrigir falhas de forma sistemática (reproduzindo o bug, lendo *stack traces*, usando o DevTools com `debugger`, *breakpoints* e *stepping* e consultando documentação oficial com critério) e escrever os primeiros testes automatizados em TypeScript e React — cobrindo funções puras, componentes, interações do usuário e fluxos assíncronos com falha de API, sempre focando no comportamento visível.

Nos capítulos 24 a 27, você construiu formulários acessíveis, listas dinâmicas, chamadas HTTP reais com `fetch` e sincronização com `useEffect` e `AbortController`. Conforme a interface ganha mais estados e interações, dois hábitos param de escalar: **tentar adivinhar bugs alterando o código às cegas** e **testar tudo clicando na mão a cada mudança**. Este capítulo encerra o Bloco 3 trazendo as duas habilidades que fecham o ciclo de desenvolvimento de qualquer aplicação: **diagnosticar defeitos com evidência** e **verificar comportamento automaticamente**.

**Percurso:** reproduzir bugs, ler *stack traces* e consultar documentação → DevTools na prática (`debugger`, *breakpoints* e *stepping*) → primeiros testes de funções puras com Vitest → testes de componentes React e interações pelo comportamento visível → testes de fluxos assíncronos e falha de API. Em cada etapa, leia o recorte oficial indicado e use as explicações e exemplos para conectar o método ao TypeScript e ao React que você já domina.

**Escopo:** trabalharemos com debugging no navegador (DevTools) e testes automatizados de funções e componentes React no projeto Vite (`Vitest`, `jsdom`, `React Testing Library` e `@testing-library/user-event`). Testes de integração com backend e banco descartável entram no capítulo 33; estratégia completa de testes (unitários, integração, contrato, ponta a ponta, TDD e limites de *mocking*), no capítulo 57; logs estruturados, métricas, *traces* e *profiling*, no capítulo 60; testes de jornadas com múltiplas rotas e controle de acesso, no capítulo 69; e medição de performance de renderização no frontend, no capítulo 70.

## 1. Reproduzir bugs, ler *stack traces* e consultar documentação

### O problema: chutar correções às cegas cria novos bugs

Quando uma página quebra ou mostra um número errado, o impulso mais comum é mudar uma linha de código "para ver se resolve". Mesmo quando o sintoma desaparece por acaso, você não sabe **por que** ele acontecia — e o defeito costuma voltar de outra forma.

Depurar (*debug*) é um processo de investigação com evidência. Ele começa antes mesmo de abrir o editor: primeiro você precisa conseguir **provocar o problema sob demanda**, ler o que o runtime já informou no erro e, quando uma API se comportar de forma inesperada, consultar a fonte oficial em vez de supor.

### Leitura principal

Em [What went wrong? Troubleshooting JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong#types_of_error), leia **Types of error** (a diferença entre erro de sintaxe e erro de lógica) e **Fixing errors reported in the console** (note como o erro aponta o arquivo e a linha). Pule o restante do tutorial do jogo.

Em [`Error.prototype.stack` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack#value), leia apenas **Value** e **Description** para entender o formato de um *stack trace*. Pule **Examples** e **Browser compatibility**.

### O ciclo de investigação e como ler um *stack trace*

Antes de editar qualquer linha, siga este ciclo curto:

```text
1. Reproduzir ──► passos mínimos e repetíveis que sempre provocam o bug
       │
       ▼
2. Formular hipótese ──► o que você espera que aconteça vs. o que realmente acontece?
       │
       ▼
3. Observar estado real ──► stack trace, Network, Elements ou breakpoint no DevTools
       │
       ▼
4. Corrigir e confirmar ──► alterar a causa raiz e validar (de preferência com um teste)
```

Quando o JavaScript lança uma exceção não tratada, o navegador (ou o Node) imprime o **tipo do erro**, a **mensagem** e o ***stack trace*** — o retrato da **pilha de chamadas** (*call stack*, a mesma pilha que você conheceu em recursão no capítulo 15) no instante exato em que a falha ocorreu:

```text
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
    at formatarRotulo (src/agenda.ts:14:22)          ← 1. onde o erro estourou
    at montarResumo (src/agenda.ts:24:18)            ← 2. quem chamou formatarRotulo
    at App (src/App.tsx:41:20)                       ← 3. componente que chamou montarResumo
    at renderWithHooks (node_modules/react-dom/...)  ← 4. código interno da biblioteca
```

Leia o *stack trace* sempre com três passos:

1. **Comece pelo título do erro:** `TypeError` indica operação sobre um tipo incompatível (aqui, tentar ler `.toUpperCase` de `undefined`). `ReferenceError` aponta variável inexistente; `SyntaxError` costuma surgir em código malformado ou `JSON.parse` de texto inválido (capítulo 26).
2. **Procure o primeiro *frame* do seu código (`src/...`), de cima para baixo:** o topo mostra onde o programa quebrou, mas a **causa** muitas vezes está um ou dois degraus abaixo (por exemplo, `montarResumo` passou um item inexistente para `formatarRotulo`). Frames de `node_modules/` raramente são o bug — eles apenas mostram que React ou o navegador estavam executando sua função.
3. **Entenda o que os *source maps* fazem por você:** o navegador executa JavaScript gerado pelo Vite, mas graças aos ***source maps*** em desenvolvimento, o Console e o painel Sources traduzem a linha do JS compilado de volta para o arquivo e linha originais em `.ts`/`.tsx`.

### Como consultar documentação oficial sem se perder

Grande parte do trabalho real de engenharia envolve ler documentação (MDN, React, TypeScript, Vitest, Testing Library) para confirmar um comportamento exato. Você não precisa — nem deve — ler páginas inteiras de referência de ponta a ponta. Use um roteiro objetivo:

| Passo | O que procurar na página | Exemplo prático |
|---|---|---|
| **1. Confirmar contexto** | A API é do navegador, do Node, do React ou da biblioteca? A versão bate com o projeto? | `fetch` existe no navegador e no Node 18+; `useEffect` é do React. |
| **2. Ler assinatura e contrato** | Quais parâmetros recebe, o que retorna e quais valores especiais devolve? | `fetch` retorna `Promise<Response>` e **não** rejeita em HTTP `404`/`500`. |
| **3. Checar erros e *Pitfalls*** | Quando lança exceção? Quais avisos (*Pitfall* / *Warning*) a página destaca? | `new URL(...)` lança `TypeError` sem protocolo; `JSON.parse` lança `SyntaxError`. |
| **4. Isolar um exemplo mínimo** | Testar o trecho menor possível no TypeScript Pad, Node ou componente isolado. | Reproduzir a dúvida em 10 linhas antes de mexer em uma tela inteira. |

**Experimente:** rode o trecho abaixo no **TypeScript Pad** ou no Node e leia o `stack` impresso de cima para baixo, identificando onde a exceção ocorreu e quem passou o valor problemático:

```ts
function normalizarTitulo(titulo: string): string {
  return titulo.trim().toUpperCase();
}

function resumirPrimeiraTarefa(titulos: readonly string[]): string {
  // Bug proposital: assume que o array sempre tem pelo menos um item
  const primeiro = titulos[0];
  return normalizarTitulo(primeiro);
}

try {
  console.log(resumirPrimeiraTarefa([]));
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.error("Mensagem:", erro.message);
    console.error("Stack trace:\n", erro.stack);
  }
}
```

Note também um detalhe importante de TypeScript: `titulos[0]` tem tipo `string` na configuração padrão, mesmo quando o array está vazio (sem `noUncheckedIndexedAccess`). O *stack trace* aponta `normalizarTitulo`, mas a causa raiz está em `resumirPrimeiraTarefa` não verificar `titulos.length === 0`.

## 2. DevTools na prática: `debugger`, *breakpoints* e *stepping*

### O problema: quando `console.log` não basta

Colocar um `console.log` rápido ajuda em checagens simples, mas logo mostra seus limites: exige editar e salvar o arquivo a cada nova variável que você quer ver, polui o console dentro de loops e não deixa avançar o programa linha por linha para ver **o instante exato** em que um valor muda.

O depurador embutido no navegador (**DevTools → Sources**) permite pausar a execução no meio de uma função, inspecionar todas as variáveis do escopo atual, avaliar expressões no Console enquanto o código está congelado e caminhar instrução por instrução.

### Leitura principal

Em [Debug JavaScript — Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript#reproduce), leia o fluxo de **Reproduce the bug** até **Check variable values** (incluindo **Scope**, **Watch expressions** e **The Console**). Pule **Apply a fix** e **Next steps** (em projetos Vite/TypeScript, sempre edite e salve no seu editor de código, não diretamente no painel Sources).

Em [JavaScript debugging reference — Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/reference#stepping), consulte **Step through code** (`Step over`, `Step into`, `Step out`, `Resume`) e **View the current call stack**. Pule **File tree** e **Ignore list**.

Leia também a página curta [`debugger` — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger#syntax) (introdução, **Syntax** e **Examples**).

Como referência complementar opcional, dê uma olhada apenas na tabela **Overview of when to use each breakpoint type** em [Pause your code with breakpoints — Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/breakpoints#overview) para saber que existem *breakpoints* condicionais e de `fetch`. Para inspecionar props e estado de componentes React em uma aba própria, vale conhecer também a extensão [React Developer Tools](https://react.dev/learn/react-developer-tools) (instalação opcional).

### *Breakpoints*, `debugger;` e comandos de *stepping*

Você tem duas formas principais de pausar o código:

- ***Breakpoint* no painel Sources:** abra o arquivo `.ts`/`.tsx` no DevTools (atalho `Cmd+P` / `Ctrl+P` dentro do DevTools) e clique no número da linha. Clique com o botão direito na linha para adicionar um ***conditional breakpoint*** — por exemplo, pausar dentro de um loop somente quando `item.id === 42` em vez de pausar nas 41 iterações anteriores.
- **Instrução `debugger;` no código:** funciona como um *breakpoint* escrito diretamente no arquivo. O navegador pausa nessa linha **somente se o DevTools estiver aberto**; com o DevTools fechado, a instrução não tem efeito. **Regra de ouro:** nunca faça commit deixando `debugger;` no código (o ESLint do projeto inclusive acusa erro pela regra `no-debugger`).

Quando a execução pausa, os quatro controles de ***stepping*** decidem o próximo passo:

| Comando | Atalho padrão | O que faz | Quando usar |
|---|---|---|---|
| **Resume** | `F8` | Continua a execução normal até o próximo *breakpoint* (ou até terminar). | Quando você já viu o que queria nessa pausa. |
| **Step over** | `F10` | Executa a linha atual inteira e para na próxima linha **da mesma função**. | Quando a chamada na linha atual não é suspeita e você não quer entrar nela. |
| **Step into** | `F11` | Entra **dentro** da função chamada na linha atual. | Quando você suspeita que o bug acontece dentro daquela função. |
| **Step out** | `Shift+F11` | Termina o resto da função atual e volta para quem a chamou. | Quando você entrou em uma função (ou em código interno de biblioteca) por engano. |

Enquanto estiver pausado, observe os três painéis auxiliares do Sources:

1. **Scope:** mostra o valor atual das variáveis locais, de *closure* e globais — sem precisar digitar `console.log`.
2. **Watch:** permite fixar expressões (como `itens.length` ou `total > 0`) que se recalculam a cada passo.
3. **Call Stack:** mostra a pilha de chamadas viva até aquele ponto; clicar em um *frame* anterior troca o **Scope** para o contexto daquela função chamadora.

Além do painel **Sources**, lembre como as outras abas do DevTools se completam na investigação: **Elements** (inspecionar DOM, atributos ARIA e CSS aplicado), **Console** (ver erros e testar expressões no escopo pausado) e **Network** (conferir URL, status HTTP, headers e JSON real trocado com a API, como fizemos nos capítulos 26 e 27).

### Exemplo: encontrando um bug de lógica sem adivinhar

Os bugs mais traiçoeiros não lançam erro nenhum: o programa roda, mas mostra um número errado. Veja este componente simples para o seu laboratório Vite (`src/App.tsx`), que aplica um desconto percentual sobre um pedido:

```tsx
import { useState } from "react";

interface ItemCarrinho {
  readonly id: number;
  readonly nome: string;
  readonly preco: number;
}

const ITENS_INICIAIS: readonly ItemCarrinho[] = [
  { id: 1, nome: "Livro de TypeScript", preco: 80 },
  { id: 2, nome: "Caderno pontilhado", preco: 40 },
];

function calcularTotalComDesconto(
  itens: readonly ItemCarrinho[],
  descontoPercentual: number,
): number {
  let subtotal = 0;

  for (const item of itens) {
    subtotal += item.preco;
  }

  // Bug proposital de lógica: subtrai o percentual como se fosse valor em reais
  const total = subtotal - descontoPercentual;
  return total;
}

export default function App() {
  const [descontoTexto, setDescontoTexto] = useState("10");

  const desconto = Number(descontoTexto);
  const total = calcularTotalComDesconto(ITENS_INICIAIS, desconto);

  return (
    <main>
      <h1>Resumo do pedido</h1>

      <label htmlFor="campo-desconto">Desconto (%)</label>
      <input
        id="campo-desconto"
        type="number"
        value={descontoTexto}
        onChange={(event) => setDescontoTexto(event.target.value)}
      />

      <p>Subtotal esperado: R$ 120,00</p>
      <p>Total com {desconto}% de desconto: R$ {total.toFixed(2)}</p>
    </main>
  );
}
```

Com 10% de desconto sobre R$ 120,00, o total esperado é **R$ 108,00** (`120 * (1 - 10 / 100)`), mas a tela mostra **R$ 110,00**. Não há erro no Console porque a sintaxe e os tipos estão válidos — é um **erro de lógica**. Colocando um *breakpoint* na linha `const total = ...`, o painel **Scope** revela imediatamente `subtotal: 120`, `descontoPercentual: 10` e `total: 110`, apontando a causa exata em segundos.

**O que o depurador abstrai, custos e limites:** o DevTools pausa a execução do JavaScript preservando o estado completo da memória e dos *source maps*. Porém, fique atento a dois limites práticos:

- **O tempo do mundo externo não pausa:** enquanto você está parado em um *breakpoint*, requisições HTTP já enviadas continuam respondendo e temporizadores (`setTimeout`) avançam no relógio do sistema. Por isso, bugs dependentes de tempo (como *race conditions* do capítulo 27) podem mudar de comportamento ou sumir durante uma pausa — nesses casos, a aba **Network** com *throttling* e logs com marcação de tempo ajudam mais do que pausar.
- **Em produção o código é minificado:** se um bug só aparece no build de produção sem *source maps* públicos, ler o código direto no navegador fica muito mais difícil — daí a importância de reproduzir localmente e cobrir regras críticas com testes automatizados.

**Experimente:** rode o exemplo acima no laboratório Vite, abra o DevTools (`Sources`), localize `src/App.tsx` com `Cmd+P` / `Ctrl+P` e coloque um *breakpoint* dentro de `calcularTotalComDesconto`. Altere o campo de desconto para `25`, observe **Scope** e **Call Stack**, avance linha por linha com **Step over** (`F10`) e depois corrija o cálculo para `subtotal * (1 - descontoPercentual / 100)` (garantindo também o que fazer se `descontoPercentual` for inválido ou negativo).

## 3. Primeiros testes automatizados de funções com Vitest

### O problema: impedir que bugs corrigidos voltem no futuro

Depois que você descobre e corrige um bug (como o do desconto ou uma validação de formulário), o que garante que outra mudança daqui a duas semanas não quebre esse comportamento de novo? Conferir manualmente todas as telas e casos de borda a cada edição consome tempo e falha justamente nos cenários raros (texto vazio, só espaços, `NaN`, campo faltando).

Um **teste automatizado** é simplesmente um código TypeScript que executa parte do seu programa com entradas controladas e verifica se a saída corresponde ao esperado. Se algo quebrar depois de uma refatoração, um único comando (`npm test`) avisa em menos de um segundo.

### Leitura principal

Em [Getting Started — Vitest](https://vitest.dev/guide/#overview), leia **Overview**, **Adding Vitest to Your Project** e **Writing Tests**. Pare antes de **Configuring Vitest** (veremos a configuração para componentes React na etapa 4).

Como consulta rápida enquanto lê os exemplos abaixo, confira os *matchers* principais em [`expect` — Vitest](https://vitest.dev/api/expect.html#tobe): [`toBe`](https://vitest.dev/api/expect.html#tobe), [`toEqual`](https://vitest.dev/api/expect.html#toequal), [`toThrow`](https://vitest.dev/api/expect.html#tothrow) e [`not`](https://vitest.dev/api/expect.html#not). Não leia a lista inteira da página.

### Anatomia de um teste e o padrão Arrange → Act → Assert

Como já usamos **Vite** no Bloco 3 (capítulo 21), o **Vitest** é a escolha natural: ele reutiliza a mesma estrutura de compilação TypeScript/ES Modules do Vite sem precisar configurar um segundo ambiente paralelo.

Todo teste claro segue três fases (**AAA**):

1. **Arrange (Preparar):** definir as entradas e o estado inicial do cenário.
2. **Act (Executar):** chamar a função ou realizar a ação que está sendo testada.
3. **Assert (Verificar):** conferir o resultado observado com `expect(valor)...`.

Lembre também da diferença fundamental entre os dois *matchers* que mais geram confusão no começo (conectando direto com referências de objetos dos capítulos 7, 23 e 27):

| *Matcher* | Como compara | Quando usar |
|---|---|---|
| `expect(a).toBe(b)` | Igualdade estrita (`Object.is`) — mesmo valor primitivo ou **mesma referência** em memória | `number`, `string`, `boolean`, `null`, `undefined` |
| `expect(a).toEqual(b)` | Igualdade profunda de **conteúdo** (propriedade por propriedade / elemento por elemento) | Objetos e arrays novos retornados por funções |
| `expect(() => fn()).toThrow(...)` | Verifica se executar a função lança exceção (repare na arrow function!) | Funções cujo contrato prevê lançar `Error` |

Veja agora testes reais para duas **funções puras** que já escrevemos nos capítulos 24 (`validarTema`) e 26 (`validarTarefa`) — separadas em um módulo `src/validacao.ts`:

```ts
// src/validacao.ts
export interface Tarefa {
  readonly id: number;
  readonly titulo: string;
  readonly concluida: boolean;
}

export function validarTema(
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

export function validarTarefa(valor: unknown): Tarefa | null {
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
```

E o arquivo de testes correspondente (`src/validacao.test.ts`):

```ts
// src/validacao.test.ts
import { describe, expect, it } from "vitest";
import { validarTarefa, validarTema } from "./validacao";

describe("validarTema", () => {
  it("aceita um tema válido que ainda não existe", () => {
    // Arrange
    const existentes = ["Contos brasileiros", "Poesia contemporânea"];

    // Act
    const erro = validarTema("  Crônicas urbanas  ", existentes);

    // Assert
    expect(erro).toBeNull();
  });

  it("rejeita texto vazio ou contendo apenas espaços", () => {
    expect(validarTema("", [])).toBe("Informe um tema para a sessão.");
    expect(validarTema("   ", [])).toBe("Informe um tema para a sessão.");
  });

  it("rejeita tema com menos de 3 caracteres úteis e aceita com exatamente 3", () => {
    expect(validarTema(" ab ", [])).toBe(
      "O tema deve ter pelo menos 3 caracteres.",
    );
    expect(validarTema("SQL", [])).toBeNull();
  });

  it("rejeita tema duplicado ignorando maiúsculas, minúsculas e espaços extras", () => {
    const existentes = ["Poesia contemporânea"];
    const erro = validarTema("  poesia CONTEMPORÂNEA ", existentes);

    expect(erro).toBe("Já existe uma sessão cadastrada com esse tema.");
  });
});

describe("validarTarefa", () => {
  it("converte um payload válido da API para o contrato do domínio", () => {
    const bruto: unknown = {
      userId: 1,
      id: 7,
      title: "Escrever primeiros testes",
      completed: false,
    };

    // Usamos toEqual (não toBe) porque validarTarefa retorna um objeto novo
    expect(validarTarefa(bruto)).toEqual({
      id: 7,
      titulo: "Escrever primeiros testes",
      concluida: false,
    });
  });

  it("retorna null quando o valor não é objeto, é null ou falta campo obrigatório", () => {
    expect(validarTarefa(null)).toBeNull();
    expect(validarTarefa("texto")).toBeNull();
    expect(validarTarefa({ id: 1, title: "Sem completed" })).toBeNull();
  });

  it("retorna null quando algum campo tem tipo inválido ou número não finito", () => {
    expect(
      validarTarefa({ id: "1", title: "ID string", completed: false }),
    ).toBeNull();
    expect(
      validarTarefa({ id: Number.NaN, title: "ID NaN", completed: false }),
    ).toBeNull();
  });
});
```

Repare no ganho de arquitetura que anunciamos no capítulo 24: como `validarTema` e `validarTarefa` são **funções puras** (recebem entradas, devolvem um resultado e não dependem do DOM nem de `useState`), testá-las é instantâneo e trivial.

**O que o Vitest abstrai, custos e limites:**

- O Vitest descobre arquivos `*.test.ts` / `*.test.tsx`, compila TypeScript, executa os casos de teste em isolamento e imprime diffs claros quando um `expect` falha.
- **Limite fundamental:** uma suíte 100% verde **não prova** que o programa está livre de bugs — ela garante apenas que os cenários escritos continuam passando. Se você esqueceu de testar entradas vazias, valores duplicados ou erros de rede, o bug passa despercebido.
- **Não escreva testes que espelham a implementação linha por linha:** teste o **contrato** (entradas → saídas observáveis). Assim, você pode refatorar o algoritmo interno à vontade e o teste continua válido.

**Experimente:** no seu projeto Vite, instale o Vitest (`npm install -D vitest`), adicione `"test": "vitest"` em `package.json` (e `"test:run": "vitest run"` para execução única fora do modo observador), crie `src/validacao.ts` e `src/validacao.test.ts` e rode `npm run test:run`. Depois, quebre propositalmente o `.toLowerCase()` em `validarTema`, rode de novo para ler o relatório de falha do Vitest e restaure o código.

## 4. Testando componentes React e interações pelo comportamento visível

### O problema: funções puras não garantem que a tela funciona

`validarTema` pode passar em todos os testes unitários e, ainda assim, o formulário na tela pode estar quebrado: o `<button>` sem `type="submit"`, o `onChange` esquecido, a mensagem de erro sem `role="alert"` ou o campo não sendo limpo após o cadastro.

Para testar componentes React, precisamos renderizá-los em um DOM simulado, interagir com eles como uma pessoa faria (digitando, clicando) e verificar o que **aparece ou desaparece na interface** — sem depender do nome interno de um `useState` ou de classes CSS que podem mudar amanhã.

### Leitura principal

Leia por completo a página curta [Guiding Principles — Testing Library](https://testing-library.com/docs/guiding-principles/) (guarde o princípio central: quanto mais os testes se parecem com a forma como o software é usado, mais confiança eles entregam).

Em [About Queries — Testing Library](https://testing-library.com/docs/queries/about/#types-of-queries), leia **Types of Queries** (tabela `getBy`, `queryBy`, `findBy`) e **Priority** (entenda por que `getByRole` e `getByLabelText` vêm no topo da prioridade, bem antes de `getByTestId`). Pule **TextMatch**, **Manual Queries** e **Playground**.

Em [User Interactions: Introduction — Testing Library](https://testing-library.com/docs/user-event/intro/#differences-from-fireevent), leia **Differences from `fireEvent`** e **Writing tests with `userEvent`**.

Por fim, leia a subseção curta [Auto Cleanup in Vitest — Testing Library](https://testing-library.com/docs/react-testing-library/setup/#auto-cleanup-in-vitest) para entender por que precisamos limpar o DOM após cada teste quando não ativamos variáveis globais no Vitest.

### Configuração mínima no projeto Vite + React + TypeScript

Para rodar testes de componentes React com Vitest, instalamos quatro pacotes de desenvolvimento:

```bash
npm install -D jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

O que cada pacote faz:

- **`jsdom`:** implementa uma simulação da árvore do DOM e de APIs do navegador dentro do Node (para o React conseguir renderizar JSX sem abrir o Chrome).
- **`@testing-library/react`:** oferece `render` (monta o componente no DOM de teste), `screen` (consulta elementos renderizados) e `cleanup` (desmonta o componente após cada teste).
- **`@testing-library/user-event`:** simula interações realistas de usuário (`click`, `type`, `clear`, `tab`), disparando foco e sequência de eventos de teclado/mouse — muito mais fiel que o `fireEvent` de baixo nível.
- **`@testing-library/jest-dom`:** adiciona *matchers* específicos para DOM no `expect`, como `toBeInTheDocument()`, `toHaveValue()`, `toBeDisabled()` e `toHaveAttribute()`.

Configure o ambiente de testes no `vite.config.ts` (trocando o import de `vite` por `vitest/config`, ou criando um `vitest.config.ts` separado):

```ts
// vite.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

E crie o arquivo de preparação `src/test/setup.ts` para registrar os *matchers* do `jest-dom` e limpar o DOM automaticamente depois de cada teste:

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

> **Dica para o `tsconfig`:** se o editor reclamar dos tipos de `toBeInTheDocument()` fora dos arquivos que importam o setup, certifique-se de que `src/test/setup.ts` está incluído pelo `tsconfig.app.json` (ele já entra automaticamente quando `"include": ["src"]`).

### Escolhendo a query certa — e conectando testes à acessibilidade

Repare como tudo o que você praticou nos capítulos 20 e 24 (`<label htmlFor>`, `<button>`, `role="alert"`, `role="status"`, `aria-invalid`) agora paga dividendos diretos nos testes:

1. **Priorize `getByRole` e `getByLabelText`:** quando o teste busca `screen.getByLabelText(/novo tema/i)` ou `screen.getByRole("button", { name: /adicionar sessão/i })`, ele verifica **ao mesmo tempo** a funcionalidade e a acessibilidade real da tela. Se alguém apagar o `htmlFor` ou trocar `<button>` por uma `<div>` clicável, o teste falha.
2. **Escolha o prefixo certo conforme o que você espera:**

| Prefixo | Se não encontrar | Se encontrar 1 | Assíncrono? | Quando usar |
|---|---|---|---|---|
| **`getBy*`** | Lança erro | Retorna o elemento | Não | Quando o elemento **já deve estar** na tela agora. |
| **`queryBy*`** | Retorna `null` | Retorna o elemento | Não | **Somente** para afirmar que um elemento **não** está na tela (`expect(...).not.toBeInTheDocument()`). |
| **`findBy*`** | Rejeita após timeout | Resolve com o elemento | **Sim (`await`)** | Quando o elemento vai aparecer **depois** de uma operação assíncrona (ex.: `fetch`). |

*(As variantes no plural `getAllBy*`, `queryAllBy*` e `findAllBy*` seguem a mesma regra para listas de elementos.)*

### Exemplo completo: testando `FormularioSessao` com `userEvent`

Suponha o componente `FormularioSessao` do capítulo 24 exportado em `src/FormularioSessao.tsx` (reaproveitando `validarTema` de `./validacao`). Veja como testamos **o que o usuário vê e faz**, sem tocar em nenhum detalhe interno do componente:

```tsx
// src/FormularioSessao.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormularioSessao } from "./FormularioSessao";

describe("FormularioSessao", () => {
  it("exibe erro acessível e não envia quando o tema está vazio", async () => {
    const user = userEvent.setup();
    const onAdicionar = vi.fn();

    render(
      <FormularioSessao
        temasExistentes={["Contos brasileiros"]}
        onAdicionar={onAdicionar}
      />,
    );

    const botao = screen.getByRole("button", { name: /adicionar sessão/i });
    await user.click(botao);

    // Verifica o alerta acessível e a marcação no campo
    const alerta = screen.getByRole("alert");
    expect(alerta).toHaveTextContent("Informe um tema para a sessão.");

    const campo = screen.getByLabelText(/novo tema/i);
    expect(campo).toHaveAttribute("aria-invalid", "true");
    expect(onAdicionar).not.toHaveBeenCalled();
  });

  it("adiciona um tema válido, limpa o campo e anuncia sucesso", async () => {
    const user = userEvent.setup();
    const onAdicionar = vi.fn();

    render(
      <FormularioSessao
        temasExistentes={["Contos brasileiros"]}
        onAdicionar={onAdicionar}
      />,
    );

    const campo = screen.getByLabelText(/novo tema/i);
    await user.type(campo, "  Crônicas urbanas  ");
    await user.click(screen.getByRole("button", { name: /adicionar sessão/i }));

    expect(onAdicionar).toHaveBeenCalledTimes(1);
    expect(onAdicionar).toHaveBeenCalledWith("Crônicas urbanas");
    expect(campo).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      'Sessão "Crônicas urbanas" adicionada à agenda.',
    );
  });

  it("preserva o texto digitado quando o tema já existe para facilitar a correção", async () => {
    const user = userEvent.setup();
    const onAdicionar = vi.fn();

    render(
      <FormularioSessao
        temasExistentes={["Poesia contemporânea"]}
        onAdicionar={onAdicionar}
      />,
    );

    const campo = screen.getByLabelText(/novo tema/i);
    await user.type(campo, "poesia contemporânea");
    await user.click(screen.getByRole("button", { name: /adicionar sessão/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Já existe uma sessão cadastrada com esse tema.",
    );
    expect(campo).toHaveValue("poesia contemporânea");
    expect(onAdicionar).not.toHaveBeenCalled();
  });
});
```

Conecte quatro detalhes essenciais desse teste:

1. **`const user = userEvent.setup()` no início do teste:** cria uma sessão de usuário limpa; toda ação de `user` (`click`, `type`) é assíncrona e precisa de `await`.
2. **`vi.fn()` para callbacks de saída:** `onAdicionar` é uma **função espiã** (*mock function*) que registra quantas vezes e com quais argumentos o componente chamou a prop `onAdicionar`.
3. **Sem testar detalhes internos:** o teste não sabe se o componente usa `useState` com um objeto ou dois estados separados, nem qual o nome da função `handleSubmit`. Você pode refatorar o interior de `FormularioSessao` inteiro e, se o comportamento visível continuar o mesmo, o teste permanece verde.
4. **O que `jsdom` + Testing Library abstraem, custos e limites:** o `jsdom` executa testes de componente em milissegundos sem precisar abrir um navegador real. Mas esse ganho de velocidade tem um limite claro: o `jsdom` **não renderiza pixels nem calcula layout CSS** (Flexbox, Grid, responsividade, sobreposição visual ou scroll real). Ele testa lógica, estrutura semântica, acessibilidade básica e interações — mas não substitui inspecionar o visual no navegador (nem testes ponta a ponta em navegador real quando a aplicação crescer, tema do capítulo 57).

**Experimente:** depois de ver os testes de `FormularioSessao` passarem, remova temporariamente o atributo `htmlFor="tema-sessao"` do `<label>` no componente e rode `npm run test:run`. Observe o erro detalhado da Testing Library explicando que nenhum controle está associado àquele rótulo — e restaure o `htmlFor`.

## 5. Testando fluxos assíncronos e falha de API

### O problema: testar `useEffect` e `fetch` sem depender da internet

No capítulo 27, o componente carregava tarefas via `fetch` dentro de `useEffect`, mostrava um aviso de carregamento, filtrava a lista localmente, tratava erros HTTP e oferecia um botão **Tentar novamente**.

Se o teste chamasse a API real pela internet, teríamos quatro problemas imediatos:

1. **Lentidão e instabilidade:** se a rede oscilar ou o servidor externo ficar lento, o teste falha sem que o seu código tenha bug.
2. **Impossibilidade de provocar falhas sob demanda:** como forçar um servidor público a responder `HTTP 500`, cortar a conexão no meio ou devolver um JSON com campo corrompido exatamente quando você precisa testar o tratamento de erro?
3. **Dependência offline:** você não conseguiria rodar seus testes sem internet.
4. **Risco de efeitos colaterais:** testar requisições `POST`/`DELETE` contra um servidor real alteraria dados de verdade.

A solução é interceptar **somente a fronteira externa (`fetch`)** durante o teste, deixando todo o restante do componente (o `useEffect`, o `AbortController`, a checagem de `response.ok`, a validação de `unknown` e a renderização dos estados) rodar **de verdade**:

```text
Componente React (useEffect + validação + estados + UI)   ◄── código real testado!
        │
        ▼ chama fetch(url, { signal })
[ fronteira simulada: vi.spyOn(globalThis, "fetch") ]     ◄── entrega 200, 500, erro de rede ou JSON quebrado
```

### Leitura principal

Em [Async Methods — Testing Library](https://testing-library.com/docs/dom-testing-library/api-async/#findby-queries), leia **`findBy` Queries** e a introdução de **`waitFor`**. Pule `waitForElementToBeRemoved`.

Em [Mocking Functions — Vitest](https://vitest.dev/guide/mocking/functions.html), leia a introdução (a diferença entre espionar com `vi.spyOn` e criar uma função simulada com `vi.fn`) e o bloco **Example**.

### Simulando sucesso, erro HTTP, queda de rede e contrato inválido

Veja como testar o componente de tarefas assíncronas do capítulo 27 (`ListaTarefas`, que faz `fetch` ao montar, valida o JSON como `unknown`, permite filtrar localmente por **Todas / Pendentes / Concluídas** e tem botão **Tentar novamente** em caso de erro).

Observe um cuidado técnico valioso: em vez de inventar objetos falsos e forçar tipos com `as Response`, construímos instâncias reais da classe padrão **`new Response(...)`** — assim `response.ok`, `response.status` e `await response.json()` funcionam exatamente como no navegador, **sem nenhum cast**:

```tsx
// src/ListaTarefas.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListaTarefas } from "./ListaTarefas";

function criarRespostaJson(dados: unknown, status = 200): Response {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  // Indispensável: restaura o fetch original para que um teste nunca afete o próximo
  vi.restoreAllMocks();
});

describe("ListaTarefas", () => {
  it("exibe carregamento, renderiza tarefas e filtra localmente sem novo fetch", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      criarRespostaJson([
        { id: 1, title: "Ler capítulo 28", completed: false },
        { id: 2, title: "Configurar Vitest", completed: true },
      ]),
    );

    render(<ListaTarefas />);

    // 1. Estado inicial imediato antes da Promise do fetch resolver
    expect(screen.getByRole("status")).toHaveTextContent(/carregando/i);

    // 2. findBy* aguarda o fetch resolver e o React atualizar o DOM
    expect(await screen.findByText(/Ler capítulo 28/i)).toBeInTheDocument();
    expect(screen.getByText(/Configurar Vitest/i)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    // 3. Filtro local é estado derivado: não deve disparar nova requisição HTTP
    await user.click(screen.getByRole("button", { name: /^pendentes$/i }));

    expect(screen.getByText(/Ler capítulo 28/i)).toBeInTheDocument();
    expect(screen.queryByText(/Configurar Vitest/i)).not.toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("exibe mensagem de erro quando a API responde com status HTTP 500", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 500 }),
    );

    render(<ListaTarefas />);

    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent(/500/);
  });

  it("exibe erro quando há falha de rede e recupera ao clicar em Tentar novamente", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(
        criarRespostaJson([
          { id: 3, title: "Tarefa recuperada", completed: false },
        ]),
      );

    render(<ListaTarefas />);

    // Primeira chamada falha na rede
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /Failed to fetch/i,
    );

    // Usuário tenta novamente e a segunda resposta vem com sucesso
    await user.click(screen.getByRole("button", { name: /tentar novamente/i }));

    expect(await screen.findByText(/Tarefa recuperada/i)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("rejeita payload fora do contrato mesmo com HTTP 200", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      criarRespostaJson({ mensagem: "Formato inesperado da API" }, 200),
    );

    render(<ListaTarefas />);

    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent(/formato inesperado/i);
  });
});
```

Conecte quatro pontos decisivos desse bloco:

1. **Por que `findBy*` (e não `getBy*`) após o `render`:** o `useEffect` só roda depois do commit inicial, e o `fetch` é assíncrono. Usar `getByText` logo após `render` falharia porque os dados ainda não chegaram. `await screen.findByText(...)` espera até o elemento aparecer no DOM (com um timeout padrão curto) e falha com uma mensagem clara mostrando o HTML atual caso nunca apareça.
2. **`mockResolvedValueOnce` e `mockRejectedValueOnce` encadeados:** o sufixo `Once` define exatamente o que acontece na **primeira** chamada e na **segunda** chamada — ideal para testar recuperação após falha (1ª falha de rede → clique em **Tentar novamente** → 2ª sucesso).
3. **Sempre restaurar em `afterEach(() => vi.restoreAllMocks())`:** sem restaurar o *spy*, a substituição de `globalThis.fetch` vazaria para os testes seguintes, causando falhas misteriosas que dependem da ordem em que os testes executam.
4. **Testar os quatro cenários da fronteira HTTP:** sucesso, erro HTTP (`500`/`404`), falha de rede (`Promise` rejeitada) e contrato JSON violado (`200` com formato errado). Assim você garante que a experiência do usuário em todos os caminhos de erro funciona de verdade.

### Limites honestos de simular `fetch` nos testes

Simular `fetch` torna os testes rápidos, repetíveis e capazes de cobrir falhas difíceis de reproduzir manualmente. Ainda assim, seja realista sobre o que esse tipo de teste **não** verifica:

- **Mudança real na API:** o teste usa o JSON que **você** escreveu em `criarRespostaJson(...)`. Se a API real renomear `title` para `name` amanhã, seu teste com *mock* continuará passando até alguém testar contra o serviço real.
- **Problemas de rede do navegador:** cabeçalhos de CORS, certificados HTTPS ou lentidão real do servidor não aparecem em um `fetch` simulado no `jsdom`.

Por isso, testes de componentes com `fetch` simulado são a primeira camada de proteção no frontend — mas quando construirmos nosso próprio backend a partir do capítulo 29, complementaremos essa camada com testes de integração contra o serviço real (capítulo 33) e aprofundaremos critérios de *mocking* e tipos de teste no capítulo 57.

**Experimente:** nos testes de `ListaTarefas` acima (adaptando o `App` do capítulo 27 como componente exportado `ListaTarefas`), remova temporariamente o bloco `if (!response.ok)` da função de busca e rode `npm run test:run`. Observe qual teste detecta imediatamente a regressão; depois restaure o código e confirme que todos os quatro testes voltam a passar.

## Ao terminar

Antes de avançar para o projeto de portfólio do Bloco 3 e para o capítulo 29, confira se você consegue explicar:

- quais são os passos para investigar um bug sem adivinhar (reproduzir consistentemente, formular hipótese, observar estado real, corrigir e confirmar), como ler um *stack trace* de cima para baixo encontrando o primeiro *frame* do seu código e qual o papel dos *source maps*;
- como consultar documentação oficial (MDN, React, TypeScript, Vitest, Testing Library) com método — checando contexto, assinatura, retorno, exceções e avisos em vez de copiar trechos às cegas;
- quando usar *breakpoints* no painel Sources (inclusive condicionais), o que faz a instrução `debugger;` (e por que nunca deixá-la em código commitado), a diferença entre **Step over**, **Step into**, **Step out** e **Resume**, e por que pausar no debugger pode alterar bugs dependentes de tempo;
- como estruturar testes de funções puras no Vitest (`describe`, `it`, `expect`, padrão AAA), a diferença entre `toBe` e `toEqual` e por que funções puras sem dependência do DOM são fáceis de testar em casos normais e de borda;
- por que React Testing Library prioriza queries acessíveis (`getByRole`, `getByLabelText`) e `userEvent` para testar **comportamento visível** em vez de detalhes internos de implementação, quando escolher `getBy*`, `queryBy*` ou `findBy*`, e o que `jsdom` não testa;
- como testar um componente assíncrono simulando `fetch` na fronteira com `vi.spyOn(globalThis, "fetch")` e `new Response(...)` (cobrindo carregamento, sucesso, erro HTTP, falha de rede, contrato inválido e recuperação), por que `vi.restoreAllMocks()` em `afterEach` é indispensável, e quais limitações testes com API simulada continuam tendo.
