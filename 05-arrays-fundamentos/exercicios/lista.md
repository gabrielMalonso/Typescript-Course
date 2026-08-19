# Exercícios — Capítulo 05: Arrays — Fundamentos

## Instruções gerais

- Resolva os exercícios na ordem apresentada.
- Crie cada arquivo dentro de `exercicios/solucoes/`.
- Use apenas os conteúdos estudados até este capítulo.
- Nos 11 exercícios obrigatórios, não use loops nem métodos além de `push`, `pop`, `shift` e `unshift`.
- Use nomes descritivos em `camelCase` e ponto e vírgula.
- Antes de executar, escreva em comentário a saída ou o estado final que você prevê.
- Depois de executar, compare primeiro os valores e a ordem dos elementos. Diferenças apenas visuais na exibição do array não são erro.
- Faça os testes de limite solicitados antes de considerar o exercício concluído.
- Os 11 exercícios são obrigatórios; o bônus é opcional e deve esperar a conclusão da prática do Capítulo 04.

---

## Nível 1 — Criando e lendo arrays

### Exercício 1.1: Listas com tipos diferentes

**Arquivo:** `ex11.ts`

Declare estes três arrays com anotação de tipo explícita:

- `participantes`, um `string[]` com `"Lia"`, `"Ravi"` e `"Maya"`;
- `pontuacoes`, um `number[]` com `12`, `18` e `15`;
- `presencas`, um `boolean[]` com `true`, `false` e `true`.

Exiba o primeiro elemento de cada array e o `length` de cada um. Não crie uma variável separada para cada elemento inicial.

**Saída conceitual esperada:**

```text
Primeiro participante: Lia
Primeira pontuação: 12
Primeira presença: true
Quantidade de participantes: 3
Quantidade de pontuações: 3
Quantidade de presenças: 3
```

Ao final, escreva em uma constante `string` por que `pontuacoes.push("vinte")` seria rejeitado pelo TypeScript. Não adicione essa chamada inválida ao código executável.

### Exercício 1.2: Posição humana e índice

**Arquivo:** `ex12.ts`

Comece com:

```typescript
const etapas: string[] = ["ideia", "rascunho", "revisão", "publicação"];
```

Sem modificar o array:

1. exiba a primeira etapa usando o índice literal correto;
2. exiba a terceira etapa usando o índice literal correto;
3. crie `ultimoIndice` calculado com `length - 1`;
4. exiba a última etapa usando `ultimoIndice`;
5. exiba a quantidade de etapas.

**Saída esperada:**

```text
Primeira: ideia
Terceira: revisão
Última: publicação
Quantidade: 4
```

### Exercício 1.3: Corrigindo um elemento

**Arquivo:** `ex13.ts`

Use este estado inicial:

```typescript
const rota: string[] = ["início", "desvio", "destino"];
```

Guarde o tamanho inicial em `quantidadeAntes`. Depois substitua o elemento de índice `1` por `"ponte"` e guarde o tamanho final em `quantidadeDepois`.

Exiba o array final, as duas quantidades e o resultado da comparação `quantidadeAntes === quantidadeDepois`.

**Resultado conceitual esperado:** o array deve terminar como `['início', 'ponte', 'destino']`, e a comparação dos tamanhos deve produzir `true`.

Em um comentário, explique por que a alteração é permitida mesmo com `rota` declarada usando `const`.

### Exercício 1.4: `length` não é o último índice

**Arquivo:** `ex14.ts`

Use:

```typescript
const niveis: string[] = ["baixo", "médio", "alto"];
```

Crie:

- `quantidade`, usando `niveis.length`;
- `ultimoIndiceValido`, usando `niveis.length - 1`;
- `ultimoNivel`, acessando o array com `ultimoIndiceValido`;
- `valorForaDoArray`, acessando `niveis[niveis.length]`.

Antes de executar, preveja em comentário os quatro valores. Depois os exiba.

**Saída conceitual esperada:**

```text
Quantidade: 3
Último índice válido: 2
Último nível: alto
Fora do array: undefined
```

Finalize com uma constante `string` explicando por que o índice `3` não existe nesse array, apesar de o `length` valer `3`.

---

## Nível 2 — Alterando o início e o fim

### Exercício 2.1: Inclusões e valores de retorno

**Arquivo:** `ex21.ts`

Comece com:

```typescript
const sequencia: string[] = ["B", "C"];
```

Execute, nesta ordem:

1. adicione `"D"` ao fim com `push` e guarde o retorno em `tamanhoDepoisDoPush`;
2. adicione `"A"` ao início com `unshift` e guarde o retorno em `tamanhoDepoisDoUnshift`;
3. exiba os dois retornos, o array final e seu `length`.

**Saída conceitual esperada:**

```text
Depois do push: 3
Depois do unshift: 4
[ 'A', 'B', 'C', 'D' ]
Quantidade final: 4
```

Em comentário, responda: os retornos de `push` e `unshift` são os elementos adicionados ou o novo tamanho?

### Exercício 2.2: Remoções nas duas extremidades

**Arquivo:** `ex22.ts`

Use este array:

```typescript
const fila: string[] = ["Ana", "Breno", "Cecília", "Diego"];
```

Remova o primeiro elemento com `shift` e guarde o retorno em `primeiraPessoa`. Depois remova o último elemento com `pop` e guarde o retorno em `ultimaPessoa`.

Exiba os dois valores removidos, o array restante, seu primeiro elemento, seu último elemento calculado com `length - 1` e a quantidade final.

**Resultado conceitual esperado:** `Ana` e `Diego` são removidos; `Breno` e `Cecília` permanecem nessa ordem.

### Exercício 2.3: Removendo de um array vazio

**Arquivo:** `ex23.ts`

Declare explicitamente um array vazio:

