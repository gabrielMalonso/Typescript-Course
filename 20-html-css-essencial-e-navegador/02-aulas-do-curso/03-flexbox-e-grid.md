# Flexbox e Grid — Organizar uma linha e uma grade

## O layout é uma relação entre caixas

Você já sabe dar tamanho e espaço a uma caixa. Agora imagine três links que precisam ficar alinhados: escolher uma margem diferente para cada um seria frágil quando o texto ou a largura mudasse.

Um **layout** organiza caixas em relação umas às outras. No fluxo normal, blocos como parágrafos aparecem um abaixo do outro; conteúdo inline, como links dentro de um parágrafo, acompanha a linha de texto. `display` permite escolher outra forma de organizar os filhos de um elemento.

**Flexbox** trabalha a partir de uma direção principal: linha ou coluna. **Grid** define uma grade com colunas e linhas. Ambos preservam os elementos HTML; muda a maneira de distribuí-los.

## Flexbox: o contêiner organiza seus filhos diretos

O elemento com `display: flex` é o **contêiner flex**. Seus filhos diretos viram **itens flex**; elementos mais internos continuam participando do layout de seu próprio pai.

Antes do exemplo, precisamos de dois eixos:

| Direção (`flex-direction`) | Eixo principal | Eixo transversal |
|---|---|---|
| `row`, em nosso documento da esquerda para a direita | Horizontal | Vertical |
| `column` | Vertical | Horizontal |

`justify-content` distribui espaço no eixo principal. `align-items` alinha os itens no transversal. Portanto, `justify-content` não significa sempre “alinhamento horizontal”.

`gap` cria espaço entre itens, sem criar uma margem externa no contêiner. `flex-wrap: wrap` permite formar novas linhas quando falta espaço; o padrão é `nowrap`.

## Experimento — links que encontram espaço

Usaremos `min-height` para dar uma altura mínima ao contêiner, permitindo que ele cresça. Esse espaço extra torna o alinhamento visível. Os três links serão filhos diretos do `nav`.

Salve como `links-flex.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Links com Flexbox</title>
    <style>
      .links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 12px;
        min-height: 140px;
        padding: 16px;
        border: 2px solid navy;
      }
      .links a { padding: 8px; background-color: lightyellow; }
    </style>
  </head>
  <body>
    <h1>Consulta de documentação</h1>
    <nav class="links">
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a>
    </nav>
  </body>
</html>
```

**Entradas e resultados:**

1. Abra em uma janela larga. Os links ficam em uma linha, centralizados nos dois eixos.
2. Troque `justify-content: center` por `space-between`. Se houver espaço sobrando, ele é distribuído entre os itens, levando os extremos às pontas da linha. `gap` continua sendo um espaço mínimo entre eles.
3. Volte para `center` e troque `row` por `column`. Os links ficam um abaixo do outro; o eixo principal agora é vertical. O contêiner pode crescer para acomodá-los.
4. Volte para `row` e estreite a janela. Com `wrap`, os itens passam para outra linha quando não couberem juntos. Compare com `nowrap` e depois restaure `wrap`.

Inspecione o `nav`: navegadores modernos oferecem uma marca e uma sobreposição visual de Flexbox. Ela ajuda a reconhecer quais caixas participam do layout.

Flexbox pode reduzir a largura de itens para tentar acomodá-los. Isso não garante que qualquer conteúdo caiba: palavras longas e tamanhos mínimos podem limitar essa redução. Se houver corte, investigue o conteúdo e as medidas, em vez de esconder o problema.

## Grid: definir colunas e deixar os itens ocuparem a grade

Com `display: grid`, os filhos diretos passam a ser **itens da grade**. `grid-template-columns` define suas colunas. No caso mais simples, os elementos são colocados na ordem do HTML, preenchendo a primeira linha e criando linhas seguintes quando necessário.

```css
.grade {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

`fr` representa uma fração do espaço disponível para distribuição na grade. Duas colunas de `1fr` dividem esse espaço igualmente, depois de considerar os gaps e os limites do conteúdo. `2fr 1fr` dá à primeira o dobro da fração da segunda. Não é a mesma coisa que usar `50% 50%` e ainda somar um gap: essa soma pode passar da largura disponível.

## Experimento — uma pequena biblioteca

`article` representa uma descrição de livro que pode ser lida como uma unidade independente. `div` apenas reunirá essas descrições para aplicar a grade.

Salve como `biblioteca-grid.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Biblioteca em grade</title>
    <style>
      .livros {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        max-width: 640px;
      }
      .livros article {
        padding: 16px;
        border: 2px solid navy;
        background-color: lightyellow;
      }
    </style>
  </head>
  <body>
    <h1>Pequena biblioteca</h1>
    <div class="livros">
      <article><h2>Atlas</h2><p>Mapas para explorar.</p></article>
      <article><h2>Contos</h2><p>Histórias para imaginar.</p></article>
      <article><h2>Desenho</h2><p>Formas para observar.</p></article>
    </div>
  </body>
</html>
```

**Previsão:** com três itens e duas colunas, onde ficará o terceiro? Abra: ele fica no início da segunda linha. A posição vem da ordem do HTML; não escrevemos coordenadas.

**Experimente:** troque as colunas para `2fr 1fr`; a primeira fica mais larga. Depois use apenas `1fr`; os três livros ficam empilhados. Altere `gap` para `24px`; a distância entre caixas aumenta sem exigir uma regra para cada livro. Confira as linhas com a sobreposição de Grid no inspetor.

Em uma tela estreita, duas colunas podem deixar o texto apertado. A próxima aula vai aplicar uma condição para usar uma coluna quando necessário. Para conteúdo que impõe uma largura mínima, podemos usar `minmax(0, 1fr)` em vez de `1fr`: a função define um mínimo de zero e um máximo flexível. Isso permite reduzir a coluna; ainda precisamos deixar o texto quebrar para evitar transbordamento.

## Escolher pelo problema

| Necessidade | Primeiro recurso a experimentar |
|---|---|
| Distribuir links, botões ou partes de uma linha | Flexbox |
| Empilhar itens com alinhamento em uma direção | Flexbox com `column` |
| Organizar regiões ou cartões em colunas e linhas compartilhadas | Grid |
| Texto e blocos em sequência, sem relação especial | Fluxo normal |

Você pode usar Grid para as regiões da página e Flexbox dentro de uma delas. Não precisa aplicar os dois a toda caixa. Cada contêiner resolve uma relação diferente.

A ordem visual deve acompanhar a ordem de leitura e de teclado. Recursos de reordenação existem, mas não corrigem uma sequência confusa no HTML. Vamos manter a ordem original nesta etapa.

Faça as leituras da [etapa 3 do guia](../README.md#etapa-3) e a [etapa 3 do projeto](../03-pratica/atividades.md#atividade-3).

[Voltar ao guia — etapa 3](../README.md#etapa-3)
