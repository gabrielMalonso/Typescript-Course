# Capítulo 23 — Estado e eventos

**Objetivo:** adicionar interatividade a componentes React usando `useState`, eventos e callbacks tipados, atualizações imutáveis, estado derivado e elevação de estado. Ao final, sua página de tarefas passará a alternar situações e exibir um resumo sempre coerente a partir de uma única fonte de verdade.

No capítulo 22, você construiu componentes que recebem props e transformam dados em interface — mas os dados só mudavam editando o código. No capítulo 20, você já respondeu a cliques no navegador usando `addEventListener` e alterando o DOM na mão. Agora vamos ver como React recebe eventos e mantém a memória dos componentes.

**Percurso:** eventos e callbacks tipados → `useState` e snapshot → atualizações imutáveis (objetos e arrays) → estado derivado → elevação de estado. Em cada etapa, leia o recorte oficial indicado e use as explicações curtas para conectá-lo ao TypeScript que você já domina. Os desafios e aprofundamentos da documentação são opcionais e ficam fora deste percurso.

**Escopo:** trabalharemos com botões e interações diretas sobre dados já presentes na tela. Inputs controlados, formulários, validação local, renderização de listas com `map`/`key` e renderização condicional para vazio/sucesso/erro ficam para o capítulo 24. Criar abstrações genéricas próprias fica para o bloco 7; `useReducer`, Context e hooks próprios entram no capítulo 68.

## 1. Eventos e callbacks tipados

### O problema: responder a ações sem consultar o DOM

No capítulo 20, você buscou um botão com `querySelector` e registrou um listener com `addEventListener("click", ...)`. Como em React a própria função descreve o JSX do botão, não precisamos buscá-lo depois: passamos a função de resposta diretamente na prop `onClick`.

E quando o botão fica dentro de um componente filho, mas quem decide o que fazer ao clicar é o pai? Usamos algo que você já conhece desde o capítulo 8: **callbacks**, agora passados por props e tipados na interface do componente.

### Leitura principal

