# Estruturas de Repetição — Sintaxe

## `while`

```typescript
inicializacao;

while (condicao) {
  instrucoes;
  atualizacao;
}
```

Exemplo:

```typescript
let episodio = 1;

while (episodio <= 3) {
  console.log(`Episódio ${episodio}`);
  episodio++;
}
```

Ordem de execução:

1. cria `episodio` uma vez;
2. testa `episodio <= 3`;
3. executa o corpo se o resultado for `true`;
4. aumenta `episodio`;
5. volta ao teste.

## `do...while`

```typescript
inicializacao;

do {
  instrucoes;
  atualizacao;
} while (condicao);
```

Exemplo:

```typescript
let tentativa = 1;

do {
  console.log(`Tentativa ${tentativa}`);
  tentativa++;
} while (tentativa <= 3);
```

O ponto e vírgula depois de `while (condicao);` faz parte da sintaxe do `do...while`.

## `for` tradicional

```typescript
for (inicializacao; condicao; atualizacao) {
  instrucoes;
}
```

Exemplo:

```typescript
for (let nivel = 1; nivel <= 4; nivel++) {
  console.log(`Nível ${nivel}`);
}
```

As três partes do cabeçalho são separadas por ponto e vírgula:

| Parte | Quando executa | Exemplo |
|-------|----------------|---------|
| Inicialização | Uma vez, no começo | `let nivel = 1` |
| Condição | Antes de cada iteração | `nivel <= 4` |
| Atualização | Depois de cada iteração | `nivel++` |

## Formas de atualização

### Incremento e decremento

```typescript
contador++;
contador--;
```

Neste capítulo, quando o valor retornado pela expressão não é usado, `contador++` e `++contador` produzem o mesmo avanço. Prefira a forma que você consegue ler com mais naturalidade e mantenha consistência.

### Passos personalizados

```typescript
contador += 2;
contador -= 5;
```

Exemplo:

```typescript
for (let porcentagem = 0; porcentagem <= 100; porcentagem += 25) {
  console.log(`${porcentagem}%`);
}
```

## Contador dentro e fora do loop

Quando o contador só é necessário no loop, declare-o no `for`:

```typescript
for (let posicao = 1; posicao <= 3; posicao++) {
  console.log(posicao);
}
```

`posicao` não existe depois do loop.

Quando você precisa do valor final, declare antes:

```typescript
let posicao = 1;

for (; posicao <= 3; posicao++) {
  console.log(posicao);
}

console.log(`Valor final: ${posicao}`);
```

Embora partes do cabeçalho possam ficar vazias, só faça isso quando houver uma razão clara. Um `for` incompleto pode ser mais difícil de ler que um `while`.

## `break`

```typescript
for (let codigo = 1; codigo <= 10; codigo++) {
  if (codigo === 4) {
    break;
  }

  console.log(codigo);
}
```

A saída contém `1`, `2` e `3`. Quando `codigo` chega a `4`, o loop termina antes do `console.log`.

## `continue`

```typescript
for (let numero = 1; numero <= 5; numero++) {
  if (numero === 3) {
    continue;
  }

  console.log(numero);
}
```

A saída contém `1`, `2`, `4` e `5`.

## Cuidado com `continue` no `while`

No `for`, a atualização do cabeçalho ainda acontece depois de `continue`. No `while`, você controla manualmente onde a atualização ocorre.

Código problemático:

```typescript
let numero = 1;

while (numero <= 5) {
  if (numero === 3) {
    continue;
  }

  console.log(numero);
  numero++;
}
```

Ao chegar a `3`, o programa volta ao teste sem aumentar `numero`. Ele fica preso em `3`.

Uma correção possível:

```typescript
let numero = 1;

while (numero <= 5) {
  if (numero === 3) {
    numero++;
    continue;
  }

  console.log(numero);
  numero++;
}
```

## Loops aninhados

```typescript
for (let pagina = 1; pagina <= 2; pagina++) {
  for (let bloco = 1; bloco <= 3; bloco++) {
    console.log(`Página ${pagina}, bloco ${bloco}`);
  }
}
```

O contador interno é reiniciado para cada iteração externa.

### `break` em loops aninhados

```typescript
for (let fase = 1; fase <= 2; fase++) {
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    if (tentativa === 2) {
      break;
    }

    console.log(`Fase ${fase}, tentativa ${tentativa}`);
  }
}
```

Esse `break` encerra apenas o loop de `tentativa`. O loop de `fase` continua.

## Condições inclusivas e exclusivas

Compare:

```typescript
for (let numero = 1; numero < 5; numero++) {
  console.log(numero);
}
```

Saída: `1`, `2`, `3`, `4`.

```typescript
for (let numero = 1; numero <= 5; numero++) {
  console.log(numero);
}
```

Saída: `1`, `2`, `3`, `4`, `5`.

Antes de escolher `<` ou `<=`, pergunte se o limite pertence ao conjunto que deve ser processado.

## Erros de sintaxe e lógica comuns

### Ponto e vírgula depois do `while`

```typescript
let contador = 1;

while (contador <= 3); {
  console.log(contador);
  contador++;
}
```

O ponto e vírgula encerra o `while` com um corpo vazio. Como `contador` não muda nesse corpo vazio, o loop não termina.

### Esquecer a atualização

```typescript
let contador = 1;

while (contador <= 3) {
  console.log(contador);
}
```

### Atualizar na direção errada

```typescript
for (let contador = 1; contador <= 3; contador--) {
  console.log(contador);
}
```

O contador diminui e nunca ultrapassa `3`.

### Usar `=` no teste

```typescript
let ativo = true;

while (ativo = true) {
  console.log("Executando");
}
```

`ativo = true` realiza uma atribuição e resulta em `true`. Para comparar, seria necessário `ativo === true`; nesse caso simples, `while (ativo)` já comunica a intenção.

## Referência rápida

| Sintaxe | Uso principal | Pode executar zero vezes? |
|---------|---------------|----------------------------|
| `while (condicao) { ... }` | Quantidade depende de condição | Sim |
| `do { ... } while (condicao);` | Primeira execução obrigatória | Não |
| `for (inicio; teste; passo) { ... }` | Contador bem definido | Sim |
| `break` | Encerrar o loop mais próximo | — |
| `continue` | Pular a iteração atual | — |

## Checklist antes de executar

- [ ] Identifiquei a variável de controle.
- [ ] A condição começa com o valor esperado.
- [ ] A atualização aproxima o loop do término.
- [ ] Escolhi corretamente entre limite inclusivo e exclusivo.
- [ ] Testei zero, uma e várias iterações.
- [ ] Verifiquei o caminho de `break` ou `continue`, se houver.
