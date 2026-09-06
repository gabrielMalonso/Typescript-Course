# Notas do Professor

> Arquivo de controle do Claude - Observações livres sobre o curso

---

### 2026-09-06 - Lista do Capítulo 09 e recalibração da leitura real

Gabriel concluiu toda a lista e o bônus. Os arquivos compilam em modo estrito e mostram domínio suficiente dos métodos avançados de arrays. As únicas omissões são pequenas: exibir apenas os códigos no `ex21` e rastrear o acumulador no `ex31`; não bloqueiam a prova.

Gabriel relatou que as leituras de código real estão complexas demais e que se perde no contexto, sem clareza se a atividade ajuda. O formato atual de quatro recortes não está cumprindo sua função de ponte para código real. Neste capítulo, a leitura foi dispensada. Nos próximos capítulos, não criar essa atividade automaticamente nem tratá-la como requisito: Gabriel solicitará sob demanda quando quiser ver algum conteúdo aplicado em um projeto real.

### 2026-09-05 - Execução simples e autonomia nos exercícios

Gabriel está no `ex23.ts` do Capítulo 09. O erro de reconhecimento de `find` vinha do alvo padrão de `tsc arquivo.ts`. Configuração do curso adicionada com ES2022, strict e moduleDetection force, para manter exercícios independentes. O comando padrão passa a ser `ts-node arquivo.ts`, com checagem de tipos e execução, usando a instalação existente. README atualizado e `ex23.ts` executado com sucesso, sem alterar soluções.

Gabriel prefere escolher o método adequado e evitar spoilers dos exercícios seguintes. Conferimos a progressão da lista e combinamos mantê-la, pois a autonomia aumenta após o aquecimento.

### 2026-09-05 - Cor de strings sincronizada com o Cursor

A configuração atual do Cursor passou a usar `#F2CC60` para strings no GitHub Dark personalizado. O mesmo valor foi aplicado somente às strings do tema escuro do leitor; as demais cores e o tema claro foram preservados. Typecheck, lint e build passaram, e a versão 30 foi publicada no projeto privado existente.

### 2026-09-02 - Adequação do Capítulo 09

**Diagnóstico:** o material realocado do antigo Capítulo 06 ensinava corretamente os métodos em arrays primitivos, mas não cumpria a ementa atual em arrays de objetos, não possuía leitura de código real e não incorporava os aprendizados observados nos Capítulos 07 e 08.

**Direção aplicada:** preservar o aquecimento com valores simples e avançar por transformação incremental: percurso/controladora manual conhecida → método nativo → mesmo método com objeto → encadeamento → escolha autônoma. Objetos não foram reensinados; passaram a ser o tipo dos elementos processados.

**Adaptações personalizadas:** coleção plural e item singular; testes alternativos visíveis; uso do item recebido pela callback em vez de coleção externa; callbacks nomeados e closure; cópia do array versus cópia dos objetos; `find`/`some`/`every` com encerramento antecipado; `reduce` separando acumulador e objeto atual.

**Material:** README, quatro aulas existentes, lista, prova, extras e gabarito revisados; nova leitura real com quatro recortes de AgenDoc e WhatsApp Audio Transcriber; pasta `exercicios/solucoes/` criada.

**Validação didática:** 84 blocos TypeScript fora dos exemplos intencionalmente incorretos passaram na verificação sintática; links locais e resultados centrais conferidos. Prova permanece preparada, mas bloqueada até a conclusão do ciclo.

**Validação e publicação:** leitor aprovado em typecheck, lint e build; permanecem somente os dois avisos antigos de Fast Refresh e o aviso de tamanho de chunk. Home e rotas do Capítulo 09 responderam com HTTP 200, e a leitura de código real foi conferida na versão publicada. Versão 27 publicada com sucesso no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

**Próximo passo:** Gabriel inicia pelo README e por `aula/01-teoria.md`.

### 2026-09-02 - Correção pós-prova do Capítulo 08

Gabriel pediu a correção integral para guardar a prova como referência. A versão final usa o parâmetro `itens` na controladora, testa o array vazio com um critério discriminante, alinha as saídas literais e refina as explicações de referência, rest, closure e função retornada.

Os quatro arquivos corrigidos recompilam isoladamente em modo estrito e executam com as saídas esperadas. A nota 9,2 permanece vinculada à entrega original.

### 2026-09-02 - Prova do Capítulo 08

**Resultado:** 9,2/10 — aprovado. A teoria de contratos, referência versus chamada, callbacks com papéis diferentes, closure e IIFE está bem consolidada. Os quatro arquivos práticos compilam e executam.

**Ponto principal:** em `calcularPorCriterio`, Gabriel percorreu a variável global `pedidos` em vez do parâmetro `itens`. O caso vazio produziu `0` por coincidência, porque o critério rejeitava todos. Reforçar testes discriminantes: um array alternativo e um callback que aceite elementos revelariam a dependência externa.

**Atenção secundária:** continua havendo pequenas divergências no formato literal das saídas. Não confundem o conceito, mas devem ser conferidas quando o enunciado fornece texto exato.

**Próximo passo:** Capítulo 08 encerrado. Projeto 1 continua pendente; o Capítulo 09 existente precisa da revisão didática já registrada antes do avanço.

### 2026-09-01 - Lista do Capítulo 08 encerrada

**Resultado final:** `ex01` a `ex16` aprovados. O relatório de 60 pontos agora combina a closure `peloMenos60` com o título padrão e produz a saída esperada.

**Domínio observado:** Gabriel separa controladora, critério e formatador; passa funções por referência; reconhece o momento da chamada; cria closures com valores preservados; identifica IIFE; e integra esses mecanismos a arrays de objetos.

**Próximo passo:** prova do Capítulo 08 liberada.

### 2026-09-01 - Terceira correção da lista do Capítulo 08

Gabriel aplicou corretamente a função nomeada no item 3 e explicou recebimento, execução e retornos dos callbacks, além do valor preservado pela closure. O arquivo compila e executa.

Resta apenas omitir o quarto argumento no relatório construído com `peloMenos60`, para demonstrar de fato o título padrão. Após isso, liberar a prova.

### 2026-09-01 - Segunda correção da lista do Capítulo 08

**Resultado:** `ex13`, `ex14` e `ex15` aprovados. Gabriel demonstrou compreender os valores preservados pelas closures e reconheceu corretamente função, chamada, retorno e escopo da IIFE.

**Exercício 16:** a arquitetura do painel está correta e executa. As pendências são de integração e leitura literal do contrato: o item 2 deve reunir closure + título padrão em uma única chamada; o item 3 exige função nomeada; faltam os seis comentários finais.

**Prova:** ainda não liberada. Após esses ajustes, conferir somente `ex16.ts`.

### 2026-09-01 - Publicação das atualizações do leitor

**Validação:** typecheck, lint e build concluídos com sucesso. Permanecem somente os dois avisos antigos de Fast Refresh e o aviso de tamanho de chunk, sem bloquear a publicação.

**Publicação:** versão 26 publicada com sucesso no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

### 2026-08-28 - Primeira correção da lista do Capítulo 08

Gabriel pediu a prova após 12 exercícios, extras e leitura (sem o recorte 4). A Parte 3 está sólida: controladora + critério + formatador já saem com naturalidade, e o recorte 3 descreveu sozinho o uso de `stages` de fora do callback — que é o mecanismo da closure.

Os cinco ajustes de atenção (`ex01`, `ex04`, `ex07`, `ex08` e `ex12`) foram aplicados com autorização do aluno e validados em compilação estrita. `ex01` a `ex12` encerrados. Recorte 4 dispensado.

A prova não foi liberada. Os exercícios 13 a 16 cobrem closure e IIFE, cobrados nas Questões 4 e 8.

### 2026-08-27 - Correção do treino extra de callbacks

**Leitura pedagógica:** Gabriel já domina a arquitetura percorrer → decidir/formatar → retornar. O erro funcional isolado foi consultar `!temperatura` no lugar de `!ativo`; o padrão restante era principalmente usar o plural da coleção como nome do item.

**Correções materiais:** A1, nomes singulares, comprovação de não mutação em B2, contador externo em D1 e formatos de D2 foram alinhados. Embora o feedback inicial marcasse E1 como correto, a conferência literal do enunciado mostrou que `acao` deve registrar todos os lotes; somente a contagem depende de `vencido`. A solução foi corrigida de acordo com esse contrato.

**Validação:** nove arquivos TypeScript compilados isoladamente e executados com sucesso. O próximo reforço é ler o contrato de cada callback e nomear o item antes de escrever a implementação.

### 2026-08-21 - Criação do Capítulo 08

**Material:** aula, mini-projeto, leitura real com quatro recortes, 16 exercícios, prova 40/60 e extras concluídos. O capítulo reforça contrato completo, referência versus chamada e a mistura função + array de objetos antes dos métodos avançados do Capítulo 09.

**Adaptação pedagógica:** casos alternativos, limites e comprovação de preservação aparecem repetidamente. O desafio final fornece dados e objetivos, mas deixa a decomposição a cargo do aluno.

**Leitor:** validações aprovadas e nova versão publicada no projeto privado existente, preservando a URL atual.

## Observações Gerais

### 2026-09-02 - Tema escuro do leitor alinhado ao editor

O modo escuro passou a usar a mesma linguagem visual do tema Cursor/GitHub Dark personalizado do Gabriel. Após conferência visual, o realce foi complementado para reconhecer operadores, parâmetros e referências de parâmetros que o Highlight.js deixava como texto comum, além de aplicar cinco níveis de rainbow brackets. Fundo `#0D1117` e todas as cores fornecidas foram validados por estilos computados em uma aula real. Typecheck, lint e build passaram; versão 29 publicada no projeto privado existente, preservando a URL atual.

