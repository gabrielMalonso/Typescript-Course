# Estruturas de Repetição — Teoria

## Objetivos de aprendizagem

Ao final desta aula, você será capaz de:

- explicar as partes que controlam uma repetição;
- prever quantas vezes um loop será executado;
- escolher o tipo de loop a partir da regra do problema;
- distinguir parada, salto e término normal;
- reconhecer situações que podem gerar loops infinitos.

## Pré-requisitos

Você já sabe criar variáveis, atualizar valores e produzir condições booleanas. Agora usará essas três habilidades juntas para controlar repetições.

## Por que loops existem?

Imagine que você queira mostrar os números de `1` a `5`. Seria possível escrever:

```typescript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

Isso funciona, mas repete a mesma instrução manualmente. Se o limite mudasse para `500`, a solução se tornaria impraticável.

Um loop descreve a regra da repetição uma única vez:

```typescript
for (let numero = 1; numero <= 5; numero++) {
  console.log(numero);
}
```

O programa cuida das cinco execuções.

## As quatro partes de uma repetição

Todo loop controlado possui quatro ideias, mesmo quando a sintaxe as organiza de maneiras diferentes.

| Parte | Pergunta | Exemplo |
|-------|----------|---------|
| Estado inicial | De onde começamos? | `numero = 1` |
| Condição | Enquanto o quê for verdadeiro? | `numero <= 5` |
| Corpo | O que acontece em cada repetição? | `console.log(numero)` |
| Atualização | Como avançamos em direção ao fim? | `numero++` |

```text
numero = 1
    ↓
numero <= 5? ── não ──→ termina
    │
   sim
    ↓
exibe numero
    ↓
numero aumenta
    └──────────────→ testa novamente
```

Cada passagem pelo corpo é chamada de **iteração**.

## `while`: repetir enquanto uma condição for verdadeira

O `while` testa a condição antes de cada iteração.

```typescript
let tentativasRestantes = 3;

while (tentativasRestantes > 0) {
  console.log(`Tentativas restantes: ${tentativasRestantes}`);
  tentativasRestantes--;
}
```

Use `while` quando a quantidade de repetições depende de uma condição e não é o aspecto mais importante da regra.

Um `while` pode executar **zero vezes**:

```typescript
let mensagensPendentes = 0;

while (mensagensPendentes > 0) {
  console.log("Enviando mensagem...");
  mensagensPendentes--;
}
```

Como a condição começa falsa, o corpo não é executado.

## `do...while`: executar antes de testar

O `do...while` executa o corpo e somente depois verifica se deve repetir.

```typescript
let pagina = 1;

do {
  console.log(`Abrindo página ${pagina}`);
  pagina++;
} while (pagina <= 3);
```

Sua característica essencial é executar **pelo menos uma vez**, mesmo quando a condição começa falsa:

```typescript
let saldoDeCupons = 0;

do {
  console.log("Consultando cupons...");
} while (saldoDeCupons > 0);
```

A consulta ocorre uma vez. Use essa estrutura quando a primeira execução precisa acontecer antes da decisão de repetir.

## `for`: repetição controlada por contador

O `for` reúne inicialização, condição e atualização no cabeçalho:

```typescript
for (let rodada = 1; rodada <= 4; rodada++) {
  console.log(`Rodada ${rodada}`);
}
```

Ele é especialmente adequado quando você sabe de onde o contador parte, até onde vai e como muda.

```text
for (inicialização; condição; atualização)
```

A inicialização ocorre uma vez. A condição é testada antes de cada iteração. A atualização ocorre depois de cada execução do corpo.

## Contadores crescentes e decrescentes

Um contador não precisa aumentar:

```typescript
for (let segundos = 5; segundos >= 1; segundos--) {
  console.log(segundos);
}

console.log("Começou!");
```

Também é possível avançar de dois em dois:

```typescript
for (let numeroPar = 2; numeroPar <= 10; numeroPar += 2) {
  console.log(numeroPar);
}
```

A atualização precisa ser compatível com a condição. Se o contador deve diminuir, mas aumenta, ele se afasta do término.

## `break`: interromper o loop inteiro

`break` encerra imediatamente o loop mais próximo.

```typescript
for (let tentativa = 1; tentativa <= 5; tentativa++) {
  if (tentativa === 3) {
    console.log("Código encontrado.");
    break;
  }

  console.log(`Testando tentativa ${tentativa}`);
}
```

Depois do `break`, nenhuma outra iteração ocorre. Ele é útil quando o objetivo já foi alcançado ou quando uma condição torna desnecessário continuar.

## `continue`: pular somente a iteração atual

`continue` encerra a iteração atual e passa para a próxima.

```typescript
for (let item = 1; item <= 5; item++) {
  if (item === 3) {
    continue;
  }

  console.log(`Processando item ${item}`);
}
```

O item `3` não é processado, mas os itens `4` e `5` ainda são.

```text
break    → sai do loop
continue → pula esta volta e continua o loop
```

## Loops aninhados

Um loop pode existir dentro de outro. O loop interno completa suas iterações para cada iteração do loop externo.

```typescript
for (let andar = 1; andar <= 2; andar++) {
  for (let sala = 1; sala <= 3; sala++) {
    console.log(`Andar ${andar}, sala ${sala}`);
  }
}
```

O loop externo executa duas vezes. Em cada uma delas, o interno executa três vezes. A saída possui `2 × 3 = 6` linhas.

Use nomes diferentes e significativos para os contadores. Reutilizar o mesmo nome torna o código difícil de entender e pode provocar erros de lógica.

## Loop infinito

Um loop é infinito quando sua condição nunca se torna falsa e nenhum `break` é alcançado.

```typescript
let contador = 1;

while (contador <= 5) {
  console.log(contador);
}
```

O valor de `contador` nunca muda. Logo, `contador <= 5` permanece verdadeiro.

A correção é atualizar o estado:

```typescript
let contador = 1;

while (contador <= 5) {
  console.log(contador);
  contador++;
}
```

Antes de executar um loop, responda:

1. Qual variável controla o término?
2. Onde ela é atualizada?
3. A atualização realmente aproxima o valor do fim?
4. Existe algum caminho que pula a atualização?

## Escolhendo o loop

| Situação | Estrutura geralmente mais clara |
|----------|----------------------------------|
| Pode executar zero vezes e depende de condição | `while` |
| Precisa executar pelo menos uma vez | `do...while` |
| Possui contador com início, limite e passo | `for` |
| Precisa parar ao encontrar algo | Loop com `break` |
| Precisa ignorar alguns casos | Loop com `continue` |

Essas escolhas não são leis absolutas. Muitas repetições podem ser escritas de mais de uma forma; prefira a que deixa a regra mais visível.

## Como testar um loop

Não teste apenas a entrada fornecida. Para cada loop, verifique:

- condição inicialmente falsa;
- exatamente uma iteração;
- várias iterações;
- valor exatamente no limite;
- parada por `break`, quando existir;
- salto por `continue`, quando existir.

Esse hábito ajuda a encontrar comparações invertidas, limites inclusivos incorretos e atualizações esquecidas.

## Resumo

- Um loop combina estado inicial, condição, corpo e atualização.
- `while` testa antes; `do...while` testa depois.
- `for` organiza repetições controladas por contador.
- `break` encerra o loop; `continue` pula apenas uma iteração.
- Loops aninhados multiplicam a quantidade de execuções.
- Todo loop precisa de um caminho confiável até o término.

## Próximo passo

Na próxima aula, você verá a sintaxe completa de cada estrutura e as armadilhas mais comuns.
