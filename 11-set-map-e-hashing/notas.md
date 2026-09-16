# Aulas — Set, Map e escolhas em TypeScript

Você já sabe percorrer arrays, trabalhar com objetos e comparar o trabalho de algoritmos. Também já estudou hashing e resolveu o exercício de chaining. Vamos usar essa base para aprender as coleções da linguagem. Siga uma aula por vez, na ordem do [guia](README.md); as fontes ao fim de cada parte são referências, não leituras adicionais obrigatórias.

## Set: guardar presença

### Da busca à informação que precisamos guardar

Imagine uma tela que permite ler e editar um documento. Você já sabe representar essas permissões em um array:

```typescript
const permissoes = ["ler", "editar"];
const podeEditar = permissoes.includes("editar");
console.log(podeEditar); // true
```

A pergunta é sobre presença: “editar está aqui?”. `includes` pode visitar todos os elementos antes de responder. Para uma lista pequena e uma consulta, isso pode ser perfeitamente suficiente. Se muitas partes do programa fazem essa pergunta repetidamente, vale reconsiderar a representação.

O array também permite guardar `"ler"` duas vezes. Mas conceder a mesma permissão novamente não deveria mudar o que a pessoa pode fazer. Aqui, posição e quantidade de ocorrências não são a informação principal: precisamos de um conjunto de valores presentes.

Um `Set` expressa justamente isso. Cada valor distinto aparece no máximo uma vez. A pergunta “já vi este valor?” ou “este valor está autorizado?” passa a ser uma consulta de presença, chamada também de *membership* ou pertinência.

### Construir e consultar

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

### Remover e percorrer

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

### Presença não é histórico

Se uma lista de etiquetas recebida contém repetições e o produto pede somente as etiquetas distintas, um Set pode representar esse resultado. Essa operação é chamada de **deduplicação**. Antes de fazê-la, decida se descartar ocorrências é correto: dois pagamentos de mesmo valor podem ser dois eventos reais, não um pagamento duplicado.

O Set não guarda quantas vezes um valor foi adicionado. Também não acompanha automaticamente o array de origem: se você construir um Set e depois acrescentar um item ao array, terá alterado apenas o array. Manter duas representações exige decidir quem será a fonte dos dados e como atualizar a outra.

### Igualdade e identidade

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

### Custo das coleções no JavaScript

O modelo do CLRS ajuda a entender como a consulta pode evitar uma varredura completa: a chave indica uma região candidata, e ali ainda há comparação. Com boa distribuição e fator de carga controlado, a busca em uma tabela com chaining tem custo esperado constante para chaves de custo constante. Se todas colidirem, a busca pode percorrer os `n` elementos. Você já viu esse mecanismo; não precisamos refazer sua prova.

Isso é um **modelo de análise**, não uma descrição obrigatória do Set do seu navegador. A especificação exige acesso sublinear em média, mas não obriga hashing, buckets com chaining nem O(1) em toda operação. Os algoritmos abstratos da especificação descrevem comportamento, não o código interno do runtime.

Nas análises deste capítulo, podemos assumir hashing com consulta O(1) esperada e inserção O(1) esperada/amortizada, declarando a hipótese. “Amortizada” considera o custo de muitas operações: uma expansão ocasional pode ser cara sem tornar cara cada inserção da sequência. Não confundir isso com garantia de pior caso constante.

Suponha `n` códigos de tamanho fixo e `q` consultas. Procurar em um array pode fazer até O(qn) trabalho. No modelo acima, construir uma coleção e consultá-la custa O(n + q), com O(u) espaço adicional para `u` valores distintos. É uma comparação de hipóteses, não uma promessa de tempo medido. Para uma única consulta em poucos itens, construção, alocação e memória podem não compensar.

Percorrer a coleção toda continua custando O(u). Chaves de tamanho variável, como textos longos, também têm custo de hashing/comparação; não o esconda quando importar. O custo em bytes e a estratégia real dependem do runtime. Esses cuidados também valem para Map.

### Experimentar e voltar ao problema

