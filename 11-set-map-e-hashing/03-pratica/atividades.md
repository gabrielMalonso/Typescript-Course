# Prática — Set, Map e hashing

Resolva na ordem do [guia](../README.md). Crie suas entregas em `03-pratica/solucoes/` quando começar; preserve as tentativas anteriores do capítulo 10. Pode enviar entregas parciais. Não é necessário um relatório por exercício.

Nos problemas de implementação, teste exemplos e limites relevantes ao contrato. Explique brevemente a ideia e o custo de tempo e espaço; comentários no código ou conversa bastam. Quando usar o modelo de hashing, declare a hipótese de custo esperado. Consulta à documentação é permitida; tente antes de buscar pistas ou soluções prontas.

## Concluído — fundamentos já estudados

O exercício 1 já foi entregue e concluído. O enunciado original permanece para consulta, sem repetição exigida.

### 1. Desenhar a distribuição

**Fonte:** CLRS, 3ª edição em inglês, [**11.2-2, p. 261 — abrir enunciado**](../01-leituras-do-livro/clrs-11.2-exercicios.pdf#page=1). Faça somente essa questão; os demais exercícios da página não integram esta atividade.

Represente a distribuição das chaves do exercício nas nove posições. No livro, `k mod 9` corresponde a `k % 9` em TypeScript para os inteiros positivos dessa questão.

**Adaptação:** desenhe cada posição com seu grupo de chaves, inserindo a nova chave no início do grupo. Isso representa o encadeamento pedido sem implementar listas ligadas nem ponteiros. Sinalize onde houve colisão. Em uma frase, explique por que uma distribuição muito concentrada aumenta o trabalho de busca.

[Voltar à etapa 2](../README.md#etapa-2).

## Continuação essencial — na ordem do guia

### 2. Experimentar as coleções

**Prática própria:** faça cada experimento depois da respectiva aula. Preveja a saída, execute e comente somente o que surpreender. Não precisa entregar um relatório de métodos.

### Experimento de Set

```typescript
const primeiro = { codigo: 4 };
const segundo = { codigo: 4 };
const itens = new Set([primeiro, segundo, primeiro]);
console.log(itens.size);
console.log(itens.has({ codigo: 4 }));

const numeros = new Set([NaN, NaN, 0, -0]);
console.log(numeros.size);
```

Num Set de permissões, experimente conceder duas vezes a mesma permissão, revogá-la e percorrer o que restou. Confira o tamanho e esvazie a coleção. O objetivo é observar mudanças de estado, não registrar cada chamada.

[Voltar à etapa 3](../README.md#etapa-3), para Contains Duplicate. O experimento de Map fica para depois.

### Experimento de Map

```typescript
const locais = new Map<number, string>();
locais.set(4, "A");
locais.set(4, "B");
console.log(locais.get(4));
console.log(locais.size);
console.log(locais.get(9));
```

Experimente remover uma chave, consultar novamente e percorrer as associações. Explique apenas alguma diferença entre a previsão e o resultado.

[Voltar à etapa 4](../README.md#etapa-4).

### 3. Contains Duplicate

**Fonte:** [LeetCode 217 — enunciado](https://leetcode.com/problems/contains-duplicate/description/). Revisão da tentativa do capítulo 10.

O contrato permanece: receber inteiros e informar se existe valor repetido. Leia também os limites no original. Crie uma nova tentativa com o repertório atual, sem modificar aquela entrega.

Compare o tempo e a memória das duas versões e mostre um teste com todos os valores distintos e outro com repetição. Não é necessário refazer a análise inteira do capítulo anterior.

[Voltar à etapa 3](../README.md#etapa-3).

### 4. Investigar uma consulta

**Prática própria de debugging:** distinguir um resultado válido de uma chave ausente.

O código abaixo contém um erro intencional. A função deveria informar se existe um registro para o código recebido, qualquer que seja a quantidade registrada.

```typescript
function temRegistro(estoque: Map<string, number>, codigo: string): boolean {
  return Boolean(estoque.get(codigo));
}
```

Formule uma hipótese, encontre uma entrada que exponha a falha e corrija a função. Entregue um teste que falhe antes e passe depois, além de um caso com chave ausente. Uma frase sobre a causa basta.

[Voltar à etapa 4](../README.md#etapa-4).

### 5. Two Sum

**Fonte:** [LeetCode 1 — enunciado](https://leetcode.com/problems/two-sum/description/). Revisão da tentativa do capítulo 10, preservando a garantia de uma única solução.

Devolva os dois índices pedidos sem reutilizar o mesmo elemento. Tente reduzir o custo da versão anterior. Guarde a nova tentativa separadamente e justifique a mudança de tempo e memória.

Teste também valores iguais em posições distintas e explique brevemente por que seu código não reutiliza um elemento.

[Voltar à etapa 4](../README.md#etapa-4).

### 6. Valid Anagram

**Fonte:** [LeetCode 242 — enunciado](https://leetcode.com/problems/valid-anagram/description/).

Um anagrama usa as mesmas letras, com as mesmas quantidades, possivelmente em outra ordem. Implemente a verificação pedida. Valem somente letras inglesas minúsculas de `a` a `z`, conforme o problema; deixe o follow-up sobre Unicode para depois.

Tente uma solução sem ordenar as strings. Essa é a restrição adicional do curso para explorar o conteúdo deste capítulo. Teste também palavras com as mesmas letras distintas, mas quantidades diferentes. Explique o custo considerando os comprimentos das duas entradas.

[Voltar à etapa 4](../README.md#etapa-4).

## Consolidação — se precisar ou quiser retomar

### 7. Find All Numbers Disappeared in an Array

**Fonte:** [LeetCode 448 — enunciado](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/).

Retome o problema que você relatou ter tentado: em um array de tamanho `n`, com valores de `1` a `n`, devolver os números desse intervalo que não aparecem. Use a experiência anterior para buscar uma melhoria; se enviar o código antigo, podemos compará-lo concretamente.

Neste capítulo, memória auxiliar é permitida. O follow-up do original que pede espaço extra constante não é exigido. Não modifique a entrada. Analise separadamente o espaço auxiliar e o da resposta.

[Voltar ao fechamento](../README.md#etapa-6).

## Desafio — opcional

### 8. First Unique Character in a String

**Fonte:** [LeetCode 387 — enunciado](https://leetcode.com/problems/first-unique-character-in-a-string/description/).

Devolva o índice do primeiro caractere que ocorre uma única vez, ou `-1` se ele não existir. Mantenha o alfabeto `a` a `z` do original. Escolha sua representação e explique por que o resultado corresponde ao primeiro índice válido, não apenas a algum caractere único.

[Voltar ao fechamento](../README.md#etapa-6).


## Aplicação essencial — depois da comparação de representações

### 9. Empréstimos em memória

**Problema autoral de software:** cada livro tem código único e título; há um único exemplar por código. O programa recebe empréstimos e devoluções. Deve recusar empréstimo de livro inexistente ou já emprestado, e devolução de livro que não está emprestado. Consulte quem está com um livro e preserve o histórico dos eventos aceitos, na ordem em que ocorreram. A mesma pessoa pode retirar o mesmo livro novamente após devolvê-lo.

Implemente com funções e dados em memória, escolhendo as representações. Sem interface, classes ou banco. Mostre um ciclo empréstimo → devolução → novo empréstimo e uma recusa. Explique uma escolha de estrutura e o custo da consulta de quem está com o livro. Não é preciso usar todas as coleções nem produzir um relatório.

[Voltar à etapa 5](../README.md#etapa-5).