### 2026-08-29 - Diretriz didática para tópicos novos

Gabriel aprende melhor por transformação incremental: partir de um contrato ou construção que ele já domina, alterar um elemento por vez e explicitar o efeito de cada mudança antes de apresentar a sintaxe final. O percurso feito com IIFE foi: função conhecida → zero parâmetros → retorno de objeto → função anônima como valor → chamada imediata.

Nos próximos capítulos, especialmente nos assuntos mais avançados, usar preferencialmente a sequência **base conhecida → mudança isolada → comparação antes/depois → composição final**. Sintaxe curta não deve ser tratada como conceito simples por si só; primeiro nomear entrada, saída, valor produzido e momento de execução.

### 2026-08-21 - Prova do Capítulo 07

**Resultado:** 9,5/10 — aprovado. Prática muito forte: destructuring aninhado, método com teto, filtro de array de objetos e array vazio.

**Descontos:** `lista[2]` no lugar de `lista[1]`; origem do destructuring escrita como `promocao`; `litros <= 50` além do teto de volume.

**Próximo passo:** Capítulo 07 encerrado. Aguardar solicitação do Capítulo 08. Projeto 1 permanece pendente.

### 2026-08-21 - Leitura real e primeira correção do treino extra

**Lista principal:** já estava encerrada; Gabriel lembrou corretamente que os 12 + bônus tinham sido aprovados.

**Leitura de código:** fluxo geral acompanhado. O ponto mais útil para a prova é a pergunta 4 do Bloco 4: ele respondeu o tipo (`string`) no lugar da propriedade (`fullName`). É o mesmo tipo de inversão camada/contrato que apareceu na prova do Capítulo 06.

**Treino extra:** a arquitetura dos Extras 2, 3 e 5 mostra que a escrita da pilha função + array de objetos destravou. O Extra 1 erra a pergunta “quantos produtos”, não a sintaxe: soma `estoque` em vez de contar objetos. O Extra 4 acerta a cópia sem mutação e falha só no formato de exibição.

**Prova:** ainda bloqueada. Extra 4 com exibição corrigida; Extra 1 ainda pendente na leitura de ficha versus unidades.

### 2026-08-21 - Revisão conjunta da leitura, Bloco 2

Gabriel pediu para percorrer os blocos da leitura de código real item a item. Extra 1 não será refeito; Extra 4 ficou com comentários de estudo. No Bloco 2, o mecanismo de spread já estava certo; o reforço é o atalho `{ tone }` e o destino de `next` (troca de estado, não mutação do objeto antigo).

Na pergunta 3, ele não lembrava do atalho na aula (`02-sintaxe.md`, seção 6). Confirmou a dúvida certa: `tone` é propriedade do objeto que, dentro da função, se chama `change`. O nome no código é `tone`, não “tom”.

Gabriel descreveu sozinho o modelo: array local começa vazio e o `for...of` vai enchendo com `push`. Dois refinamentos dados na hora: nem todo item entra (só `ativo`); o `push` empilha cópia reajustada, não o objeto original.

Gabriel já havia usado `let cont = 0` nos extras. A dúvida anterior era a versão em coleção: `const funcionariosAtivos: { ... }[] = []`. Três nomes distintos (`funcionarios` original, `lista` parâmetro, `funcionariosAtivos` acumulador). O `[]` é o zero da coleta. A anotação existe porque um array vazio não deixa o TypeScript inferir o formato do objeto.

### 2026-08-21 - Extra 1: interpretação de “produto”, não falha de lógica

Gabriel defendeu corretamente a leitura de almoxarifado: duas furadeiras são dois produtos, não um produto com quantidade 2. A função somou `estoque` de forma coerente com essa leitura.

O enunciado usou “produto” no sentido de ficha/SKU: cada objeto do array é um produto, e `estoque` é a quantidade daquela ficha. A saída `Produtos disponíveis: 2`, o pedido de “nome de cada produto” e o cálculo `preço × quantidade` apontam para essa segunda leitura.

Não registrar como erro de lógica. O descompasso foi de vocabulário do enunciado, ambíguo para quem já pensa em estoque físico. Em exercícios futuros, preferir “quantos tipos de produto” ou “quantas fichas com estoque maior que zero” quando a intenção for contar objetos, não unidades.

### 2026-08-19 - Revisão e publicação do treino extra do Capítulo 07

**Direção pedagógica:** Gabriel identificou que exercícios com assinaturas, ferramentas e arquitetura previamente escolhidas limitam o treino de decompor problemas. O treino extra passou a fornecer somente dados, objetivos, restrições de conteúdo e formato de saída.

**Limite preservado:** cada programa ainda exige ao menos uma função, com coleções recebidas por parâmetro e contratos explícitos. Essa é uma restrição de aprendizagem, não uma arquitetura pronta; quantidade de funções, responsabilidades e mecanismos internos permanecem a cargo do aluno.

**Ajustes específicos:** removidos o aquecimento guiado e as pistas de implementação. O pedido 103 agora possui observação, permitindo testar presença e ausência da propriedade opcional entre os resumos exibidos.

**Leitor:** typecheck, lint e build aprovados; home e rota da lista conferidas. Versão 21 publicada no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

### 2026-08-19 - Encerramento da lista principal do Capítulo 07

**Resultado final:** 12 obrigatórios e bônus aprovados. Comentário estrutural em `ex24.ts` e formato/teste `0`/`0` do bônus aplicados com autorização.

**Próximo passo:** `lista-sintaxe-extra.md`. Prova ainda bloqueada.

### 2026-08-19 - Segunda correção da lista do Capítulo 07

**Aprovados nesta revisão:** `ex14.ts`, `ex21.ts` e `ex23.ts`. Gabriel passou a exibir o retorno de `depositar`, não só o saldo depois da chamada.

**Pendências mínimas:** em `ex24.ts`, o comentário ainda descreve a escolha do destructuring em vez da compatibilidade estrutural. No bônus, o texto ainda contém `Nota:` e o array sem ativos não imprime quantidade `0` nem soma `0`.

### 2026-08-19 - Primeira correção da lista do Capítulo 07 e treino extra

**Entrega:** 12 obrigatórios + bônus. Todos compilam em modo estrito e executam. Oito aprovados; cinco complementos curtos.

**Leitura pedagógica:** Gabriel não está perdido nos conceitos de objeto. Ele trava na hora de escrever a pilha `função(array de objetos)`. Pediu explicitamente mais treino de sintaxe, não mais teoria. Relatou que listas anteriores demais arquitetadas reduziram o treino de decidir parâmetros e tipos.

**Resposta:** `lista-sintaxe-extra.md` tem duas partes. A Parte A é ginástica de escrita com assinaturas dadas. A Parte B repete os cinco programas só com dados + objetivo + resultado esperado. Na correção desses extras, marcar correto / problema / pense novamente, sem reescrever o código.

**Sinal positivo:** os comentários do `ex33.ts` já descrevem parâmetro, elemento do `for...of` e retorno em camadas. É o modelo mental que precisa virar hábito de digitação.

**Prova:** permanece bloqueada até os ajustes da lista e o treino extra.

### 2026-08-17 - Revisão final e publicação do Capítulo 07

**Auditoria didática:** capítulo coerente com a ementa e com os conhecimentos consolidados até o Capítulo 06. Aula, mini-projeto, leitura real, exercícios e prova cobrem o mesmo conjunto de mecanismos sem exigir callbacks, métodos avançados de arrays, `type` ou `interface`.

**Ajustes:** o exercício de spread deixou de pedir a recriação impossível de uma `const` no mesmo escopo; o erro de índice numérico passou a distinguir rejeição do TypeScript de `undefined` em JavaScript; o quarto recorte real agora mostra o destino dos dois retornos; o placeholder inválido da prova foi transformado em esqueleto sintaticamente válido.

**Validação:** 104 blocos TypeScript/TSX sem erros de sintaxe; soluções do gabarito executadas com as saídas previstas; links internos e fontes externas conferidos; recortes reais confirmados nos projetos de origem. Leitor aprovado em typecheck, lint e build, com apenas os dois avisos antigos de Fast Refresh e o aviso de tamanho de chunk. Home, README e teoria responderam com HTTP 200.

