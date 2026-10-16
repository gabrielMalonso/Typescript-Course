# Capítulo 22 — React + TypeScript: componentes e props

**Objetivo:** transformar dados em interface, criar componentes funcionais e conectá-los por contratos tipados. Ao final, você terá uma versão de leitura da página de tarefas, dividida em componentes.

O ponto de partida é conhecido: HTML descreve conteúdo, CSS cuida da apresentação e funções respondem a eventos. Agora vamos aprender outra maneira de organizar esse trabalho.

**Percurso:** componente → JSX com dados → props tipadas → composição com `children`. Em cada etapa, leia o recorte oficial indicado e use a explicação curta para conectá-lo ao que você já sabe. A documentação é a leitura principal; seus desafios e aprofundamentos são opcionais e ficam fora deste percurso.

**Escopo:** a página deste capítulo apenas apresenta dados. Estado e eventos em React entram no capítulo 23; formulários, listas com `map`, `key` e renderização condicional, no 24. Não precisamos desses recursos para aprender componentes.

## 1. Do HTML a um componente

### O problema: manter uma parte da interface junto

No capítulo 20, você encontrou elementos com `querySelector` e alterou seu `textContent`. Conforme a página cresce, seu código precisa coordenar os dados e os elementos que os mostram.

React permite organizar a interface em **componentes**: partes com nome e responsabilidade própria. Um componente descreve o que deve aparecer a partir dos dados recebidos. React usa essa descrição para criar e atualizar o DOM. Esse modo de trabalhar é chamado de **declarativo**.

O navegador continua usando DOM, CSS e eventos. O que muda é como escrevemos a interface: dentro da região gerenciada por React, deixamos que ele cuide dos elementos, em vez de atualizá-los manualmente.

### Leitura principal

