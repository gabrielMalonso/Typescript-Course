# Formação em Ciência da Computação e Engenharia de Software

Formação generalista sólida, com TypeScript como linguagem principal e prioridade em construir software e adquirir capacidade profissional desde cedo.

## Princípios da formação

- **Domínio prático acima de checklist:** avançar quando conseguir implementar, testar, depurar e adaptar; leitura, quantidade de exercícios e provas não são critérios isolados.
- **Construir desde cedo:** aplicar cada conjunto de competências em software utilizável, desenvolvendo gradualmente um portfólio.
- **Fundamentos de CS preservados:** estudar algoritmos, matemática, sistemas e teoria com profundidade útil à compreensão e à resolução de problemas.
- **Progressive disclosure:** aprender o suficiente para construir primeiro e aprofundar mecanismos depois; introduções devem explicitar seus limites e os pré-requisitos mínimos.
- **Revisão espaçada:** retomar problemas e decisões em sessões e projetos posteriores, sem indicar antecipadamente a técnica; LeetCode entra quando pertinente, sem quota.
- **Projetos como integração:** combinar competências, ler e modificar código existente e evoluir uma entrega após mudanças de requisito.
- **Explicar decisões e custos:** justificar correção, tempo, memória, alternativas e limites; medir quando necessário, distinguindo observação de garantia.

**Ponto de partida:** capítulos 1–15 concluídos conforme relato; estudo atual no bloco 16–19. A ordem e a numeração 00–19 permanecem. Materiais e trabalhos existentes são preservados; referências antigas a capítulos futuros podem usar outra numeração. A sequência vigente é a abaixo.

O percurso é sequencial: **fundamento → aplicação → fundamento → aplicação → projeto → aprofundamento**. SQL, Shell, C e Assembly aparecem no contexto necessário. Projetos e capstones são marcos planejados, sem conclusão presumida; podem evoluir o mesmo produto. A metodologia das aulas está em [.context/prompts-agentes.md](.context/prompts-agentes.md).

## Base preservada — Programação com TypeScript (00–09)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 00 | Preparação do ambiente | Programação, TS versus JS, Node, VS Code, tsc, ts-node, Playground e compilação TS → JS; criar, executar e observar o primeiro programa. |
| 01 | Variáveis e constantes | let/const, leitura de var, nomes, inferência, anotação e escopos; declarar e atualizar valores com intenção clara. |
| 02 | Tipos primitivos | number, operações, notação científica, string, concatenação/templates, boolean, null/undefined e reconhecimento de bigint/symbol; representar valores e ausência. |
| 03 | Operadores e condicionais | Aritmética, precedência, atribuição, comparações, igualdade estrita, lógica, truthy/falsy, if/else, ternário, switch, ?? e ?.; traduzir regras em decisões. |
| 04 | Repetição | while, do...while, for, break/continue e loops aninhados; controlar estado, limites e término, evitando repetições infinitas. |
| 05 | Arrays fundamentais | Tipagem, índices, length, push/pop/shift/unshift, referências, for/for...of, acumuladores e matrizes; percorrer e modificar coleções corretamente. |
| 06 | Funções fundamentais | Declaração, expressão, arrow, parâmetros, argumentos, retorno, void e funções como valores; decompor tarefas e distinguir definição de chamada. |
| 07 | Objetos | Literais, acesso, tipagem inline, opcionais, aninhamento, métodos, spread, destructuring e arrays de objetos; modelar registros e distinguir cópia de referência. |
| 08 | Callbacks e recursos de funções | Opcionais, defaults, rest, funções anônimas, callbacks tipados, retorno e closures; passar comportamentos e reconhecer IIFE. |
| 09 | Métodos de arrays | forEach, map, filter, find/findIndex, some/every, reduce, encadeamento e spread; escolher pela intenção, tratando vazio, ausência e cópias rasas. |

