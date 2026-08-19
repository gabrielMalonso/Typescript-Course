# Aula 01 — O que são funções

## 1. O problema que uma função resolve

Imagine que um programa precisa calcular a duração total de várias sessões:

```typescript
const totalDaManha = 35 + 25;
const totalDaTarde = 40 + 20;
const totalDaNoite = 30 + 15;
```

A regra é sempre a mesma: somar duas durações. Uma função dá um nome a essa regra:

```typescript
function calcularTotal(primeiraDuracao: number, segundaDuracao: number): number {
  return primeiraDuracao + segundaDuracao;
}

const totalDaManha = calcularTotal(35, 25);
const totalDaTarde = calcularTotal(40, 20);
const totalDaNoite = calcularTotal(30, 15);
```

A função concentra a regra em um lugar, reduz repetição e permite testar a mesma lógica com entradas diferentes.

## 2. Definir não é executar

Este código apenas define uma função:

```typescript
function exibirInicio(): void {
  console.log("Início do estudo");
}
```

Nada é exibido até ocorrer uma chamada:

```typescript
exibirInicio();
```

```text
definição → guarda a regra
chamada   → executa a regra
```

Os parênteses fazem diferença:

```typescript
const acao = exibirInicio; // guarda a função
const resultado = exibirInicio(); // executa e guarda o retorno
```

Como `exibirInicio` é `void`, `resultado` representa a ausência de um valor útil.

## 3. Parâmetros e argumentos

Parâmetros são os nomes usados na definição. Argumentos são os valores enviados na chamada.

```typescript
function multiplicar(valor: number, fator: number): number {
  return valor * fator;
}

const dobro = multiplicar(12, 2);
```

| Papel | Neste exemplo |
|---|---|
| Parâmetros | `valor`, `fator` |
| Argumentos | `12`, `2` |
| Retorno | `24` |

Durante a chamada, `valor` recebe `12` e `fator` recebe `2`.

## 4. O contrato de tipos

```typescript
function calcularMedia(total: number, quantidade: number): number {
  return total / quantidade;
}
```

O contrato pode ser lido assim:

```text
recebe: number e number
devolve: number
```

O TypeScript usa esse contrato para rejeitar chamadas incompatíveis:

```typescript
calcularMedia(80, 4);
// calcularMedia("80", 4); // erro: string não é number
```

Também verifica o retorno declarado:

```typescript
function criarEtiqueta(codigo: number): string {
  return `ITEM-${codigo}`;
}
```

O tipo do retorno não descreve o que a função pretende devolver; ele precisa corresponder ao que todos os caminhos realmente devolvem.

## 5. `return` encerra a função

Quando uma função encontra `return`, ela termina imediatamente:

```typescript
function classificarTemperatura(temperatura: number): string {
  if (temperatura < 10) {
    return "frio";
  }

  if (temperatura > 30) {
    return "quente";
  }

  return "ameno";
}
```

Se a primeira condição for verdadeira, as linhas posteriores não são executadas. Esse padrão evita aninhamento desnecessário.

## 6. Retornar não é exibir

Estas funções têm responsabilidades diferentes:

```typescript
function calcularDobro(valor: number): number {
  return valor * 2;
}

function exibirDobro(valor: number): void {
  console.log(valor * 2);
}
```

`calcularDobro` entrega um valor que pode ser reutilizado:

```typescript
const resultado = calcularDobro(9);
const total = resultado + 5;
```

`exibirDobro` produz um efeito no terminal, mas não entrega o dobro para outro cálculo.

Uma regra prática:

- use retorno quando outra parte do programa precisa do resultado;
- use `void` quando a tarefa principal é provocar um efeito, como exibir uma mensagem.

## 7. Escopo local

Parâmetros e variáveis criadas dentro da função pertencem ao seu escopo:

```typescript
function calcularArea(largura: number, altura: number): number {
  const area = largura * altura;
  return area;
}

console.log(calcularArea(5, 3));
// console.log(area); // erro: area não existe aqui fora
```

Cada chamada cria novos valores locais. Isso impede que detalhes internos vazem para o restante do programa.

## 8. Três formas de definir

### Declaração de função

```typescript
function somar(a: number, b: number): number {
  return a + b;
}
```

É a forma clássica.

Uma característica importante é o **hoisting**. Você pode fazer:

```ts
const resultado = somar(10, 20);

function somar(a: number, b: number): number {
  return a + b;
}
```

E funciona.

Mentalmente:

```text
somar(10, 20)
      ↓
function somar(...)
```

O JavaScript disponibiliza essa declaração antes de chegar fisicamente nela no arquivo. Esse comportamento vale para **declarações de função**; expressões e arrows guardadas com `const` não podem ser chamadas antes da inicialização da constante.

