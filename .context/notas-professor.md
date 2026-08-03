# Notas do Professor

> Arquivo de controle do Claude - Observações livres sobre o curso

---

## Observações Gerais

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

**Próximo passo:** publicar o leitor e iniciar `aula/01-teoria.md`.

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

- [ ] Se engenharia mecânica aparecer, usar analogias de física/mecânica
- [ ] Observar se prefere exemplos mais matemáticos ou mais do dia a dia
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

---

## Métricas de Qualidade do Curso

| Aspecto | Status | Observação |
|---------|--------|------------|
| Clareza das aulas | A avaliar | - |
| Dificuldade dos exercícios | A avaliar | - |
| Relevância dos projetos | A avaliar | - |
| Ritmo do curso | A avaliar | - |

---

*Última atualização: 2026-08-03*
