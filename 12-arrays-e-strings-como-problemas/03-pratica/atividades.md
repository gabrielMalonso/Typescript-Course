# Prática — Arrays e strings como problemas

Resolva uma atividade por vez. Use funções e testes pequenos; não precisa montar um projeto nem um relatório. As soluções ficam para sua tentativa e nosso feedback.

### 1. Uma remoção que pula elementos

Este código deveria retirar todos os zeros, mas tem um erro. Antes de executar, preveja o resultado para a entrada fornecida:

```ts
const valores = [0, 0, 3, 0];

for (let i = 0; i < valores.length; i++) {
  if (valores[i] === 0) valores.splice(i, 1);
}

console.log(valores);
```

Rastreie a posição do segundo zero após a primeira remoção. Depois escreva `semZeros(valores: number[]): number[]`, devolvendo um novo array sem zeros e **preservando a entrada e a ordem dos demais números**. Não há obrigação de corrigir esse mesmo loop: escolha uma solução adequada ao contrato.

Teste vazio, só zeros, zeros consecutivos e ausência de zeros. Mostre também que a entrada permaneceu igual. Explique o custo da sua solução e por que remover repetidamente do início pode ser caro.

[Voltar ao guia](../README.md#etapa-2).

### 2. Lotes recebidos

Um leitor de etiquetas entrega uma sequência de códigos inteiros. Detecte se algum código aparece mais de uma vez, sem alterar a entrada:

`temCodigoRepetido(codigos: number[]): boolean`

Exemplos: `[42, 7, 42] → true`, `[42, 7, 9] → false`, `[] → false`. Inclua repetição no final e códigos iguais em posições consecutivas.

Escolha a representação sem consultar as soluções do capítulo anterior. Envie a tentativa com tempo, espaço e uma alternativa possível. Se assumir um custo esperado para alguma operação, diga qual é a hipótese.

[Voltar ao guia](../README.md#etapa-3).

### 3. Compactar espaços e encontrar uma letra

Comece pela transformação: `compactarEspacos(texto: string): string` recebe somente letras ASCII minúsculas e espaços comuns. Devolva o texto sem espaços nas extremidades e com exatamente um espaço entre grupos de letras. Preserve letras e ordem. Não use expressão regular; os recursos já estudados bastam.

| Entrada | Saída |
|---|---|
| `"  um   dia bom "` | `"um dia bom"` |
| `""` | `""` |
| `"   "` | `""` |
| `"casa"` | `"casa"` |

Depois do feedback, faça uma contagem com outro objetivo: `primeiroUnico(texto: string): number` recebe somente letras ASCII minúsculas, inclusive texto vazio. Devolva o índice da primeira letra que ocorre uma única vez; se não existir, devolva `-1`.

Exemplos: `"abac" → 1`, `"aabb" → -1`, `"z" → 0`, `"" → -1`. Preserve a ordem original ao decidir quem é o primeiro. Escolha sua estratégia e justifique tempo e memória.

Essas funções têm contratos ASCII. Os experimentos Unicode da aula servem para explicar por que não podemos anunciar que qualquer solução por índices funciona para caracteres visuais em texto arbitrário.

[Voltar ao guia](../README.md#etapa-4).

### 4. Dois itens para um orçamento

Receba preços inteiros positivos em centavos e um orçamento inteiro não negativo. Informe se existem **duas posições diferentes** cujos preços somem exatamente o orçamento:

`cabeParExato(precos: number[], orcamento: number): boolean`

Exemplos: `([300, 700, 500], 1000) → true`, `([500], 1000) → false`, `([500, 500], 1000) → true`, `([], 1000) → false`.

Não altere os preços recebidos. Teste também uma lista com vários itens sem par possível. A estrutura e o algoritmo ficam por sua conta; explique por que a mesma posição não pode ser usada duas vezes e analise os custos.

[Voltar ao guia](../README.md#etapa-5).
