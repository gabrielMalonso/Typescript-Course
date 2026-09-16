# Currículo pessoal de Ciência da Computação e Engenharia de Software

**Aluno:** Gabriel Alonso · **Início registrado:** Janeiro/2025 · **Evolução curricular:** 2026-09-09

## Objetivo e visão geral

A profundidade segue os três níveis do AGENTS: domínio prático como prioridade máxima, mecanismos internos como fundamento e aprofundamento acadêmico/formal opcional quando não melhorar significativamente a capacidade atual de implementação ou decisão. TypeScript é a principal ferramenta; os conceitos devem ser transferíveis entre linguagens. Essa regra vale também para os blocos de matemática e teoria, sem eliminar seus fundamentos úteis nem alterar a sequência.

Construir uma base generalista sólida em Ciência da Computação e Engenharia de Software, utilizando TypeScript como linguagem principal, desenvolvendo progressivamente a capacidade de resolver problemas, compreender sistemas, construir software e aprender novas tecnologias de forma independente.

Uma **única ementa sequencial**, com blocos estudados um após o outro. TypeScript serve à formação; C, SQL, Shell e pequenos trechos de Assembly aparecem pontualmente onde esclarecem o assunto. Não há cursos paralelos dessas linguagens.

Áreas: programação, estruturas de dados, algoritmos, matemática para CS, arquitetura de computadores, sistemas operacionais, redes, bancos de dados, ferramentas, segurança, engenharia de software, sistemas distribuídos, fundamentos de linguagens e teoria da computação.

**Fase inicial:** fundamentos de programação usando TypeScript (00–09). **Fase atual:** expansão para currículo de Ciência da Computação e Engenharia de Software (a partir de 10). Os materiais e trabalhos antigos mantêm seus nomes, caminhos e regras históricas. Nenhuma atividade futura representa avanço já realizado.

O aluno relata ter terminado o capítulo 09. No repositório, a lista está aprovada; há respostas da prova, mas não há resultado formal e a questão 08 está incompleta no arquivo salvo. Registrar como praticamente concluído, com fechamento formal pendente, sem inventar nota. O 10 está concluído; a atividade atual do 11 está em `.context/estado-atual.md`.

## Como percorrer

Conhecido → limitação concreta → pergunta → conceito/ferramenta → aplicação → retorno ao problema original. A metodologia completa está em [AGENTS.md](AGENTS.md).

Cada capítulo terá um guia de estudo que combina fontes, aula autoral personalizada e prática conforme a metodologia do [AGENTS.md](AGENTS.md), sem formato obrigatório. Avançar por domínio demonstrado, sem checkpoint ou prova obrigatória. Os quatro capstones e a sequência abaixo permanecem; fontes e formato didático servem às competências previstas.

Os intervalos abaixo são o planejamento vigente, ajustável conforme desempenho. Guias de estudo serão organizados sob demanda; não há promessa de duração fixa nem percentual global de formação. Pré-requisitos indicados destacam dependências essenciais e se somam à sequência anterior.

| Ordem | Bloco | Capítulos | Transição principal |
|---|---|---|---|
| Base preservada | Fundamentos de programação com TypeScript | 00–09 | Valores → fluxo → coleções → funções |
| 1 | Fundamentos algorítmicos | 10–15 | Funciona → como cresce? |
| 2 | TypeScript para modelagem | 16–19 | Dados concretos → contratos reutilizáveis |
| 3 | Matemática discreta e estruturas de dados | 20–28 | Array → Node → List → Tree → Graph |
| 4 | Padrões de resolução de problemas | 29–34 | Limitação → técnica justificada |
| 5 | TypeScript intermediário e modelagem de software | 35–41 | Estruturas conhecidas → abstrações tipadas |
| 6 | Como o computador funciona | 42–44 | Valores e funções → máquina |
| 7 | Sistemas operacionais e runtime | 45–48 | Execução → recursos e concorrência |
| 8 | Redes | 49–51 | Processo local → comunicação |
| 9 | Bancos de dados e dados | 52–55 | Coleções → persistência, índices e transações |
| 10 | Ferramentas de desenvolvimento | 56–59 | Uso gradual → domínio do fluxo de trabalho |
| 11 | TypeScript profissional | 60–65 | Projetos reais → fronteiras e tipos precisos |
| 12 | Engenharia de software | 66–70 | Código funcional → software verificável e seguro |
| 13 | Linguagens e teoria da computação | 71–74 | Programas → linguagens e limites computacionais |
| 14 | Sistemas distribuídos e design de sistemas | 75–78 | Um sistema → componentes que podem falhar |
| 15 | Matemática para CS II | 79–81 | Intuição de custo/incerteza → análise mais profunda |
| 16 | Integração final | 82 | Conhecimentos → decisões e entrega independente |

## Base preservada — capítulos 00–09

Conteúdo da fase inicial mantido abaixo. Capítulos 00–08 têm aprovação registrada; o 09 tem prática aprovada e fechamento formal pendente. As notas estão em [PROGRESSO.md](PROGRESSO.md). Referências dos READMEs antigos ao antigo capítulo 10 (Tuples) e à metodologia anterior são históricas; a sequência futura é a desta ementa.

### Capítulo 00 - Preparação do Ambiente
- O que é programação
- O que é TypeScript e por que usar
- TypeScript vs JavaScript: diferenças fundamentais
- Instalando Node.js e VS Code
- Instalando TypeScript globalmente
- Primeiro programa: "Hello World"
- Como funciona a compilação TS → JS
- Usando o TS Playground online

