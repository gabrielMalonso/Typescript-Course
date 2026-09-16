# Notas — Set e Map em TypeScript

Use estes apoios no ponto indicado pelo guia. Hashing e colisões são apresentados no vídeo e no livro; aqui vamos conectar as coleções à linguagem que você já usa.

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

## Custo das coleções no JavaScript

Considere um array de `n` códigos e várias consultas. Uma busca pode examinar todos os `n` valores. Uma tabela hash tenta reduzir essa procura ao grupo indicado pela chave. Se quase tudo cair no mesmo grupo, boa parte da busca continua necessária.

Para as análises deste capítulo, adotaremos **operações O(1) esperadas**, supondo hashing com boa distribuição, quantidade de posições acompanhando a quantidade de elementos e custo constante de calcular/comparar as chaves. “Esperado” descreve a média sob esse modelo; não promete que toda operação isolada levará tempo constante.

Na tabela com encadeamento do livro, a busca pode chegar a Θ(n) quando todas as chaves colidem. Quando a coleção precisa crescer e reorganizar o armazenamento, uma inserção também pode custar mais que as outras. Esse custo pode ser diluído entre muitas inserções: a ideia de custo **amortizado**, que será aprofundada depois.

Há uma distinção entre esse modelo e o contrato da linguagem. A especificação de JavaScript exige acesso **sublinear em média** — crescimento menor que linear —, mas não exige uma tabela hash específica nem garante O(1). Portanto, escreva “tempo esperado, supondo operações de coleção O(1)” quando essa for a hipótese da sua solução. [ECMAScript — Map e Set](https://tc39.es/ecma262/multipage/keyed-collections.html).

Conte também a construção da coleção, os percursos completos e a memória. Se guardar `u` valores distintos de tamanho fixo, a coleção ocupa O(u) espaço no modelo usado aqui. Uma consulta rápida não torna gratuito construir toda a estrutura para usá-la uma única vez.

Nas atividades com inteiros limitados ou letras de `a` a `z`, vamos considerar constante o custo de uma chave. Se uma chave for uma string de comprimento variável, calcular seu hash ou compará-la pode exigir percorrer caracteres; o tamanho da chave também precisa ser considerado.

[Voltar à etapa 4](README.md#etapa-4).
