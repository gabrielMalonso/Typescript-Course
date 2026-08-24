# Aula 01 — Funções que recebem funções

## 1. Antes do callback: o contrato completo

Uma função não é descrita apenas pelo tipo que retorna. Seu contrato inclui:

```text
NOME + PARÂMETROS + TIPOS DE ENTRADA + TIPO DE RETORNO
```

```typescript
function calcularArea(largura: number, altura: number): number {
  return largura * altura;
}
```

O valor `calcularArea` possui o tipo:

```typescript
(largura: number, altura: number) => number
```

Já `calcularArea(4, 3)` é a chamada e produz um `number`.

```text
calcularArea          → função → (number, number) => number
calcularArea(4, 3)    → retorno da chamada → number
```

Essa distinção é a base de callbacks.

## 2. Funções são valores

Como já visto no Capítulo 06, uma função pode ser guardada sem ser executada:

```typescript
const somar = (a: number, b: number): number => a + b;
const operacao = somar;

console.log(operacao(8, 2)); // 10
```

Não há parênteses em `const operacao = somar`. A referência da função foi copiada. Os parênteses aparecem depois, quando `operacao(8, 2)` a executa.

## 3. Funções anônimas

Uma função anônima não possui nome próprio na sua definição:

```typescript
const dobrar = function (valor: number): number {
  return valor * 2;
};
```

A função é anônima, embora a variável `dobrar` dê um nome pelo qual podemos alcançá-la.

Arrow functions também são frequentemente anônimas:

```typescript
const triplicar = (valor: number): number => valor * 3;
```

Elas são úteis como argumentos quando a regra é curta e usada naquele lugar:

```typescript
executarCalculo(5, (valor: number): number => valor * 3);
```

## 4. Uma função pode receber outra

Veja uma função que recebe um número e uma regra:

```typescript
function executarCalculo(
  valor: number,
  calcular: (entrada: number) => number,
): number {
  return calcular(valor);
}
```

O segundo parâmetro não é um `number`. Ele precisa ser uma função que:

1. recebe um `number`;
2. retorna um `number`.

```text
calcular: (entrada: number) => number
          └──── entrada ────┘  └retorno┘
```

A chamada pode entregar uma função já existente:

```typescript
function dobrar(valor: number): number {
  return valor * 2;
}

const resultado = executarCalculo(7, dobrar);
```

O fluxo é:

```text
executarCalculo(7, dobrar)
         │         │
         │         └── função entregue, ainda sem executar
         ↓
calcular(valor)
         │
         └── agora dobrar(7) é executada
         ↓
        14
```

## 5. O que é um callback

Callback é uma função passada para outra função, que decide quando e com quais argumentos chamá-la.

```typescript
function anunciar(
  mensagem: string,
  exibir: (texto: string) => void,
): void {
  exibir(`Aviso: ${mensagem}`);
}

anunciar("inspeção concluída", (texto: string): void => {
  console.log(texto);
});
```

### 5.1 O parâmetro descreve o contrato; o argumento traz a implementação

É comum olhar para a declaração de `exibir` e pensar: “onde está o corpo dessa função? O que ela faz?”. A resposta é que esse trecho não contém uma implementação. Ele descreve o **contrato** que o argumento deverá cumprir.

#### 1. O que está escrito na função `anunciar`

```typescript
function anunciar(
  mensagem: string,
  exibir: (texto: string) => void, // contrato do segundo parâmetro
): void {
  exibir(`Aviso: ${mensagem}`);
}
```

Esta parte:

```typescript
exibir: (texto: string) => void
```

**não cria nem implementa uma função chamada `exibir`.**

Ela declara um parâmetro chamado `exibir` e informa qual tipo de valor pode ocupá-lo:

```text
exibir: (texto: string) => void
│       └──────────┬──────────┘
│                  │
│          tipo exigido:
│          função que recebe string
│          e retorna void
│
└── parâmetro
```

Em outras palavras, `anunciar` estabelece a seguinte exigência:

> “Entregue-me uma função que aceite um texto e não devolva nenhum valor. Eu decidirei quando chamá-la e qual texto entregar.”

Nesse ponto, `anunciar` conhece o **formato** da função que receberá, mas não conhece seu corpo nem o que ela fará.

#### 2. Onde aparece a função concreta

A implementação chega como segundo argumento na chamada:

```typescript
anunciar(
  "inspeção concluída",
  (texto: string): void => {
    console.log(texto);
  },
);
```

