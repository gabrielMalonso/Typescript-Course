# Da union ao enum de texto

## Começar com uma escolha que você já conhece

Um pedido de retirada pode estar pendente, pronto ou entregue. No capítulo 17, você aprendeu a limitar uma escolha com uma union de literais:

```ts
type EstadoPedido = "pendente" | "pronto" | "entregue";

function mensagemDoPedido(estado: EstadoPedido): string {
  switch (estado) {
    case "pendente":
      return "Estamos preparando seu pedido.";
    case "pronto":
      return "Você já pode retirar seu pedido.";
    case "entregue":
      return "Seu pedido foi retirado.";
  }
}

console.log(mensagemDoPedido("pronto"));
// Você já pode retirar seu pedido.

// mensagemDoPedido("prnoto"); // Erro: texto fora das alternativas.
```

O parâmetro recebe um texto. `EstadoPedido` é o nome do tipo que restringe esse texto. A solução já atende ao problema; vamos usá-la como referência para entender outra representação.

## Dar um nome a cada valor

Um **enum**, abreviação de *enumeration* (enumeração), reúne membros com nomes e valores. Um membro é cada item declarado entre as chaves:

```ts
enum EstadoPedido {
  Pendente = "pendente",
  Pronto = "pronto",
  Entregue = "entregue",
}

const estado: EstadoPedido = EstadoPedido.Pronto;

console.log(estado); // pronto
console.log(typeof estado); // string
console.log(EstadoPedido.Entregue); // entregue
```

Leia uma linha por vez:

- `enum EstadoPedido` declara a enumeração.
- `Pronto` é o nome de um membro.
- `"pronto"` é o valor desse membro.
- `EstadoPedido.Pronto` acessa esse valor pelo nome.
- `estado: EstadoPedido` usa o nome do enum como tipo da variável.

O ponto de `EstadoPedido.Pronto` tem uma função familiar: acessar uma propriedade. O valor guardado em `estado` é o texto `"pronto"`; ele não é um objeto contendo todos os estados.

Neste enum de texto, escrevemos o valor de cada membro. TypeScript não inventa os textos dos membros seguintes.

## Usar o enum em uma função

A lógica da mensagem continua igual. Mudamos o contrato e a maneira de indicar cada alternativa:

```ts
enum EstadoPedido {
  Pendente = "pendente",
  Pronto = "pronto",
  Entregue = "entregue",
}

function mensagemDoPedido(estado: EstadoPedido): string {
  switch (estado) {
    case EstadoPedido.Pendente:
      return "Estamos preparando seu pedido.";
    case EstadoPedido.Pronto:
      return "Você já pode retirar seu pedido.";
    case EstadoPedido.Entregue:
      return "Seu pedido foi retirado.";
  }
}

console.log(mensagemDoPedido(EstadoPedido.Pendente));
// Estamos preparando seu pedido.
console.log(mensagemDoPedido(EstadoPedido.Pronto));
// Você já pode retirar seu pedido.
console.log(mensagemDoPedido(EstadoPedido.Entregue));
// Seu pedido foi retirado.

// mensagemDoPedido("pronto"); // Erro: use um membro de EstadoPedido.
// mensagemDoPedido(EstadoPedido.Prnoto); // Erro: esse membro não existe.
```

Aqui há uma diferença em relação à union: a chamada com `"pronto"` escrito diretamente não é aceita pelo contrato do enum de texto. Você indica o membro com `EstadoPedido.Pronto`.

Isso não quer dizer que surgiu um novo tipo de dado em JavaScript. A função ainda recebe uma string. A exigência de usar o membro pertence à verificação de tipos do TypeScript.

Experimente descomentar a chamada com `"pronto"` e observe o erro. Depois comente novamente. Compare com a primeira versão da aula: naquela, passar o literal diretamente era justamente o uso esperado.

## Tipo e valor: o mesmo nome em dois lugares

O nome de um enum comum pode aparecer tanto em uma anotação quanto em uma expressão:

```ts
enum EstadoPedido {
  Pendente = "pendente",
  Pronto = "pronto",
  Entregue = "entregue",
}

const estado: EstadoPedido = EstadoPedido.Pronto;
//            tipo           acesso a um valor

console.log(EstadoPedido);
// Objeto com as propriedades:
// { Pendente: "pendente", Pronto: "pronto", Entregue: "entregue" }
console.log(estado); // pronto
```

Na compilação, a anotação `: EstadoPedido` desaparece. A declaração do enum, porém, gera código que constrói esse objeto. Assim, `EstadoPedido.Pronto` continua tendo o que acessar quando o JavaScript executa.

Com um alias, não há esse objeto:

```ts
type EstadoPedido = "pendente" | "pronto" | "entregue";

const estado: EstadoPedido = "pronto";
console.log(estado); // pronto

// console.log(EstadoPedido); // Erro: o alias só existe como tipo.
```

O modelo mental é: **o alias descreve valores; o enum comum descreve o tipo e fornece valores nomeados ao programa**. Essa diferença vai ajudar a escolher entre os dois.

## O enum não controla a sequência dos acontecimentos

O tipo restringe a representação do estado, mas não implementa o fluxo de um pedido:

```ts
enum EstadoPedido {
  Pendente = "pendente",
  Pronto = "pronto",
  Entregue = "entregue",
}

type Pedido = {
  id: number;
  estado: EstadoPedido;
};

const pedido: Pedido = { id: 7, estado: EstadoPedido.Pendente };
pedido.estado = EstadoPedido.Entregue; // Aceito pelo tipo.

console.log(pedido.estado); // entregue
```

Se a regra exige que o pedido fique pronto antes da entrega, o código precisa verificar essa regra. Declarar os três estados não obriga o programa a percorrê-los em ordem. A union de literais também tem esse limite.

Também não há validação automática de dados recebidos de um arquivo ou serviço. Neste capítulo, construímos os valores em código TypeScript; a verificação de entradas externas será estudada depois.

Na função de mensagem, escolher entre três alternativas fixas custa O(1). O enum acrescenta um pequeno objeto ao JavaScript; ele não altera o custo de algoritmos que usem esses estados. Filtrar `n` pedidos, por exemplo, continua exigindo percorrer os `n` elementos.

A leitura de apoio desta etapa é [String enums](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums). Depois siga para a [aula 2 — Enums numéricos e reverse mapping](02-enums-numericos.md).

[Voltar ao guia — etapa 1](../README.md#etapa-1)
