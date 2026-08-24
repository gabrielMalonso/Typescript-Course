# Perfil do Aluno

> Arquivo de controle do Claude - Atualizado conforme observações

---

## Dados Gerais

| Campo | Informação |
|-------|------------|
| **Nome** | Gabriel Alonso |
| **Formação** | Engenheiro Mecânico |
| **Experiência prévia** | Base básica de programação na faculdade |
| **Contato recente** | Trabalho com LLMs para projetos próprios |

---

## Objetivos

1. Aprender TypeScript do zero
2. Conseguir ler e entender código
3. Direcionar melhor LLMs em projetos de programação
4. Desenvolver projetos próprios
5. Possível transição de carreira para área de tecnologia

---

## Estilo de Aprendizado

| Aspecto | Preferência |
|---------|-------------|
| **Abordagem** | Híbrida (teoria + prática imediata) |
| **Ritmo** | Diário, gradual |
| **Profundidade** | Quer entender o "porquê", não só o "como" |
| **Analogias** | Bem-vindas, com contextos variados e adequados ao conceito |
| **Complementação** | Gosta de ampliar a teoria com comparações visuais e explicações intermediárias para consolidar o modelo mental |
| **Leitura de código** | Prefere sessões curtas: 1 recorte explicado, 1 guiado e 2 para interpretação própria, sempre com definição e chamada |

**Ajuste de ritmo em 2026-08-03:** aluno está confortável com a base e prefere acelerar quando temas próximos puderem ser integrados, compensando com 30–50% mais exercícios e variedade.

---

## Pontos Fortes (Observados)

- [x] Raciocínio lógico - Demonstrado nos cálculos e na lógica do if/else (ex05, ex06)
- [x] Persistência - Completou todos os 10 exercícios
- [ ] Atenção a detalhes - Parcial: código funciona mas saídas divergem do formato pedido
- [x] Capacidade de abstração - Boa reflexão sobre inferência de tipos e compilação
- [x] Curiosidade/Iniciativa - Vai além do pedido, experimenta por conta própria
- [x] Mutabilidade e escopo de bloco - Aplica reatribuição e limites de bloco corretamente
- [x] Escopo de função - Explicou corretamente que nomes internos não ficam disponíveis fora da função na prova do cap. 01
- [x] Leitura de funções reais - Localizou contratos, argumentos, retornos e destinos em trechos de dois projetos
- [x] Contratos de funções - Tipou parâmetros e retornos corretamente em toda a lista do Capítulo 06
- [x] Retorno e efeito - Diferenciou `return` reutilizável de exibição com `console.log` e `void`
- [x] Funções como valores - Guardou, chamou e comparou referências de função corretamente

---

## Pontos de Atenção (Observados)

*Será preenchido conforme erros recorrentes forem identificados*

| Área | Observação | Frequência |
|------|------------|------------|
| Convenções de código | Uso inconsistente de ponto e vírgula | 3+ exercícios |
| Leitura de enunciado | Saída diferente do formato pedido | 3 exercícios |
| Nomenclatura | Nomes de variáveis abreviados | 1 exercício (ex10) |
| Clareza do enunciado | Resolveu o mini-projeto sem consultar a solução e interpretou o quadro de saída como requisito principal | 1 mini-projeto (cap. 01) |
| Cumprimento integral | Partes textuais não executáveis foram omitidas nos exercícios 3.2 e 3.3 | 2 exercícios (cap. 01) |
| Formatação exata | Rótulos ou valores divergiram da saída esperada | Recorrente no cap. 01 |
| Leitura literal de requisitos | Anotação explícita usada onde a inferência era obrigatória | 1 prova (cap. 01) |
| Leitura literal de requisitos | Anotação explícita usada novamente onde a inferência era obrigatória | 1 exercício (cap. 02) |
| Classificação de diagnóstico | Chamou incompatibilidade de tipo na declaração de erro de cálculo | 1 exercício (cap. 02) |
| Teste de limites condicionais | Inverteu `>= 6` para `<= 6`, tornando o ramo intermediário inalcançável para o valor testado | 1 prova (cap. 03) |
| Organização da entrega | Respostas escritas no enunciado e arquivo prático solicitado ausente | 2 provas (caps. 02 e 03) |
| Terminologia de funções | Confundiu o papel dos parênteses com o papel do argumento e incluiu um fallback como parte do argumento | 1 sessão de leitura (cap. 06) |
| Formas de função | Usou arrow quando o exercício pedia expressão tradicional e converteu arrow em declaração ao mostrar a forma equivalente | 2 exercícios (cap. 06) |
| Testes alternativos | Omitiu comprovação de não mutação e execução do pipeline vazio | 2 exercícios (cap. 06) |
| Tipo de função | Identificou a referência corretamente, mas chamou seu tipo conceitual de `number`, confundindo contrato com retorno | 1 prova (cap. 06) |
| Regra versus amostra | Implementou “diferente de zero” para dados contendo zeros, embora a regra exigisse “maior que zero”; corrigiu espontaneamente após a prova | 1 prova (cap. 06), resolvido |
| Sintaxe empilhada | Conceito claro, mas a escrita trava ao misturar array de objetos com parâmetro e retorno de função | Relatado no cap. 07 |