```typescript
const notificacoes: string[] = [];
```

Depois:

1. chame `pop` e guarde o retorno em uma constante, deixando o TypeScript inferir o tipo;
2. chame `shift` e guarde o retorno em outra constante, também com tipo inferido;
3. exiba os dois retornos e o `length` final;
4. crie uma constante `string` explicando por que os retornos podem ser `undefined`.

Você verá a sintaxe completa de union types em um capítulo futuro; aqui basta observar o tipo inferido pelo editor.

**Saída esperada:**

```text
Retorno do pop: undefined
Retorno do shift: undefined
Quantidade final: 0
```

**Teste de limite:** adicione temporariamente `"aviso"` ao array antes das remoções. Preveja qual método receberá o valor e qual ainda retornará `undefined`; execute para conferir e depois restaure a versão principal.

### Exercício 2.4: Rastreamento de estado

**Arquivo:** `ex24.ts`

Comece exatamente com:

```typescript
const modulos: string[] = ["tipos", "condições"];
```

Execute estas operações na ordem:

```typescript
modulos.push("loops");
modulos.unshift("introdução");
modulos[2] = "decisões";
const moduloRemovidoDoFim = modulos.pop();
const moduloRemovidoDoInicio = modulos.shift();
```

Antes de executar, escreva em comentários o estado previsto:

- no início;
- depois do `push`;
- depois do `unshift`;
- depois da alteração do índice `2`;
- depois do `pop`;
- depois do `shift`.

Ao final, exiba os dois valores removidos, o array restante e seu `length`.

**Saída conceitual esperada:**

```text
Removido do fim: loops
Removido do início: introdução
[ 'tipos', 'decisões' ]
Quantidade: 2
```

---

## Nível 3 — Limites e modelo mental

### Exercício 3.1: Duas variáveis, um único array

**Arquivo:** `ex31.ts`

Use:

```typescript
const configuracaoPrincipal: string[] = ["som", "vídeo"];
const configuracaoDaTela = configuracaoPrincipal;
```

Depois:

1. adicione `"controles"` usando `configuracaoDaTela`;
2. altere o índice `0` para `"áudio"` usando `configuracaoPrincipal`;
3. crie `mesmaReferencia` comparando os dois nomes com `===`;
4. exiba os dois arrays e `mesmaReferencia`.

Antes de executar, responda em comentário:

- quantos arrays foram criados;
- se os conteúdos exibidos serão iguais ou diferentes;
- por que uma alteração feita por um nome aparece pelo outro.

**Resultado conceitual esperado:** os dois nomes exibem `['áudio', 'vídeo', 'controles']`, e `mesmaReferencia` vale `true`.

### Exercício 3.2: Primeiro e último com teste de limite

**Arquivo:** `ex32.ts`

Crie:

```typescript
const leituras: number[] = [18, 21, 19];
```

Use uma condição baseada em `leituras.length > 0`:

- se houver elementos, exiba o primeiro e o último usando índices;
- caso contrário, exiba `Nenhuma leitura disponível.`.

Não use `pop`, `shift` nem métodos do próximo capítulo: este exercício é somente de leitura segura.

**Teste principal esperado:**

```text
Primeira leitura: 18
Última leitura: 19
```

**Teste de limite obrigatório:** troque temporariamente o literal por `[]`. Apenas a mensagem `Nenhuma leitura disponível.` deve aparecer. Depois restaure os três valores.

### Exercício 3.3: Reconhecendo um array multidimensional

**Arquivo:** `ex33.ts`

Copie este array sem modificá-lo:

```typescript
const assentos: string[][] = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
];
```

Faça apenas operações de reconhecimento:

1. exiba `assentos.length`;
2. exiba `assentos[0].length`;
3. exiba o valor de `assentos[0][2]`;
4. exiba o valor de `assentos[1][0]`;
5. escreva em uma constante `string` o significado do primeiro e do segundo índice em `assentos[1][0]`.

**Saída esperada:**

```text
Quantidade de fileiras: 2
Lugares na primeira fileira: 3
Último lugar da fileira A: A3
Primeiro lugar da fileira B: B1
```

Este exercício não exige percorrer nem alterar a matriz.

---

## Exercício bônus — Percorrendo após concluir o Capítulo 04

**Arquivo:** `bonus.ts`

> Faça este bônus somente depois de concluir a parte prática de estruturas de repetição. Ele não é necessário para estudar os fundamentos de arrays hoje.

Use:

```typescript
const tempos: number[] = [42, 38, 45, 40];
```

Crie `total = 0` com `let`. Use um único `for`, começando no índice `0` e continuando enquanto o índice for menor que `tempos.length`, para:

- exibir `Medição X: VALOR`, usando posição humana a partir de `1`;
- somar cada elemento em `total`.

Depois do loop, exiba o total. Não use métodos avançados de arrays.

**Saída esperada:**

```text
Medição 1: 42
Medição 2: 38
Medição 3: 45
Medição 4: 40
Total: 165
```

**Teste de limite:** troque temporariamente o array por `[]`. O corpo do loop não deve executar, e o total deve permanecer `0`.

## Checklist de entrega

- [ ] Criei os 11 arquivos obrigatórios e, se apropriado, o bônus.
- [ ] Mantive tipos precisos e não inseri valores incompatíveis.
- [ ] Diferenciei posição humana, índice, `length` e último índice válido.
- [ ] Previ o estado antes de executar as sequências de mutações.
- [ ] Conferi os retornos de `push`, `unshift`, `pop` e `shift`.
- [ ] Testei arrays vazios e considerei retornos `undefined`.
- [ ] Reconheci quando duas variáveis compartilham a mesma referência.
- [ ] Comparei valores e ordem sem tratar diferenças cosméticas do terminal como erro.
