# Erros Comuns — Capítulo 04: Estruturas de Repetição

## Sobre este documento

Loops raramente falham por causa da palavra `for` ou `while`. Os problemas geralmente aparecem na relação entre estado inicial, condição e atualização.

## 1. Esquecer a atualização

### Código com problema

```typescript
let contador = 1;

while (contador <= 5) {
  console.log(contador);
}
```

### O que acontece

`contador` permanece igual a `1`, então a condição nunca se torna falsa.

### Correção

```typescript
let contador = 1;

while (contador <= 5) {
  console.log(contador);
  contador++;
}
```

### Como evitar

Antes de executar, localize visualmente a variável que controla o término e onde ela muda.

## 2. Atualizar na direção errada

### Código com problema

```typescript
for (let numero = 1; numero <= 5; numero--) {
  console.log(numero);
}
```

### O que acontece

O valor começa abaixo do limite e diminui. Ele nunca ultrapassará `5` para encerrar o loop.

### Correção

```typescript
for (let numero = 1; numero <= 5; numero++) {
  console.log(numero);
}
```

### Como evitar

Simule mentalmente as duas primeiras atualizações e confira se o valor se aproxima do ponto de parada.

## 3. Errar o limite por uma unidade

### Código com problema

```typescript
for (let dia = 1; dia < 7; dia++) {
  console.log(dia);
}
```

### O que acontece

O dia `7` não é exibido. Esse tipo de falha é conhecido como erro de limite ou *off-by-one*.

### Correção

```typescript
for (let dia = 1; dia <= 7; dia++) {
  console.log(dia);
}
```

### Como evitar

Decida explicitamente se o valor limite deve participar e teste o próprio limite.

## 4. Usar `continue` antes da atualização no `while`

### Código com problema

```typescript
let item = 1;

while (item <= 5) {
  if (item === 3) {
    continue;
  }

  console.log(item);
  item++;
}
```

### O que acontece

Quando `item` chega a `3`, `continue` volta ao teste antes de `item++`. O programa fica preso nesse valor.

### Correção

```typescript
let item = 1;

while (item <= 5) {
  if (item === 3) {
    item++;
    continue;
  }

  console.log(item);
  item++;
}
```

### Como evitar

Em um `while`, examine todos os caminhos possíveis e confirme que cada um atualiza o estado antes de repetir.

## 5. Esperar que `break` encerre todos os loops

### Código com problema

```typescript
for (let grupo = 1; grupo <= 3; grupo++) {
  for (let item = 1; item <= 3; item++) {
    if (item === 2) {
      break;
    }

    console.log(`Grupo ${grupo}, item ${item}`);
  }
}
```

### O que acontece

O `break` encerra apenas o loop de `item`. O loop de `grupo` continua.

### Correção com estado compartilhado

```typescript
let processamentoEncerrado = false;

for (let grupo = 1; grupo <= 3; grupo++) {
  for (let item = 1; item <= 3; item++) {
    if (grupo === 2 && item === 2) {
      processamentoEncerrado = true;
      break;
    }

    console.log(`Grupo ${grupo}, item ${item}`);
  }

  if (processamentoEncerrado) {
    break;
  }
}
```

### Como evitar

Para cada `break`, identifique exatamente qual é o loop mais próximo que ele encerrará.

## 6. Colocar ponto e vírgula depois de `while`

### Código com problema

```typescript
let carregamento = 0;

while (carregamento < 100); {
  carregamento += 20;
}
```

### O que acontece

O ponto e vírgula cria um corpo vazio para o `while`. O bloco entre chaves deixa de pertencer ao loop e nunca é alcançado, porque `carregamento` não muda no corpo vazio.

### Correção

```typescript
let carregamento = 0;

while (carregamento < 100) {
  carregamento += 20;
}
```

O `do...while` é a exceção: nele, o ponto e vírgula final pertence à sintaxe.

## 7. Testar somente o caminho principal

Um loop pode funcionar com o valor fornecido e falhar nos limites. Verifique pelo menos:

- condição inicialmente falsa;
- uma única iteração;
- várias iterações;
- valor exatamente no limite;
- caminho que executa `continue`;
- caminho que executa `break`;
- meta inalcançável.

## Checklist anti-erros

- [ ] Sei qual variável controla o término.
- [ ] A condição usa o limite correto.
- [ ] A atualização ocorre em todos os caminhos necessários.
- [ ] A atualização se move na direção do término.
- [ ] Sei se o loop pode executar zero vezes.
- [ ] Cada `break` encerra o loop que eu pretendia.
- [ ] Cada `continue` preserva a atualização necessária.
- [ ] Testei limites e caminhos alternativos.

## Diagnósticos e sintomas

| Sintoma ou mensagem | Significado provável | O que verificar |
|---------------------|----------------------|-----------------|
| Programa não termina | Condição sempre verdadeira | Atualização, direção e caminhos com `continue` |
| Último valor não aparece | Limite exclusivo usado indevidamente | `<` versus `<=` |
| `break` permitido apenas em loop ou `switch` | `break` está fora de uma estrutura válida | Posição das chaves e do comando |
| `continue` permitido apenas em loop | `continue` está fora de uma repetição | Posição das chaves e do comando |
| Código depois do loop nunca executa | Loop infinito ou término inalcançável | Estado inicial, condição e atualização |
