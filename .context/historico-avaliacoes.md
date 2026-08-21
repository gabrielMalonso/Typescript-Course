# Histórico de Avaliações

> Arquivo de controle do Claude - Registro de todas as avaliações

---

## 2026-08-21 — Prova do Capítulo 07

**Resultado:** 9,5/10 — aprovado. A teoria recebeu 3,65/4,0 e a prática 5,80/6,0. Os quatro arquivos TypeScript compilam isoladamente em modo estrito e executam sem erros.

**Descontos:** na Questão 1, o código do equipamento foi lido em `lista[2]` em vez de `lista[1]`. Na Questão 4, a extração de `nome` foi descrita como vinda de `promocao`. Na Questão 7, a condição extra `litros <= 50` rejeitaria um abastecimento grande que deveria só cortar o volume em `50`.

**Organização:** cinco arquivos obrigatórios no diretório correto. Capítulo 07 concluído.

## 2026-08-21 — Correção pós-prova — Capítulo 07

**Resultado:** índice, origem do destructuring, teto do volume e rótulo `Total:` corrigidos. `questao07.ts` e `questao08.ts` recompilam; saídas `40` / `40` / `50` e `Peças: 12 | Total: 21`. Nota original 9,5 preservada.

## 2026-08-21 — Leitura de código real e treino extra — Capítulo 07

**Leitura de código real:** concluída com ajustes. O aluno acompanhou spread, propriedades opcionais, destructuring na entrada e destino dos objetos. Ajustes: atalho `{ tone }` equivale a `{ tone: tone }`; `requestedAt` vem de `payload.request.requestedAt`; `{ key, label, description }` usa os parâmetros como nomes e valores; `initialName` entra em `fullName`, não no tipo `string`.

**Treino extra:** 3 de 5 aprovados na primeira passagem. Extra 2, Extra 3 e Extra 5 corretos. Extra 1 soma unidades de estoque em vez de contar produtos disponíveis (`12` no lugar de `2`). Extra 4 copia e reajusta corretamente, mas imprime os arrays em vez do formato pedido.

**Próximo passo:** ajustes em Extra 1 e Extra 4. Prova permanece bloqueada.

## 2026-08-19 — Conclusão da lista — Capítulo 07

**Resultado qualitativo:** 12 exercícios obrigatórios e bônus aprovados. Os dois ajustes finais de `ex24.ts` e `bonus.ts` foram aplicados com autorização do aluno.

**Validação:** os dois arquivos compilam isoladamente em modo estrito. Saídas conferidas: `Parafuso × 8` / `Arruela × 0`; bônus `2`, `18`, `T1: 21 °C | sem nota`, `T2: -3 °C | recalibrar`, depois `0` e `0`.

**Próximo passo:** treino extra de sintaxe. Prova permanece bloqueada.

## 2026-08-19 — Segunda correção da lista — Capítulo 07

**Resultado qualitativo:** `ex14.ts`, `ex21.ts` e `ex23.ts` aprovados. Restam o comentário estrutural em `ex24.ts` e, no bônus, o formato exato mais a comprovação visível do array sem ativos.

**Validação:** os cinco arquivos recompilam isoladamente em modo estrito. Saídas conferidas: `M-4`/`1.25`; `sem código`/`503`; `140`/`140`/`140`.

## 2026-08-19 — Primeira correção da lista — Capítulo 07

**Resultado qualitativo:** 8 dos 12 obrigatórios aprovados na primeira revisão; 4 obrigatórios e o bônus pedem complementos curtos. Todos os 13 arquivos compilam isoladamente em modo estrito e executam sem erros.

**Domínio demonstrado:** literal tipado, mutação com `const`, ponto versus colchetes, objeto aninhado, método com `this`, destructuring no parâmetro, alias versus spread, percurso de array de objetos e cópia sem mutação.

**Pontos a reforçar:** completar os dois testes no mesmo programa; exibir o retorno da função, não só o estado posterior; escrever o comentário de compatibilidade estrutural; formatar o resumo exatamente quando o enunciado define o texto; treinar a escrita da mistura array + objeto + função.

**Próximo passo:** ajustes em `ex14.ts`, `ex21.ts`, `ex23.ts`, `ex24.ts` e `bonus.ts`; em seguida o treino extra `lista-sintaxe-extra.md`. Prova permanece bloqueada.

## 2026-08-17 — Criação do Capítulo 07 — Objetos

