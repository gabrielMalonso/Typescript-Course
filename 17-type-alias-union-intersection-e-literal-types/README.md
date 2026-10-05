# Guia de estudo — Type Alias, Union, Intersection e Literal Types

**Objetivo:** dar nomes reutilizáveis aos tipos, representar valores permitidos e estados alternativos, combinar contratos de objetos e usar os dados com segurança por meio de verificações simples.

No capítulo 16, uma função podia retornar um par com significado. Agora vamos nomear esse contrato e fazer uma pergunta: como representar uma busca que encontrou um resultado ou terminou sem encontrar? O percurso é **leitura curta → aula → experimento**, com duas atividades ao longo do capítulo.

Este é um capítulo de modelagem em TypeScript. As referências são trechos do Handbook; não há videoaula obrigatória nem recorte do CLRS. Execute os blocos das aulas separadamente no Pad ou em arquivos TypeScript, com modo estrito. As linhas que devem produzir erros estão comentadas: descomente uma por vez, observe o editor e comente novamente.

## 1. Leitura e aula — nomes e valores permitidos

Leia [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases), da definição ao fim da seção. Pare antes de **Interfaces**.

Na mesma página, leia [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types), incluindo literais numéricos e booleanos. Pare antes de **Literal Inference**. O símbolo `|` significa uma alternativa entre os tipos; vamos desenvolvê-lo na próxima etapa.

Siga para a [aula 1 — Dar nomes aos contratos](02-aulas-do-curso/01-aliases-e-literais.md). Ela retoma tuples e mostra por que `string` pode ser amplo demais para uma escolha com valores definidos. A aula também trata de um caso simples de inferência de literais, sem assertions.

## 2. Leitura, aula e prática — alternativas e ausência

Leia [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types), incluindo **Defining a Union Type** e **Working with Union Types**. Pare antes de **Type Aliases**.

Em [null and undefined](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined), leia a introdução e os dois trechos sobre `strictNullChecks`. O curso usa a opção ativada por `strict`; concentre-se no exemplo que verifica `null`. Pare antes de **Non-null Assertion Operator**.

Leia a [aula 2 — Uma alternativa precisa de uma verificação](02-aulas-do-curso/02-unions-e-narrowing.md). Depois faça a [atividade 1 — Leituras disponíveis e maior valor](03-pratica/atividades.md#atividade-1): ela combina `typeof`, ausência e um percurso conhecido de array.

## 3. Leitura e aula — combinar campos ou separar estados?

Leia [Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types), até o fim do exemplo `draw`. Pare antes de **Interface Extension vs. Intersection**. A fonte usa interfaces para nomear objetos; leia esses nomes como contratos. Aqui vamos escrevê-los com `type`; interfaces serão o assunto do capítulo 19.

Leia [Discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions), da primeira tentativa de representar `Shape` até o exemplo de `getArea` com `switch` e a conclusão da seção. Pare antes de **The never type**. Você verá `!` na tentativa inicial: observe o problema que motivou a mudança do modelo; a solução deste capítulo usa verificações e campos obrigatórios em cada alternativa.

Siga para a [aula 3 — Campos juntos, estados separados](02-aulas-do-curso/03-intersections-e-estados.md). Compare o papel de `&` e `|` antes de executar o exemplo completo da busca.

## 4. Prática — o estado informa quais dados existem

Faça a [atividade 2 — Pedido de retirada](03-pratica/atividades.md#atividade-2). Ela exige transformar uma descrição em tipos e experimentar uma construção incompleta, em vez de preencher um modelo já pronto.

Envie uma tentativa por vez, com testes e uma justificativa breve da representação. Não há prova nem relatório obrigatório. No capítulo 18, vamos comparar unions de literais com enums; narrowing completo será aprofundado no capítulo 38.

## Fontes e limites da seleção

- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): aliases, unions, literais, inferência de literais e ausência. Os limites de leitura estão nas etapas 1 e 2; inferência serve também de consulta para a aula 1.
- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html): consulta de apoio em **typeof type guards**, **Truthiness narrowing** e **Control flow analysis** para a aula 2; leitura de **Discriminated unions** delimitada na etapa 3. Predicates, assertions e verificação formal de exaustividade ficam fora deste capítulo.
- [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types): intersections; o exemplo de conflito em **Interface Extension vs. Intersection** foi usado como apoio para a limitação apresentada na aula 3. Comparação detalhada com interfaces e objetos genéricos fica para depois.
