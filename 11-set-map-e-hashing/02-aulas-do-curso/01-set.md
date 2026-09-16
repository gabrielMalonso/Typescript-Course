# Set: representar presença

Você já conhece arrays, objetos e o modelo de hashing estudado no livro. Vamos usar essa base em TypeScript. Siga o [Guia de estudo](../README.md#etapa-3), que intercala as aulas com a prática.

## Da busca à informação que precisamos guardar

Imagine uma tela que permite ler e editar um documento. Você já sabe representar essas permissões em um array:

```typescript
const permissoes = ["ler", "editar"];
const podeEditar = permissoes.includes("editar");
console.log(podeEditar); // true
```

A pergunta é sobre presença: “editar está aqui?”. `includes` pode visitar todos os elementos antes de responder. Para uma lista pequena e uma consulta, isso pode ser perfeitamente suficiente. Se muitas partes do programa fazem essa pergunta repetidamente, vale reconsiderar a representação.

O array também permite guardar `"ler"` duas vezes. Mas conceder a mesma permissão novamente não deveria mudar o que a pessoa pode fazer. Aqui, posição e quantidade de ocorrências não são a informação principal: precisamos de um conjunto de valores presentes.

Um `Set` expressa justamente isso. Cada valor distinto aparece no máximo uma vez. A pergunta “já vi este valor?” ou “este valor está autorizado?” passa a ser uma consulta de presença, chamada também de *membership* ou pertinência.

## Construir e consultar

```typescript
const permissoes = new Set<string>();
permissoes.add("ler");
permissoes.add("editar");
permissoes.add("ler");

console.log(permissoes.size);          // 2
console.log(permissoes.has("editar")); // true
console.log(permissoes.has("publicar")); // false
```

`new Set<string>()` cria uma coleção vazia. `<string>` diz ao TypeScript que seus valores devem ser strings; não é uma comparação e não exige que você saiba criar generics. `permissoes.add(42)` seria um erro de tipo. Em execução, a coleção é o Set do JavaScript: a anotação não instala uma estrutura diferente nem valida dados externos.

`add` registra um valor. Repetir `add("ler")` mantém o mesmo estado. `has` responde com um booleano, e `size` conta os valores guardados. São papéis diferentes: registrar, perguntar e contar. `add` devolve o próprio Set, não um booleano dizendo se a inserção foi nova.

## Remover e percorrer

Agora a tela deve permitir revogar uma permissão. Removemos pelo próprio valor, sem localizar um índice:

```typescript
const permissoes = new Set(["ler", "editar"]);
console.log(permissoes.delete("editar")); // true
console.log(permissoes.delete("editar")); // false

for (const permissao of permissoes) {
  console.log(permissao); // ler
}

permissoes.clear();
console.log(permissoes.size); // 0
```

O array passado ao construtor fornece os valores iniciais; aqui o TypeScript infere `Set<string>`. `delete` informa se havia um valor para remover. `clear` esvazia a coleção inteira. A variável continua apontando para o mesmo Set; `const` não impede essas alterações internas.

O `for...of` visita os valores na ordem de inserção. Não existe `permissoes[0]` como acesso ao primeiro elemento. Adicionar novamente um valor presente não muda sua posição; removê-lo e inseri-lo de novo o coloca no fim. Assim, ordem de visita não significa acesso por índice nem ordenação alfabética.

## Presença não é histórico

Se uma lista de etiquetas recebida contém repetições e o produto pede somente as etiquetas distintas, um Set pode representar esse resultado. Essa operação é chamada de **deduplicação**. Antes de fazê-la, decida se descartar ocorrências é correto: dois pagamentos de mesmo valor podem ser dois eventos reais, não um pagamento duplicado.

O Set não guarda quantas vezes um valor foi adicionado. Também não acompanha automaticamente o array de origem: se você construir um Set e depois acrescentar um item ao array, terá alterado apenas o array. Manter duas representações exige decidir quem será a fonte dos dados e como atualizar a outra.

## Igualdade e identidade

Você já conhece a diferença entre copiar uma referência e criar outro objeto:

```typescript
const documento = { codigo: 7 };
const mesmaReferencia = documento;
const outroDocumento = { codigo: 7 };
const selecionados = new Set([documento]);

console.log(selecionados.has(mesmaReferencia)); // true
console.log(selecionados.has(outroDocumento)); // false
```

Dois objetos com campos iguais continuam sendo dois objetos. Set usa identidade, não compara todos os campos. Se o produto pede unicidade por código, guardar objetos inteiros e esperar comparação pelo campo `codigo` não atende ao contrato.

Para strings e números comuns, pense na igualdade de `===`: `"7"` difere de `7`. O nome da regra usada é **SameValueZero**; sua diferença prática aqui é que `NaN` conta como igual a `NaN`. `0` e `-0` representam o mesmo valor no conjunto. Não é necessário implementar esse algoritmo de comparação.

**Colisão não é igualdade.** No chaining que você desenhou, várias chaves compartilhavam um bucket, mas continuavam distintas. A estrutura precisa distinguir essas chaves mesmo depois de encontrar o bucket. Esse fundamento explica por que uma colisão não autoriza descartar um valor.

## Custo das coleções no JavaScript

O modelo do CLRS ajuda a entender como a consulta pode evitar uma varredura completa: a chave indica uma região candidata, e ali ainda há comparação. Com boa distribuição e fator de carga controlado, a busca em uma tabela com chaining tem custo esperado constante para chaves de custo constante. Se todas colidirem, a busca pode percorrer os `n` elementos. Você já viu esse mecanismo; não precisamos refazer sua prova.

Isso é um **modelo de análise**, não uma descrição obrigatória do Set do seu navegador. A especificação exige acesso sublinear em média, mas não obriga hashing, buckets com chaining nem O(1) em toda operação. Os algoritmos abstratos da especificação descrevem comportamento, não o código interno do runtime.

Nas análises deste capítulo, podemos assumir hashing com consulta O(1) esperada e inserção O(1) esperada/amortizada, declarando a hipótese. “Amortizada” considera o custo de muitas operações: uma expansão ocasional pode ser cara sem tornar cara cada inserção da sequência. Não confundir isso com garantia de pior caso constante.

Suponha `n` códigos de tamanho fixo e `q` consultas. Procurar em um array pode fazer até O(qn) trabalho. No modelo acima, construir uma coleção e consultá-la custa O(n + q), com O(u) espaço adicional para `u` valores distintos. É uma comparação de hipóteses, não uma promessa de tempo medido. Para uma única consulta em poucos itens, construção, alocação e memória podem não compensar.

Percorrer a coleção toda continua custando O(u). Chaves de tamanho variável, como textos longos, também têm custo de hashing/comparação; não o esconda quando importar. O custo em bytes e a estratégia real dependem do runtime. Esses cuidados também valem para Map.

## Experimentar e voltar ao problema

Faça apenas o [experimento de Set da atividade 2](../03-pratica/atividades.md#experimento-de-set). Depois volte ao [guia, etapa 3](../README.md#etapa-3) e retome Contains Duplicate com uma nova tentativa sua. A versão quadrática do capítulo 10 permanece preservada; a escolha do novo algoritmo fica com você.

## Fontes da aula de Set

Verificadas em 16/09/2026. Os exemplos de permissões e a progressão são autorais.

- [MDN Set — Description, Value equality e Performance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#description): comportamento, igualdade e ordem. [add](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) e [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete): efeitos e retornos; `clear` e `size` na referência da coleção.
- [ECMAScript — Set Objects](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-set-objects): contrato normativo de igualdade/acesso; métodos em Set.prototype. A linguagem não promete a implementação de chaining estudada.
- [CLRS 11.1](../01-leituras-do-livro/clrs-11.1.pdf) e [11.2](../01-leituras-do-livro/clrs-11.2.pdf), 3ª edição, pp. 253–260, e [CS50, trechos já estudados](../README.md#etapa-1): modelo de endereçamento/hashing, colisões e carga. O recorte conceitual basta; provas das pp. 259–260 permanecem opcionais. O modelo O(1) usado acima supõe distribuição/carga adequadas e chaves de custo constante.