## Bloco 1 — Fundamentos algorítmicos (10–15)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 10 | Complexidade e Big O | Entrada, contagem, casos, O/Ω/Θ, crescimento constante a exponencial e espaço auxiliar/total; analisar loops e comparar tempo × memória. |
| 11 | Set, Map e hashing | Presença, associações, frequência, identidade, colisões, chaining e carga; escolher Array/Set/Object/Map e explicar custos esperados sob hipóteses, sem promessas universais. |
| 12 | Arrays e strings como problemas | Percursos, limites, mutação, cópias, custos de métodos e expansão amortizada; transformar e contar, distinguindo UTF-16, pontos de código e grafemas. |
| 13 | Stack e Queue | LIFO/FIFO, vazio, operações restritas, fila com índice e compactação; implementar com funções/arrays, explicar custo de shift e memória retida. |
| 14 | Busca e ordenação | Busca linear/binária, pré-condições, limites, insertion/selection sort, comparadores, estabilidade e mutação; escolher considerando também o custo de preparar os dados. |
| 15 | Recursão | Caso base, problema menor, pilha, término, profundidade e trabalho repetido; comparar com iteração e implementar merge sort/divisão e conquista. |

**C01 — Fundamentos:** analisador de registros em memória, com funções, buscas/contagens, testes de limites e comparação de custos. Marco preservado, sem exigir entrega retroativa para reconhecer o estudo concluído.

## Bloco 2 — TypeScript para modelagem (16–19)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 16 | Tuples | Posições, rótulos, opcionais, readonly, destructuring e retornos; escolher entre tuple, array e objeto pela clareza do contrato. |
| 17 | Aliases, unions, intersections e literais | Nomear contratos, combinar campos e separar estados; usar narrowing básico de typeof/ausência e unions discriminadas sem casts. |
| 18 | Enums e alternativas | Enums numéricos/string versus unions de literais; escolher representação e reconhecer reverse mapping, enums heterogêneos e const enum. |
| 19 | Interfaces fundamentais | Contratos, opcionais, readonly, compatibilidade estrutural e interface versus type; modelar uma coleção e suas fronteiras. |

**Aplicação:** remodelar um problema conhecido, representando resultados e ausência explicitamente.

## Bloco 3 — Primeiro frontend com TypeScript (20–28)

Aplicar a modelagem em uma interface real. Usar APIs genéricas prontas, como hooks, com explicação local da notação; criar abstrações genéricas fica para o bloco 7.

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 20 | HTML/CSS essencial e navegador | HTML semântico, formulários, acessibilidade, cascata, box model, Flexbox/Grid e responsividade; construir uma página e reconhecer DOM, eventos e elementos possivelmente ausentes. |
| 21 | Git/GitHub, npm e tooling aplicado | Terminal básico, diff/commits, staging, branches/remoto, package.json, scripts, lockfile, import/export, strict, Vite e lint/formatting; executar, versionar e compilar um projeto reproduzível. |
| 22 | React + TS: componentes e props | JSX/TSX, componentes funcionais, composição, children e props tipadas; transformar dados em interface e dividir responsabilidades. |
| 23 | Estado e eventos | useState, callbacks/eventos tipados, atualizações imutáveis, estado derivado e elevação de estado; implementar interações com uma fonte de verdade clara. |
| 24 | Formulários, listas e renderização | Inputs controlados, envio, validação local, map, keys e renderização condicional; criar fluxos acessíveis e representar vazio, sucesso e erro. |
| 25 | Assincronismo para construir | Promises, estados, async/await, try/catch/finally e composição básica; aguardar operações e distinguir falhas de resultados válidos. |
| 26 | HTTP e consumo de APIs | URL, métodos, status, headers, JSON, HTTPS básico e fetch; verificar resposta e validar dados externos como unknown, com narrowing/validação introdutórios. |
| 27 | Dados assíncronos em React | useEffect para sincronização externa, dependências, limpeza, cancelamento e respostas fora de ordem; exibir carregamento/erro e evitar requisições desnecessárias. |
| 28 | Debugging e primeiros testes | DevTools, debugger, breakpoints/stepping, stack traces, documentação, testes de funções/componentes e interação; reproduzir um bug e testar comportamento visível, incluindo falha de API. |

**Projeto de portfólio:** frontend consumindo API, com busca/filtros, formulário, layout responsivo, estados de rede, testes e README para execução/build e demonstração. Entrega utilizável antes dos próximos aprofundamentos de CS.

## Bloco 4 — Backend, SQL e primeira aplicação completa (29–34)