Nessa chamada, dois valores são entregues:

1. a string `"inspeção concluída"` ocupa o parâmetro `mensagem`;
2. a função anônima ocupa o parâmetro `exibir`.

A função anônima é o **callback concreto**. Seu corpo contém a implementação que faltava na declaração do parâmetro:

```typescript
(texto: string): void => {
  console.log(texto);
}
```

O encaixe entre parâmetros e argumentos fica assim:

```text
PARÂMETROS                         ARGUMENTOS

mensagem: string          ←       "inspeção concluída"

exibir:                    ←       (texto: string): void => {
  (texto: string) => void            console.log(texto);
                                   }
```

Durante essa execução, podemos pensar conceitualmente:

```text
mensagem = "inspeção concluída"

exibir = função recebida
         (texto) => console.log(texto)
```

A função agora está guardada no parâmetro `exibir`, mas **ainda não foi executada**. Até aqui, ela apenas foi entregue.

#### 3. O fluxo real, passo a passo

Quando o programa executa a chamada de `anunciar`, acontece o seguinte:

1. `anunciar` começa a executar;
2. `mensagem` recebe `"inspeção concluída"`;
3. `exibir` recebe a função anônima que contém `console.log(texto)`;
4. a execução entra no corpo de `anunciar` e chega a:

```typescript
exibir(`Aviso: ${mensagem}`);
```

5. a template literal produz `"Aviso: inspeção concluída"`;
6. `exibir(...)` chama o callback recebido com esse texto;
7. o parâmetro `texto` do callback recebe a string;
8. o corpo do callback executa `console.log(texto)`.

O resultado no console é:

```text
Aviso: inspeção concluída
```

Visualmente, o fluxo completo é:

```text
1. callback é criado
        ↓
(texto) => console.log(texto)

2. callback é passado para anunciar
        ↓
      exibir

3. anunciar chama exibir(...)
        ↓
exibir("Aviso: inspeção concluída")

4. o callback recebido é executado
        ↓
console.log("Aviso: inspeção concluída")
```

Repare que `console.log` **não está no corpo de `anunciar`**. Ele pertence ao callback recebido. `anunciar` decide **quando** chamar e **qual texto** entregar; o callback decide **o que fazer** com esse texto.

#### 4. Os papéis de cada parte

| Parte | O que é | Papel |
|---|---|---|
| `anunciar` | função controladora | decide quando chamar e qual argumento entregar |
| `exibir` | parâmetro cujo tipo é função | recebe e guarda o callback durante a execução |
| `(texto) => console.log(texto)` | função entregue como argumento | é o callback concreto e define o que fazer |
| `exibir(...)` | chamada dentro de `anunciar` | é o ponto em que o callback é executado |

#### 5. Passar não é chamar

Considere esta função compatível com o contrato esperado:

```typescript
function mostrar(texto: string): void {
  console.log(texto);
}
```

Há uma diferença essencial entre escrever seu nome com e sem parênteses:

```typescript
anunciar("ok", mostrar);   // passa a própria função
anunciar("ok", mostrar("agora")); // erro: executa agora e tenta passar o retorno void
```

- `mostrar` representa a própria função como um valor. Ela pode ser entregue e chamada depois.
- `mostrar("agora")` executa a função imediatamente e representa o valor retornado pela chamada.

Como `mostrar("agora")` retorna `void`, a segunda forma tenta entregar `void` onde `anunciar` exige uma função. Por isso ela não satisfaz o contrato.

#### Resumo

- `exibir: (texto: string) => void` descreve apenas o **tipo** do parâmetro;
- a implementação chega na chamada, por meio da função entregue como argumento;
- `anunciar` não precisa conhecer o corpo do callback;
- `anunciar` controla **quando chamar** e **qual argumento entregar**;
- o callback controla **o que fazer quando for chamado**.

> **A assinatura do callback descreve o formato da função que será recebida; ela não descreve sua implementação. A implementação chega como argumento na chamada.**

## 6. O retorno do callback importa

Um callback pode produzir um valor que a função controladora reutiliza:

```typescript
function aplicarTaxa(
  valor: number,
  calcularTaxa: (base: number) => number,
): number {
  const taxa = calcularTaxa(valor);
  return valor + taxa;
}
```

```typescript
const total = aplicarTaxa(100, (base: number): number => base * 0.1);
console.log(total); // 110
```

O `return` do callback retorna para `aplicarTaxa`, não diretamente para o restante do programa:

