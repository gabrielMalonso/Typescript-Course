# Caso base e pilha de chamadas

## Começar por uma chamada conhecida

Quando uma função chama outra, ela espera o resultado para continuar. Se `dobro(3)` retorna `6`, a expressão `1 + dobro(3)` pode finalmente virar `1 + 6`. Uma chamada recursiva segue a mesma regra. A diferença é que a função chamada é a própria função, com outros argumentos.

Vamos somar os inteiros de `1` até `n`. Com um loop, você acumularia `1`, `2`, `3` e assim por diante. Agora observe outra forma de separar a tarefa:

```text
soma de 1 até 4 = 4 + soma de 1 até 3
soma de 1 até 3 = 3 + soma de 1 até 2
soma de 1 até 2 = 2 + soma de 1 até 1
soma de 1 até 1 = 1 + soma até 0
soma até 0 = 0
```

Cada linha precisa de uma resposta menor. A última pode responder diretamente.

## Duas partes e uma garantia

Uma definição recursiva precisa de um **caso base**, resolvido sem uma nova chamada, e de um **passo recursivo**, que usa a resposta de um problema menor para construir a resposta atual.

Também precisamos garantir que as chamadas chegam ao caso base. Neste exemplo, o contrato é: **`n` é um inteiro não negativo pequeno o suficiente para a execução e para o resultado numérico**. Se `n` começa em `4` e diminui de um em um, chegará a `0`. Se começasse em `-1`, continuaria se afastando de `0`.

TypeScript representa `n` como `number`, mas isso inclui frações, negativos e valores especiais. O contrato não é automaticamente validado pelo tipo. Nos exemplos, use entradas que o atendem; validar dados externos será assunto posterior. Vamos trabalhar com valores pequenos para estudar as chamadas, sem confundir limites de números com limites da pilha.

```ts
// Contrato: n inteiro não negativo; usar valores pequenos neste experimento.
function somarAte(n: number): number {
  if (n === 0) {
    return 0;
  }

  return n + somarAte(n - 1);
}

console.log(somarAte(0)); // 0
console.log(somarAte(1)); // 1
console.log(somarAte(4)); // 10
```

O `: number` no retorno torna explícito o contrato da função recursiva. Não há sintaxe nova para recursão: é uma chamada de função comum.

## O que fica esperando?

Em `somarAte(3)`, o runtime ainda não pode somar `3` ao resultado de `somarAte(2)`. Ele guarda o ponto em que deve continuar, além dos dados daquela chamada. Esse registro é um **quadro de chamada**. Cada execução tem seu próprio parâmetro `n`: chamar com `2` não troca o `n` da chamada que recebeu `3`.

A **pilha de chamadas** organiza esses quadros. A última chamada que entrou termina primeiro, como a pilha LIFO do capítulo 13. Você não precisa criar esse array: o runtime administra a estrutura.

| Chamada | Resposta de que precisa | Resultado ao retornar |
|---|---|---|
| `somarAte(3)` | `somarAte(2)` | `3 + 3 = 6` |
| `somarAte(2)` | `somarAte(1)` | `2 + 1 = 3` |
| `somarAte(1)` | `somarAte(0)` | `1 + 0 = 1` |
| `somarAte(0)` | nenhuma | `0` |

No ponto mais profundo, há quatro chamadas dessa função ativas. O retorno começa pela última linha e sobe até a primeira.

```text
Chamadas:  3 → 2 → 1 → 0
Retornos:  6 ← 3 ← 1 ← 0
```

`return n + somarAte(n - 1)` não encerra a execução antes de calcular a chamada interna. Primeiro a expressão é resolvida; depois seu resultado é retornado.

## Ver a descida e a volta

Execute este bloco separadamente. Antes de rodar, tente prever toda a sequência dos logs.

```ts
function somarComRastro(n: number): number {
  console.log("entrou", n);

  if (n === 0) {
    console.log("base", n);
    return 0;
  }

  const parcial = somarComRastro(n - 1);
  const resultado = n + parcial;
  console.log("voltou", n, "resultado", resultado);
  return resultado;
}

console.log("total", somarComRastro(3));
```

A sequência será: `entrou 3`, `entrou 2`, `entrou 1`, `entrou 0`, `base 0`, `voltou 1 resultado 1`, `voltou 2 resultado 3`, `voltou 3 resultado 6`, `total 6`.

Também vale colocar um breakpoint na chamada recursiva, avançar para dentro dela e observar a lista de chamadas no debugger. Na volta, confira o `n` e o `parcial` de cada quadro. Logs revelam a ordem; o debugger mostra o estado que ficou guardado.

## Caso base presente, mas inalcançável

Ter um `if` não basta. Se o passo chamasse `somarAte(n)` sem mudar o argumento, a execução repetiria o mesmo estado. Se diminuísse `2` e o único caso base fosse `n === 0`, uma entrada ímpar passaria de `1` para `-1` sem parar.

Para revisar uma função recursiva, pergunte: qual é a entrada válida, qual caso responde diretamente e o que diminui em **toda** chamada recursiva? Aqui, o inteiro não negativo `n` diminui até zero. Em um array, pode ser a quantidade de elementos ainda não processados.

Faça a [atividade 1 — Somar sem copiar](../03-pratica/atividades.md#atividade-1). Depois, siga para [tempo, profundidade e repetição](02-custos-e-repeticao.md).

[Voltar ao guia — etapa 2](../README.md#etapa-2)