Em [Your First Component — React](https://react.dev/learn/your-first-component#components-ui-building-blocks), leia **Components: UI building blocks**, **Defining a component** e **Using a component**, incluindo **What the browser sees** e **Nesting and organizing components**. Pare antes do aprofundamento **Components all the way down**. Pule os desafios finais.

Observe duas coisas: o componente é uma função e as tags HTML continuam dentro dela.

### A primeira função que descreve uma tela

Os exemplos do capítulo usam um encontro de leitura, independente do projeto de tarefas. Depois de [preparar o laboratório](03-pratica/atividades.md#preparar-o-laboratorio), substitua o conteúdo de `src/App.tsx` por este exemplo:

```tsx
export default function App() {
  return (
    <main>
      <h1>Encontro de leitura</h1>
      <p>Uma conversa sobre livros.</p>
    </main>
  );
}
```

A função retorna **JSX**, uma sintaxe parecida com HTML que permite descrever a interface no código. Em TypeScript, arquivos com JSX usam a extensão **`.tsx`**. Arquivos que contêm apenas tipos ou funções comuns podem continuar como `.ts`.

`export default` é a exportação padrão que você conheceu no capítulo 21. A entrada do template importa `App` e pede ao React que o apresente dentro do elemento `root` do `index.html`. Para este exemplo, mantenha essa entrada; não é necessário reescrevê-la.

**Experimente:** altere o título no arquivo e salve. Depois encontre o `h1` no inspetor. Você verá os elementos HTML resultantes; `App` não acrescenta uma tag `<App>` ao DOM.

## 2. JSX: a estrutura recebe dados

### Leitura principal

Em [Writing Markup with JSX — React](https://react.dev/learn/writing-markup-with-jsx#jsx-putting-markup-into-javascript), leia **JSX: Putting markup into JavaScript**, **Converting HTML to JSX** e **The Rules of JSX**. Pule o aprofundamento **Why do multiple JSX tags need to be wrapped?** e pare antes de **Pro-tip: Use a JSX Converter**. Atente ao fechamento das tags, ao agrupamento com `<>...</>` e a `className` no lugar de `class`.

Depois, em [JavaScript in JSX with Curly Braces — React](https://react.dev/learn/javascript-in-jsx-with-curly-braces#passing-strings-with-quotes), leia **Passing strings with quotes** e **Using curly braces: A window into the JavaScript world**, incluindo **Where to use curly braces**. Pare antes de **Using “double curlies”: CSS and other objects in JSX**. Continuaremos usando arquivos CSS.

No [Handbook de TypeScript — JSX](https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage), leia apenas a introdução e os dois requisitos iniciais de **Basic usage**: extensão `.tsx` e opção `jsx`. Pare antes da descrição dos modos de compilação. O template já configura essa opção.

### A ponte com variáveis e expressões

Imagine que o título venha de uma variável. Em vez de procurar o `h1` e atribuir `textContent`, colocamos o valor na descrição da interface.

Substitua o exemplo anterior em `App.tsx`:

```tsx
export default function App() {
  const tema = "Contos brasileiros";
  const duracao = 45;

  return (
    <main>
      <h1>{tema}</h1>
      <p>Duração: {duracao} minutos</p>
      <a href="#detalhes">Ver detalhes</a>
      <p id="detalhes">Traga um conto para compartilhar.</p>
    </main>
  );
}
```

Dentro das tags, `tema` seria texto literal; `{tema}` lê a variável. As chaves também aceitam expressões como `{duracao + 15}`. Declarações como `const` ficam antes do `return`, não entre as tags.

O link ainda é um link HTML: funciona pelo seu `href`, sem precisar de código React para o clique. A semântica e os comportamentos nativos continuam úteis.

**Experimente:** troque o valor de `tema` por `"<b>Contos</b>"`. O resultado deve mostrar os sinais de `<` e `>` como texto, sem criar um elemento `b`. Você já usou esse cuidado ao apresentar texto pelo DOM.

## 3. Props: os parâmetros do componente

### O problema: mesma estrutura, dados diferentes

Se dois encontros têm título e duração, copiar a marcação inteira dificulta mudar sua apresentação. Podemos escrever essa estrutura uma vez e fornecer dados diferentes em cada uso.

Esses dados são as **props**, abreviação de *properties*. O componente recebe um objeto de props como parâmetro. Tipar esse objeto é aplicar os contratos de funções e objetos que você já conhece.

### Leitura principal

Em [Passing Props to a Component — React](https://react.dev/learn/passing-props-to-a-component#familiar-props), leia **Familiar props**, **Passing props to a component** e **Specifying a default value for a prop**. Pare antes de **Forwarding props with the JSX spread syntax**. Deixe `children` para a próxima etapa.

Em [Using TypeScript — React](https://react.dev/learn/typescript#typescript-with-react-components), leia somente **TypeScript with React Components**, incluindo a nota sobre os exemplos online não executarem a checagem de tipos. Pare antes de **Example Hooks**; não siga os links de tipos avançados.

### Um contrato conhecido, aplicado ao JSX

Substitua `App.tsx` por este exemplo:

```tsx
interface EncontroProps {
  titulo: string;
  duracao?: number;
}

function Encontro({ titulo, duracao = 30 }: EncontroProps) {
  return (
    <section>
      <h2>{titulo}</h2>
      <p>Duração: {duracao} minutos</p>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <h1>Agenda de leitura</h1>
      <Encontro titulo="Contos" duracao={45} />
      <Encontro titulo="Poesia" />
    </main>
  );
}
```

Leia o exemplo de cima para baixo:

1. `EncontroProps` exige um título e permite omitir a duração.
2. O parâmetro usa **destructuring** para retirar esses campos do objeto recebido.
3. `duracao = 30` fornece o valor padrão quando a prop é omitida ou vale `undefined`. O valor `0` continua sendo `0`.
4. `App` escolhe os dados; `Encontro` escolhe como apresentá-los.

`<Encontro />` usa um componente; `<section>` descreve um elemento HTML. A inicial maiúscula faz essa distinção. Use o componente pelo JSX e deixe React chamar a função. Mantenha a definição de `Encontro` fora da função `App`.

`titulo="Contos"` passa uma string. `duracao={45}` passa um número; `duracao="45"` passaria uma string e violaria o contrato.

**Experimente:** omita temporariamente `titulo` em um uso. Confira o erro no editor e na checagem de tipos do projeto; depois restaure a prop. Uma página aparecer no servidor de desenvolvimento não comprova que seus tipos estão corretos.

### Props são entradas de leitura

O componente não deve alterar suas props, inclusive campos de objetos recebidos. Ele pode calcular valores locais para exibir. Quando o pai fornecer outros dados, a interface poderá refletir esses valores; props não significam dados permanentemente fixos.

No laboratório, vamos mudar os dados no código e salvar. Responder a ações da pessoa será o próximo passo do curso.

Agora faça a [etapa 1 da prática — Da página aos componentes](03-pratica/atividades.md#atividade-1).

## 4. Composição: escolher o conteúdo de dentro

### O problema: uma mesma caixa, conteúdos diferentes

Props como `titulo` e `duracao` recebem dados específicos. Mas uma moldura pode envolver um parágrafo hoje e um componente amanhã. Ela precisa receber o conteúdo a apresentar, sem decidir todos os seus detalhes.

**Composição** é montar uma interface usando outras partes. Você já fez isso quando `App` usou dois `Encontro`. A prop **`children`** permite outra forma de composição: passar conteúdo entre as tags de um componente.

### Leitura principal

Volte a [Passing Props to a Component — React](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) e leia somente **Passing JSX as children**. Pare antes de **How props change over time**; não precisamos do exemplo de relógio.

Em [Using TypeScript — Children](https://react.dev/learn/typescript#typing-children), leia a apresentação e o primeiro exemplo, com `React.ReactNode`. Pare antes da alternativa com `React.ReactElement`. Basta conhecer um tipo para o nosso contrato.

### Uma prop para conteúdo renderizável

Este é outro exemplo independente para `App.tsx`:

```tsx
import type { ReactNode } from "react";

interface MolduraProps {
  children: ReactNode;
}

function Moldura({ children }: MolduraProps) {
  return <div className="moldura">{children}</div>;
}

export default function App() {
  return (
    <main>
      <h1>Antes do encontro</h1>
      <Moldura>
        <p>Escolha uma leitura curta.</p>
      </Moldura>
      <Moldura>Participação gratuita.</Moldura>
    </main>
  );
}
```

O `App` fornece o conteúdo entre as tags. `Moldura` o recebe em `children` e decide onde exibi-lo. Sem `{children}` no retorno, esse conteúdo não apareceria. A classe `moldura` pode ser estilizada no CSS importado pela aplicação, como qualquer outra classe.

`ReactNode` é um tipo fornecido pelos tipos do React. Aceita conteúdo renderizável, como JSX, strings e números; também admite ausência, como `null`. Ele não garante conteúdo visível. `import type` traz apenas o tipo, como no capítulo 21.

### Onde dividir

Extraia um componente quando ele representar uma responsabilidade clara ou uma estrutura que se repete. Não é preciso criar um componente para cada tag. A divisão organiza o código, mas não elimina o trabalho de criar elementos, aplicar CSS ou renderizar conteúdo.

Componentes pequenos podem compartilhar um arquivo. Quando separar arquivos ajudar a leitura, use os imports e exports já conhecidos. Para este capítulo, funções comuns com props tipadas e retorno inferido são suficientes.

Faça a [etapa 2 da prática — Uma seção que recebe conteúdo](03-pratica/atividades.md#atividade-2) e a pequena mudança de requisito ao final dela. O professor acompanha a implementação e usa os critérios da prática para discutir a divisão escolhida.
