# Prática — Contratos de uma coleção

Na atividade 1, use o Pad ou um arquivo TypeScript em modo estrito. Resolva com os recursos já estudados, sem casts, classes ou interfaces avançadas. A atividade 2 pede apenas uma escolha justificada.

### 1. Consultar uma coleção de livros

Uma pequena biblioteca guarda livros com identificador, título e uma edição opcional. A consulta deve devolver um resumo novo, sem modificar o livro original.

Crie estas duas interfaces:

| Interface | Campos |
|---|---|
| `Livro` | `readonly id: number`, `titulo: string`, `edicao?: number` |
| `ResumoLivro` | `readonly id: number`, `titulo: string`, `edicaoExibida: string` |

Implemente uma função com este contrato:

```ts
// Assinatura a implementar:
// function consultarLivro(livros: readonly Livro[], id: number): ResumoLivro | null
```

Percorra a coleção até encontrar o identificador. Se encontrar, construa um objeto novo com os campos de `ResumoLivro`. Se não encontrar, retorne `null`. Preserve a lista e os objetos recebidos.

Quando a edição estiver ausente, `edicaoExibida` deve ser `"não informada"`. Quando estiver presente, use o texto `"edição N"`, substituindo `N` pelo número da edição. Por exemplo, a edição `2` produz `"edição 2"`.

A entrada é um array denso de livros com identificadores inteiros e distintos. Quando presente, a edição é um inteiro positivo. Essas são as condições de entrada do exercício; as interfaces não as validam automaticamente.

Use esta coleção nos testes:

```ts
// Depois de declarar Livro:
const livros: Livro[] = [
  { id: 1, titulo: "Algoritmos", edicao: 2 },
  { id: 2, titulo: "Redes" },
];
```

| Chamada | Retorno esperado |
|---|---|
| `consultarLivro(livros, 1)` | `{ id: 1, titulo: "Algoritmos", edicaoExibida: "edição 2" }` |
| `consultarLivro(livros, 2)` | `{ id: 2, titulo: "Redes", edicaoExibida: "não informada" }` |
| `consultarLivro(livros, 9)` | `null` |
| `consultarLivro([], 1)` | `null` |

Depois de tratar `null`, altere o título de um resumo retornado e confira que o título do livro original continua igual. Isso verifica que sua função construiu outro objeto, em vez de apenas dar outro tipo à mesma referência.

No editor, experimente atribuir outro número ao `id` de um livro e depois comente a linha novamente: o contrato deve rejeitar a escrita. Ao enviar a tentativa, inclua as chamadas acima e a conferência de preservação do livro original.

### 2. Um registro e um resultado

Você precisa representar um sensor com `id: number` e `nome: string`. A leitura desse sensor tem dois resultados possíveis: `{ estado: "disponivel"; valor: number }` ou `{ estado: "sem-leitura" }`.

O projeto ainda não tem uma convenção de tipos. Quais desses formatos você poderia nomear com `interface` ou `type`? Para qual deles usaria `type` para reunir as alternativas? Responda em duas ou três frases, explicando sua escolha. Não é necessário implementar uma função nem juntar os dois resultados em um único objeto com `valor` opcional.

[Voltar ao guia — etapa 4](../README.md#etapa-4)