**Publicação:** versão 20 publicada com sucesso no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site` e o acesso restrito ao proprietário.

### 2026-08-17 - Criação do Capítulo 07: Objetos

**Avanço solicitado:** Gabriel informou que concluiu o Capítulo 06 e pediu o início do Capítulo 07. O Projeto 1 — Calculadora permanece como pendência separada e não bloqueia este avanço explícito.

**Material criado:** aula sobre literais, ponto e colchetes, tipagem inline, propriedades opcionais, objetos aninhados, métodos com `this` básico, spread, destructuring e arrays de objetos; mini-projeto da ficha de equipamento; leitura de código real com quatro recortes; 12 exercícios e bônus; prova 40% teoria e 60% prática.

**Adaptações pedagógicas:** reforço da diferença entre objeto e propriedade, analogia com o tipo da função versus o tipo do retorno; testes com zero, negativos, propriedade ausente e array vazio; `type`/`interface` e métodos avançados de arrays ficam fora do escopo.

**Limite pedagógico:** parâmetros opcionais de função, callbacks e closures permanecem no Capítulo 08. Métodos avançados de arrays permanecem no Capítulo 09.

**Validação:** mini-projeto, exemplos e gabarito da prova compilam em modo estrito e produzem as saídas previstas, inclusive limites `<= 0`, observação ausente/presente, array sem ativos e array vazio. Leitor aprovado em typecheck, lint e build; home, README, teoria e lista do Capítulo 07 responderam com HTTP 200. Permanecem os avisos antigos de Fast Refresh e tamanho de chunk.

**Publicação na sessão de criação:** o `project_id` existente em `leitor/.openai/hosting.json` foi preservado. Naquele momento, a ferramenta de Sites não estava disponível; a publicação foi concluída posteriormente após a revisão final.

**Próximo passo:** Gabriel deve iniciar pelo README e pela teoria. A prova está preparada, mas só será liberada depois da aula, mini-projeto e exercícios.

### 2026-08-17 - Correção pós-prova da Questão 8

Gabriel corrigiu espontaneamente o filtro para rejeitar valores `<= 0`. O teste com número negativo passou, confirmando que ele compreendeu a diferença entre modelar a amostra e implementar a regra geral. Nota original 9,4 preservada; pendência pedagógica resolvida.

### 2026-08-17 - Prova do Capítulo 06

**Resultado:** 9,4/10 — aprovado. Excelente desempenho prático; todos os arquivos compilam e as saídas principais estão corretas.

**Reforço:** o tipo da função é seu contrato completo, não apenas o tipo retornado. Na Q8, Gabriel modelou os dados fornecidos (`0`) em vez da regra geral (`valor > 0`); reforçar testes com valores fora do exemplo, especialmente negativos.

**Próximo passo:** retomar o Projeto 1 — Calculadora antes do Capítulo 07.

### 2026-08-17 - Conclusão da lista do Capítulo 06

**Resultado final:** 12 obrigatórios e bônus aprovados. Os dois ajustes finais foram aplicados com autorização do aluno, e toda a lista foi recompilada em modo estrito.

**Domínio consolidado:** contratos explícitos, retorno versus efeito, declaração/expressão/arrow, função como valor, chamada versus referência e uso de funções para processar arrays. Prova do Capítulo 06 liberada.

### 2026-08-17 - Terceira correção da lista do Capítulo 06

**Aprovados nesta revisão:** exercícios 2.2 e 2.3. Gabriel agora apresentou corretamente a diferença sintática entre expressão de função, arrow concisa e arrow com bloco.

**Pendências finais:** remover uma explicação antiga contraditória em `ex31.ts` e exibir os arrays originais em `ex32.ts`. São ajustes mínimos de clareza e comprovação, não lacunas no funcionamento do código.

### 2026-08-17 - Segunda correção da lista do Capítulo 06

**Aprovados nesta revisão:** exercícios 1.4 e 3.4; bônus aprovado considerando os dois estados testados manualmente. A observação do aluno sobre o booleano não assumir dois valores simultaneamente está correta; o requisito pretendia duas execuções sucessivas, não simultaneidade.

**Pendências:** quatro ajustes de aderência ao mecanismo solicitado permanecem. Usar exemplos sintáticos explícitos na devolutiva para eliminar a ambiguidade entre declaração, expressão e arrow function.

### 2026-08-17 - Primeira correção da lista do Capítulo 06

**Resultado:** todos os arquivos compilam e executam. Seis exercícios obrigatórios foram aprovados; os outros seis têm correções localizadas, sem indicar uma lacuna geral na compreensão de funções.

**Leitura pedagógica:** Gabriel compreendeu contratos, retornos reutilizáveis, `void`, funções como valores e processamento de arrays. A principal necessidade é consolidar a distinção formal entre declaração, expressão e arrow function e criar o hábito de executar todos os casos pedidos, especialmente limites e arrays vazios.

**Próximo passo:** conferir `ex14.ts`, `ex22.ts`, `ex23.ts`, `ex31.ts`, `ex32.ts` e `ex34.ts` após os ajustes; bônus opcional. Só então liberar a prova.

### 2026-08-16 - Correção da leitura de código real do Capítulo 06

**Resultado:** Gabriel acompanhou corretamente contratos, caminhos de retorno e destinos dos valores nos três blocos respondidos. Os Blocos 2 e 3 foram aprovados com ajustes pontuais; no Bloco 4, deduziu corretamente a finalidade das tags XML mesmo sem dominar a regex.

**Reforço:** separar os papéis dos parênteses, que executam a função, do argumento contido neles; distinguir também o argumento de um fallback aplicado depois da chamada. A versão corrigida foi registrada no próprio arquivo de respostas.

**Próximo passo:** revisar a correção e iniciar a lista quando teoria, sintaxe, exemplos e mini-projeto estiverem concluídos.

### 2026-08-16 - Leitura de código real incorporada ao curso

**Objetivo:** aproximar cada capítulo do motivo principal do aluno para estudar TypeScript: ler projetos reais, acompanhar a lógica e orientar melhor implementações.

**Formato definitivo:** antes da lista de exercícios, usar quatro recortes — um explicado, um guiado e dois interpretados pelo aluno. Cada recorte contém somente definição, chamada, argumentos, retorno e contexto indispensável. A redução de dez para quatro evita que a etapa atrase o avanço do curso.

**Capítulo 06:** selecionados dois exemplos do AgenDoc (`dateKeyToMonthKey` e `limitPatientAlertNotes`) e dois do WhatsApp Audio Transcriber (`formatBytes` e `wrapTranscription`). JSX, objetos e regex aparecem apenas no nível necessário para seguir o fluxo da função.

**Validação e publicação:** fontes originais foram consultadas sem alteração; o novo material foi integrado ao leitor e publicado como versão 18 no site privado existente.

### 2026-08-16 - Complementações na teoria do Capítulo 06

**Iniciativa do aluno:** Gabriel ampliou a comparação entre declaração, expressão e arrow function com explicações intermediárias, diagramas e uma introdução ao hoisting. A complementação indica que ele consolida melhor conceitos quando explicita visualmente as diferenças de sintaxe e comportamento.

**Revisão:** conteúdo preservado com ajustes pequenos: remoção de repetição, tipagem uniforme, correção de um exemplo abreviado, delimitação do hoisting às declarações e identificação de `setTimeout` apenas como prévia de callbacks do Capítulo 08.

**Validação e publicação:** todos os blocos TypeScript da teoria passaram pela verificação de sintaxe; leitor aprovado nos controles do projeto. Versão 17 publicada no site privado existente.

### 2026-08-15 - Novo Capítulo 06: Funções — Fundamentos

**Material definitivo:** depois da reorganização da ementa, o Capítulo 06 foi recriado sobre definição versus execução, declarações, expressões, arrow functions, parâmetros, argumentos, retornos, `void`, escopo local e funções como valores.

**Limite pedagógico:** parâmetros opcionais, defaults, rest parameters, funções recebidas como parâmetros, callbacks e closures permanecem no Capítulo 08. Métodos avançados de arrays permanecem no Capítulo 09. As referências antigas do Capítulo 05 foram alinhadas a essa sequência.

**Prática:** mini-projeto de análise de uma semana de estudos; lista com 12 exercícios obrigatórios e bônus; testes alternativos reforçam limites, arrays vazios, divisão por zero e diferença entre função e resultado da chamada. A prova mantém 40% teoria e 60% prática.

**Validação e publicação:** soluções de referência verificadas em modo estrito; leitor aprovado em typecheck, lint e build; home, README e teoria responderam com HTTP 200. Versão 16 publicada no projeto privado existente, preservando a URL atual.

**Próximo passo:** Gabriel deve iniciar pelo README e pela teoria. A prova está preparada, mas só será liberada depois da aula, mini-projeto e exercícios.

### 2026-08-15 - Reorganização pedagógica dos capítulos 06–10

**Decisão:** a ementa passa a seguir a sequência Funções Fundamentais → Objetos → Callbacks e Recursos → Métodos Avançados de Arrays → Tuples. A mudança cria a ponte conceitual entre funções como valores, callbacks e métodos de coleção.

**Ajustes de conteúdo:** o Capítulo 06 agora diferencia definição e execução de funções; o 07 prepara arrays de objetos; o 08 concentra callbacks e deixa IIFE como extra; o 09 aplica callbacks a arrays de valores e objetos; o 10 inclui tuples como retorno e a escolha entre tuple e objeto.

**Primeira etapa:** somente a ementa foi reorganizada. O antigo material de métodos avançados foi mantido temporariamente em `06-arrays-metodos-avancados/` para evitar alterar os materiais antes de estabilizar a nova sequência.

**Realocação posterior:** o material foi movido para `09-arrays-metodos-avancados/`, e o gabarito interno passou a ser `gabarito-cap09.md`. Títulos, caminhos, pré-requisitos, progresso e catálogo do leitor foram alinhados à nova numeração. A revisão didática para incorporar arrays de objetos permanece como etapa futura.

**Validação e publicação:** leitor aprovado em typecheck, lint e build; home, README e teoria do Capítulo 09 responderam com HTTP 200. A versão 15 foi publicada no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

### 2026-08-15 - Conclusão do Capítulo 05 e criação do Capítulo 06

**Fechamento do Capítulo 05:** os quatro exercícios de integração Arrays + Loops foram compilados isoladamente em modo estrito e executados. Todos estão corretos; variações textuais são cosméticas. O capítulo foi encerrado com nota 9,5 na prova.

**Avanço solicitado:** Gabriel informou que concluiu o capítulo e pediu o início do Capítulo 06. O Projeto 1 — Calculadora permanece como pendência separada e não bloqueia este avanço explícito.

**Capítulo 06:** material completo criado sobre `forEach`, `map`, `filter`, `find`, `findIndex`, `some`, `every`, `reduce`, encadeamento e spread. Como funções formais aparecem somente nos Capítulos 08 e 09, callbacks foram apresentados como pequenas regras contextualmente tipadas, sem antecipar toda a teoria de funções.

**Adaptação pedagógica:** 13 exercícios obrigatórios e bônus priorizam escolha pelo retorno, tratamento de `undefined` e `-1`, comportamento de arrays vazios, valor inicial do `reduce` e previsão de etapas intermediárias. A prova mantém 40% teoria e 60% prática.

**Validação:** 93 blocos TypeScript passaram por verificação de sintaxe; as cinco soluções completas de referência passaram em tipagem estrita com alvo ES2022. Leitor aprovado em typecheck, lint e build; home, README e teoria do Capítulo 06 responderam com HTTP 200. Permanecem apenas dois avisos antigos de Fast Refresh e o aviso de tamanho de chunk, sem impedir o build.

**Publicação:** versão 14 publicada com sucesso no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

**Próximo passo:** iniciar o README e `aula/01-teoria.md` do Capítulo 06.

### 2026-08-14 - Navegação Lateral no Celular

**Interface:** os cartões “Anterior” e “Próximo” deixaram de empilhar em telas menores e agora permanecem em duas colunas iguais. O espaçamento e o padding foram reduzidos apenas no mobile, e nomes longos receberam quebra segura.

**Validação:** layout conferido na rota do mini-projeto com larguras de 390 px e 320 px; cartões permaneceram alinhados, sem sobreposição. Leitor aprovado em typecheck, lint e build, com apenas os avisos antigos sem impacto.

**Publicação:** versão 12 publicada no projeto privado existente, mantendo `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`. A versão publicada foi reconferida em 320 px.

### 2026-08-14 - Controles Compactos do Leitor

**Interface:** botão de copiar Markdown e alternador de tema passaram a ter o mesmo tamanho e raio circular. O texto visível “Claro/Escuro” foi removido, mantendo `aria-label` e `title` dinâmicos para acessibilidade.

**Layout:** os controles foram agrupados lado a lado com espaçamento de `0.5rem`. A apresentação foi validada em desktop e celular, com alternância funcional entre os temas.

**Validação:** leitor aprovado em typecheck, lint e build. Permanecem apenas os avisos antigos de Fast Refresh e tamanho de chunk, sem impedir o build.

**Publicação:** versão 11 publicada no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`. Conferência final realizada na versão publicada em viewport de celular.

