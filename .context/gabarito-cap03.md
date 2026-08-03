# Gabarito — Prova Capítulo 03: Operadores e Estruturas Condicionais

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

## Parte 1 — Teoria (4 pontos)

### Questão 1 (1 ponto)

- `resultadoA = 18`;
- `resultadoB = 50`;
- `resto = 2`.

Multiplicação tem precedência sobre soma; os parênteses antecipam a soma.

| Critério | Pontos |
|---|---:|
| Três valores corretos | 0,60 |
| Explicação da precedência | 0,40 |

### Questão 2 (1 ponto)

1. atribuição;
2. comparação estrita de igualdade;
3. comparação estrita de diferença;
4. comparação relacional.

Preferimos `===` porque ele não converte tipos implicitamente antes de comparar.

| Critério | Pontos |
|---|---:|
| Quatro classificações | 0,60 |
| Explicação de `===` | 0,40 |

### Questão 3 (1 ponto)

`temperaturaSegura || modoManual` resulta em `true`; depois, `sensorAtivo && true` também resulta em `true`.

| Critério | Pontos |
|---|---:|
| Resultado correto | 0,40 |
| Avaliação interna | 0,30 |
| Avaliação externa | 0,30 |

### Questão 4 (1 ponto)

1. V;
2. F — uma string não vazia é truthy;
3. V;
4. F — apenas o primeiro bloco verdadeiro é executado.

**Critério:** 0,25 por classificação correta com justificativa adequada nas falsas.

## Parte 2 — Prática (6 pontos)

### Questão 5 (1,5 ponto)

`=` realiza atribuição. `===` exigiria exatamente 100, mas a regra aceita qualquer carga menor ou igual ao limite. Correção:

```typescript
const cargaAtual = 80;
const cargaLimite = 100;
const dentroDoLimite = cargaAtual <= cargaLimite;

if (dentroDoLimite) {
  console.log("Carga aprovada.");
} else {
  console.log("Carga rejeitada.");
}
```

| Critério | Pontos |
|---|---:|
| Identifica atribuição indevida | 0,35 |
| Explica a insuficiência de `===` | 0,35 |
| Usa `<=` | 0,30 |
| Estrutura condicional correta | 0,25 |
| Compila e produz a saída | 0,25 |

### Questão 6 (2 pontos)

```typescript
const vibracaoAtual = 6.8;
const limiteCritico = 8;
const margemAteCritica = limiteCritico - vibracaoAtual;

let classificacao = "";

if (vibracaoAtual > limiteCritico) {
  classificacao = "CRÍTICA";
} else if (vibracaoAtual >= 6) {
  classificacao = "ATENÇÃO";
} else {
  classificacao = "NORMAL";
}

const exigeInspecao = vibracaoAtual >= 6 ? "sim" : "não";

console.log(`=== ANÁLISE DE VIBRAÇÃO ===`);
console.log(`Classificação: ${classificacao}`);
console.log(`Margem até crítica: ${margemAteCritica} mm/s`);
console.log(`Exige inspeção: ${exigeInspecao}`);
```

| Critério | Pontos |
|---|---:|
| Dados e cálculo | 0,35 |
| Ordem e limites das faixas | 0,60 |
| Ternário correto | 0,30 |
| Template literals | 0,20 |
| Compila e executa | 0,20 |
| Saída completa | 0,35 |

### Questão 7 (2,5 pontos)

```typescript
const codigoDaLinha = "L-04";
const temperaturaAtual = 73;
const temperaturaMaxima = 75;
const pressaoAtual = 8.2;
const pressaoMinima = 5;
const pressaoMaxima = 8.5;
const protecaoFechada = true;
const paradaDeEmergencia = false;
const turno: string = "N";
const nomeDoSupervisor: undefined = undefined;

const temperaturaSegura = temperaturaAtual <= temperaturaMaxima;
const pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const linhaLiberada = temperaturaSegura && pressaoSegura && protecaoFechada && !paradaDeEmergencia;
const margemDeTemperatura = temperaturaMaxima - temperaturaAtual;

let estadoDaLinha = "";
let nomeDoTurno = "";

if (linhaLiberada) {
  estadoDaLinha = "LINHA LIBERADA";
} else {
  estadoDaLinha = "LINHA BLOQUEADA";
}

switch (turno) {
  case "M":
    nomeDoTurno = "Manhã";
    break;
  case "T":
    nomeDoTurno = "Tarde";
    break;
  case "N":
    nomeDoTurno = "Noite";
    break;
  default:
    nomeDoTurno = "Inválido";
}

const supervisorExibido = nomeDoSupervisor ?? "Não informado";

console.log(`=== LINHA ${codigoDaLinha} ===`);
console.log(`Estado: ${estadoDaLinha}`);
console.log(`Turno: ${nomeDoTurno}`);
console.log(`Margem de temperatura: ${margemDeTemperatura} °C`);
console.log(`Supervisor: ${supervisorExibido}`);
```

| Critério | Pontos |
|---|---:|
| Dados e cálculo | 0,30 |
| Condições menores | 0,40 |
| Condição integrada | 0,35 |
| `if/else` | 0,25 |
| `switch` completo | 0,40 |
| `??` | 0,20 |
| Compila e executa | 0,20 |
| Saída completa | 0,40 |

## Resumo

| Parte | Pontuação |
|---|---:|
| Teoria | 4,0 |
| Prática | 6,0 |
| **Total** | **10,0** |

Aplicar crédito parcial por conceito correto. Diferenças cosméticas não devem dominar a avaliação, salvo quando ocultarem uma regra, uma linha obrigatória ou um caminho não testado.
