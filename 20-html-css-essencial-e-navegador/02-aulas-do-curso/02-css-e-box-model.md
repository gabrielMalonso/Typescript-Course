# CSS e box model — Regras, conflitos e tamanho das caixas

## O mesmo conteúdo pode ter outra apresentação

A página da oficina já tem títulos e listas, mas usa a aparência padrão do navegador. **CSS** é a linguagem que descreve como apresentar os elementos. Uma regra tem um seletor e declarações:

```css
p {
  color: navy;
}
```

O **seletor** `p` escolhe os parágrafos. A declaração `color: navy;` atribui o valor `navy` à propriedade `color`, que controla a cor do texto. As chaves agrupam declarações, separadas por ponto e vírgula. Comentários em CSS usam `/* comentário */`.

Podemos colocar CSS em um elemento `style` dentro de `head`, como nos experimentos, ou em um arquivo separado. Para um arquivo `estilos.css` na mesma pasta do HTML, a conexão no `head` é:

```html
<link rel="stylesheet" href="estilos.css">
```

`rel` informa a relação com o documento e `href` localiza o arquivo. Salvar CSS sem conectá-lo ao HTML não muda a página. No projeto, você vai separar os arquivos; nos exemplos, `style` mantém o experimento pequeno.

## Selecionar elementos sem mudar seu significado

| Seletor | Seleciona |
|---|---|
| `p` | Todos os elementos `p` |
| `.aviso` | Elementos com a classe `aviso` |
| `#mensagem` | O elemento com `id="mensagem"` |
| `.painel p` | Parágrafos que estão dentro de um elemento com classe `painel` |
| `input, button` | Inputs e botões; a vírgula separa seletores |
| `*` | Todos os elementos |

Prefira classes para estilos que serão reutilizados. O ponto pertence ao seletor CSS: no HTML escrevemos `class="aviso"`, sem ponto. O espaço em `.painel p` expressa uma relação com descendentes, não o nome de uma classe.

## Por que uma declaração vence outra?

Mais de uma regra pode alcançar o mesmo elemento. A **cascata** é o processo que decide qual valor prevalece para cada propriedade. O navegador também aplica suas próprias regras padrão.

Neste capítulo, compare declarações normais do mesmo arquivo, sem estilos no atributo `style`, camadas, animações ou `!important`. Dentro desse limite:

1. Considere apenas regras cujo seletor alcança o elemento.
2. Compare a **especificidade**, o peso do seletor.
3. Se o peso empatar, vence a declaração que vem depois.

Para os seletores que usamos, compare uma sequência de três contagens: **IDs, classes, elementos**. Compare da esquerda para a direita; não some tudo em um número. `#mensagem` tem peso `(1, 0, 0)`, `.aviso` tem `(0, 1, 0)` e `p` tem `(0, 0, 1)`. `.painel p` tem `(0, 1, 1)`. Uma classe vence um elemento mesmo que a regra do elemento esteja depois.

Salve como `cascata.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Experimento de cascata</title>
    <style>
      body { color: navy; font-family: sans-serif; }
      .aviso { color: darkgreen; }
      .aviso { color: darkred; }
      p { color: black; }
    </style>
  </head>
  <body>
    <h1>Um aviso</h1>
    <p class="aviso">A biblioteca abre às 9h.</p>
  </body>
</html>
```

**Previsão:** qual cor terá o parágrafo? Abra e inspecione-o. Ele fica `darkred`: as regras `.aviso` empatam e a segunda vence; `p` perde para uma classe, apesar de vir depois. No painel de estilos, declarações superadas aparecem riscadas.

Troque a ordem das duas regras `.aviso`: o parágrafo fica `darkgreen`. Depois adicione `id="mensagem"` ao parágrafo e a regra `#mensagem { color: purple; }` no início do CSS: a regra de ID vence. Remova essa mudança ao terminar.

Existe ainda **herança**: algumas propriedades passam de um elemento para seus descendentes quando eles não têm um valor próprio. Aqui, `h1` herda a cor de `body`; o parágrafo tem sua própria cor. `color` e `font-family` normalmente são herdadas; `margin`, `padding` e `border` não. A herança não é uma disputa entre a especificidade do seletor do pai e a do filho.

Esse é um recorte da cascata. Outras origens e níveis de prioridade existem. Quando um estilo surpreender você, confira as regras no inspetor antes de aumentar seletores ou acrescentar `!important`.