### 2026-08-14 - Extensão Arrays + Loops

**Material criado:** `aula/05-arrays-e-loops.md` com `for` por índice, `for...of`, posição humana, acumuladores, `continue`, `break`, loops aninhados e cuidado ao alterar o tamanho durante o percurso.

**Prática:** `exercicios/lista-arrays-e-loops.md` contém quatro exercícios progressivos: índice e posição, soma e contagem, controle do percurso e array bidimensional.

**Avaliação:** adicionada a Questão 8 prática à prova. As Questões 5–7 foram reponderadas para manter teoria em 4 pontos, prática em 6 pontos e total em 10 pontos. Gabarito e rubricas atualizados.

**Integração:** README, ementa, extras e catálogo do leitor foram atualizados. Métodos como `forEach`, `map`, `filter`, `find` e `reduce` continuam no Capítulo 06.

**Validação:** 25 blocos TypeScript verificados; exercícios fundamentais recompilados em modo estrito; leitor aprovado em typecheck, lint e build. Página inicial e rotas da nova aula e da nova lista responderam com HTTP 200. Permanecem apenas os dois avisos antigos de Fast Refresh e o aviso de tamanho de chunk, sem impedir o build.

**Publicação:** versão 10 publicada no projeto privado existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

**Próximo passo:** aluno ler a nova aula e entregar os quatro exercícios de integração.

### 2026-08-14 - Primeira Correção da Lista do Capítulo 05

**Resultado:** os 11 exercícios fundamentais e o bônus foram entregues. Todos compilam isoladamente em modo estrito e executam sem erros; seis foram aprovados e seis precisam de ajustes.

**Ponto conceitual principal:** no `ex13.ts`, o aluno usou `length - 1` ao guardar a quantidade, confundindo quantidade de elementos com último índice. No `ex11.ts`, atribuiu a rejeição de uma `string` ao uso de `const`, quando a causa é o tipo `number[]`.

**Requisitos incompletos:** corrigir o comentário do `ex21.ts`; adicionar a explicação do `ex23.ts`; completar comentários e chamadas de exibição no `ex31.ts`; explicar os dois índices no `ex33.ts`.

**Próximo passo:** conferir os seis ajustes, encerrar a lista fundamental e então criar a ampliação de arrays + loops combinada com o aluno.

**Conclusão:** os ajustes foram aplicados e conferidos. O `ex11.ts` demonstrava corretamente a incompatibilidade com o tipo numérico, embora a formulação pudesse separar melhor `const` de `number[]`. Todos os 11 obrigatórios e o bônus estão aprovados; lista fundamental encerrada.

### 2026-08-14 - Sequência para Arrays + Loops

**Decisão:** o aluno fará primeiro os 11 exercícios fundamentais do Capítulo 05 no formato atual. Em seguida, o próprio capítulo será ampliado com uma aula curta combinando arrays e loops, exercícios obrigatórios de integração e uma questão correspondente na prova.

**Organização:** não criar um Capítulo 5B. Manter `forEach`, `map`, `filter` e os demais métodos avançados reservados ao Capítulo 06.

### 2026-08-13 - Prova do Capítulo 04

**Resultado:** 9,4/10 — aprovado. Os três arquivos práticos compilaram isoladamente em modo estrito, executaram sem erros e receberam pontuação integral.

**Único desconto:** na Questão 1, o aluno previu corretamente a saída e a quantidade de execuções, mas omitiu as explicações separadas dos efeitos de `continue` e `break`.

**Observação:** na Questão 3, escreveu “estrutura do `while`” ao justificar o item sobre `do...while`, mas descreveu inequivocamente o comportamento correto; considerado deslize de nomenclatura, sem desconto. A ausência do acento em `Numero somado` na Questão 6 também foi tratada como cosmética.

**Próximo passo:** Capítulo 04 concluído. Preparar e realizar o Projeto 1 — Calculadora antes de liberar formalmente o Capítulo 05.

**Fechamento da prática:** o desafio rápido também foi recompilado em modo estrito e executado; ignora corretamente os múltiplos de `3` e obtém soma `37`. A diferença no texto final é apenas cosmética.

### 2026-08-13 - Primeira Correção da Lista do Capítulo 04

**Resultado:** todos os 12 exercícios obrigatórios e o bônus foram entregues, compilam em modo estrito e executam. Onze obrigatórios foram aprovados na primeira revisão.

**Pendência funcional:** no `ex22.ts`, a mensagem de verificação foi colocada dentro do ramo de sucesso, então os códigos de `1` a `6` não aparecem. Reforçar que ações exigidas “em cada iteração” devem ocorrer antes da condição que pode encerrar o loop.

**Bônus:** o aluno coordenou corretamente os dois `break`s com uma variável booleana, mas usou `numeroDeLugares` como limite do loop externo. O limite de convites mascara o erro com os dados atuais; testar mentalmente sem a parada antecipada revela o setor inexistente.

**Calibração:** a falta do símbolo `%` no exercício 1.4 e pequenas diferenças de capitalização/pontuação foram mantidas como observações opcionais, conforme o critério pedagógico combinado.

**Próximo passo:** conferir `ex22.ts` e bônus; se corrigidos, encerrar a lista e liberar a prova.

**Esclarecimento do exercício 2.2:** o aluno não mostrou as verificações de `1` a `6` porque leu o bloco apresentado como a saída completa. Ao perceber que o subtítulo dizia “Final da saída esperada”, compreendeu imediatamente que o trecho exibia apenas as últimas linhas. Não registrar como dificuldade conceitual com iterações; em exercícios futuros, considerar mostrar a saída completa ou destacar ainda mais quando o exemplo for parcial.

**Primeiro ajuste conferido:** o `ex22.ts` passou a exibir corretamente todas as verificações de `1` a `7`. Resta trocar o literal `7` na condição por `codigoProcurado`, pois o teste alternativo com outro código ainda falharia. O bônus ainda contém o limite anterior no loop externo.

**Conclusão:** os dois ajustes finais foram aplicados corretamente. Todos os 12 exercícios obrigatórios e o bônus compilam em modo estrito e executam com o comportamento esperado. Lista encerrada; prova do Capítulo 04 liberada. A ausência do símbolo `%` no exercício 1.4 permanece somente como observação cosmética.

### 2026-08-13 - Botão de Cópia Somente com Ícone

**Ajuste visual:** o texto visível do botão global de copiar Markdown foi removido em todas as larguras. O controle agora é quadrado e exibe somente o ícone, preservando tooltip, rótulo para leitores de tela e confirmação por check após a cópia.

**Validação:** leitor aprovado em typecheck, lint e build; permanecem apenas os dois avisos antigos de Fast Refresh, sem impacto no build.

**Publicação:** versão 9 publicada no projeto existente, mantendo `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site` e o acesso privado.

### 2026-08-12 - Cópia Global do Markdown no Leitor

**Funcionalidade:** todas as páginas de conteúdo do leitor agora exibem na barra superior um botão que copia integralmente o Markdown original usado na renderização, sem tentar reconstruir o texto a partir do HTML.

**Experiência:** o botão confirma o sucesso por dois segundos, informa falha de acesso à área de transferência, possui rótulos acessíveis e vira um controle compacto por ícone em telas pequenas.

**Validação:** leitor aprovado em typecheck, lint e build. Permanecem apenas os dois avisos antigos de Fast Refresh, sem impacto no build.

