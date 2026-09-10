# 10 — Complexidade e Big O: guia de estudo

Você já encontrou uma solução correta que ultrapassou o limite de tempo e melhorou uma busca repetida para uma única passagem. Agora vamos dar nomes e justificativas ao que você percebeu: **quanto trabalho e memória uma solução exige quando a entrada cresce?**

**Comece aqui:** como você já assistiu ao CS50 Week 3, abra o **CLRS, 3ª edição, seção 1.2**. Leia com a pergunta “quando melhorar o algoritmo importa mais que melhorar a máquina?” e faça a atividade 1 da [prática selecionada](pratica/atividades.md). Não precisa rever o vídeo inteiro nem terminar todas as leituras antes de praticar.


[CLRS · Seção 1.2 · páginas 11–14](leituras/clrs-1.2.pdf)

## De onde você parte

**Área:** DSA · **Bloco:** 1 — Fundamentos algorítmicos · **Pré-requisitos:** loops, arrays, funções, callbacks e métodos de arrays dos capítulos 04–09.

As âncoras são suas experiências relatadas em Two Sum, Contains Duplicate e Best Time to Buy and Sell Stock: TLE, loops aninhados, efeito de `console.log` no runtime e redução de trabalho repetido. Vamos analisar suas tentativas quando estiverem disponíveis. Esses relatos não representam uma avaliação já feita.

O objetivo é comparar soluções, explicar limitações e reconhecer trocas entre tempo e memória. Isso será útil em buscas e processamento de listas e preparará a escolha de Set/Map no capítulo 11. Recursão, implementação de ordenação e hashing não são pré-requisitos deste capítulo.

## Seu percurso

| Etapa | O que estudar | Próxima aplicação |
|---|---|---|
| 1. Visão inicial | CS50 Week 3 — já assistido por seu relato | Retomar só uma dúvida, se necessário |
| 2. Por que analisar | CLRS 1.2 | Atividade 1 |
| 3. Como contar e classificar | Recortes de 2.2 e 3.1 abaixo | Atividades 2 e 3; pode entregar para feedback aqui |
| 4. Comparar crescimento | Recortes de 3.2 abaixo | Atividade 4 |
| 5. Aplicar ao seu código | Apoios 2–4 das [notas](notas.md), conforme necessidade | Atividades 5–8 |
| 6. Consolidar ou aprofundar | Somente se houver necessidade ou interesse | Atividades 9–11, opcionais |

## Videoaula selecionada