Construir o serviço e a persistência do frontend. Introduzir operações seguras agora; mecanismos de redes, bancos e concorrência serão aprofundados após estruturas e sistemas.

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 29 | Node e servidor HTTP | Node versus browser, I/O de arquivos e servidor, rotas e middleware com Express ou equivalente; implementar API pequena com configuração por ambiente. |
| 30 | Contratos e validação de API | Entradas externas, schemas/validação em runtime, parâmetros, corpo, status e erros; implementar CRUD e limites de requisição sem confiar apenas nos tipos. |
| 31 | Persistência e SQL essencial | Tabelas, tipos, chaves primárias/estrangeiras, restrições, SELECT/INSERT/UPDATE/DELETE e filtros; persistir dados com consultas parametrizadas e migração inicial. |
| 32 | Relações e consultas | Modelagem relacional inicial, JOIN, agregação, paginação e transações básicas; consultar entidades relacionadas e preservar uma atualização indivisível. |
| 33 | Integração e testes do serviço | Conectar frontend/API/banco; testar sucesso, dados inválidos, ausência, falhas e rollback em banco descartável; reproduzir ambiente e diagnosticar erros entre camadas. |
| 34 | Entrega e colaboração segura | Pull requests, revisão, merge/conflitos e rebase conceitual; distinguir histórico local/compartilhado, aplicar CORS, cookies/sessões, autenticação/autorização, proteção CSRF, biblioteca de senhas, segredos e execução/deploy. |

**Projeto de portfólio:** evoluir o frontend para aplicação com API própria, SQL, validação, controle de acesso e testes. Demonstrar persistência após reinício e uma alteração de requisito revisável.

## Bloco 5 — Matemática discreta e estruturas ligadas (35–39)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 35 | Lógica, conjuntos, relações e funções | Proposições, conectivos, tabelas-verdade, quantificadores, conjuntos e funções matemáticas; traduzir condições e contratos em afirmações verificáveis. |
| 36 | Provas, invariantes e contagem | Contraexemplo, prova direta, indução, invariantes/término e regras de soma/produto; justificar algoritmos conhecidos e contar possibilidades. |
| 37 | Nodes e referências | Objetos, identidade, alcance, null e tipos autorreferentes concretos; desenhar ligações e rastrear mudanças sem exigir classes ou generics. |
| 38 | Linked Lists | Lista simples, noção de dupla, percurso, inserção/remoção e vazio; implementar operações, testar ligações e comparar custos com arrays. |
| 39 | Trees e Binary Trees | Raiz, filhos, folhas, altura e subárvores; implementar percursos recursivos/iterativos com Stack/Queue e explicar as restrições da estrutura. |

**Aplicação:** explorar uma hierarquia de categorias ou a árvore do DOM em uma interface; testar percursos e justificar representação, invariantes e custo.

## Bloco 6 — Índices, prioridades e grafos (40–43)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 40 | Binary Search Trees | Ordenação, busca, inserção/remoção, altura e degeneração; analisar custos e entender balanceamento sem exigir implementação de árvore balanceada. |
| 41 | Heap e Priority Queue | Heap binário em array, pai/filhos, inserção/extração; implementar prioridade e distinguir heap-estrutura de heap-memória. |
| 42 | Graphs e representação | Vértices/arestas, direção, pesos, ciclos, conectividade e listas/matrizes de adjacência; escolher uma representação e analisar seu espaço. |
| 43 | BFS e DFS | Fila, pilha/recursão, visitados, ciclos e componentes; justificar O(V + E) e encontrar caminho mínimo sem pesos com BFS. |

**Aplicação:** acrescentar dependências ou priorização ao organizador de tarefas; visualizar e percorrer o grafo, tratando ciclos e explicando os limites para caminhos com pesos.

## Bloco 7 — TypeScript intermediário e abstrações (44–50)