**Publicação:** versão 8 publicada no projeto existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site` e o acesso privado.

### 2026-08-12 - Prévia do Capítulo 05

**Motivação:** o aluno pediu uma introdução a estruturas de dados antes de concluir a prática do Capítulo 04. O Capítulo 05 foi disponibilizado antecipadamente sem alterar a progressão formal do curso.

**Adaptação pedagógica:** a aula principal, o desafio rápido, o mini-projeto e os 11 exercícios obrigatórios não dependem de loops. O único exercício com `for` é bônus e está explicitamente condicionado à conclusão da prática do Capítulo 04. A prova foi preparada, mas permanece bloqueada até Capítulo 04, Projeto 1 e liberação do professor.

**Conteúdo:** arrays tipados, índices zero-based, `length`, leitura e alteração, `push`, `pop`, `shift`, `unshift`, retornos em arrays vazios, referência compartilhada e menção inicial a arrays multidimensionais. Métodos do Capítulo 06 não foram antecipados.

**Validação:** 97 blocos TypeScript sem erros de sintaxe; leitor aprovado em typecheck, lint e build; página inicial, README e teoria do novo capítulo responderam com HTTP 200. Permanecem apenas dois avisos antigos de Fast Refresh, sem impacto no build.

**Publicação:** versão 7 publicada com acesso privado no projeto existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

**Próximo passo:** usar o roteiro curto dos extras para a introdução de hoje e depois retomar a prática do Capítulo 04.

### 2026-08-10 - Criação do Capítulo 04

**Material criado:** aula completa sobre `while`, `do...while`, `for`, `break`, `continue`, loops aninhados, loops infinitos e escolha da estrutura; 12 exercícios e bônus; prova 40% teórica e 60% prática; gabarito interno; erros comuns e recursos.

**Adaptações:** contextos variados sem tema privilegiado; testes alternativos incorporados à aula, ao mini-projeto e aos exercícios para reforçar limites e caminhos diferentes; entrega da prova descreve explicitamente todos os arquivos exigidos.

**Mini-projeto:** Planejador de Sessões de Estudo, com loops aninhados, pausa por `continue`, meta por `break` e comunicação do término entre os dois loops.

**Projeto 1:** ementa atualizada para incluir repetição de operações até o comando de saída, consolidando o Capítulo 04 antes de Arrays.

**Validação:** soluções de referência e mini-projeto compilados em modo estrito e executados com as saídas previstas. Leitor aprovado em typecheck, lint e build; página inicial e rota da teoria responderam com HTTP 200.

**Publicação:** versão 6 publicada com sucesso no projeto existente, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site` e o acesso privado atual.

**Próximo passo:** aluno iniciar o README e a teoria do Capítulo 04.

### 2026-08-10 - Próximos Capítulos

Após concluir o Capítulo 03, o aluno pediu a sequência imediata do curso. Próximos capítulos confirmados: 04 — Estruturas de Repetição e 05 — Arrays: Fundamentos, com o Projeto 1 — Calculadora de Terminal entre eles.

**Decisão pedagógica proposta pelo aluno:** manter Estruturas de Repetição como capítulo separado e concluir o Projeto 1 antes de iniciar Arrays. A sequência é coerente; ao preparar o projeto, considerar incluir repetição de operações e comando de saída para que ele consolide também o conteúdo do Capítulo 04, pois os requisitos atuais mencionam apenas conceitos anteriores.

### 2026-08-10 - Variedade nos Contextos Didáticos

O aluno relatou cansaço com a repetição do mesmo contexto temático. As diretrizes foram ajustadas para buscar variedade e permitir que o criador escolha, em cada caso, o exemplo que melhor esclareça o conceito, sem privilegiar nem excluir previamente qualquer área.

### 2026-08-10 - Prova do Capítulo 03

**Resultado:** 8,7/10 — aprovado. O aluno demonstrou domínio de operadores aritméticos, comparações, lógica, truthy/falsy, `??`, `if/else`, ternário e `switch`. A Questão 7 integrou corretamente todas as regras e compilou em modo estrito.

**Descontos:** faltou explicar a precedência na Questão 1; na Questão 5, corrigiu `=` para `<=`, mas não identificou explicitamente que o operador original realizava atribuição; na Questão 6, usou `<= 6` em vez de `>= 6`, classificando `6.8` como `NORMAL`.

**Entrega:** respostas registradas novamente em `prova.md`, apesar da orientação anterior, e ausência de `questao05.ts`. Não houve desconto adicional por organização, mas reforçar preservação do enunciado e conferência de todos os arquivos pedidos.

**Próximo passo:** Capítulo 03 concluído; aluno liberado para solicitar o Capítulo 04 — Estruturas de Repetição.

**Esclarecimento da Questão 5:** o aluno explicou que reconheceu como provável intenção do autor o operador `<=`, pois uma segunda atribuição não faria sentido para a regra. Esse raciocínio de correção está certo; o desconto permanece porque a pergunta também pedia diagnosticar o comportamento do código existente, no qual o segundo `=` é efetivamente uma tentativa de atribuição encadeada e ainda tenta reatribuir uma constante.

O aluno confirmou que ainda não conhecia a possibilidade de duas atribuições na mesma expressão. Conceito esclarecido: a avaliação ocorre da direita para a esquerda; não tratar como padrão recorrente de erro.

### 2026-08-07 - Correção da Lista do Capítulo 03

Dos 14 exercícios obrigatórios, 12 arquivos estavam presentes. Todos os arquivos existentes compilam em modo estrito e executam sem erros; nove foram aprovados. `ex23.ts` e `ex25.ts` estão ausentes.

**Ajustes relevantes:** no 3.3, usar limites exclusivos conforme “acima de”; no 3.4, reconhecer que `??` preserva zero; no 3.5, usar o `if/else` para definir `mensagemDePartida`, como mecanismo funcional pedido.

**Revisão do 3.2:** o aluno observou corretamente que o enunciado não exige explicitamente que `pressaoDentroDaFaixa` seja booleano nem que o texto final seja armazenado em outra constante. Como a solução aplica as comparações inclusivas, `&&` e o ternário corretamente, o exercício foi aprovado; a separação entre condição e texto fica apenas como sugestão de modelagem.

**Conferência dos ajustes:** exercícios 3.3, 3.4 e 3.5 corrigidos e validados em compilação estrita e execução. Naquele momento, os 12 exercícios presentes e o bônus estavam aprovados; restavam somente `ex23.ts` e `ex25.ts`.

**Conclusão da lista:** `ex23.ts` e `ex25.ts` foram entregues, compilam em modo estrito e produzem as saídas esperadas. O aluno demonstrou uso correto de condições compostas, negação, `if/else`, `switch`, `break` e `default`. Os 14 obrigatórios e o bônus estão aprovados; prova liberada.

Diferenças cosméticas de capitalização, grafia, pontuação e unidades não foram convertidas em pendências. O bônus permanece aprovado.

### 2026-08-07 - Discussão do Bônus do Capítulo 03

O aluno pediu avaliação do raciocínio usado no simulador de frete, especialmente na exibição da modalidade. O `if/else` usado está logicamente correto e mantém a saída coerente com `entregaExpressa`; calcular antes uma constante com ternário seria apenas uma melhoria de separação entre decisão e exibição.

**Ponto funcional pendente:** falta implementar a condicional exigida pelo enunciado para impedir que o prazo fique menor que `1`. Com os valores fornecidos a saída continua correta, mas a regra não está protegida para outros dados.

**Raciocínio do aluno:** observou corretamente que, com os prazos permitidos (`3`, `4`, `6` e `8`) e redução máxima de um dia, o resultado mínimo possível é `2`; portanto, a proteção nunca será acionada no domínio atual. A condicional continua necessária apenas por ser um mecanismo explicitamente solicitado e para tornar a regra resistente a futuras mudanças nos dados.

**Ajuste concluído:** o aluno adicionou a proteção depois da redução do prazo, na posição lógica correta. O arquivo passou na compilação estrita; bônus aprovado.

### 2026-08-06 - Conferência Final do Mini-Projeto do Capítulo 03

Os arquivos TypeScript compilam em modo estrito e executam com a lógica e as linhas funcionais completas. O mini-projeto e o desafio rápido estão aprovados; aluno liberado para a lista.

**Calibração reforçada pelo aluno:** ausência de comportamento ou conteúdo funcional deve gerar pendência; capitalização, pontuação, rótulos equivalentes e outras diferenças cosméticas devem ser apenas observações opcionais, salvo quando a formatação for o objetivo explícito.

### 2026-08-05 - Revisão do Desafio Rápido e Mini-Projeto do Capítulo 03

Os dois arquivos compilam em modo estrito. O aluno aplicou corretamente aritmética, comparações inclusivas, condições compostas, negação, `if / else if / else`, ternário e `??`; a lógica dos caminhos alternativos do painel também está correta.

**Ajustes pendentes:** no desafio rápido, incluir `:` em `Margem:` e corrigir o comentário da margem de `1` para `18`. No painel, incluir a linha `Estado`, corrigir o rótulo para `Faixa de pressão` e a unidade para `bar`.

**Próximo passo:** conferir esses cinco detalhes e liberar a lista de exercícios.

### 2026-08-03 - Correção da Lista de Exercícios do Capítulo 02

Os dez exercícios e o bônus compilam em modo estrito. O aluno demonstrou domínio dos tipos primitivos e dos cálculos, com cinco exercícios obrigatórios aprovados diretamente.

**Ajustes antes da avaliação:** incluir `Série` no exercício 1.2; corrigir `camelCase` e ponto e vírgula no 2.1; usar a inferência exigida no 2.3; corrigir a classificação conceitual do trecho A no 2.4; reconhecer o sufixo minúsculo `n` no 3.1. O bônus diverge apenas no rótulo da força.

**Próximo passo:** conferência curta das correções e, se aprovadas, liberação da avaliação.

**Primeira revisão:** exercícios 2.1 e 3.1 e bônus corrigidos. Restam a saída exata do 1.2, a remoção das duas anotações explícitas restantes no 2.3 e a formulação/classificação literal do 2.4.

**Revisão do exercício 2.4:** o aluno classificou corretamente o trecho A como erro de compilação e compreendeu a incompatibilidade entre `number` e `string`. A expressão “depois da declaração” é apenas uma imprecisão temporal, pois o valor aparece no inicializador da própria declaração. Exercício aprovado; não cobrar reprodução literal das classificações quando o conceito está inequívoco.

