# Aula 03 — Exemplos progressivos

Antes de executar cada exemplo, preveja o retorno e as linhas exibidas.

## Exemplo 1 — Função sem parâmetros

```typescript
function obterSaudacao(): string {
  return "Bem-vindo ao capítulo 06";
}

const saudacao = obterSaudacao();
console.log(saudacao);
```

Definir não exibe nada. A mensagem só é criada quando `obterSaudacao()` é chamada.

## Exemplo 2 — Parâmetro e argumento

```typescript
function criarIdentificador(numero: number): string {
  return `ID-${numero}`;
}

console.log(criarIdentificador(17));
console.log(criarIdentificador(42));
```

O parâmetro `numero` recebe um argumento diferente em cada chamada.

## Exemplo 3 — Vários parâmetros

```typescript
function calcularAutonomia(distancia: number, consumo: number): number {
  return distancia / consumo;
}

const litrosNecessarios = calcularAutonomia(420, 14);
console.log(`Litros necessários: ${litrosNecessarios}`);
```

A ordem importa: o primeiro argumento representa a distância; o segundo, o consumo.

## Exemplo 4 — Retorno booleano

```typescript
function estaDentroDoLimite(valor: number, limite: number): boolean {
  return valor <= limite;
}

console.log(estaDentroDoLimite(8, 10)); // true
console.log(estaDentroDoLimite(12, 10)); // false
```

Uma função booleana pode ser usada diretamente em uma condição:

```typescript
if (estaDentroDoLimite(8, 10)) {
  console.log("Valor aceito");
}
```

## Exemplo 5 — Múltiplos caminhos de retorno

```typescript
function classificarBateria(percentual: number): string {
  if (percentual <= 20) {
    return "baixa";
  }

  if (percentual <= 70) {
    return "média";
  }

  return "alta";
}

console.log(classificarBateria(15));
console.log(classificarBateria(50));
console.log(classificarBateria(90));
```

Cada chamada alcança exatamente um `return`.

## Exemplo 6 — `void` e efeito

```typescript
function exibirLinha(rotulo: string, valor: number): void {
  console.log(`${rotulo}: ${valor}`);
}

exibirLinha("Temperatura", 24);
exibirLinha("Umidade", 68);
```

A responsabilidade dessa função é exibir. Ela não precisa devolver a linha para um cálculo posterior.

## Exemplo 7 — Declaração e arrow equivalentes

```typescript
function converterHorasParaMinutos(horas: number): number {
  return horas * 60;
}

const converterMinutosParaSegundos = (minutos: number): number => minutos * 60;

const minutos = converterHorasParaMinutos(2);
const segundos = converterMinutosParaSegundos(minutos);

console.log(minutos);
console.log(segundos);
```

As formas mudam, mas o contrato continua explícito.

## Exemplo 8 — Guardar sem chamar

```typescript
function quadrado(valor: number): number {
  return valor * valor;
}

const operacao: (valor: number) => number = quadrado;

console.log(operacao(6));
console.log(operacao === quadrado);
```

`quadrado` não possui parênteses na atribuição, então a função foi guardada. O resultado é `36`, e a comparação é `true`.

## Exemplo 9 — Array como entrada

```typescript
function somarValores(valores: number[]): number {
  let total = 0;

  for (const valor of valores) {
    total += valor;
  }

  return total;
}

const leituras: number[] = [12, 18, 10];
const total = somarValores(leituras);

console.log(total); // 40
console.log(leituras); // permanece [12, 18, 10]
```

Receber um array não obriga a função a modificá-lo. Aqui ela apenas lê seus valores.

## Exemplo 10 — Composição manual

```typescript
function calcularTotal(valores: number[]): number {
  let total = 0;

  for (const valor of valores) {
    total += valor;
  }

  return total;
}

function calcularMedia(total: number, quantidade: number): number {
  if (quantidade === 0) {
    return 0;
  }

  return total / quantidade;
}

function criarRelatorio(total: number, media: number): string {
  return `Total: ${total} | Média: ${media}`;
}

const medidas: number[] = [10, 20, 30];
const total = calcularTotal(medidas);
const media = calcularMedia(total, medidas.length);
const relatorio = criarRelatorio(total, media);

console.log(relatorio);
```

O resultado de uma função vira argumento de outra. Cada etapa permanece nomeada e verificável.

## Exemplo 11 — Um erro de contrato

```typescript
function formatarQuantidade(quantidade: number): string {
  return `${quantidade} itens`;
}

const texto = formatarQuantidade(3);
console.log(texto);
```

Se o retorno fosse apenas `quantidade`, o TypeScript acusaria incompatibilidade: a assinatura promete `string`, mas o corpo devolveria `number`.

## Desafio rápido

Sem executar, preveja as três saídas:

```typescript
function ajustar(valor: number): number {
  if (valor < 0) {
    return 0;
  }

  return valor + 2;
}

const regra = ajustar;
const primeira = regra(-5);
const segunda = ajustar(8);

console.log(primeira);
console.log(segunda);
console.log(regra === ajustar);
```

Depois, explique por que `regra` não guarda um número.

## Testes alternativos

Ao terminar seus próprios exemplos, teste pelo menos:

- um valor comum;
- um valor de limite, como `0`;
- um array vazio quando a função aceita arrays;
- duas chamadas com argumentos diferentes para confirmar a reutilização.