```text
callback retorna 10
        ↓
aplicarTaxa recebe 10 e calcula 100 + 10
        ↓
aplicarTaxa retorna 110
```

## 7. Callback com objeto

O argumento do callback pode ser um objeto completo:

```typescript
function avaliarEquipamento(
  equipamento: { nome: string; temperatura: number },
  regra: (item: { nome: string; temperatura: number }) => boolean,
): boolean {
  return regra(equipamento);
}
```

```typescript
const estaQuente = avaliarEquipamento(
  { nome: "Forno", temperatura: 180 },
  (item): boolean => item.temperatura > 100,
);
```

O nome `item` é local ao callback. O que precisa coincidir é o contrato: forma do objeto recebido e tipo devolvido.

## 8. Callback com array de objetos — sem métodos avançados

Podemos criar nossa própria função controladora e usar `for...of`:

```typescript
function contarEquipamentos(
  equipamentos: { nome: string; ativo: boolean }[],
  atende: (item: { nome: string; ativo: boolean }) => boolean,
): number {
  let quantidade = 0;

  for (const equipamento of equipamentos) {
    if (atende(equipamento)) {
      quantidade += 1;
    }
  }

  return quantidade;
}
```

A função controla o percurso. O callback controla a decisão:

```typescript
const ativos = contarEquipamentos(
  [
    { nome: "Bomba", ativo: true },
    { nome: "Motor", ativo: false },
  ],
  (item): boolean => item.ativo,
);
```

```text
contarEquipamentos → decide QUANDO percorrer e contar
callback            → decide QUAL condição um item deve cumprir
```

Esse modelo prepara o Capítulo 09 sem usar seus métodos antes da hora.

## 9. Parâmetro opcional e valor padrão não são iguais

Parâmetro opcional pode não receber argumento:

```typescript
function criarEtiqueta(nome: string, codigo?: string): string {
  return codigo === undefined ? nome : `${codigo} - ${nome}`;
}
```

Dentro da função, `codigo` é `string | undefined`.

Valor padrão também permite omitir o argumento, mas substitui a ausência:

```typescript
function criarSaudacao(nome: string, prefixo = "Olá"): string {
  return `${prefixo}, ${nome}!`;
}
```

Dentro da função, `prefixo` é `string`.

```text
opcional `codigo?`       → pode continuar undefined
default `prefixo = ...`  → recebe um valor quando omitido
```

## 10. Rest parameters: quantidade variável de argumentos

Um rest parameter reúne os argumentos restantes em um array:

```typescript
function somarTudo(...valores: number[]): number {
  let total = 0;

  for (const valor of valores) {
    total += valor;
  }

  return total;
}

somarTudo(2, 4, 6); // valores será [2, 4, 6]
```

O `...` fica no último parâmetro. Aqui ele coleta argumentos; não é o spread de objetos visto no capítulo anterior.

## 11. Closure: uma função lembra do ambiente

Uma função interna pode continuar acessando valores da função externa mesmo depois que a externa terminou:

```typescript
function criarMultiplicador(fator: number): (valor: number) => number {
  return (valor: number): number => valor * fator;
}

const triplicar = criarMultiplicador(3);
console.log(triplicar(4)); // 12
```

`criarMultiplicador(3)` terminou, mas a função retornada preserva acesso a `fator`.

```text
criarMultiplicador(3)
        ↓
função retornada fecha sobre fator = 3
        ↓
triplicar(4) → 4 × 3 → 12
```

Isso é uma closure. Nesta introdução, basta reconhecer três peças:

1. função externa;
2. variável preservada;
3. função interna que usa essa variável depois.

## 12. Extra: IIFE

IIFE é uma função criada e executada imediatamente:

```typescript
const configuracao = (function (): { modo: string } {
  const modo = "seguro";
  return { modo };
})();
```

Os últimos `()` fazem a chamada imediata.

```text
(function () { ... })  → função como expressão
                      () → execução imediata
```

IIFEs eram muito usadas para criar isolamento antes dos módulos modernos. Hoje são menos comuns. Saiba ler; não precisa usá-las por reflexo.

## 13. Checklist de leitura

Ao encontrar um callback, pergunte:

1. Qual função recebe outra função?
2. Qual parâmetro representa o callback?
3. Qual é o contrato completo desse callback?
4. Onde ele é chamado?
5. Quais argumentos recebe nessa chamada?
6. O retorno é ignorado ou reutilizado?
7. Existe algum valor externo preservado por closure?