Refatorar contratos e estruturas já usados, mantendo comportamento e testes.

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 44 | Interfaces avançadas | Extends, composição, contratos de função, index signatures, declaration merging e leitura de hybrid types; definir contratos úteis sem hierarquias desnecessárias. |
| 45 | Classes e encapsulamento | Constructor, this, public/private/protected, readonly, getters/setters e parameter properties; proteger invariantes e comparar classes com objetos/funções. |
| 46 | Herança e polimorfismo | Extends, super, override, abstract e implements; substituir implementações coerentemente e escolher entre composição e herança. |
| 47 | Narrowing completo | Typeof, instanceof, in, igualdade, truthiness, discriminantes e exaustividade com never; refinar estados e tratar ausência. |
| 48 | Assertions, predicates e fronteiras | As, as const, satisfies, predicates e unknown; distinguir validação real de afirmação ao compilador e reconhecer os riscos de non-null assertions. |
| 49 | Generics | Funções, interfaces/classes genéricas, inferência e múltiplos parâmetros; refatorar Stack/Queue/ListNode/TreeNode preservando tipos e invariantes. |
| 50 | Generics avançados | Constraints, keyof, typeof em tipos, indexed access e defaults; preservar relações entre entradas/saídas e avaliar contratos genéricos de repositório. |

**C02 — Modelagem/estruturas:** organizador de tarefas/dependências ou domínio equivalente, com contratos, estruturas escolhidas, generics onde reduzirem duplicação, testes e justificativa de custos.

## Bloco 8 — Padrões de resolução de problemas (51–56)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 51 | Two Pointers | Sequências ordenadas, extremos e invariantes; justificar movimentação e encontrar contraexemplos quando as pré-condições falham. |
| 52 | Sliding Window e frequências | Janelas fixas/variáveis, Set/Map e contagens; manter estado e reconhecer limites de condições não monotônicas. |
| 53 | Prefix Sum | Pré-processamento, consultas de intervalo, índices e memória; comparar com janela pelo custo total das consultas. |
| 54 | Greedy introdutório | Intervalos e prioridades, escolhas locais, argumento de troca e contraexemplos; justificar quando uma escolha preserva a solução. |
| 55 | Backtracking | Árvore de decisões, escolher/explorar/desfazer, poda e estado compartilhado; enumerar possibilidades sem perder soluções e analisar a busca. |
| 56 | Dynamic Programming | Subproblemas repetidos, memoização/tabulação, estado, transição, base e ordem; justificar a formulação e o custo por estados antes de otimizar memória. |

**Aplicações:** após 53, implementar consultas de períodos em um painel; após 56, resolver agendamento ou planejamento pequeno. Comparar com uma solução simples e resolver problemas misturados sem rótulo de técnica.

## Bloco 9 — Engenharia de software (57–61)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 57 | Testes e design para testes | Unitários, integração, contrato e ponta a ponta; TDD como técnica, mocking e limites; selecionar testes que detectem defeitos reais. |
| 58 | Organização, arquitetura e refatoração | Coesão, acoplamento, responsabilidades, SOLID, DRY/KISS/YAGNI e code smells; refatorar por comportamento e justificar abstrações pelo custo de mudança. |
| 59 | Contratos e evolução de APIs | Validação, erros, compatibilidade, entradas/saídas e dependências; mudar um contrato com testes e usar padrões quando resolverem uma necessidade concreta. |
| 60 | Operação e colaboração | Logs, métricas, traces, profiling, performance, documentação, decisões arquiteturais e code review; investigar uma falha e preparar uma mudança compreensível. |
| 61 | Segurança de software | Ameaças, fronteiras de confiança, menor privilégio, autenticação/autorização, injeção/XSS/CSRF, hashing de senhas, segredos, dependências e backups/restauração; corrigir falhas didáticas com bibliotecas adequadas. |

**C03 — Software/sistemas:** consolidar a aplicação com API, SQL, assincronismo, segurança, observabilidade e testes; investigar uma falha e mudar um requisito. Arquitetura deve atender ao problema, sem obrigação de microsserviços.

## Bloco 10 — TypeScript profissional (62–67)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 62 | Configuração, módulos e dependências | tsconfig, target/module, strictNullChecks/noImplicitAny, include/exclude/files, resolução, interoperabilidade e import type; investigar dependências transitivas, semver, lockfile, instalação reproduzível, lint/formatting. |
| 63 | Tipagem externa | .d.ts, @types, declare, ambient declarations e reconhecimento de triple-slash; integrar bibliotecas JS e distinguir declaração de implementação. |
| 64 | Erros e estados explícitos | Unknown, never, erros próprios, assertion functions, try/catch/finally e Result; validar fronteiras e separar erro esperado de falha excepcional. |
| 65 | Overloading e utility types | Assinaturas/implementação versus unions; Partial/Required/Readonly, Pick/Omit/Record, ReturnType/Parameters, Exclude/Extract/NonNullable; transformar contratos por uma necessidade real. |
| 66 | Tipos avançados | Mapped/conditional types, infer, template literal types e recursão em tipos; ler e construir transformações pequenas sem esconder regras de negócio. |
| 67 | Decorators e APIs especializadas | Propósito, execução, logging/validação, modelos atuais/legados e compatibilidade; reconhecer usos em classes/métodos/propriedades, sem exigir adoção no projeto. |

