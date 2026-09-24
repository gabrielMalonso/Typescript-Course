# Pilha: a ação mais recente primeiro

Imagine um editor: você escreveu um título, mudou uma cor e moveu uma imagem. Ao desfazer, espera reverter primeiro o movimento da imagem. A ação mais recente ainda não desfeita precisa sair antes das anteriores.

Um array já guarda os valores. Falta estabelecer a regra de acesso: **inserir e retirar somente pela mesma extremidade**, chamada topo. Essa estrutura é uma **pilha**, ou *stack*. A regra é **LIFO — last in, first out**, último a entrar, primeiro a sair.

## O que muda em relação ao array?

No array, você pode remover uma posição qualquer. Na pilha, a operação de retirada não recebe índice nem valor: o próximo elemento já está determinado pelo topo. Podemos consultar o topo sem retirá-lo, operação chamada `peek`.

| Operação | Pilha, da base ao topo | Retorno da retirada |
|---|---|---|
| Empilhar 10 | `[10]` | — |
| Empilhar 20 | `[10, 20]` | — |
| Empilhar 30 | `[10, 20, 30]` | — |
| Desempilhar | `[10, 20]` | `30` |
| Empilhar 40 | `[10, 20, 40]` | — |
| Desempilhar | `[10, 20]` | `40` |

Perceba que não estamos ordenando números: o próximo a sair depende da **ordem de entrada**, não do maior valor. Valores repetidos também são permitidos.

## Implementar com o que você já conhece

Vamos criar uma pilha de números. O contrato será: retirar ou consultar uma pilha vazia devolve `undefined`. Zero e números negativos continuam sendo dados válidos.

```typescript
function criarPilha() {
  const itens: number[] = [];

  function empilhar(valor: number): void {
    itens.push(valor);
  }

  function desempilhar(): number | undefined {
    return itens.pop();
  }

  function topo(): number | undefined {
    return itens[itens.length - 1];
  }

  function tamanho(): number {
    return itens.length;
  }

  function estaVazia(): boolean {
    return itens.length === 0;
  }

  return { empilhar, desempilhar, topo, tamanho, estaVazia };
}

const pilha = criarPilha();
pilha.empilhar(10);
pilha.empilhar(0);
console.log(pilha.topo());         // 0: consultar não remove
console.log(pilha.tamanho());      // 2
console.log(pilha.desempilhar());  // 0
console.log(pilha.desempilhar());  // 10
console.log(pilha.desempilhar());  // undefined
console.log(pilha.estaVazia());    // true
```

Leia `number | undefined` como “um número ou ausência”. É só a notação necessária para deixar o contrato visível; estudaremos combinações de tipos no capítulo 17.

`criarPilha` devolve um objeto com funções. Elas continuam acessando `itens` depois que a criação termina: é a closure vista no capítulo 08. Cada chamada de `criarPilha()` cria seu próprio array. O TypeScript infere o formato do objeto retornado.

Por que não devolver `itens` junto? Porque o código de fora poderia chamar `shift`, ordenar ou apagar uma posição intermediária. Ao expor apenas as operações, fazemos a regra da estrutura aparecer no uso. Não é preciso uma classe para isso.

**A propriedade que mantemos:** os itens ocupam o array na ordem de inserção, e o topo é a última posição. Empilhar acrescenta um topo; desempilhar remove esse topo e revela o anterior. Essa propriedade, preservada por cada operação, é um *invariante*.

## Vazio não é o mesmo que zero

Se você testar `if (valor)` depois de retirar, um `0` será tratado como ausência. A verificação correta para este contrato é `valor !== undefined`. Também não use `-1` como sentinela: ele pode ser um número válido da pilha.

O CLRS escolhe erro de *underflow* para a retirada no vazio. Aqui escolhemos `undefined`, como `pop()` em JavaScript. Ambas as escolhas precisam ser conhecidas por quem usa a estrutura. Como nossa pilha só aceita números, `undefined` não se confunde com um item armazenado.

## O que `push` e `pop` escondem?

Usaremos o modelo de array dinâmico do capítulo 12: acesso por índice e retirada no fim custam O(1); inserir no fim custa O(1) amortizado, pois uma expansão ocasional pode copiar os elementos. Esse modelo é útil para análise, mas a especificação de JavaScript não fixa esses tempos para todo motor e situação.

| Operação | Custo no modelo adotado |
|---|---|
| Empilhar | O(1) amortizado; O(n) quando há expansão |
| Desempilhar ou consultar topo | O(1) |
| Consultar tamanho ou vazio | O(1) |
| Guardar n números | O(n) espaço para os elementos |

`pop()` remove a última entrada do array; isso não obriga o motor a devolver imediatamente toda capacidade alocada ao sistema. Espaço lógico e memória física não são a mesma medida.

## Quando a pilha ajuda?

Ela ajuda quando o último trabalho pendente precisa ser resolvido primeiro: desfazer ações ou acompanhar aberturas de parênteses que ainda esperam fechamento. Guardar o nome de uma ação, sozinho, não implementa um editor completo; seria necessário guardar informação suficiente para revertê-la.

Uma fila de atendimento por chegada exige outra regra. Se você usar esta pilha, quem chegou por último passará na frente.

**Próximo passo:** faça a [atividade 1](../03-pratica/atividades.md#atividade-1) e retorne ao [guia, etapa 3](../README.md#etapa-3).
