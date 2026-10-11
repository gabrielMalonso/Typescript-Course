# DOM e eventos — Encontrar elementos e responder a ações

## O navegador mantém objetos para representar a página

Na aula 1, editar um título no inspetor mudou a tela. Agora vamos fazer isso por código.

O **DOM**, *Document Object Model*, é a representação do documento como objetos ligados em uma árvore. Elementos e textos são nós dessa árvore. Não é uma cópia de uma imagem da tela; CSS determina a apresentação desses elementos.

```text
document
└── html
    ├── head
    └── body
        └── main
            ├── h1
            ├── form
            └── p
```

`document` é o objeto de entrada para consultar a página atual. A árvore muda quando JavaScript acrescenta ou altera elementos; o arquivo HTML de origem não é reescrito por isso. Recarregar constrói uma nova página a partir dos arquivos.

## Selecionar pode encontrar ou não encontrar

`document.querySelector()` recebe um seletor CSS válido e devolve o primeiro elemento correspondente. Se não houver correspondência, devolve `null`. É a mesma ideia de uma busca que pode não encontrar um registro.

`textContent` permite ler ou substituir o conteúdo textual de um elemento. Ao atribuir um texto, substituímos todo o seu conteúdo, inclusive elementos internos. Vamos usá-lo em um título simples.

Abra uma página dos experimentos anteriores e execute no Console do navegador, um bloco por vez:

```js
const titulo = document.querySelector("h1");
if (titulo !== null) {
  titulo.textContent = "Texto alterado no navegador";
}
```

Para escrever texto recebido de uma pessoa, use `textContent` em um elemento destinado àquele texto. Não interprete essa entrada como HTML.

Agora consulte um seletor que sabemos não existir nesses exemplos:

```js
const ausente = document.querySelector("#nao-existe");
console.log(ausente); // null
```

**Resultado esperado:** ausência é um resultado possível, sem exceção para esse seletor válido. Tentar usar `ausente.textContent` falharia, porque `null` não é um elemento. Nome errado, elemento removido ou consulta feita antes de o HTML ser lido podem produzir ausência. Seletores com sintaxe inválida são outro problema e podem lançar um erro.

No TypeScript estrito, uma consulta geral tem tipo `Element | null`. `Element` é o contrato de um elemento DOM; `null` representa a ausência. O teste `!== null` reduz o tipo dentro do bloco, como o narrowing que você já conhece. Não use `!` ou `as` para fingir que a busca encontrou algo.

## Um evento chama uma função

Um **evento** informa que algo aconteceu: um botão foi ativado (`click`), o conteúdo de um campo mudou (`input`) ou um formulário recebeu uma tentativa válida de envio (`submit`).

`addEventListener` registra uma função para responder a um tipo de evento. Essa função é um **listener**. A relação é:

```text
ação da pessoa → evento → callback registrado → atualização do DOM
```

