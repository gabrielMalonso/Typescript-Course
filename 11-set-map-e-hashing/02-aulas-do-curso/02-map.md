# Map: associar informações

## Quando presença deixa de bastar

Um Set de códigos informa quais produtos existem. Agora a tela precisa mostrar o preço de um produto. Um booleano não resolve: precisamos recuperar uma informação associada ao código.

Você poderia percorrer um array de produtos até encontrar o código. Um **Map** expressa outra organização: para cada **chave**, guarda um **valor associado**. A chave responde “qual produto?”; o valor responde “qual preço?”.

```text
"caderno" → 18
"caneta"  → 3
```

A chave não é necessariamente uma posição numérica nem o hash. No modelo de hashing, ela é a entrada usada para localizar a associação. A transformação interna fica com a coleção.

## Armazenar, recuperar e atualizar

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

## Ausência precisa aparecer no raciocínio

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

## Uma quantidade também é um valor associado

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

## Percorrer e encerrar o uso

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

## Igualdade e identidade nas chaves

A regra já vista em Set também vale para as chaves do Map: objetos são comparados por identidade, e chaves numéricas não se confundem com strings. O valor associado não participa da identificação da entrada. Alterar campos de um objeto usado como chave não troca sua identidade; criar outro objeto com os mesmos campos cria outra chave.

Faça o [experimento de Map da atividade 2](../03-pratica/atividades.md#experimento-de-map) e volte à [etapa 4](../README.md#etapa-4). Você já tem o necessário para investigar uma consulta e tentar Two Sum e Valid Anagram; o material não fornece os algoritmos desses problemas.

## Fontes da aula de Map

Verificadas em 16/09/2026. Preços e reservas são exemplos autorais; a contagem mostra uma atualização local, não uma solução dos problemas da prática.

- [MDN Map — Description e Key equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description), [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set), [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) e [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach): operações, retornos, ausência e ordem dos parâmetros.
- [ECMAScript — Map Objects e Map.prototype](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map-objects): garantias de associação, igualdade e acesso sublinear em média. O modelo de custo é o explicado na aula de Set, sem promessa universal de O(1).
- [TypeScript Handbook — Equality narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#equality-narrowing): refinamento do tipo após a comparação. Usamos apenas a verificação de `undefined`; estudar todo o capítulo do Handbook não é pré-requisito.

