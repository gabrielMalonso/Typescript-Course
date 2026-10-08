# Enums numéricos e reverse mapping

## Os nomes podem representar números

Na aula anterior, cada membro guardava um texto. Um enum também pode reunir números. Imagine três níveis de prioridade:

```ts
enum Prioridade {
  Baixa,
  Media,
  Alta,
}

console.log(Prioridade.Baixa); // 0
console.log(Prioridade.Media); // 1
console.log(Prioridade.Alta); // 2
console.log(typeof Prioridade.Alta); // number
```

Quando não escrevemos os valores, o primeiro membro recebe `0`. Cada membro seguinte recebe o número anterior mais um. Os nomes tornam a intenção visível no código; o valor usado em execução é um número.

Também podemos escolher onde a sequência começa:

```ts
enum Prioridade {
  Baixa = 1,
  Media,
  Alta,
}

console.log(Prioridade.Baixa); // 1
console.log(Prioridade.Media); // 2
console.log(Prioridade.Alta); // 3
```

`Baixa = 1` define o ponto de partida. Os dois membros seguintes continuam a sequência automaticamente.

## Um número fixo não deve depender da posição

Agora imagine uma tabela de códigos já definida por um sistema de encomendas: `10` significa recebida, `20` significa em transporte e `30` significa entregue. Esses números têm significado fora da declaração.

Nesse caso, escreva os valores explicitamente:

```ts
enum CodigoEncomenda {
  Recebida = 10,
  EmTransporte = 20,
  Entregue = 30,
}

const codigo: CodigoEncomenda = CodigoEncomenda.EmTransporte;
console.log(codigo); // 20
```

Com valores explícitos, mudar a ordem dos membros não muda os códigos. Isso é diferente de uma sequência automática:

```ts
enum Antes {
  Recebida,
  Entregue,
}

enum Depois {
  Recebida,
  EmTransporte,
  Entregue,
}

console.log(Antes.Entregue); // 1
console.log(Depois.Entregue); // 2
```

Ao inserir um membro no meio, deslocamos o número de `Entregue`. Se `1` já tivesse sido guardado em um arquivo como código de entrega, a nova declaração lhe daria outro significado.

Use a sequência automática quando os números concretos não fizerem parte de um acordo que precisa permanecer estável. Não deduza uma ordem de processamento apenas dos nomes: o programa ainda precisa implementar essa ordem.

## Zero é um valor, não ausência

Nos enums que começam em zero, o primeiro membro é falsy. Uma condicional como `if (prioridade)` pode confundir esse valor com a falta de informação.

Para representar ausência, use uma alternativa explícita, como no capítulo 17:

```ts
enum Prioridade {
  Baixa,
  Media,
  Alta,
}

function descreverPrioridade(prioridade: Prioridade | null): string {
  if (prioridade === null) {
    return "Prioridade não informada.";
  }

  switch (prioridade) {
    case Prioridade.Baixa:
      return "Prioridade baixa.";
    case Prioridade.Media:
      return "Prioridade média.";
    case Prioridade.Alta:
      return "Prioridade alta.";
  }
}

console.log(descreverPrioridade(Prioridade.Baixa)); // Prioridade baixa.
console.log(descreverPrioridade(null)); // Prioridade não informada.
```

A verificação `=== null` separa a ausência de todos os membros, inclusive o de valor zero. É o mesmo cuidado que você já teve ao distinguir o número `0` de `null`.

## Consultar pelo nome ou pelo número

Um enum numérico comum cria duas direções de consulta. O **reverse mapping**, ou mapeamento reverso, é o caminho do número de volta ao nome:

```ts
enum Prioridade {
  Baixa,
  Media,
  Alta,
}

console.log(Prioridade.Alta); // 2: nome → número
console.log(Prioridade[2]); // Alta: número → nome
console.log(Prioridade[99]); // undefined: não há essa propriedade
```

Os colchetes são o acesso a uma propriedade que você já conhece dos objetos. Na execução, esse enum contém tanto `Alta: 2` quanto uma propriedade de chave `"2"` com o valor `"Alta"`. O acesso com `[2]` usa essa chave numérica convertida em texto.

O resultado `"Alta"` é o **nome do membro**, com a grafia da declaração. Não é uma tradução nem uma mensagem pronta para o usuário. Para mensagens, a função com `switch` da seção anterior é mais clara.

O reverse mapping vale para os membros numéricos. Um enum de texto não recebe automaticamente propriedades para o caminho inverso:

```ts
enum EstadoPedido {
  Pendente = "pendente",
  Pronto = "pronto",
}

console.log(EstadoPedido.Pronto); // pronto
// console.log(EstadoPedido["pronto"]); // Erro: essa propriedade não existe.
```

`Pronto` é a chave declarada; `"pronto"` é seu valor. A declaração cria a primeira propriedade, sem criar outra que inverta essa associação.

Há também um limite nos enums numéricos: se dois membros tiverem o mesmo número, só um nome fica no caminho reverso. O último sobrescreve o anterior:

```ts
enum Codigo {
  Primeiro = 1,
  Segundo = 1,
}

console.log(Codigo.Primeiro); // 1
console.log(Codigo.Segundo); // 1
console.log(Codigo[1]); // Segundo
```

Para os exemplos e a prática deste capítulo, mantenha valores diferentes. Não use o reverse mapping como prova de que o nome original pode ser recuperado em qualquer enum.

## Uma anotação numérica não valida o código recebido

Nos exemplos com membros fixos, TypeScript rejeita um literal fora dos valores declarados. Porém, uma variável de tipo amplo `number` pode ser atribuída a um enum numérico:

```ts
enum CodigoEncomenda {
  Recebida = 10,
  EmTransporte = 20,
  Entregue = 30,
}

// const literalInvalido: CodigoEncomenda = 99; // Erro no TypeScript atual.

const numero: number = 99;
const codigo: CodigoEncomenda = numero; // Aceito.
console.log(codigo); // 99
```

A anotação `number` informa apenas que `numero` é numérico. O compilador aceita essa atribuição, mas não insere uma verificação para conferir se existe um membro com valor `99`.

Por isso, receber um número de outro lugar exige conferir os códigos permitidos. O enum fornece nomes úteis; ele não substitui essa conferência. A atividade vai pedir uma função que faça justamente essa separação, sem casts.

As leituras de apoio são [Numeric enums](https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums) e [Reverse mappings](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings), nos limites do guia. Os comportamentos numéricos acima também foram conferidos com o compilador do curso.

Siga para a [aula 3 — Escolher a representação](03-escolhas-e-variantes.md).

[Voltar ao guia — etapa 2](../README.md#etapa-2)
