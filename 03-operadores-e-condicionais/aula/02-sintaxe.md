# Capítulo 03 — Operadores e Estruturas Condicionais: Sintaxe

## 1. Expressões aritméticas

```typescript
const soma = 12 + 3;
const subtracao = 12 - 3;
const multiplicacao = 12 * 3;
const divisao = 12 / 3;
const resto = 12 % 5;
const potencia = 12 ** 2;
```

### Ordem simplificada

1. parênteses;
2. potência;
3. multiplicação, divisão e resto;
4. soma e subtração.

Quando a expressão representar uma fórmula, use parênteses para comunicar a intenção:

```typescript
const media = (leituraA + leituraB) / 2;
```

## 2. Atribuições compostas

```typescript
let contador = 10;

contador += 2;
contador -= 1;
contador *= 3;
contador /= 2;
```

Não use esses operadores com `const`, pois todos realizam reatribuição.

## 3. Comparações

```typescript
const carga = 80;
const limite = 100;

const igual = carga === limite;
const diferente = carga !== limite;
const maior = carga > limite;
const menor = carga < limite;
const maiorOuIgual = carga >= limite;
const menorOuIgual = carga <= limite;
```

Prefira igualdade estrita:

```typescript
const codigoRecebido = "10";
const codigoEsperado = "10";
const mesmoCodigo = codigoRecebido === codigoEsperado;
```

`=` atribui; `===` compara. Confundir os dois muda completamente a intenção.

## 4. Condições lógicas

```typescript
const pressaoSegura = true;
const temperaturaSegura = false;

const tudoSeguro = pressaoSegura && temperaturaSegura;
const algumParametroSeguro = pressaoSegura || temperaturaSegura;
const pressaoInsegura = !pressaoSegura;
```

Use parênteses quando combinar grupos:

```typescript
const podeOperar = sensorAtivo && (modoManual || modoAutomatico);
```

## 5. `if`

```typescript
if (condicao) {
  // instruções executadas quando a condição é verdadeira
}
```

Uma única instrução pode ser escrita sem chaves, mas neste curso usaremos chaves para tornar o bloco visível.

## 6. `if` e `else`

```typescript
if (nivelDoTanque >= nivelMinimo) {
  console.log("Operação permitida.");
} else {
  console.log("Nível insuficiente.");
}
```

Exatamente um dos dois blocos será executado.

## 7. `else if`

```typescript
if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 7) {
  console.log("Aprovado");
} else {
  console.log("Revisão necessária");
}
```

Teste primeiro a condição mais restritiva. Se `nota >= 7` viesse antes, uma nota 9 entraria nesse bloco e a faixa “Excelente” nunca seria alcançada.

## 8. Condicional aninhada

```typescript
if (maquinaLigada) {
  if (protecaoFechada) {
    console.log("Máquina pronta.");
  } else {
    console.log("Feche a proteção.");
  }
} else {
  console.log("Máquina desligada.");
}
```

O aninhamento é adequado quando a segunda decisão só existe dentro da primeira. Evite muitos níveis.

## 9. Ternário

```typescript
const resultado = condicao ? valorSeVerdadeiro : valorSeFalso;
```

Exemplo:

```typescript
const temperatura = 70;
const estado = temperatura <= 75 ? "Normal" : "Alerta";
```

Não encadeie vários ternários nesta fase; um `if / else if / else` será mais legível.

## 10. `switch`

```typescript
switch (valor) {
  case alternativaA:
    // instruções
    break;
  case alternativaB:
    // instruções
    break;
  default:
    // nenhuma alternativa correspondeu
}
```

Use `switch` quando uma mesma expressão for comparada com valores exatos. Para intervalos como “temperatura maior que 80”, prefira `if`.

## 11. Truthy e falsy

```typescript
const identificacao = "PX-10";

if (identificacao) {
  console.log("Identificação disponível.");
}
```

Uma condição explícita pode ser mais clara:

```typescript
if (identificacao !== "") {
  console.log("Identificação disponível.");
}
```

## 12. `??` e `?.`

```typescript
const observacao: null = null;
const observacaoExibida = observacao ?? "Sem observação";

const codigo = "PX-10";
const tamanhoDoCodigo = codigo?.length;
```

`??` substitui apenas `null` e `undefined`. `?.` interrompe o acesso quando o valor anterior é nulo ou indefinido.

## 13. Escopo dos blocos

Nomes declarados dentro de uma condicional pertencem ao bloco:

```typescript
const temperatura = 95;

if (temperatura > 90) {
  const mensagemDeAlerta = "Temperatura crítica";
  console.log(mensagemDeAlerta);
}
```

`mensagemDeAlerta` não pode ser usada fora das chaves.

## Checklist de escolha

| Situação | Ferramenta indicada |
|---|---|
| Produzir um cálculo | operador aritmético |
| Atualizar uma variável | atribuição composta |
| Comparar dois valores | `===`, `!==`, `<`, `>`, `<=`, `>=` |
| Combinar condições | `&&`, `\|\|`, `!` |
| Executar algo quando verdadeiro | `if` |
| Escolher entre dois caminhos | `if/else` |
| Classificar faixas | `if/else if/else` |
| Escolher um de dois valores simples | ternário |
| Comparar um valor com opções exatas | `switch` |
| Substituir apenas ausência | `??` |
