# Métodos Avançados de Array — Teoria

## Objetivos de aprendizagem

Ao final desta aula, você será capaz de:

- reconhecer que métodos de array controlam percursos e chamam callbacks;
- ligar cada método à pergunta que ele responde;
- aplicar a mesma lógica a valores primitivos e objetos;
- prever tipo, quantidade e ausência no retorno;
- distinguir novo array, novos objetos e mutação acidental;
- reconhecer quando um método pode parar antes do fim;
- decidir quando um loop explícito continua mais claro.

## 1. Do percurso manual para o método

No Capítulo 05, o percurso era explícito:

```typescript
const temperaturas: number[] = [18, 21, 24];
const temperaturasAltas: number[] = [];

for (const temperatura of temperaturas) {
  if (temperatura > 20) {
    temperaturasAltas.push(temperatura);
  }
}
```

No Capítulo 08, você separou o percurso da regra:

```typescript
function selecionarNumeros(
  numeros: number[],
  criterio: (numero: number) => boolean,
): number[] {
  const selecionados: number[] = [];

  for (const numero of numeros) {
    if (criterio(numero)) {
      selecionados.push(numero);
    }
  }

  return selecionados;
}

const temperaturasAltas = selecionarNumeros(
  temperaturas,
  (temperatura) => temperatura > 20,
);
```

Agora o próprio array já oferece uma controladora com esse propósito:

```typescript
const temperaturasAltas = temperaturas.filter(
  (temperatura) => temperatura > 20,
);
```

O mecanismo não desapareceu. `filter` percorre o array, chama a callback e cria o resultado. O nome do método comunica a intenção sem precisarmos reescrever a controladora.

## 2. Quem é coleção e quem é item

Leia da esquerda para a direita:

```typescript
const ativos = equipamentos.filter((equipamento) => equipamento.ativo);
```

```text
equipamentos          → coleção plural
.filter               → controla o percurso
equipamento           → um item singular por chamada
equipamento.ativo     → boolean devolvido pela callback
ativos                → novo array com os aprovados
```

O método é chamado na coleção correta. A callback recebe um elemento dessa coleção. Essa distinção evita dois erros:

- usar um nome plural para o item e perder clareza;
- consultar uma coleção externa em vez do item entregue à callback.

## 3. A pergunta determina o método

| Pergunta | Método | Retorno |
|---|---|---|
| Quero executar uma ação para cada item? | `forEach` | `void` |
| Quero transformar cada item? | `map` | novo array com `N` resultados |
| Quero manter itens aprovados? | `filter` | novo array com `0..N` itens |
| Quero o primeiro item aprovado? | `find` | item ou `undefined` |
| Quero a primeira posição aprovada? | `findIndex` | índice ou `-1` |
| Quero saber se pelo menos um passa? | `some` | `boolean` |
| Quero saber se todos passam? | `every` | `boolean` |
| Quero combinar tudo em um resultado? | `reduce` | acumulador final |

Escolher pela pergunta é mais seguro que escolher pela aparência da sintaxe.

## 4. O retorno da callback muda de papel

Você já sabe que callbacks podem ter contratos diferentes. Nos métodos, o retorno da callback determina o comportamento:

```typescript
const numeros: number[] = [2, 5, 8];

numeros.forEach((numero): void => console.log(numero));
const dobrados = numeros.map((numero): number => numero * 2);
const pares = numeros.filter((numero): boolean => numero % 2 === 0);
```

```text
forEach → retorno não forma resultado; o objetivo é o efeito
map     → cada retorno vira um elemento do novo array
filter  → cada retorno decide se o elemento original permanece
```

`console.log` retorna `undefined`. Por isso, exibir dentro de `map` não substitui devolver o valor transformado.

## 5. A mesma ideia em arrays de objetos

Arrays de objetos já são conhecidos:

```typescript
const produtos: {
  nome: string;
  preco: number;
  ativo: boolean;
}[] = [
  { nome: "Broca", preco: 20, ativo: true },
  { nome: "Serra", preco: 80, ativo: false },
  { nome: "Lixa", preco: 5, ativo: true },
];
```

O método muda; a forma do objeto continua a mesma:

```typescript
const ativos = produtos.filter((produto) => produto.ativo);
// mesmo tipo dos elementos, quantidade possivelmente menor

const nomes = produtos.map((produto) => produto.nome);
// string[], mesma quantidade de produtos

const serra = produtos.find((produto) => produto.nome === "Serra");
// objeto encontrado ou undefined

const total = produtos.reduce(
  (acumulador, produto) => acumulador + produto.preco,
  0,
);
// number
```