Para funções principais do programa, essa forma é muito boa:

```ts
function calcularTotal() {}
function carregarUsuario() {}
function salvarPedido() {}
function enviarEmail() {}
```

### Expressão de função

Aqui você cria uma função e coloca essa função dentro de uma variável:

```typescript
const subtrair = function (a: number, b: number): number {
  return a - b;
};
```

Olhe a estrutura:

```text
const subtrair = function (...) { ... };
      ↑              ↑
   variável        função
```

É conceitualmente semelhante a fazer:

```ts
const idade = 30;
const nome = "Gabriel";
const subtrair = function (a: number, b: number): number {
  return a - b;
};
```

A variável `subtrair` guarda uma **função como valor**.

Por isso o nome **expressão de função**: a função aparece como uma expressão cujo valor está sendo atribuído a alguma coisa.

E você também pode passar uma função diretamente:

```ts
setTimeout(function () {
  console.log("Olá");
}, 1000);
```

Nesse exemplo, a função entregue a `setTimeout` é um **callback**. Por enquanto, basta reconhecer que a função está sendo usada como valor; callbacks serão estudados com calma no Capítulo 08.

### Arrow function

Arrow function é uma sintaxe mais moderna:

```typescript
const multiplicar = (a: number, b: number): number => {
  return a * b;
};
```

Visualmente, compare:

```ts
const multiplicar = function (a: number, b: number) {
  return a * b;
};
```

com:

```ts
const multiplicar = (a: number, b: number) => {
  return a * b;
};
```

Sim: **para um exemplo simples desses, parece que só trocaram `function` por `=>`.**

E funcionalmente, nesse exemplo:

```ts
multiplicar(5, 10);
```

o resultado será exatamente o mesmo.

Mas arrow functions têm algumas características próprias. Neste capítulo, a principal é a sintaxe curta; diferenças envolvendo `this` ficam para um momento posterior.

---

#### A vantagem mais óbvia da arrow: sintaxe curta

Esta:

```ts
const multiplicar = (a: number, b: number) => {
  return a * b;
};
```

pode virar:

```ts
const multiplicar = (a: number, b: number) => a * b;
```

Quando existe apenas uma expressão, você pode eliminar:

```text
{ }
return
```

Então:

```ts
const dobro = (numero: number) => numero * 2;
```

é equivalente a:

```ts
const dobro = function (numero: number) {
  return numero * 2;
};
```

Isso aparece **o tempo inteiro** em TypeScript/JavaScript moderno.

#### O jeito mais útil de enxergar as três

```text
DECLARAÇÃO

function calcular() {}
         │
         └── função nomeada diretamente
```

```text
EXPRESSÃO

const calcular = function () {};
      │              │
      └── variável   └── função
```

```text
ARROW

const calcular = () => {};
      ↑          └───────┘
 identificador   arrow function
 da constante
```

As três podem representar o mesmo tipo de contrato. Neste capítulo, prefira declaração para funções principais nomeadas e arrow functions curtas quando guardar a função em uma constante tornar a intenção clara.

## 9. Funções são valores

Uma função pode ser guardada sem ser executada:

```typescript
function converterParaMinutos(horas: number): number {
  return horas * 60;
}

const conversor = converterParaMinutos;

console.log(conversor(2)); // 120
console.log(conversor === converterParaMinutos); // true
```

Não foi criada uma nova regra. `conversor` e `converterParaMinutos` apontam para a mesma função.

O tipo pode ser escrito explicitamente:

```typescript
const operacao: (a: number, b: number) => number = somar;
```

Leia da esquerda para a direita: `operacao` recebe uma função com dois `number` e retorno `number`.

## 10. Decompor uma tarefa

Uma função útil costuma ter uma responsabilidade clara:

```typescript
function somarDuracoes(duracoes: number[]): number {
  let total = 0;

  for (const duracao of duracoes) {
    total += duracao;
  }

  return total;
}

function criarResumo(total: number): string {
  return `Tempo total: ${total} minutos`;
}

const total = somarDuracoes([25, 30, 20]);
console.log(criarResumo(total));
```

A primeira função calcula; a segunda formata. Essa separação torna cada regra mais fácil de entender e testar.

## Resumo

- Definir uma função não a executa.
- Parâmetros pertencem à definição; argumentos pertencem à chamada.
- Tipos descrevem entradas e saída.
- `return` entrega um valor e encerra a execução da função.
- `void` representa uma função sem retorno útil.
- Parâmetros e variáveis internas têm escopo local.
- Uma função pode ser guardada em outra variável sem ser chamada.
