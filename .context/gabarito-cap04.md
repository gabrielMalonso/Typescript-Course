# Gabarito — Prova Capítulo 04: Estruturas de Repetição

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

## Parte 1 — Teoria (4 pontos)

### Questão 1 (1 ponto)

Saída:

```text
1
2
4
5
```

Quatro iterações chegam ao `console.log`. Em `3`, `continue` pula o restante da iteração e o loop prossegue. Em `6`, `break` encerra o loop; por isso `6`, `7` e `8` não são exibidos.

| Critério | Pontos |
|---|---:|
| Números e quantidade corretos | 0,40 |
| Explicação de `continue` | 0,30 |
| Explicação de `break` | 0,30 |

### Questão 2 (1 ponto)

1. `for`: início, limite e passo conhecidos;
2. `while`: testa antes e pode executar zero vezes;
3. `do...while`: executa uma vez antes do teste.

| Critério | Pontos |
|---|---:|
| Cada escolha com justificativa adequada | 0,30 × 3 |
| Clareza das justificativas | 0,10 |

### Questão 3 (1 ponto)

1. V;
2. F — `do...while` testa depois da primeira execução;
3. F — `break` encerra somente o loop mais próximo;
4. V.

**Critério:** 0,25 por classificação correta, com justificativa adequada nas falsas.

### Questão 4 (1 ponto)

A resposta deve reconhecer:

- qual condição mantém o loop ativo e como ela pode se tornar falsa;
- qual variável de controle é atualizada;
- se a atualização move o valor na direção necessária para alcançar o término.

| Critério | Pontos |
|---|---:|
| Condição e término | 0,35 |
| Atualização identificada | 0,30 |
| Direção compatível com o limite | 0,35 |

## Parte 2 — Prática (6 pontos)

### Questão 5 (1,5 ponto)

O loop não termina porque a condição aceita valores maiores ou iguais a zero, enquanto `contador++` aumenta o valor. A condição `contador >= 0` está correta para uma contagem regressiva inclusiva; a atualização deve usar `--`.

```typescript
let contador = 3;

while (contador >= 0) {
  console.log(contador);
  contador--;
}

console.log("Fim");
```

| Critério | Pontos |
|---|---:|
| Identifica a incompatibilidade entre condição e atualização | 0,35 |
| Reconhece que a condição inclusiva está correta | 0,20 |
| Corrige para `contador--` | 0,30 |
| Estrutura e saída completas | 0,35 |
| Compila e termina | 0,30 |

### Questão 6 (2 pontos)

```typescript
let soma = 0;
let ultimoNumeroSomado = 0;

for (let numero = 1; numero <= 15; numero++) {
  const numeroPar = numero % 2 === 0;

  if (numeroPar) {
    continue;
  }

  soma += numero;
  ultimoNumeroSomado = numero;
  console.log(`Número somado: ${numero}`);

  if (soma >= 36) {
    break;
  }
}

console.log(`Soma final: ${soma}`);
console.log(`Último número: ${ultimoNumeroSomado}`);
```

| Critério | Pontos |
|---|---:|
| `for` com limites corretos | 0,30 |
| Identificação dos pares | 0,25 |
| `continue` no lugar correto | 0,30 |
| Acumulador e último número | 0,40 |
| `break` depois de atingir a meta | 0,30 |
| Compila e produz a saída | 0,45 |

### Questão 7 (2,5 pontos)

```typescript
const totalDeSetores = 3;
const assentosPorSetor = 4;
const setorBloqueado = 2;
const assentoBloqueado = 2;
const limiteDeIngressos = 6;

let ingressosEmitidos = 0;
let emissaoEncerrada = false;

for (let setor = 1; setor <= totalDeSetores; setor++) {
  for (let assento = 1; assento <= assentosPorSetor; assento++) {
    const posicaoBloqueada =
      setor === setorBloqueado && assento === assentoBloqueado;

    if (posicaoBloqueada) {
      console.log(`S${setor}-A${assento} bloqueado`);
      continue;
    }

    ingressosEmitidos++;
    console.log(`Ingresso S${setor}-A${assento}`);

    if (ingressosEmitidos >= limiteDeIngressos) {
      emissaoEncerrada = true;
      console.log("Limite atingido.");
      break;
    }
  }

  if (emissaoEncerrada) {
    break;
  }
}

console.log(`Total emitido: ${ingressosEmitidos}`);
console.log(`Emissão encerrada: ${emissaoEncerrada}`);
```

| Critério | Pontos |
|---|---:|
| Dados e estados iniciais | 0,25 |
| Loops e limites inclusivos | 0,40 |
| Posição bloqueada com `&&` | 0,25 |
| `continue` sem contar bloqueio | 0,30 |
| Contagem e saída por ingresso | 0,30 |
| Encerramento dos dois loops | 0,45 |
| Compila e produz a saída completa | 0,55 |

## Resumo

| Parte | Pontuação |
|---|---:|
| Teoria | 4,0 |
| Prática | 6,0 |
| **Total** | **10,0** |

Aplicar crédito parcial por conceito correto. Diferenças cosméticas não devem dominar a avaliação, salvo quando ocultarem uma regra, uma linha funcional ou um caminho não testado.