### Capítulo 01 - Variáveis e Constantes
- O que são variáveis (analogia: caixas com etiquetas)
- Declarando variáveis com `let`
- Declarando constantes com `const`
- Por que evitar `var`
- Regras de nomenclatura (camelCase, snake_case)
- Type inference (inferência de tipos)
- Type annotation (anotação explícita)
- Escopo de variáveis

### Capítulo 02 - Tipos Primitivos
- O tipo `number` (inteiros, decimais, notação científica)
- Operações matemáticas básicas
- O tipo `string` (textos)
- Concatenação e template literals
- O tipo `boolean` (verdadeiro/falso)
- Os tipos `null` e `undefined`
- Diferença entre null e undefined
- Menção: `bigint` e `symbol` (tipos especiais)

### Capítulo 03 - Operadores e Estruturas Condicionais
- Operadores aritméticos (`+`, `-`, `*`, `/`, `%`, `**`)
- Precedência de operadores
- Operadores de atribuição (`=`, `+=`, `-=`, `*=`, `/=`)
- Operadores de comparação (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`)
- Diferença entre `==` e `===`
- Operadores lógicos (`&&`, `||`, `!`)
- Operador nullish coalescing (`??`)
- Operador de encadeamento opcional (`?.`)

- A estrutura `if`
- `if` / `else`
- `if` / `else if` / `else`
- Condições aninhadas
- Operador ternário (`? :`)
- A estrutura `switch` / `case`
- Truthy e Falsy values
- Boas práticas em condicionais

### Capítulo 04 - Estruturas de Repetição
- O loop `while`
- O loop `do...while`
- O loop `for` tradicional
- Controlando loops: `break`
- Controlando loops: `continue`
- Loops aninhados
- Cuidados com loops infinitos
- Quando usar cada tipo de loop

### Capítulo 05 - Arrays: Fundamentos
- O que são arrays (listas ordenadas)
- Criando arrays tipados
- Sintaxe: `string[]` vs `Array<string>`
- Acessando elementos por índice
- Modificando elementos
- Propriedade `length`
- Métodos básicos: `push`, `pop`, `shift`, `unshift`
- Percorrendo índices com `for`
- Percorrendo valores com `for...of`
- Acumuladores, `continue` e `break` aplicados a arrays
- Arrays multidimensionais e loops aninhados

### Capítulo 06 - Funções: Fundamentos
- O que são funções
- Declaração de função (function declaration)
- Parâmetros e argumentos
- Tipagem de parâmetros
- Tipagem de retorno
- Funções que não retornam: `void`
- Expressão de função (function expression)
- Arrow functions (`=>`)
- Funções como valores
- Diferença entre definir uma função e executar uma função

### Capítulo 07 - Objetos
- O que são objetos
- Criando objetos literais
- Propriedades
- Acessando propriedades: notação de ponto vs colchetes
- Modificando propriedades
- Objetos aninhados
- Tipagem de objetos inline
- Propriedades opcionais
- Métodos
- Spread operator com objetos
- Destructuring de objetos

### Capítulo 08 - Funções: Callbacks e Recursos
- Parâmetros opcionais (`?`)
- Parâmetros com valor default
- Rest parameters (`...args`)
- Funções anônimas
- Funções como valores
- Funções como parâmetros
- O que é um callback
- Tipando callbacks
- Callbacks com arrow functions
- Retorno de callbacks
- Closures (introdução)
- Extra: IIFE (Immediately Invoked Function Expression)

### Capítulo 09 - Arrays: Métodos Avançados
- Revisão: arrays de valores
- Arrays de objetos
- Métodos de array que recebem callbacks
- Iterando com `forEach`
- Transformando com `map`
- Filtrando com `filter`
- Buscando com `find` e `findIndex`
- Verificando com `some` e `every`
- Introdução ao `reduce`
- Encadeamento de métodos
- Spread operator com arrays (`...`)

---

## Bloco 1 — Fundamentos algorítmicos (10–15)

**Pré-requisitos:** loops (04), arrays (05/09), funções e callbacks (06/08), objetos (07). Nenhuma dependência de classes, interfaces ou generics autorais. A notação de tipos em `Set<number>`/`Map<number, number>` será explicada como uso de coleção pronta; criar abstrações genéricas fica para o bloco 5.

**Ponte:** Contains Duplicate passa nas amostras, mas dois loops podem gerar TLE. Em Two Sum, Gabriel já conhece a pergunta pelo complemento `target - número atual`. Primeiro entender o custo, depois encontrar uma estrutura apropriada.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 10 | DSA — Complexidade e Big O | Definir tamanho da entrada e contar operações antes da notação; tempo e espaço auxiliar/total; O(1), O(log n), O(n), O(n log n), O(n²), crescimento exponencial; loops simples, sequenciais e aninhados; pior caso e caso médio com hipóteses explícitas; trade-off tempo × memória. Reconhecer dividir pela metade antes da formalização de logaritmos. Comparar crescimento sem confundir cronômetro com prova assintótica. |
| 11 | DSA — Set, Map e hashing | Pertinência, unicidade, chave/valor, lookup, frequências, igualdade e identidade, colisões e distribuição; custos esperados sob hipóteses de hashing, sem prometer O(1) garantido para qualquer runtime. Escolher Set ou Map pela informação necessária. Comparar Array/Set e Object/Map. Hash functions, chaining e carga intuitiva como fundamentos; provas probabilísticas opcionais. Não implementar hash table genérica agora. |
| 12 | DSA — Arrays e strings como problemas | Percursos, índices, cópias, mutação, custo dos métodos e encadeamentos; strings imutáveis, tamanho/unidade de caractere e limites de Unicode explicitados nos enunciados. Resolver transformações e contagens; criar testes de vazio, repetidos e ausência. Padrões de janelas ficam para 29–31. |
| 13 | DSA — Stack e Queue | Array + push/pop → LIFO; entrada/saída → FIFO; operações restritas, estado vazio, custo de shift e fila com índice de início, retenção de memória e compactação quando pertinente. Implementar versões de números/strings com funções e arrays, sem exigir classes. |
| 14 | DSA — Busca e ordenação | Busca linear e binária; ordenação como pré-condição, limites do intervalo e término; insertion/selection sort, comparação numérica, mutação e estabilidade conceitual; custo quadrático versus n log n. Implementar busca binária iterativa e ordenação simples; não exigir recursão antes de ensiná-la. |
| 15 | DSA — Recursão | Chamada de função conhecida → caso base e problema menor; rastrear pilha, tempo e espaço; término, profundidade e subproblemas repetidos. Comparar versões iterativa/recursiva; retornar à ordenação com merge sort e divisão/conquista, justificando n log n intuitivamente. |

**Revisão oficial:** após 10, reanalisar o custo das tentativas de Two Sum e Contains Duplicate; após 11, tentar revisá-las sem solução fornecida. No 12 e no fechamento do bloco, reapresentar problemas equivalentes sem indicar a estrutura. LeetCode pertinente em todos esses temas; qualidade da análise vale mais que quantidade.

**Saída:** resolver um problema novo, testar limites e justificar custo e alternativa. **C01 — Capstone de fundamentos** encerra o bloco; em seguida voltar à evolução de TypeScript no 16.

## Bloco 2 — TypeScript para modelagem (16–19)

**Pré-requisitos:** bloco 1 e objetos/funções conhecidos. **Ponte:** resultados de busca e pares chave/valor mostram a necessidade de representar formatos e estados com clareza.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 16 | PROG — Tuples | Array versus posição com significado, opcionais, readonly, destructuring e retorno de funções; coordenadas e pares. Escolher tuple ou objeto e justificar legibilidade. |
| 17 | PROG — Type Alias, Union, Intersection e Literal Types | Reutilizar tipos, combinar estruturas, representar alternativas; narrowing básico com typeof e null; discriminated unions introdutórias. Distinguir combinação de campos de estados alternativos sem casts. |
| 18 | PROG — Enums e alternativas | Enums numéricos/string e comparação com union de literais; reconhecer reverse mapping, enums heterogêneos e const enum como detalhes de leitura, sem peso central. Escolher representação pela necessidade, não por obrigação sintática. |
| 19 | PROG — Interfaces fundamentais | Contratos de objetos, opcionais, readonly, compatibilidade estrutural e interface versus type. Modelar dados de uma pequena coleção e justificar as fronteiras. |

**Evidências de saída:** remodelar um problema do bloco 1, representar ausência/estado válido e explicar o contrato. Essa modelagem prepara nós autorreferentes no bloco seguinte.

## Bloco 3 — Matemática discreta e estruturas de dados (20–28)

**Pré-requisitos:** blocos 1–2, especialmente recursão, Set/Map, Stack/Queue e tipos com null. **Ponte:** propriedades verificadas nos loops viram proposições e invariantes; objetos ligados por referências viram estruturas.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 20 | MATH — Lógica, conjuntos, relações e funções | Proposições, conectivos, tabelas-verdade, quantificadores introdutórios; conjuntos e operações; relações e funções matemáticas versus funções de programa. Traduzir condições e contratos em afirmações verificáveis. |
| 21 | MATH — Provas, invariantes e contagem | Contraexemplo, prova direta e indução introdutória ligada a loops/recursão; invariantes e término; soma/produto na contagem e combinatória inicial. Justificar uma busca já conhecida e contar possibilidades de um problema pequeno. |
| 22 | DSA — Nodes e referências | Objeto + referência + null → nó; tipo autorreferente concreto, identidade, alcance e desenho de ligações. Modelar `ListNode` e rastrear mudanças sem classes ou generics. |
| 23 | DSA — Linked Lists | Cabeça, próximo, percurso, inserção, remoção e casos vazios; lista simples e noção de dupla; custos dependem de já possuir ou precisar buscar o nó. Comparar com array e implementar operações com testes de ligação. |
| 24 | DSA — Trees e Binary Trees | Nó com filhos, raiz, folha, altura, subárvore e árvore binária; percursos recursivos e iterativos usando Stack/Queue. Explicar como restrições diferenciam árvore de lista. |
| 25 | DSA — Binary Search Trees | Propriedade de ordenação, busca, inserção e remoção; custo em função da altura; degeneração e balanceamento conceitual. Não exigir implementação de árvore balanceada. |
| 26 | DSA — Heap e Priority Queue | Prioridade versus ordem de chegada; heap binário representado em array, relações pai/filhos, inserção e extração. Distinguir heap-estrutura de heap-memória, que virá no 44. |
| 27 | DSA — Graphs e representação | Remover restrições da árvore; vértices/arestas, direção, pesos, ciclos e conectividade; listas/matrizes de adjacência e respectivos custos. Escolher representação de uma rede pequena. |
| 28 | DSA — BFS e DFS | Percorrer grafos com fila, pilha ou recursão; conjunto de visitados, ciclos e componentes; O(V + E) com lista de adjacência; caminho mínimo em grafo sem pesos por BFS. Explicar por que pesos exigem outras técnicas. |

**Progressão explícita:** Array → Stack/Queue → Node → Linked List → Tree → Graph. Heap reaproveita array e árvore; lógica/invariantes sustentam correção. LeetCode em listas, árvores, heaps e grafos; leitura gradual de implementações curtas.

**Evidências de saída:** modelar e percorrer uma estrutura, testar vazio/ciclo/desbalanceamento, justificar representação e custo. Generics serão uma refatoração posterior, não um pré-requisito oculto.

## Bloco 4 — Padrões de resolução de problemas (29–34)

**Pré-requisitos:** análise, ordenação, recursão, contagem e estruturas do bloco 3. **Ponte:** partir de uma solução que repete trabalho, mantém estado demais ou explora possibilidades sem controle. Descobrir o padrão pela limitação; nunca apresentar apenas uma receita.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 29 | DSA — Two Pointers | Pares em sequência ordenada e percursos de extremos; invariantes, movimentação justificada e contraexemplos quando não há ordem. |
| 30 | DSA — Sliding Window e frequências | Recalcular intervalo → manter estado; janela fixa/variável, Set/Map e contagens; reconhecer quando a condição não permite movimento monotônico. |
| 31 | DSA — Prefix Sum | Muitas consultas de intervalo → pré-processamento; custo de construção, memória, convenção de índices e limites. Comparar com janela conforme o tipo de consulta. |
| 32 | DSA — Greedy introdutório | Escolhas locais em problemas concretos; justificar com argumento de troca simples ou achar contraexemplo. Aplicar a intervalos e prioridade; distinguir de busca exaustiva. |
| 33 | DSA — Backtracking | Árvore de decisões, escolher/explorar/desfazer, poda e estado compartilhado; enumerar combinações sem perder soluções. Relacionar custo com tamanho da árvore de busca. |
| 34 | DSA — Dynamic Programming introdutório | Recursão com subproblemas repetidos → memoização → tabulação; estado, transição, base e ordem; complexidade pelo número de estados e trabalho por estado. Explicar por que uma formulação funciona antes de otimizar memória. |

**Evidências de saída:** problemas misturados sem rótulo de padrão, incluindo leitura, debugging e análise de alternativas. LeetCode com registros de tentativas e revisões, sem metas artificiais de volume.

## Bloco 5 — TypeScript intermediário e modelagem de software (35–41)

**Pré-requisitos:** blocos 2–4. **Ponte:** estruturas concretas já funcionam; mudanças de tipo e requisitos revelam duplicação e contratos frágeis.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 35 | PROG — Interfaces avançadas | Extends, composição, contratos de função, index signatures e declaration merging; hybrid types para reconhecimento. Distinguir contrato útil de hierarquia desnecessária. |
| 36 | PROG — Classes e encapsulamento | Constructor, this, métodos, readonly, public/private/protected, getters/setters e parameter properties; comparar com objetos/funções. Proteger invariantes de Stack ou Queue. |
| 37 | PROG — Herança e polimorfismo | Extends, super, override, abstract e implements; composição versus herança; substituir implementações sob um mesmo contrato com comportamento coerente. |
| 38 | PROG — Narrowing | Typeof, instanceof, in, igualdade, truthiness, discriminantes e exaustividade com never. Refinar estados e tratar ausência sem esconder erros. |
| 39 | PROG — Assertions, predicates e fronteiras | As, as const, satisfies, non-null assertion para leitura crítica; unknown introdutório, predicates e validação real. Distinguir afirmação ao compilador de verificação em runtime. |
| 40 | PROG — Generics | Stack de number → Stack de string → evitar duplicação; funções, interfaces e classes genéricas, inferência e múltiplos parâmetros. Refatorar `Stack<T>`, `Queue<T>`, `ListNode<T>` e `TreeNode<T>`. |
| 41 | PROG — Generics avançados | Constraints, keyof, typeof em tipos, indexed access, defaults e repositórios genéricos; preservar relações entre entradas e saídas. Condicionais aprofundadas no 64. |

**Saída:** refatorar estruturas conhecidas sem perder invariantes ou testes. **C02 — Capstone de modelagem/estruturas** integra blocos 2–5. Leitura de pequenos módulos existentes torna-se parte do trabalho, com contexto limitado.

## Bloco 6 — Como o computador funciona (42–44)

**Pré-requisitos:** funções, recursão, estruturas e análise de espaço. **Ponte:** o programa manipula números e referências; como a máquina os representa e executa?

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 42 | SYS — Representação de dados | Bits, bytes, bases e binário, inteiros com sinal, ponto flutuante, precisão, overflow e codificação de texto. Relacionar limites numéricos/strings a representações concretas. |
| 43 | SYS — CPU e execução | CPU, instruções, registradores, busca/decodificação/execução, noção de Assembly; compilação/interpretação introdutórias e caminho TS → JS → runtime. Acompanhar uma operação simples em diferentes camadas. |
| 44 | SYS — Memória e chamadas | RAM, hierarquia/cache, localidade, endereços, stack/heap de memória e chamadas de função; pequenas experiências em C com ponteiros, alocação/liberação e vida útil; contraste com referências e coleta de lixo em JS. Explicar limites da analogia entre array JS e memória contígua de C. |

**Saída/lab integrador:** prever, observar e explicar representação, chamadas e uso de memória. C e Assembly são instrumentos locais de observação, não novas trilhas.

## Bloco 7 — Sistemas operacionais e runtime (45–48)

**Pré-requisitos:** bloco 6 e callbacks. **Ponte:** executar `node programa.js` pede recursos ao sistema operacional; esperar I/O não é executar mais cálculo.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 45 | SYS — Processos, memória virtual e filesystem | Processo, PID, sistema operacional, espaço virtual, arquivos, diretórios, permissões, descritores e I/O; distinguir arquivo/programa de processo em execução. Observar recursos de um processo próprio. |
| 46 | SYS — Threads e concorrência | Threads, escalonamento, concorrência versus paralelismo, recursos compartilhados, race conditions, sincronização introdutória e deadlock conceitual. Reproduzir e explicar uma disputa controlada. |
| 47 | SYS/PROG — Runtime JavaScript | Call stack, event loop, callbacks, timers, I/O assíncrono, filas e tarefas/microtasks; distinguir modelo geral de detalhes do ambiente Node/browser. Prever ordem e observar bloqueio por cálculo síncrono. |
| 48 | PROG/SYS — Promises e async/await | Estados e composição de Promises, await, propagação de erros, try/catch/finally mínimo, execução sequencial versus concorrente, limites e cancelamento introdutório. Interpretar microtasks/macrotasks conforme o ambiente. Implementar e testar I/O assíncrono com falhas. |

**Promises e async/await são núcleo obrigatório.** Labs de PID, memória, permissões e ordem de execução substituem problemas artificiais de LeetCode. Evidência de domínio: explicar evidências e diagnosticar uma falha de concorrência/runtime sem exigir detalhes internos não ensinados.

## Bloco 8 — Redes (49–51)

**Pré-requisitos:** processos, I/O e assincronismo. **Ponte:** `localhost:3000` → quem recebe a conexão, em qual endereço e por qual porta?

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 49 | NET — Endereços e transporte | Cliente-servidor, IP, interfaces, localhost/loopback, portas, TCP, UDP introdutório e sockets; diferenciar processo, endereço e endpoint. Observar servidor local e conexão recusada. |
| 50 | NET — DNS, HTTP e HTTPS | Resolução de nomes, request/response, métodos, headers, status, corpo, HTTPS/TLS e certificados conceituais; confidencialidade em trânsito versus autenticação da aplicação. Inspecionar troca real com ferramentas simples. |
| 51 | NET/PROG — APIs sobre HTTP | Implementar servidor e cliente mínimos, JSON, contratos, erros, timeout e autenticação/autorização introdutórias; APIs como aplicação dos fundamentos. Laboratório de sucesso, requisição inválida e servidor indisponível. |

**Evidências de saída:** rastrear uma requisição do nome ao processo, interpretar headers/status e explicar falhas. Framework é uma escolha de implementação posterior, não substituto de HTTP.

## Bloco 9 — Bancos de dados e dados (52–55)

**Pré-requisitos:** estruturas/árvores, sistemas, concorrência e redes. **Ponte:** array de objetos funciona para 100 registros; o que muda com 10 milhões, reinício do processo e dois escritores?

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 52 | DATA — Persistência e modelo relacional | Por que bancos existem, tabelas, tipos, chaves primárias/estrangeiras e restrições; SQL SELECT/INSERT/UPDATE/DELETE, filtros e consultas parametrizadas. Diferenciar persistência, busca e organização lógica. |
| 53 | DATA — Modelagem e consultas | Relações, JOIN, agregação, modelagem e normalização; anomalias e desnormalização justificada. Traduzir um domínio em esquema e consultas verificáveis. |
| 54 | DATA — Índices e planos | Busca conhecida → índice; árvores B/B+ conceituais, custo de escrita/espaço, seletividade e query plans. Medir antes/depois com dados controlados e explicar por que um índice pode não ajudar. |
| 55 | DATA — Transações e alternativas | Transações, ACID, isolamento, concorrência e anomalias; NoSQL introdutório, key-value e documentos; consistência e modelagem de acesso. Testar rollback e comparar alternativas sem tratar NoSQL como sinônimo de escala. |

**Saída/lab integrador:** esquema, consultas, índice, plano e transação reproduzíveis em banco descartável. Proteção contra SQL injection começa aqui; senhas, backups e operação reaparecem em engenharia.

## Bloco 10 — Ferramentas de desenvolvimento (56–59)

**Pré-requisitos:** experiências anteriores de execução, I/O, API e banco. **Ponte:** tornar reproduzível um fluxo que já foi usado em pequena escala. Este bloco aprofunda ferramentas introduzidas gradualmente; não é o primeiro contato com elas.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 56 | SWE/SYS — Terminal e Shell | Navegação, filesystem, pipes, redirecionamentos, processos/jobs/sinais, permissões e pequenos scripts Bash; variáveis de ambiente e segredos. Automatizar uma tarefa local de forma previsível e segura. |
| 57 | SWE — Git sólido | Working tree, staging, commits, histórico, diff, branches, merge, conflitos, remoto e rebase conceitual; diferenças entre história local e compartilhada. Explicar e integrar uma mudança sem perder trabalho. |
| 58 | SWE — Ecossistema de projeto | npm, package.json, scripts, dependências diretas/transitivas, lockfile, versionamento semântico, instalação reproduzível, lint e formatting. Diagnosticar ambiente/configuração sem atualização indiscriminada. |
| 59 | SWE — Investigar, medir e verificar | Debugger, breakpoints, stepping, stack traces, logging, profiling, testes automatizados e leitura de documentação. Reproduzir bug, formular hipótese, medir e documentar solução com evidência. |

**Evidências de saída:** receber um repositório pequeno, executá-lo, investigar um bug, criar teste e preparar mudança revisável com Git. Leitura e modificação de código existente passam a ser recorrentes.

## Bloco 11 — TypeScript profissional (60–65)

**Pré-requisitos:** generics, projetos com módulos, runtime, APIs/dados e ferramentas. **Ponte:** trabalhar nas fronteiras reais de um projeto exige distinguir tipo declarado, valor validado e comportamento em execução.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 60 | PROG — Configuração e módulos | tsconfig, target/module, strict mode, strictNullChecks, noImplicitAny, include/exclude/files e interoperabilidade; import/export, import type, organização e resolução de módulos. Diagnosticar configuração; ampliar a introdução prática anterior. |
| 61 | PROG — Tipagem externa | Declaration files, .d.ts, @types, declare e bibliotecas JS; ler ambient declarations e reconhecer triple-slash directives. Distinguir declaração de implementação e limites da confiança em dependências. |
| 62 | PROG — Erros e estados explícitos | Unknown, never, try/catch/finally, erros próprios, assertion functions e Result patterns; diferenciar erro esperado de falha excepcional. Validar fronteiras e preservar informação útil para quem chama. |
| 63 | PROG — Overloading e utility types | Overload signatures/implementation, ordem e alternativa com union; Partial, Required, Readonly, Pick, Omit, Record, ReturnType, Parameters, Exclude, Extract e NonNullable. Selecionar recursos para uma necessidade real sem memorizar catálogo. |
| 64 | PROG — Tipos avançados | Mapped types, conditional types, infer, template literal types e tipos recursivos; ler e construir transformações pequenas com limites claros. Evitar programação de tipos que esconda a regra de negócio. |
| 65 | PROG — Decorators e leitura de APIs especializadas | Propósito, execução e usos de logging/validação; distinguir modelos de decorators e compatibilidade da versão/configuração adotada. Reconhecer variações em classes/métodos/propriedades e modelos legados, sem exigir uso no projeto. |

**Peso pedagógico:** configuração, contratos e erros têm prática robusta; detalhes de declarations, tipos avançados e decorators pedem leitura e aplicação pontual, sem o mesmo peso de algoritmos, sistemas e dados. Tipagem de DOM/eventos/null, prevista no curso antigo, pode aparecer como laboratório contextual após 60, se o projeto usar navegador; não abre uma trilha obrigatória de frontend.

**Evidências de saída:** corrigir uma fronteira não validada, modelar resultados e explicar um tipo de biblioteca com documentação.

## Bloco 12 — Engenharia de software (66–70)

**Pré-requisitos:** implementação, ferramentas, redes, dados e modelagem tipada. **Ponte:** código que funciona em uma amostra precisa sobreviver a mudanças, falhas e outras pessoas lendo-o.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 66 | SWE — Testes e design para testes | Unitários e integração, TDD como técnica, mocking, testes de contrato e limites; decidir o que isolar e o que integrar. Criar teste que detecta defeito real, não apenas reproduz implementação. |
| 67 | SWE — Organização e refatoração | Coesão, acoplamento, responsabilidades, SOLID, DRY/KISS/YAGNI, code smells e refatoração orientada por comportamento. Comparar composição e abstração com custo de mudança. |
| 68 | SWE — Contratos e APIs | Validação, erros, evolução de contratos, modelagem de entradas/saídas e dependências. Alterar comportamento existente com compatibilidade e testes; discutir padrões somente quando resolvem problema concreto. |
| 69 | SWE — Operação e colaboração | Logging, métricas, traces, observabilidade, performance e profiling; documentação, decisões arquiteturais e code review. Investigar problema a partir de evidência e produzir mudança compreensível. |
| 70 | SWE — Segurança de software | Modelagem básica de ameaças, fronteiras de confiança, autenticação versus autorização, menor privilégio, validação, injeção, XSS quando houver web, segredos, hashing de senhas versus hashing de coleções, dependências e backups/restauração. Corrigir falha em ambiente didático; usar bibliotecas adequadas sem inventar criptografia. |

**Saída:** **C03 — Capstone de software/sistemas** integra API, banco, assincronismo, testes, segurança, observabilidade e documentação. Não exigir microsserviços para demonstrar arquitetura.

## Bloco 13 — Linguagens e teoria da computação (71–74)

**Pré-requisitos:** programação, lógica discreta, recursão, árvores, runtime e complexidade. **Ponte:** o aluno já escreve e executa programas; agora examina como descrevê-los, interpretá-los e reconhecer seus limites.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 71 | PROG — Paradigmas e linguagens | Imperativo, declarativo, funcional e orientação a objetos; estado, efeitos, composição, avaliação e sistemas de tipos em nível introdutório. Expressar uma mesma tarefa de duas maneiras e discutir trade-offs. |
| 72 | PROG — Da fonte à execução | Compilador, interpretador, lexer, tokens, parser, gramática e AST; runtime. Experimentar um avaliador pequeno de expressões usando árvores, sem construir uma linguagem completa. |
| 73 | MATH/PROG — Linguagens formais e autômatos | Alfabetos, palavras, linguagens, expressões regulares e autômatos finitos; noção de pilha para aninhamento. Relacionar reconhecimento de formato a estruturas estudadas. |
| 74 | MATH — Computabilidade e complexidade | Máquina de Turing conceitual, decidibilidade, problema da parada e limites; problemas versus algoritmos, classes de complexidade, P e NP, verificação e reduções introdutórias. Não confundir NP com “não polinomial” nem presumir resposta para P versus NP. |

**Evidências de saída:** explicar uma pequena cadeia fonte → AST → execução e distinguir dificuldade prática, crescimento e impossibilidade computacional. Profundidade de big picture, com exemplos concretos.

## Bloco 14 — Sistemas distribuídos e design de sistemas (75–78)

**Pré-requisitos essenciais:** blocos de redes (8), transações/dados (9), concorrência/runtime (7), estruturas (3) e engenharia (12). **Ponte:** a API do capstone agora depende de outro processo; uma parte pode falhar enquanto a outra continua funcionando.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 75 | SYS/NET — Distribuição e falhas | Sistemas distribuídos, falhas parciais, latência, timeout, retries com backoff, duplicação, idempotência e tolerância a falhas. Testar repetição de uma operação sem duplicar seu efeito. |
| 76 | SYS/DATA — Cache e mensageria | Cache/invalidação, filas, produtores/consumidores, confirmação, reentrega, ordenação e pressão de carga. Relacionar Queue à mensageria e Map ao cache, sem confundir estrutura local com garantias distribuídas. |
| 77 | DATA/SYS — Replicação e particionamento | Replicação, particionamento, consistência e disponibilidade; CAP no contexto de partição de rede, sem regra simplista “escolha dois” em qualquer situação. Comparar cenários e consequências para dados. |
| 78 | SWE/SYS — Design de sistemas | Escalabilidade vertical/horizontal, load balancing, gargalos, capacidade, observabilidade distribuída e requisitos não funcionais. Propor desenho mínimo, estimar carga e justificar evolução com evidência. |

**Saída/lab integrador:** provocar indisponibilidade/latência em componentes locais e explicar comportamento, recuperação e limites. Não exigir cluster de produção ou Kubernetes como pré-requisito.

## Bloco 15 — Matemática para CS II (79–81)

**Pré-requisitos:** matemática inicial (20–21), algoritmos, grafos e observações de sistemas. **Ponte:** estimativas de colisões, latência, estados de busca e crescimento precisam de sustentação mais precisa.

| Cap. | Área e tema | Conteúdo e competência esperada |
|---|---|---|
| 79 | MATH — Combinatória e probabilidade | Retomar soma/produto; permutações, combinações, eventos, probabilidade condicional, independência e valor esperado. Aplicar a contagem de estados, colisões e falhas, explicitando hipóteses. |
| 80 | MATH — Estatística básica | Amostra/população, média, mediana, dispersão, percentis, viés e incerteza; correlação versus causalidade. Interpretar benchmarks e latências sem concluir a partir de uma única medição. |
| 81 | MATH — Grafos, recorrências e análise assintótica | Graus, caminhos, conectividade e propriedades de árvores/grafos; recorrências de algoritmos conhecidos, somatórios, logaritmos e crescimento; aprofundar O/Ω/Θ e análise amortizada introdutória. Revisitar merge sort, DP e fila com compactação. |

**Evidências de saída:** justificar uma estimativa e interpretar um experimento, declarando limites. Sustentar futuros estudos de ML/IA sem transformar a formação em graduação de matemática.

## Bloco 16 — Integração final (82)

**Pré-requisitos:** competências essenciais dos blocos anteriores, demonstradas na prática, nos projetos e nas revisões. **Ponte:** reunir as decisões antes estudadas separadamente em uma entrega independente.

### Capítulo 82 — Capstone final: construir, explicar e evoluir um sistema

Definir um problema com usuários, dados e restrições reais de escopo pequeno. Projetar e implementar com TypeScript, algoritmos/estruturas adequados, banco, comunicação por API, testes, validação e erros, Git, documentação e observabilidade. Considerar segurança, desempenho, falhas e arquitetura, sem impor todos os padrões ou tecnologias estudados.

Entrega: briefing e critérios de aceitação, implementação reproduzível, testes de comportamento/integração, decisões com alternativas descartadas, medidas justificadas e demonstração. A avaliação inclui explicar um módulo, diagnosticar falha, modificar requisito e defender escolhas; volume de código não é critério de sucesso. Distribuir componentes somente quando o problema justificar.

## Capstones e transições de nível

| Marco | Momento | Integração e evidências |
|---|---|---|
| C01 — Fundamentos | Após 15 | Analisador de registros em memória: decomposição em funções, estruturas básicas, buscas/contagens, limites, testes simples e comparação de custo. Retomar fundamentos da antiga Calculadora quando úteis, sem exigir I/O interativo ainda não ensinado. |
| C02 — Modelagem/estruturas | Após 41 | Organizador de tarefas/dependências ou domínio equivalente: contratos, estruturas e algoritmos escolhidos pelo aluno, generics onde reduzirem duplicação, testes e justificativa de representação. |
| C03 — Software/sistemas | Após 70 | Serviço pequeno com API, persistência, I/O assíncrono, tratamento de erros, segurança, testes e observabilidade; execução reproduzível e mudança de requisito. |
| C04 — Integração final | Capítulo 82 | Sistema integrado, decisões arquiteturais, investigação de falhas, evolução e defesa independente. |

Temas são propostas de briefing, não aulas/projetos já criados. Ao chegar ao marco, adaptar domínio e tamanho ao desempenho/interesse. Não acrescentar automaticamente uma prova de bloco ao capstone. Os projetos antigos Calculadora, Contatos, Biblioteca e Financeiro não têm entregas registradas; sua substituição no planejamento não representa conclusão retroativa.

## Competências transversais e introduções antecipadas

| Quando | Introdução mínima | Reaparição/aprofundamento |
|---|---|---|
| Base 00–09 | Execução no terminal, tipos, leitura de erros, testes manuais e documentação já presentes | Preservar o que foi estudado; não atribuir domínio de Git/testes ainda não avaliado |
| 10–15 / C01 | Contagem de operações, medição controlada, debugger/breakpoints, assertions/testes simples; diff/commit local para registrar tentativas | Prática DSA e revisões; ferramentas completas em 56–59 |
| 16–28 | Consulta autônoma de APIs, contratos, invariantes e testes de estruturas | Generics e engenharia |
| C01/C02, quando houver múltiplos arquivos | Import/export, script npm e configuração mínima necessária, explicados no contexto | Aprofundamento em 58/60; não cobrar módulos antes dessa introdução |
| 45–51 | Permissões, processos, variáveis de ambiente, tratamento de erros e inspeção HTTP | Ferramentas, segurança e distribuídos |
| 52–55 | SQL parametrizado, dados descartáveis, testes de persistência e concorrência | Engenharia e capstones |
| 56 em diante | Ler e modificar código existente, testes automatizados, documentação e revisão | Reaparecer em todo projeto, lab e avaliação pertinente |

Narrowing mínimo aparece no 17 para permitir estruturas com null; refinamento completo no 38. Unknown/validação no 39 prepara fronteiras; Result/erros no 62 aprofunda experiências de runtime e APIs. Recorrências formais ficam no 81; custo de recursão começa no 15. Isso é progressão em espiral, não repetição integral de aulas.

## Mapa de transição do planejamento antigo

| Conteúdo antigo ainda futuro | Destino atual |
|---|---|
| 10 Tuples; 11 Type Alias/Union/Intersection; 12 Enums; 13 Interfaces | 16, 17, 18, 19 |
| 14 Interfaces avançadas; 15–17 Classes | 35; 36–37 |
| 18 Narrowing; 19 Assertions/Predicates; 21–22 Generics | 38; 39; 40–41 |
| 20 DOM | Lab contextual após 60 quando houver navegador |
| 23 Configuração; 24 Módulos; 25 Declaration Files | Introduções conforme necessidade; aprofundamentos 60–61 |
| 26 Erros; 27 Overloading; 28 Utility Types; 29 Tipos avançados | 62; 63; 63; 64 |
| 30 Decorators; 31 Boas práticas | 65 com peso reduzido; bloco 12 e prática transversal |
| B1 JS moderno, Promises e async/await | Recursos já conhecidos preservados; assincronismo obrigatório em 47–48 |
| B2 React; B3 Node/Express | Frameworks como aplicações contextuais dos capstones, escolhidos quando úteis; redes, APIs e dados no núcleo obrigatório |
| P1 Calculadora, P2 Contatos, P3 Biblioteca, PF Financeiro | Planejamento substituído pelos quatro capstones; nenhuma entrega antiga inventada |

## MBA, profundidade e adaptação

**Nossa ementa define a formação. O MBA influencia prioridades pontuais.** Docker, cloud, Kubernetes, DevOps, microsserviços, DDD, Clean Architecture, design patterns, IA/RAG/agentes e frameworks podem motivar exemplos, mas não impõem a sequência. Queue prepara mensageria; processos/redes preparam containers; TCP/HTTP prepara APIs; índices preparam bancos; concorrência prepara distribuídos; testes preparam TDD.

O professor pode antecipar uma introdução curta necessária, aprofundar uma sobreposição ou transformar teoria do MBA em experimento, registrando a decisão sem abrir matérias simultâneas. Não eliminar fundamentos para acompanhar modismos nem insistir em repetir superficialmente conteúdo já demonstrado.

Guias, recortes de referências, seleção de problemas, apoios personalizados, ferramentas dos labs e temas definitivos dos capstones serão definidos sob demanda. Na reformulação não foram criadas pastas futuras. **Atualização de 2026-09-16:** o capítulo 10 foi concluído e o [capítulo 11 — Set, Map e hashing](11-set-map-e-hashing/README.md) está em andamento: fundamentos estudados conforme relato, continuação prática com Set/Map e domínio ainda não avaliado. Os demais materiais futuros continuam sob demanda.

*Atualização metodológica: 2026-09-10; sequência curricular aprovada preservada.*
