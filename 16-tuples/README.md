# Guia de estudo — Tuples

**Objetivo:** representar pequenos conjuntos de valores em que cada posição tem um significado, usar tuples em retornos de funções e escolher entre tuple, array e objeto pela clareza do contrato.

Você já usa arrays, objetos e funções. Agora vamos distinguir uma lista de números de um par como `[x, y]`: ambos são arrays em JavaScript, mas podem ter contratos diferentes em TypeScript. O percurso é **leitura curta → aula 1 → atividade 1 → leitura e aula 2 → atividade 2**.

## 1. Leitura — um tipo para cada posição

Abra [Tuple Types, no TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types). Leia da definição até o aviso sobre escolher objetos com propriedades descritivas, logo depois do exemplo de destructuring. Pare antes do exemplo `interface StringNumberPair`.

A documentação usa `type` para dar nome ao formato. Por enquanto, concentre-se nos colchetes de `[string, number]`. Vamos escrever os tipos diretamente nas variáveis e funções; criar nomes reutilizáveis será assunto do capítulo 17.

Este capítulo trata de modelagem na linguagem. A leitura oficial curta e os experimentos no editor bastam como material de referência; não há recorte do CLRS nem videoaula obrigatória.

## 2. Aula e prática — posições que fazem parte do contrato

Leia a [aula 1 — Do array ao par com significado](02-aulas-do-curso/01-posicoes-e-retornos.md). Execute os blocos separadamente no Pad ou em um arquivo TypeScript. As linhas de erro estão comentadas: descomente uma por vez para observar a mensagem do editor e depois comente novamente.

Faça a [atividade 1 — Uma busca, duas informações](03-pratica/atividades.md#atividade-1). Ela reaproveita busca linear para separar o resultado do algoritmo da quantidade de trabalho realizado.

## 3. Leitura e aula — ausência e permissão de escrita

Na mesma página do Handbook, leia o trecho de elementos opcionais: do parágrafo **“Another thing you may be interested in…”** até o fim do exemplo `setCoordinate`. Pare antes de **“Tuples can also have rest elements”**.

Leia então [readonly Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-tuple-types), até o parágrafo que recomenda tuples de leitura. Pare antes do exemplo com `as const`; vamos usar anotações explícitas neste capítulo.

Siga para a [aula 2 — Opcionais, readonly e escolha do formato](02-aulas-do-curso/02-opcionais-readonly-e-modelagem.md). Observe a diferença entre impedir uma escrita pelo tipo e congelar um valor em execução.

## 4. Prática — um contrato pequeno, mas completo

Faça a [atividade 2 — Coordenadas com uma dimensão opcional](03-pratica/atividades.md#atividade-2). Teste as entradas indicadas e confira que a função preserva os pontos recebidos.

Envie uma tentativa por vez, com os testes e uma justificativa breve do formato escolhido. Não há prova ou relatório obrigatório. No capítulo 17, vamos dar nomes aos tipos e representar alternativas de estado com mais precisão.

## Fontes e limites da seleção

- [TypeScript Handbook — Tuple Types e readonly Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types): definição, acesso por posição, destructuring, opcionais e compatibilidade de leitura. Os limites de estudo estão nas etapas 1 e 3; rest em tuples fica fora deste capítulo.
- [TypeScript 4.0 — Labeled Tuple Elements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements): rótulos de posições, usados na aula 1 para documentar os retornos. Consulta de apoio, sem leitura integral das notas da versão.
- [TypeScript 3.4 — readonly tuples](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#readonly-tuples): conferência da sintaxe e da restrição de escrita. A limitação de referências internas foi conferida em **Caveats**, ao final de **const assertions**, e experimentada sem assertions na aula 2.
- MDN: [Array destructuring — Basic variable assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring#basic_variable_assignment) e [Map.prototype.entries() — Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries#examples), para a ponte entre sintaxe JavaScript e pares tipados na aula 1.
