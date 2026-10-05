# Campos juntos, estados separados

## Um objeto precisa atender a dois contratos

Suponha que já existam um contrato de identificação e outro de contato. Para um cadastro que exige os dois, podemos usar uma **intersection**, escrita com `&`:

```ts
type Identificacao = { id: number; nome: string };
type Contato = { email: string };
type Cadastro = Identificacao & Contato;

const cadastro: Cadastro = {
  id: 7,
  nome: "Ana",
  email: "ana@example.com",
};

function descreverCadastro(valor: Cadastro): string {
  return `${valor.id}: ${valor.nome} — ${valor.email}`;
}

console.log(descreverCadastro(cadastro)); // 7: Ana — ana@example.com
// const incompleto: Cadastro = { id: 7, nome: "Ana" }; // Falta email.
```

`Cadastro` exige um valor que atenda a `Identificacao` **e** a `Contato`. Neste caso, o resultado precisa dos três campos. Não são dois objetos em uma lista; é um objeto atendendo aos dois contratos.

O operador de tipo não junta valores em execução. Quando há dois objetos separados, construir um terceiro continua sendo trabalho do código JavaScript:

```ts
type Identificacao = { id: number; nome: string };
type Contato = { email: string };
type Cadastro = Identificacao & Contato;

const identificacao: Identificacao = { id: 7, nome: "Ana" };
const contato: Contato = { email: "ana@example.com" };
const cadastro: Cadastro = { ...identificacao, ...contato };

console.log(cadastro.email); // ana@example.com
```

Aqui, os spreads constroem o valor; `Cadastro` verifica seu formato. Se esses contratos não tivessem uso independente, escrever diretamente `{ id: number; nome: string; email: string }` também seria uma escolha clara. Use a combinação quando houver algo útil a reutilizar.

## Intersection não sobrescreve tipos conflitantes

Se os dois lados exigirem tipos incompatíveis para o mesmo campo, `&` exige ambos. Não há uma regra de “o último ganha”:

```ts
type IdNumerico = { id: number };
type IdTextual = { id: string };
type Conflito = IdNumerico & IdTextual;

// const primeiro: Conflito = { id: 7 };
// const segundo: Conflito = { id: "7" };
```

As duas construções produzem erro: `id` teria que ser número e texto ao mesmo tempo. O editor pode mostrar `never` para esse campo, indicando que nenhum valor satisfaz a exigência. Não é necessário estudar esse tipo em profundidade agora; corrija o contrato incompatível. Spread de valores, por sua vez, pode sobrescrever uma propriedade: é uma operação diferente de intersection de tipos.

## Campos opcionais não descrevem a relação entre estados

Queremos que uma busca informe também quantas comparações foram feitas. Uma primeira tentativa poderia ser:

```ts
type ResultadoSolto = {
  estado: "encontrado" | "ausente";
  indice?: number;
  comparacoes: number;
};

const incompleto: ResultadoSolto = {
  estado: "encontrado",
  comparacoes: 2,
}; // Aceito, embora encontrar devesse exigir um índice.

console.log(incompleto.indice); // undefined
```

O tipo informa que `indice` pode faltar em qualquer estado. Ele não expressa a regra “encontrado exige índice”. Por isso, mesmo depois de verificar `estado === "encontrado"`, o campo opcional ainda pode ser `undefined`.

Precisamos representar cada alternativa com os dados que ela exige:

```text
resultado da busca
  encontrado → comparacoes + indice
  ausente    → comparacoes
```

## Um campo literal identifica a alternativa

Vamos criar um contrato para cada estado e reuni-los em uma union:

```ts
type Encontrado = {
  estado: "encontrado";
  indice: number;
  comparacoes: number;
};

type Ausente = {
  estado: "ausente";
  comparacoes: number;
};

type ResultadoBusca = Encontrado | Ausente;

function descreverBusca(resultado: ResultadoBusca): string {
  if (resultado.estado === "encontrado") {
    return `Índice ${resultado.indice}; ${resultado.comparacoes} comparações`;
  }
  return `Ausente; ${resultado.comparacoes} comparações`;
}

console.log(descreverBusca({ estado: "encontrado", indice: 0, comparacoes: 1 }));
// Índice 0; 1 comparações
console.log(descreverBusca({ estado: "ausente", comparacoes: 3 }));
// Ausente; 3 comparações

// const incompleto: ResultadoBusca = { estado: "encontrado", comparacoes: 2 };
// Erro: a alternativa "encontrado" exige indice.
```

