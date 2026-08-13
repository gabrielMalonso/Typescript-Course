# Notas do Professor

> Arquivo de controle do Claude - Observações livres sobre o curso

---

## Observações Gerais

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

---

## Métricas de Qualidade do Curso

| Aspecto | Status | Observação |
|---------|--------|------------|
| Clareza das aulas | A avaliar | - |
| Dificuldade dos exercícios | A avaliar | - |
| Relevância dos projetos | A avaliar | - |
| Ritmo do curso | A avaliar | - |

---

*Última atualização: 2026-08-13*