**Resultado final:** exercício 2.3 corrigido integralmente. O `:` adicional em `Série: 84` no exercício 1.2 é cosmético e, conforme o critério pedagógico combinado, não impede o avanço. Lista aprovada e avaliação liberada.

### 2026-08-03 - Prova do Capítulo 02

**Resultado:** 9,0/10 — aprovado. Os três arquivos práticos compilam em modo estrito. O aluno demonstrou domínio sólido de tipos primitivos, inferência, validação, cálculos, concatenação e template literals.

**Descontos:** questão 1 marcada como `c` em vez de `a`, embora o tipo `number` tenha sido reconhecido; na questão 7, faltou a linha da bancada e houve duas divergências textuais.

**Próximo passo:** Capítulo 02 concluído; aluno liberado para solicitar o Capítulo 03 — Operadores.

**Feedback do aluno:** relatou satisfação com o resultado e reconheceu que os descontos vieram de erros de atenção. Manter a distinção entre domínio conceitual e conferência final nas próximas correções.

**Avanço:** aluno confirmou que deseja seguir no curso. Próximos capítulos apresentados: 03 — Operadores e 04 — Estruturas Condicionais. Aguardar solicitação de geração do Capítulo 03.

**Proposta do aluno:** unir Operadores e Estruturas Condicionais em um único capítulo para acelerar o curso. A combinação é pedagogicamente coerente porque comparações e operadores lógicos ganham aplicação imediata em `if`, ternário e `switch`; aguardar confirmação antes de alterar a ementa.

### 2026-08-03 - Criação do Capítulo 03 Integrado

**Decisão confirmada:** Operadores e Estruturas Condicionais foram unidos em `03-operadores-e-condicionais`. Os capítulos futuros foram renumerados, e a ementa agora possui 32 capítulos, de 00 a 31.

**Ritmo:** o aluno se sente confortável e solicitou avanço mais rápido. A lista foi ampliada de 10 para 14 exercícios obrigatórios, mais bônus, cobrindo aritmética, precedência, atribuição, comparações, lógica, `if`, faixas, ternário, `switch`, truthy/falsy e `??`.

**Validação:** exemplos completos, mini-projeto e gabarito passaram por verificação estrita e execução. Leitor aprovado em typecheck, lint e build; home, README e teoria do Capítulo 03 responderam com HTTP 200.

**Publicação:** versão 3 publicada no projeto existente do Sites, preservando `https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site`.

**Próximo passo:** iniciar `aula/01-teoria.md`.

### 2026-08-01 - Nomenclatura dos Arquivos de Exercícios

A pedido do aluno, os arquivos do Capítulo 02 agora refletem diretamente o número exibido na lista: `ex11.ts` corresponde ao exercício 1.1, `ex21.ts` ao 2.1 e assim por diante. O padrão reduz o esforço para relacionar enunciado e solução e deve ser reutilizado nos próximos capítulos com listas divididas em níveis.

### 2026-08-01 - Conferência Final do Mini-Projeto do Capítulo 02

O aluno aplicou voluntariamente parte das sugestões. Os dois arquivos compilam em modo estrito e executam corretamente; nenhuma pendência conceitual ou funcional permanece.

**Diretriz confirmada com o aluno:** buscar equilíbrio na correção. Priorizar conceitos, raciocínio e funcionamento; mencionar literalidade apenas quando ela tiver valor pedagógico real, sem consumir tempo com acabamento irrelevante nesta fase.

### 2026-08-01 - Recalibração dos Critérios de Correção

O aluno observou corretamente que unidade omitida na exibição, linha vazia para legibilidade e pequenas diferenças no símbolo/espaçamento de grau não demonstram falha nos conceitos estudados. A correção anterior foi excessivamente literal.

**Critério daqui em diante:** separar claramente erros conceituais ou funcionais de sugestões cosméticas. Detalhes de apresentação só impedirão aprovação quando a própria formatação for o conceito avaliado ou afetar o funcionamento do programa.

**Resultado revisado:** desafio rápido e mini-projeto aprovados; lista de exercícios liberada. A anotação explícita em `numeroDoEnsaio` e o cabeçalho com aspas podem ser mencionados como desvios do mecanismo solicitado, mas o uso correto desses mecanismos no restante do arquivo já demonstra compreensão suficiente.

### 2026-08-01 - Correção do Desafio Rápido e Mini-Projeto do Capítulo 02

**Resultado:** ambos os arquivos compilam em modo estrito. O aluno aplicou corretamente tipos primitivos, cálculos derivados e template literals, além de concluir os três desafios de expansão.

**Pendências:** incluir `kg` no desafio rápido; usar inferência em `numeroDoEnsaio`; usar template literal no cabeçalho; reproduzir ` °C` com espaço e o símbolo correto; remover o `}` excedente do resumo; retirar a linha vazia anterior ao cabeçalho para que o bloco obrigatório comece exatamente como solicitado.

**Próximo passo:** aluno corrige os próprios arquivos e solicita conferência curta antes da lista de exercícios.

### 2026-08-01 - Conflito entre `.ts` e `.js` no Mini-Projeto

O aluno encontrou TS6200 após compilar `boletim-ensaio.ts`. O código compila; o diagnóstico ocorre porque, sem um `tsconfig.json` na raiz, o serviço de linguagem do VS Code pode analisar o TypeScript e o JavaScript gerado lado a lado como scripts no mesmo escopo global, duplicando as declarações.

**Observação pedagógica:** distinguir erro da compilação executada de diagnóstico do projeto implícito do editor. O aluno seguirá agora para a conferência autônoma do checklist do mini-projeto.

**Esclarecimento complementar:** existem vários pares `.ts`/`.js` no curso, mas eles não geram diagnóstico enquanto o serviço do editor não inclui os dois no mesmo projeto. Neste caso, o `.js` gerado foi incluído junto do `.ts`, provavelmente por estar aberto no VS Code; a situação não é específica dos tipos usados no boletim.

**Validação:** após o reinício do servidor não remover o diagnóstico do editor, `tsc --noEmit 02-tipos-primitivos/exercicios/boletim-ensaio.ts` terminou com código 0. O aluno pode prosseguir com segurança; uma organização definitiva dos arquivos compilados será tratada separadamente, sem misturá-la ao objetivo atual do exercício.

### 2026-07-31 - Retomada da Ementa

O aluno solicitou uma visão geral, adequada para ouvir, do percurso do curso, do ponto atual e dos próximos passos. O progresso permanece inalterado: capítulos 00 e 01 concluídos; Capítulo 02 disponível para início.

**Próximo passo:** começar `02-tipos-primitivos/aula/01-teoria.md` e seguir os quatro arquivos da aula na ordem.

### 2026-07-31 - Geração do Capítulo 02

**Material criado:** aula completa sobre tipos primitivos, mini-projeto, 10 exercícios e bônus, prova com rubrica, erros comuns e recursos oficiais.

**Adaptações pedagógicas:** requisitos obrigatórios do mini-projeto aparecem antes do passo a passo; validação de tipo foi formulada como análise que aceita ou rejeita; exercícios mantêm conferências separadas de implementação e saída.

**Escopo:** operações matemáticas permanecem introdutórias; `bigint` e `symbol` aparecem somente para reconhecimento; unions, condicionais, funções, arrays e objetos não são cobrados.

**Leitor:** tipos, lint e build validados; home e rota da teoria responderam com HTTP 200. Versão 2 publicada no projeto existente, preservando a URL. O navegador integrado não estava disponível para inspeção visual nesta sessão.

**Próximo passo:** aluno iniciar a teoria do Capítulo 02.

### 2026-07-31 - Encerramento do Capítulo 01

O aluno confirmou que está satisfeito com o progresso. Capítulo encerrado sem revisão obrigatória; próximo passo será gerar o Capítulo 02 quando solicitado.

### 2026-07-31 - Discussão da Questão 3 da Prova

**Esclarecimento:** o aluno marcou o item como falso porque interpretou “verifica atribuições posteriores” como “aceita atribuições posteriores incompatíveis”. Seu raciocínio sobre inferência estava correto: o TypeScript mantém o tipo inferido e rejeita uma `string` atribuída posteriormente a um nome inferido como `number`.

**Observação pedagógica:** em próximos enunciados, preferir “continua validando o tipo das atribuições posteriores” para reduzir a ambiguidade. Não tratar este caso como dificuldade conceitual.

**Feedback do aluno:** está satisfeito com o aprendizado e reconhece que as demais diferenças da prova foram deslizes de atenção.

### 2026-07-31 - Prova do Capítulo 01

**Resultado:** 8,5/10 — aprovado. Os três arquivos TypeScript da parte prática compilam sem erros.

**Pontos fortes:** boa aplicação de `let`, `const`, reatribuição e escopos; correção completa da análise de escopo na questão 5.

**Pontos a reforçar:** a alternativa sobre `var`, coerência entre a marcação V/F e a justificativa, e conferência literal de valores, capitalização e exigências de inferência.

**Próximo passo:** Capítulo 01 concluído; aluno liberado para solicitar o Capítulo 02 — Tipos Primitivos.

### 2026-07-30 - Exercícios do Capítulo 01 Aprovados

**Resultado final:** os dez exercícios e o bônus compilam, produzem as saídas esperadas e atendem aos requisitos após revisão.

**Evolução observada:** o aluno corrigiu as divergências de saída, completou os diagnósticos, consolidou escopo de função e discutiu com propriedade a relação entre significado do domínio e mutabilidade no código.

**Próximo passo:** prova do Capítulo 01 liberada.

### 2026-07-30 - Conferência Final Após Novos Ajustes

**Resultado:** todos os onze arquivos compilam e as saídas executáveis são exatas. `ex08.ts` e o bônus foram corrigidos.

