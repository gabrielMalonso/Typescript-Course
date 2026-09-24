# Fila: ordem de chegada, índices e memória

Três pedidos chegam: A, B e C. O atendimento deve começar por A. Se usarmos `push` e `pop`, C sairá primeiro. Precisamos inserir no fim e retirar no início: essa é a **fila**, ou *queue*, com regra **FIFO — first in, first out**, primeiro a entrar, primeiro a sair.

Enfileirar (*enqueue*) acrescenta um item ao fim. Desenfileirar (*dequeue*) retira o mais antigo ainda pendente. Consultar a frente (*peek* ou *front*) não remove nada. Uma fila aceita repetições e não escolhe por prioridade.

## A primeira versão funciona

```typescript
const pedidos: string[] = [];
pedidos.push("A");
pedidos.push("B");
pedidos.push("C");
console.log(pedidos.shift()); // A
console.log(pedidos);         // ["B", "C"]
```

`shift()` altera o array e devolve o primeiro valor, ou `undefined` se estiver vazio. Para uma fila pequena, essa pode ser uma escolha suficiente. Mas precisamos incluir seu trabalho na análise.

No modelo de array com reposicionamento dos elementos, tirar A faz B passar do índice 1 para 0 e C de 2 para 1. Uma retirada com n itens custa O(n). Esvaziar uma fila inicialmente com n itens repete esse trabalho: aproximadamente `(n - 1) + (n - 2) + ... + 1`, total O(n²). Um único `while` pode esconder trabalho quadrático.

Esse é o modelo de custo que adotaremos, não uma promessa sobre cada chamada em todo motor JavaScript: implementações podem otimizar arrays comuns. A API especifica o comportamento, não uma garantia geral de complexidade.

## Mover o início, não os elementos

Se A já foi atendido, basta lembrar que o próximo item está no índice 1. A posição antiga pode continuar no array por enquanto.

```text
Entrada A, B, C:       [ A, B, C ]   inicio = 0   pendentes = 3
Retirada retorna A:    [ A, B, C ]   inicio = 1   pendentes = 2
Entrada D:            [ A, B, C, D ] inicio = 1   pendentes = 3
Retirada retorna B:   [ A, B, C, D ] inicio = 2   pendentes = 2
                            ↑
                         próxima saída: C
```

Os índices menores que `inicio` são o prefixo consumido. Os pendentes ficam de `inicio` até `itens.length - 1`. Logo:

- quantidade pendente: `itens.length - inicio`;
- fila vazia: `inicio === itens.length`;
- próximo item: `itens[inicio]`.

O invariante é `0 <= inicio <= itens.length`, com os pendentes preservados na ordem de chegada. Não podemos avançar `inicio` ao retirar de uma fila vazia: isso quebraria essa propriedade.

## O custo que sobrou: retenção

Avançar um índice não apaga o prefixo. Se o array receber um milhão de entradas ao longo do tempo, ele poderá manter um milhão de posições mesmo com poucas pendentes. Com strings grandes ou objetos, posições antigas também podem manter valores alcançáveis que já não são necessários à fila.

Precisamos distinguir **sair da fila lógica** de **deixar de ser referenciado pelo armazenamento**. A coleta de lixo não adivinha que não pretendemos usar uma posição antiga.

Uma solução simples é copiar somente os pendentes para um novo array de vez em quando: **compactar**. Fazer isso a cada retirada repetiria o problema de custo. Vamos compactar apenas quando o prefixo consumido ocupar pelo menos metade do array.

## Uma fila completa de strings

Execute este bloco inteiro. O contrato de vazio é `undefined`; a string vazia `""` continua sendo um item válido.

```typescript
function criarFila() {
  let itens: string[] = [];
  let inicio = 0;

  function enfileirar(valor: string): void {
    itens.push(valor);
  }

  function desenfileirar(): string | undefined {
    if (inicio === itens.length) {
      return undefined;
    }

    const valor = itens[inicio];
    inicio++;

    if (inicio === itens.length) {
      itens = [];
      inicio = 0;
    } else if (inicio * 2 >= itens.length) {
      itens = itens.slice(inicio);
      inicio = 0;
    }

    return valor;
  }

  function frente(): string | undefined {
    return itens[inicio];
  }

  function tamanho(): number {
    return itens.length - inicio;
  }

  function estaVazia(): boolean {
    return inicio === itens.length;
  }

  return { enfileirar, desenfileirar, frente, tamanho, estaVazia };
}

const fila = criarFila();
fila.enfileirar("A");
fila.enfileirar("B");
fila.enfileirar("C");
console.log(fila.desenfileirar()); // A
fila.enfileirar("D");
console.log(fila.desenfileirar()); // B: ocorre compactação
console.log(fila.frente());       // C: não remove
console.log(fila.tamanho());      // 2
console.log(fila.desenfileirar()); // C
console.log(fila.desenfileirar()); // D: reinicia o armazenamento
console.log(fila.desenfileirar()); // undefined
fila.enfileirar("");
console.log(fila.desenfileirar() === ""); // true
console.log(fila.estaVazia());            // true
```