**Resultado:** material completo gerado após a aprovação no Capítulo 06. Ainda não há correção de exercícios nem prova deste capítulo.

## 2026-08-17 — Correção pós-prova da Questão 8 — Capítulo 06

**Resultado:** condição corrigida para ignorar valores `<= 0`. O arquivo compila em modo estrito, preserva as saídas da prova e, com `[14, -5, 0]`, retorna total `14` e quantidade `1`. Pendência conceitual resolvida.

**Nota:** permanece 9,4, registrando o desempenho da entrega original.

## 2026-08-17 — Prova do Capítulo 06

**Resultado:** 9,4/10 — aprovado. A teoria recebeu 3,55/4,0 e a prática 5,8/6,0. Os quatro arquivos TypeScript compilam isoladamente em modo estrito, executam sem erros e produzem todas as saídas principais esperadas.

**Descontos:** na Questão 3, `itemA` foi corretamente identificado como a própria função, mas recebeu incorretamente o tipo conceitual `number`, e o papel dos parênteses não foi explicado. Na Questão 8, soma e contagem ignoram somente zero e aceitariam negativos, apesar da regra exigir valores maiores que zero.

**Organização:** respostas teóricas entregues em `respostas.md` em vez do nome solicitado `resposta.md`; sem desconto. Capítulo 06 concluído.

## 2026-08-17 — Conclusão da lista — Capítulo 06

**Resultado qualitativo:** 12 exercícios obrigatórios e bônus aprovados. Os ajustes finais removeram uma explicação contraditória em `ex31.ts` e passaram a exibir os arrays originais em `ex32.ts`, comprovando a ausência de modificação.

**Validação:** todos os 13 arquivos compilam isoladamente em modo estrito e executam sem erros. O aluno demonstrou domínio de contratos, retornos, `void`, formas de definição, funções como valores, referência versus chamada e composição com arrays. Prova liberada.

## 2026-08-17 — Terceira correção da lista — Capítulo 06

**Resultado qualitativo:** `ex22.ts` e `ex23.ts` corrigidos e aprovados. Todos os 13 arquivos compilam isoladamente em modo estrito e executam sem erros.

**Pendências mínimas:** em `ex31.ts`, remover a frase antiga que descreve incorretamente uma comparação e contradiz a explicação correta adicionada; em `ex32.ts`, exibir os dois arrays originais depois das chamadas. Restam 2 dos 12 obrigatórios para o encerramento formal.

## 2026-08-17 — Segunda correção da lista — Capítulo 06

**Resultado qualitativo:** `ex14.ts` e `ex34.ts` corrigidos e aprovados. O bônus também foi aprovado: o código demonstra uma escolha, o aluno relatou ter testado manualmente a outra, e explicou corretamente a compatibilidade pelo contrato comum. Todos os 13 arquivos continuam compilando isoladamente em modo estrito.

**Pendências restantes:** `ex22.ts` ainda contém declaração em vez de expressão de função; `ex23.ts` não apresenta a equivalência entre arrow concisa e arrow com bloco; `ex31.ts` ainda usa `let` e descreve de forma imprecisa referência versus retorno; `ex32.ts` ainda não exibe os arrays originais após as chamadas.

## 2026-08-17 — Primeira correção da lista — Capítulo 06

**Resultado qualitativo:** 6 dos 12 exercícios obrigatórios aprovados na primeira revisão; 6 requerem ajustes pontuais. Todos os 13 arquivos, incluindo o bônus, compilam isoladamente em modo estrito e executam sem erros.

**Domínio demonstrado:** contratos de parâmetros e retornos, retorno booleano, `void`, separação entre cálculo e exibição, função guardada como valor e processamento de arrays com loops.

**Pontos a reforçar:** limite inclusivo em `120`; distinção sintática entre declaração, expressão e arrow function; papel dos parênteses como chamada; cumprimento dos testes alternativos e das explicações solicitadas. Arquivos pendentes: `ex14.ts`, `ex22.ts`, `ex23.ts`, `ex31.ts`, `ex32.ts` e `ex34.ts`.

## 2026-08-16 — Leitura de código real — Capítulo 06

**Resultado qualitativo:** concluída. O aluno identificou corretamente contratos, argumentos, caminhos de retorno e uso dos resultados em TypeScript e TSX. Ajustes: parênteses executam a função; `undefined` era fallback posterior à chamada, não argumento. No trecho com XML, o aluno inferiu corretamente a finalidade geral e recebeu complemento sobre escape de `<` e `>`.