**Única pendência:** a linha 27 do `ex09.ts` ainda contém a formulação antiga, “inválido para camelCase”. A alteração sobre o hífen possivelmente não foi salva no editor.

### 2026-07-30 - Nova Conferência do Exercício 9

**Resultado:** o arquivo voltou a compilar, contém quatro constantes de diagnóstico e produz a saída exata.

**Ajuste restante:** o quarto texto diz apenas que `nome-aluno` é inválido para `camelCase`; registrar que o hífen torna o identificador sintaticamente inválido.

### 2026-07-30 - Dúvidas sobre `operadorAtual` e Saída do Bônus

**Exercício 8:** o aluno associou a palavra “atual” à possibilidade de mudança futura. O raciocínio de domínio é válido, mas a escolha entre `const` e `let` deve refletir a existência de reatribuição no código atual; o exercício também exige `const` para valores que não mudam.

**Exercício 9:** o quarto diagnóstico foi adicionado como uma segunda declaração `problema3`, causando TS2451. Deve ser `problema4`, explicando que o hífen torna o identificador inválido sintaticamente.

**Bônus:** o aluno interpretou a orientação como troca de setor. Esclarecido que `B` permanece igual e que o ajuste é somente `Terminal` → `terminal` para corresponder à saída esperada.

### 2026-07-30 - Conferência das Correções do Capítulo 01

**Resultado:** as correções dos exercícios 1 a 7 e 10 foram validadas; todos os onze arquivos compilam e executam.

**Pendências finais:** usar `const` no operador do `ex08.ts`, registrar o quarto diagnóstico no `ex09.ts` e corrigir a capitalização de “terminal” no bônus.

**Próximo passo:** conferência curta desses três pontos e liberação da prova.

### 2026-07-30 - Correção dos Exercícios do Capítulo 01

**Resultado:** os dez exercícios e o bônus compilam e executam. O aluno domina os conceitos práticos centrais do capítulo.

**Pontos fortes:** boa escolha entre `let` e `const`, tipos coerentes, inferência, reatribuição e escopo de bloco.

**Pontos a reforçar:**
- Comparar a saída literalmente com o modelo; houve divergências em valores, rótulos ou capitalização
- Cumprir partes não executáveis do enunciado; faltaram diagnósticos no `ex09.ts` e exemplos no `ex10.ts`
- Corrigir a noção de escopo de função: nomes internos não ficam acessíveis fora dela
- Usar `const` também para `operadorAtual` no `ex08.ts` e `embarqueLiberado` no bônus

**Próximo passo:** revisar os arquivos conforme `exercicios/correcoes.md` e fazer uma conferência rápida antes da prova.

### 2026-07-29 - Interpretação do Exercício 2.4

**Dúvida:** o aluno entendeu que deveria classificar os trechos, mas não viu propósito em registrar as respostas como constantes `string`.

**Esclarecimento:** cada trecho deve ser considerado isoladamente; o `ex07.ts` armazena cinco respostas textuais no formato “classificação + justificativa” e executa apenas a mensagem de confirmação.

**Dúvida complementar:** “classificação” foi inicialmente entendida como apenas “compila ou não compila”; reforçadas as três categorias exigidas pelo enunciado.

**Retorno do aluno:** compreensão confirmada.

**Observação pedagógica:** o mecanismo de resposta é artificial e mistura análise conceitual com prática de declaração. Em versões futuras, explicar explicitamente que os trechos não devem ser copiados para o arquivo e fornecer um molde vazio de resposta.

### 2026-07-29 - Interpretação do Exercício 1.3

**Observação:** o aluno domina declaração, tipos e `console.log`, mas interpretou os nomes recebidos de outro sistema como variáveis que deveriam ser declaradas antes da versão em `camelCase`.

**Ponto a reforçar:** em tabelas de requisitos, distinguir dado de entrada, valor e nome interno sugerido. Neste exercício, os nomes externos eram exemplos a substituir diretamente, e todos os quatro valores fixos deveriam ser declarados com `const`.

**Ajuste pedagógico:** formular exercícios semelhantes com uma coluna explícita “não use este nome no código” ou mostrar uma seta, por exemplo `nome_cliente → nomeCliente`.

**Retorno do aluno:** compreensão confirmada; fará a correção do exercício.

**Revisão da correção:** a estrutura conceitual ficou correta, com quatro constantes diretas e nomes descritivos. Restam apenas a conversão literal `data_da_visita` → `dataDaVisita` e a reprodução exata de “Quantidade de visitantes” na saída.

### 2026-07-28 - Revisão do Mini-Projeto do Capítulo 01

**Resultado:** compila e executa, mas precisa de um pequeno ajuste antes dos exercícios.

**Pontos positivos:**
- Escolha correta de `const` para dados que não mudam
- Tipos válidos, nomes em `camelCase` e ponto e vírgula consistentes
- Saída organizada e próxima do objetivo

**Pontos a reforçar:**
- O objetivo não era somente reproduzir a saída: `temperaturaAtual` deveria começar em `22` e ser reatribuída para `28`; o status deveria seguir o mesmo processo
- O bloco da unidade `mm` era necessário para praticar escopo, não apenas para organizar visualmente o código
- Conferir capitalização exata da saída solicitada

**Próximo passo:** aluno ajustar o próprio arquivo; depois, liberar os exercícios.

**Feedback do aluno:** ele fez o exercício de forma autônoma, sem consultar a resolução apresentada abaixo. O enunciado pareceu pedir apenas a reprodução da saída final; portanto, a solução é coerente com a interpretação possível e não deve ser tratada como falha conceitual. Em materiais futuros, explicitar nos requisitos obrigatórios quais mudanças de estado e conceitos devem aparecer no código, sem depender apenas do passo a passo.

### 2026-07-26 - Leitor de Aulas

**O que foi criado:**
- Pasta `leitor/` com React + Vite + TypeScript
- Home com índice estilo explorador do VS Code
- Página `/ler/...` com Markdown tipografado, highlight e prev/next
- Catálogo via `import.meta.glob` — novos capítulos `NN-*` entram sozinhos
- Exclusões: `.context/`, gabaritos, `correcoes.md`, `resultado.md`
- Progresso manual em `leitor/src/content/progress.json`

**Como o aluno usa:**
```bash
cd leitor && npm install && npm run dev
```
Celular na mesma rede: URL Network do Vite.

**Atualização:** dark mode (preferência + localStorage) e leitura desktop com coluna centralizada; índice sempre colapsável.

**Próximo passo pedagógico:** continuar Cap. 01 pela aula (teoria → sintaxe → exemplos → mini-projeto), agora podendo ler no leitor.

### 2026-07-26 - Geração do Capítulo 01

**Material criado:**
- Aula completa sobre `let`, `const`, `var`, nomenclatura, inferência, anotação e escopo
- Mini-projeto com contexto de engenharia
- 10 exercícios progressivos e 1 bônus
- Prova equilibrada em 40% teoria e 60% prática
- Guia de erros comuns, recursos e glossário

**Adaptações realizadas:**
- Reforço de nomes descritivos em `camelCase`
- Separação explícita entre erro de compilação, problema de saída e estilo
- Comparação entre vírgula e `+` no `console.log`
- Conferência do código salvo contra a versão realmente testada
- Template literals apenas como prévia, sem antecipar o Capítulo 02

**Próximo ponto de observação:**
- Verificar se o aluno escolhe `const` por padrão e usa `let` apenas quando há reatribuição
- Observar precisão na reprodução das saídas
- Avaliar compreensão prática de escopo de bloco

### 2026-07-26 - Dúvida sobre a Questão 6 da Prova

**Observação:**
- O aluno criou uma função `total(preco, quantidade)` para efetuar o cálculo
- A solução funciona, mas não atende literalmente ao requisito de armazenar o resultado em uma variável `total` tipada
- Reforçar a distinção entre função e variável e a leitura literal dos requisitos

### 2026-07-26 - Prova do Capítulo 00

**Resultado:** 9,5/10 — aprovado.

**Observações:**
- Excelente domínio dos conceitos teóricos e dos erros de tipo
- O arquivo `caderno.ts` estava correto, mas a versão copiada para a resposta da Q6 continha uma chave extra e chamava a variável `total` como função
- O aluno respondeu conforme o gabarito na Q7; esclarecer que ausência de `;` não era um erro real de compilação
- Capítulo 00 concluído e aluno liberado para o Capítulo 01

### 2025-01-12 - Sessão Inicial

**Impressões do aluno:**
- Gabriel demonstrou grande organização e visão de longo prazo
- Participou ativamente da construção da estrutura do curso
- Pesquisou cursos online antes de começar (atitude proativa)
- Entende suas limitações e quer construir uma base sólida

**Decisões tomadas:**
- Começar do zero absoluto (não assumir conhecimento prévio)
- Abordagem híbrida: teoria + prática imediata
- Geração de conteúdo sob demanda (capítulo por capítulo)
- Agentes sequenciais para garantir coerência do material

**Estrutura criada:**
- CLAUDE.md com diretrizes completas
- EMENTA.md com 31 capítulos + 3 bônus
- Sistema de pastas organizado
- Arquivos de controle em .context/

---

### 2025-01-25 - Primeira Entrega do Aluno

**Trabalho verificado:**
- Aluno estudou toda a aula do cap. 00 por conta própria
- Fez os exemplos práticos em pasta separada (03.exemplos-exercicios)
- Criou 5 arquivos: hello.ts, variaveis.ts, contador.ts, cronometro.ts, mini-projeto.ts

**Pontos positivos observados:**
- Testou quebra de tipos (comentou linhas para ver erros) - mostra curiosidade
- Usou `\n` para espaçamento no mini-projeto (iniciativa própria, não estava na aula)
- Organizou código com comentários (header, footer)
- Adicionou variáveis extras além do pedido (curso, capitulo)
- Escreveu resumo do que aprendeu no arquivo variaveis.ts

