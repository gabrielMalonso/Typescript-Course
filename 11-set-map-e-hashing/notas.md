# Notas — Set e Map em TypeScript

Use estes apoios no ponto indicado pelo guia. Hashing e colisões já foram estudados no vídeo e no livro; aqui vamos conectar as coleções à linguagem que você já usa.

## Set: guardar presença

Você já pode verificar uma permissão com um array:

```typescript
const permissoes = ["ler", "editar"];
console.log(permissoes.includes("editar")); // true
```

`includes` procura entre os elementos até encontrar o valor ou chegar ao fim. Para esse uso, queremos apenas saber se a permissão está presente. Um `Set` guarda valores sem repetição e oferece essa consulta diretamente:

```typescript
const permissoes = new Set<string>();
permissoes.add("ler");
permissoes.add("editar");
permissoes.add("ler");

console.log(permissoes.size);          // 2
console.log(permissoes.has("editar")); // true
permissoes.delete("editar");
console.log(permissoes.has("editar")); // false
```

`new Set<string>()` cria uma coleção vazia de strings. O trecho `<string>` informa ao TypeScript o tipo dos valores; não é uma comparação. Você está usando uma coleção pronta, sem precisar escrever uma classe ou um generic próprio.

O segundo `add("ler")` não acrescenta outra ocorrência. `size` conta os valores guardados; `has` responde sobre presença; `delete` remove o valor. Não há índice como `permissoes[0]`.

Também é possível construir a coleção a partir de um array. O TypeScript infere o tipo nesse caso:

```typescript
const permissoes = new Set(["ler", "editar", "ler"]);
for (const permissao of permissoes) {
  console.log(permissao); // ler, depois editar
}
```

A ordem é a de inserção, não uma ordenação alfabética. Construir essa coleção exige percorrer o array: esse trabalho também entra na análise.