**Aplicação:** corrigir uma fronteira não validada no projeto e integrar uma biblioteca. Configuração, contratos e erros têm prioridade; tipos sofisticados e decorators pedem leitura e uso pontual.

## Bloco 11 — Frontend e arquitetura aprofundados (68–70)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 68 | React e organização de estado | Hooks próprios, useReducer, Context, refs e composição; separar estado local/compartilhado/remoto e manter efeitos ligados à sincronização externa. |
| 69 | Navegação e fluxos completos | Rotas, URL, formulários, cache de dados, acessibilidade e recuperação de erros; organizar telas e testar uma jornada com API e controle de acesso. |
| 70 | Arquitetura e performance frontend | Fronteiras de componentes/módulos, testes, profiling, renders, listas grandes e bundle; medir gargalos e melhorar o projeto com abstrações proporcionais. |

**Projeto:** evoluir o frontend do C03 com múltiplas telas e uma jornada completa, demonstrando melhoria mensurável e decisões de estado/arquitetura.

## Bloco 12 — Como o computador funciona (71–73)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 71 | Representação de dados | Bits/bytes, bases, binário, inteiros com sinal, ponto flutuante, precisão/overflow e codificação; explicar limites de números e textos. |
| 72 | CPU e execução | Instruções, registradores, busca/decodificação/execução, Assembly, compilação/interpretação e TS → JS → runtime; rastrear uma operação entre camadas. |
| 73 | Memória e chamadas | RAM, cache/localidade, endereços, stack/heap, chamadas, ponteiros e alocação/liberação em C; contrastar com referências/GC e limites da analogia de arrays JS. |

**Lab:** medir alocações e chamadas de um algoritmo conhecido; explicar precisão, memória viva e coleta. C/Assembly servem a experimentos pequenos.

## Bloco 13 — Sistemas operacionais e runtime (74–77)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 74 | Processos, filesystem e Shell | PID, memória virtual, permissões, descritores/I/O, pipes, redirecionamentos, jobs/sinais, ambiente e scripts Bash; observar recursos e automatizar uma tarefa local segura. |
| 75 | Threads e concorrência | Escalonamento, concorrência/paralelismo, recursos compartilhados, races, sincronização e deadlock; reproduzir uma disputa controlada e explicar sua correção. |
| 76 | Runtime JavaScript | Call stack, event loop, timers, I/O, tarefas/microtasks e diferenças Node/browser; prever ordem e diagnosticar bloqueio por cálculo síncrono. |
| 77 | Assincronismo aprofundado | Composição de Promises, propagação de erros, execução sequencial/concorrente, limites e cancelamento; testar falhas e controlar carga no serviço. |

**Lab:** observar PID, permissões, memória e ordem de execução; diagnosticar uma falha do backend e demonstrar controle de concorrência sem bloquear o runtime.

## Bloco 14 — Redes aprofundadas (78–80)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 78 | Endereços e transporte | Cliente-servidor, IP, interfaces, loopback, portas, TCP/UDP e sockets; distinguir endereço/processo/endpoint e investigar conexão recusada. |
| 79 | DNS, HTTP e HTTPS | Resolução, request/response, métodos, headers/status/corpo, TLS e certificados; rastrear uma troca e separar proteção em trânsito de autenticação da aplicação. |
| 80 | APIs e falhas de comunicação | Cliente/servidor mínimos, JSON, contratos, erros, timeout e controle de acesso; explicar requisição inválida, servidor indisponível e limites do framework. |

**Lab:** rastrear uma requisição do nome ao processo e reproduzir falhas de rede no projeto.