## Resumo Geral

| Métrica | Valor |
|---------|-------|
| **Total de provas** | 8 |
| **Média geral** | 9,2 |
| **Maior nota** | 9,5 |
| **Menor nota** | 8,5 |
| **Provas com nota < 7** | 0 |

---

## Provas por Módulo

### Módulo 1: Fundamentos Absolutos

| Capítulo | Data | Nota | Principais Erros | Observações |
|----------|------|------|------------------|-------------|
| 00 | 2026-07-26 | 9,5 | Código copiado na Q6 não compilava | Aprovado; arquivos `.ts` de apoio compilam |
| 01 | 2026-07-31 | 8,5 | Alternativa sobre `var`; V/F sobre inferência; diferenças literais na saída e em requisito de inferência | Aprovado; os três arquivos `.ts` compilam |
| 02 | 2026-08-03 | 9,0 | Alternativa sobre notação científica; uma linha omitida e dois rótulos divergentes na Q7 | Aprovado; os três arquivos práticos compilam |
| 03 | 2026-08-10 | 8,7 | Explicação de precedência omitida; atribuição original não identificada; faixa intermediária invertida | Aprovado; Questão 7 completa |
| 04 | 2026-08-13 | 9,4 | Explicações de `continue` e `break` omitidas na Q1 | Aprovado; parte prática completa e validada em modo estrito |

**Média do Módulo 1:** 9,0

---

### Módulo 2: Estruturas de Dados e Funções

| Capítulo | Data | Nota | Principais Erros | Observações |
|----------|------|------|------------------|-------------|
| 05 | 2026-08-15 | 9,5 | `ultimoIndice` de array vazio; previsões da Q6 e variável da Q7 omitidas | Aprovado; quatro arquivos práticos compilam e executam |
| 06 | 2026-08-17 | 9,4 | Tipo conceitual da função e filtro que aceita negativos | Aprovado; quatro arquivos práticos compilam e executam |
| 07 | 2026-08-21 | 9,5 | Índice `lista[2]` em vez de `lista[1]`; extração descrita como vinda de `promocao`; `litros <= 50` extra no tanque | Aprovado; quatro arquivos práticos compilam e executam |
| 08 | - | - | - | - |
| 09 | - | - | - | - |
| 10 | - | - | - | - |
| 11 | - | - | - | - |
| 12 | - | - | - | - |

**Média do Módulo 2:** 9,5

---

### Módulo 3: TypeScript Intermediário

| Capítulo | Data | Nota | Principais Erros | Observações |
|----------|------|------|------------------|-------------|
| 13 | - | - | - | - |
| 14 | - | - | - | - |
| 15 | - | - | - | - |
| 16 | - | - | - | - |
| 17 | - | - | - | - |
| 18 | - | - | - | - |
| 19 | - | - | - | - |
| 20 | - | - | - | - |
| 21 | - | - | - | - |
| 22 | - | - | - | - |

**Média do Módulo 3:** -

---

### Módulo 4: TypeScript Avançado

| Capítulo | Data | Nota | Principais Erros | Observações |
|----------|------|------|------------------|-------------|
| 23 | - | - | - | - |
| 24 | - | - | - | - |
| 25 | - | - | - | - |
| 26 | - | - | - | - |
| 27 | - | - | - | - |
| 28 | - | - | - | - |
| 29 | - | - | - | - |
| 30 | - | - | - | - |
| 31 | - | - | - | - |

**Média do Módulo 4:** -

---

## Exercícios Corrigidos

