# Guia de estudo — Complexidade e Big O

**Objetivo:** explicar como o tempo e a memória de uma solução crescem com a entrada. Você já percebeu essa diferença no TLE e ao trocar buscas repetidas por uma única passagem; agora vai aprender a analisá-la.

Siga as etapas abaixo. Abra o material indicado e volte a este guia para continuar. Todas as páginas são do **CLRS, 3ª edição em inglês**; os PDFs mantêm as páginas completas, mas os limites de leitura estão indicados em cada etapa.

## 1. Videoaula

[CS50 — Week 3: Algorithms](https://cs50.harvard.edu/x/2026/weeks/3/) — **já assistida**, conforme seu relato. Não precisa rever para seguir.

A aula deu uma primeira intuição de eficiência. O livro começa pela pergunta: melhorar a máquina resolve o problema ou precisamos melhorar o algoritmo?

*Se quiser esclarecer a chamada recursiva em C:* [nota opcional](notas.md#recursao-em-c). Recursão será aprofundada no capítulo 15.

## 2. Por que analisar algoritmos?

[CLRS 1.2 · páginas 11–14](leituras/clrs-1.2.pdf)

Leia **Algorithms as a technology** pensando no seu TLE: em que situação o crescimento importa mais que a velocidade da máquina? Não precisa implementar as ordenações citadas.

**Depois:** faça a [atividade 1](pratica/atividades.md#atividade-1), comparando duas alternativas.

## 3. Como contar o trabalho?

Comparar fórmulas é um começo. Agora você precisa reconhecer o tamanho da entrada e o trabalho que se repete no código.

| Ordem | Leitura da seção 2.2 | Recorte |
|---|---|---|
| 1 | [Modelo de análise · pp. 23–25](leituras/clrs-2.2-01-modelo.pdf) | Comece em **Analyzing algorithms**. Procure tamanho da entrada e custo das operações; deixe detalhes de bits/shift para depois |
| 2 | [Casos e crescimento · pp. 27–29](leituras/clrs-2.2-02-casos.pdf) | Comece em **Worst-case and average-case analysis** e siga por **Order of growth**, até os exercícios |

Não é necessário acompanhar a tabela e as derivações de insertion sort nas pp. 26–27. Se os índices ou símbolos dificultarem a leitura, consulte [Pseudocódigo](notas.md#pseudocodigo) e retorne aqui.

## 4. Como descrever o crescimento?

Você já tem uma contagem. O próximo recorte mostra como expressar seu crescimento com O, Ω e Θ.

[CLRS 3.1 · páginas 43–49](leituras/clrs-3.1.pdf)

Observe a **figura 3.1** e o significado dos três limites. Pare antes de **Asymptotic notation in equations and inequalities**, na p. 49. Não precisa reproduzir as provas algébricas.

**Depois:** faça as [atividades 2 e 3](pratica/atividades.md#atividade-2). Pode enviar essas primeiras tentativas para feedback antes de continuar.

## 5. Comparar famílias de crescimento

Agora amplie a comparação: uma passagem, todos os pares, reduções sucessivas pela metade e crescimento exponencial.

[CLRS 3.2 · páginas 55–57](leituras/clrs-3.2.pdf)

- **P. 55:** leia **Polynomials** e o início de **Exponentials**, parando antes da introdução de `e`.
- **Pp. 56–57:** retome em **Logarithms** e encerre após o primeiro parágrafo da p. 57, sobre mudança de base.

Deixe séries, identidades extensas, fatoriais e demais subtópicos para depois.

**Depois:** faça a [atividade 4](pratica/atividades.md#atividade-4), levando essas ideias para loops TypeScript.

## 6. Aplicar ao seu código

As operações também podem estar dentro de callbacks. E uma solução mais rápida pode usar mais memória.

Consulte as notas [Callbacks](notas.md#callbacks) e [Memória](notas.md#memoria) para aplicar o modelo ao TypeScript. Em seguida:

1. Faça a [atividade 5](pratica/atividades.md#atividade-5).
2. Retome suas soluções de [Two Sum, Contains Duplicate e Stock — atividades 6–8](pratica/atividades.md#atividade-6).

Explique o raciocínio, o custo e os casos de borda. Preserve as tentativas anteriores para comparar sua evolução.

## 7. Feedback e continuidade

Envie suas tentativas, mesmo parciais. O objetivo é conseguir **justificar tempo e memória, testar limites e explicar uma melhoria**; assistir e ler não bastam para demonstrar isso.

Se precisar de reforço, use as [atividades 9–10](pratica/atividades.md#atividade-9); para o experimento, consulte [Cronômetro e console](notas.md#cronometro-e-console). A [atividade 11](pratica/atividades.md#atividade-11) é um desafio opcional.

Na próxima sessão, tente explicar uma análise sem reler a resposta. O feedback orientará os reforços e a passagem para **11 — Set e Map**.