## Cada elemento ocupa uma caixa

O **box model** descreve as partes de uma caixa:

```text
fora da caixa: margin (distância externa)
┌──────────── border (borda) ────────────┐
│ padding (espaço interno)              │
│   ┌────── content (conteúdo) ──────┐   │
│   │ texto ou outros elementos    │   │
│   └───────────────────────────────┘   │
└──────────────────────────────────────┘
```

`padding` afasta o conteúdo da borda. `margin` cria espaço externo. O fundo cobre conteúdo e padding, mas não a margem. Para separar itens de um layout, aprenderemos `gap` na próxima aula.

O significado de `width` depende de `box-sizing`. Com o padrão `content-box`, ela mede só a área de conteúdo; padding e borda são somados. Com `border-box`, ela inclui conteúdo, padding e borda. A margem permanece fora nos dois modelos.

## Experimento — medir em vez de adivinhar

Salve como `caixas.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Experimento de caixas</title>
    <style>
      .caixa {
        width: 240px;
        padding: 16px;
        border: 4px solid navy;
        margin: 20px;
        background-color: lightyellow;
      }
      .alternativa { box-sizing: border-box; }
    </style>
  </head>
  <body>
    <h1>Duas medidas</h1>
    <div class="caixa">Modelo padrão</div>
    <div class="caixa alternativa">Com border-box</div>
  </body>
</html>
```

As duas caixas têm `width: 240px`. Antes de abrir, calcule a largura até a borda externa da primeira: `240 + 16 + 16 + 4 + 4 = 280px`. A segunda mede `240px` até a borda externa; sobra `200px` para seu conteúdo.

**Verificação:** selecione cada caixa no inspetor e procure o diagrama do box model em **Computed/Calculado**. Confira conteúdo, padding e borda; o número do conteúdo não é sempre a largura total. Mude `padding` para `24px`: a primeira passa a medir `296px`; a segunda mantém `240px`, com menos espaço para conteúdo. O texto pode ocupar mais linhas.

`border: 4px solid navy` reúne espessura, estilo e cor. `padding: 16px` aplica o valor nos quatro lados; `padding: 8px 16px` significa vertical e horizontal. O mesmo padrão vale para `margin`.

Margens verticais de blocos no fluxo normal podem se combinar, em vez de simplesmente somar; isso se chama colapso de margens. Não precisamos explorar todos os casos agora. No próximo layout, `gap` dará uma separação mais direta entre itens.

## Unidades e tamanho que acompanham o conteúdo

Uma medida em CSS não precisa ser um número fixo de pixels:

| Unidade | Referência | Uso inicial |
|---|---|---|
| `px` | Pixel CSS, não necessariamente um pixel físico da tela | Bordas e medidas de experimentos |
| `rem` | Tamanho da fonte do elemento raiz, `html` | Texto e espaçamentos coerentes |
| `em` | No `font-size`, fonte do pai; em padding, fonte do próprio elemento | Espaço que acompanha o texto de um controle |
| `%` | Depende da propriedade; em `width`, largura do bloco que contém o elemento | Ocupar a largura disponível |

Com fonte raiz de `16px`, `1.5rem` equivale a `24px`. Isso é uma hipótese de medida, não uma regra de que a raiz será sempre `16px`.

Para experimentar, acrescente em `caixas.html`:

```css
html { font-size: 16px; }
.caixa {
  box-sizing: border-box;
  width: 100%;
  max-width: 30rem;
  margin: 1rem auto;
  padding: 1rem;
  line-height: 1.5;
}
```

`max-width` limita o crescimento; `auto` nas margens laterais distribui o espaço restante e centraliza a caixa. `line-height: 1.5` faz a altura das linhas acompanhar a fonte. Não fixe a altura de uma caixa de texto sem necessidade: ao quebrar linhas, o conteúdo precisa de espaço.

**Entrada:** estreite a janela e depois troque a fonte raiz para `20px`. **Resultado esperado:** a caixa cabe na largura disponível, o limite de `30rem` e os espaços aumentam quando a referência aumenta. As bordas de `4px` mantêm sua medida CSS. Consulte [CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#lengths) apenas em **Lengths** e **Percentages** se precisar revisar essas referências.

Faça a leitura da [etapa 2 do guia](../README.md#etapa-2) e a [etapa 2 do projeto](../03-pratica/atividades.md#atividade-2).

[Voltar ao guia — etapa 2](../README.md#etapa-2)