**Harvard — CS50x 2026, Week 3: Algorithms**, com David J. Malan. [Página oficial com vídeo, notas e transcrição](https://cs50.harvard.edu/x/2026/weeks/3/).

Foi escolhida pelas demonstrações de busca e eficiência, que ajudam a enxergar o crescimento antes da notação. Você relata já ter acompanhado a maior parte. Para revisão, procure os segmentos **Searching, Linear Search, Binary Search e Running Time**; encerre essa retomada antes de `search.c`. Não é necessário estudar todos os códigos em C.

Ordenação e recursão aparecem como contato antecipado. Implementaremos esses assuntos nos capítulos 14 e 15. Se a chamada recursiva em C ainda atrapalhar, há um apoio opcional nas [notas](notas.md); compreender recursão não é condição para avançar aqui.

## Leitura orientada no CLRS

**Livro:** *Introduction to Algorithms*, Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest e Clifford Stein, **3ª edição**, MIT Press, 2009. Use seu próprio exemplar. [Identificação da edição na editora](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/).

As páginas abaixo são **impressas na edição inglesa**, conferidas em 10/09/2026; não são posições do visualizador de PDF. Em tradução ou formato digital, localize pela seção e pelos subtítulos. Não estamos lendo os capítulos 1–3 inteiros.

| Ordem | Recorte e páginas | Durante a leitura | Pode deixar para depois |
|---|---|---|---|
| A | **1.2 — Algorithms as a technology**, pp. 11–14 | Compare o efeito da máquina e do algoritmo. Relacione a discussão ao seu TLE | Implementar os algoritmos de ordenação citados |
| B | **2.2 — Analyzing algorithms**: abertura nas pp. 23–25; retome **Worst-case and average-case analysis**, pp. 27–28, e **Order of growth**, pp. 28–29 | Identifique tamanho da entrada, operação contada e hipótese sobre os casos | Detalhes de bits/shift e a tabela/derivações linha a linha de insertion sort nas pp. 26–27 |
| C | **3.1 — Asymptotic notation**, pp. 43–49, até antes de **Asymptotic notation in equations and inequalities** | Interprete a figura 3.1 e o significado de Θ, O e Ω. Distinga limite superior de ordem justa | Reproduzir provas algébricas; equações assintóticas, little-o/little-omega e comparações formais posteriores |
| D | **3.2 — Standard notations and common functions**: **Polynomials** e início de **Exponentials**, p. 55, até antes da introdução de `e`; **Logarithms**, pp. 56–57, até o primeiro parágrafo da p. 57 sobre mudança de base | Compare crescimento linear, quadrático e exponencial; interprete log como reduções repetidas. Relacione n log n a repetir esse trabalho para n itens | Séries, identidades extensas, limites formais, fatorial, logaritmos iterados e Fibonacci |

### Abrir as leituras no site

Os recortes mantêm as páginas originais completas. Siga os limites da tabela acima: partes vizinhas na mesma página não entram automaticamente no estudo.

[Etapa B · Modelo de análise · páginas 23–25](leituras/clrs-2.2-01-modelo.pdf)

[Etapa B · Casos e crescimento · páginas 27–29](leituras/clrs-2.2-02-casos.pdf)

[Etapa C · Notação assintótica · páginas 43–49](leituras/clrs-3.1.pdf)

[Etapa D · Funções de crescimento · páginas 55–57](leituras/clrs-3.2.pdf)

Na etapa B, a ordenação é o exemplo usado pelo autor, não uma implementação exigida de você. Se pseudocódigo ou índices atrapalharem, consulte o apoio 1 das notas e volte ao recorte. Se uma passagem continuar obscura, traga a seção e a dúvida; não precisa destravar sozinho um tema futuro.

## Como usamos o MIT 6.006

O [mapa oficial de leituras — Fall 2011](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/readings/) usa o CLRS 3ª edição e relaciona as aulas iniciais aos capítulos 1 e 3. Ele orienta a curadoria; os recortes acima foram escolhidos para **nossa** ementa e seus pré-requisitos.

As [notas da Lecture 2 — Models of computation](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/6b9b20992d8c6a0f3f10a34ff7878aa9_MIT6_006F11_lec02.pdf) são uma consulta opcional: a primeira página discute modelo de custo. As partes sobre operações em Python serviram de apoio à curadoria; não é necessário ler o documento inteiro nem assumir que seus custos são garantias de JavaScript.

Não há problem set inteiro do MIT obrigatório neste piloto. A prioridade é adequação: as listas iniciais incluem pré-requisitos além do nosso recorte. Exercícios do CLRS e suas tentativas no LeetCode permitem praticar o assunto sem importar essa carga.

## Prática e feedback

A [seleção de atividades](pratica/atividades.md) tem **8 essenciais, 2 de consolidação e 1 desafio**. Os três LeetCodes já estão nesse total. Consolidação e desafio são opcionais; atividades podem ser ajustadas se o trabalho já demonstrar a competência.

Você pode entregar algumas tentativas e receber feedback antes de terminar. Guarde seus arquivos em `pratica/solucoes/`, preservando versões anteriores. Para executar, use `ts-node caminho/do/arquivo.ts`, como no capítulo 09. Respostas curtas podem ficar em um único Markdown com o número da atividade. Não existe prova ou checkpoint obrigatório.

Faça uma tentativa antes de pedir ajuda. Começaremos pela menor pista necessária. Se precisar de uma solução completa, depois retomaremos uma variação independente para verificar o que ficou compreendido.

## O que demonstra domínio

Ao trabalhar com código e situações novas, você deve conseguir:

- Definir a entrada e justificar a contagem, incluindo loops sequenciais, aninhados e limites fixos.
- Comparar O(1), O(log n), O(n), O(n log n), O(n²) e reconhecer crescimento exponencial, sem classificar só pela aparência do código.
- Declarar o caso analisado e as hipóteses de uma média; distinguir isso de O, Ω e Θ.
- Separar entrada, saída e espaço auxiliar/total, explicando uma escolha entre tempo e memória.
- Testar limites e dependências indevidas, localizar trabalho repetido e explicar por que o cronômetro não prova a complexidade.

O feedback observará essas competências na prática. Uma lacuna essencial recebe reforço localizado; ler ou obter Accepted não basta, e um desafio opcional não bloqueia o capítulo 11.

## O que revisitar depois

| Momento | Retomada planejada |
|---|---|
| Próxima sessão | Explique uma contagem sem reler sua resposta; troque um limite ou condição e confira se a análise muda |
| Após o capítulo 11 | Retome Two Sum e Contains Duplicate com os conhecimentos novos, preservando as tentativas anteriores |
| Nos capítulos 12–13 | Analise um código novo com métodos de array e uma operação interna, sem indicação da técnica |
| No capstone após o 15 | Justifique tempo, memória e limites de uma decisão do projeto |

São retomadas planejadas, não trabalhos já realizados. As referências deste guia foram verificadas em **10/09/2026**. O capítulo permanece **disponível para estudo, sem domínio avaliado**; esta reconstrução não atribui conclusão.

**Seu próximo passo:** CLRS **1.2**, seguido da atividade **1** da [prática](pratica/atividades.md).
