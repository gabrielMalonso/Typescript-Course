# Gabarito — Prova Capítulo 07: Objetos

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

## Parte 1 — Teoria (4 pontos)

### Questão 1 (1 ponto)

- O array organiza valores pela posição; o objeto organiza valores pelo nome da propriedade.
- No array, o código estaria em `lista[1]`; no objeto, em `ficha.codigo`.
- `ficha` não é array porque o critério de acesso é o nome do campo, não um índice ordenado.

| Critério | Pontos |
|---|---:|
| Critério de organização | 0,35 |
| Leitura do código | 0,35 |
| Por que não é array | 0,30 |

### Questão 2 (1 ponto)

- `const` impede reatribuir a variável, não alterar propriedades.
- `sensor.valor` passa a `25`, porque `outro` e `sensor` apontam para o mesmo objeto.
- `outro === sensor` é `true`.
- Reatribuir `sensor` seria rejeitado; alterar `valor` é permitido.

| Critério | Pontos |
|---|---:|
| Papel do `const` | 0,25 |
| Efeito em `sensor.valor` | 0,25 |
| Comparação de referência | 0,25 |
| Operação rejeitada | 0,25 |

### Questão 3 (1 ponto)

- `alerta.codigo` é `undefined` porque a propriedade opcional não foi informada.
- `alerta.mensagem` e `alerta[campo]` leem a mesma propriedade `"mensagem"`.
- `alerta.campo` procuraria uma chave literalmente chamada `campo`.
- `??` serve para fornecer um fallback quando `codigo` está ausente.

| Critério | Pontos |
|---|---:|
| Valor de `codigo` | 0,25 |
| Ponto versus colchetes | 0,25 |
| `alerta.campo` | 0,25 |
| Uso de `??` | 0,25 |

### Questão 4 (1 ponto)

- `produto.preco` permanece `20`.
- A propriedade à direita no literal substitui a copiada por spread.
- `nome` guarda a string `"Broca"`.
- `promocao` é um objeto; `nome` é uma propriedade extraída, do tipo `string`.

| Critério | Pontos |
|---|---:|
| Original preservado | 0,25 |
| Substituição no spread | 0,25 |
| Valor de `nome` | 0,20 |
| Objeto versus propriedade | 0,30 |

## Parte 2 — Prática (6 pontos)

### Questão 5 (1 ponto)

```typescript
const pedido: {
  cliente: string;
  total: number;
  pago: boolean;
} = {
  cliente: "Marina",
  total: 85,
  pago: false,
};

console.log(pedido.cliente);
console.log(pedido.total);
console.log(pedido.pago);

pedido.pago = true;
console.log(pedido.pago);

// pedido é o objeto; pedido.total é number
```

| Critério | Pontos |
|---|---:|
| Tipo e valores iniciais | 0,40 |
| Mutação de `pago` | 0,30 |
| Comentário objeto vs propriedade | 0,30 |

### Questão 6 (1,5 ponto)

```typescript
function criarLinha(item: {
  titulo: string;
  local: { sala: string };
  nota?: string;
}): string {
  const {
    titulo,
    local: { sala },
    nota = "sem nota",
  } = item;

  return `${titulo} | ${sala} | ${nota}`;
}

console.log(
  criarLinha({
    titulo: "Reunião",
    local: { sala: "Sala 2" },
  }),
);

console.log(
  criarLinha({
    titulo: "Reunião",
    local: { sala: "Sala 2" },
    nota: "levar cabo",
  }),
);
```

Leitura `item.local.sala` e `item.nota ?? "sem nota"` também é aceita.

| Critério | Pontos |
|---|---:|
| Contrato e destructuring/leitura | 0,50 |
| Fallback da nota ausente | 0,50 |
| Segunda saída com nota | 0,50 |

### Questão 7 (1,5 ponto)

```typescript
const tanque = {
  volume: 10,
  abastecer(litros: number): number {
    if (litros > 0) {
      this.volume += litros;

      if (this.volume > 50) {
        this.volume = 50;
      }
    }

    return this.volume;
  },
};

console.log(tanque.abastecer(30));
console.log(tanque.abastecer(-4));
console.log(tanque.abastecer(20));
```

| Critério | Pontos |
|---|---:|
| Ignora `litros <= 0` | 0,50 |
| Limite `50` | 0,60 |
| Saídas `40`, `40`, `50` | 0,40 |

Não descontar se o aluno limitar com `Math.min` equivalente.

### Questão 8 (2 pontos)

```typescript
const pecas: {
  nome: string;
  quantidade: number;
  preco: number;
  ativa: boolean;
}[] = [
  { nome: "Parafuso", quantidade: 10, preco: 0.5, ativa: true },
  { nome: "Porca", quantidade: 0, preco: 0.3, ativa: true },
  { nome: "Arruela", quantidade: 4, preco: 0.2, ativa: false },
  { nome: "Broca", quantidade: 2, preco: 8, ativa: true },
];

function ehValida(item: { quantidade: number; ativa: boolean }): boolean {
  return item.ativa === true && item.quantidade > 0;
}

function somarQuantidadesValidas(
  itens: { quantidade: number; ativa: boolean }[],
): number {
  let total = 0;

  for (const item of itens) {
    if (!ehValida(item)) {
      continue;
    }

    total += item.quantidade;
  }

  return total;
}

function calcularTotal(
  itens: { quantidade: number; preco: number; ativa: boolean }[],
): number {
  let total = 0;

  for (const item of itens) {
    if (!ehValida(item)) {
      continue;
    }

    total += item.quantidade * item.preco;
  }

  return total;
}

const criarResumo = function (quantidade: number, total: number): string {
  return `Peças: ${quantidade} | Total: ${total}`;
};

const quantidade = somarQuantidadesValidas(pecas);
const total = calcularTotal(pecas);
console.log(criarResumo(quantidade, total));

const quantidadeVazia = somarQuantidadesValidas([]);
const totalVazio = calcularTotal([]);
console.log(criarResumo(quantidadeVazia, totalVazio));
```

A função auxiliar `ehValida` não é obrigatória.

| Critério | Pontos |
|---|---:|
| Filtro `ativa` e `quantidade > 0` | 0,70 |
| Total `21` sem mutar o array | 0,50 |
| `criarResumo` retorna string | 0,30 |
| Array vazio | 0,50 |

## Observações de correção

- Capitalização, pontuação e rótulos equivalentes não geram desconto.
- Descontar se a regra geral for substituída pela amostra: aceitar inativos, somar quantidade zero ou ignorar o teto `50`.
- Descontar se spread for pedido e o original for mutado, ou se o tipo do objeto for descrito só pelo tipo de uma propriedade.
