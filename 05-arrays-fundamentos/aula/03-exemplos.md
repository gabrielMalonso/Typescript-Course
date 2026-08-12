# Arrays — Exemplos Práticos

Os exemplos desta aula não dependem de loops. Execute cada bloco separadamente e acompanhe o array após cada alteração.

## Exemplo 1: Leituras de sensores

### Contexto

Três sensores registraram temperaturas em uma bancada de testes. A ordem representa a sequência das medições.

### Código

```typescript
const temperaturas: number[] = [22.4, 24.1, 23.7];

const primeiraMedicao = temperaturas[0];
const ultimaMedicao = temperaturas[temperaturas.length - 1];

console.log(`Quantidade: ${temperaturas.length}`);
console.log(`Primeira: ${primeiraMedicao} °C`);
console.log(`Última: ${ultimaMedicao} °C`);
```

### Saída esperada

```text
Quantidade: 3
Primeira: 22.4 °C
Última: 23.7 °C
```

### Explicação

- `number[]` aceita apenas números;
- `temperaturas[0]` acessa o primeiro elemento;
- `temperaturas.length - 1` calcula o último índice válido;
- nenhuma leitura altera o array.

### Experimento

Adicione uma quarta temperatura ao literal. O cálculo do último índice deve continuar correto sem mudar a expressão.

## Exemplo 2: Correção de uma etapa

### Contexto

Uma sequência de publicação contém uma etapa escrita incorretamente.

### Código

```typescript
const etapas: string[] = ["escrever", "apagar", "publicar"];

console.log(`Antes: ${etapas[1]}`);

etapas[1] = "revisar";

console.log(`Depois: ${etapas[1]}`);
console.log(`Quantidade: ${etapas.length}`);
```

### Saída esperada

```text
Antes: apagar
Depois: revisar
Quantidade: 3
```

### Explicação

A atribuição em `etapas[1]` substitui o segundo elemento. Ela não adiciona uma nova posição, então `length` continua igual a `3`.

## Exemplo 3: Playlist com início e fim

### Contexto

Uma playlist recebe uma faixa de abertura no início e uma faixa extra no fim.

### Código

```typescript
const playlist: string[] = ["Horizonte", "Órbita"];

playlist.unshift("Abertura");
playlist.push("Encerramento");

console.log(playlist);
console.log(`Total de faixas: ${playlist.length}`);
```

### Saída esperada

```text
[ 'Abertura', 'Horizonte', 'Órbita', 'Encerramento' ]
Total de faixas: 4
```

A aparência dos colchetes e das aspas pode variar entre ambientes. O conteúdo e a ordem são o que importa aqui.

### Explicação

```text
início                        fim
  ↓                            ↓
["Abertura", "Horizonte", "Órbita", "Encerramento"]
```

`unshift` muda os índices das faixas existentes. `push` adiciona depois do último elemento.

## Exemplo 4: Fila de atendimento

### Contexto

O primeiro nome da fila é atendido, e o último cancela sua participação.

### Código

```typescript
const fila: string[] = ["Nina", "Otávio", "Pablo", "Rita"];

const pessoaAtendida = fila.shift();
const cancelamento = fila.pop();

console.log(`Atendida: ${pessoaAtendida}`);
console.log(`Cancelamento: ${cancelamento}`);
console.log(fila);
```

### Saída esperada

```text
Atendida: Nina
Cancelamento: Rita
[ 'Otávio', 'Pablo' ]
```

### Explicação

- `shift` remove e devolve o elemento inicial;
- `pop` remove e devolve o elemento final;
- a fila restante mantém a ordem relativa: Otávio continua antes de Pablo.

### Caso de limite

```typescript
const filaVazia: string[] = [];
const pessoa = filaVazia.shift();

console.log(pessoa); // undefined
console.log(filaVazia.length); // 0
```

O método não inventa um valor quando a lista está vazia.

## Exemplo 5: Ordem das operações

