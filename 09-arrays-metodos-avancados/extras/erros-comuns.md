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

## Checklist de diagnóstico

- [ ] Escolhi o método pela intenção e pelo retorno?
- [ ] Minha callback devolve o tipo esperado?
- [ ] Usei `return` quando abri chaves?
- [ ] Tratei `undefined` ou `-1`?
- [ ] Considerei array vazio em `every` e `reduce`?
- [ ] Sei o valor intermediário do encadeamento?
- [ ] Confirmei se o original deve permanecer intacto?
