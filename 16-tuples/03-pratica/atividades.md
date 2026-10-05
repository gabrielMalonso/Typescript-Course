# Prática — Tuples

Use o Pad ou arquivos TypeScript para suas tentativas. Trabalhe com os tipos diretamente nas assinaturas; não é necessário criar aliases, interfaces ou casts. Envie uma atividade por vez com os testes e uma explicação curta.

### 1. Uma busca, duas informações

Implemente uma busca linear com esta assinatura:

```ts
function buscarComContagem(
  numeros: number[],
  alvo: number,
): readonly [indice: number, comparacoes: number]
```

Receba um array denso de números finitos e retorne o índice da **primeira** ocorrência, ou `-1` quando o alvo não existir. A segunda posição conta quantas comparações entre um elemento e o alvo foram feitas. Não conte a condição do loop. Preserve a entrada e termine assim que encontrar o alvo.

| Entrada | Alvo | Retorno |
|---|---|---|
| `[]` | `7` | `[-1, 0]` |
| `[7]` | `7` | `[0, 1]` |
| `[7]` | `2` | `[-1, 1]` |
| `[4, 7, 7, 9]` | `7` | `[1, 2]` |
| `[4, 7, 7, 9]` | `9` | `[3, 4]` |
| `[4, 7, 7, 9]` | `2` | `[-1, 4]` |

Use destructuring em uma chamada para exibir os dois resultados. Justifique brevemente tempo de pior caso e espaço auxiliar: retornar duas informações mudou o crescimento da busca? Para uma API que você fosse manter, escolheria esse par ou `{ indice: number; comparacoes: number }`? Dê uma razão de legibilidade.

[Retomar posições e retornos](../02-aulas-do-curso/01-posicoes-e-retornos.md)

### 2. Coordenadas com uma dimensão opcional

Um ponto pode chegar com `[x, y]` ou `[x, y, z]`. Quando `z` faltar, considere seu valor igual a zero. Implemente:

```ts
function deslocarPonto(
  ponto: readonly [x: number, y: number, z?: number],
  deslocamento: readonly [dx: number, dy: number, dz: number],
): readonly [x: number, y: number, z: number]
```

Some cada coordenada ao deslocamento correspondente e retorne **um novo array**, sempre com três números. Preserve as duas entradas. Os números são inteiros pequenos; não é necessária validação de dados externos.

Confira `[2, 3]` com `[1, -2, 4] → [3, 1, 4]`, `[2, 3, 5]` com o mesmo deslocamento `→ [3, 1, 9]` e `[0, 0, 0]` com `[0, 0, 0] → [0, 0, 0]`. Passe ao menos um ponto declarado `readonly` e compare a entrada antes e depois da chamada.

Ao terminar, descomente temporariamente uma tentativa de alterar uma posição do resultado e observe o erro do editor. Explique em uma frase por que o retorno tem três posições obrigatórias, embora a entrada permita somente duas. A convenção `[x, y, z]` está clara o suficiente aqui ou você preferiria propriedades nomeadas?

[Retomar opcionais e readonly](../02-aulas-do-curso/02-opcionais-readonly-e-modelagem.md)

[Voltar ao guia — etapa 4](../README.md#etapa-4)
