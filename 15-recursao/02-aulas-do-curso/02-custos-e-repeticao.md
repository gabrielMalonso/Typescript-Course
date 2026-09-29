# Tempo, profundidade e trabalho repetido

## O loop também resolve

Compare com a soma da aula anterior, usando o mesmo contrato para `n`:

```ts
function somarIterativo(n: number): number {
  let total = 0;

  for (let atual = 1; atual <= n; atual++) {
    total += atual;
  }

  return total;
}

console.log(somarIterativo(4)); // 10
```

As duas versões fazem uma quantidade linear de trabalho. A recursiva chama com `n`, `n - 1`, até `0`: são `n + 1` chamadas e `n` adições. A iterativa faz `n` iterações. No modelo em que operações com `number` custam tempo constante, ambas têm tempo Θ(n).

A memória é diferente. O loop reaproveita poucas variáveis. A recursiva mantém as chamadas anteriores esperando.

| Versão da soma | Tempo | Espaço auxiliar | Onde guarda o estado |
|---|---|---|---|
| Iterativa | Θ(n) | Θ(1) | variáveis do loop |
| Recursiva | Θ(n) | Θ(n) | pilha de chamadas |

Espaço auxiliar inclui a pilha, mesmo sem um `new Array`. Aqui, a saída é apenas um número. Para esse percurso simples, o loop é uma escolha prática: mantém a mesma ideia com menos memória.

## Término matemático e limite de execução

Uma função pode ter um caminho correto até o caso base e ainda exceder a pilha antes de chegar lá. Em JavaScript, o erro pode aparecer como `RangeError: Maximum call stack size exceeded` ou `InternalError: too much recursion`, dependendo do runtime.

Não existe uma profundidade segura universal: ela depende do ambiente e da função. Não use um número encontrado em um teste como contrato portátil. Também não conte com o runtime para transformar automaticamente sua recursão em loop; nesta aula, cada chamada ativa entra na análise do espaço.

Para um array muito grande que só precisa ser percorrido, um loop evita esse crescimento da pilha. Na busca binária recursiva, o intervalo poderia cair pela metade, limitando a profundidade a O(log n); a versão iterativa do capítulo 14 já faz a busca com O(1) de espaço auxiliar. Recursão não reduz o custo por si só.

## Duas chamadas podem repetir a mesma tarefa

A sequência de Fibonacci começa com `F(0) = 0`, `F(1) = 1`; depois, cada termo soma os dois anteriores. Veja uma tradução direta da definição. **Use somente inteiros pequenos, de 0 a 10, neste experimento.**

```ts
function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(5)); // 5
```

O `n <= 1` é um caso base dentro do contrato de inteiros não negativos; não torna negativos entradas válidas.

```text
F(5)
├─ F(4)
│  ├─ F(3)
│  │  ├─ F(2)
│  │  └─ F(1)
│  └─ F(2)
└─ F(3)         ← este subproblema já apareceu
   ├─ F(2)
   └─ F(1)
```

O desenho abre apenas parte das chamadas: cada `F(2)` ainda chama `F(1)` e `F(0)`. A implementação não lembra que já calculou `F(3)`. Ela refaz o trabalho.

No JavaScript síncrono desse exemplo, as duas chamadas não executam simultaneamente: `fibonacci(n - 1)` termina antes de começar `fibonacci(n - 2)`. Ainda assim, os dois ramos contam para o tempo total.

Para observar esse custo, acrescente um contador fora da função e incremente-o na primeira linha dela. Zere antes de cada execução. Contando inclusive os casos base, `F(5)` faz **15 chamadas**, `F(6)` faz **25** e `F(10)` faz **177**. O valor retornado e a quantidade de chamadas são medidas diferentes.

## Trabalho total não é profundidade

O total cresce exponencialmente: O(2ⁿ) é um limite superior simples para esta versão de Fibonacci. Isso não quer dizer que ela faça exatamente `2ⁿ` chamadas. Não precisamos de uma fórmula mais precisa agora para reconhecer o problema do trabalho repetido.

A pilha guarda apenas o caminho em execução e os quadros que esperam seu retorno. O caminho mais profundo tem tamanho proporcional a `n`: o espaço auxiliar é Θ(n), e não exponencial. Ramos já concluídos não ficam todos empilhados.

Uma árvore de chamadas ajuda a contar **todas** as tarefas. Uma fotografia da pilha mostra **somente as chamadas ativas naquele momento**.

## Evitar a repetição com estado suficiente

Para calcular só o termo `n`, basta guardar os dois valores anteriores:

```ts
function fibonacciIterativo(n: number): number {
  let anterior = 0;
  let atual = 1;

  for (let passo = 0; passo < n; passo++) {
    const proximo = anterior + atual;
    anterior = atual;
    atual = proximo;
  }

  return anterior;
}

console.log(fibonacciIterativo(0)); // 0
console.log(fibonacciIterativo(5)); // 5
console.log(fibonacciIterativo(10)); // 55
```

Agora há Θ(n) de tempo e Θ(1) de espaço auxiliar no mesmo modelo de operações numéricas. Valores grandes também encontram limites de precisão de `number`; melhorar o algoritmo não resolve a representação numérica.

Outra possibilidade seria guardar respostas e reutilizá-las, por exemplo em um `Map`. Essa ideia é chamada memoização e será desenvolvida posteriormente, junto de programação dinâmica. Por enquanto, reconheça a causa do custo e a alternativa simples.

Recursão passa a ser mais interessante quando o próprio problema se divide naturalmente. No merge sort, precisamos resolver **as duas metades**, mas elas contêm partes distintas da entrada. Vamos voltar à ordenação com esse modelo.

[Voltar ao guia — etapa 3](../README.md#etapa-3)
