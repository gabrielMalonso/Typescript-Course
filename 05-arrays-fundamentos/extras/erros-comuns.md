# Arrays — Erros Comuns

Use este arquivo para diagnosticar resultados inesperados. A técnica mais útil neste capítulo é anotar o estado do array depois de cada operação.

## 1. Confundir posição humana com índice

**Sintoma:** você tenta acessar o primeiro elemento com índice `1`.

```typescript
const etapas: string[] = ["planejar", "executar", "revisar"];

console.log(etapas[1]); // executar
```

**Diagnóstico:** posições humanas começam em 1, mas índices de arrays começam em 0.

```text
posição humana:   1ª          2ª          3ª
índice:            0           1           2
valor:         planejar    executar     revisar
```

**Correção:** use `etapas[0]` para o primeiro elemento e subtraia `1` ao converter uma posição humana em índice.

## 2. Usar `length` como último índice

**Sintoma:** `array[array.length]` resulta em `undefined`.

```typescript
const etapas: string[] = ["planejar", "executar", "revisar"];

console.log(etapas.length); // 3
console.log(etapas[3]); // undefined
```

**Diagnóstico:** `length` é a quantidade de elementos. Como o primeiro índice é `0`, o último índice válido é uma unidade menor.

**Correção:** em um array não vazio, use:

```typescript
const ultimoIndice = etapas.length - 1;
console.log(etapas[ultimoIndice]); // revisar
```

## 3. Ler ou remover de um array vazio sem considerar `undefined`

**Sintoma:** o programa exibe `undefined`, ou o TypeScript informa que um valor pode não existir.

```typescript
const alertas: string[] = [];
const alertaRemovido = alertas.pop(); // string | undefined

console.log(alertas[0]); // undefined em tempo de execução
console.log(alertaRemovido); // undefined
```

**Diagnóstico:** um array vazio tem `length` igual a `0` e não possui índice válido. `pop` e `shift` não têm elemento para devolver.

**Correção:** antes de ler as extremidades de uma lista que pode estar vazia, teste sua quantidade:

```typescript
if (alertas.length > 0) {
  console.log(alertas[0]);
  console.log(alertas[alertas.length - 1]);
} else {
  console.log("Nenhum alerta disponível.");
}
```

## 4. Pensar que `const` torna o array imutável

**Sintoma:** você evita `push` ou a alteração por índice porque o array foi declarado com `const`.

```typescript
const tarefas: string[] = ["estudar"];

tarefas.push("praticar"); // permitido
tarefas[0] = "revisar"; // permitido
// tarefas = ["descansar"]; // erro
```

**Diagnóstico:** `const` impede que a variável receba outro array. Ela não congela o conteúdo do array atual.

**Correção:** prefira `const` quando o nome deve continuar apontando para o mesmo array, mesmo que seus elementos sejam alterados.

## 5. Inserir um tipo incompatível

**Sintoma:** o TypeScript rejeita uma inclusão ou substituição.

```typescript
const pontuacoes: number[] = [10, 15];

// pontuacoes.push("vinte");
// pontuacoes[0] = true;
```

**Diagnóstico:** `number[]` aceita números em todas as posições. Nem `string` nem `boolean` pertencem a esse array.

**Correção:** corrija o dado ou escolha o tipo que representa honestamente o domínio. Não use `any` apenas para silenciar o erro. Quando um array começa vazio, declare sua intenção:

```typescript
const pontuacoes: number[] = [];
```

## 6. Confundir o retorno dos quatro métodos

**Sintoma:** uma variável recebe um número quando você esperava o item adicionado, ou recebe o item removido quando esperava o novo tamanho.

| Método | Modifica onde? | Retorna |
|---|---|---|
| `push(valor)` | adiciona no fim | novo `length` |
| `unshift(valor)` | adiciona no início | novo `length` |
| `pop()` | remove do fim | elemento removido ou `undefined` |
| `shift()` | remove do início | elemento removido ou `undefined` |

```typescript
const fila: string[] = ["B"];

const tamanho = fila.push("C"); // 2
const primeiro = fila.shift(); // "B"
```

**Correção:** acompanhe separadamente duas perguntas: “como ficou o array?” e “o que o método retornou?”.

## 7. Esquecer que operações no início mudam os índices

**Sintoma:** você altera ou lê o elemento errado depois de `unshift` ou `shift`.

```typescript
const fila: string[] = ["A", "B", "C"];

fila.unshift("URGENTE"); // ["URGENTE", "A", "B", "C"]
fila.shift(); // ["A", "B", "C"]
```

**Diagnóstico:** `unshift` desloca os elementos antigos um índice para a direita; `shift` desloca os restantes um índice para a esquerda. `push` e `pop` não deslocam os índices dos elementos que permanecem.

**Correção:** redesenhe o array após cada operação no início antes de acessar ou alterar um índice.

## 8. Achar que a atribuição cria uma cópia independente

**Sintoma:** uma alteração feita por uma variável também aparece quando você usa a outra.

```typescript
const original: string[] = ["A", "B"];
const outroNome = original;

outroNome[0] = "X";
console.log(original); // ["X", "B"]
console.log(original === outroNome); // true
```

**Diagnóstico:** existe um único array com duas referências para ele. `const outroNome = original` não copia os elementos.

**Correção:** neste capítulo, reconheça a referência compartilhada e preveja seu efeito. As formas convenientes de criar cópias de arrays de tamanho variável serão estudadas mais adiante.

## 9. Usar loops ou métodos avançados antes de consolidar o básico

**Sintoma:** a solução funciona, mas esconde justamente o acesso por índice, as mudanças de estado ou os retornos que o exercício quer praticar.

**Diagnóstico:** métodos de capítulos futuros e loops acrescentam conceitos antes de o modelo mental do array estar firme. Como a prática do Capítulo 04 ainda está pendente, isso também mistura duas dificuldades.

**Correção:** nos exercícios fundamentais, use apenas índices, `length`, `push`, `pop`, `shift` e `unshift`. Deixe o bônus com `for` para depois da prática do Capítulo 04.

## Checklist rápido de diagnóstico

- [ ] O primeiro índice usado é `0`?
- [ ] O último índice foi calculado com `length - 1`?
- [ ] O array pode estar vazio?
- [ ] Cada valor respeita o tipo dos elementos?
- [ ] Diferenciei o retorno do método do estado final do array?
- [ ] Recalculei os índices após `shift` ou `unshift`?
- [ ] Duas variáveis apontam para o mesmo array?
- [ ] Resolvi com os recursos permitidos neste capítulo?

