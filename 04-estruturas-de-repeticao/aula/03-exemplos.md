# Estruturas de Repetição — Exemplos Práticos

## Exemplo 1: Sincronização com `while`

### Contexto

Um aplicativo possui quatro arquivos pendentes e sincroniza um por vez até zerar a fila.

### Código

```typescript
let arquivosPendentes = 4;

while (arquivosPendentes > 0) {
  console.log(`Sincronizando arquivo. Restantes: ${arquivosPendentes}`);
  arquivosPendentes--;
}

console.log("Sincronização concluída.");
```

### Explicação

- A condição é testada antes de cada sincronização.
- A atualização diminui `arquivosPendentes` e aproxima o loop do término.
- Quando o valor chega a `0`, o corpo não é executado novamente.

### Saída esperada

```text
Sincronizando arquivo. Restantes: 4
Sincronizando arquivo. Restantes: 3
Sincronizando arquivo. Restantes: 2
Sincronizando arquivo. Restantes: 1
Sincronização concluída.
```

### Teste alternativo

Troque o valor inicial por `0`. Nenhuma sincronização deve ocorrer, mas a mensagem final ainda deve aparecer.

## Exemplo 2: Primeira consulta com `do...while`

### Contexto

Uma loja consulta o status de um pedido pelo menos uma vez. Neste exemplo controlado, são realizadas até três consultas.

### Código

```typescript
let consulta = 1;
const maximoDeConsultas = 3;

do {
  console.log(`Consulta ${consulta}: pedido em processamento.`);
  consulta++;
} while (consulta <= maximoDeConsultas);
```

### Explicação

O corpo executa antes do primeiro teste. Mesmo que `maximoDeConsultas` fosse `0`, uma consulta ainda aconteceria. Essa característica precisa combinar com a regra real; caso contrário, `while` seria mais adequado.

### Saída esperada

```text
Consulta 1: pedido em processamento.
Consulta 2: pedido em processamento.
Consulta 3: pedido em processamento.
```

## Exemplo 3: Agenda com `for` e `continue`

### Contexto

Uma agenda prepara lembretes para os sete dias de uma semana, mas o quarto dia foi reservado para descanso.

### Código

```typescript
const diaDeDescanso = 4;

for (let dia = 1; dia <= 7; dia++) {
  if (dia === diaDeDescanso) {
    console.log(`Dia ${dia}: sem lembrete.`);
    continue;
  }

  console.log(`Dia ${dia}: lembrete preparado.`);
}
```

### Explicação

Quando `dia` vale `4`, `continue` pula apenas o restante daquela iteração. O cabeçalho do `for` ainda executa `dia++`, então o programa continua no dia `5`.

### Saída esperada

```text
Dia 1: lembrete preparado.
Dia 2: lembrete preparado.
Dia 3: lembrete preparado.
Dia 4: sem lembrete.
Dia 5: lembrete preparado.
Dia 6: lembrete preparado.
Dia 7: lembrete preparado.
```

## Exemplo 4: Busca com `break`

### Contexto

Um jogo procura a primeira fase que contém uma chave. Não há motivo para continuar a busca depois de encontrá-la.

### Código

```typescript
const faseComChave = 4;
let chaveEncontrada = false;

for (let fase = 1; fase <= 6; fase++) {
  console.log(`Procurando na fase ${fase}...`);

  if (fase === faseComChave) {
    chaveEncontrada = true;
    console.log("Chave encontrada!");
    break;
  }
}

console.log(`Busca concluída: ${chaveEncontrada}`);
```

### Explicação

O valor booleano registra o resultado da busca. Quando a fase correta é alcançada, `break` encerra o loop; as fases `5` e `6` não são visitadas.

### Saída esperada

```text
Procurando na fase 1...
Procurando na fase 2...
Procurando na fase 3...
Procurando na fase 4...
Chave encontrada!
Busca concluída: true
```

## Exemplo 5: Grade de lugares com loops aninhados

### Contexto

Uma pequena sala possui duas fileiras e três lugares por fileira. Cada posição recebe um identificador.

### Código

```typescript
for (let fileira = 1; fileira <= 2; fileira++) {
  for (let lugar = 1; lugar <= 3; lugar++) {
    console.log(`Fileira ${fileira}, lugar ${lugar}`);
  }
}
```

### Explicação

Para cada uma das duas fileiras, o loop interno percorre os três lugares. O total é `2 × 3 = 6` iterações internas.

### Saída esperada

```text
Fileira 1, lugar 1
Fileira 1, lugar 2
Fileira 1, lugar 3
Fileira 2, lugar 1
Fileira 2, lugar 2
Fileira 2, lugar 3
```

## Exemplo de erro comum: faixa invertida

### Código com problema

```typescript
for (let pontos = 1; pontos <= 5; pontos--) {
  console.log(pontos);
}
```

### Por que está errado?

A condição permite continuar enquanto `pontos` for menor ou igual a `5`, mas a atualização diminui o valor. A cada iteração, ele se afasta do limite que encerraria o loop.

### Código corrigido

```typescript
for (let pontos = 1; pontos <= 5; pontos++) {
  console.log(pontos);
}
```

## Desafio rápido

Crie `exercicios/desafio-rapido.ts`.

1. Use um `for` para percorrer os números de `1` a `10`.
2. Ignore os múltiplos de `3` com `continue`.
3. Some os demais números em `soma`.
4. Exiba cada número somado e, no final, `Soma: 37`.

Antes de executar, faça uma previsão escrita dos números que aparecerão. Depois compare sua previsão com a saída real.
