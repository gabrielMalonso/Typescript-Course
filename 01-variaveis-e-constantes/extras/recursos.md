# Recursos Adicionais — Capítulo 01: Variáveis e Constantes

Use estes recursos para consultar uma dúvida específica depois de tentar resolvê-la com a aula. A documentação oficial pode parecer densa no início; leia primeiro os exemplos de código e volte ao texto conforme necessário.

## Documentação Oficial

- [TypeScript Handbook — Variable Declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html) — Comparação detalhada entre `var`, `let` e `const`, incluindo escopo.
- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — Referência sobre tipos básicos, anotações e inferência.
- [MDN — `let`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/let) — Sintaxe e comportamento de variáveis com escopo de bloco.
- [MDN — `const`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/const) — Sintaxe, inicialização obrigatória e impossibilidade de reatribuição.
- [MDN — `var`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/var) — Material de consulta para reconhecer código antigo e entender por que seu escopo surpreende.
- [MDN — Escopo](https://developer.mozilla.org/pt-BR/docs/Glossary/Scope) — Definição curta de onde uma variável pode ser acessada.

## Roteiro de Leitura

Para não antecipar conteúdo em excesso, siga esta ordem:

1. releia a comparação entre `let`, `const` e `var`;
2. consulte em *Everyday Types* apenas as partes sobre tipos básicos, anotações e inferência;
3. use a página sobre escopo quando tiver dúvida sobre um nome dentro ou fora de `{ }`;
4. deixe assuntos como objetos, arrays e funções para os capítulos correspondentes.

## Playgrounds e Ferramentas

- [TypeScript Playground](https://www.typescriptlang.org/play) — Editor oficial para testar pequenos trechos e observar erros de tipo sem criar arquivos locais.
- [`noEmit` no TSConfig](https://www.typescriptlang.org/tsconfig/noEmit.html) — Referência oficial para verificar tipos sem gerar JavaScript.
- `tsc arquivo.ts` — Compila o arquivo e exibe erros.
- `tsc arquivo.ts --noEmit` — Verifica o arquivo sem criar um `.js`.
- `node arquivo.js` — Executa o JavaScript gerado para conferir a saída.

Ao testar um erro no Playground ou no terminal, altere uma coisa por vez. Assim, fica claro se a causa envolve mutabilidade, tipo, identificador ou escopo.

## Exercícios Extras

### Exercício Extra 1: Etiquetas de um Ensaio

Registre:

- nome do ensaio: `Tração`;
- unidade de força: `kN`;
- carga inicial: `0`;
- carga final: `25`.

Use `const` nos dados fixos e `let` somente na carga. Exiba exatamente:

```text
Ensaio: Tração
Carga inicial: 0 kN
Carga final: 25 kN
```

Depois, explique em uma constante `string`, sem exibi-la, por que a carga usa `let`.

### Exercício Extra 2: Laboratório de Escopo

Declare `nomeDoLaboratorio` fora de um bloco. Dentro do bloco, declare `numeroDaBancada` e exiba os dois valores. Depois do bloco, exiba somente `nomeDoLaboratorio`.

Faça então um experimento: tente usar `numeroDaBancada` fora do bloco, execute `tsc` e registre a mensagem recebida. Desfaça a alteração antes de finalizar.

### Exercício Extra 3: Auditoria de Saída

Produza exatamente:

```text
Peça: Flange
Quantidade: 8
```

Exiba a primeira linha com argumentos separados por vírgula e a segunda com `+`. Confirme no terminal que não existem espaços duplicados ou ausentes.

## Conceitos Relacionados

*Pequena prévia do que aparecerá depois:*

- **Tipos primitivos** (Capítulo 02): os valores armazenados serão estudados com mais profundidade.
- **Operadores e expressões** (Capítulo 03): variáveis poderão participar de cálculos e comparações.
- **Funções** (capítulo posterior): parâmetros e variáveis internas terão escopo próprio.

Por enquanto, basta reconhecer essas conexões; não é necessário estudar esses temas antecipadamente.

## Glossário do Capítulo

| Termo | Definição |
|---|---|
| Variável | Nome associado a um valor armazenado pelo programa. |
| Declaração | Criação de um nome com `let`, `const` ou, em código antigo, `var`. |
| Inicialização | Primeiro valor fornecido no momento da declaração. |
| Atribuição | Operação que associa um valor a um nome. |
| Reatribuição | Substituição do valor de uma variável já declarada. |
| Redeclaração | Tentativa de declarar novamente um nome no mesmo escopo. |
| `let` | Palavra-chave usada para um nome que poderá ser reatribuído. |
| `const` | Palavra-chave usada para um nome que deve ser inicializado e não pode ser reatribuído. |
| `var` | Forma antiga de declaração que não respeita escopo de bloco. |
| Identificador | Nome usado para referenciar uma variável ou constante. |
| `camelCase` | Convenção como `temperaturaAtual`, com a primeira palavra em minúscula e as seguintes iniciadas por maiúscula. |
| Inferência de tipo | Dedução automática do tipo a partir do valor inicial. |
| Anotação de tipo | Tipo escrito explicitamente depois do nome, como `: number`. |
| Escopo | Região do código na qual um identificador pode ser acessado. |
| Escopo de bloco | Alcance limitado por `{ }` para nomes declarados com `let` ou `const`. |
| Escopo de função | Alcance interno de uma função; será aprofundado em capítulo posterior. |
| Erro de compilação | Problema que faz o TypeScript rejeitar o código. |
| Convenção de estilo | Escolha de escrita adotada para manter o código consistente, como usar `;` neste curso. |
