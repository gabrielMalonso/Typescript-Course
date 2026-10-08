# Guia de estudo — Enums e alternativas

**Objetivo:** usar enums de texto e numéricos, compará-los com unions de literais e escolher uma representação pelo que o programa precisa. Reconhecer também reverse mapping, enums heterogêneos e `const enum`.

No capítulo 17, você descreveu escolhas como `"pendente" | "pronto"`. Agora vamos dar nomes aos valores dessas escolhas e observar uma diferença importante: um `type` desaparece na compilação; um enum comum também produz um objeto JavaScript.

O percurso é **aula com experimentos → leitura curta → próxima aula → prática**. As aulas apresentam o assunto antes dos trechos da documentação, que estão em inglês. Execute cada bloco TypeScript separadamente no Pad ou em um arquivo com modo estrito. As linhas que devem produzir erros estão comentadas: descomente uma por vez, observe a mensagem e comente novamente.

Este capítulo trata da linguagem. Usamos a documentação oficial como referência, sem videoaula obrigatória nem recorte do CLRS.

## 1. Aula e leitura — nomes para valores de texto

Leia a [aula 1 — Da union ao enum de texto](02-aulas-do-curso/01-enums-de-texto.md). Ela parte de um pedido que pode estar pendente, pronto ou entregue. Compare o valor recebido pela função nas duas representações.

Depois leia [String enums, no TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums), do início ao fim da seção. Pare antes de **Heterogeneous enums**. A fonte usa direções; relacione os nomes e os textos ao exemplo do pedido.

## 2. Aula e leitura — números e caminho de volta

Siga para a [aula 2 — Enums numéricos e reverse mapping](02-aulas-do-curso/02-enums-numericos.md). Observe como os valores são atribuídos, por que zero exige cuidado em condicionais e o que acontece ao consultar um enum pelo número.

Leia [Numeric enums](https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums), do início até o exemplo de `respond`. Pare antes do parágrafo sobre membros calculados (**“Numeric enums can be mixed…”**).

Leia também [Reverse mappings](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings), incluindo o aviso final sobre enums de texto. Pare antes de **const enums**. O JavaScript gerado serve para mostrar que o enum vira um objeto; não é necessário memorizar sua função de inicialização.

## 3. Aula e consulta — escolher sem acrescentar complexidade

Leia a [aula 3 — Escolher a representação](02-aulas-do-curso/03-escolhas-e-variantes.md). Ela compara uma union com um enum, retoma estados com dados associados e apresenta duas variantes que você precisa reconhecer.

Como consulta curta, leia [Heterogeneous enums](https://www.typescriptlang.org/docs/handbook/enums.html#heterogeneous-enums), até antes de **Computed and constant members**. Em [const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums), leia da definição até o exemplo de JavaScript gerado. Pare antes de **Const enum pitfalls**; a aula explica o limite necessário por enquanto.

O exemplo de `const enum` também pode ser executado no Pad. Para observar o JavaScript gerado, a aula propõe uma comparação curta no Playground; a saída depende da ferramenta e da configuração.

## 4. Prática — um código e um estado têm papéis diferentes

Faça a [atividade 1 — Etiquetas de uma encomenda](03-pratica/atividades.md#atividade-1). Você vai usar números definidos por uma tabela e textos que descrevem estados, escolhendo a representação de cada informação.

Envie sua tentativa com os testes indicados e uma frase explicando a escolha dos tipos. Não há prova nem relatório obrigatório. No capítulo 19, o foco será representar contratos de objetos com interfaces.

## Fontes e limites da seleção

- [TypeScript Handbook — Enums](https://www.typescriptlang.org/docs/handbook/enums.html): enums de texto e numéricos, objeto em execução, membros como tipos, reverse mapping, heterogêneos e `const enum`. As leituras estão delimitadas acima. Membros calculados, `keyof typeof`, enums ambientes e flags de bits ficam fora deste capítulo. A seção **Const enum pitfalls** foi consultada para explicar os limites de ferramentas e de valores compartilhados entre projetos; sua leitura não é obrigatória.
- [TypeScript Handbook — Everyday Types: Enums](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums): apoio para distinguir uma anotação de tipo de uma construção que produz código JavaScript.
- [TypeScript 5.0 — All enums Are Union enums](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#all-enums-are-union-enums): apoio para membros como tipos e narrowing, conferidos nos exemplos das aulas. Não é preciso ler as notas da versão.
- [TSConfig — preserveConstEnums](https://www.typescriptlang.org/tsconfig/preserveConstEnums.html): conferência da diferença entre substituir os acessos por valores e preservar o objeto na compilação. Não altere a configuração do curso para fazer os experimentos.