Faça apenas o [experimento de Set da atividade 2](pratica/atividades.md#experimento-de-set). Depois volte ao [guia, etapa 3](README.md#etapa-3) e retome Contains Duplicate com uma nova tentativa sua. A versão quadrática do capítulo 10 permanece preservada; a escolha do novo algoritmo fica com você.

### Fontes da aula de Set

Verificadas em 16/09/2026. Os exemplos de permissões e a progressão são autorais.

- [MDN Set — Description, Value equality e Performance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#description): comportamento, igualdade e ordem. [add](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) e [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete): efeitos e retornos; `clear` e `size` na referência da coleção.
- [ECMAScript — Set Objects](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-set-objects): contrato normativo de igualdade/acesso; métodos em Set.prototype. A linguagem não promete a implementação de chaining estudada.
- [CLRS 11.1](leituras/clrs-11.1.pdf) e [11.2](leituras/clrs-11.2.pdf), 3ª edição, pp. 253–260, e [CS50, trechos já estudados](README.md#etapa-1): modelo de endereçamento/hashing, colisões e carga. O recorte conceitual basta; provas das pp. 259–260 permanecem opcionais. O modelo O(1) usado acima supõe distribuição/carga adequadas e chaves de custo constante.

## Map: associar uma informação

### Quando presença deixa de bastar

Um Set de códigos informa quais produtos existem. Agora a tela precisa mostrar o preço de um produto. Um booleano não resolve: precisamos recuperar uma informação associada ao código.

Você poderia percorrer um array de produtos até encontrar o código. Um **Map** expressa outra organização: para cada **chave**, guarda um **valor associado**. A chave responde “qual produto?”; o valor responde “qual preço?”.

```text
"caderno" → 18
"caneta"  → 3
```

A chave não é necessariamente uma posição numérica nem o hash. No modelo de hashing, ela é a entrada usada para localizar a associação. A transformação interna fica com a coleção.

### Armazenar, recuperar e atualizar

```typescript
const precos = new Map<string, number>();
precos.set("caderno", 18);
precos.set("caneta", 3);
precos.set("caderno", 20);

console.log(precos.get("caderno")); // 20
console.log(precos.size); // 2
```

`<string, number>` informa tipo da chave e tipo do valor, nessa ordem. `set` registra a associação e devolve o próprio Map. Uma chave tem um único valor associado por vez: o último `set` substituiu o preço, sem criar um segundo caderno e sem alterar a ordem de inserção.

A consulta pela chave é chamada de *lookup*. `get` recupera o valor; `has` responde se a chave existe. Use esses métodos, não `precos["caderno"]`: uma propriedade no objeto Map não é uma entrada da coleção.

### Ausência precisa aparecer no raciocínio

```typescript
const precos = new Map<string, number>();
precos.set("caderno", 20);
const preco = precos.get("borracha");

if (preco === undefined) {
  console.log("Produto sem preço cadastrado");
} else {
  console.log(preco + 2);
}
```

`get` pode devolver `undefined`. Por isso, no TypeScript seu resultado é `number | undefined`: um número ou ausência, neste Map. O teste separa os casos. No `else`, o compilador sabe que pode usar o valor como número. Não precisamos de cast nem de `!` para silenciar o problema.

Um preço zero continua sendo um número cadastrado. E se o tipo do valor permitisse guardar `undefined`, apenas `get` não distinguiria esse valor de uma chave ausente; `has` responde a pergunta de existência. Identifique primeiro qual pergunta a função deve responder.

### Uma quantidade também é um valor associado

Considere o total de reservas de uma sala. Antes de uma nova reserva, o total é uma informação ligada ao nome da sala. Ao receber outro evento, recuperamos a quantidade e gravamos a nova:

```typescript
const reservas = new Map<string, number>();
reservas.set("Sala Azul", 2);
const atual = reservas.get("Sala Azul");

if (atual === undefined) {
  reservas.set("Sala Azul", 1);
} else {
  reservas.set("Sala Azul", atual + 1);
}
console.log(reservas.get("Sala Azul")); // 3
```

Essa é a operação local de uma contagem, sem esconder ausência numa expressão compacta. Se a chave estivesse ausente, a primeira reserva iniciaria seu total. Um Set só registraria que a sala apareceu: não representaria duas ou três reservas.

O mesmo raciocínio de associação pode guardar um preço, uma quantidade, um objeto ou uma posição. Um **índice de consulta** liga uma chave à localização ou ao registro que queremos recuperar; ele é uma representação auxiliar, não necessariamente um índice de array. Escolher o que guardar exige olhar para a pergunta do programa. Não existe uma única forma de usar Map em todos os problemas.

### Percorrer e encerrar o uso

```typescript
const precos = new Map<string, number>();
precos.set("caderno", 20);
precos.set("caneta", 3);

precos.forEach((preco, codigo) => {
  console.log(codigo, preco); // caderno 20; depois caneta 3
});

console.log(precos.delete("caneta")); // true
console.log(precos.has("caneta")); // false
precos.clear();
console.log(precos.size); // 0
```

Você já usa callbacks. Aqui o callback recebe **valor, depois chave**; o segundo argumento não é um índice como em `Array.forEach`. Isso permite percorrer as associações sem introduzir destructuring ou tuples agora. A ordem é a de inserção das chaves. `delete` remove pela chave e informa se havia uma entrada; `clear` remove todas.

### Igualdade e identidade nas chaves

A regra já vista em Set também vale para as chaves do Map: objetos são comparados por identidade, e chaves numéricas não se confundem com strings. O valor associado não participa da identificação da entrada. Alterar campos de um objeto usado como chave não troca sua identidade; criar outro objeto com os mesmos campos cria outra chave.

Faça o [experimento de Map da atividade 2](pratica/atividades.md#experimento-de-map) e volte à [etapa 4](README.md#etapa-4). Você já tem o necessário para investigar uma consulta e tentar Two Sum e Valid Anagram; o material não fornece os algoritmos desses problemas.

### Fontes da aula de Map

Verificadas em 16/09/2026. Preços e reservas são exemplos autorais; a contagem mostra uma atualização local, não uma solução dos problemas da prática.

- [MDN Map — Description e Key equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description), [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set), [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) e [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach): operações, retornos, ausência e ordem dos parâmetros.
- [ECMAScript — Map Objects e Map.prototype](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map-objects): garantias de associação, igualdade e acesso sublinear em média. O modelo de custo é o explicado na aula de Set, sem promessa universal de O(1).
- [TypeScript Handbook — Equality narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#equality-narrowing): refinamento do tipo após a comparação. Usamos apenas a verificação de `undefined`; estudar todo o capítulo do Handbook não é pré-requisito.

## Escolher entre Array, Set, Map e Object

### Uma mudança no requisito muda a representação

Pense num pequeno sistema de empréstimo de livros. Um livro tem título, código e ano. São campos conhecidos com significados diferentes. Um **objeto** deixa essa estrutura visível, e o TypeScript pode inferir os tipos de cada campo:

```typescript
const livro = { codigo: "L7", titulo: "Algoritmos", ano: 2009 };
console.log(livro.titulo); // Algoritmos
```

Agora precisamos mostrar o histórico dos empréstimos na ordem em que ocorreram. Duas retiradas do mesmo livro são eventos distintos que precisamos preservar. Um **Array** expressa essa sequência e suas posições; transformar o histórico em um Set de códigos perderia ocorrências.

Mude a pergunta: quais códigos estão bloqueados para novos empréstimos? Se interessa apenas presença, um **Set** expressa a regra. Mude novamente: para qual pessoa cada livro está emprestado agora? Um **Map** pode associar código à pessoa. Se um livro puder ter vários exemplares simultâneos, o código do título sozinho deixa de identificar a unidade: a escolha da chave precisa acompanhar o contrato.

As quatro representações podem coexistir: um array de objetos para eventos, um Set de bloqueios e um Map para consultas atuais. Não crie todos automaticamente. Cada coleção extra ocupa memória e precisa continuar coerente quando os dados mudam.

### Por que não guardar tudo num objeto?

Um objeto também associa nomes a valores, e pode servir como dicionário. Mas campos conhecidos, como `titulo` e `ano`, ajudam a descrever um registro; uma coleção dinâmica de códigos pede outra comparação.

Propriedades de objetos usam chaves string ou symbol. Uma chave numérica é convertida em string; Map pode distinguir o número `4` da string `"4"`. Um objeto comum também herda propriedades: `Object.hasOwn(objeto, chave)` verifica se o campo é próprio, quando essa diferença importar. Map começa sem entradas e expõe diretamente tamanho, consulta e remoção.

Isso não torna Map substituto universal de Object. Prefira o que comunica a informação e suas operações. Para um histórico pequeno percorrido uma única vez, manter apenas o array pode ser mais simples do que construir um índice que nunca será reutilizado.

### Experimentar uma mudança de estado

No código abaixo, registre mentalmente qual coleção muda após `push`. Execute e confira:

```typescript
const codigos = ["L7", "L8"];
const bloqueados = new Set(codigos);
codigos.push("L9");
console.log(codigos.length);
console.log(bloqueados.has("L9"));
```

Construir uma representação derivada não cria sincronização automática. Essa limitação é tão relevante para software quanto a velocidade da consulta. Volte à [etapa 5](README.md#etapa-5) para decidir suas representações num problema pequeno.

### Fontes e limites desta comparação

- [MDN — Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps): recorte *Accidental Keys*, *Key Types*, *Size* e *Iteration*, verificado em 16/09/2026. A escolha para livros é raciocínio de modelagem autoral, não uma regra normativa de “sempre usar Map”.
- [MDN — Object.hasOwn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn): diferença entre campo próprio e herdado. Symbols/protótipos ficam como referência, sem implementação obrigatória agora.
- Os exemplos usam chaves pequenas, execução síncrona e estado em memória. Não modelam persistência, concorrência ou índices de banco de dados. Esses problemas não são pré-requisitos deste capítulo.
