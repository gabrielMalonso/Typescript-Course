# HTML e navegador — Estrutura, semântica e formulários

## Do resultado no console ao conteúdo na página

Uma função pode devolver uma string, mas alguém precisa apresentá-la. Uma página combina três responsabilidades:

| Parte | Responsabilidade | Exemplo |
|---|---|---|
| HTML | Descrever conteúdo e significado | Este texto é um título; este controle é um botão |
| CSS | Definir apresentação e layout | Cor, espaço e posição dos elementos |
| JavaScript | Executar comportamento | Responder ao envio e mudar um texto |

O **navegador** lê os arquivos, constrói uma representação do documento e desenha a página. Ele também oferece objetos para o JavaScript interagir com esse documento. Diferentemente de Node, o navegador tem uma página; objetos como `document` pertencem a esse ambiente, não à linguagem JavaScript em qualquer lugar.

Nesta aula, começamos pelo conteúdo. Um HTML sem CSS próprio já aparece na tela porque o navegador tem estilos padrão.

## Um elemento descreve uma parte do conteúdo

HTML é uma linguagem de marcação. Não usamos loops para dizer que algo é um parágrafo; marcamos esse significado:

```html
<p>A oficina começa às 14h.</p>
```

`<p>` é a tag de abertura; `</p>` é a de fechamento. O conjunto das tags e do conteúdo forma um **elemento**. Podemos colocar um elemento dentro de outro:

```html
<p>Traga um <strong>caderno</strong>.</p>
```

`strong` indica importância. O navegador normalmente destaca esse trecho em negrito, mas o significado não depende de uma aparência específica. Feche primeiro o elemento mais interno: `strong` termina antes de `p`.

Alguns elementos são **vazios**: não têm conteúdo nem tag de fechamento. `input`, `meta` e `link` são exemplos. Não escreva `</input>`.

Um **atributo** acrescenta informação à tag de abertura:

```html
<a href="https://developer.mozilla.org/">Consultar a MDN</a>
```

`a` representa um link; `href` informa o destino. Use aspas nos valores. O texto do link deve explicar aonde ele leva.

Dois atributos serão recorrentes: `id` identifica um elemento e deve ser único no documento; `class` agrupa elementos para receber estilos, e pode ser repetido. Um elemento pode ter várias classes separadas por espaços. Esses nomes não mudam sua semântica.

## Uma primeira página completa

O documento começa com `<!doctype html>`, que orienta o modo padrão de renderização. `html` reúne tudo; `lang="pt-BR"` informa o idioma. Dentro dele, `head` contém informações sobre a página e `body` contém seu conteúdo.

No `head`, `meta charset="utf-8"` indica a codificação esperada para interpretar o texto, incluindo acentos; `title` nomeia a aba. A linha de `viewport` prepara o documento para telas pequenas; explicaremos seu efeito na aula 4.

No conteúdo, vamos usar `header` para a apresentação, `nav` para a navegação, `main` para o conteúdo principal e `footer` para informações finais. `section` delimita um assunto com título. `h1` é o título principal visível e `h2` nomeia um assunto dentro dele. `ul` é uma lista sem ordem obrigatória; cada `li` é um item.

Salve este exemplo como `oficina.html` e abra-o no navegador:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Oficina de desenho</title>
  </head>
  <body>
    <header>
      <h1>Oficina de desenho</h1>
      <p>Um encontro para começar a desenhar.</p>
      <nav>
        <a href="#materiais">Ver materiais</a>
      </nav>
    </header>
    <main>
      <section id="materiais">
        <h2>Materiais para levar</h2>
        <ul>
          <li>Caderno sem pauta</li>
          <li>Lápis</li>
        </ul>
      </section>
    </main>
    <footer>
      <p>Encontro aberto a iniciantes.</p>
    </footer>
  </body>