### Contexto

Um jogo mantém uma lista curta de missões. Vamos prever o estado depois de cada comando.

### Código

```typescript
const missoes: string[] = ["ponte", "torre"];

missoes.push("portal");
missoes.unshift("acampamento");
missoes[2] = "fortaleza";
const removida = missoes.pop();

console.log(`Removida: ${removida}`);
console.log(missoes);
console.log(`Próxima missão: ${missoes[0]}`);
```

### Rastreamento

```text
início                    ["ponte", "torre"]
push("portal")            ["ponte", "torre", "portal"]
unshift("acampamento")    ["acampamento", "ponte", "torre", "portal"]
missoes[2] = "fortaleza"  ["acampamento", "ponte", "fortaleza", "portal"]
pop()                     ["acampamento", "ponte", "fortaleza"]
```

### Saída esperada

```text
Removida: portal
[ 'acampamento', 'ponte', 'fortaleza' ]
Próxima missão: acampamento
```

O ponto central é recalcular mentalmente os índices depois de inserir no início.

## Exemplo 6: Duas variáveis, um array

### Contexto

Duas partes de um programa recebem nomes diferentes para a mesma lista de permissões.

### Código

```typescript
const permissoes: string[] = ["ler", "comentar"];
const permissoesDaTela = permissoes;

permissoesDaTela.push("editar");
permissoesDaTela[0] = "visualizar";

console.log(permissoes);
console.log(permissoesDaTela);
```

### Saída esperada

```text
[ 'visualizar', 'comentar', 'editar' ]
[ 'visualizar', 'comentar', 'editar' ]
```

### Explicação

Não foram criados dois arrays. A atribuição copiou a referência:

```text
permissoes ─────────┐
                    ├──→ um único array
permissoesDaTela ───┘
```

Essa característica é importante porque uma alteração feita por um nome fica visível pelo outro.

## Exemplo 7: Matriz como prévia

### Contexto

Uma sala pequena possui duas fileiras e duas cadeiras por fileira.

### Código

```typescript
const lugares: string[][] = [
  ["A1", "A2"],
  ["B1", "B2"],
];

console.log(lugares[0][0]); // A1
console.log(lugares[1][1]); // B2
```

### Explicação

O primeiro índice escolhe a fileira. O segundo escolhe o lugar dentro dela. Este exemplo é somente para reconhecimento; não precisa ser reproduzido no desafio.

## Desafio rápido

Crie `exercicios/desafio-rapido.ts`. Não use loops nem métodos além dos apresentados neste capítulo.

### Estado inicial obrigatório

```typescript
const ferramentas: string[] = ["chave", "alicate", "trena"];
```

### Requisitos obrigatórios

Execute as operações nesta ordem:

1. adicione `"multímetro"` ao final;
2. adicione `"luvas"` ao início;
3. substitua `"alicate"` por `"torquímetro"` usando o índice correto após as duas inclusões;
4. remova o primeiro elemento e guarde o retorno em `itemRetirado`;
5. remova o último elemento e guarde o retorno em `itemRemovidoDoFim`;
6. exiba os dois itens removidos;
7. exiba o primeiro item restante, o último item restante, o array final e seu `length`.

### Resultado final esperado

```text
Item retirado: luvas
Item removido do fim: multímetro
Primeiro item: chave
Último item: trena
[ 'chave', 'torquímetro', 'trena' ]
Quantidade: 3
```

Antes de executar, escreva em comentário o estado previsto depois de cada operação. A formatação visual do array pode variar; a ordem e os valores devem corresponder ao resultado esperado.

## Perguntas de conferência

1. Qual é o último índice válido quando `length` vale `5`?
2. Por que `array[array.length]` fica fora da lista?
3. Qual operação muda os índices antigos: `push` ou `unshift`?
4. O que `pop` retorna quando o array está vazio?
5. Por que alterar `permissoesDaTela` também alterou `permissoes`?
