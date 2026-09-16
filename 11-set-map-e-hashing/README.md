# Guia de estudo — Set, Map e hashing

**Objetivo:** escolher como representar presença e associações, usar Set e Map em TypeScript e explicar o custo e os limites dessa escolha.

**Continue na [etapa 3 — Set e Map na prática](#etapa-3).** Os trechos de vídeo e os fundamentos do livro abaixo já foram estudados, conforme seu relato em 16/09/2026. Não é necessário refazê-los. A prática ainda será acompanhada; estudo concluído não significa avaliação de domínio do capítulo.

## 1. Vídeo já estudado — consulta

**Estudo concluído:** trechos da [CS50x 2026 — Week 5, David Malan](https://cs50.harvard.edu/x/2026/weeks/5/), gravação de 2025:

- [Dictionaries — 10:44–12:26](https://www.youtube.com/watch?v=PmAI76OGE_E&t=644s).
- [Hashing and Hash Tables — 1:36:47–1:53:51](https://www.youtube.com/watch?v=PmAI76OGE_E&t=5807s).

Os links permanecem para consulta. Reproduzir C, ponteiros ou listas ligadas não é necessário neste capítulo.

## 2. Fundamentos já estudados — consulta

Referência: **Introduction to Algorithms, CLRS, 3ª edição em inglês**. As páginas abaixo são as impressas; os PDFs preservam páginas completas.

**Estudo conceitual concluído:** [introdução e 11.1, pp. 253–255](leituras/clrs-11.1.pdf) e parte relevante de [11.2, pp. 256–260](leituras/clrs-11.2.pdf): endereçamento direto e seu custo de espaço, chave → hash → posição, colisões, encadeamento (*chaining*), fator de carga intuitivo e eficiência média/esperada versus pior caso.

Essa base basta para continuar. Os teoremas, suas demonstrações, esperança matemática e variáveis indicadoras das pp. 259–260 ficam como **aprofundamento opcional**, sem leitura ou entrega exigida. Não é preciso terminar a seção para avançar. A [atividade 1](pratica/atividades.md#atividade-1) permanece como consulta opcional para visualizar colisões, se sentir necessidade.

## 3. Set e Map na prática — comece aqui

No capítulo 10, você identificou buscas repetidas em arrays. Agora conheça coleções que expressam outras necessidades: guardar valores únicos ou recuperar um dado por uma chave.

Leia estes recortes da documentação, experimentando os métodos conforme aparecem:

| Fonte | Foco e limite |
|---|---|
| [MDN — Set: Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#description) | Leia a descrição, *Value equality* e *Performance*. Pare antes de *Set composition*. Observe unicidade, ordem de inserção e identidade de objetos. |
| [MDN — métodos de Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods) | Consulte somente `add`, `has`, `delete`, `clear` e a propriedade `size`. Não é preciso estudar união/interseção, subclasses ou protocolos. |
| [MDN — Map: Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description) | Leia a descrição e *Key equality*. Veja chave → valor, atualização de uma chave existente e ordem de inserção. |
| [MDN — métodos de Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#instance_methods) | Consulte `set`, `get`, `has`, `delete`, `clear`, `forEach` e a propriedade `size`. Foque no que entra e no que cada operação devolve. |

Para adaptar os exemplos a TypeScript, use as notas [Set](notas.md#set-guardar-presenca), [Map](notas.md#map-associar-uma-informacao) e, se precisar, [igualdade e identidade](notas.md#igualdade-e-identidade). Elas são apoios pontuais, não uma segunda leitura obrigatória da mesma teoria.

**Depois:** faça a [atividade 2 — experimentar as coleções](pratica/atividades.md#atividade-2). Pode enviar essa primeira entrega para feedback.

## 4. Escolher a estrutura e analisar seu custo

Leia [Escolher entre Array, Set, Map e Object](notas.md#escolher-entre-array-set-map-e-object), com o recorte indicado da MDN, e [Custo das coleções no JavaScript](notas.md#custo-das-colecoes-no-javascript).

Conecte o modelo que você já estudou ao contrato da linguagem: a API define comportamento, mas não impõe uma implementação particular de hash table. Considere também construir a coleção e mantê-la em memória; acelerar consultas tem um custo.

**Depois:** retome [Contains Duplicate — atividade 3](pratica/atividades.md#atividade-3). Preserve a tentativa anterior e escolha sua própria estratégia. O material não fornece o algoritmo da revisão.

## 5. Aplicar e investigar

Faça [atividade 4 — investigar uma consulta](pratica/atividades.md#atividade-4), [atividade 5 — Two Sum](pratica/atividades.md#atividade-5) e [atividade 6 — Valid Anagram](pratica/atividades.md#atividade-6).

Escolha a representação a partir do contrato de cada problema. Comece com uma solução que consiga construir, teste e analise antes de melhorar. Se travar, envie a tentativa e a dificuldade; não precisa terminar tudo para receber feedback.

## 6. Feedback

O percurso essencial agora é **atividades 2–6**. Código, testes e explicações breves devem mostrar uso correto das coleções, escolha de representação, tratamento de ausência/identidade e análise de tempo e espaço com hipóteses claras. Os fundamentos já estudados serão conectados às decisões da prática, sem prova matemática obrigatória.

A [atividade 7](pratica/atividades.md#atividade-7) é consolidação e a [atividade 8](pratica/atividades.md#atividade-8) é desafio opcional. Não bloqueiam avanço sem uma lacuna essencial identificada. Por enquanto, continuamos no capítulo 11.
