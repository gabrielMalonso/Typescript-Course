# Mini-Projeto: Organizador de Fila de Estudos

## Objetivo

Construir uma fila simples que registra atividades de estudo, recebe prioridades, corrige um item e remove atividades das duas extremidades.

O projeto foi desenhado para ser feito antes de você concluir a prática de loops. Não use `for`, `while` nem métodos do Capítulo 06: o foco é acompanhar diretamente as mudanças do array.

## Conceitos aplicados

- array tipado com `string[]`;
- lista ordenada;
- índice zero-based;
- leitura e alteração de elementos;
- propriedade `length`;
- `push`, `pop`, `shift` e `unshift`;
- valor retornado pelas remoções;
- mutação de um array declarado com `const`.

## Requisitos obrigatórios

Crie `exercicios/fila-estudos.ts`.

### 1. Estado inicial

Declare exatamente este array:

```typescript
const filaDeEstudos: string[] = [
  "Revisar capítulo 4",
  "Estudar arrays",
  "Anotar dúvidas",
];
```

### 2. Operações

Execute, nesta ordem:

1. exiba o título `=== FILA DE ESTUDOS ===`;
2. exiba a quantidade inicial;
3. adicione `"Resolver tarefa urgente"` ao início;
4. adicione `"Fazer desafio rápido"` ao fim;
5. altere o item de índice `1` para `"Concluir prática do capítulo 4"`;
6. remova o primeiro item com `shift` e guarde o retorno em `proximaAtividade`;
7. remova o último item com `pop` e guarde o retorno em `atividadeAdiada`;
8. exiba os dois valores removidos;
9. exiba os três itens restantes acessando explicitamente os índices `0`, `1` e `2`;
10. exiba a quantidade final.

### 3. Restrições

- Não use loops.
- Não crie uma variável separada para cada atividade inicial.
- Não reatribua `filaDeEstudos` a outro array.
- Não use métodos que ainda não foram apresentados.
- Mantenha o tipo `string[]` explícito na declaração.

Essas restrições existem para tornar claro qual conceito está sendo praticado.

## Saída obrigatória

```text
=== FILA DE ESTUDOS ===
Quantidade inicial: 3
Próxima atividade: Resolver tarefa urgente
Atividade adiada: Fazer desafio rápido
Item 1: Concluir prática do capítulo 4
Item 2: Estudar arrays
Item 3: Anotar dúvidas
Quantidade final: 3
```

## Passo 1: declarar e inspecionar a fila

```typescript
const filaDeEstudos: string[] = [
  "Revisar capítulo 4",
  "Estudar arrays",
  "Anotar dúvidas",
];

console.log("=== FILA DE ESTUDOS ===");
console.log(`Quantidade inicial: ${filaDeEstudos.length}`);
```

O array tem três elementos e índices válidos de `0` a `2`.

```text
índice 0 → Revisar capítulo 4
índice 1 → Estudar arrays
índice 2 → Anotar dúvidas
```

## Passo 2: adicionar prioridades

```typescript
filaDeEstudos.unshift("Resolver tarefa urgente");
filaDeEstudos.push("Fazer desafio rápido");
```

Estado resultante:

```text
índice 0 → Resolver tarefa urgente
índice 1 → Revisar capítulo 4
índice 2 → Estudar arrays
índice 3 → Anotar dúvidas
índice 4 → Fazer desafio rápido
```

`unshift` moveu os índices antigos. Por isso, `"Revisar capítulo 4"` agora está no índice `1`.

## Passo 3: tornar a atividade mais específica

```typescript
filaDeEstudos[1] = "Concluir prática do capítulo 4";
```

A quantidade não muda. O elemento do índice `1` apenas recebe um novo texto.

## Passo 4: retirar as extremidades

```typescript
const proximaAtividade = filaDeEstudos.shift();
const atividadeAdiada = filaDeEstudos.pop();
```

As operações fazem duas coisas ao mesmo tempo:

- modificam `filaDeEstudos`;
- devolvem o elemento removido para a nova constante.

Depois delas, a fila contém:

```text
índice 0 → Concluir prática do capítulo 4
índice 1 → Estudar arrays
índice 2 → Anotar dúvidas
```

## Passo 5: exibir o resultado

