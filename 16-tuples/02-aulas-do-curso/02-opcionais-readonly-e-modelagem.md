# Opcionais, readonly e escolha do formato

## Uma posição que pode faltar

Um registro simples pode conter nome, pontuação e, às vezes, uma observação. Nas propriedades de objetos você já usou `?` para marcar ausência. Uma tuple também pode ter posições opcionais:

```ts
const comObservacao: [string, number, string?] = ["Ana", 8, "revisar"];
const semObservacao: [string, number, string?] = ["Bia", 9];

const [nome, pontuacao, observacao] = semObservacao;
console.log(nome, pontuacao, observacao); // Bia 9 undefined
console.log(comObservacao.length, semObservacao.length); // 3 2
```

Nessa forma de tuple, as posições opcionais vêm depois das obrigatórias. O contrato aceita dois ou três elementos. Ao ler a terceira posição, precisamos considerar que ela pode estar ausente.

No modo estrito do curso, o tipo inferido de `observacao` aparece como `string | undefined`: pode chegar um texto ou `undefined`. Essa notação será desenvolvida no capítulo 17. Por enquanto, o `??`, conhecido desde o capítulo 03, permite definir o que usar quando faltar o valor:

```ts
function descreverRegistro(
  registro: [nome: string, pontuacao: number, observacao?: string],
): string {
  const [nome, pontuacao, observacao] = registro;
  return `${nome}: ${pontuacao} — ${observacao ?? "sem observação"}`;
}

console.log(descreverRegistro(["Ana", 8, "revisar"]));
// Ana: 8 — revisar
console.log(descreverRegistro(["Bia", 9]));
// Bia: 9 — sem observação
console.log(descreverRegistro(["Caio", 0, ""]));
// Caio: 0 —
```

Com rótulos, o `?` fica depois do nome: `observacao?: string`. Sem rótulos, fica depois do tipo: `string?`. São duas maneiras de escrever a mesma posição opcional.

O último teste mantém o texto vazio. `??` só aplica a alternativa a `null` ou `undefined`; não troca `""` por outro texto. O zero também continua sendo uma pontuação válida.

Uma posição opcional deve representar um dado que pode faltar. Ela não expressa, por si só, regras como “se houve erro, a pontuação não pode existir”. Relações entre estados exigirão outra modelagem no próximo capítulo.

## `const` mantém a referência; `readonly` restringe a escrita

Declarar `const ponto = ...` impede reatribuir a variável. Isso não impede alterar o array. Para sinalizar que uma tuple deve ser usada somente para leitura, colocamos `readonly` antes do tipo:

```ts
const ponto: readonly [x: number, y: number] = [3, 4];
const [x, y] = ponto;
console.log(x, y); // 3 4

// ponto[0] = 8; // Erro: não permite substituir uma posição.
// ponto.push(5); // Erro: push não está disponível nesse tipo.
// ponto.pop(); // Erro: pop não está disponível nesse tipo.
```

Isso também ajuda a declarar o uso esperado de um parâmetro. Se a função só lê uma coordenada, ela pode receber uma tuple de leitura:

```ts
function somarCoordenadas(ponto: readonly [x: number, y: number]): number {
  const [x, y] = ponto;
  return x + y;
}

const editavel: [number, number] = [3, 4];
const somenteLeitura: readonly [number, number] = [3, 4];

console.log(somarCoordenadas(editavel)); // 7
console.log(somarCoordenadas(somenteLeitura)); // 7

// const outraEditavel: [number, number] = somenteLeitura;
// Erro: uma referência de leitura não autoriza escrever no par.
```

A função aceita os dois valores porque precisa apenas ler. Na direção inversa, uma função que exige uma tuple mutável poderia escrever nela, então TypeScript rejeita uma referência `readonly`.

## Leitura não é congelamento nem cópia

`readonly` é uma restrição de TypeScript, verificada durante o desenvolvimento. Ele não executa `Object.freeze`, não faz uma cópia e não bloqueia alterações por outras referências mutáveis:

```ts
const original: [number, number] = [3, 4];
const leitura: readonly [number, number] = original;

original[0] = 9;
console.log(leitura[0]); // 9: as duas variáveis apontam para o mesmo array.
```

Se uma posição contém um objeto, a restrição da tuple também não se estende automaticamente às propriedades internas:

```ts
const par: readonly [usuario: { nome: string }, acessos: number] = [
  { nome: "Ana" },
  3,
];

par[0].nome = "Bia"; // A propriedade do objeto continua mutável.
console.log(par[0].nome); // Bia

// par[0] = { nome: "Caio" }; // Erro: substituir a posição é proibido.
```

Pense em `readonly` como permissão de uso daquela referência. Preservar a entrada de uma função continua exigindo atenção à implementação, especialmente quando houver objetos compartilhados.

## Escolher entre tuple, objeto e array

Uma tuple é compacta, mas a ordem participa do contrato. Um objeto permite que os nomes acompanhem os valores em todo acesso:

```ts
function repartir(total: number, tamanho: number): [grupos: number, sobra: number] {
  return [Math.floor(total / tamanho), total % tamanho];
}

function repartirComNomes(
  total: number,
  tamanho: number,
): { grupos: number; sobra: number } {
  return { grupos: Math.floor(total / tamanho), sobra: total % tamanho };
}

// Mesmo contrato numérico da aula 1: inteiros pequenos, total >= 0, tamanho > 0.
const [grupos, sobra] = repartir(17, 5);
const resultado = repartirComNomes(17, 5);
console.log(grupos, sobra); // 3 2
console.log(resultado.grupos, resultado.sobra); // 3 2
```

Ambas as versões são corretas. Qual deixa o uso mais fácil de entender depende do domínio e de quem vai ler a chamada.

| Necessidade | Escolha inicial | Motivo |
|---|---|---|
| Uma lista de notas, com tamanho variável | `number[]` | Cada elemento tem o mesmo papel. |
| Coordenada `[x, y]` com convenção clara | `readonly [x: number, y: number]` | As duas posições formam um pequeno conjunto ordenado. |
| Entrada de `Map`, no formato `[chave, valor]` | Tuple | A API já define a ordem do par. |
| Cadastro com nome, email, status e outros campos | Objeto | Os nomes ajudam na leitura e na evolução do cadastro. |

Se você precisa consultar repetidamente o que significa a posição `2`, talvez o objeto torne o modelo mais claro. Adicionar muitos opcionais a uma tuple costuma aumentar esse esforço. Rótulos ajudam no editor, mas não criam nomes de propriedades no valor.

Para os exemplos de tamanho fixo deste capítulo, criar uma tuple ou um objeto pequeno exige espaço O(1). Escolher o formato não melhora automaticamente a complexidade do algoritmo. Prefira o contrato que comunica melhor o resultado; diferenças de desempenho só justificariam outra decisão com uma necessidade e evidência concretas.

Faça a [atividade 2 — Coordenadas com uma dimensão opcional](../03-pratica/atividades.md#atividade-2), combinando leitura, ausência e retorno tipado.

[Voltar ao guia — etapa 3](../README.md#etapa-3)
