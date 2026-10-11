# Responsividade e acessibilidade — Uma página que cabe e pode ser usada

## A interface precisa acompanhar o espaço disponível

Uma grade de duas colunas pode ficar confortável no computador e apertada no celular. Uma página **responsiva** adapta sua apresentação ao espaço disponível, preservando conteúdo e funções.

Comece por medidas flexíveis, limites de largura e altura determinada pelo conteúdo. Depois acrescente condições onde o layout deixa de funcionar. Não é necessário criar uma versão para cada modelo de aparelho.

O **viewport** é a área em que o navegador apresenta a página. Em dispositivos móveis, sem uma indicação apropriada, o navegador pode usar uma largura de layout maior que a tela e reduzir a página inteira. A linha que usamos desde a aula 1 evita esse ponto de partida:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Ela pede a largura do dispositivo para o layout e escala inicial de 1. Isso não torna sozinho o CSS responsivo. Também não limite o zoom: ele é uma ferramenta de leitura.

## Media queries aplicam regras sob uma condição

Uma **media query** verifica uma característica do ambiente. Vamos usar a largura do viewport:

```css
.paineis {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 42rem) {
  .paineis { grid-template-columns: 1fr 1fr; }
}
```

`@media` abre um grupo condicional. As regras internas participam da cascata quando a condição é verdadeira; as regras de fora continuam valendo. Com essa ordem e a mesma especificidade, a declaração interna substitui a de uma coluna quando há largura suficiente.

O **breakpoint** é o ponto em que o layout muda. Aqui, `42rem` foi escolhido para o exemplo, não porque todo celular termina nessa largura. Em media queries, unidades como `rem` usam o tamanho inicial da fonte do navegador, não uma mudança de `font-size` feita pelo CSS da página. Na configuração usual de `16px`, `42rem` corresponde a `672px`.

Começar com uma coluna e acrescentar colunas quando há espaço é uma abordagem conhecida como *mobile first*. Ela ajuda a tratar a largura pequena como um caso normal.

## Acessibilidade começa com as escolhas do HTML

Uma pessoa pode usar a página com teclado, leitor de tela, zoom ou outra forma de interação. **Acessibilidade** significa permitir que ela perceba, entenda e opere a interface.

Os elementos nativos ajudam: links com destino, botões com ação e campos com rótulos. Um `placeholder` desaparece quando a pessoa digita e não substitui um `label`. Instruções importantes devem permanecer visíveis.

O **foco** indica qual elemento recebe a interação do teclado. `Tab` costuma avançar entre controles; `Shift+Tab` volta. Links são ativados com `Enter`; botões também respondem a `Espaço`; checkboxes alternam com `Espaço`. A ordem deve acompanhar o HTML. Não use valores positivos de `tabindex` para remendar a sequência.

Uma **pseudoclasse** é um seletor que alcança um estado. `:hover` corresponde à presença do ponteiro; `:focus-visible` permite destacar o foco quando o navegador determina que ele precisa ser mostrado, especialmente na navegação por teclado. Uma informação indispensável não pode aparecer apenas no hover.

## Experimento — duas regiões e um campo acessível

No CSS, `font: inherit` faz os controles usarem a fonte herdada; `display: block` põe o rótulo em sua própria linha. `outline` desenha um contorno sem ocupar espaço no layout, adequado para destacar o foco. Cores como `#172033` usam uma notação hexadecimal para os canais vermelho, verde e azul; usaremos valores já escolhidos, sem estudar a aritmética dessa notação agora.

O atributo HTML `aria-describedby` aponta para o `id` de uma instrução, associando aquela descrição ao controle para tecnologias assistivas. O nome do campo continua vindo do `label`. Prefira HTML nativo e use esse atributo para complementar uma relação real; não precisamos criar controles personalizados ou decorar toda tag com ARIA.

