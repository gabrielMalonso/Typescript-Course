# Interfaces para contratos de objetos

## Partir de um objeto que já tem nome

Você já sabe dar nome ao formato de um objeto com `type`. Imagine uma pequena agenda de contatos:

```ts
type Contato = {
  id: number;
  nome: string;
};

const contato: Contato = { id: 1, nome: "Ana" };
console.log(contato.nome); // Ana
```

O contrato informa que cada contato tem um identificador numérico e um nome de texto. Agora vamos escrever o mesmo formato com uma **interface**:

```ts
interface Contato {
  id: number;
  nome: string;
}

const contato: Contato = { id: 1, nome: "Ana" };
console.log(contato.nome); // Ana
```

Neste caso, o uso e o resultado são os mesmos. A novidade é a declaração: depois de `interface Contato`, escrevemos os campos entre chaves, sem o `=` usado no alias.

Leia `interface Contato` como “este é o formato de objeto que chamaremos de Contato”. O nome deve ajudar a reconhecer a informação representada. Os campos dizem o que o código pode esperar dela.

## O contrato verifica uma construção

Quando anotamos uma variável com `Contato`, o compilador confere o objeto atribuído a ela:

```ts
interface Contato {
  id: number;
  nome: string;
}

const completo: Contato = { id: 1, nome: "Ana" };
console.log(completo.id, completo.nome); // 1 Ana

// const semNome: Contato = { id: 2 }; // Erro: falta nome.
// const idTextual: Contato = { id: "2", nome: "Bia" }; // Erro: id deve ser number.
```

As duas linhas comentadas falham por motivos diferentes. Na primeira, falta uma propriedade obrigatória. Na segunda, a propriedade existe, mas seu valor tem um tipo incompatível.

O contrato descreve o formato, não todas as regras da agenda. `id: number` ainda aceita números negativos; `nome: string` aceita o texto vazio. Se o programa precisa proibir esses valores ou evitar identificadores repetidos, deve implementar essas verificações.

## Usar a interface como entrada de uma função

Uma função pode declarar o objeto de que precisa sem repetir os campos:

```ts
interface Contato {
  id: number;
  nome: string;
}

function criarEtiqueta(contato: Contato): string {
  return `${contato.id} — ${contato.nome}`;
}

const ana: Contato = { id: 1, nome: "Ana" };
console.log(criarEtiqueta(ana)); // 1 — Ana
console.log(criarEtiqueta({ id: 2, nome: "Bia" })); // 2 — Bia

// criarEtiqueta({ nome: "Caio" }); // Erro: falta id.
```

`contato: Contato` descreve a entrada; `: string` descreve a saída. Dentro da função, sabemos que `contato.id` é um número e que `contato.nome` é um texto.

Passar o objeto não o copia. A função recebe uma referência ao objeto, como você já viu no capítulo 07. Aqui ela apenas lê os campos e constrói uma string.

## Interface descreve o tipo e o literal cria o valor

A distinção de tipo e valor do capítulo 18 continua importante:

```text
interface Contato { id: number; nome: string; }
  → descreve o tipo de um objeto no TypeScript
  → desaparece do JavaScript gerado

const contato = { id: 1, nome: "Ana" };
  → cria o objeto usado pelo programa
  → permanece no JavaScript gerado
```

A interface não produz um objeto com campos vazios nem uma função que constrói contatos:

```ts
interface Contato {
  id: number;
  nome: string;
}

const contato: Contato = { id: 1, nome: "Ana" };
console.log(contato); // { id: 1, nome: "Ana" }

// console.log(Contato); // Erro: Contato existe apenas como tipo.
```

Assim como o alias, a interface não acrescenta uma validação em execução. Um objeto vindo de um arquivo ou serviço precisa ser conferido pelo programa antes de ser tratado como um contato válido. Esse trabalho será estudado nos capítulos de consumo e validação de dados externos.

## Uma coleção usa o contrato de cada elemento

Podemos usar `Contato[]` para um array de contatos:

```ts
interface Contato {
  id: number;
  nome: string;
}

const contatos: Contato[] = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bia" },
];

contatos.push({ id: 3, nome: "Caio" });

for (const contato of contatos) {
  console.log(contato.nome);
}
// Ana
// Bia
// Caio

// contatos.push({ id: 4 }); // Erro: falta nome no novo elemento.
```

A interface descreve cada objeto; `[]` indica que há uma coleção desses objetos. O array continua sendo um array JavaScript: seus índices, seu tamanho e suas referências funcionam como antes.

A declaração da interface não muda o custo do percurso. Para `n` contatos, visitar cada elemento leva O(n), além do trabalho que o corpo do loop fizer. Anotações de tipo não executam esse loop nem criam uma cópia da coleção.

A leitura desta etapa é [Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces), nos limites do guia. Depois siga para a [aula 2 — Campos opcionais e readonly](02-opcionais-e-readonly.md).

[Voltar ao guia — etapa 1](../README.md#etapa-1)
