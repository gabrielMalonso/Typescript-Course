# Campos opcionais e readonly

## Um contato pode não ter email

Na aula 1, todo contato precisava de `id` e `nome`. Agora queremos guardar também o email, mas só quando essa informação estiver disponível.

Um `?` depois do nome da propriedade indica que ela pode faltar:

```ts
interface Contato {
  id: number;
  nome: string;
  email?: string;
}

function descreverEmail(contato: Contato): string {
  if (contato.email === undefined) {
    return "Email não informado.";
  }
  return `Email: ${contato.email.toLowerCase()}`;
}

const ana: Contato = { id: 1, nome: "Ana" };
const bia: Contato = { id: 2, nome: "Bia", email: "BIA@example.com" };

console.log(descreverEmail(ana)); // Email não informado.
console.log(descreverEmail(bia)); // Email: bia@example.com
console.log(descreverEmail({ id: 3, nome: "Caio", email: "" }));
// Email: (seguido de um espaço; o texto vazio foi mantido)

// const email: string = ana.email; // Erro: também pode ser undefined.
```

O contrato exige `id` e `nome` nos dois objetos. Já `email` pode estar ausente. Ao ler esse campo, o tipo é `string | undefined`, uma alternativa que você já conhece do capítulo 17.

O `if` trata a ausência e retorna. No trecho seguinte, TypeScript sabe que o email é uma string, por isso aceita chamar `toLowerCase()`. Não precisamos de um cast para informar isso ao compilador.

O caso com `""` também é aceito: `string` não exige um endereço de email válido nem um texto preenchido. Escolhemos testar `=== undefined` para separar a falta do campo de um texto existente, mesmo vazio. Se o programa exige um email válido, precisa conferir essa regra separadamente.

Use um campo opcional quando a informação pode faltar naquele registro. Se estados diferentes exigem dados diferentes, a union discriminada do capítulo 17 continua sendo a ferramenta adequada.

## O identificador deve ser preservado

Imagine que o nome de um contato pode ser corrigido, mas seu identificador deve ser mantido. Podemos expressar essa intenção com `readonly` na propriedade:

```ts
interface Contato {
  readonly id: number;
  nome: string;
  email?: string;
}

const contato: Contato = { id: 1, nome: "Ana" };
contato.nome = "Ana Maria";
contato.email = "ana@example.com";

console.log(contato.id, contato.nome); // 1 Ana Maria
console.log(contato.email); // ana@example.com

// contato.id = 2; // Erro: id é uma propriedade readonly.
```

O valor de `id` é informado ao construir o objeto. Depois, uma atribuição a `contato.id` é rejeitada pelo contrato. `nome` e `email` continuam permitindo escrita.

O `const` da variável e o `readonly` da propriedade têm papéis diferentes. `const contato` impede trocar a referência guardada na variável. `readonly id` impede escrever naquele campo por esse contrato. Nenhum dos dois torna todos os campos do objeto imutáveis.

## Readonly não cria uma cópia nem congela o objeto

Como nas tuples, a restrição pertence ao TypeScript. Outra referência que permita escrita ainda pode modificar o mesmo objeto:

```ts
interface Contato {
  readonly id: number;
  nome: string;
}

const original = { id: 1, nome: "Ana" };
const contato: Contato = original;

original.id = 9; // O tipo inferido de original permite essa escrita.
console.log(contato.id); // 9
console.log(contato === original); // true

// contato.id = 2; // Erro por esta referência, cujo contrato é Contato.
```

As duas variáveis apontam para o mesmo objeto. Anotá-lo como `Contato` não faz uma cópia, não insere um bloqueio em JavaScript e não muda o contrato da variável `original`.

Por isso, `readonly` ajuda a comunicar e conferir o uso esperado, mas não é uma garantia de que aquele dado nunca poderá mudar. Preservar dados compartilhados também depende das referências e das funções que usam esses dados.

## A restrição de um campo não se espalha para seu conteúdo

Uma propriedade pode conter um array. Marcar a propriedade como `readonly` impede substituí-la; os elementos do array ainda podem ser alterados:

```ts
interface Grupo {
  readonly nomes: string[];
}

const grupo: Grupo = { nomes: ["Ana"] };
grupo.nomes.push("Bia"); // Permitido: o array continua mutável.
console.log(grupo.nomes); // ["Ana", "Bia"]

// grupo.nomes = ["Caio"]; // Erro: substituir a propriedade é proibido.
```

Para impedir também a alteração do array por esse contrato, precisamos descrever um array de leitura:

```ts
interface Grupo {
  readonly nomes: readonly string[];
}

const grupo: Grupo = { nomes: ["Ana"] };
console.log(grupo.nomes[0]); // Ana

// grupo.nomes = ["Bia"]; // Erro: a propriedade não permite substituição.
// grupo.nomes.push("Bia"); // Erro: o array não permite push.
```

Leia a declaração em duas partes: o primeiro `readonly` restringe a propriedade `nomes`; `readonly string[]` restringe o uso do array. Essa notação de array de leitura também apareceu no capítulo 18.

Se o array contiver objetos, seus campos terão seus próprios contratos. Restringir a lista não torna automaticamente todos os objetos internos imutáveis.

## Recuperar a intenção de cada declaração

| Declaração de propriedade | Pode faltar na construção? | Permite atribuição pelo contrato depois da construção? |
|---|---|---|
| `nome: string` | Não | Sim |
| `email?: string` | Sim | Sim |
| `readonly id: number` | Não | Não |
| `readonly email?: string` | Sim | Não |

O `?` responde se o campo pode faltar. O `readonly` responde se o código pode escrever nele por aquele contrato. São decisões independentes.

Nenhum desses modificadores acrescenta uma operação ao JavaScript gerado. Seu benefício está na descrição e na verificação do uso dos dados; o programa continua pagando o custo das operações que de fato executa.

As leituras desta etapa são [Optional Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) e [readonly Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties), nos limites do guia.

Siga para a [aula 3 — Compatibilidade e fronteiras da coleção](03-compatibilidade-e-colecoes.md).

[Voltar ao guia — etapa 2](../README.md#etapa-2)