Salve como `boletim.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Boletim da biblioteca</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #172033;
        background-color: #ffffff;
        font-family: sans-serif;
        line-height: 1.5;
      }
      main { width: 100%; max-width: 56rem; margin: 0 auto; padding: 1rem; }
      .paineis { display: grid; grid-template-columns: 1fr; gap: 1rem; }
      section { min-width: 0; padding: 1rem; border: 1px solid #687386; }
      label { display: block; }
      input { width: 100%; padding: 0.5rem; }
      input, button { font: inherit; }
      button { margin-top: 1rem; padding: 0.5rem 1rem; }
      a, input, button { color: #172033; }
      input, button { background-color: #ffffff; }
      a:focus-visible, input:focus-visible, button:focus-visible {
        outline: 3px solid #2455a6;
        outline-offset: 3px;
      }
      @media (min-width: 42rem) {
        .paineis { grid-template-columns: 1fr 1fr; }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Boletim da biblioteca</h1>
      <div class="paineis">
        <section>
          <h2>O que chega no boletim?</h2>
          <p>Novos livros e encontros de leitura.</p>
          <a href="#inscricao">Ir para a inscrição</a>
        </section>
        <section id="inscricao">
          <h2>Seu interesse</h2>
          <p>Teste local: o formulário não realiza uma inscrição.</p>
          <form>
            <label for="email">Email (obrigatório)</label>
            <input id="email" name="email" type="email" required
                   aria-describedby="ajuda-email">
            <p id="ajuda-email">Use ana@example.com para experimentar.</p>
            <button type="submit">Enviar interesse</button>
          </form>
        </section>
      </div>
    </main>
  </body>
</html>
```

`width: 100%` e `border-box` fazem a largura de `main` incluir o padding. `max-width` impede linhas excessivamente largas. `min-width: 0` permite que uma região da grade diminua; o conteúdo ainda precisa caber ou quebrar em linhas.

Observe que o `id` da instrução corresponde exatamente ao valor de `aria-describedby`, assim como o `for` do rótulo corresponde ao `id` do input.

## Testar o layout e o uso

No modo de dispositivos das ferramentas do navegador, informe larguras em pixels CSS. Se esse modo não estiver disponível, ajuste a janela para comparar larguras; o teste de celular físico pode ser feito depois.

| Entrada | Resultado esperado |
|---|---|
| Viewport de `360px` | Regiões empilhadas; campo e texto dentro da tela |
| Viewport de `900px`, com fonte inicial usual | Duas colunas; espaçamento preservado |
| Zoom de `200%` | Conteúdo continua legível e utilizável, com reorganização quando necessário |
| `Tab` a partir do início | Link, campo e botão em sequência, com foco visível |
| Clique em Email | Foco no campo, graças a `for` e `id` |
| Envio vazio ou com `abc` | Bloqueio pela validação nativa; sem inscrição real |

Teste sem usar o mouse para preencher e acionar o formulário. O envio válido ainda usa o comportamento padrão da aula 1. A interação local vem na próxima aula.

Se no macOS o `Tab` pular links ou botões, ative a navegação por teclado nas configurações do navegador/sistema e repita o teste; a preferência pode limitar quais controles entram na sequência.

**Critério do experimento:** nenhuma região some na largura pequena; os controles continuam alcançáveis e é possível identificar visualmente onde está o foco. Não oculte transbordamento horizontal apenas para fazer a barra de rolagem desaparecer: procure a caixa ou o texto que ultrapassa a largura.

## Ler também é parte de usar

Cor clara sobre fundo claro pode parecer delicada e ser difícil de ler. Para esta primeira página, adote contraste de pelo menos **4,5:1 para todos os textos**, incluindo rótulos e botões. A [WCAG — Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html#success-criterion) exige essa relação para texto comum, com uma exceção de 3:1 para texto grande; usar 4,5:1 em todos evita precisar classificar tamanhos agora. Consulte apenas **Success Criterion**.

No inspetor, abra o seletor de cor do texto e procure a indicação de contraste, se o navegador a oferecer. Compare a cor com o fundo efetivo. O par `#172033` sobre `#ffffff` do exemplo supera 4,5:1. Se trocar as cores, confira novamente; não estime só pela aparência.

Também não use apenas cor para explicar um estado. Uma checkbox marcada comunica seleção; vermelho sozinho não explica um erro. Mantenha o texto das instruções e dos resultados. Esses testes são um primeiro conjunto de cuidados, não uma avaliação completa de acessibilidade.

A referência sobre operação por teclado é [WAI — Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html); consulte somente **In Brief** e **Success Criterion** se precisar rever a finalidade. Faça as leituras da [etapa 4 do guia](../README.md#etapa-4) e a [etapa 4 do projeto](../03-pratica/atividades.md#atividade-4).

[Voltar ao guia — etapa 4](../README.md#etapa-4)
