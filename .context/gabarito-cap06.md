# Gabarito — Prova Capítulo 06: Funções — Fundamentos

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

## Parte 1 — Teoria (4 pontos)

### Questão 1 (1 ponto)

- A declaração completa iniciada por `function calcularDistancia` define a função.
- `calcularDistancia(80, 2)` executa a chamada.
- Parâmetros: `velocidade` e `tempo`.
- Argumentos: `80` e `2`.
- `distancia` vale `160` e possui tipo `number`.

| Critério | Pontos |
|---|---:|
| Definição e chamada | 0,25 |
| Parâmetros | 0,20 |
| Argumentos | 0,20 |
| Valor e tipo | 0,35 |

### Questão 2 (1 ponto)

`criarMensagem` devolve uma `string`, que pode ser guardada e reutilizada. `exibirMensagem` produz um efeito no terminal e não devolve valor útil; `void` é apropriado quando esse efeito é a responsabilidade da função. `console.log` não substitui `return` quando outra parte do programa precisa do resultado.

| Critério | Pontos |
|---|---:|
| Diferencia retorno e exibição | 0,40 |
| Identifica a função que fornece `string` | 0,25 |
| Explica `void` | 0,35 |

### Questão 3 (1 ponto)

- `itemA` guarda a própria função, com tipo `(valor: number) => number`.
- `itemB` guarda o número `14`.
- `itemA(4)` resulta em `8`.
- Os parênteses executam a função; sem eles, a referência à função é usada como valor.

| Critério | Pontos |
|---|---:|
| `itemA` e seu tipo | 0,30 |
| `itemB` e seu tipo/valor | 0,25 |
| Resultado `8` | 0,15 |
| Papel dos parênteses | 0,30 |

### Questão 4 (1 ponto)

Quando `nivel < 5`, a condição é falsa e a função chega ao fim sem devolver uma `string`. Uma correção possível:

```typescript
function classificarNivel(nivel: number): string {
  if (nivel >= 5) {
    return "alto";
  }

  return "baixo";
}
```

| Critério | Pontos |
|---|---:|
| Identifica o caminho sem retorno | 0,40 |
| Relaciona ao contrato `string` | 0,25 |
| Corrige todos os caminhos | 0,35 |

## Parte 2 — Prática (6 pontos)

### Questão 5 (1 ponto)

```typescript
function converterHorasParaMinutos(horas: number): number {
  return horas * 60;
}

const criarEtiqueta = (minutos: number): string => `Duração: ${minutos} minutos`;

const minutosA = converterHorasParaMinutos(2.5);
const minutosB = converterHorasParaMinutos(0);

console.log(criarEtiqueta(minutosA));
console.log(criarEtiqueta(minutosB));
```

| Critério | Pontos |
|---|---:|
| Declaração e contrato da conversão | 0,25 |
| Arrow concisa e contrato da etiqueta | 0,25 |
| Composição e duas saídas | 0,25 |
| Compila e executa | 0,25 |

### Questão 6 (1,5 ponto)

```typescript
function classificarCarga(percentual: number): string {
  if (percentual < 40) {
    return "leve";
  }

  if (percentual <= 75) {
    return "moderada";
  }

  return "alta";
}

function exibirCarga(percentual: number, classificacao: string): void {
  console.log(`Carga ${percentual}%: ${classificacao}`);
}

const percentuais: number[] = [25, 40, 75, 90];

for (const percentual of percentuais) {
  const classificacao = classificarCarga(percentual);
  exibirCarga(percentual, classificacao);
}
```

| Critério | Pontos |
|---|---:|
| Contratos corretos | 0,25 |
| Três faixas e limites | 0,45 |
| Separação cálculo/exibição | 0,25 |
| Quatro testes e saídas | 0,25 |
| Compila e executa | 0,30 |

### Questão 7 (1,5 ponto)

```typescript
function calcularMetade(valor: number): number {
  return valor / 2;
}

const operacao: (entrada: number) => number = calcularMetade;

console.log(operacao(20));
console.log(operacao(7));
console.log(operacao === calcularMetade);

// calcularMetade é a função; calcularMetade(20) é a chamada e resulta em 10.
```

| Critério | Pontos |
|---|---:|
| Tipo explícito correto | 0,30 |
| Guarda sem chamada | 0,25 |
| Resultados `10` e `3.5` | 0,25 |
| Comparação `true` | 0,15 |
| Explicação | 0,25 |
| Compila e executa | 0,30 |

### Questão 8 (2 pontos)

```typescript
const medicoes: number[] = [14, 0, 22, 18, 0, 26];

function somarMedicoesValidas(valores: number[]): number {
  let total = 0;

  for (const valor of valores) {
    if (valor > 0) {
      total += valor;
    }
  }

  return total;
}

function contarMedicoesValidas(valores: number[]): number {
  let quantidade = 0;

  for (const valor of valores) {
    if (valor > 0) {
      quantidade++;
    }
  }

  return quantidade;
}

const calcularMedia = (total: number, quantidade: number): number => {
  if (quantidade === 0) {
    return 0;
  }

  return total / quantidade;
};

const criarResumo = function (
  total: number,
  quantidade: number,
  media: number,
): string {
  return `Total: ${total} | Quantidade: ${quantidade} | Média: ${media}`;
};

function processar(valores: number[]): void {
  const total = somarMedicoesValidas(valores);
  const quantidade = contarMedicoesValidas(valores);
  const media = calcularMedia(total, quantidade);
  console.log(criarResumo(total, quantidade, media));
}

processar(medicoes);
processar([]);
```

`processar` é apenas uma possibilidade; chamadas diretas no programa principal também atendem.

| Critério | Pontos |
|---|---:|
| Soma com loop e valores válidos | 0,35 |
| Contagem com loop e valores válidos | 0,35 |
| Média e proteção da divisão | 0,30 |
| Expressão de função retorna resumo | 0,25 |
| Composição no programa principal | 0,25 |
| Caso principal e vazio | 0,20 |
| Não altera os arrays | 0,10 |
| Compila e executa | 0,20 |

## Resumo

| Parte | Pontuação |
|---|---:|
| Teoria | 4,0 |
| Prática | 6,0 |
| **Total** | **10,0** |

Aplicar crédito parcial por domínio conceitual. Diferenças cosméticas não devem dominar a avaliação, salvo quando ocultarem uma saída, caminho ou requisito funcional.