O TypeScript infere `produto` a partir de `produtos`. Você não precisa repetir o tipo inline dentro de cada callback.

## 6. Quantidade e tipo no resultado

```text
entrada com N elementos

forEach   → nenhum array retornado
map       → novo array com N resultados; o tipo pode mudar
filter    → novo array com 0 até N elementos do tipo original
find      → um elemento original ou undefined
findIndex → um índice ou -1
some      → um boolean
every     → um boolean
reduce    → um resultado do tipo do acumulador
```

`map` pode transformar objetos em strings:

```typescript
const etiquetas: string[] = produtos.map(
  (produto) => `${produto.nome}: R$ ${produto.preco}`,
);
```

`filter` seleciona objetos, mas não altera sua forma:

```typescript
const produtosAtivos = produtos.filter((produto) => produto.ativo);
```

## 7. Métodos que podem parar antes do fim

Alguns métodos procuram apenas uma resposta suficiente:

- `find` e `findIndex` param no primeiro item aprovado;
- `some` para assim que encontra um `true`;
- `every` para assim que encontra um `false`.

`forEach`, `map`, `filter` e `reduce` percorrem todos os elementos. `return` dentro de `forEach` encerra apenas a chamada atual da callback; ele não equivale a `break`.

Essa diferença conecta os métodos aos loops estudados no Capítulo 04: a intenção determina se precisamos visitar tudo ou se uma resposta antecipada basta.

## 8. Arrays vazios e ausência

```typescript
const vazio: number[] = [];

vazio.map((numero) => numero * 2); // []
vazio.filter((numero) => numero > 0); // []
vazio.find((numero) => numero > 0); // undefined
vazio.findIndex((numero) => numero > 0); // -1
vazio.some((numero) => numero > 0); // false
vazio.every((numero) => numero > 0); // true
vazio.reduce((total, numero) => total + numero, 0); // 0
```

`every([])` é `true` porque não existe contraexemplo. Se o domínio exige pelo menos um item:

```typescript
const todosPositivos = vazio.length > 0 && vazio.every((numero) => numero > 0);
```

## 9. Novo array não significa novos objetos

`map`, `filter` e spread criam novos arrays, mas podem continuar apontando para os mesmos objetos internos:

```typescript
const copiaDoArray = [...produtos];

console.log(copiaDoArray === produtos); // false
console.log(copiaDoArray[0] === produtos[0]); // true
```

Para criar também um novo objeto para cada elemento, combine `map` com spread:

```typescript
const copiaDosObjetos = produtos.map((produto) => ({ ...produto }));

console.log(copiaDosObjetos[0] === produtos[0]); // false
```

Os parênteses em `({ ...produto })` dizem que as chaves formam um objeto retornado, não o bloco da arrow function. A cópia ainda é superficial para propriedades aninhadas.

## 10. Encadeamento como linha de produção

```typescript
const nomesAtivos = produtos
  .filter((produto) => produto.ativo)
  .map((produto) => produto.nome);
```

```text
produtos
   │ filter: produto.ativo
   ▼
array de produtos ativos
   │ map: produto.nome
   ▼
string[] com os nomes
```

A ordem importa porque cada etapa recebe o resultado da anterior. Antes de encadear, nomeie mentalmente o valor e o tipo intermediários.

## 11. `reduce`: acumulador e item têm papéis diferentes

```typescript
const totalAtivo = produtos.reduce(
  (total, produto) => {
    if (!produto.ativo) {
      return total;
    }

    return total + produto.preco;
  },
  0,
);
```

```text
total   → estado acumulado, number
produto → elemento atual, objeto
return  → próximo valor de total
0       → estado antes do primeiro produto
```

Use valor inicial explícito. Não escolha `reduce` apenas para evitar outros métodos; escolha-o quando a pergunta realmente pede combinar a coleção em um resultado.

## 12. Quando preferir um loop

Um loop explícito continua mais claro quando:

- a regra usa `break` ou `continue` naturalmente;
- várias saídas e efeitos precisam ser coordenados;
- o encadeamento esconderia estados importantes;
- você precisa depurar passo a passo o percurso.

Métodos e loops são ferramentas complementares. O melhor código deixa a intenção evidente.

## Resumo

- métodos de array são controladoras prontas que recebem callbacks;
- coleção tem nome plural; o item da callback, singular;
- cada método espera um retorno diferente da callback;
- arrays de objetos não mudam o mecanismo, apenas o tipo do item;
- `find`, `findIndex`, `some` e `every` podem encerrar cedo;
- novo array e novos objetos são duas decisões diferentes;
- `reduce` combina acumulador e elemento atual;
- encadeamento só é claro quando o intermediário também está claro.
