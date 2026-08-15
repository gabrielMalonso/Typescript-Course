# Aula 02 — Sintaxe de funções

## 1. Declaração de função

```typescript
function nomeDaFuncao(parametro: Tipo): TipoDeRetorno {
  return valor;
}
```

Exemplo:

```typescript
function converterCelsiusParaFahrenheit(celsius: number): number {
  return celsius * 1.8 + 32;
}
```

Chamada:

```typescript
const fahrenheit = converterCelsiusParaFahrenheit(20);
```

## 2. Zero, um ou vários parâmetros

Sem parâmetros:

```typescript
function obterVersao(): string {
  return "1.0.0";
}
```

Um parâmetro:

```typescript
function ehPositivo(valor: number): boolean {
  return valor > 0;
}
```

Vários parâmetros:

```typescript
function calcularVolume(largura: number, altura: number, profundidade: number): number {
  return largura * altura * profundidade;
}
```

Neste capítulo, todos os parâmetros declarados são obrigatórios e respeitam sua ordem.

## 3. Retorno inferido e retorno explícito

O TypeScript consegue inferir o retorno:

```typescript
function somar(a: number, b: number) {
  return a + b;
}
```

Também podemos registrá-lo explicitamente:

```typescript
function somar(a: number, b: number): number {
  return a + b;
}
```

Nos exercícios deste capítulo, declare o retorno das funções para praticar a leitura do contrato. A inferência continua sendo útil para variáveis locais.

## 4. Funções `void`

```typescript
function exibirAlerta(mensagem: string): void {
  console.log(`ALERTA: ${mensagem}`);
}
```

Uma função `void` pode usar `return` sem valor para encerrar cedo:

```typescript
function exibirSePositivo(valor: number): void {
  if (valor <= 0) {
    return;
  }

  console.log(valor);
}
```

`return;` encerra a função, mas não entrega um dado utilizável.

## 5. Todos os caminhos precisam retornar

Código incompleto:

```typescript
function classificarNota(nota: number): string {
  if (nota >= 7) {
    return "aprovado";
  }

  // Falta retorno quando nota < 7.
}
```

Correção:

```typescript
function classificarNota(nota: number): string {
  if (nota >= 7) {
    return "aprovado";
  }

  return "revisão";
}
```

## 6. Expressão de função

```typescript
const dividir = function (dividendo: number, divisor: number): number {
  return dividendo / divisor;
};
```

A função é criada como uma expressão e guardada na constante `dividir`. A chamada mantém a mesma forma:

```typescript
console.log(dividir(20, 4));
```

## 7. Arrow function

Com bloco:

```typescript
const calcularDesconto = (preco: number, percentual: number): number => {
  const desconto = preco * (percentual / 100);
  return preco - desconto;
};
```

Com retorno implícito:

```typescript
const calcularDobro = (valor: number): number => valor * 2;
```

No retorno implícito:

- não há chaves;
- não se escreve `return`;
- a expressão depois de `=>` é o valor devolvido.

Se usar chaves, escreva `return` quando a função precisa devolver um valor:

```typescript
const calcularTriplo = (valor: number): number => {
  return valor * 3;
};
```

## 8. Tipo de uma função

```typescript
let transformar: (valor: number) => number;

transformar = (valor: number): number => valor * 2;
console.log(transformar(5));

transformar = (valor: number): number => valor + 10;
console.log(transformar(5));
```

O tipo descreve os parâmetros e o retorno. Nomes dos parâmetros podem mudar sem alterar a compatibilidade:

```typescript
const primeira: (entrada: number) => number = (valor: number): number => valor * 2;
```

## 9. Função versus resultado

```typescript
function criarCodigo(): string {
  return "COD-42";
}

const funcao = criarCodigo;
const resultado = criarCodigo();
```

| Variável | Valor guardado | Tipo conceitual |
|---|---|---|
| `funcao` | a própria função | `() => string` |
| `resultado` | `"COD-42"` | `string` |

Os parênteses realizam a chamada.

## 10. Parâmetro de array

```typescript
function contarPositivos(valores: number[]): number {
  let quantidade = 0;

  for (const valor of valores) {
    if (valor > 0) {
      quantidade++;
    }
  }

  return quantidade;
}
```

O tipo `number[]` descreve um único parâmetro: um array de números.

## 11. Checklist de uma função

Ao escrever uma função, responda:

1. Qual responsabilidade ela possui?
2. Quais dados entram?
3. Quais tipos essas entradas têm?
4. Ela devolve um valor ou apenas provoca um efeito?
5. Se devolve, todos os caminhos retornam o tipo correto?
6. A chamada está separada da definição?

## Tabela de referência

| Forma | Exemplo curto |
|---|---|
| Declaração | `function dobro(n: number): number { return n * 2; }` |
| Expressão | `const dobro = function (n: number): number { return n * 2; };` |
| Arrow com bloco | `const dobro = (n: number): number => { return n * 2; };` |
| Arrow concisa | `const dobro = (n: number): number => n * 2;` |
| Tipo de função | `(n: number) => number` |
| Função `void` | `(mensagem: string) => void` |
