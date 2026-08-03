# Mini-Projeto: Painel de Operação de uma Bomba

## Objetivo

Construir um painel que calcule a vazão média de uma bomba e decida seu estado operacional a partir de pressão, temperatura, nível do reservatório e disponibilidade do sensor.

## Saída esperada

```text
=== PAINEL DA BOMBA B-17 ===
Vazão média: 42 L/min
Faixa de pressão: 3 bar
Estado: OPERAÇÃO NORMAL
Ação: manter monitoramento
Sensor: disponível
```

## Conceitos aplicados

- aritmética e precedência;
- comparações e condições compostas;
- `&&`, `||` e `!`;
- `if / else if / else`;
- operador ternário;
- nullish coalescing `??`;
- template literals.

## Requisitos obrigatórios

- [ ] Crie `painel-bomba.ts`.
- [ ] `codigoDaBomba` deve ser `"B-17"`.
- [ ] As vazões `38`, `42` e `46` devem ser declaradas separadamente.
- [ ] Calcule `vazaoMedia` somando as três vazões e dividindo por `3`.
- [ ] `pressaoMinima` deve ser `4.5` e `pressaoMaxima` deve ser `7.5`.
- [ ] Calcule `faixaDePressao` por subtração.
- [ ] `pressaoAtual` deve ser `6.2`, `temperaturaAtual` deve ser `68` e `nivelDoReservatorio` deve ser `55`.
- [ ] `sensorIndisponivel` deve ser `false`.
- [ ] `observacaoDoOperador` deve ter o tipo e o valor `undefined`.
- [ ] Crie `pressaoSegura`: atual entre mínima e máxima, inclusive.
- [ ] Crie `temperaturaSegura`: temperatura menor ou igual a `75`.
- [ ] Crie `nivelSeguro`: nível maior ou igual a `30`.
- [ ] Crie `operacaoSegura` combinando as três condições e negando `sensorIndisponivel`.
- [ ] Use `if / else if / else` para definir `estadoDaBomba` e `acaoRecomendada`.
- [ ] Se tudo estiver seguro: estado `OPERAÇÃO NORMAL` e ação `manter monitoramento`.
- [ ] Se o nível estiver abaixo de 30: estado `PARADA PREVENTIVA` e ação `reabastecer reservatório`.
- [ ] Nos demais casos: estado `ATENÇÃO` e ação `verificar parâmetros`.
- [ ] Use um ternário para criar `estadoDoSensor`: `indisponível` ou `disponível`.
- [ ] Use `??` para criar `observacaoExibida` com o padrão `Sem observação`.
- [ ] Produza as seis linhas da saída esperada com template literals.
- [ ] Exiba também `Observação: Sem observação` apenas no desafio de expansão 1.

## Antes de programar

Transforme as regras em um diagrama:

```text
pressão segura E temperatura segura E nível seguro E sensor disponível?
                 │
       ┌─────────┴─────────┐
      SIM                 NÃO
       │                   │
 operação normal      nível < 30?
                    ┌──────┴──────┐
                   SIM           NÃO
                    │             │
             parada preventiva   atenção
```

## Passo 1: dados e cálculos

```typescript
const codigoDaBomba = "B-17";
const vazaoA = 38;
const vazaoB = 42;
const vazaoC = 46;
const vazaoMedia = (vazaoA + vazaoB + vazaoC) / 3;

const pressaoMinima = 4.5;
const pressaoMaxima = 7.5;
const faixaDePressao = pressaoMaxima - pressaoMinima;

const pressaoAtual = 6.2;
const temperaturaAtual = 68;
const nivelDoReservatorio = 55;
const sensorIndisponivel = false;
const observacaoDoOperador: undefined = undefined;
```

## Passo 2: condições menores

```typescript
const pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const temperaturaSegura = temperaturaAtual <= 75;
const nivelSeguro = nivelDoReservatorio >= 30;
```

Dar nomes às condições reduz a complexidade da regra final.

## Passo 3: condição integrada

```typescript
const operacaoSegura = pressaoSegura && temperaturaSegura && nivelSeguro && !sensorIndisponivel;
```

`!sensorIndisponivel` significa “o sensor não está indisponível”.

## Passo 4: decisão principal

