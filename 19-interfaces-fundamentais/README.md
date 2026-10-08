# Guia de estudo — Interfaces fundamentais

**Objetivo:** descrever contratos de objetos com interfaces, representar campos opcionais, usar `readonly` com intenção clara e entender quando dois formatos são compatíveis. Aplicar esses contratos a uma coleção e às entradas e saídas de suas funções.

No capítulo 17, você nomeou formatos com `type`. No capítulo 18, distinguiu tipos de valores em execução. Agora vamos conhecer outra maneira de nomear um formato de objeto: `interface`. Ela também descreve um tipo; não cria objetos JavaScript.

O percurso é **aula com experimentos → leitura curta → próxima aula → prática**. As aulas vêm antes dos trechos da documentação em inglês. Execute cada bloco TypeScript separadamente no Pad ou em um arquivo com modo estrito. As linhas que devem produzir erros estão comentadas: descomente uma por vez, observe o editor e comente novamente.

**Prioridade do estudo:** construir e usar contratos pequenos. Extensão com `extends`, contratos de funções, index signatures e união de declarações de interfaces serão aprofundados no capítulo 44. Você não precisa desses recursos para esta prática.

Como no capítulo 18, a referência é a documentação oficial da linguagem; não há videoaula obrigatória nem recorte do CLRS.

## 1. Aula e leitura — nomear o formato de um objeto

Leia a [aula 1 — Interfaces para contratos de objetos](02-aulas-do-curso/01-contratos-de-objetos.md). Ela começa com um contato descrito por `type`, mostra a versão com `interface` e usa o contrato em uma função e em um array.

Depois leia [Interfaces, no TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces), da definição ao parágrafo que explica a tipagem estrutural. Pare antes de **Differences Between Type Aliases and Interfaces**. A aula 3 vai desenvolver essa compatibilidade com exemplos de contatos.

## 2. Aula e leitura — ausência e permissão de escrita

Siga para a [aula 2 — Campos opcionais e readonly](02-aulas-do-curso/02-opcionais-e-readonly.md). Observe separadamente o que pode faltar e o que pode ser alterado.

Leia [Optional Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties), da definição até o exemplo que testa se `opts.xPos` é `undefined`. Pare antes do parágrafo que apresenta a sintaxe de valores padrão no destructuring (**“Note that this pattern of setting defaults…”**).

Leia [readonly Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties), até o exemplo em que `readonlyPerson.age` muda por outra referência. Pare antes do parágrafo sobre **mapping modifiers**. Concentre-se na diferença entre restringir uma escrita e congelar um objeto em execução.

## 3. Aula e leitura — compatibilidade e escolha do contrato

Leia a [aula 3 — Compatibilidade e fronteiras da coleção](02-aulas-do-curso/03-compatibilidade-e-colecoes.md). Ela explica por que um objeto pode atender a um contrato sem ter sido declarado com seu nome. Depois integra os contratos a uma busca e compara `interface` com `type`.

Em [Starting out](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#starting-out), leia a seção completa, incluindo o aviso sobre propriedades extras em objetos literais. Pare antes de **Comparing two functions**. O exemplo usa animais; o mesmo raciocínio vale para os campos dos contatos.

Consulte apenas o parágrafo inicial de [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces). A tabela da documentação usa `extends` e união de declarações; esses mecanismos ficam para depois. Para decidir agora, use a comparação curta da aula.

## 4. Prática — aplicar o contrato e justificar uma escolha

Faça a [atividade 1 — Consultar uma coleção de livros](03-pratica/atividades.md#atividade-1). Ela reaproveita busca linear e pede um resultado novo, com os campos definidos pelo contrato de saída.

Depois faça a [atividade 2 — Um registro e um resultado](03-pratica/atividades.md#atividade-2). Ela pede uma escolha breve entre `interface` e `type`, com base nos formatos que você precisa representar.

Envie uma tentativa por vez. Para a atividade 1, inclua os testes indicados; para a atividade 2, bastam duas ou três frases. Não há prova nem relatório obrigatório. No capítulo 20, esses fundamentos de modelagem começarão a acompanhar o estudo de HTML, CSS e navegador.

## Fontes e limites da seleção

- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces): declaração de interfaces e comparação com aliases. Os limites de leitura estão nas etapas 1 e 3.
- [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html): campos opcionais, `readonly`, limites de referências compartilhadas e consulta de apoio sobre **Excess Property Checks**. O capítulo usa apenas o caso simples de propriedade extra em um objeto literal; assertions e index signatures ficam fora do percurso.
- [TypeScript Handbook — Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#starting-out): compatibilidade estrutural de objetos e argumentos. Compatibilidade de funções, classes, enums e generics não faz parte deste capítulo.
