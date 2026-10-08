# Prática — Escolher e conferir uma representação

Na atividade 1, use o Pad ou um arquivo TypeScript em modo estrito. Resolva com os recursos já estudados, sem casts. A atividade 2 pede apenas uma escolha justificada. Não é necessário usar reverse mapping, enums heterogêneos ou `const enum`.

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

### 2. Escolher o formato de uma preferência

Você está criando um programa pequeno no qual a preferência de tema pode ser `"claro"`, `"escuro"` ou `"sistema"`. A opção `"sistema"` significa acompanhar o tema do aparelho. O projeto ainda não usa enums, e cada opção precisa apenas desse texto, sem campos adicionais.

Você começaria com um enum de texto ou uma union de literais? Responda em duas ou três frases: diga sua escolha, por que ela atende a esse caso e que mudança no contexto poderia tornar a outra opção razoável. Não há obrigação de escrever código; o objetivo é justificar a decisão.

[Voltar ao guia — etapa 4](../README.md#etapa-4)