Consulta: [MDN — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). [Voltar à etapa 3](README.md#etapa-3).

## Map: associar uma informação

Saber que um produto existe não informa seu preço. Para recuperar essa informação, associamos uma **chave** (o código do produto) a um **valor** (o preço). Essa é a função de um `Map`.

```typescript
const precos = new Map<string, number>();
precos.set("caderno", 18);
precos.set("caneta", 3);
precos.set("caderno", 20);

console.log(precos.size);           // 2
console.log(precos.get("caderno")); // 20
console.log(precos.has("borracha")); // false
console.log(precos.get("borracha")); // undefined
```

Em `<string, number>`, o primeiro tipo é o da chave; o segundo, o do valor. `set` associa os dois. Repetir uma chave atualiza o valor existente, sem criar outra entrada. `get` faz a busca pela chave (*lookup*, nas referências em inglês). `has` informa se ela está presente. `delete` remove uma entrada pela chave.

O resultado de `get` pode ser `undefined`, porque a chave pode estar ausente. Confira o resultado antes de usá-lo em uma conta:

```typescript
const precos = new Map<string, number>();
precos.set("caderno", 18);

const preco = precos.get("caderno");
if (preco !== undefined) {
  precos.set("caderno", preco + 2);
}
```

Dentro do `if`, o TypeScript sabe que `preco` é um número. Não precisamos forçar o tipo. Para percorrer as associações, você pode usar um callback:

```typescript
const precos = new Map<string, number>();
precos.set("caderno", 20);
precos.forEach((preco, codigo) => {
  console.log(codigo, preco); // caderno 20
});
```

No callback de `Map.forEach`, o **valor vem antes da chave**. Isso difere do segundo parâmetro de `Array.forEach`, que é um índice.

| Informação que a consulta precisa devolver | Coleção candidata |
|---|---|
| Apenas se um valor está presente | Set |
| Um dado associado à chave, como preço, índice ou quantidade | Map |
| Elemento em determinada posição de uma sequência | Array |

Uma frequência é a quantidade de ocorrências de um valor. Um conjunto de valores únicos, sozinho, não preserva essa quantidade. Na prática, você decidirá como guardar a informação necessária.

Consulta: [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). [Voltar à etapa 3](README.md#etapa-3).

## Igualdade e identidade

Você já viu que copiar uma referência não cria outro objeto. Essa distinção continua valendo nas coleções:

```typescript
const original = { codigo: 7 };
const mesmaReferencia = original;
const outroObjeto = { codigo: 7 };
console.log(original === mesmaReferencia); // true
console.log(original === outroObjeto);     // false
```

Ter campos iguais não torna dois objetos o mesmo objeto. Set compara seus valores por essa identidade; Map faz o mesmo com suas chaves. Se o problema pede unicidade pelo `codigo`, é esse contrato que deve orientar o que você guarda.

Para strings e números comuns, a comparação acompanha `===`: `"7"` e `7` são diferentes. Há um detalhe com números especiais: a regra das coleções, chamada **SameValueZero**, trata `NaN` como igual a `NaN`; `0` e `-0` também são iguais. Você não precisa implementar essa regra.

**Colisão é outra coisa:** duas chaves diferentes podem produzir a mesma posição de hash. A estrutura ainda precisa comparar as chaves para distinguir os elementos; não pode simplesmente tratar a segunda como repetida.

Consulta: [MDN — igualdade das chaves](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality). [Voltar à etapa 3](README.md#etapa-3).

## Escolher entre Array, Set, Map e Object

Uma lista de eventos pode conter o mesmo evento várias vezes; eliminar repetições mudaria a informação. Já uma coleção de permissões precisa apenas registrar quais estão presentes. Essa diferença no contrato vem antes da escolha de API. **Deduplicar** significa manter uma ocorrência de cada valor: antes de fazer isso, decida o que conta como igual e se as repetições podem ser descartadas.

| Necessidade | Ponto de partida | Consequência |
|---|---|---|
| Sequência com posições e possíveis repetições | Array | Preserva ocorrências; `includes` pode percorrer toda a sequência. |
| Valores únicos e consulta de presença (*membership*) | Set | Expressa unicidade; não preserva quantidades nem oferece acesso por índice. |
| Coleção de associações que cresce e muda | Map | Chave → valor, tamanho e iteração explícitos; aceita chaves de qualquer tipo. |
| Registro com campos conhecidos, como nome e preço de um produto | Object | Campos nomeados tornam o formato do dado claro para quem lê e para o TypeScript. |

Leia na [MDN — Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps) as linhas *Accidental Keys*, *Key Types*, *Size* e *Iteration*. As demais ficam como consulta. Um objeto comum herda propriedades: consultar uma propriedade não é necessariamente consultar um campo próprio. `Object.hasOwn` faz essa distinção quando necessária.

Chaves de propriedades de Object são strings ou symbols (identificadores especiais, sem necessidade de aprofundá-los agora); uma chave numérica vira string. Map distingue `4` de `"4"` e pode usar a identidade de um objeto como chave. Para registrar campos fixos, não é preciso substituir todo objeto por Map. Para associações dinâmicas, seus métodos costumam expressar melhor a intenção.

Set e Map percorrem entradas na ordem de inserção. Atualizar o valor de uma chave existente no Map não muda sua posição. Ambos oferecem `clear()` para esvaziar a coleção e `delete(...)` devolve se havia uma entrada a remover. Em Map, use `set`/`get`, não `map[chave]`: propriedades do objeto Map não são entradas da coleção.

Uma frequência é uma quantidade associada a um valor: presença sozinha não distingue uma ocorrência de várias. Nos problemas, decidir o que guardar e como atualizar é parte da sua solução. Considere também legibilidade e se a coleção será a fonte dos dados ou uma cópia auxiliar que precisará acompanhar alterações.

[Voltar à etapa 4](README.md#etapa-4).

## Custo das coleções no JavaScript

Considere um array de `n` códigos e várias consultas. Uma busca pode examinar todos os `n` valores. Uma tabela hash tenta reduzir essa procura ao grupo indicado pela chave. Se quase tudo cair no mesmo grupo, boa parte da busca continua necessária.

Para as análises deste capítulo, adotaremos **operações O(1) esperadas**, supondo hashing com boa distribuição, quantidade de posições acompanhando a quantidade de elementos e custo constante de calcular/comparar as chaves. “Esperado” descreve a média sob esse modelo; não promete que toda operação isolada levará tempo constante.

Na tabela com encadeamento do livro, a busca pode chegar a Θ(n) quando todas as chaves colidem. Quando a coleção precisa crescer e reorganizar o armazenamento, uma inserção também pode custar mais que as outras. Esse custo pode ser diluído entre muitas inserções: a ideia de custo **amortizado**, que será aprofundada depois.

Há uma distinção entre esse modelo e o contrato da linguagem. A especificação de JavaScript exige acesso **sublinear em média** — crescimento menor que linear —, mas não exige uma tabela hash específica nem garante O(1). Portanto, escreva “tempo esperado, supondo operações de coleção O(1)” quando essa for a hipótese da sua solução. [ECMAScript — Map e Set](https://tc39.es/ecma262/multipage/keyed-collections.html).

Conte também a construção da coleção, os percursos completos e a memória. Se guardar `u` valores distintos de tamanho fixo, a coleção ocupa O(u) espaço no modelo usado aqui. Uma consulta rápida não torna gratuito construir toda a estrutura para usá-la uma única vez.

Nas atividades com inteiros limitados ou letras de `a` a `z`, vamos considerar constante o custo de uma chave. Se uma chave for uma string de comprimento variável, calcular seu hash ou compará-la pode exigir percorrer caracteres; o tamanho da chave também precisa ser considerado.

[Voltar à etapa 4](README.md#etapa-4).