| Data | Capítulo | Exercícios | Acertos | Taxa | Erros Principais |
|------|----------|------------|---------|------|------------------|
| 2026-02-01 | 00 | 10 | 8 corretos, 2 com ressalvas, 1 parcial | ~85% | Inconsistência com ponto e vírgula; saída divergente do esperado; confusão sobre o que é erro de compilação vs estilo |
| 2026-07-30 | 01 | 10 + bônus | Aprovados após revisão | 100% após ajustes | Saída, requisitos textuais e escopo de função corrigidos |
| 2026-08-01 | 02 | Desafio rápido + mini-projeto | Aprovados | Domínio conceitual demonstrado | Tipos, cálculos e template literals corretos; diferenças cosméticas não impedem avanço |
| 2026-08-03 | 02 | 10 + bônus | Aprovados após revisão | 100% após ajustes conceituais | Inferência, classificação de erro e sufixo de `bigint` corrigidos; diferença cosmética no 1.2 não impede avanço |
| 2026-08-06 | 03 | Desafio rápido + mini-projeto | Aprovados | Domínio conceitual demonstrado | Linha funcional de estado incluída; diferenças cosméticas não impedem avanço |
| 2026-08-07 | 03 | 14 obrigatórios + bônus | Aprovados após revisão | 100% após ajustes | Limites exclusivos, `??` com zero e mensagem de partida corrigidos; `ex23.ts` e `ex25.ts` concluídos |
| 2026-08-13 | 04 | Mini-projeto | Aprovado após revisão | Domínio conceitual demonstrado | `continue`, contador, loops aninhados e encerramento coordenado validados nos quatro cenários propostos |
| 2026-08-13 | 04 | 12 obrigatórios + bônus | Aprovados após revisão | 100% após ajustes | `ex22.ts` passou a mostrar todas as verificações e usar a constante da busca; limite externo do bônus corrigido; `%` ausente no 1.4 é cosmético |
| 2026-08-14 | 05 | 11 obrigatórios + bônus | Aprovados após revisão | 100% após ajustes | `length` corrigido no 1.3; requisitos textuais completados; entendimento de tipo do 1.1 confirmado; todos compilam e executam |
| 2026-08-15 | 05 | 4 de integração Arrays + Loops | Aprovados | 100% | Percursos, acumuladores, `continue`, `break` e loops aninhados corretos; previsões e testes alternativos não registrados ficam como recomendação |
| 2026-08-21 | 07 extra | 5 | 3 corretos, 2 com ajuste | 60% na 1ª passagem | Extra 1 soma unidades em vez de contar produtos; Extra 4 não usa o formato de exibição |
| 2026-08-19 | 07 | 12 + bônus | Aprovados após revisão | 100% após ajustes | Comentário estrutural e formato/teste visível do bônus aplicados na conferência final |

---

## Projetos Avaliados

| Projeto | Data Entrega | Avaliação | Destaques | Melhorias |
|---------|--------------|-----------|-----------|-----------|
| P1 - Calculadora | - | - | - | - |
| P2 - Contatos | - | - | - | - |
| P3 - Biblioteca | - | - | - | - |
| PF - Financeiro | - | - | - | - |

---

## Padrões de Erro Identificados

*Erros que aparecem com frequência nas avaliações*

| Tipo | Descrição | Frequência | Capítulos | Status |
|------|-----------|------------|-----------|--------|
| Validação da entrega | Código testado estava correto, mas a versão copiada na resposta continha erros | 1 | 00 | Reforçar |
| Fidelidade ao enunciado | Código funciona, mas rótulos, valores, unidades ou partes não executáveis divergem do pedido | Recorrente | 00, 01, 02 | Reforçar |
| Escopo de função | Explicação afirmou que nomes internos ficam disponíveis fora da função | 1 | 01 | Corrigido na prova |
| Coerência entre resposta e justificativa | Classificação V/F contrariou a explicação conceitualmente correta | 1 | 01 | Reforçar |

---

## Evolução por Conceito

| Conceito | Primeira Nota | Última Nota | Tendência |
|----------|---------------|-------------|-----------|
| Preparação do ambiente e tipos básicos | 9,5 | 9,5 | Base sólida |
| Variáveis, constantes, inferência e escopos | 8,5 | 8,5 | Bom domínio; reforçar precisão literal |
| Tipos primitivos | 9,0 | 9,0 | Domínio sólido; reforçar conferência da saída |
| Operadores e estruturas condicionais | 8,7 | 8,7 | Bom domínio; reforçar testes de limites e caminhos alternativos |
| Estruturas de repetição | 9,4 | 9,4 | Domínio sólido; parte prática integralmente correta |
| Arrays: fundamentos | Lista qualitativa | 9,5 | Domínio sólido; reforçar `length - 1` quando o array está vazio e requisitos textuais |
| Funções: fundamentos | 9,4 | 9,4 | Domínio sólido; reforçar tipo da função versus tipo do retorno |
| Objetos | 9,5 | 9,5 | Domínio sólido; reforçar índice versus propriedade nomeada e teto no acumulado |

---

*Última atualização: 2026-08-21*
