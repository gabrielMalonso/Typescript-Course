# Compatibilidade e fronteiras da coleção

## O objeto atende ao formato que a função precisa

Uma função que cumprimenta alguém só precisa de um nome. O objeto da agenda tem mais informações, mas também contém esse nome:

```ts
interface Nomeado {
  nome: string;
}

function cumprimentar(pessoa: Nomeado): string {
  return `Olá, ${pessoa.nome}!`;
}

const contato = { id: 1, nome: "Ana", email: "ana@example.com" };
console.log(cumprimentar(contato)); // Olá, Ana!

// cumprimentar({ id: 2 }); // Erro: falta nome.
// cumprimentar({ nome: 2 }); // Erro: nome deve ser string.
```

O objeto `contato` não foi anotado como `Nomeado`. Mesmo assim, pode ser recebido pela função porque contém o campo exigido com um tipo compatível.

Essa é a **compatibilidade estrutural**: TypeScript compara a estrutura que existe com a estrutura exigida. Para estes contratos, o nome dado ao tipo não é uma etiqueta obrigatória no objeto. A função pode trabalhar com contatos, alunos ou outros registros que forneçam um `nome: string`.

Dois contratos com os mesmos campos também podem ser compatíveis, mesmo com nomes diferentes:

```ts
interface Contato {
  id: number;
  nome: string;
}

interface Cadastro {
  id: number;
  nome: string;
}

const cadastro: Cadastro = { id: 1, nome: "Ana" };
const contato: Contato = cadastro;
console.log(contato === cadastro); // true
```

Os nomes documentam a intenção, mas não criam uma separação obrigatória entre os valores. Neste exemplo, anotar a segunda variável também não copia o objeto.

## Um objeto literal recebe uma conferência adicional

O exemplo com um contato completo pode levantar uma dúvida: se campos extras são possíveis, por que o editor às vezes os rejeita?

Ao escrever um objeto literal diretamente em um lugar que espera um contrato, TypeScript também confere propriedades extras:

```ts
interface Nomeado {
  nome: string;
}

function cumprimentar(pessoa: Nomeado): string {
  return `Olá, ${pessoa.nome}!`;
}

console.log(cumprimentar({ nome: "Ana" })); // Olá, Ana!

// cumprimentar({ nome: "Ana", id: 1 }); // Erro: id não pertence a Nomeado.
// const pessoa: Nomeado = { nome: "Ana", id: 1 }; // Mesmo motivo.
```

Essa conferência ajuda a encontrar enganos na construção de um objeto, como um campo escrito com o nome errado. Ela não transforma a interface em uma regra que elimina qualquer objeto maior.

No primeiro exemplo, o objeto completo existe na agenda por uma razão: outras partes do programa usam seu identificador e seu email. A função de saudação aproveita apenas o nome. Se você encontrar um erro de propriedade extra em uma construção, confira o campo e o contrato; não crie uma variável intermediária apenas para esconder o erro.

## Um contrato menor não remove campos do valor

Uma anotação determina quais campos o código pode acessar. Ela não transforma os dados:

```ts
interface Nomeado {
  nome: string;
}

const contato = { id: 1, nome: "Ana", email: "ana@example.com" };
const pessoa: Nomeado = contato;

console.log(pessoa.nome); // Ana
console.log(pessoa === contato); // true
console.log(pessoa); // { id: 1, nome: "Ana", email: "ana@example.com" }

// console.log(pessoa.email); // Erro: Nomeado não descreve esse campo.
```

O objeto continua contendo o email, embora `pessoa.email` não esteja disponível pelo contrato `Nomeado`. Para produzir um objeto com menos campos, precisamos construir esse novo objeto explicitamente.

Isso ajuda a entender uma **fronteira de função**: os contratos de entrada e saída dizem o que a função recebe e entrega. O comportamento que transforma esses valores precisa estar no corpo da função.

## Usar contratos na busca e na saída

Vamos juntar uma coleção conhecida, a representação de ausência e uma saída menor:

