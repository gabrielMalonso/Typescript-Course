# Escolher a representação

## Duas soluções para uma escolha pequena

Você já viu as duas versões do estado de um pedido:

```ts
type EstadoPorLiteral = "pendente" | "pronto" | "entregue";

enum EstadoPorEnum {
  Pendente = "pendente",
  Pronto = "pronto",
  Entregue = "entregue",
}

const primeiro: EstadoPorLiteral = "pronto";
const segundo: EstadoPorEnum = EstadoPorEnum.Pronto;

console.log(primeiro, segundo); // pronto pronto
```

O valor final é o mesmo texto. A diferença está em como o contrato é escrito, em como o valor é indicado e no código que permanece depois da compilação.

Para uma escolha textual pequena, a **union de literais costuma ser um bom ponto de partida**: expressa diretamente as alternativas e usa valores JavaScript comuns. Se o projeto já usa um enum para essa informação, ou se os nomes dos membros ajudam a ler as chamadas, usar esse enum pode fazer sentido.

Para códigos numéricos definidos por uma tabela, o enum numérico permite escrever `CodigoEncomenda.EmTransporte` em vez de espalhar `20` pelo código. Uma union numérica como `10 | 20 | 30` também restringe literais; por si só, porém, não fornece nomes para esses números.

Não é preciso trocar uma solução que está clara apenas para usar a sintaxe nova. A pergunta é: **de que informação o programa precisa, e qual representação torna seu uso mais fácil de entender?**

## Uma union não cria uma lista em execução

Imagine que precisamos mostrar os estados disponíveis. Um alias não pode ser percorrido, porque é apenas um tipo. Podemos criar um array separado, usando recursos conhecidos:

```ts
type EstadoPedido = "pendente" | "pronto" | "entregue";

const estados: readonly EstadoPedido[] = ["pendente", "pronto", "entregue"];

for (const estado of estados) {
  console.log(estado);
}
// pendente
// pronto
// entregue
```

O array é um valor JavaScript; o alias verifica os elementos. `readonly` impede a escrita por esse contrato, como nas tuples. Aqui a lista é curta e explícita.

Essa anotação rejeita elementos fora da union, mas não exige que o array contenha todas as alternativas. Se você acrescentar `"cancelado"` ao tipo, deverá conferir também a lista. É um limite dessa solução simples.

O enum comum já fornece um objeto, mas o objeto numérico contém propriedades nas duas direções. Por isso, percorrê-lo como se fosse apenas uma lista de opções pode trazer nomes e números misturados. Primeiro entenda o objeto; não escolha um enum só para evitar escrever três elementos em um array.

## Um estado pode exigir dados próprios

No capítulo 17, o pedido pronto exigia um código de retirada. Declarar somente um enum de estados não expressa essa relação. Ainda precisamos descrever cada formato de objeto.

Um membro do enum também pode ser usado como tipo para identificar uma alternativa:

```ts
enum EstadoPedido {
  Pendente = "pendente",
  Pronto = "pronto",
}

type Pedido =
  | { estado: EstadoPedido.Pendente }
  | { estado: EstadoPedido.Pronto; codigoRetirada: string };

function orientarRetirada(pedido: Pedido): string {
  if (pedido.estado === EstadoPedido.Pronto) {
    return `Apresente o código ${pedido.codigoRetirada}.`;
  }
  return "Aguarde o preparo do pedido.";
}

console.log(orientarRetirada({ estado: EstadoPedido.Pendente }));
// Aguarde o preparo do pedido.
console.log(orientarRetirada({
  estado: EstadoPedido.Pronto,
  codigoRetirada: "R7",
}));
// Apresente o código R7.

// const incompleto: Pedido = { estado: EstadoPedido.Pronto };
// Erro: o pedido pronto exige codigoRetirada.
```

Em `estado: EstadoPedido.Pronto`, o membro está na posição de tipo: aquele campo deve receber especificamente esse membro. Ao construir o objeto com `estado: EstadoPedido.Pronto`, acessamos o valor. O lugar em que a expressão aparece indica seu papel.

