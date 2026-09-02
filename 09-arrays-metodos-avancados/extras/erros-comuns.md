# Métodos Avançados de Array — Erros Comuns

## 1. Usar `forEach` esperando um novo array

```typescript
const retorno = [1, 2, 3].forEach((numero) => numero * 2);
// retorno é void
```

`forEach` serve para executar uma ação. Para criar valores transformados, use `map`.

## 2. Esquecer `return` ao usar chaves

```typescript
const errado = [1, 2].map((numero) => {
  numero * 2;
});
// [undefined, undefined] em execução; tipo void[]
```

Corrija com retorno explícito ou sem chaves:

```typescript
const a = [1, 2].map((numero) => {
  return numero * 2;
});

const b = [1, 2].map((numero) => numero * 2);
```

## 3. Trocar `map` por `filter`

`map` pergunta “qual é o novo valor?”. `filter` pergunta “este valor permanece?”.

```typescript
const numeros = [1, 2, 3];
const dobrados = numeros.map((numero) => numero * 2);
const pares = numeros.filter((numero) => numero % 2 === 0);
```

## 4. Ignorar `undefined` de `find`

```typescript
const encontrado = [2, 4].find((numero) => numero > 10);
// number | undefined
```

Verifique antes de usar o valor como número:

```typescript
if (encontrado !== undefined) {
  console.log(encontrado.toFixed(2));
}
```

## 5. Tratar `-1` de `findIndex` como índice válido

```typescript
const nomes = ["Ana", "Bia"];
const indice = nomes.findIndex((nome) => nome === "Caio");

if (indice !== -1) {
  console.log(nomes[indice]);
}
```

Somar `1` diretamente a `-1` produz `0`, que parece uma posição humana válida e mascara a ausência.

## 6. Usar `filter(...).length` para uma pergunta booleana

```typescript
const existeNegativo = valores.filter((valor) => valor < 0).length > 0;
```

Funciona, mas cria um array que não será usado. `some` comunica melhor:

```typescript
const existeNegativo = valores.some((valor) => valor < 0);
```

## 7. Esquecer o comportamento de `every` no array vazio

```typescript
[].every((valor) => valor > 0); // true
```

Se “todos válidos” exige ao menos um item:

```typescript
const valido = valores.length > 0 && valores.every((valor) => valor > 0);
```

## 8. Omitir o valor inicial de `reduce`

Sem valor inicial, arrays vazios causam erro e o primeiro elemento assume um papel diferente. Neste capítulo, prefira sempre:

```typescript
const total = valores.reduce((acumulador, valor) => acumulador + valor, 0);
```

## 9. Não devolver o próximo acumulador

```typescript
const total = [1, 2].reduce((acumulador, valor) => {
  acumulador + valor;
}, 0);
```

Com chaves, devolva explicitamente:

```typescript
const total = [1, 2].reduce((acumulador, valor) => {
  return acumulador + valor;
}, 0);
```

## 10. Encadear sem conhecer o valor intermediário

Ao encontrar um resultado inesperado, separe:

```typescript
const filtrados = valores.filter((valor) => valor >= 0);
const transformados = filtrados.map((valor) => valor * 2);
```

Depois de validar cada etapa, você pode voltar ao encadeamento.

## 11. Pensar que spread altera ou reutiliza o mesmo array

```typescript
const original = [1, 2];
const copia = [...original];

console.log(original === copia); // false
```

O spread cria outro array, mas a cópia é superficial. Se seus elementos forem objetos, os dois arrays ainda apontarão para os mesmos objetos internos.

Para criar também objetos novos:

```typescript
const copiaDosObjetos = original.map((item) => ({ ...item }));
```

## 12. Confundir coleção e item da callback

```typescript
const produtosAtivos = produtos.filter(
  (produtos) => produtos.ativo,
);
```

O código pode funcionar, mas o parâmetro representa um único objeto. O singular deixa o papel explícito:

```typescript
const produtosAtivos = produtos.filter(
  (produto) => produto.ativo,
);
```

## 13. Consultar a coleção externa no lugar do item

```typescript
const produtosAtivos = produtos.filter(
  () => produtos[0].ativo,
);
```

Nesse caso, todos os objetos recebem a resposta baseada apenas no primeiro. Use o elemento entregue pelo método:

```typescript
const produtosAtivos = produtos.filter(
  (produto) => produto.ativo,
);
```

## 14. Devolver objeto sem parênteses na arrow concisa

```typescript
const copias = produtos.map((produto) => { ...produto });
```

As chaves são interpretadas como bloco. Para retornar um literal objeto:

```typescript
const copias = produtos.map((produto) => ({ ...produto }));
```

## 15. Tentar usar `break` ou interromper `forEach` com `return`

Nos arrays densos deste capítulo, `forEach` continua chamando a callback para os elementos seguintes. `return` encerra somente a chamada atual. Para procurar até a primeira resposta, prefira `find`, `findIndex`, `some` ou `every`, conforme o retorno necessário.

## Checklist de diagnóstico

- [ ] Escolhi o método pela intenção e pelo retorno?
- [ ] Minha callback devolve o tipo esperado?
- [ ] Usei `return` quando abri chaves?
- [ ] Tratei `undefined` ou `-1`?
- [ ] Considerei array vazio em `every` e `reduce`?
- [ ] Sei o valor intermediário do encadeamento?
- [ ] Diferenciei novo array de novos objetos?
- [ ] Usei o item recebido pela callback, não uma coleção externa?
- [ ] Escolhi um método que pode parar cedo quando a pergunta permite?
- [ ] Confirmei se o original deve permanecer intacto?