Essa é uma **discriminated union**, ou união discriminada. O campo comum `estado` tem um tipo literal diferente em cada alternativa. Ao conferir esse campo, TypeScript identifica o formato inteiro: no ramo encontrado, `indice` existe e é `number`.

Já `comparacoes` existe nos dois formatos, então pode ser lido sem escolher um ramo. Mantivemos o objeto junto à verificação para que a relação entre estado e dados fique visível.

## Produzir o resultado com um algoritmo conhecido

Agora reúna o modelo e a busca linear em um bloco executável. Como `comparacoes` é comum aos dois estados, também podemos reutilizá-lo por intersection:

```ts
type Medicao = { comparacoes: number };
type Encontrado = Medicao & { estado: "encontrado"; indice: number };
type Ausente = Medicao & { estado: "ausente" };
type ResultadoBusca = Encontrado | Ausente;

// Entrada: array denso de números finitos; igualdade numérica com ===.
function buscarComMedicao(numeros: number[], alvo: number): ResultadoBusca {
  let comparacoes = 0;

  for (let indice = 0; indice < numeros.length; indice++) {
    comparacoes++;
    if (numeros[indice] === alvo) {
      return { estado: "encontrado", indice, comparacoes };
    }
  }

  return { estado: "ausente", comparacoes };
}

function descreverBusca(resultado: ResultadoBusca): string {
  switch (resultado.estado) {
    case "encontrado":
      return `Índice ${resultado.indice}; ${resultado.comparacoes} comparações`;
    case "ausente":
      return `Ausente; ${resultado.comparacoes} comparações`;
  }
}

console.log(descreverBusca(buscarComMedicao([4, 7, 7], 7)));
// Índice 1; 2 comparações
console.log(descreverBusca(buscarComMedicao([4, 7, 7], 4)));
// Índice 0; 1 comparações
console.log(descreverBusca(buscarComMedicao([4, 7, 7], 2)));
// Ausente; 3 comparações
console.log(descreverBusca(buscarComMedicao([], 7)));
// Ausente; 0 comparações
```

Contamos apenas comparações entre elemento e alvo. A busca termina na primeira ocorrência e preserva a entrada. O `switch`, conhecido desde o capítulo 03, também refina a union pelo campo literal.

| Pergunta do modelo | Operador | Exemplo |
|---|---|---|
| O valor atende a uma das alternativas? | `\|` | `Encontrado \| Ausente` |
| O valor atende aos dois contratos? | `&` | `Medicao & { estado: "encontrado"; indice: number }` |

O algoritmo ainda tem tempo O(n) no pior caso e espaço auxiliar O(1). Criar um pequeno objeto de resultado não muda seu crescimento. `type`, `|` e `&` desaparecem na compilação; os objetos, seus campos e as verificações permanecem em JavaScript.

## O contrato protege o formato, não toda a lógica

O índice passou a ser obrigatório no caso encontrado. Isso elimina o resultado incompleto anterior, mas `indice: number` ainda aceita `-1`. O tipo não demonstra que o índice aponta para o alvo; precisamos implementar e testar a busca corretamente.

Esses tipos também não verificam automaticamente dados vindos de um arquivo ou serviço. Aqui construímos os resultados em código tipado. Validação de dados externos será assunto posterior.

Na busca que só precisava retornar um aluno, `Aluno | null` bastava. Quando precisamos distinguir formatos com dados associados, o campo literal torna o contrato mais claro. Escolha a representação pela informação que o problema exige.

Faça a [atividade 2 — Pedido de retirada](../03-pratica/atividades.md#atividade-2).

[Voltar ao guia — etapa 3](../README.md#etapa-3)