```typescript
console.log(`Próxima atividade: ${proximaAtividade}`);
console.log(`Atividade adiada: ${atividadeAdiada}`);
console.log(`Item 1: ${filaDeEstudos[0]}`);
console.log(`Item 2: ${filaDeEstudos[1]}`);
console.log(`Item 3: ${filaDeEstudos[2]}`);
console.log(`Quantidade final: ${filaDeEstudos.length}`);
```

Os rótulos humanos começam em `Item 1`, mas os índices usados pelo código começam em `0`.

## Código final completo

Tente montar o projeto somente pelos requisitos antes de consultar este bloco.

```typescript
const filaDeEstudos: string[] = [
  "Revisar capítulo 4",
  "Estudar arrays",
  "Anotar dúvidas",
];

console.log("=== FILA DE ESTUDOS ===");
console.log(`Quantidade inicial: ${filaDeEstudos.length}`);

filaDeEstudos.unshift("Resolver tarefa urgente");
filaDeEstudos.push("Fazer desafio rápido");
filaDeEstudos[1] = "Concluir prática do capítulo 4";

const proximaAtividade = filaDeEstudos.shift();
const atividadeAdiada = filaDeEstudos.pop();

console.log(`Próxima atividade: ${proximaAtividade}`);
console.log(`Atividade adiada: ${atividadeAdiada}`);
console.log(`Item 1: ${filaDeEstudos[0]}`);
console.log(`Item 2: ${filaDeEstudos[1]}`);
console.log(`Item 3: ${filaDeEstudos[2]}`);
console.log(`Quantidade final: ${filaDeEstudos.length}`);
```

## Como testar

### Teste 1: configuração obrigatória

Execute sem mudanças. A saída deve corresponder ao bloco obrigatório e a quantidade final deve ser `3`.

### Teste 2: acompanhe os tamanhos

Sem alterar a lógica final, adicione temporariamente um `console.log(filaDeEstudos.length)` depois de cada operação.

Previsão:

```text
inicial: 3
depois de unshift: 4
depois de push: 5
depois da alteração do índice: 5
depois de shift: 4
depois de pop: 3
```

### Teste 3: acompanhe o índice zero

Exiba temporariamente `filaDeEstudos[0]`:

- depois de `unshift`;
- depois de alterar o índice `1`;
- depois de `shift`.

Os valores devem ser, respectivamente, `"Resolver tarefa urgente"`, `"Resolver tarefa urgente"` e `"Concluir prática do capítulo 4"`.

## Perguntas de conferência

1. Por que o texto original do índice `0` passou para o índice `1` após `unshift`?
2. Por que alterar `filaDeEstudos[1]` não mudou o `length`?
3. Qual é a diferença entre o retorno de `shift` e o array que permanece?
4. Por que `filaDeEstudos` pode ser modificado mesmo sendo declarado com `const`?
5. Qual seria o último índice válido se a fila terminasse com quatro elementos?

## Desafio rápido do mini-projeto

Faça uma segunda versão em `exercicios/fila-estudos-desafio.ts`, ainda sem loops.

### Estado inicial obrigatório

```typescript
const fila: string[] = ["Teoria", "Sintaxe"];
const espelhoDaFila = fila;
```

### Operações obrigatórias

1. adicione `"Exemplos"` ao fim usando `espelhoDaFila`;
2. altere o índice `0` para `"Fundamentos"` usando `fila`;
3. exiba `fila` e `espelhoDaFila`;
4. exiba se os dois `length` são iguais usando `===`.

### Previsão obrigatória

Antes de executar, responda em comentário:

- Quantos arrays foram criados: um ou dois?
- As duas saídas terão conteúdo igual ou diferente?
- Por que uma alteração feita por um nome aparece quando usamos o outro?

### Saída conceitual esperada

As duas variáveis devem mostrar `"Fundamentos"`, `"Sintaxe"` e `"Exemplos"`, e a comparação dos tamanhos deve resultar em `true`. A formatação exata usada pelo terminal não faz parte do desafio.

## Expansão opcional

Depois de concluir a prática do Capítulo 04, exiba os itens restantes com um `for`. Essa expansão é uma conexão entre os capítulos, não um requisito para finalizar este mini-projeto.