Antes da interação completa, experimente um botão. A mensagem ficará em um parágrafo com `role="status"`: uma região de resultado cujo texto atualizado pode ser anunciado por leitores de tela, sem levar o foco à mensagem. Essa região deve existir antes da atualização. A [MDN — ARIA: status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role#description) explica esse comportamento; consulte os dois primeiros parágrafos de **Description**.

O `script` ficará depois dos elementos, para consultá-los quando já tiverem sido lidos. Em uma cópia de `oficina.html`, substitua o `body` por este fragmento:

```html
<body>
  <main>
    <h1>Um clique</h1>
    <button id="botao" type="button">Mostrar aviso</button>
    <p id="aviso" role="status"></p>
  </main>
  <script>
    const botao = document.querySelector("#botao");
    const aviso = document.querySelector("#aviso");
    if (botao !== null && aviso !== null) {
      botao.addEventListener("click", () => {
        aviso.textContent = "O botão foi ativado.";
      });
    } else {
      console.error("Não foi possível encontrar o botão ou o aviso.");
    }
  </script>
</body>
```

`() => { ... }` é uma função passada como valor, não uma chamada imediata. O código dentro dela espera pelo evento.

**Teste:** a mensagem aparece ao clicar e ao ativar o botão com teclado. Depois renomeie o `id` do botão no HTML, sem mudar o seletor: a mensagem de diagnóstico aparece no Console e o listener não é registrado. Restaure o `id` e recarregue.

## Ler um campo exige conhecer o elemento

Todo elemento tem operações gerais, mas `.value` pertence a controles como `input`, não a qualquer `Element`. Para reconhecer um input em execução, usaremos `instanceof HTMLInputElement`.

`instanceof` pergunta se o objeto é uma instância de uma construção conhecida. O navegador fornece `HTMLInputElement`, `HTMLFormElement` e outros tipos de elementos. Neste caso, o teste verifica o tipo de elemento real e também elimina `null`. Você não precisa criar classes nem estudar todos os usos de `instanceof` agora.

Para o próximo exemplo, precisamos ainda de quatro operações:

- `campo.value` lê o texto atual do input.
- `texto.trim()` devolve uma string sem espaços nas pontas; só espaços resulta em `""`.
- `campo.focus()` leva o foco ao campo.
- `evento.preventDefault()` impede a ação padrão de um evento cancelável. No `submit`, vamos impedir a navegação para responder na própria página.

Ouça o `submit` no formulário. Assim o mesmo fluxo atende o botão de envio e `Enter` no campo, sem registrar duas implementações. A validação nativa acontece antes: um campo `required` vazio normalmente impede que o `submit` seja disparado.

## Experimento — uma saudação no navegador com TypeScript

Em uma pasta de experimentos, salve estes dois arquivos. Este exemplo é uma saudação, não o projeto de tarefas.

No HTML, `src` apontará para o arquivo JavaScript gerado. Em um script externo como este, `defer` adia a execução até o HTML ter sido analisado. Isso permite colocá-lo no `head` e consultar os elementos do `body`.

**`saudacao.html`:**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Uma saudação</title>
    <script src="interacao.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Uma saudação</h1>
      <form id="saudacao">
        <label for="nome">Nome (obrigatório)</label>
        <input id="nome" name="nome" type="text" required>
        <button type="submit">Cumprimentar</button>
      </form>
      <p id="resultado" role="status"></p>
    </main>
  </body>
</html>
```

**`interacao.ts`:**

```ts
const formulario = document.querySelector("#saudacao");
const campo = document.querySelector("#nome");
const resultado = document.querySelector("#resultado");

if (
  formulario instanceof HTMLFormElement &&
  campo instanceof HTMLInputElement &&
  resultado !== null
) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = campo.value.trim();

    if (nome === "") {
      resultado.textContent = "Digite um nome, não apenas espaços.";
      campo.focus();
      return;
    }

    resultado.textContent = `Olá, ${nome}!`;
    campo.value = "";
    campo.focus();
  });
} else {
  console.error("Confira o formulário, o campo e a mensagem no HTML.");
}
```

O listener recebe o objeto do evento; TypeScript infere seu tipo pela API. As consultas usam `const`, e os testes antes do registro permitem acessar os elementos com segurança no callback. No ramo de falha, não tentamos registrar a interação em elementos ausentes ou do tipo errado.

Abra o terminal **na pasta desses dois arquivos** e use o compilador já conhecido:

```bash
tsc --ignoreConfig interacao.ts --target ES2022 --module ES2022 --lib ES2022,DOM --strict --noEmitOnError
```

Esse comando verifica e gera `interacao.js` ao lado do `.ts`. No TypeScript 6, `--ignoreConfig` permite compilar um arquivo diretamente sem carregar o `tsconfig.json` encontrado no repositório; explicitamos modo estrito e bibliotecas. Se seu compilador for TypeScript 5 e não reconhecer essa opção, retire apenas `--ignoreConfig`: nessa versão, passar o arquivo diretamente já ignora a configuração. Essa diferença é documentada nas [notas do TypeScript 6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#specifying-command-line-files-when-tsconfigjson-exists-is-now-an-error); consulte somente essa seção se encontrar a mensagem TS5112.

`DOM` disponibiliza os contratos das APIs do navegador. Como este arquivo não usa `import` nem `export`, ele continua sendo um script simples na saída gerada com essas opções. Mantenha-o assim neste experimento; a organização em módulos entra no próximo capítulo.

Abra `saudacao.html`. Sempre que mudar o `.ts`, compile novamente e recarregue a página. Se o compilador apontar um erro, corrija-o antes de usar o resultado: `--noEmitOnError` impede uma nova saída, mas um `.js` antigo pode continuar na pasta.

| Entrada/ação | Resultado esperado |
|---|---|
| Enviar o campo vazio | Bloqueio nativo de `required` |
| Enviar três espaços | Mensagem pedindo um nome; foco no campo |
| Enviar ` Ana ` | `Olá, Ana!`; campo limpo e focado |
| Digitar `Bia` e pressionar `Enter` | Mesma interação, sem navegar nem recarregar |
| Enviar `<b>Ana</b>` | Texto literal na saudação; nenhuma tag em negrito é criada |
| Trocar `id="nome"` por outro nome e recarregar | Diagnóstico no Console; interação não registrada |

Restaure o `id` depois do último teste. A página perde a saudação ao recarregar: alterar DOM não é persistir dados.

## Criar um elemento e inseri-lo

Para uma lista crescer, não basta selecionar os itens que já existem. `document.createElement()` cria um elemento ainda desconectado; `append()` o insere como filho ao final de outro elemento. `classList.add()` acrescenta uma classe sem trocar todas as classes existentes.

Experimente na página `saudacao.html`, pelo Console, depois de recarregar:

```js
const principal = document.querySelector("main");
if (principal !== null) {
  const nota = document.createElement("p");
  nota.textContent = "Experimento concluído.";
  nota.classList.add("nota");
  principal.append(nota);
}
```

**Resultado esperado:** aparece um novo parágrafo no fim de `main`; o inspetor mostra sua classe. A classe só muda a aparência se existir uma regra CSS correspondente. `createElement("input")` produz um input; podemos configurar propriedades como `type`, `id` e `name` antes de inseri-lo. `htmlFor`, no objeto de um `label`, corresponde ao atributo HTML `for`.

Criar elementos abstrai a construção e a ligação de nós do DOM. O navegador ainda precisa calcular a apresentação e desenhar as mudanças. Registre os listeners de inicialização uma vez, não a cada envio, para não acumular callbacks. Não precisamos de otimizações ou um sistema de renderização para esta interação pequena.

A [documentação TypeScript — DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html#the-queryselector-and-queryselectorall-methods) foi usada para conferir contratos e retornos; consulte apenas o primeiro parágrafo de **The querySelector and querySelectorAll methods** se quiser rever `Element | null`. As assinaturas genéricas ficam fora desta leitura. A [MDN — textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#value) explica a substituição do conteúdo; consulte **Value** e **Differences from innerHTML** se precisar rever o cuidado com texto.

Faça as leituras da [etapa 5 do guia](../README.md#etapa-5) e implemente a [etapa 5 do projeto](../03-pratica/atividades.md#atividade-5), uma tentativa por vez com o professor.

[Voltar ao guia — etapa 5](../README.md#etapa-5)
