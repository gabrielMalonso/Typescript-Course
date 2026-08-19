# Prova — Capítulo 07: Objetos

> **PROVA PREPARADA, MAS AINDA NÃO LIBERADA.**
>
> Realize somente depois de concluir a aula, o mini-projeto, a lista e receber a liberação do professor.

## Informações

- **Duração sugerida:** 75–90 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos
- **Composição:** 4 pontos de teoria e 6 pontos de prática

## Orientações

- Use somente conteúdos estudados até este capítulo.
- Declare tipos inline quando o enunciado pedir forma explícita.
- Não use `type`, `interface`, classes, callbacks ou métodos avançados de arrays.
- Não altere este enunciado.
- Compile, execute e teste exatamente os arquivos entregues.

## Arquivos obrigatórios

| Arquivo | Conteúdo |
|---|---|
| `resposta.md` | Questões 1 a 4 |
| `questao05.ts` | Questão 5 |
| `questao06.ts` | Questão 6 |
| `questao07.ts` | Questão 7 |
| `questao08.ts` | Questão 8 |

Todos devem ficar em `07-objetos/avaliacao/`.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1 — Array ou objeto (1 ponto)

Compare:

```typescript
const lista = ["Paquímetro", 17, true];
const ficha = {
  nome: "Paquímetro",
  codigo: 17,
  ativo: true,
};
```

Explique:

1. o critério de organização de cada estrutura;
2. como ler o código do equipamento em cada uma;
3. por que `ficha` não é um array, mesmo reunindo vários valores.

### Questão 2 — `const`, mutação e referência (1 ponto)

Analise:

```typescript
const sensor = {
  nome: "Temperatura",
  valor: 21,
};

const outro = sensor;
outro.valor = 25;
```

Explique:

1. por que `const` permite `outro.valor = 25`;
2. o que acontece com `sensor.valor`;
3. o resultado conceitual de `outro === sensor`;
4. qual operação seria rejeitada: alterar `valor` ou reatribuir `sensor`.

### Questão 3 — Opcional, ponto e colchetes (1 ponto)

Considere:

```typescript
const alerta: {
  mensagem: string;
  codigo?: number;
} = {
  mensagem: "falha",
};

const campo = "mensagem";
```

Explique:

1. o que `alerta.codigo` vale imediatamente após a criação;
2. a diferença entre `alerta.mensagem` e `alerta[campo]`;
3. o que `alerta.campo` procuraria;
4. quando `??` seria útil neste objeto.

### Questão 4 — Spread e destructuring (1 ponto)

Compare:

```typescript
const produto = {
  nome: "Broca",
  preco: 20,
};

const promocao = {
  ...produto,
  preco: 16,
};

const { nome } = produto;
```

Explique:

1. se `produto.preco` muda depois da criação de `promocao`;
2. por que `preco: 16` substitui o valor copiado;
3. o que a variável `nome` guarda;
4. a diferença entre `promocao` e `nome` quanto ao tipo conceitual: objeto completo ou propriedade extraída.

---

## Parte 2 — Prática (6 pontos)

### Questão 5 — Ficha e acesso (1 ponto)

Crie `questao05.ts`.

1. Declare `pedido` com tipo `{ cliente: string; total: number; pago: boolean }`.
2. Use `"Marina"`, `85` e `false`.
3. Exiba as três propriedades.
4. Marque `pago` como `true` e exiba de novo somente esse campo.
5. Em comentário, identifique o objeto e o tipo de `pedido.total`.

### Questão 6 — Aninhado, opcional e função (1,5 ponto)

Crie `questao06.ts` com:

```typescript
function criarLinha(item: {
  titulo: string;
  local: { sala: string };
  nota?: string;
}): string
```

Use destructuring no parâmetro, incluindo o objeto aninhado ou a leitura `local.sala`. A string devolvida deve seguir `Reunião | Sala 2 | sem nota` quando a nota estiver ausente.

Teste:

- `{ titulo: "Reunião", local: { sala: "Sala 2" } }`;
- o mesmo objeto com `nota: "levar cabo"`.

A segunda saída deve ser `Reunião | Sala 2 | levar cabo`.

### Questão 7 — Método e limite (1,5 ponto)

Crie `questao07.ts` com um objeto `tanque`:

- `volume: 10`
- método `abastecer(litros: number): number`

Regras do método:

- some `litros` somente quando `litros > 0`;
- não deixe o volume ultrapassar `50`;
- devolva o volume resultante.

Teste `abastecer(30)`, `abastecer(-4)` e `abastecer(20)`. Exiba os três retornos.

Saída conceitual:

```text
40
40
50
```

O terceiro teste precisa da proteção do limite `50`, não apenas da soma dos exemplos.

### Questão 8 — Lista de fichas (2 pontos)

Crie `questao08.ts` com:

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
```

Crie:

```typescript
function somarQuantidadesValidas(itens: { quantidade: number; ativa: boolean }[]): number
function calcularTotal(itens: { quantidade: number; preco: number; ativa: boolean }[]): number
const criarResumo = function (
  quantidade: number,
  total: number,
): string {
  // retorne a string solicitada
}
```

Regras:

- válidas são peças com `ativa === true` e `quantidade > 0`;
- `calcularTotal` soma `quantidade * preco` somente das peças válidas;
- as duas primeiras funções usam loops e não alteram o array;
- `criarResumo` retorna, sem exibir, `Peças: 12 | Total: 21`;
- o programa principal chama as três funções e exibe o resumo.

O total esperado com os dados acima é `10 * 0.5 + 2 * 8 = 21`. `Porca` entra na lista, mas não na soma, porque a quantidade não é maior que `0`. `Arruela` não entra porque está inativa.

Depois, teste com um array vazio e exiba:

```text
Peças: 0 | Total: 0
```

## Checklist final

- [ ] Entreguei os cinco arquivos obrigatórios.
- [ ] Não alterei `prova.md`.
- [ ] Diferenciei objeto, propriedade, referência e cópia.
- [ ] Protegi limites numéricos com a regra geral, não só com a amostra.
- [ ] Testei ausência de nota, valores inválidos e array vazio quando pedido.
- [ ] Compilei e executei os quatro arquivos TypeScript.