---

## Padrões de Erro

*Será preenchido após correção de exercícios*

| Tipo de Erro | Exemplo | Capítulo | Corrigido? |
|--------------|---------|----------|------------|
| Saída divergente | Rótulos, capitalização ou conteúdo diferentes do modelo | 01 | Recorrente |
| Requisito omitido | Diagnósticos ou exemplos pedidos não foram registrados | 01 | Sim |
| Conceito invertido | Nome interno de função descrito como acessível externamente | 01 | Sim |
| Classificação V/F inconsistente | Interpretou “verifica atribuições” como “aceita atribuições”; o modelo mental sobre rejeição de tipos incompatíveis estava correto | 01 | Esclarecido |

---

## Conceitos que Precisam Reforço

*Lista de tópicos que o aluno demonstrou dificuldade*

- Diferença entre erro de compilação e convenção de estilo
- Conferência entre o código testado e a versão copiada para a entrega
- Leitura integral de requisitos que não afetam a saída
- Distinguir “verificar uma atribuição” de “aceitar uma atribuição” na linguagem dos enunciados
- Testar pelo menos um valor de cada faixa e conferir a saída realmente executada
- Preservar o arquivo de enunciado e entregar todos os arquivos solicitados
- Distinguir pela sintaxe declaração de função, expressão com `function` e arrow function
- Executar todos os casos alternativos pedidos, mesmo quando a função principal já parece correta
- Descrever o tipo de uma função pelo contrato completo, não apenas pelo tipo retornado
- Testar regras numéricas com valores fora da amostra, especialmente negativos e limites
- Escrever a mistura de array de objetos com função: o que é o array, o que é um objeto, o que entra como parâmetro e o que a função devolve
- Distinguir a assinatura do parâmetro callback da implementação concreta entregue como argumento
- Distinguir o teto de um acumulador (`volume <= 50`) do tamanho de cada incremento (`litros <= 50`)

---

## Conceitos Bem Absorvidos

*Lista de tópicos que o aluno dominou rapidamente*

- console.log e saída no terminal
- Variáveis tipadas (string, number, boolean)
- Inferência de tipos
- Compilação TypeScript -> JavaScript
- Correção de erros de tipo
- Fluxo de compilação e execução de TypeScript
- Escolha entre `let` e `const`
- Inferência e anotação explícita
- Reatribuição e escopo de bloco
- Escopo de função
- Tipos primitivos `number`, `string`, `boolean`, `null` e `undefined`
- Cálculos derivados e uso de template literals
- Distinção entre atribuições posteriores compatíveis e incompatíveis
- Diferença semântica entre `null` e `undefined`
- Integração de tipos primitivos, cálculos e formação de saídas
- Operadores aritméticos, precedência, atribuições compostas e condições básicas
- Combinação de condições com `&&`, `||` e `!`
- Estruturas condicionais `if/else`, ternário e `switch`
- Integração de várias condições de segurança em uma decisão única
- Reconhecimento de atribuições encadeadas e de sua avaliação da direita para a esquerda
- Loops aninhados, `continue`, contador e encerramento coordenado com `break`
- Distinção entre mensagem condicional de sucesso e resumo final do processamento
- Escolha e aplicação de `while`, `do...while` e `for`
- Interrupção por meta ou limite e uso de `continue` para exceções
- Diagnóstico de loops infinitos pela relação entre condição, atualização e direção
- Operações básicas de arrays, referência compartilhada e percurso por índice com `for`
- Tipagem explícita de parâmetros e retornos de funções
- Diferença entre função que retorna valor e função `void` com efeito de exibição
- Funções guardadas como valores e compatibilidade pelo contrato da função
- Composição manual de funções para somar, contar e calcular média de valores válidos
- Diferença sintática entre declaração, expressão de função, arrow concisa e arrow com bloco
- Diferença entre guardar uma referência de função e executar uma chamada para obter seu retorno
- Objetos literais, referência versus cópia, spread, destructuring e arrays de objetos com funções