A union continua reunindo os dois formatos, e o `if` continua identificando qual formato chegou. Poderíamos fazer a mesma modelagem com `"pendente"` e `"pronto"`, como antes. **Enums e unions discriminadas podem trabalhar juntos**: o primeiro nomeia os valores; a segunda relaciona o estado aos campos necessários.

## Reconhecer um enum heterogêneo

Um enum **heterogêneo** mistura membros numéricos e de texto:

```ts
enum RespostaMista {
  Nao = 0,
  Sim = "sim",
}

console.log(RespostaMista.Nao); // 0
console.log(RespostaMista.Sim); // sim
```

Ele é permitido, mas obriga quem usa a informação a lidar com representações diferentes. Por exemplo, `Nao` tem valor falsy, enquanto `Sim` tem valor truthy; o mapeamento reverso também só é criado para o membro numérico.

Para uma escolha simples de sim ou não, `boolean` geralmente basta. Quando nomes de domínio forem úteis, prefira membros todos de texto ou todos numéricos. Por enquanto, o objetivo é reconhecer essa mistura ao ler código existente. Não precisamos dela para os exemplos ou a atividade.

## Reconhecer `const enum`

O `const enum` se parece com um enum comum, mas pode mudar o que o compilador gera. Considere:

```ts
const enum Prioridade {
  Baixa = 1,
  Media = 2,
  Alta = 3,
}

const prioridade: Prioridade = Prioridade.Alta;
console.log(prioridade); // 3

// console.log(Prioridade); // Erro: const enum não pode ser usado assim.
// console.log(Prioridade[3]); // Erro: não podemos fazer essa consulta inversa.
```

Com `tsc` e a opção `preserveConstEnums` desativada, a declaração é removida e o acesso ao membro é substituído pelo valor. O trecho correspondente do JavaScript fica assim:

```js
const prioridade = 3 /* Prioridade.Alta */;
console.log(prioridade);
```

O comentário identifica a origem do `3`, mas não participa da execução. O programa usa o número diretamente; não precisa buscar `Alta` em um objeto `Prioridade`.

Isso é diferente de `const prioridade = ...`: o `const` de uma variável impede reatribuir a variável. O `const` colocado antes de `enum` é uma instrução específica sobre essa enumeração e seus usos.

Para comparar as saídas, abra o [TypeScript Playground](https://www.typescriptlang.org/play/), cole o bloco e observe a aba JavaScript com `preserveConstEnums` desativada. Depois retire apenas o `const` da declaração do enum. O objeto de inicialização passa a aparecer. Não precisa entender cada linha gerada: observe o que existe nas duas versões.

Essa diferença depende da ferramenta e da configuração. A opção `preserveConstEnums` pode manter o objeto gerado. Ao compartilhar `const enum` entre projetos, também pode haver problemas: um programa pode ser compilado com um código numérico antigo e depois executar junto de outra versão que interpreta esse código de forma diferente.

Por isso, **não trate `const enum` como uma melhoria automática de desempenho**. Para este capítulo, basta reconhecer a sintaxe e entender a substituição. Use um enum comum ou uma union nas atividades; não precisamos alterar a configuração do curso.

## O custo acompanha os valores usados

Uma union não acrescenta um objeto ao JavaScript. Um enum comum gera um objeto e sua inicialização. Para os poucos membros destes exemplos, esse custo é pequeno; o enum numérico também mantém as propriedades do caminho reverso.

Já percorrer uma lista continua tendo seu custo. No array de estados, percorrer `k` opções leva O(k), e guardar a lista ocupa O(k). Se uma aplicação percorre `n` pedidos, a escolha entre texto e enum não elimina esse percurso. A clareza do contrato vem primeiro; otimizações precisam de uma necessidade concreta.

As referências destas variantes são [Heterogeneous enums](https://www.typescriptlang.org/docs/handbook/enums.html#heterogeneous-enums), [const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums) e [preserveConstEnums](https://www.typescriptlang.org/tsconfig/preserveConstEnums.html). O uso de membros como tipos também está em [All enums Are Union enums](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#all-enums-are-union-enums).

Faça a [atividade 1 — Etiquetas de uma encomenda](../03-pratica/atividades.md#atividade-1).

[Voltar ao guia — etapa 3](../README.md#etapa-3)