Em [Responding to Events — React](https://react.dev/learn/responding-to-events#adding-event-handlers), leia **Adding event handlers** (incluindo o aviso **Pitfall**), **Reading props in event handlers**, **Passing event handlers as props** e **Naming event handler props**. Pare antes de **Event propagation** e pule os desafios finais.

Em [Using TypeScript — DOM Events](https://react.dev/learn/typescript#typing-dom-events), leia somente **DOM Events**, parando antes de **Children**. O exemplo da página usa um `<input>`, assunto do capítulo 24; concentre-se na regra de tipagem: handlers escritos inline têm o evento inferido automaticamente, enquanto funções separadas que leem o parâmetro `event` precisam anotar o tipo dele.

### Passar uma função, não o resultado de chamá-la

Os exemplos deste guia continuam usando um **encontro de leitura**, independente do projeto de tarefas. Depois de [preparar a base](03-pratica/atividades.md#preparar-a-base), você pode testá-los em `src/App.tsx`, um por vez:

```tsx
import type { MouseEvent } from "react";

interface BotaoAcaoProps {
  rotulo: string;
  onAcao: () => void;
}

function BotaoAcao({ rotulo, onAcao }: BotaoAcaoProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    console.log("Botão ativado:", event.currentTarget.textContent);
    onAcao();
  }

  return (
    <button type="button" onClick={handleClick}>
      {rotulo}
    </button>
  );
}

export default function App() {
  function handleConfirmar() {
    console.log("Presença registrada no console.");
  }

  return (
    <main>
      <h1>Encontro de leitura</h1>
      <BotaoAcao rotulo="Confirmar presença" onAcao={handleConfirmar} />
    </main>
  );
}
```

Observe os quatro pontos principais do código:

1. **Função como valor:** `onClick={handleClick}` e `onAcao={handleConfirmar}` passam a função sem parênteses, para que ela só execute quando o clique acontecer. Escrever `handleConfirmar()` chamaria a função durante a renderização.
2. **Callback tipado na prop:** `onAcao: () => void` descreve uma função sem parâmetros e sem retorno relevante, exatamente como nos callbacks do capítulo 8. Por convenção, props de evento começam com `on` (`onAcao`, `onAlternar`) e handlers internos começam com `handle` (`handleClick`, `handleConfirmar`).
3. **Tipo do evento DOM:** quando a função precisa inspecionar o evento, importamos o tipo com `import type { MouseEvent } from "react"` e indicamos qual elemento o disparou: `MouseEvent<HTMLButtonElement>`. A notação `<HTMLButtonElement>` informa o tipo específico do elemento para o compilador — assim `event.currentTarget` já tem o tipo de um botão HTML, sem precisar de `instanceof` nem casts. Se a função não usa o objeto `event`, você nem precisa declarar o parâmetro e pode passar `onClick={onAcao}` diretamente.
4. **O que React abstrai e o que permanece:** `onClick` cuida do registro e da remoção dos listeners no DOM e entrega um evento padronizado entre navegadores. O evento real continua vindo do navegador; por isso, use elementos interativos nativos como `<button type="button">` (acessíveis por teclado), em vez de colocar `onClick` em `<div>` ou `<p>`.

**Experimente:** no exemplo acima, troque temporariamente `onAcao={handleConfirmar}` por `onAcao={handleConfirmar()}`. Observe que TypeScript já acusa erro de tipo (`void` não é atribuível a `() => void`). Restaure a versão correta e clique no botão olhando o Console do navegador.

## 2. Estado com `useState`: a memória do componente

### O problema: variáveis locais recomeçam a cada render

Um componente React é uma função. Quando uma função termina, suas variáveis locais (`let inscritos = 0`) deixam de existir; quando ela é chamada de novo, recomeçam do valor inicial. Além disso, alterar uma variável comum não avisa o React de que a tela precisa mudar.

Para guardar dados que mudam com o tempo e pedir uma nova renderização quando eles mudam, usamos o hook **`useState`**.

### Leitura principal

Em [State: A Component's Memory — React](https://react.dev/learn/state-a-components-memory#when-a-regular-variable-isnt-enough), leia **When a regular variable isn’t enough**, **Adding a state variable** (incluindo **Meet your first Hook**, o **Pitfall** sobre onde chamar hooks e **Anatomy of useState**) e **State is isolated and private**. Em **Giving a component multiple state variables**, leia apenas os dois primeiros parágrafos para ver que um componente pode declarar vários estados; pule **How does React know which state to return?**, ignore a sintaxe `{showMore && ...}` (capítulo 24) e pule os desafios.

Em [State as a Snapshot — React](https://react.dev/learn/state-as-a-snapshot#setting-state-triggers-renders), leia **Setting state triggers renders** (foque no ciclo evento → atualização → nova renderização, sem se preocupar com o formulário do exemplo) e **Rendering takes a snapshot in time**. Pare antes de **State over time** e pule os desafios.

Em [Queueing a Series of State Updates — React](https://react.dev/learn/queueing-a-series-of-state-updates#react-batches-state-updates), leia **React batches state updates**, **Updating the same state multiple times before the next render** e, se quiser conferir nomes usuais, **Naming conventions**. Pare antes de **What happens if you update state after replacing it** e pule os desafios.

Em [Using TypeScript — useState](https://react.dev/learn/typescript#typing-usestate), leia somente a seção **useState**, parando antes de **useReducer**. Note que o último exemplo da página usa `data: any` apenas como ilustração; no curso, evitamos `any` e declaramos tipos explícitos.

### Modelo mental e a notação `useState<Tipo>`

Substitua `App.tsx` por este exemplo:

```tsx
import { useState } from "react";

type SituacaoInscricao = "Aberta" | "Encerrada";

export default function App() {
  const [inscritos, setInscritos] = useState(0);
  const [situacao, setSituacao] = useState<SituacaoInscricao>("Aberta");

  function handleAdicionar() {
    setInscritos((atual) => atual + 1);
  }

  function handleAlternarSituacao() {
    setSituacao((atual) => (atual === "Aberta" ? "Encerrada" : "Aberta"));
  }

  return (
    <main>
      <h1>Encontro de leitura</h1>
      <p>Inscritos: {inscritos}</p>
      <p>Inscrições: {situacao}</p>
      <button type="button" onClick={handleAdicionar}>
        +1 inscrito
      </button>
      <button type="button" onClick={handleAlternarSituacao}>
        Alternar situação
      </button>
    </main>
  );
}
```

Conecte o exemplo ao que você já sabe de TypeScript:

- **Tupla de retorno:** `useState` devolve uma tupla de dois elementos (capítulo 16): o valor atual do estado naquele render e a função setter para pedir uma mudança. O destructuring `[inscritos, setInscritos]` extrai esses dois itens.
- **Inferência × argumento de tipo `<Tipo>`:** em `useState(0)`, TypeScript infere `number` sozinho. Já em `useState("Aberta")`, ele inferiria `string` genérica — e aceitaria qualquer texto por engano, como `"Fechada"`. Ao escrever `useState<SituacaoInscricao>("Aberta")`, passamos `SituacaoInscricao` entre `<` e `>` como um **argumento de tipo** para essa API pronta do React. Pense nele como uma etiqueta para o compilador: agora `situacao` só pode ser `"Aberta" | "Encerrada"` e `setSituacao` rejeita valores fora da union. O mesmo recurso serve quando o estado começa como `null` (ex.: `useState<string | null>(null)`). Vamos aprender a criar nossas próprias funções genéricas no bloco 7.
- **Snapshot e função atualizadora:** o estado vive no React, fora da função do componente. Durante um evento, `inscritos` guarda o retrato (*snapshot*) daquela renderização; chamar `setInscritos(...)` **não** altera a variável `inscritos` na linha seguinte, e sim agenda uma nova execução do componente. Quando o próximo valor depende do anterior, passar uma função atualizadora (`(atual) => atual + 1`) garante que cada atualização na fila receba o valor mais recente.
- **O que `useState` abstrai, custos e limites:** `useState` abstrai o armazenamento entre renderizações e o redesenho automático da tela. Ainda assim:
  1. Toda mudança de estado executa a função do componente novamente (e seus filhos) para calcular a nova descrição JSX.
  2. React identifica cada `useState` pela ordem fixa das chamadas; por isso, hooks ficam sempre no topo do componente, nunca dentro de `if`, loops ou funções internas.
  3. Estado existe apenas na memória da aba atual: recarregar a página volta tudo ao valor inicial.

**Experimente:**
1. Em `handleAdicionar`, chame `setInscritos(inscritos + 1)` duas vezes seguidas e clique no botão: o contador sobe só `1`. Depois troque as duas linhas por `setInscritos((atual) => atual + 1)` e clique novamente: agora sobe `2`.
2. Teste temporariamente `setSituacao("Fechada")` e confira o erro do TypeScript; depois restaure.

## 3. Atualizações imutáveis: objetos e arrays

### O problema: mutar o mesmo valor esconde a mudança

Nos capítulos 5, 7, 9 e 12, você viu que objetos e arrays são manipulados por **referência**: alterar `encontro.sala = "Auditório"` ou chamar `leitores.push("Ana")` modifica a estrutura existente na memória, mantendo a mesma referência.

Em React, o setter do `useState` compara a nova referência com a anterior (com `Object.is`) para decidir se houve mudança. Se você alterar o mesmo objeto ou array diretamente, a referência continua igual — React pode ignorar a atualização, e outras partes que apontavam para o mesmo valor acabam afetadas por acidente.

A regra é simples: **trate objetos e arrays no estado como somente leitura** e sempre entregue ao setter um **novo** objeto ou um **novo** array.

### Leitura principal

Em [Updating Objects in State — React](https://react.dev/learn/updating-objects-in-state#whats-a-mutation), leia **What’s a mutation?**, **Treat state as read-only** e **Copying objects with the spread syntax** (pare antes de **Using a single event handler for multiple fields**). Ignore os inputs do exemplo por enquanto e observe como o spread `{ ...person, ... }` cria um novo objeto preservando os demais campos. Pule **Updating a nested object** (vemos o ponto essencial logo abaixo), **Immer** e os desafios.

Em [Updating Arrays in State — React](https://react.dev/learn/updating-arrays-in-state#updating-arrays-without-mutation), leia **Updating arrays without mutation** (guarde a tabela *avoid* × *prefer*), **Adding to an array**, **Removing from an array**, **Replacing items in an array** e os parágrafos iniciais de **Updating objects inside arrays** (até entender o risco de copiar apenas o array externo e mutar um objeto interno). Nos exemplos da documentação, ignore a parte de renderizar listas com `map` e `key` no JSX (capítulo 24) e foque apenas na criação do novo array. Pule **Inserting into an array**, **Making other changes to an array**, **Immer** e os desafios.

### TypeScript protege a imutabilidade antes de rodar

Usando `readonly` na interface e `readonly string[]` no estado, o próprio compilador bloqueia mutações acidentais como `encontro.sala = ...` ou `leitores.push(...)`:

```tsx
import { useState } from "react";

interface Encontro {
  readonly titulo: string;
  readonly sala: string;
  readonly duracaoMinutos: number;
}

const RESERVAS: readonly string[] = ["Ana", "Bruno", "Carla"];

export default function App() {
  const [encontro, setEncontro] = useState<Encontro>({
    titulo: "Contos brasileiros",
    sala: "Sala 2",
    duracaoMinutos: 45,
  });
  const [leitores, setLeitores] = useState<readonly string[]>(["Marina"]);

  function handleTrocarSala() {
    setEncontro((atual) => ({
      ...atual,
      sala: atual.sala === "Sala 2" ? "Auditório" : "Sala 2",
    }));
  }

  function handleAdicionarLeitor() {
    const proximo = RESERVAS[leitores.length - 1];
    if (proximo === undefined) {
      return;
    }

    setLeitores((atual) => [...atual, proximo]);
  }

  function handleRemoverUltimo() {
    if (leitores.length <= 1) {
      return;
    }

    setLeitores((atual) => atual.slice(0, -1));
  }

  return (
    <main>
      <h1>{encontro.titulo}</h1>
      <p>
        Local: {encontro.sala} ({encontro.duracaoMinutos} min)
      </p>
      <p>Participantes: {leitores.join(", ")}</p>
      <button type="button" onClick={handleTrocarSala}>
        Trocar sala
      </button>
      <button type="button" onClick={handleAdicionarLeitor}>
        Adicionar participante
      </button>
      <button type="button" onClick={handleRemoverUltimo}>
        Remover último
      </button>
    </main>
  );
}
```

### Objetos dentro de arrays e o custo das cópias

Lembre-se do capítulo 7 e do capítulo 9: `{ ...obj }` e `[...arr]` fazem **cópia rasa** (*shallow copy*). Se o estado guarda um array de objetos — como uma lista de leitores ou tarefas —, copiar só o array e alterar `item.presente = true` ainda mutaria o objeto original!

Para atualizar um objeto específico dentro de um array, combinamos `.map(...)` com o spread no item alterado:

```tsx
setLeitores((atual) =>
  atual.map((leitor) =>
    leitor.id === id ? { ...leitor, presente: !leitor.presente } : leitor,
  ),
);
```

Esse padrão cria um novo array e um novo objeto **apenas** para o item que mudou; os demais itens mantêm sua referência original.

**Custo e limitações:** operações como `[...atual, novo]`, `filter`, `slice` e `map` percorrem a coleção e alocam um novo array — custo linear **O(n)** em tempo e memória para o array externo, sem clonar profundamente os itens inalterados. Para coleções típicas de tela, esse custo é pequeno e traz grande previsibilidade. Quando o volume de dados crescer muito, técnicas específicas entram no capítulo 70.

**Experimente:** no exemplo de `App.tsx`, tente temporariamente alterar `encontro.sala = "Auditório"` ou chamar `leitores.push("Ana")`. Veja como `readonly` faz o TypeScript barrar a mutação antes mesmo de executar no navegador. Restaure o código válido.

Agora faça a [etapa 1 da prática — Interação local e atualização imutável](03-pratica/atividades.md#atividade-1).

## 4. Estado derivado: calcular em vez de duplicar

### O problema: duas fontes de verdade saem de sincronia

Imagine que, no exemplo anterior, você queira exibir quantos participantes já confirmaram e quantas vagas sobram (para uma sala de 4 lugares).

Uma tentação frequente é criar outro `useState` para `vagasRestantes` e tentar atualizá-lo em cada botão. Basta esquecer um botão (ou adicionar uma ação de reiniciar) para a tela mostrar 4 participantes e 2 vagas restantes ao mesmo tempo.

Se um valor pode ser obtido a partir de props ou de estados que já existem, **não o coloque no `useState`**: calcule-o durante a renderização. Isso é **estado derivado**.

### Leitura principal

Em [Choosing the State Structure — React](https://react.dev/learn/choosing-the-state-structure#principles-for-structuring-state), leia o resumo inicial de **Principles for structuring state** e avance direto para **Avoid redundant state**, incluindo o quadro **Don’t mirror props in state**. Pule **Group related state**, **Avoid contradictions in state**, **Avoid duplication in state**, **Avoid deeply nested state** e os desafios. No exemplo de `fullName`, ignore os detalhes de `<input>` por enquanto e foque na remoção do estado redundante.

### Calcular na renderização e não espelhar props

No exemplo da etapa 3, não precisamos de nenhum novo `useState` para controlar a lotação — derivamos tudo direto de `leitores`:

```tsx
const CAPACIDADE = 4;
// Dentro de App, logo após useState:
const totalConfirmados = leitores.length;
const vagasRestantes = CAPACIDADE - totalConfirmados;
const lotado = vagasRestantes === 0;
```

No JSX, basta exibir `{totalConfirmados}` e `{vagasRestantes}`, e usar `disabled={lotado}` no botão de adicionar. Sempre que `leitores` mudar, os três valores são recalculados automaticamente — é impossível ficarem fora de sincronia.

Fique atento também ao erro descrito em **Don’t mirror props in state**:

```tsx
// Evite copiar uma prop para um estado se ela precisa acompanhar o pai:
function Cartao({ titulo }: { titulo: string }) {
  const [tituloAtual, setTituloAtual] = useState(titulo); // só lê `titulo` na 1ª renderização!
  // ...
}
```

O valor passado para `useState(...)` só serve como **valor inicial** na primeira renderização. Se o componente pai passar um `titulo` novo depois, `tituloAtual` continua preso ao valor antigo. Use a prop `titulo` diretamente, a menos que a intenção explícita seja ignorar atualizações futuras (caso em que a convenção é nomear a prop com `Inicial`, como `tituloInicial`).

**Custo e limitações:** recalcular valores derivados a cada renderização custa o próprio cálculo (ler `.length` é O(1); contar itens com `.filter(...)` é O(n)). Em listas comuns de interface, esse trabalho é irrelevante e evita bugs de sincronização. Evite otimizar prematuramente; medição e performance em React ficam para o capítulo 70.

## 5. Elevação de estado: uma fonte de verdade clara

### O problema: dois componentes precisam do mesmo dado

Na etapa 1 da prática, cada `ItemTarefa` cuidou do próprio clique usando estado local. Isso funcionou bem enquanto cada item era independente.

Mas agora imagine que queremos mostrar, no topo da página, quantas sessões estão confirmadas e quantas ainda estão pendentes — ou adicionar um botão para reiniciar todas de uma vez. Como o estado é **privado e isolado** em cada instância de componente, um irmão não consegue ler o estado do outro, nem o pai consegue lê-lo.

A solução em React é a **elevação de estado** (*lifting state up*): mover o estado para o **ancestral comum mais próximo** dos componentes que precisam compartilhar ou coordenar aquela informação.

### Leitura principal

Em [Sharing State Between Components — React](https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example), leia **Lifting state up by example** (com **Step 1**, **Step 2** e **Step 3**) e **A single source of truth for each state**. Pule o aprofundamento **Controlled and uncontrolled components** e os desafios finais. Nos exemplos da página, o operador ternário apenas escolhe mostrar o parágrafo ou o botão; estudaremos renderização condicional em detalhe no capítulo 24.

### Dados descem por props, ações sobem por callbacks

```text
          App (dono do estado + calcula estado derivado)
         /                                              \
props (resumo)                                  props (sessao + onAlternar)
       /                                                  \
 ResumoAgenda                                         CartaoSessao
                                               (clique → chama onAlternar)
```

Substitua `App.tsx` por este exemplo completo, que reúne todos os conceitos do capítulo:

```tsx
import { useState } from "react";

interface Sessao {
  readonly id: number;
  readonly tema: string;
  readonly confirmada: boolean;
}

interface ResumoAgendaProps {
  total: number;
  confirmadas: number;
}

function ResumoAgenda({ total, confirmadas }: ResumoAgendaProps) {
  return (
    <p>
      Sessões confirmadas: {confirmadas} de {total} (pendentes:{" "}
      {total - confirmadas})
    </p>
  );
}

interface CartaoSessaoProps {
  sessao: Sessao;
  onAlternar: (id: number) => void;
}

function CartaoSessao({ sessao, onAlternar }: CartaoSessaoProps) {
  return (
    <section>
      <h2>{sessao.tema}</h2>
      <p>Situação: {sessao.confirmada ? "Confirmada" : "Pendente"}</p>
      <button type="button" onClick={() => onAlternar(sessao.id)}>
        {sessao.confirmada ? "Desmarcar" : "Confirmar"}
      </button>
    </section>
  );
}

const SESSOES_INICIAIS: readonly Sessao[] = [
  { id: 1, tema: "Contos brasileiros", confirmada: false },
  { id: 2, tema: "Poesia contemporânea", confirmada: true },
];

export default function App() {
  const [sessoes, setSessoes] = useState<readonly Sessao[]>(SESSOES_INICIAIS);

  function handleAlternarSessao(id: number) {
    setSessoes((atual) =>
      atual.map((sessao) =>
        sessao.id === id
          ? { ...sessao, confirmada: !sessao.confirmada }
          : sessao,
      ),
    );
  }

  const totalConfirmadas = sessoes.filter((sessao) => sessao.confirmada).length;

  return (
    <main>
      <h1>Agenda de leitura</h1>
      <ResumoAgenda total={sessoes.length} confirmadas={totalConfirmadas} />
      <CartaoSessao sessao={sessoes[0]} onAlternar={handleAlternarSessao} />
      <CartaoSessao sessao={sessoes[1]} onAlternar={handleAlternarSessao} />
    </main>
  );
}
```

Acompanhe o fluxo quando alguém clica em **Confirmar** no primeiro cartão:

1. O `<button>` chama `() => onAlternar(sessao.id)` — repare na arrow function envolvendo a chamada para passar o argumento `sessao.id` somente na hora do clique.
2. `onAlternar` executa `handleAlternarSessao(1)` no `App`.
3. `App` gera um novo array com `.map(...)` e substitui apenas a sessão de `id === 1` por uma cópia atualizada.
4. `App` re-renderiza, recalcula `totalConfirmadas` (estado derivado) e envia os novos valores para `ResumoAgenda` e `CartaoSessao`.

Como o exemplo trabalha com duas sessões fixas, exibimos `sessoes[0]` e `sessoes[1]` explicitamente; no capítulo 24 vamos substituir isso pela renderização de listas dinâmicas com `map` e `key` no JSX.

### Até onde elevar o estado?

Ter uma única fonte de verdade para cada dado **não** significa jogar todo estado no `App`. Quanto mais alto o estado fica, mais componentes abaixo dele re-renderizam quando ele muda e mais props precisam atravessar níveis intermediários.

Mantenha o estado o mais perto possível do componente que o usa. Eleve apenas quando dois ou mais componentes precisarem compartilhar ou coordenar o mesmo dado. Para aplicações maiores, veremos outras estratégias de organização no capítulo 68.

Agora conclua a [etapa 2 da prática — Elevar o estado e derivar o resumo](03-pratica/atividades.md#atividade-2) e a mudança de requisito ao final dela.