</html>
```

Compare a aba com o conteúdo: `title` e `h1` aparecem em lugares diferentes. O idioma declarado também ajuda leitores de tela. Mantenha a linha de `viewport` nos próximos documentos.

## Escolher elementos pelo significado

**Semântica** é o significado que a marcação comunica. Ao marcar a apresentação, a navegação e a lista, não estamos apenas desenhando caixas: estamos identificando suas funções no documento.

Use um `h1` para o título principal desta página e `h2` para os assuntos dentro dela. A hierarquia representa o conteúdo, não o tamanho de fonte desejado. Se precisar mudar o tamanho, usaremos CSS.

`div` é um agrupamento genérico, útil quando precisamos de uma caixa para layout sem um significado específico. Não precisa substituir cada `div` por `section`, nem criar regiões vazias só para usar mais tags. O objetivo é representar o conteúdo que existe.

Um link navega para um destino. Um botão executa uma ação. Elementos nativos também fornecem comportamento de teclado e informações para tecnologias assistivas; um `div` com aparência de botão não recebe tudo isso automaticamente. A [MDN — Structuring documents](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents#html_for_structuring_content) fundamenta essa escolha; consulte apenas **HTML for structuring content** se precisar rever os elementos.

## Experimento — o código e o documento do navegador

Com `oficina.html` aberta:

1. Clique em **Ver materiais**. O endereço ganha `#materiais` e o navegador localiza o elemento com esse `id`. Não foi necessário escrever JavaScript.
2. Inspecione o `h1` e localize seus elementos pais: `header`, `body` e `html`. A indentação do código ajuda a enxergar essa relação.
3. No painel de elementos, mude o texto do `h1`. A tela muda, mas o arquivo continua igual. Recarregue: o texto original volta.

**Resultado esperado:** distinguir o arquivo de origem da representação atual mantida pelo navegador. Na aula 5, chamaremos essa representação de DOM e a alteraremos por código.

O navegador tenta corrigir algumas marcações inválidas; abrir uma página sem erro visível não prova que a estrutura está correta. Confira o aninhamento e a escolha dos elementos.

## Um formulário reúne entradas

Um **formulário** agrupa controles de entrada e uma ação de envio. Antes do exemplo, conheça as peças:

| Peça | Função |
|---|---|
| `form` | Agrupar os campos que participam do envio |
| `label` | Dizer qual informação o controle pede |
| `input type="text"` | Receber uma linha de texto |
| `input type="email"` | Receber texto com verificação básica de formato de email |
| `textarea` | Receber várias linhas de texto |
| `button type="submit"` | Solicitar o envio do formulário |

O atributo `for` do `label` aponta para o `id` do controle. `name` é o nome do campo no envio; não substitui `id`. `required` é um atributo booleano: sua presença torna o preenchimento obrigatório. Para desativá-lo, remova o atributo; `required="false"` continua presente e não desativa a exigência.

Crie uma cópia da página da oficina chamada `inscricao.html`. Mantenha `doctype`, `html` e `head`, mude o `title` e substitua todo o `body` por este fragmento:

```html
<body>
  <main>
    <h1>Interesse na oficina</h1>
    <p>Experimento local: nenhum cadastro será realizado.</p>
    <form>
      <p>
        <label for="email">Seu email</label>
        <input id="email" name="email" type="email" required>
      </p>
      <button type="submit">Enviar interesse</button>
    </form>
  </main>
</body>
```

**Entradas do experimento:** primeiro deixe o campo vazio; depois digite `abc`; por último, `ana@example.com`, um endereço fictício para o teste.

**Resultados esperados:** ao tentar enviar, o navegador bloqueia os dois primeiros casos com sua validação nativa. O terceiro permite o envio padrão e pode recarregar/navegar para o próprio documento, acrescentando o campo ao endereço. Sem `action`, o destino é o documento atual; o método padrão é GET. A aparência da mensagem e o comportamento do endereço local variam entre navegadores. Não há serviço recebendo um cadastro aqui.

Clique no rótulo: o campo recebe foco. A validação do navegador confere uma restrição local; ela não confirma que o endereço existe. HTML também não implementou o armazenamento de inscrições. Na aula 5, veremos como uma função assume o envio para produzir uma resposta na própria página.

Faça a leitura curta da [etapa 1 do guia](../README.md#etapa-1) e implemente a [etapa 1 do projeto](../03-pratica/atividades.md#atividade-1) com o professor.

[Voltar ao guia — etapa 1](../README.md#etapa-1)
