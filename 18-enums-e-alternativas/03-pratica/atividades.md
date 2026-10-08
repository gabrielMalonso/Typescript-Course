# Prática — Escolher e conferir uma representação

Use o Pad ou um arquivo TypeScript em modo estrito. Resolva com os recursos já estudados, sem casts. Não use `const enum` nesta atividade.

### 1. Etiquetas de uma encomenda

Um sistema registra três códigos numéricos fixos:

| Código | Significado |
|---|---|
| `10` | Encomenda recebida |
| `20` | Encomenda em transporte |
| `30` | Encomenda entregue |

Crie o enum numérico `CodigoEncomenda`, com os membros `Recebida`, `EmTransporte` e `Entregue`. Escreva todos os valores explicitamente: os códigos devem continuar iguais se a ordem dos membros mudar.

Para mostrar o estado, crie o alias `EstadoEncomenda` como uma union de `"recebida"`, `"em-transporte"` e `"entregue"`.

Implemente uma função com este contrato:

```ts
// Assinatura a implementar:
// function interpretarCodigo(codigo: number): EstadoEncomenda | null
```

A função recebe um número e devolve o estado correspondente. Se o número não for um dos três códigos, devolve `null`. Compare a entrada com os membros do enum; não atribua primeiro o número a uma variável do tipo `CodigoEncomenda` nem use reverse mapping para decidir se ele é válido.

O retorno usa textos próprios para o estado. Observe que o nome do membro `EmTransporte` não é o texto `"em-transporte"` exigido pelo contrato.

Teste estas chamadas e compare os resultados:

| Entrada | Retorno esperado |
|---|---|
| `CodigoEncomenda.Recebida` | `"recebida"` |
| `CodigoEncomenda.EmTransporte` | `"em-transporte"` |
| `CodigoEncomenda.Entregue` | `"entregue"` |
| `0` | `null` |
| `99` | `null` |

Ao mostrar um resultado, diferencie `null` de um estado com uma verificação explícita. Confira também no editor que `"em transporte"`, com espaço, não pode ser atribuído a `EstadoEncomenda`.

Envie a implementação, as chamadas de teste e uma frase explicando por que o enum numérico e a union de textos têm papéis diferentes aqui. O objetivo é conferir um código e escolher sua representação; não é necessário criar uma aplicação ou implementar mudanças de estado.

[Voltar ao guia — etapa 4](../README.md#etapa-4)