```ts
interface Contato {
  readonly id: number;
  nome: string;
  email?: string;
}

interface ResumoContato {
  readonly id: number;
  nome: string;
}

function buscarContato(contatos: readonly Contato[], id: number): Contato | null {
  for (const contato of contatos) {
    if (contato.id === id) {
      return contato;
    }
  }
  return null;
}

function resumirContato(contato: Contato): ResumoContato {
  return { id: contato.id, nome: contato.nome };
}

const contatos: Contato[] = [
  { id: 1, nome: "Ana", email: "ana@example.com" },
  { id: 2, nome: "Bia" },
];

const encontrado = buscarContato(contatos, 1);
if (encontrado !== null) {
  const resumo = resumirContato(encontrado);
  console.log(resumo); // { id: 1, nome: "Ana" }
  console.log(encontrado === contatos[0]); // true
  console.log(resumo === encontrado); // false
}

console.log(buscarContato(contatos, 9)); // null
console.log(buscarContato([], 1)); // null
```

`readonly Contato[]` informa que a busca pode ler a lista, sem adicionar, remover ou substituir elementos por esse parâmetro. Os objetos da lista continuam tendo seus próprios campos mutáveis, como `nome`. A implementação da busca apenas lê os dados.

O retorno `Contato | null` descreve presença ou ausência. Quando há resultado, ele é o próprio objeto da coleção. Alterar seu nome por essa referência também alteraria o contato guardado na agenda.

Já `resumirContato` constrói outro objeto, contendo apenas `id` e `nome`. Essa construção faz o trabalho que uma simples anotação não faria. Como esses campos contêm um número e uma string, alterar o nome do resumo não altera o nome do contato original.

Para um array denso de `n` contatos, a busca percorre até `n` elementos: tempo O(n) no pior caso e espaço auxiliar O(1). Se houver identificadores repetidos, devolve a primeira ocorrência; a interface não garante unicidade. Criar o resumo de dois campos custa O(1). Nenhuma declaração de interface muda esses custos.

## Escolher entre interface e type

Para um formato simples de objeto, ambas as declarações atendem ao problema. Interfaces não tornam esses objetos mais seguros em execução que aliases equivalentes. Use a convenção do projeto e evite reescrever um contrato que já está claro.

| Necessidade | Escolha inicial |
|---|---|
| Nomear um registro com campos, como um contato | `interface` ou `type`, conforme a convenção |
| Dar nome a uma union de estados ou resultados | `type` |
| Dar nome a uma tuple ou a um tipo primitivo | `type` |
| Combinar contratos com `&`, como no capítulo 17 | `type` para nomear essa intersection |
| Usar um contrato de objeto já existente | Manter sua declaração, salvo motivo para mudar |

Uma interface descreve um formato de objeto. Um alias pode dar nome também às outras formas que já estudamos. Os dois podem trabalhar juntos:

```ts
interface Contato {
  readonly id: number;
  nome: string;
}

type ResultadoBusca =
  | { estado: "encontrado"; contato: Contato }
  | { estado: "ausente" };

function descreverResultado(resultado: ResultadoBusca): string {
  if (resultado.estado === "encontrado") {
    return resultado.contato.nome;
  }
  return "Contato não encontrado.";
}

console.log(descreverResultado({
  estado: "encontrado",
  contato: { id: 1, nome: "Ana" },
})); // Ana
console.log(descreverResultado({ estado: "ausente" }));
// Contato não encontrado.

// const incompleto: ResultadoBusca = { estado: "encontrado" };
// Erro: o estado encontrado exige contato.
```

O objeto `Contato` tem seu formato descrito por uma interface. A union de resultados tem seu nome descrito por `type`. Escolhemos o recurso de acordo com o formato que queremos expressar.

**Para reconhecer, sem praticar agora:** interfaces podem ser ampliadas com `extends`; declarações compatíveis com o mesmo nome e no mesmo escopo também podem reunir campos, mecanismo chamado *declaration merging*. Um alias não pode ser reaberto dessa maneira. Esses mecanismos serão estudados no capítulo 44; não é necessário aplicá-los para escolher os contratos desta aula.

As leituras desta etapa são [Starting out](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#starting-out) e o parágrafo inicial de [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

Faça a [atividade 1 — Consultar uma coleção de livros](../03-pratica/atividades.md#atividade-1) e, depois, a [atividade 2 — Um registro e um resultado](../03-pratica/atividades.md#atividade-2).

[Voltar ao guia — etapa 3](../README.md#etapa-3)
