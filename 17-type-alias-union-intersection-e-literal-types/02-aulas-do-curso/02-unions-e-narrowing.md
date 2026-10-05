# Uma alternativa precisa de uma verificação

## Uma função, dois tipos possíveis

Na aula anterior, `|` permitiu escolher entre dois textos conhecidos. Ele também pode reunir tipos mais amplos. Suponha que um identificador possa ser um número ou um texto:

```ts
type Identificador = number | string;

function descreverId(id: Identificador): string {
  // return id.toUpperCase(); // Erro: number não tem esse método.

  if (typeof id === "string") {
    return `Texto: ${id.toUpperCase()}`;
  }

  return `Número: ${id.toFixed(0)}`;
}

console.log(descreverId("a7")); // Texto: A7
console.log(descreverId(7)); // Número: 7
```

`Identificador` admite qualquer valor de um dos tipos. Ele não transforma um número em texto. Antes da verificação, não podemos usar um método exclusivo de `string`, porque a função também recebe números.

`typeof` é uma operação JavaScript: inspeciona o valor em execução. TypeScript acompanha essa condição e, dentro do primeiro ramo, sabe que `id` é `string`. Como esse ramo termina com `return`, o código restante só recebe a alternativa `number`.

Esse processo se chama **narrowing**, ou refinamento: a informação disponível em um ponto do código permite trabalhar com um tipo mais específico.

```text
entrada: number | string
             |
    typeof id === "string"?
         /             \
       sim             não
    string            number
  toUpperCase()      toFixed(0)
```

O retorno continua sendo `string` nos dois caminhos. A escolha do ramo muda como a informação é produzida.

## Union não significa que tudo existe ao mesmo tempo

Uma operação disponível em todas as alternativas pode ser usada diretamente. Já um campo específico depende de descobrir qual alternativa chegou:

```ts
type ComNome = { nome: string };
type ComCodigo = { codigo: number };

function mostrar(registro: ComNome | ComCodigo): void {
  console.log(registro);
  // console.log(registro.nome); // Pode ser apenas ComCodigo.
  // console.log(registro.codigo); // Pode ser apenas ComNome.
}

mostrar({ nome: "Ana" });
mostrar({ codigo: 7 });
```

O contrato aceita um objeto que atende a `ComNome` ou a `ComCodigo`. Uma union comum não proíbe que um valor atenda aos dois tipos; ela também não garante que os dois campos estejam presentes. Para exigir ambos, usaremos `&` na próxima aula.

## Uma busca pode não encontrar

A busca do capítulo 14 retornava um índice e usava `-1` para indicar ausência. Outra API pode retornar o próprio registro, ou `null` quando ele não existe:

```ts
type Aluno = { nome: string; nota: number };

function buscarAluno(alunos: Aluno[], nome: string): Aluno | null {
  for (const aluno of alunos) {
    if (aluno.nome === nome) {
      return aluno;
    }
  }
  return null;
}

function descreverAluno(aluno: Aluno | null): string {
  // return aluno.nome; // Erro: pode ser null.
  if (aluno === null) {
    return "Aluno não encontrado";
  }
  return `${aluno.nome}: ${aluno.nota}`;
}

const turma: Aluno[] = [{ nome: "Ana", nota: 0 }];
console.log(descreverAluno(buscarAluno(turma, "Ana"))); // Ana: 0
console.log(descreverAluno(buscarAluno(turma, "Bia"))); // Aluno não encontrado
console.log(descreverAluno(buscarAluno([], "Ana"))); // Aluno não encontrado
```

O retorno `Aluno | null` obriga quem usa a função a considerar a ausência. Depois de `if (aluno === null)` terminar com `return`, sobra `Aluno` e suas propriedades podem ser acessadas.

No curso, `strict: true` ativa `strictNullChecks`. Esse cuidado aparece durante a verificação de tipos. O `if` permanece no JavaScript e resolve o caso em execução.

A função retorna a referência do aluno que já estava no array; não cria uma cópia. A busca preserva a entrada, mas alterar o objeto retornado depois também altera esse aluno na turma. No pior caso, percorremos `n` registros: tempo O(n), espaço auxiliar O(1), considerando a comparação de nomes curtos de tamanho limitado. O tipo do retorno não acelera a busca.

## Ausência é diferente de zero ou texto vazio

`if (valor)` usa as regras de truthy/falsy do capítulo 03. Isso pode descartar um valor válido:

```ts
function descreverNota(nota: number | null): string {
  if (nota === null) {
    return "Sem nota";
  }
  return `Nota: ${nota}`;
}

console.log(descreverNota(0)); // Nota: 0
console.log(descreverNota(null)); // Sem nota
```

Se o teste fosse `if (!nota)`, tanto `0` quanto `null` entrariam no caso de ausência. Ao modelar `number | null`, use a comparação que expressa exatamente a ausência escolhida.

`undefined` também pode ser uma alternativa. Ler uma propriedade opcional produz essa possibilidade:

```ts
type Registro = { nome: string; observacao?: string };

function descreverObservacao(registro: Registro): string {
  const observacao = registro.observacao; // string | undefined
  if (observacao === undefined) {
    return "Sem observação";
  }
  return `Observação: ${observacao}`;
}

console.log(descreverObservacao({ nome: "Ana" })); // Sem observação
console.log(descreverObservacao({ nome: "Ana", observacao: "" })); // Observação:
```

O texto vazio continua presente. Você pode usar `??` quando só precisa de um valor alternativo; o `if` ajuda quando cada caso exige uma ação diferente.

Um último cuidado com `typeof`:

```ts
console.log(typeof null); // "object"
```

Testar `typeof valor === "object"` não exclui `null`. Para as buscas deste capítulo, compare diretamente com `null` antes de acessar o objeto.

Faça a [atividade 1 — Leituras disponíveis e maior valor](../03-pratica/atividades.md#atividade-1). Depois siga para a [aula 3 — Campos juntos, estados separados](03-intersections-e-estados.md).

[Voltar ao guia — etapa 2](../README.md#etapa-2)
