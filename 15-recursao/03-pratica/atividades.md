# Prática — Recursão

Execute suas tentativas no Pad ou em arquivos TypeScript. Envie uma atividade por vez, com os testes e uma explicação curta do custo. As entradas seguem os contratos dos enunciados; não é necessário montar infraestrutura de testes.

### 1. Somar sem copiar

Implemente `somarArray(numeros: number[], indice: number = 0): number` usando recursão. O array é denso e contém inteiros pequenos; `indice` representa a primeira posição ainda não processada, entre `0` e `numeros.length`. A chamada usual omite esse argumento.

Retorne zero quando não houver elementos restantes. Preserve a entrada e não use `slice`, spread ou métodos que criem outro array a cada chamada. O objetivo é diminuir a parte pendente **avançando um índice**.

Confira `[] → 0`, `[7] → 7`, `[2, -3, 5] → 4` e `[2, -3, 5]` começando no índice `1 → 2`. Rastreie as chamadas e os retornos do terceiro caso. Depois escreva a versão iterativa e compare tempo e espaço auxiliar das duas, incluindo a pilha. Use arrays pequenos na versão recursiva.

Se travar, pense no que a chamada atual sabe fazer com um elemento e no que ela pode pedir à próxima chamada.

[Retomar a aula de chamadas](../02-aulas-do-curso/01-caso-base-e-pilha.md)

### 2. Intercalar do zero

Feche a implementação da aula e escreva `intercalar(esquerda: number[], direita: number[]): number[]`. As entradas são arrays densos de números finitos, já ordenados em ordem crescente. Retorne um novo array ordenado, preserve as duas entradas e não use `sort()` nem `shift()`.

Use os casos abaixo para conferir o caminho em que cada lado termina primeiro:

| Esquerda | Direita | Saída |
|---|---|---|
| `[]` | `[]` | `[]` |
| `[]` | `[1, 3]` | `[1, 3]` |
| `[1, 2]` | `[4]` | `[1, 2, 4]` |
| `[4]` | `[1, 2]` | `[1, 2, 4]` |
| `[-2, 3, 3]` | `[-1, 3, 8]` | `[-2, -1, 3, 3, 3, 8]` |

Integre sua função ao `mergeSort` da aula e teste uma entrada de cinco elementos. Explique por que a quantidade de valores restantes diminui a cada passo e por que os loops juntos custam Θ(a + b). Para conferir estabilidade no papel, intercale `[2A]` e `[2B]`, comparando somente a chave `2`.

[Retomar merge sort](../02-aulas-do-curso/03-merge-sort.md)

### 3. Aplicação — registros de acesso

Implemente `resumirAcessos(ids: number[]): { usuario: number; acessos: number }[]`. Cada posição contém o ID inteiro não negativo de um usuário que acessou o sistema. Retorne um registro por usuário com sua quantidade de acessos, em ordem crescente de ID. Preserve a entrada. Escolha as estruturas e os algoritmos; não é necessário usar recursão.

Exemplo: `[7, 2, 7, 3, 2, 7]` deve produzir `[{ usuario: 2, acessos: 2 }, { usuario: 3, acessos: 1 }, { usuario: 7, acessos: 3 }]`.

Teste vazio, um único usuário repetido e usuários distintos em ordem invertida. Explique tempo e espaço em função de `n`, quantidade de acessos, e `k`, quantidade de usuários distintos. Se usar uma API pronta, inclua seu trabalho na análise e declare as hipóteses de custo. Compare sua escolha com uma alternativa em poucas frases.

Essa aplicação retoma o bloco sem indicar a estrutura. Ela não substitui o capstone C01, que será definido separadamente.

[Voltar ao guia — etapa 5](../README.md#etapa-5)