## Bloco 15 — Bancos de dados aprofundados (81–83)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 81 | Modelagem e evolução de dados | Normalização, anomalias, desnormalização justificada e migrações; revisar o esquema e as consultas conforme requisitos e padrões de acesso. |
| 82 | Índices e planos | Árvores B/B+ conceituais, seletividade e custos de escrita/espaço; interpretar query plans e medir quando um índice ajuda. |
| 83 | Transações e alternativas | ACID, isolamento, concorrência/anomalias e rollback; comparar relacional, key-value e documentos/NoSQL por acesso e consistência, sem presumir escala. |

**Lab:** medir consultas com dados controlados, provocar uma anomalia de concorrência e verificar a correção e a restauração de um backup em banco descartável.

## Bloco 16 — Matemática para análise e sistemas (84–86)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 84 | Combinatória e probabilidade | Permutações, combinações, eventos, probabilidade condicional, independência e valor esperado; estimar estados, colisões e falhas com hipóteses explícitas. |
| 85 | Estatística básica | Amostra/população, média/mediana, dispersão, percentis, viés, incerteza e correlação/causalidade; interpretar benchmarks e latências com medições repetidas. |
| 86 | Grafos, recorrências e análise assintótica | Graus, caminhos e propriedades de árvores/grafos; somatórios, logaritmos, recorrências, O/Ω/Θ e análise amortizada; justificar merge sort, DP e compactação. |

**Aplicação:** analisar benchmarks do projeto e revisar uma estimativa de custo/capacidade, declarando limites. Aprofundamento formal acompanha as decisões que precisa sustentar.

## Bloco 17 — Sistemas distribuídos e design de sistemas (87–90)

Aplicar redes, concorrência, transações e medidas de carga a componentes que podem falhar separadamente.

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 87 | Distribuição e falhas | Falhas parciais, latência, timeout, retries/backoff, duplicação, idempotência e tolerância; repetir uma operação sem duplicar seu efeito. |
| 88 | Cache e mensageria | Invalidação, produtores/consumidores, confirmação, reentrega, ordenação e pressão de carga; distinguir estruturas locais de garantias distribuídas. |
| 89 | Replicação e particionamento | Consistência, disponibilidade, replicação e partições; aplicar CAP no contexto de partição de rede e comparar consequências para dados. |
| 90 | Design de sistemas | Escala vertical/horizontal, load balancing, gargalos, capacidade, observabilidade distribuída e requisitos não funcionais; propor arquitetura mínima e justificar sua evolução. |

**Projeto/lab:** adicionar um processamento assíncrono ou cache ao serviço quando útil; provocar latência/indisponibilidade e explicar recuperação. Componentes locais bastam; clusters/Kubernetes não são pré-requisitos.

## Bloco 18 — Linguagens e teoria da computação (91–94)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 91 | Paradigmas e linguagens | Imperativo, declarativo, funcional e OO; estado, efeitos, composição, avaliação e sistemas de tipos; expressar uma tarefa de duas formas e discutir custos. |
| 92 | Linguagens formais e autômatos | Alfabetos, palavras, linguagens, regex, autômatos finitos e pilha para aninhamento; relacionar reconhecimento de formatos a estruturas conhecidas. |
| 93 | Da fonte à execução | Compilador/interpretador, lexer/tokens, gramática, parser, AST e runtime; construir um pequeno avaliador de expressões com árvores. |
| 94 | Computabilidade e complexidade | Máquina de Turing, decidibilidade, parada, classes, P/NP, verificação e reduções; distinguir crescimento, dificuldade prática e impossibilidade computacional. |

**Aplicação:** testar o avaliador, explicar fonte → AST → execução e os limites do reconhecimento. Teoria tem exemplos concretos; NP não significa “não polinomial”.

## Bloco 19 — Integração final (95)

| Cap. | Tema | Conteúdo e competência |
|---|---|---|
| 95 | C04 — Construir, explicar e evoluir um sistema | Definir problema, usuários, dados e restrições; entregar sistema em TypeScript com interface, API, persistência, testes, segurança e observabilidade, escolhendo estruturas e arquitetura pelo problema. |

**Entrega:** critérios de aceitação, execução/build/deploy reproduzíveis, testes de comportamento/integração, decisões e medidas justificadas, demonstração de portfólio. Explicar um módulo, diagnosticar uma falha e modificar um requisito com autonomia; distribuir componentes somente quando necessário.