**Estilo de aprendizado:**
- Faz mais do que o mínimo pedido
- Experimenta por conta própria
- Documenta o que aprende

**Próximo passo:**
- Liberado para lista de exercícios (10 + bônus)
- Observar desempenho para ajustar dificuldade do cap. 01

---

### 2026-02-01 - Correção dos Exercícios do Cap. 00

**Desempenho geral:** Bom. Todos os 10 arquivos compilam. Conceitos centrais foram absorvidos.

**Pontos fortes confirmados:**
- Continua fazendo mais do que o mínimo pedido (ex06 com if/else, ex02 com variável tipada)
- Documenta o que faz (transcrições do terminal em quase todos os exercícios)
- Curiosidade ativa: descobriu sozinho que Node.js v24 roda .ts direto
- Reflexões escritas demonstram compreensão real, não apenas cópia

**Pontos de atenção identificados:**
- **Inconsistência com ponto e vírgula**: alterna entre usar e não usar. Precisa escolher uma convenção e manter
- **Atenção ao enunciado**: em 3+ exercícios a saída ficou diferente do formato pedido. Não é erro conceitual, mas mostra leitura superficial dos requisitos
- **Confusão erro de compilação vs estilo**: no ex06, identificou falta de `;` como "erro" quando é apenas convenção. Importante distinguir o que o compilador rejeita vs o que é boa prática
- **Nomes de variáveis**: tendência a abreviar (msg, dt, nExercicios no ex10). Reforçar nomes descritivos

**Para a prova:**
- Incluir pelo menos uma questão sobre a diferença entre erro de compilação e questão de estilo
- Observar se o padrão de "saída diferente do esperado" se repete

**Para o Cap. 01:**
- Reforçar concatenação com `+` vs vírgula no console.log
- Introduzir template literals como alternativa moderna
- Exercícios sobre convenções de nomes de variáveis

---

## Ideias para Adaptar o Curso

*Anotações de ajustes que podem ser feitos conforme o progresso*

- [x] Variar exemplos sem privilegiar nem excluir previamente um contexto
- [ ] Observar quais contextos variados geram maior engajamento
- [ ] Ajustar quantidade de exercícios baseado no desempenho inicial

---

## Conceitos para Reforçar

*Tópicos que podem precisar de atenção extra*

| Conceito | Motivo | Ação Sugerida |
|----------|--------|---------------|
| Ponto e vírgula (convenção) | Uso inconsistente nos exercícios | Reforçar no cap. 01 |
| Diferença console.log com `,` vs `+` | Usa `,` sem saber a diferença de formatação | Explicar no cap. 01 |
| Erro de compilação vs estilo | Confundiu `;` ausente com erro no ex06 | Questão na prova do cap. 00 |
| Comandos de arquivos no terminal | Pediu revisão de `mv`, `rm` e `rmdir` | Reforçar segurança antes de exclusões recursivas |
| Verificar estado após a mudança | No mini-projeto do cap. 04, testou a meta antes de incrementar e imprimiu valores finais fixos | Reforçar contador, estado derivado e testes com configuração alternativa |
| Ordem entre mutação e verificação | Ainda havia dúvida se a meta deveria ser testada antes do incremento | Usar rastreamento manual: contar a sessão e então testar o novo total |
| Separar encerramento e resumo | Mensagens finais ficaram dentro do caso em que a meta foi atingida | Comparar execução normal com meta inalcançável e manter o resumo após os loops |
| Resultado negativo também é resultado | Aluno entendeu corretamente a persistência de `false`, mas associou todo o resumo apenas ao sucesso | Diferenciar mensagem de sucesso de relatório final (`total` e booleano) |
| Direção da comparação `>=` | Interpretou que usar `>=` faria qualquer meta eventualmente resultar em `true`, mesmo após esgotar os loops | Reforçar operando esquerdo/direito e término por `break` versus término natural |
| Premissas do domínio | Espera coerentemente que semanas/sessões acompanhem o aumento da meta em um sistema real | Explicitar quando testes quebram uma premissa de propósito para validar comportamento defensivo |

---

## Exercícios Extras Sugeridos

*Ideias de exercícios adicionais para reforço*

| Capítulo | Exercício | Objetivo |
|----------|-----------|----------|
| - | - | - |

---

## Feedback do Aluno

*Registro de feedbacks recebidos*

| Data | Feedback | Ação Tomada |
|------|----------|-------------|
| 2026-07-28 | O mini-projeto pareceu pedir apenas a saída final, sem deixar clara a obrigatoriedade da reatribuição | Registrar mudanças de estado e conceitos obrigatórios diretamente nos requisitos dos próximos projetos |
| 2026-08-05 | O operador `||` não aparecia corretamente em uma tabela do leitor | Escapar pipes dentro de tabelas Markdown; três ocorrências do Capítulo 03 foram corrigidas e publicadas na versão 4 |
| 2026-08-05 | Prefere o índice recolhido para reduzir ruído visual durante a navegação | Home inicia toda fechada; sidebar abre somente o capítulo e a pasta do arquivo ativo |

---

## Ajustes na Ementa

*Registro de mudanças feitas na ementa original*

| Data | Mudança | Motivo |
|------|---------|--------|
| 2025-01-12 | Adicionado cap. Tuples | Pesquisa identificou importância |
| 2025-01-12 | Adicionado cap. Enums | Pesquisa identificou lacuna |
| 2025-01-12 | Adicionado cap. DOM | Prática imediata motivadora |
| 2025-01-12 | Adicionado cap. Type Assertions | Uso diário, essencial |
| 2025-01-12 | Adicionado cap. Function Overloading | Completude do curso |
| 2025-01-12 | Adicionado cap. Declaration Files | Trabalho com libs externas |

---

## Lembretes para Próximas Sessões

- [x] Verificar se aluno quer iniciar capítulo 00
- [x] Corrigir exercícios quando aluno entregar
- [x] Observar padrões de erro nos exercícios
- [x] Publicar o leitor de aulas no Sites
- [x] Integrar atualização do leitor e do Sites ao workflow de novos capítulos
- [ ] Perguntar preferência de horário/frequência de estudo
- [ ] Observar estilo de comunicação preferido

## Manutenção do Leitor

- 2026-08-15: favicon roxo do starter substituído pelo ícone TS fornecido pelo aluno.
- 2026-08-16: atividade e respostas corrigidas da primeira leitura de código real reunidas em um único arquivo. O gabarito ficou ao final da aula para preservar a possibilidade de tentativa antes da consulta e reduzir a fragmentação do material.
- 2026-08-24: a teoria do Capítulo 08 recebeu a seção 5.1 para separar explicitamente contrato do parâmetro callback e implementação entregue como argumento. O pedido do aluno mostrou boa leitura metacognitiva: ele localizou o salto conceitual e delimitou a correção sem antecipar assuntos posteriores.
- 2026-08-24: após comparar duas formas de explicação, a seção 5.1 foi refinada para privilegiar passos curtos e numerados, perguntas que antecipam a dúvida do aluno e uma tabela com “o que é” e “papel”. Foram evitadas as simplificações imprecisas de dizer que o parâmetro “ainda não é uma função de verdade” e de justificar o conceito apenas pela tradução literal de callback.
- 2026-08-24: com o conceito compreendido, o aluno percebeu que a explicação granular havia cumprido sua função e agora estava prolixa. As seções 5 e 5.1 foram sintetizadas, e duas cartilhas criadas pelo aluno passaram a complementar os exemplos de callback `void` e callback com retorno. Preferência confirmada: texto curto para introdução e imagem de fluxo para consolidar o modelo mental.
- 2026-08-29: o aluno identificou corretamente que a introdução a closure estava curta demais e trouxe um modelo mental útil: a função externa monta e devolve a “máquina”, enquanto a função retornada calcula em outra chamada. A seção 11 foi ampliada para separar os dois momentos, definir closure como função + acesso ao ambiente e mostrar que chamadas distintas preservam ambientes independentes. Foi evitada a formulação absoluta “as duas funções não rodam juntas”, válida apenas para o exemplo apresentado.
- 2026-08-29: ao estudar IIFE, o aluno transferiu corretamente o modelo de contrato: `()` representa zero parâmetros e `: { modo: string }` descreve o retorno. A seção 12 foi ampliada para contrastar guardar a função com guardar seu resultado e para distinguir os três papéis dos parênteses. Foi acrescentada a precisão de que, numa atribuição, a função já ocupa uma posição de expressão; é o `()` final que caracteriza a execução imediata.

## 2026-08-15 — Prova do Capítulo 05

**Resultado:** 9,5/10 — aprovado. Demonstrou domínio sólido de arrays tipados, mutações, retornos de métodos, referência compartilhada e integração com `for` e `continue`.

**Pontos a reforçar:** em array vazio, `length - 1` vale `-1`; a leitura nesse índice é que resulta em `undefined`. Continuar cobrando requisitos não executáveis: estados previstos da Q6 foram omitidos e o cálculo pedido em variável na Q7 foi feito apenas inline.

**Sequência:** a prova foi entregue apesar do bloqueio ainda escrito no enunciado. A entrega foi aceita e não precisa ser refeita. Antes do Capítulo 06, corrigir formalmente a lista Arrays + Loops e concluir o Projeto 1.

---

## Métricas de Qualidade do Curso

| Aspecto | Status | Observação |
|---------|--------|------------|
| Clareza das aulas | A avaliar | - |
| Dificuldade dos exercícios | A avaliar | - |
| Relevância dos projetos | A avaliar | - |
| Ritmo do curso | A avaliar | - |

---

*Última atualização: 2026-09-02*