Como os textos serão definidos dentro de caminhos diferentes e exibidos depois, declare-os com `let` antes da condicional:

```typescript
let estadoDaBomba = "";
let acaoRecomendada = "";

if (operacaoSegura) {
  estadoDaBomba = "OPERAÇÃO NORMAL";
  acaoRecomendada = "manter monitoramento";
} else if (nivelDoReservatorio < 30) {
  estadoDaBomba = "PARADA PREVENTIVA";
  acaoRecomendada = "reabastecer reservatório";
} else {
  estadoDaBomba = "ATENÇÃO";
  acaoRecomendada = "verificar parâmetros";
}
```

## Passo 5: escolhas simples

```typescript
const estadoDoSensor = sensorIndisponivel ? "indisponível" : "disponível";
const observacaoExibida = observacaoDoOperador ?? "Sem observação";
```

O primeiro caso escolhe entre dois textos com ternário. O segundo fornece um padrão apenas para ausência.

## Passo 6: saída

```typescript
console.log(`=== PAINEL DA BOMBA ${codigoDaBomba} ===`);
console.log(`Vazão média: ${vazaoMedia} L/min`);
console.log(`Faixa de pressão: ${faixaDePressao} bar`);
console.log(`Estado: ${estadoDaBomba}`);
console.log(`Ação: ${acaoRecomendada}`);
console.log(`Sensor: ${estadoDoSensor}`);
```

## Código final completo

Consulte somente depois de concluir sua primeira versão.

```typescript
const codigoDaBomba = "B-17";
const vazaoA = 38;
const vazaoB = 42;
const vazaoC = 46;
const vazaoMedia = (vazaoA + vazaoB + vazaoC) / 3;

const pressaoMinima = 4.5;
const pressaoMaxima = 7.5;
const faixaDePressao = pressaoMaxima - pressaoMinima;

const pressaoAtual = 6.2;
const temperaturaAtual = 68;
const nivelDoReservatorio = 55;
const sensorIndisponivel = false;
const observacaoDoOperador: undefined = undefined;

const pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const temperaturaSegura = temperaturaAtual <= 75;
const nivelSeguro = nivelDoReservatorio >= 30;
const operacaoSegura = pressaoSegura && temperaturaSegura && nivelSeguro && !sensorIndisponivel;

let estadoDaBomba = "";
let acaoRecomendada = "";

if (operacaoSegura) {
  estadoDaBomba = "OPERAÇÃO NORMAL";
  acaoRecomendada = "manter monitoramento";
} else if (nivelDoReservatorio < 30) {
  estadoDaBomba = "PARADA PREVENTIVA";
  acaoRecomendada = "reabastecer reservatório";
} else {
  estadoDaBomba = "ATENÇÃO";
  acaoRecomendada = "verificar parâmetros";
}

const estadoDoSensor = sensorIndisponivel ? "indisponível" : "disponível";
const observacaoExibida = observacaoDoOperador ?? "Sem observação";

console.log(`=== PAINEL DA BOMBA ${codigoDaBomba} ===`);
console.log(`Vazão média: ${vazaoMedia} L/min`);
console.log(`Faixa de pressão: ${faixaDePressao} bar`);
console.log(`Estado: ${estadoDaBomba}`);
console.log(`Ação: ${acaoRecomendada}`);
console.log(`Sensor: ${estadoDoSensor}`);
```

`observacaoExibida` é criado para praticar `??`, mas só será exibido na expansão seguinte.

## Testando cenários

Depois de validar o cenário principal, altere temporariamente um dado por vez:

| Alteração | Caminho esperado |
|---|---|
| `nivelDoReservatorio = 20` | parada preventiva |
| `temperaturaAtual = 82` | atenção |
| `sensorIndisponivel = true` | atenção |

Volte aos valores originais antes de encerrar.

## Desafios de expansão

1. Exiba `Observação: Sem observação` usando `observacaoExibida`.
2. Acrescente `modoDeOperacao = "automatico"` e use `switch` para exibir `Controle automático`, `Controle manual` ou `Modo inválido`.
3. Crie `prioridadeDaAcao` com ternário: `alta` quando o estado for `PARADA PREVENTIVA`; `normal` nos demais casos.