Usamos `let itens` porque a compactação substitui o array. As funções retornadas compartilham as variáveis da mesma closure. O array permanece interno, impedindo que o código consumidor altere sua ordem ou desalinhe o índice.

O `slice(inicio)` cria um novo array com os pendentes. Depois, o início volta a 0 porque a primeira posição desse novo array já é a frente. Esquecer esse ajuste faria a próxima retirada pular itens.

Quando a fila esvazia, substituímos o array e reiniciamos o índice. Quando ela não esvazia, a condição da metade permite recuperar espaço mesmo durante uso contínuo. Isso deixa o array antigo disponível para coleta quando não houver outras referências; não determina quando o coletor executará nem quando a memória física será devolvida.

## Como uma cópia linear pode compensar?

No exemplo, após retirar A e B temos duas posições consumidas e duas pendentes. Copiamos C e D uma vez. Houve duas retiradas desde o início para pagar essa cópia de dois elementos.

Em geral, no momento de compactar, a quantidade copiada é **no máximo a quantidade consumida desde a última compactação**. Podemos distribuir o custo da cópia entre essas retiradas. Após a cópia, reiniciamos a contagem; não cobramos as mesmas retiradas novamente.

Isso é custo **amortizado**: uma garantia sobre o total de uma sequência no modelo adotado, sem supor entradas aleatórias. Não significa que cada chamada seja rápida nem que seja uma média probabilística.

| Operação | Custo no modelo de array dinâmico |
|---|---|
| Enfileirar | O(1) amortizado, com possível expansão O(n) |
| Desenfileirar sem compactar | O(1) |
| Desenfileirar com cópia de k pendentes | O(k) nessa chamada |
| Desenfileirar ao longo da sequência | O(1) amortizado |
| Frente, tamanho e vazio | O(1) |

Assim, inserir n itens e retirar os n custa O(n) no total, incluindo expansões e compactações, em vez do O(n²) do modelo com `shift` repetido.

Após cada operação, se há q pendentes, o comprimento do array é menor que `2 * q`, ou é zero quando vazio. Por quê? Se o prefixo atingiu a metade, acabamos de compactar; se ainda não atingiu, há mais pendentes que consumidos. O armazenamento lógico é O(q + 1). Durante uma compactação, os dois arrays coexistem, com O(q) posições adicionais para a cópia. Isso descreve posições e referências; o tamanho dos textos, a capacidade reservada pelo motor e o atraso da coleta também influenciam a memória real.

## E a fila circular do livro?

O CLRS usa um array de tamanho fixo: ao atingir o fim, os índices voltam ao começo e reaproveitam posições. Nesse modelo, as operações não precisam copiar elementos e custam O(1), mas é necessário distinguir vazio de cheio. A implementação apresentada reserva uma posição para essa distinção.

Nossa versão cresce com `push` e às vezes copia com `slice`. É a mesma regra FIFO, com outra representação e outros custos por chamada. Não seria correto pegar o O(1) por operação do livro e atribuí-lo sem ressalvas à nossa compactação.

## Escolher a regra antes da estrutura

| Necessidade | Regra útil |
|---|---|
| Reverter a última ação pendente | Pilha, LIFO |
| Atender pedidos pela chegada | Fila, FIFO |
| Perguntar se um valor já apareceu | Set |
| Encontrar uma informação por chave | Map |

Esta fila é local e em memória. Ela não fornece persistência, processamento paralelo ou garantia de entrega. Esses problemas aparecerão depois; por enquanto, queremos representar corretamente a ordem de trabalho.

**Próximo passo:** experimente a [atividade 2](../03-pratica/atividades.md#atividade-2) e volte ao [guia, etapa 4](../README.md#etapa-4).
