# Recursos — Funções, callbacks e closures

Os materiais abaixo são complementares. A aula do capítulo continua sendo a fonte principal, porque usa apenas a sintaxe já estudada.

## Documentação oficial prioritária

### 1. TypeScript Handbook — More on Functions

https://www.typescriptlang.org/docs/handbook/2/functions.html

Leia somente estas seções por enquanto:

- **Function Type Expressions**: contratos como `(valor: number) => boolean`;
- **Optional Parameters**: parâmetro opcional e valor padrão;
- **Optional Parameters in Callbacks**: por que `?` no contrato de um callback tem significado específico;
- **Rest Parameters and Arguments**: argumentos reunidos em array;
- **Assignability of Functions** e **Return Type `void`**: compatibilidade e uso de callbacks `void`.

As seções de generics, overloads e demais recursos avançados podem ficar para capítulos futuros.

### 2. MDN — Functions

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

Use para revisar a parte JavaScript que existe por baixo dos tipos:

- declaração e expressão de função;
- arrow functions;
- parâmetros padrão;
- rest parameters;
- funções como valores;
- função que retorna outra função.

A MDN mostra JavaScript. Ao adaptar um exemplo para o curso, mantenha os contratos TypeScript explícitos quando eles ajudarem a leitura.

### 3. MDN — Closures

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

Concentre-se no modelo mental: uma função mantém acesso ao ambiente léxico em que foi criada. Para cada exemplo, marque a função externa, a interna e o valor preservado.

Alguns exemplos da página usam estruturas ainda não estudadas. Não é necessário reproduzi-los; basta compreender a relação entre função e ambiente.

### 4. MDN — IIFE

https://developer.mozilla.org/en-US/docs/Glossary/IIFE

Leitura curta para reconhecer a forma `(() => { ... })()`. Neste capítulo, o objetivo é identificar quais parênteses agrupam a função e quais fazem a chamada imediata — não adotar IIFE como padrão.

### 5. TypeScript Playground

https://www.typescriptlang.org/play

Use para experiências pequenas com contratos. O Playground ajuda a observar erros de tipo, mas não substitui compilar e executar o arquivo que será entregue no repositório.

## Rota curta de revisão — 25 minutos

### 1. Contrato e referência — 5 minutos

Revise **Function Type Expressions** no Handbook e escreva o tipo destas quatro expressões sem executar o código:

```typescript
function dobro(valor: number): number {
  return valor * 2;
}

dobro
dobro(3)
const operacao = dobro
operacao(4)
```

### 2. Opcional, padrão e rest — 5 minutos

Compare no Handbook e na aula:

```typescript
codigo?: number
prefixo = "INFO"
...valores: number[]
```

Para cada um, diga o tipo dentro da função, como os argumentos chegam e qual regra de posição se aplica.

### 3. Dois callbacks — 5 minutos

Escreva, sem implementar a controladora:

```typescript
criterio: (item: { valor: number }) => boolean
registrar: (item: { valor: number }, aprovado: boolean) => void
```

Marque qual retorno deve ser reutilizado e qual callback existe pelo efeito.

### 4. Closure — 5 minutos

Leia o início da página de closures e explique este fluxo:

```typescript
const minimo70 = criarCriterio(70);
const aprovado = minimo70(85);
```

Identifique o que cada variável guarda e quando o valor `70` é reutilizado.

### 5. Teste de borda — 5 minutos

Escolha uma função do capítulo e execute pelo menos:

- caso normal;
- array vazio ou zero chamadas;
- valor exatamente no limite;
- valor fora da regra;
- comprovação de que a entrada original não mudou, quando aplicável.

## Ponte para o próximo capítulo

Continue fazendo os percursos manualmente neste capítulo. Métodos de array oferecem formas prontas para várias dessas operações, mas serão estudados no capítulo 09; antecipá-los agora esconderia justamente o fluxo de callback que você precisa consolidar.

