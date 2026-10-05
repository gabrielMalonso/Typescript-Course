# Prática — Contratos e alternativas

Use o Pad ou arquivos TypeScript em modo estrito. Nas duas atividades, resolva com aliases, verificações e os recursos já estudados, sem casts. Envie uma tentativa por vez, com testes e uma explicação breve do modelo.

### 1. Leituras disponíveis e maior valor

Um sensor produz números ou o aviso `"sem-leitura"`. Crie o alias `Leitura` para essas alternativas e implemente uma função com o seguinte contrato:

```ts
// Assinatura a implementar:
// function maiorLeitura(leituras: Leitura[]): number | null
```

Percorra a entrada uma vez e devolva o maior número disponível. Ignore os avisos. Se não houver nenhum número, retorne `null`. A entrada é um array denso de números finitos ou do literal indicado; preserve o array. Não é necessária validação de dados externos.

| Entrada | Retorno |
|---|---|
| `[]` | `null` |
| `["sem-leitura", "sem-leitura"]` | `null` |
| `[0]` | `0` |
| `["sem-leitura", -8, -3, -5]` | `-3` |
| `[2, "sem-leitura", 7, 7, 1]` | `7` |

Use `typeof` para separar números de avisos. Ao mostrar o resultado de uma chamada, diferencie explicitamente `null` de um número, preservando o zero. Descomente temporariamente uma tentativa de criar uma `Leitura` com `true` e observe o erro.

Explique por que iniciar o maior valor em `0` mudaria a resposta de uma das entradas. Indique tempo de pior caso e espaço auxiliar.

[Retomar unions e narrowing](../02-aulas-do-curso/02-unions-e-narrowing.md)

### 2. Pedido de retirada

Um pedido tem `id: number` em todos os estados. Os estados são:

| Estado | Dados obrigatórios além de `id` |
|---|---|
| `"aguardando"` | Nenhum |
| `"pronto"` | `codigo: string` |
| `"retirado"` | `retiradoPor: string` |

Crie um alias para a identificação comum. Use intersections para combiná-lo com o contrato de cada estado e uma discriminated union chamada `Pedido` para representar as alternativas. Escolha `estado` como campo discriminante. Os campos específicos devem ser obrigatórios na alternativa correspondente.

Implemente `resumirPedido(pedido: Pedido): string`, usando `if` ou `switch` para produzir:

| Valor de entrada | Texto esperado |
|---|---|
| `{ id: 1, estado: "aguardando" }` | `Pedido 1: aguardando` |
| `{ id: 2, estado: "pronto", codigo: "A7" }` | `Pedido 2: pronto — código A7` |
| `{ id: 3, estado: "retirado", retiradoPor: "Ana" }` | `Pedido 3: retirado por Ana` |

Teste os três estados. Tente construir `{ id: 2, estado: "pronto" }` como `Pedido` e confirme que o editor rejeita a falta de `codigo`; depois comente essa linha. Não crie uma máquina de transições nem uma interface de usuário: o objetivo é representar e ler um pedido em um dos estados.

Explique em uma frase por que um único objeto com `estado` amplo e campos específicos opcionais aceitaria a construção incompleta. Para que serve `&` neste modelo e para que serve `|`?

[Retomar intersections e estados](../02-aulas-do-curso/03-intersections-e-estados.md)

[Voltar ao guia — etapa 4](../README.md#etapa-4)