---

## Preferências de Explicação

*Como o aluno prefere que as coisas sejam explicadas*

- Analogias com mundo real: prefere variedade, sem privilegiar ou excluir previamente um contexto
- Exemplos de código: variar entre cotidiano, software, jogos, negócios, criatividade e outros temas conforme o conceito
- Diagramas/visuais: (aguardando feedback)
- Correções: priorizar domínio conceitual e comportamento do programa; tratar detalhes cosméticos de saída como observações opcionais, salvo quando formatação for o objetivo explícito do exercício
- Feedback reforçado em 2026-08-06: não transformar capitalização, pontuação ou rótulos equivalentes em pendências para avançar

---

## Notas Adicionais

- Aluno participou ativamente da criação da estrutura do curso
- Demonstrou organização e visão de longo prazo
- Pesquisou cursos antes de iniciar (proativo)
- Após a prova do Capítulo 01, relatou satisfação com o próprio aprendizado e reconheceu os deslizes de atenção na entrega
- Obteve 9,0 na prova do Capítulo 02, com desempenho prático forte; precisa conferir cálculos teóricos e todas as linhas da saída antes da entrega
- Após a prova do Capítulo 02, relatou satisfação e reconheceu espontaneamente os erros de atenção
- No bônus do Capítulo 03, identificou corretamente que a proteção de prazo mínimo era redundante para os dados atuais, demonstrando análise do domínio além da saída fornecida
- Após a prova do Capítulo 03, compreendeu que `a = b = valor` é uma atribuição encadeada, embora não conhecesse previamente essa possibilidade
- Na lista do Capítulo 04, resolveu corretamente 11 dos 12 exercícios obrigatórios na primeira revisão; precisa reforçar a execução de ações exigidas em todas as iterações antes de testar a condição de parada
- Obteve 9,4 na prova do Capítulo 04, com pontuação integral na prática; o único desconto veio de duas explicações teóricas solicitadas e omitidas
- Na primeira lista de arrays, demonstrou domínio das operações básicas; precisa reforçar a diferença entre `length` e último índice e separar o efeito de `const` da tipagem dos elementos
- Corrigiu prontamente `length` versus último índice e completou os requisitos da lista de arrays; o entendimento sobre incompatibilidade de tipos já estava presente na explicação original
- Obteve 9,5 na prova do Capítulo 05; dominou operações, retornos, referência compartilhada e percurso com `for`, mas confundiu `length - 1` com `undefined` no caso do array vazio
- Obteve 9,4 na prova do Capítulo 06; prática muito forte, com reforço necessário no tipo conceitual de uma função e na diferença entre filtrar zeros e aceitar somente positivos
- Na primeira lista de objetos, compilou e executou todos os arquivos; a escrita ainda trava quando array, objeto e função se empilham. Pediu treino extra focado em sintaxe, não em mais teoria.
- Obteve 9,5 na prova do Capítulo 07; consolidou objetos, spread, destructuring e lista de fichas. Descontos de atenção no índice do array e de regra geral no teto do tanque.
- Ao iniciar callbacks no Capítulo 08, identificou precisamente a lacuna entre “parâmetro cujo tipo é função” e “função concreta que ocupa o parâmetro”; pediu um fluxo visual sem antecipar conteúdos futuros.

---

*Última atualização: 2026-08-24*
