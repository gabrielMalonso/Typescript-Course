# Guia de estudo — HTML/CSS essencial e navegador

**Objetivo:** construir sua primeira página semântica, estilizada, responsiva e com uma interação simples. Entender o papel de HTML, CSS e JavaScript, observar o que o navegador faz com esses arquivos e tratar elementos que podem estar ausentes.

Até aqui, você representou dados e escreveu funções. Agora esses programas começam a encontrar uma interface: títulos, campos, botões e conteúdo que muda na tela. Os contratos dos capítulos anteriores continuam úteis; o navegador acrescenta objetos e comportamentos próprios.

O percurso é **aula → experimento no navegador → leitura curta → etapa do projeto**. Faça uma aula e sua etapa antes de seguir. A documentação complementa a explicação autoral; não é necessário percorrer módulos inteiros. Não há videoaula obrigatória nem leitura do CLRS neste capítulo.

## Como executar os exemplos

Use o editor e um navegador. Salve cada exemplo HTML completo em um arquivo separado, como `experimento.html`, e abra-o no navegador. Após uma mudança, salve e recarregue. Fragmentos menores indicam onde devem ser inseridos. Os exemplos são independentes do projeto.

Abra **Inspecionar** pelo menu de contexto da página. Usaremos apenas **Elements/Elementos**, **Styles/Estilos**, **Computed/Calculado** e **Console**; os nomes variam entre navegadores. Edições nesses painéis são temporárias e desaparecem ao recarregar. Mudanças permanentes devem ser salvas no arquivo.

O Pad de TypeScript usado nos capítulos anteriores não representa a página HTML destes experimentos. Nas aulas 1–4, abra os arquivos diretamente. A aula 5 explica como usar o `tsc` já conhecido para gerar o JavaScript de um exemplo. O navegador executa JavaScript, não um arquivo TypeScript com anotações.

**Limite desta etapa:** arquivos locais, CSS e APIs básicas do navegador. Preparação de projetos, npm, módulos, Vite e outras ferramentas entram no capítulo 21. React começa no capítulo 22. Não precisamos de servidor, API, persistência ou publicação para cumprir este capítulo.

## 1. Aula e leitura — HTML e navegador

Leia a [aula 1 — Estrutura, semântica e formulários](02-aulas-do-curso/01-html-e-navegador.md). Abra a página de uma oficina e experimente o formulário separado. Compare o código escrito com a estrutura mostrada pelo navegador.

Na MDN, leia [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax): **What is HTML?**, **Anatomy of an HTML element**, **Nesting elements**, **Void elements**, **Attributes**, **Boolean attributes** e **Anatomy of an HTML document**. Pule as atividades da documentação; faremos os experimentos da aula.

Em [Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form#implementing_our_form_html), leia somente **Implementing our form HTML** e suas subseções sobre `form`, `label`, `input`, `textarea` e `button`. Pare antes de **Basic form styling**. O endereço de servidor do exemplo da MDN não faz parte da nossa atividade.

Faça a [etapa 1 — Estrutura da página de tarefas](03-pratica/atividades.md#atividade-1).

## 2. Aula e leitura — CSS e box model

Leia a [aula 2 — Regras, conflitos e tamanho das caixas](02-aulas-do-curso/02-css-e-box-model.md). Primeiro preveja o tamanho de uma caixa; depois confira a medida e a declaração vencedora no inspetor.

Em [The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model#what_is_the_css_box_model), leia **What is the CSS box model?**, incluindo os modelos padrão e alternativo, e **Using browser DevTools to view the box model**. As seções sobre caixas inline ficam fora desta leitura.

Em [Handling conflicts](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts#conflicting_rules), leia **Conflicting rules**, incluindo **Cascade**, **Specificity** e **Inheritance**. Pare antes de **Understanding how the concepts work together**. A aula aplica esse mecanismo ao caso simples de regras do mesmo arquivo.

Faça a [etapa 2 — Aparência e espaçamento](03-pratica/atividades.md#atividade-2). A tabela de unidades da aula é suficiente para começar; não memorize uma referência inteira de CSS.

## 3. Aula e leitura — Flexbox e Grid

Leia a [aula 3 — Organizar uma linha e uma grade](02-aulas-do-curso/03-flexbox-e-grid.md). Mude a direção de uma barra de links e a proporção das colunas de uma pequena biblioteca.

Em [Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox#the_flex_model), leia **The flex model**, **Columns or rows?**, **Wrapping** e **Horizontal and vertical alignment**. Pule dimensionamento flexível avançado, reordenação e exemplos aninhados.

Em [CSS grid layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids#creating_your_grid_in_css), leia **Creating your grid in CSS**, apenas as subseções **Defining a grid**, **Flexible grids with the fr unit** e **Gaps between tracks**. Pule o exercício interativo intermediário e pare antes de **Repeating track listings**. Posicionamento por linhas, áreas e subgrid ficam fora do capítulo.

Faça a [etapa 3 — Organização do layout](03-pratica/atividades.md#atividade-3).

## 4. Aula e leitura — Responsividade e acessibilidade

Leia a [aula 4 — Uma página que cabe e pode ser usada](02-aulas-do-curso/04-responsividade-e-acessibilidade.md). Teste uma largura pequena e percorra o formulário com o teclado.

Em [Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design), leia somente **Media Queries** e **The viewport meta tag**. Imagens e tipografia responsiva avançadas não são necessárias aqui.

No W3C/WAI, leia [Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/): introdução e **Associating labels explicitly**. Pare antes de **Associating labels implicitly**. Observe que um rótulo visível explica o campo e também fornece seu nome para tecnologias assistivas.

Faça a [etapa 4 — Tela pequena e teclado](03-pratica/atividades.md#atividade-4).

## 5. Aula e leitura — DOM e eventos

Leia a [aula 5 — Encontrar elementos e responder a ações](02-aulas-do-curso/05-dom-e-eventos.md). Execute a saudação no navegador, teste um seletor sem resultado e reconheça a ponte com `null` e narrowing.

Consulte [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector): introdução, **Syntax**, **Return value** e o primeiro exemplo, **Finding the first element matching a class**. Seletores complexos e escaping ficam fora da leitura.

Em [EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), leia a introdução e, em **Syntax → Parameters**, apenas `type` e `listener`. Em [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), leia apenas a introdução. Opções de listeners, propagação e cancelamento avançado ficam para depois.

Faça a [etapa 5 — Adicionar uma tarefa](03-pratica/atividades.md#atividade-5). O professor acompanha a implementação; o enunciado define o comportamento e os casos de verificação, sem fornecer uma solução.

## Ao terminar

Você deve conseguir explicar uma regra de CSS observada no inspetor, testar a página com teclado e identificar a sequência **ação → evento → função → alteração do DOM**. Use os critérios da prática para avaliar a sua tentativa com o professor; criar os materiais não significa concluir o estudo.

As fontes adicionais usadas para conferir semântica, unidades, tipos DOM, texto e acessibilidade estão junto aos conceitos nas aulas, com seus limites. No capítulo 21, vamos organizar e executar projetos de frontend com ferramentas próprias, partindo desses mecanismos.
